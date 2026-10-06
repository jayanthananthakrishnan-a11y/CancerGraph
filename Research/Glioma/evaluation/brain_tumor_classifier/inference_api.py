"""
Local Python Inference API Server for CancerGraph Glioma MRI Classifier
Port: 5000

Endpoints:
  GET  /api/health            - Server status & model metadata
  GET  /api/sample_image?path=... - Returns base64 data URL for a sample dataset image
  POST /api/predict           - Accepts JSON { "image_path": "..." } or { "image": "data:image/jpeg;base64,..." }
"""

import os
import io
import json
import base64
import traceback
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
from PIL import Image
import numpy as np

os.environ["TF_USE_LEGACY_KERAS"] = "1"
import tf_keras as keras

WORKSPACE_ROOT = r"c:\Users\akris\OneDrive\Desktop\Multimodal_Cancer_Classification_BetaVersion"
MODEL_PATH = os.path.join(WORKSPACE_ROOT, "Research", "Glioma", "models", "glioma_dataset2_classifier.keras")
CLASSES = ['glioma', 'meningioma', 'notumor', 'pituitary']
IMG_SIZE = (224, 224)
PORT = 5000

# Global model instance
model = None

def load_model_on_startup():
    global model
    if not os.path.exists(MODEL_PATH):
        print(f"[API ERROR] Model file not found at: {MODEL_PATH}")
        return False
    try:
        print(f"[API INFO] Loading Keras model from {MODEL_PATH}...")
        model = keras.models.load_model(MODEL_PATH)
        print("[API INFO] Keras model loaded successfully.")
        return True
    except Exception as e:
        print(f"[API ERROR] Failed to load model: {e}")
        traceback.print_exc()
        return False

def resolve_pil_image(payload, raw_body):
    """
    Parses payload dict or raw body bytes into a PIL RGB Image object.
    Supports file paths, data URIs, base64 strings, and raw binary bytes.
    """
    # 1. Check for file path in image_path or image
    target_path = None
    if isinstance(payload, dict):
        target_path = payload.get('image_path') or payload.get('image')

    if isinstance(target_path, str) and not target_path.startswith("data:"):
        # Check if it's a valid path on disk
        candidate_paths = [
            target_path,
            os.path.join(WORKSPACE_ROOT, target_path),
            os.path.abspath(target_path)
        ]
        for p in candidate_paths:
            if os.path.exists(p) and os.path.isfile(p):
                print(f"[API INFO] Opening image from disk: {p}")
                return Image.open(p).convert('RGB')

    # 2. Check for data URI or base64 string
    if isinstance(target_path, str):
        if ',' in target_path:
            header, base64_str = target_path.split(',', 1)
        else:
            base64_str = target_path

        try:
            image_bytes = base64.b64decode(base64_str)
            return Image.open(io.BytesIO(image_bytes)).convert('RGB')
        except Exception as err:
            raise ValueError(f"Could not decode base64 image data: {err}")

    # 3. Check for raw body bytes
    if raw_body and len(raw_body) > 0:
        try:
            return Image.open(io.BytesIO(raw_body)).convert('RGB')
        except Exception as err:
            raise ValueError(f"Could not parse binary image body: {err}")

    raise ValueError("No valid image path, base64 data URI, or binary image payload provided.")

def preprocess_pil_image(pil_img):
    img_rgb = pil_img.convert('RGB')
    img_resized = img_rgb.resize(IMG_SIZE)
    arr = np.array(img_resized, dtype=np.float32) / 255.0
    tensor = np.expand_dims(arr, axis=0)
    return tensor

def run_model_inference(pil_img):
    global model
    if model is None:
        load_model_on_startup()
    if model is None:
        raise RuntimeError("Model checkpoint unavailable.")

    tensor = preprocess_pil_image(pil_img)
    probs = model.predict(tensor, verbose=0)[0]

    pred_idx = int(np.argmax(probs))
    pred_class = CLASSES[pred_idx]

    prob_dict = {cls: float(round(float(p), 4)) for cls, p in zip(CLASSES, probs)}

    return {
        'model_name': 'glioma_dataset2_classifier.keras',
        'model_version': '1.0.0 (Dataset2 Baseline MobileNetV2)',
        'classes': CLASSES,
        'predicted_class': pred_class,
        'predicted_index': pred_idx,
        'confidence': float(round(float(probs[pred_idx]), 4)),
        'probabilities': prob_dict,
        'disclaimer': 'Research classification — not a clinical diagnosis.'
    }

class InferenceRequestHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        if path == '/api/health' or path == '/':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._send_cors_headers()
            self.end_headers()

            response = {
                'status': 'healthy',
                'model_loaded': model is not None,
                'model_path': MODEL_PATH,
                'classes': CLASSES,
                'api_endpoint': f'http://127.0.0.1:{PORT}/api/predict'
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))

        elif path == '/api/sample_image':
            params = parse_qs(parsed_url.query)
            rel_path = params.get('path', [''])[0]

            candidate_paths = [
                rel_path,
                os.path.join(WORKSPACE_ROOT, rel_path)
            ]
            found_path = None
            for p in candidate_paths:
                if p and os.path.exists(p) and os.path.isfile(p):
                    found_path = p
                    break

            if found_path:
                try:
                    with open(found_path, 'rb') as f:
                        img_data = f.read()
                    b64_str = base64.b64encode(img_data).decode('utf-8')
                    ext = os.path.splitext(found_path)[1].lower().replace('.', '')
                    mime = 'image/jpeg' if ext in ['jpg', 'jpeg'] else f'image/{ext}'
                    data_url = f"data:{mime};base64,{b64_str}"

                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self._send_cors_headers()
                    self.end_headers()
                    resp = {'success': True, 'data_url': data_url, 'image_path': rel_path}
                    self.wfile.write(json.dumps(resp).encode('utf-8'))
                except Exception as e:
                    self.send_response(500)
                    self.send_header('Content-Type', 'application/json')
                    self._send_cors_headers()
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
            else:
                self.send_response(404)
                self.send_header('Content-Type', 'application/json')
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({'error': f"Sample image file not found: {rel_path}"}).encode('utf-8'))

        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == '/api/predict':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            content_type = self.headers.get('Content-Type', '')

            payload = {}
            if 'application/json' in content_type and body:
                try:
                    payload = json.loads(body.decode('utf-8'))
                except Exception as e:
                    print(f"[API ERROR] Failed to parse JSON body: {e}")

            try:
                pil_img = resolve_pil_image(payload, body)
                result = run_model_inference(pil_img)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps(result).encode('utf-8'))

            except ValueError as ve:
                print(f"[API BAD REQUEST] {ve}")
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self._send_cors_headers()
                self.end_headers()
                error_resp = {'error': str(ve), 'disclaimer': 'Research classification request error'}
                self.wfile.write(json.dumps(error_resp).encode('utf-8'))

            except Exception as e:
                print(f"[API EXCEPTION] Server error during inference: {e}")
                traceback.print_exc()
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self._send_cors_headers()
                self.end_headers()
                error_resp = {'error': str(e), 'disclaimer': 'Research classification error'}
                self.wfile.write(json.dumps(error_resp).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

def run_server():
    load_model_on_startup()
    server_address = ('127.0.0.1', PORT)
    httpd = HTTPServer(server_address, InferenceRequestHandler)
    print(f"[API SERVER] Glioma Inference API Server running at http://127.0.0.1:{PORT}/")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[API SERVER] Shutting down inference server.")
        httpd.server_close()

if __name__ == '__main__':
    run_server()
