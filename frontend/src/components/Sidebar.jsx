import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaUsers, FaBook, FaBox, FaCog, FaComments, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">SmartCampus</h2>

      <ul className="sidebar-menu">
        <li><Link to="/"><FaHome /> Accueil</Link></li>
        <li><Link to="/etudiants"><FaUserGraduate /> Gestion des étudiants</Link></li>
        <li><Link to="/formateurs"><FaChalkboardTeacher /> Gestion des formateurs</Link></li>
        <li><Link to="/personnel"><FaUsers /> Gestion du personnel</Link></li>
        <li><Link to="/pedagogique"><FaBook /> Gestion pédagogique</Link></li>
        <li><Link to="/inventaires"><FaBox /> Gestion des inventaires</Link></li>
        <li><Link to="/systeme"><FaCog /> Administration du système</Link></li>
        <li><Link to="/communication"><FaComments /> Communication</Link></li>
        <li className="logout"><Link to="/logout"><FaSignOutAlt /> Déconnexion</Link></li>
      </ul>
    </div>
  );
}
