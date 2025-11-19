import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardAdmin from "./pages/administrateur/DashboardAdmin";

// Import des nouvelles pages
import Etudiants from "./pages/administrateur/Etudiants";
import Formateurs from "./pages/administrateur/Formateurs";
import Personnel from "./pages/administrateur/Personnel";
import Pedagogique from "./pages/administrateur/Pedagogique";
import Inventaires from "./pages/administrateur/Inventaires";
import Systeme from "./pages/administrateur/Systeme";
import Communication from "./pages/administrateur/Communication";
import Logout from "./pages/administrateur/Deconnexion";

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
            <Route path="/formateurs" element={<Formateurs />} />
            <Route path="/personnel" element={<Personnel />} />
            <Route path="/pedagogique" element={<Pedagogique />} />
            <Route path="/inventaires" element={<Inventaires />} />
            <Route path="/systeme" element={<Systeme />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
