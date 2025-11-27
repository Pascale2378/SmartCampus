import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/finance-paiements.css";

export default function Paiements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFormation, setFilterFormation] = useState("");
  const [filterStatut, setFilterStatut] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedPaiement, setSelectedPaiement] = useState(null);

  const itemsPerPage = 6;

  // Liste figée (statique)
  const paiements = [
    { nom: "Jean Dupont", formation: "Licence Informatique", du: 150000, paye: 100000, solde: 50000, date: "2025-12-01", statut: "Partiel" },
    { nom: "Marie Claire", formation: "Master Gestion", du: 200000, paye: 200000, solde: 0, date: "2025-11-30", statut: "Payé" },
    { nom: "Paul Essomba", formation: "Licence Droit", du: 120000, paye: 0, solde: 120000, date: "2025-12-05", statut: "Non payé" },
    { nom: "Alice Nguema", formation: "Licence Économie", du: 130000, paye: 80000, solde: 50000, date: "2025-12-10", statut: "Partiel" },
    { nom: "Serge Mbarga", formation: "Master Informatique", du: 180000, paye: 180000, solde: 0, date: "2025-11-28", statut: "Payé" },
  ];

  // Filtrage
  const filtered = paiements.filter((p) => {
    const matchSearch =
      p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.formation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFormation = filterFormation === "" || p.formation === filterFormation;
    const matchStatut = filterStatut === "" || p.statut === filterStatut;
    return matchSearch && matchFormation && matchStatut;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Ouvrir/Fermer popups
  const openAdd = () => setShowAddPopup(true);
  const openEdit = (p) => { setSelectedPaiement(p); setShowEditPopup(true); };
  const openDelete = (p) => { setSelectedPaiement(p); setShowDeletePopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedPaiement(null); };

  return (
    <div className="page-container paiements-container">
      <div className="page-header">
        <h1 className="page-title">Liste des paiements</h1>
        <p className="page-subtitle">Suivi des paiements par formation</p>
      </div>

      {/* Barre de recherche + bouton ajouter */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher par nom ou formation…"
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

      {/* Filtres */}
      <div className="filters-row">
        <div className="filter-group">
          <label>Formation :</label>
          <select
            value={filterFormation}
            onChange={(e) => {
              setFilterFormation(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Toutes</option>
            <option value="Licence Informatique">Licence Informatique</option>
            <option value="Master Gestion">Master Gestion</option>
            <option value="Licence Droit">Licence Droit</option>
            <option value="Licence Économie">Licence Économie</option>
            <option value="Master Informatique">Master Informatique</option>
          </select>
        </div>

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
            <option value="Payé">Payé</option>
            <option value="Partiel">Partiel</option>
            <option value="Non payé">Non payé</option>
          </select>
        </div>
      </div>

      {/* Tableau */}
      <div className="page-content full-table">
        <table className="smart-table">
          <thead>
            <tr>
              <th>Noms</th>
              <th>Formation</th>
              <th>Montant dû</th>
              <th>Montant payé</th>
              <th>Solde restant</th>
              <th>Date limite</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p, index) => (
              <tr key={index}>
                <td>{p.nom}</td>
                <td>{p.formation}</td>
                <td>{p.du} FCFA</td>
                <td>{p.paye} FCFA</td>
                <td>{p.solde} FCFA</td>
                <td>{p.date}</td>
                <td>
                  {p.statut === "Payé" && <span className="badge badge-success">Payé</span>}
                  {p.statut === "Partiel" && <span className="badge badge-warning">Partiel</span>}
                  {p.statut === "Non payé" && <span className="badge badge-danger">Non payé</span>}
                </td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => openEdit(p)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(p)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={8} className="empty-state">Aucun paiement trouvé</td>
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

      {/* Popup Ajouter */}
      {showAddPopup && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Ajouter un paiement</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Nom</label><input type="text" placeholder="Nom complet" required /></div>
              <div className="form-group"><label>Formation</label><input type="text" placeholder="Formation" required /></div>
              <div className="form-group"><label>Montant dû</label><input type="number" placeholder="Montant dû" required /></div>
              <div className="form-group"><label>Montant payé</label><input type="number" placeholder="Montant payé" required /></div>
              <div className="form-group"><label>Solde restant</label><input type="number" placeholder="Solde restant" required /></div>
              <div className="form-group"><label>Date limite</label><input type="date" required /></div>
              <div className="form-group">
                <label>Statut</label>
                <select required>
                                  <option value="Payé">Payé</option>
                  <option value="Partiel">Partiel</option>
                  <option value="Non payé">Non payé</option>
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
      {showEditPopup && selectedPaiement && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier un paiement</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Nom</label><input type="text" defaultValue={selectedPaiement.nom} /></div>
              <div className="form-group"><label>Formation</label><input type="text" defaultValue={selectedPaiement.formation} /></div>
              <div className="form-group"><label>Montant dû</label><input type="number" defaultValue={selectedPaiement.du} /></div>
              <div className="form-group"><label>Montant payé</label><input type="number" defaultValue={selectedPaiement.paye} /></div>
              <div className="form-group"><label>Solde restant</label><input type="number" defaultValue={selectedPaiement.solde} /></div>
              <div className="form-group"><label>Date limite</label><input type="date" defaultValue={selectedPaiement.date} /></div>
              <div className="form-group">
                <label>Statut</label>
                <select defaultValue={selectedPaiement.statut}>
                  <option value="Payé">Payé</option>
                  <option value="Partiel">Partiel</option>
                  <option value="Non payé">Non payé</option>
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
                <li><strong>Formation :</strong> {selectedPaiement.formation}</li>
                <li><strong>Montant dû :</strong> {selectedPaiement.du} FCFA</li>
                <li><strong>Montant payé :</strong> {selectedPaiement.paye} FCFA</li>
                <li><strong>Solde restant :</strong> {selectedPaiement.solde} FCFA</li>
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
