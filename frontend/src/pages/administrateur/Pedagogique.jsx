import React, { useState } from "react";
import "../../styles/page.css";
import "../../styles/pedagogie.css";

export default function Pedagogie() {
  const [showForm, setShowForm] = useState(false);
  const [matieres, setMatieres] = useState([
    { nom: "Mathématiques", code: "MAT101", enseignant: "Dr. Nguem", credits: 4 },
    { nom: "Informatique", code: "INF201", enseignant: "Mr. Kamga", credits: 3 },
  ]);

  const [newMatiere, setNewMatiere] = useState({ nom: "", code: "", enseignant: "", credits: "" });

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleChange = (e) => {
    setNewMatiere({ ...newMatiere, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMatieres([...matieres, newMatiere]);
    setNewMatiere({ nom: "", code: "", enseignant: "", credits: "" });
    setShowForm(false);
  };

  return (
    <div className="page-container pedagogie-page">
      <h1 className="page-title">Gestion Pédagogique</h1>

      <button className="btn-add" onClick={handleOpenForm}>
        Ajouter une matière
      </button>

      {/* Liste des matières */}
      <div className="pedagogie-wrapper">
        <table className="pedagogie-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Code</th>
              <th>Enseignant</th>
              <th>Crédits</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matieres.map((m, index) => (
              <tr key={index}>
                <td>{m.nom}</td>
                <td>{m.code}</td>
                <td>{m.enseignant}</td>
                <td>{m.credits}</td>
                <td>
                  <button className="btn-edit">Modifier</button>
                  <button className="btn-delete">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="popup-title">Ajouter une matière</h2>
            <form className="pedagogie-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" name="nom" value={newMatiere.nom} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Code</label>
                <input type="text" name="code" value={newMatiere.code} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Enseignant</label>
                <input type="text" name="enseignant" value={newMatiere.enseignant} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Crédits</label>
                <input type="number" name="credits" value={newMatiere.credits} onChange={handleChange} required />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-add">✅ Ajouter</button>
                <button type="button" className="btn-cancel" onClick={handleCloseForm}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
