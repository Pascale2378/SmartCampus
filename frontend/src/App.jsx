import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardAdmin from "./pages/administrateur/DashboardAdmin";

// Import des pages
import Etudiants from "./pages/administrateur/Etudiants";
import Formateurs from "./pages/administrateur/Formateurs";
import PersonnelListe from "./pages/administrateur/personnel/Liste";
import PersonnelConges from "./pages/administrateur/personnel/Conges";
import PedagogieFormations from "./pages/administrateur/pedagogie/Formations";
import PedagogieEmplois from "./pages/administrateur/pedagogie/Emplois";
import InventairesListe from "./pages/administrateur/inventaires/Liste";
import InventairesDemandes from "./pages/administrateur/inventaires/Demandes";
import FinancePaiements from "./pages/administrateur/finance/Paiements";
import FinancePaie from "./pages/administrateur/finance/Paie";
import FinanceRecus from "./pages/administrateur/finance/Recus";
import FinanceAlertes from "./pages/administrateur/finance/Alertes";
import SystemeParametres from "./pages/administrateur/systeme/Parametres";
import SystemeSauvegarde from "./pages/administrateur/systeme/Sauvegarde";
import SystemeLogs from "./pages/administrateur/systeme/Logs";
import SystemeSecurite from "./pages/administrateur/systeme/Securite";
import CommunicationAnnonces from "./pages/administrateur/communication/Annonces";
import CommunicationHistorique from "./pages/administrateur/communication/Historique";
import CommunicationPreferences from "./pages/administrateur/communication/Preferences";
import Logout from "./pages/administrateur/Deconnexion";
import Login from "./pages/Login";

function App() {
  return (
    <div className="app-layout">
      
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<DashboardAdmin />} />
            <Route path="/etudiants" element={<Etudiants />} />
            <Route path="/login" element={<Login />} />
            <Route path="/formateurs" element={<Formateurs />} />

            {/* Personnel */}
            <Route path="/personnel/liste" element={<PersonnelListe />} />
            <Route path="/personnel/conges" element={<PersonnelConges />} />

            {/* Pédagogie */}
            <Route path="/pedagogie/formations" element={<PedagogieFormations />} />
            <Route path="/pedagogie/emplois" element={<PedagogieEmplois />} />

            {/* Inventaires */}
            <Route path="/inventaires/liste" element={<InventairesListe />} />
            <Route path="/inventaires/demandes" element={<InventairesDemandes />} />

            {/* Finance */}
            <Route path="/finance/paiements" element={<FinancePaiements />} />
            <Route path="/finance/paie" element={<FinancePaie />} />
            <Route path="/finance/recus" element={<FinanceRecus />} />
            <Route path="/finance/alertes" element={<FinanceAlertes />} />

            {/* Système */}
            <Route path="/systeme/parametres" element={<SystemeParametres />} />
            <Route path="/systeme/sauvegarde" element={<SystemeSauvegarde />} />
            <Route path="/systeme/logs" element={<SystemeLogs />} />
            <Route path="/systeme/securite" element={<SystemeSecurite />} />

            {/* Communication */}
            <Route path="/communication/annonces" element={<CommunicationAnnonces />} />
            <Route path="/communication/historique" element={<CommunicationHistorique />} />
            <Route path="/communication/preferences" element={<CommunicationPreferences />} />

            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
