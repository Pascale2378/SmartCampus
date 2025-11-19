import React, { useState } from "react";
import "../../styles/page.css";
import "../../styles/communication.css";

export default function Communication() {
  const [showForm, setShowForm] = useState(false);

  const [annonces, setAnnonces] = useState([
    { titre: "Réunion générale", contenu: "Réunion le 20/11 à 10h.", auteur: "Admin", cible: "Tous", datePublication: "18/11/2025", dateExpiration: "21/11/2025", statut: "Publié" },
    { titre: "Nouvelle bibliothèque", contenu: "Ouverture officielle.", auteur: "Admin", cible: "Étudiants", datePublication: "17/11/2025", dateExpiration: "30/11/2025", statut: "Programmé" },
  ]);

  const [newAnnonce, setNewAnnonce] = useState({
    titre: "",
    contenu: "",
    cible: "Tous",
    datePublication: "",
    dateExpiration: "",
    statut: "Brouillon",
  });

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnonce((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const annonce = {
      ...newAnnonce,
      auteur: "Admin",
      datePublication: newAnnonce.datePublication || new Date().toLocaleDateString(),
    };

    setAnnonces((prev) => [...prev, annonce]);
    setNewAnnonce({
      titre: "",
      contenu: "",
      cible: "Tous",
      datePublication: "",
      dateExpiration: "",
      statut: "Brouillon",
    });
    setShowForm(false);
  };

  return (
    <div className="page-container communication-page">
      <h1 className="page-title">Communication</h1>

      <button className="btn-add-annonce" onClick={handleOpenForm}>
        Nouvelle annonce
      </button>

      {/* Liste des annonces */}
      <div className="annonces-wrapper">
        <table className="annonces-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Contenu</th>
              <th>Auteur</th>
              <th>Cible</th>
              <th>Date de publication</th>
              <th>Date d’expiration</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {annonces.map((a, index) => (
              <tr key={index}>
                <td>{a.titre}</td>
                <td className="col-contenu">{a.contenu}</td>
                <td>{a.auteur}</td>
                <td>{a.cible}</td>
                <td>{a.datePublication}</td>
                <td>{a.dateExpiration || "-"}</td>
                <td>
                  <span className={`badge badge-${a.statut.toLowerCase()}`}>
                    {a.statut}
                  </span>
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
            <h2 className="popup-title">Créer une annonce</h2>
            <form className="annonce-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Titre</label>
                <input type="text" name="titre" value={newAnnonce.titre} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Contenu</label>
                <textarea name="contenu" value={newAnnonce.contenu} onChange={handleChange} rows={4} required></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cible</label>
                  <select name="cible" value={newAnnonce.cible} onChange={handleChange}>
                    <option value="Tous">Tous</option>
                    <option value="Étudiants">Étudiants</option>
                    <option value="Formateurs">Formateurs</option>
                    <option value="Personnel">Personnel</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Statut</label>
                  <select name="statut" value={newAnnonce.statut} onChange={handleChange}>
                    <option value="Brouillon">Brouillon</option>
                    <option value="Publié">Publié</option>
                    <option value="Programmé">Programmé</option>
                    <option value="Expiré">Expiré</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date de publication</label>
                  <input type="date" name="datePublication" value={newAnnonce.datePublication} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Date d’expiration</label>
                  <input type="date" name="dateExpiration" value={newAnnonce.dateExpiration} onChange={handleChange} />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-add">✅ Publier</button>
                <button type="button" className="btn-cancel" onClick={handleCloseForm}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
