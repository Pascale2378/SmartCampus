import React from "react";
import "../../styles/page.css";

export default function Logout() {
  return (
    <div className="page-container">
      <h1 className="page-title">Déconnexion</h1>
      <p className="page-description">
        Tu es maintenant déconnecté. Merci d’avoir utilisé SmartCampus.
      </p>

      <div className="page-card">
        <h3>À bientôt !</h3>
        <p>Reconnecte-toi pour continuer à gérer ton campus.</p>
      </div>
    </div>
  );
}
