
import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/finance-recus.css";

export default function RecusFactures() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = 6;

  // Liste figée (statique)
  const donnees = [
    { id: "REC001", type: "Reçu", nom: "Jean Dupont", date: "2025-11-20", montant: "150000", motif: "Frais de scolarité" },
    { id: "FAC001", type: "Facture", nom: "Marie Claire", date: "2025-11-18", montant: "200000", motif: "Formation Master Gestion" },
    { id: "REC002", type: "Reçu", nom: "Paul Essomba", date: "2025-11-15", montant: "120000", motif: "Licence Droit" },
    { id: "FAC002", type: "Facture", nom: "Alice Nguema", date: "2025-11-12", montant: "180000", motif: "Master Mathématiques" },
  ];

  // Filtrage
  const filtered = donnees.filter((d) => {
    const matchSearch =
      d.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.motif.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "" || d.type === filterType;
    return matchSearch && matchType;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Ouvrir/Fermer popups
  const openAdd = () => setShowAddPopup(true);
  const openEdit = (d) => { setSelectedItem(d); setShowEditPopup(true); };
  const openDelete = (d) => { setSelectedItem(d); setShowDeletePopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedItem(null); };

  return (
    <div className="page-container recus-factures-container">
      <div className="page-header">
        <h1 className="page-title">Reçus & Factures</h1>
        <p className="page-subtitle">Suivi des paiements et facturations</p>
      </div>

      {/* Barre de recherche + bouton ajouter */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher par ID, nom ou motif…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-add" onClick={openAdd}>
          ➕ Ajouter un reçu ou facture
        </button>
      </div>

      {/* Filtre */}
      <div className="filters-row">
        <label>Type :</label>
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Tous</option>
          <option value="Reçu">Reçu</option>
          <option value="Facture">Facture</option>
        </select>
      </div>

      {/* Tableau */}
      <div className="page-content full-table">
        <table className="smart-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Motif</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((d, index) => (
              <tr key={index}>
                <td>{d.id}</td>
                <td>{d.nom}</td>
                <td>{d.date}</td>
                <td>{d.montant} FCFA</td>
                <td>{d.motif}</td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => openEdit(d)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(d)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-state">Aucun reçu ou facture trouvé</td>
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
              <h2>Ajouter un reçu ou facture</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>ID :</label><input type="text" placeholder="Ex: REC003 ou FAC003" required /></div>
              <div className="form-group"><label>Nom :</label><input type="text" placeholder="Nom du client/étudiant" required /></div>
              <div className="form-group"><label>Date :</label><input type="date" required /></div>
              <div className="form-group"><label>Montant :</label><input type="number" placeholder="150000" required /></div>
              <div className="form-group"><label>Motif :</label><input type="text" placeholder="Ex: Frais de scolarité" required /></div>
              <div className="form-group">
                <label>Type :</label>
                <select required>
                  <option value="Reçu">Reçu</option>
                  <option value="Facture">Facture</option>
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
      {showEditPopup && selectedItem && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier un reçu ou facture</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>ID :</label><input type="text" defaultValue={selectedItem.id} /></div>
              <div className="form-group"><label>Nom :</label><input type="text" defaultValue={selectedItem.nom} /></div>
              <div className="form-group"><label>Date :</label><input type="date" defaultValue={selectedItem.date} /></div>
              <div className="form-group"><label>Montant :</label><input type="number" defaultValue={selectedItem.montant} /></div>
                            <div className="form-group"><label>Motif :</label><input type="text" defaultValue={selectedItem.motif} /></div>
              <div className="form-group">
                <label>Type :</label>
                <select defaultValue={selectedItem.type}>
                  <option value="Reçu">Reçu</option>
                  <option value="Facture">Facture</option>
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
      {showDeletePopup && selectedItem && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Supprimer un reçu ou facture</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer cet élément ? (Action inactive pour l’instant)</p>
              <ul>
                <li><strong>ID :</strong> {selectedItem.id}</li>
                <li><strong>Nom :</strong> {selectedItem.nom}</li>
                <li><strong>Date :</strong> {selectedItem.date}</li>
                <li><strong>Montant :</strong> {selectedItem.montant} FCFA</li>
                <li><strong>Motif :</strong> {selectedItem.motif}</li>
                <li><strong>Type :</strong> {selectedItem.type}</li>
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
