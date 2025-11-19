import React from "react";
import "../../styles/page.css";

export default function Communication() {
  return (
    <div className="page-container">
      <h1 className="page-title">Communication</h1>
      <p className="page-description">
        Ici tu peux gérer les annonces, messages et notifications internes.
      </p>

      <div className="page-card">
        <h3>Annonces récentes</h3>
        <ul>
          <li>Réunion du personnel vendredi</li>
          <li>Nouvelle formation disponible</li>
          <li>Changement d’horaires pour la bibliothèque</li>
        </ul>
      </div>
    </div>
  );
}
