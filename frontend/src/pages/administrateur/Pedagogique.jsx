
import React from "react";
import "../../styles/page.css";

export default function Pedagogique() {
  return (
    <div className="page-container">
      <h1 className="page-title">Gestion Pédagogique</h1>
      <p className="page-description">
        Ici tu peux gérer les cours, programmes et ressources pédagogiques.
      </p>

      <div className="page-card">
        <h3>Liste des cours</h3>
        <ul>
          <li>Mathématiques - Licence 1</li>
          <li>Informatique - Licence 2</li>
          <li>Physique - Master 1</li>
        </ul>
      </div>
    </div>
  );
}
