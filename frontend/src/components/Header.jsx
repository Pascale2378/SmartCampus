import "../styles/header.css";
import { FaBell, FaCog, FaUserCircle } from "react-icons/fa"; // Icônes FontAwesome

export default function Header() {
  return (
    <div className="header">
      <h2 className="header-title">Tableau de Bord Administrateur</h2>

      <div className="header-right">
        {/* Icône notifications */}
        <button className="icon-btn" title="Notifications">
          <FaBell />
        </button>

        {/* Icône paramètres */}
        <button className="icon-btn" title="Paramètres">
          <FaCog />
        </button>

        {/* Profil admin avec icône stylée */}
        <div className="admin-profile">
          <span className="admin-name">Admin</span>
          <FaUserCircle className="admin-avatar-icon" />
        </div>
      </div>
    </div>
  );
}
