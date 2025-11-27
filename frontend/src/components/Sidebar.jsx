import { useState } from "react";
import { 
  FaHome, FaUserGraduate, FaChalkboardTeacher, FaUsers, FaBook, 
  FaBox, FaCog, FaComments, FaSignOutAlt, FaMoneyBill 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">SmartCampus</h2>

      <ul className="sidebar-menu">                                                                       
        <li><Link to="/"><FaHome /> Accueil</Link></li>
        <li><Link to="/etudiants"><FaUserGraduate /> Gestion des étudiants</Link></li>
        <li><Link to="/formateurs"><FaChalkboardTeacher /> Gestion des formateurs</Link></li>

        {/* Gestion du personnel */}
        <li>
          <button className="menu-btn" onClick={() => toggleMenu("personnel")}>
            <FaUsers /> Gestion du personnel
          </button>
          {openMenu === "personnel" && (
            <ul className="submenu">
              <li><Link to="/personnel/liste">Liste du personnel</Link></li>
              <li><Link to="/personnel/conges">Congés et absences</Link></li>
            </ul>
          )}
        </li>

        {/* Gestion pédagogique */}
        <li>
          <button className="menu-btn" onClick={() => toggleMenu("pedagogie")}>
            <FaBook /> Gestion pédagogique
          </button>
          {openMenu === "pedagogie" && (
            <ul className="submenu">
              <li><Link to="/pedagogie/formations">Liste des formations</Link></li>
              <li><Link to="/pedagogie/emplois">Emploi du temps</Link></li>
            </ul>
          )}
        </li>

        {/* Gestion des inventaires */}
        <li>
          <button className="menu-btn" onClick={() => toggleMenu("inventaires")}>
            <FaBox /> Gestion des inventaires
          </button>
          {openMenu === "inventaires" && (
            <ul className="submenu">
              <li><Link to="/inventaires/liste">Liste des inventaires</Link></li>
              <li><Link to="/inventaires/demandes">Suivi des demandes d’article</Link></li>
            </ul>
          )}
        </li>

        {/* Gestion financière */}
        <li>
          <button className="menu-btn" onClick={() => toggleMenu("finance")}>
            <FaMoneyBill /> Gestion financière
          </button>
          {openMenu === "finance" && (
            <ul className="submenu">
              <li><Link to="/finance/paiements">Liste des paiements</Link></li>
              <li><Link to="/finance/paie">Paie</Link></li>
              <li><Link to="/finance/recus">Reçus et factures</Link></li>
              <li><Link to="/finance/alertes">Alertes de paiement</Link></li>
            </ul>
          )}
        </li>

        {/* Administration du système */}
        <li>
          <button className="menu-btn" onClick={() => toggleMenu("systeme")}>
            <FaCog /> Administration du système
          </button>
          {openMenu === "systeme" && (
            <ul className="submenu">
              <li><Link to="/systeme/parametres">Paramètres généraux</Link></li>
              <li><Link to="/systeme/sauvegarde">Sauvegarde et restauration</Link></li>
              <li><Link to="/systeme/logs">Logs système</Link></li>
              <li><Link to="/systeme/securite">Sécurité et accès</Link></li>
            </ul>
          )}
        </li>

        {/* Communication */}
        <li>
          <button className="menu-btn" onClick={() => toggleMenu("communication")}>
            <FaComments /> Communication
          </button>
          {openMenu === "communication" && (
            <ul className="submenu">
              <li><Link to="/communication/annonces">Gestion des annonces globales</Link></li>
              <li><Link to="/communication/historique">Historique et paramètres</Link></li>
              <li><Link to="/communication/preferences">Préférences de notification</Link></li>
            </ul>
          )}
        </li>

        <li className="logout"><Link to="/logout"><FaSignOutAlt /> Déconnexion</Link></li>
      </ul>
    </div>
  );
}
