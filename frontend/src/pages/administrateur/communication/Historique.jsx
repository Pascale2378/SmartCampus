import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/communication-historique.css";

export default function HistoriqueParametres() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatut, setFilterStatut] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const itemsPerPage = 10;

  const historique = [
    { destinataire: "admin@campus.cm", sujet: "Test Email", type: "Email", date: "2025-11-15", statut: "Envoyé" },
    { destinataire: "user@campus.cm", sujet: "Notification", type: "SMS", date: "2025-11-14", statut: "Échec" },
    { destinataire: "prof@campus.cm", sujet: "Rappel réunion", type: "Email", date: "2025-11-13", statut: "Envoyé" },
    { destinataire: "etudiant@campus.cm", sujet: "Résultats examens", type: "Email", date: "2025-11-12", statut: "Envoyé" },
    { destinataire: "staff@campus.cm", sujet: "Maintenance", type: "SMS", date: "2025-11-11", statut: "Échec" },
    // ➕ Ajoute plus de données pour tester la pagination
  ];

  // Filtrage
  const filtered = historique.filter((h) => {
    const matchSearch =
      h.destinataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.sujet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatut = filterStatut === "" || h.statut === filterStatut;
    const matchType = filterType === "" || h.type === filterType;
    return matchSearch && matchStatut && matchType;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="page-container historique-parametres-container">
      <div className="page-header">
        <h1 className="page-title">Historique & Paramètres</h1>
        <p className="page-subtitle">Suivi des envois et configuration des paramètres</p>
      </div>

      {/* Barre de recherche + bouton modifier paramètres */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher par destinataire ou sujet…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-settings" onClick={() => setShowPopup(true)}>
          ⚙️ Modifier les paramètres
        </button>
      </div>

      {/* Filtres */}
      <div className="filters-row">
        <div className="filter-group">
          <label>Statut :</label>
          <select
            value={filterStatut}
            onChange={(e) => {
              setFilterStatut(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Tous</option>
            <option value="Envoyé">Envoyé</option>
            <option value="Échec">Échec</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Type :</label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Tous</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
          </select>
        </div>
      </div>

      {/* Tableau */}
      <div className="page-content full-table">
        <table className="smart-table">
          <thead>
            <tr>
              <th>Destinataire</th>
              <th>Sujet</th>
              <th>Type</th>
              <th>Date d’envoi</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((h, index) => (
              <tr key={index}>
                <td>{h.destinataire}</td>
                <td>{h.sujet}</td>
                <td>{h.type}</td>
                <td>{h.date}</td>
                <td>
                  {h.statut === "Envoyé" && <span className="badge badge-success">Envoyé</span>}
                  {h.statut === "Échec" && <span className="badge badge-danger">Échec</span>}
                </td>
                <td>
                  <button className="btn btn-info btn-sm">👁️ Voir</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-state">Aucun envoi trouvé</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>⬅️ Précédent</button>
            <span>Page {currentPage} / {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Suivant ➡️</button>
          </div>
        )}
      </div>

      {/* Popup modifier paramètres */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier les paramètres</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>✖</button>
            </div>
            <form className="popup-form">
              <label>
                Adresse Email système :
                <input type="email" placeholder="admin@smartcampus.cm" />
              </label>
              <label>
                Serveur SMTP :
                <input type="text" placeholder="smtp.smartcampus.cm" />
              </label>
              <label>
                Port :
                <input type="number" placeholder="587" />
              </label>
              <label>
                Mot de passe :
                <input type="password" placeholder="********" />
              </label>
              <div className="popup-actions">
                <button type="submit" className="btn btn-success">✅ Enregistrer</button>
                <button type="button" className="btn btn-danger" onClick={() => setShowPopup(false)}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
