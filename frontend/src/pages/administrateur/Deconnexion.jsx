import React from "react";
import "../../styles/deconnexion.css";

export default function Deconnexion() {
  const handleLogout = () => {
    // Ici tu mets ta logique de déconnexion (clear token, redirect, etc.)
    window.location.href = "/login";
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h1 className="logout-title">Vous êtes sur le point de quitter SmartCampus</h1>
        <p className="logout-subtitle">Merci pour votre visite, à très bientôt 👋</p>

        <div className="logout-actions">
          <button className="btn-logout" onClick={handleLogout}>🚪 Déconnexion</button>
          <button className="btn-dashboard" onClick={() => window.location.href="/dashboard"}>🏠 Retour au tableau de bord</button>
          <button className="btn-switch" onClick={() => window.location.href="/login"}>🔄 Changer de compte</button>
        </div>
      </div>

      <footer className="logout-footer">
        <p>« Chaque fin est un nouveau départ. »</p>
      </footer>
    </div>
  );
}
