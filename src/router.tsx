import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { GliomaWorkspacePage } from './pages/GliomaWorkspacePage';
import { BreastCancerWorkspacePage } from './pages/breast-cancer/BreastCancerWorkspacePage';
import { GliomaOverviewPage } from './pages/GliomaOverviewPage';
import { GliomaMriAnalysisPage } from './pages/GliomaMriAnalysisPage';
import { GliomaDatasetsPage } from './pages/GliomaDatasetsPage';
import { GliomaModelsPage } from './pages/GliomaModelsPage';
import { GliomaEvaluationPage } from './pages/GliomaEvaluationPage';
import { GliomaArchitecturePage } from './pages/GliomaArchitecturePage';
import { GliomaPatientAnalysisPage } from './pages/GliomaPatientAnalysisPage';
import { GliomaExperimentsPage } from './pages/GliomaExperimentsPage';
import { GliomaReportsPage } from './pages/GliomaReportsPage';
import { PlannedDomainsPage } from './pages/PlannedDomainsPage';
import { ModalitiesPage } from './pages/ModalitiesPage';
import { ModalityDetailPage } from './pages/ModalityDetailPage';
import { BreastCancerOverviewPage } from './pages/breast-cancer/BreastCancerOverviewPage';
import { BreastCancerDatasetsPage } from './pages/breast-cancer/BreastCancerDatasetsPage';
import { BreastCancerExperimentsPage } from './pages/breast-cancer/BreastCancerExperimentsPage';
import { BreastCancerFindingsPage } from './pages/breast-cancer/BreastCancerFindingsPage';
import { BreastCancerArchitecturePage } from './pages/breast-cancer/BreastCancerArchitecturePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // Level 1: Platform Home & Selection
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'cancers',
        element: <LandingPage />
      },
      {
        path: 'landing',
        element: <LandingPage />
      },

      /* =========================================================
         LEVEL 2/3: GLIOMA WORKSPACE
         ========================================================= */
      {
        path: 'glioma',
        element: <GliomaWorkspacePage />
      },

      // Level 4: ⚡ AI Application / Detection Routes
      {
        path: 'glioma/analysis/mri',
        element: <GliomaMriAnalysisPage />
      },
      {
        path: 'glioma/analysis/patient',
        element: <GliomaPatientAnalysisPage />
      },

      // Level 4: 🔬 BTP Research Platform Routes
      {
        path: 'glioma/research/overview',
        element: <GliomaOverviewPage />
      },
      {
        path: 'glioma/research/datasets',
        element: <GliomaDatasetsPage />
      },
      {
        path: 'glioma/research/architecture',
        element: <GliomaArchitecturePage />
      },
      {
        path: 'glioma/research/evaluation',
        element: <GliomaEvaluationPage />
      },
      {
        path: 'glioma/research/models',
        element: <GliomaModelsPage />
      },
      {
        path: 'glioma/research/experiments',
        element: <GliomaExperimentsPage />
      },
      {
        path: 'glioma/research/reports',
        element: <GliomaReportsPage />
      },

      // Glioma Legacy Routes (100% Backward Compatibility)
      {
        path: 'glioma/overview',
        element: <GliomaOverviewPage />
      },
      {
        path: 'glioma/mri-analysis',
        element: <GliomaMriAnalysisPage />
      },
      {
        path: 'glioma/datasets',
        element: <GliomaDatasetsPage />
      },
      {
        path: 'glioma/models',
        element: <GliomaModelsPage />
      },
      {
        path: 'glioma/evaluation',
        element: <GliomaEvaluationPage />
      },
      {
        path: 'glioma/architecture',
        element: <GliomaArchitecturePage />
      },
      {
        path: 'glioma/patient-analysis',
        element: <GliomaPatientAnalysisPage />
      },
      {
        path: 'glioma/experiments',
        element: <GliomaExperimentsPage />
      },
      {
        path: 'glioma/reports',
        element: <GliomaReportsPage />
      },


      /* =========================================================
         LEVEL 2/3: BREAST CANCER WORKSPACE
         ========================================================= */
      {
        path: 'breast-cancer',
        element: <BreastCancerWorkspacePage />
      },

      // Level 4: ⚡ AI Application / Detection Routes
      {
        path: 'breast-cancer/analysis',
        element: <BreastCancerOverviewPage />
      },

      // Level 4: 🔬 BTP Research Platform Routes
      {
        path: 'breast-cancer/research/overview',
        element: <BreastCancerOverviewPage />
      },
      {
        path: 'breast-cancer/research/datasets',
        element: <BreastCancerDatasetsPage />
      },
      {
        path: 'breast-cancer/research/architecture',
        element: <BreastCancerArchitecturePage />
      },
      {
        path: 'breast-cancer/research/experiments',
        element: <BreastCancerExperimentsPage />
      },
      {
        path: 'breast-cancer/research/findings',
        element: <BreastCancerFindingsPage />
      },

      // Breast Cancer Legacy Routes
      {
        path: 'breast-cancer/overview',
        element: <BreastCancerOverviewPage />
      },
      {
        path: 'breast-cancer/datasets',
        element: <BreastCancerDatasetsPage />
      },
      {
        path: 'breast-cancer/experiments',
        element: <BreastCancerExperimentsPage />
      },
      {
        path: 'breast-cancer/findings',
        element: <BreastCancerFindingsPage />
      },
      {
        path: 'breast-cancer/architecture',
        element: <BreastCancerArchitecturePage />
      },


      /* =========================================================
         PLATFORM GLOBAL UTILITIES & ROADMAP
         ========================================================= */
      {
        path: 'planned-domains',
        element: <PlannedDomainsPage />
      },
      {
        path: 'planned-domains/:cancerId',
        element: <PlannedDomainsPage />
      },
      {
        path: 'modalities',
        element: <ModalitiesPage />
      },
      {
        path: 'modalities/:modalityId',
        element: <ModalityDetailPage />
      },
      {
        path: 'experiments',
        element: <GliomaExperimentsPage />
      },
      {
        path: 'dashboard',
        element: <Navigate to="/" replace />
      },

      // Fallback Global Redirects
      {
        path: 'datasets',
        element: <Navigate to="/glioma/research/datasets" replace />
      },
      {
        path: 'models',
        element: <Navigate to="/glioma/research/models" replace />
      },
      {
        path: 'patient-analysis',
        element: <Navigate to="/glioma/analysis/patient" replace />
      },
      {
        path: 'reports',
        element: <Navigate to="/glioma/research/reports" replace />
      },
      {
        path: 'cancers/:cancerId',
        element: <Navigate to="/planned-domains/:cancerId" replace />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);
