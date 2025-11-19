import "../styles/header.css";

export default function Header() {
  return (
    <div className="header">
      <h2 className="header-title">Tableau de Bord Administrateur</h2>

      <div className="header-right">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Rechercher..."
        />

        <div className="admin-profile">
          <span className="admin-name">Admin</span>
          <img 
            src="https://via.placeholder.com/40" 
            alt="admin avatar" 
            className="admin-avatar"
          />
        </div>
      </div>
    </div>
  );
}