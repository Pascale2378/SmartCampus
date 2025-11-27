
import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/personnel-conges.css";

export default function Conges() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterFunction, setFilterFunction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Liste figée (statique)
  const demandes = [
    { nom: "Jean Dupont", fonction: "Professeur", type: "Congé annuel", debut: "2025-12-01", fin: "2025-12-15", statut: "Approuvé" },
    { nom: "Marie Claire", fonction: "Secrétaire", type: "Maladie", debut: "2025-11-20", fin: "2025-11-25", statut: "En attente" },
    { nom: "Paul Nguema", fonction: "Comptable", type: "Congé exceptionnel", debut: "2025-12-05", fin: "2025-12-08", statut: "Refusé" },
    { nom: "Alice Essono", fonction: "Professeur", type: "Congé annuel", debut: "2025-12-10", fin: "2025-12-20", statut: "Approuvé" },
    { nom: "Jean Dupont", fonction: "Professeur", type: "Congé annuel", debut: "2025-12-01", fin: "2025-12-15", statut: "Approuvé" },
    { nom: "Marie Claire", fonction: "Secrétaire", type: "Maladie", debut: "2025-11-20", fin: "2025-11-25", statut: "En attente" },
    { nom: "Jean Dupont", fonction: "Professeur", type: "Congé annuel", debut: "2025-12-01", fin: "2025-12-15", statut: "Approuvé" },
    { nom: "Marie Claire", fonction: "Secrétaire", type: "Maladie", debut: "2025-11-20", fin: "2025-11-25", statut: "En attente" },
  ];

  // Filtrage
  const filtered = demandes.filter(
    (d) =>
      d.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterFunction === "" || d.fonction === filterFunction)
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goTo = (n) => setCurrentPage(n);

  // Ouvrir/Fermer popups
  const openAdd = () => setShowAddPopup(true);
  const openEdit = (d) => { setSelectedDemande(d); setShowEditPopup(true); };
  const openDelete = (d) => { setSelectedDemande(d); setShowDeletePopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedDemande(null); };

  return (
    <div className="page-container personnel-conges-container">
      <div className="page-header">
        <h1 className="page-title">Congés et absences</h1>
        <p className="page-subtitle">Recherche, filtre par fonction et gestion des demandes</p>
      </div>

      {/* Barre de recherche + bouton */}
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
        <button className="btn btn-new-request" onClick={openAdd}>
          ➕ Nouvelle demande
        </button>
      </div>

      {/* Filtre */}
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

      {/* Tableau */}
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
                  <button className="btn btn-success btn-sm" onClick={() => openEdit(d)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(d)}>🗑️ Supprimer</button>
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

        {/* Pagination */}
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

      {/* Popup Ajouter */}
      {showAddPopup && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Nouvelle demande de congé</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" placeholder="Nom complet" required />
              </div>
              <div className="form-group">
                <label>Fonction</label>
                <input type="text" placeholder="Fonction" required />
              </div>
              <div className="form-group">
                <label>Type de congé</label>
                <input type="text" placeholder="Type de congé" required />
              </div>
              <div className="form-group">
                <label>Date début</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Date fin</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select required>
                  <option value="Approuvé">Approuvé</option>
                  <option value="En attente">En attente</option>
                  <option value="Refusé">Refusé</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-add">✅ Ajouter</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

            {/* Popup Modifier */}
      {showEditPopup && selectedDemande && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier une demande</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" defaultValue={selectedDemande.nom} />
              </div>
              <div className="form-group">
                <label>Fonction</label>
                <input type="text" defaultValue={selectedDemande.fonction} />
              </div>
              <div className="form-group">
                <label>Type de congé</label>
                <input type="text" defaultValue={selectedDemande.type} />
              </div>
              <div className="form-group">
                <label>Date début</label>
                <input type="date" defaultValue={selectedDemande.debut} />
              </div>
              <div className="form-group">
                <label>Date fin</label>
                <input type="date" defaultValue={selectedDemande.fin} />
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select defaultValue={selectedDemande.statut}>
                  <option value="Approuvé">Approuvé</option>
                  <option value="En attente">En attente</option>
                  <option value="Refusé">Refusé</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-add">💾 Enregistrer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Supprimer */}
      {showDeletePopup && selectedDemande && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Supprimer une demande</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer cette demande ? (Action inactive pour l’instant)</p>
              <ul>
                <li><strong>Nom :</strong> {selectedDemande.nom}</li>
                <li><strong>Fonction :</strong> {selectedDemande.fonction}</li>
                <li><strong>Type :</strong> {selectedDemande.type}</li>
                <li><strong>Début :</strong> {selectedDemande.debut}</li>
                <li><strong>Fin :</strong> {selectedDemande.fin}</li>
                <li><strong>Statut :</strong> {selectedDemande.statut}</li>
              </ul>
              <div className="form-actions">
                <button type="button" className="btn-delete">🗑️ Supprimer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
