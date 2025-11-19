import React, { useState } from "react";
import "../../styles/page.css";
import "../../styles/systeme.css";

export default function Systeme() {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="page-container systeme-page">
      <h1 className="page-title">Administration du Système</h1>

      {/* Bouton pour ajouter un administrateur */}
      <button className="btn-add-admin" onClick={handleOpenForm}>
        Ajouter un administrateur
      </button>

      <div className="systeme-wrapper">
        {/* Gestion des utilisateurs */}
        <div className="page-card">
          <h3>Gestion des utilisateurs</h3>
          <table className="systeme-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Rôle</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jean Admin</td>
                <td>Administrateur</td>
                <td>admin@mail.com</td>
                <td>Actif</td>
                <td>
                  <button className="btn-edit">Modifier</button>
                  <button className="btn-delete">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Paramètres système */}
        <div className="page-card">
          <h3>Paramètres du système</h3>
          <ul>
            <li>Politique de mot de passe : <strong>8 caractères minimum</strong></li>
            <li>Authentification à deux facteurs : <strong>Activée</strong></li>
            <li>Notifications : <strong>Email + SMS</strong></li>
          </ul>
        </div>

        {/* Logs */}
        <div className="page-card">
          <h3>Logs et surveillance</h3>
          <ul>
            <li>Jean Admin - 19/11/2025 14h32</li>
            <li>Marie Formateur - 19/11/2025 13h10</li>
          </ul>
        </div>

        {/* Sauvegarde */}
        <div className="page-card">
          <h3>Sauvegarde et restauration</h3>
          <button className="btn-backup">Sauvegarder maintenant</button>
          <p>Dernière sauvegarde : 18/11/2025 à 22h00</p>
        </div>

        {/* Statistiques */}
        <div className="page-card">
          <h3>Statistiques système</h3>
          <p>Utilisateurs actifs : 120</p>
          <p>Modules utilisés : 8</p>
        </div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="popup-title">Ajouter un administrateur</h2>
            <form className="systeme-form">
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" />
              </div>
              <div className="form-group">
                <label>Rôle</label>
                <select>
                  <option>Administrateur</option>
                  <option>Super Admin</option>
                </select>
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
