import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/finance-paie.css";

export default function Paie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedPaiement, setSelectedPaiement] = useState(null);

  const itemsPerPage = 6;

  // Liste figée (statique)
  const paiements = [
    { nom: "Jean Dupont", salaire: "250000", date: "2025-11-20", statut: "Payé" },
    { nom: "Marie Claire", salaire: "300000", date: "2025-11-18", statut: "Payé" },
    { nom: "Paul Essomba", salaire: "200000", date: "2025-11-15", statut: "En attente" },
    { nom: "Alice Nguema", salaire: "280000", date: "2025-11-12", statut: "Payé" },
    { nom: "Serge Mbarga", salaire: "220000", date: "2025-11-10", statut: "En attente" },
  ];

  // Filtrage
  const filtered = paiements.filter((p) =>
    p.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Ouvrir/Fermer popups
  const openAdd = () => setShowAddPopup(true);
  const openEdit = (p) => { setSelectedPaiement(p); setShowEditPopup(true); };
  const openDelete = (p) => { setSelectedPaiement(p); setShowDeletePopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedPaiement(null); };

  return (
    <div className="page-container paie-container">
      <div className="page-header">
        <h1 className="page-title">Paiements effectués</h1>
        <p className="page-subtitle">Suivi des salaires et paiements du personnel</p>
      </div>

      {/* Barre de recherche + bouton ajouter */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher par nom…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-add" onClick={openAdd}>
          ➕ Ajouter un paiement
        </button>
      </div>

      {/* Tableau */}
      <div className="page-content full-table">
        <table className="smart-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Salaire</th>
              <th>Date de paiement</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p, index) => (
              <tr key={index}>
                <td>{p.nom}</td>
                <td>{p.salaire} FCFA</td>
                <td>{p.date}</td>
                <td>
                  {p.statut === "Payé" && <span className="badge badge-success">Payé</span>}
                  {p.statut === "En attente" && <span className="badge badge-warning">En attente</span>}
                </td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => openEdit(p)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(p)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-state">Aucun paiement trouvé</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={goPrev}>⬅️ Précédent</button>
            <span>Page {currentPage} / {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={goNext}>Suivant ➡️</button>
          </div>
        )}
      </div>

      {/* Popup Ajouter */}
      {showAddPopup && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Ajouter un paiement</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Nom :</label><input type="text" placeholder="Nom du salarié" required /></div>
              <div className="form-group"><label>Salaire :</label><input type="number" placeholder="250000" required /></div>
              <div className="form-group"><label>Date de paiement :</label><input type="date" required /></div>
              <div className="form-group">
                <label>Statut :</label>
                <select required>
                  <option value="Payé">Payé</option>
                  <option value="En attente">En attente</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-add">✅ Enregistrer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Modifier */}
      {showEditPopup && selectedPaiement && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier un paiement</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Nom :</label><input type="text" defaultValue={selectedPaiement.nom} /></div>
              <div className="form-group"><label>Salaire :</label><input type="number" defaultValue={selectedPaiement.salaire} /></div>
              <div className="form-group"><label>Date de paiement :</label><input type="date" defaultValue={selectedPaiement.date} /></div>
              <div className="form-group">
                <label>Statut :</label>
                <select defaultValue={selectedPaiement.statut}>
                  <option value="Payé">Payé</option>
                  <option value="En attente">En attente</option>
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
      {showDeletePopup && selectedPaiement && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Supprimer un paiement</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer ce paiement ? (Action inactive pour l’instant)</p>
              <ul>
                                <li><strong>Nom :</strong> {selectedPaiement.nom}</li>
                <li><strong>Salaire :</strong> {selectedPaiement.salaire} FCFA</li>
                <li><strong>Date :</strong> {selectedPaiement.date}</li>
                <li><strong>Statut :</strong> {selectedPaiement.statut}</li>
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
