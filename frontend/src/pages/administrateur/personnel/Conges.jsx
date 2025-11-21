import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/personnel-conges.css";

export default function PersonnelConges() {
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFunction, setFilterFunction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const demandes = [
    { nom: "Jean Dupont", fonction: "Professeur", type: "Congé annuel", debut: "2025-12-01", fin: "2025-12-15", statut: "Approuvé" },
    { nom: "Marie Claire", fonction: "Secrétaire", type: "Maladie", debut: "2025-11-20", fin: "2025-11-25", statut: "En attente" },
    { nom: "Paul Nguema", fonction: "Comptable", type: "Congé exceptionnel", debut: "2025-12-05", fin: "2025-12-08", statut: "Refusé" },
    { nom: "Alice Essono", fonction: "Professeur", type: "Congé annuel", debut: "2025-12-10", fin: "2025-12-20", statut: "Approuvé" },
    { nom: "David Tchoumba", fonction: "Secrétaire", type: "Maladie", debut: "2025-11-18", fin: "2025-11-22", statut: "En attente" },
    { nom: "Sarah Kouassi", fonction: "Comptable", type: "Congé annuel", debut: "2025-12-02", fin: "2025-12-12", statut: "Approuvé" },
    { nom: "Pierre Martin", fonction: "Professeur", type: "Congé exceptionnel", debut: "2025-12-03", fin: "2025-12-05", statut: "Refusé" },
    { nom: "Laura Biyong", fonction: "Secrétaire", type: "Congé annuel", debut: "2025-12-07", fin: "2025-12-17", statut: "En attente" },
    { nom: "Hervé Nchout", fonction: "Comptable", type: "Maladie", debut: "2025-11-28", fin: "2025-12-01", statut: "Approuvé" },
    { nom: "Nadia Olinga", fonction: "Professeur", type: "Congé annuel", debut: "2025-12-22", fin: "2026-01-02", statut: "En attente" },
    { nom: "Marc Ewane", fonction: "Professeur", type: "Congé exceptionnel", debut: "2025-12-11", fin: "2025-12-13", statut: "Approuvé" },
  ];

  const filtered = demandes.filter(
    (d) =>
      d.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterFunction === "" || d.fonction === filterFunction)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goTo = (n) => setCurrentPage(n);

  return (
    <div className="page-container personnel-conges-container">
      <div className="page-header">
        <h1 className="page-title">Congés et absences</h1>
        <p className="page-subtitle">Recherche, filtre par fonction et gestion des demandes</p>
      </div>

      {/* Barre de recherche full width + bouton à droite */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-new-request" onClick={() => setShowPopup(true)}>
          ➕ Nouvelle demande
        </button>
      </div>

      {/* Filtre par fonction, sous la barre de recherche à gauche */}
      <div className="filter-row">
        <label className="filter-label">Filtrer par fonction</label>
        <select
          className="filter-select"
          value={filterFunction}
          onChange={(e) => {
            setFilterFunction(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Toutes les fonctions</option>
          <option value="Professeur">Professeur</option>
          <option value="Secrétaire">Secrétaire</option>
          <option value="Comptable">Comptable</option>
        </select>
      </div>

      {/* Tableau plein écran */}
      <div className="page-content full-table">
        <table className="smart-table smart-table--spacious">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Fonction</th>
              <th>Type de congé</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((d, i) => (
              <tr key={`${d.nom}-${i}`}>
                <td className="cell-left">{d.nom}</td>
                <td>{d.fonction}</td>
                <td>{d.type}</td>
                <td>{d.debut}</td>
                <td>{d.fin}</td>
                <td>
                  {d.statut === "Approuvé" && <span className="badge badge-success">Approuvé</span>}
                  {d.statut === "En attente" && <span className="badge badge-warning">En attente</span>}
                  {d.statut === "Refusé" && <span className="badge badge-danger">Refusé</span>}
                </td>
                <td className="cell-actions">
                  <button className="btn btn-success btn-sm">✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm">🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={7} className="empty-state">Aucun résultat</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination 10 par page */}
        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={goPrev}>⬅️ Précédent</button>
            <div className="pages">
              {Array.from({ length: totalPages }, (_, idx) => {
                const n = idx + 1;
                return (
                  <button
                    key={n}
                    className={`page-btn ${currentPage === n ? "active" : ""}`}
                    onClick={() => goTo(n)}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <button disabled={currentPage === totalPages} onClick={goNext}>Suivant ➡️</button>
          </div>
        )}
      </div>

      {/* Popup pro: nouvelle demande */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Nouvelle demande de congé</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>✖</button>
            </div>
            <form className="popup-form">
              <div className="form-grid">
                <div className="form-item">
                  <label>Nom complet</label>
                  <input type="text" placeholder="Ex: Jean Dupont" />
                </div>
                <div className="form-item">
                  <label>Fonction</label>
                  <select>
                    <option>Professeur</option>
                    <option>Secrétaire</option>
                    <option>Comptable</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="form-item">
                  <label>Type de congé</label>
                  <select>
                    <option>Congé annuel</option>
                    <option>Maladie</option>
                    <option>Congé exceptionnel</option>
                  </select>
                </div>
                <div className="form-item">
                  <label>Date début</label>
                  <input type="date" />
                </div>
                <div className="form-item">
                  <label>Date fin</label>
                  <input type="date" />
                </div>
                <div className="form-item">
                  <label>Commentaire</label>
                  <textarea rows={3} placeholder="Optionnel"></textarea>
                </div>
              </div>
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
