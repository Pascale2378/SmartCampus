
import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/inventaires-demandes.css";

export default function InventairesDemandes() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Liste figée (statique)
  const demandes = [
    { reference: "REQ-001", article: "Ordinateur Dell", typeMvt: "Sortie", depart: "Magasin central", arrivee: "Salle Info A", quantite: 2, statut: "En attente" },
    { reference: "REQ-002", article: "Projecteur Epson", typeMvt: "Sortie", depart: "Magasin A/V", arrivee: "Amphi 2", quantite: 1, statut: "Approuvée" },
    { reference: "REQ-003", article: "Chaise bureau", typeMvt: "Entrée", depart: "Fournisseur ABC", arrivee: "Magasin mobilier", quantite: 20, statut: "Reçue" },
    { reference: "REQ-004", article: "Routeur Cisco", typeMvt: "Sortie", depart: "Magasin réseau", arrivee: "Serveur 1", quantite: 1, statut: "Refusée" },
    { reference: "REQ-005", article: "Caméra IP", typeMvt: "Entrée", depart: "Fournisseur SEC", arrivee: "Magasin sécurité", quantite: 5, statut: "Reçue" },
    { reference: "REQ-006", article: "Micro sans fil", typeMvt: "Sortie", depart: "Magasin A/V", arrivee: "Salle polyvalente", quantite: 2, statut: "Approuvée" },
    { reference: "REQ-007", article: "Switch 24 ports", typeMvt: "Entrée", depart: "Fournisseur NET", arrivee: "Magasin réseau", quantite: 3, statut: "En attente" },
    { reference: "REQ-008", article: "Extincteur", typeMvt: "Sortie", depart: "Magasin sécurité", arrivee: "Bloc B", quantite: 4, statut: "Approuvée" },
    { reference: "REQ-009", article: "Table pliante", typeMvt: "Entrée", depart: "Fournisseur MOB", arrivee: "Magasin mobilier", quantite: 10, statut: "Reçue" },
    { reference: "REQ-010", article: "Serveur HP", typeMvt: "Sortie", depart: "Magasin informatique", arrivee: "Salle Serveurs", quantite: 1, statut: "En attente" },
    { reference: "REQ-011", article: "Câble HDMI", typeMvt: "Sortie", depart: "Magasin A/V", arrivee: "Amphi 1", quantite: 5, statut: "Approuvée" },
  ];

  // Filtrage
  const filtered = demandes.filter(
    (d) =>
      d.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.depart.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.arrivee.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="page-container inventaires-demandes-container">
      <div className="page-header">
        <h1 className="page-title">Suivi des demandes d’article</h1>
        <p className="page-subtitle">Recherche, suivi des mouvements et gestion des demandes</p>
      </div>

      {/* Barre de recherche */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher par article, référence, départ ou arrivée…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-add-request" onClick={openAdd}>
          ➕ Nouvelle demande
        </button>
      </div>

      {/* Tableau */}
      <div className="page-content full-table">
        <table className="smart-table smart-table--spacious">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Article</th>
              <th>Type de mouvement</th>
              <th>Départ</th>
              <th>Arrivée</th>
              <th>Quantité</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((d, i) => (
              <tr key={`${d.reference}-${i}`}>
                <td className="cell-left">{d.reference}</td>
                <td className="cell-left">{d.article}</td>
                <td>
                  {d.typeMvt === "Sortie" && <span className="badge badge-danger">Sortie</span>}
                  {d.typeMvt === "Entrée" && <span className="badge badge-success">Entrée</span>}
                </td>
                <td className="cell-left">{d.depart}</td>
                <td className="cell-left">{d.arrivee}</td>
                <td>{d.quantite}</td>
                <td>
                  {d.statut === "Approuvée" && <span className="badge badge-info">Approuvée</span>}
                  {d.statut === "Reçue" && <span className="badge badge-success">Reçue</span>}
                  {d.statut === "En attente" && <span className="badge badge-warning">En attente</span>}
                  {d.statut === "Refusée" && <span className="badge badge-danger">Refusée</span>}
                </td>
                <td className="cell-actions">
                  <button className="btn btn-success btn-sm" onClick={() => openEdit(d)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(d)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={8} className="empty-state">Aucun résultat</td>
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
          <div className="popup-content" onClick={(e) => e.stopPropagation()}></div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>         
              <div className="form-group">
                <label>Référence</label>
                <input type="text" placeholder="Référence" required />
              </div>
              <div className="form-group">
                <label>Article</label>
                <input type="text" placeholder="Nom de l'article" required />
              </div>
              <div className="form-group">
                <label>Type de mouvement</label>
                <select required>
                  <option value="Sortie">Sortie</option>
                  <option value="Entrée">Entrée</option>
                </select>
              </div>
              <div className="form-group">
                <label>Départ</label>
                <input type="text" placeholder="Lieu de départ" required />
              </div>
              <div className="form-group">
                <label>Arrivée</label>
                <input type="text" placeholder="Lieu d'arrivée" required />
              </div>
              <div className="form-group">
                <label>Quantité</label>
                <input type="number" placeholder="Quantité" required />
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select required>
                  <option value="En attente">En attente</option>
                  <option value="Approuvée">Approuvée</option>
                  <option value="Reçue">Reçue</option>
                  <option value="Refusée">Refusée</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-add">✅ Ajouter</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
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
                <label>Référence</label>
                <input type="text" defaultValue={selectedDemande.reference} />
              </div>
              <div className="form-group">
                <label>Article</label>
                <input type="text" defaultValue={selectedDemande.article} />
              </div>
              <div className="form-group">
                <label>Type de mouvement</label>
                <select defaultValue={selectedDemande.typeMvt}>
                  <option value="Sortie">Sortie</option>
                  <option value="Entrée">Entrée</option>
                </select>
              </div>
              <div className="form-group">
                <label>Départ</label>
                <input type="text" defaultValue={selectedDemande.depart} />
              </div>
              <div className="form-group">
                <label>Arrivée</label>
                <input type="text" defaultValue={selectedDemande.arrivee} />
              </div>
              <div className="form-group">
                <label>Quantité</label>
                <input type="number" defaultValue={selectedDemande.quantite} />
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select defaultValue={selectedDemande.statut}>
                  <option value="En attente">En attente</option>
                  <option value="Approuvée">Approuvée</option>
                  <option value="Reçue">Reçue</option>
                  <option value="Refusée">Refusée</option>
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
                <li><strong>Référence :</strong> {selectedDemande.reference}</li>
                <li><strong>Article :</strong> {selectedDemande.article}</li>
                <li><strong>Type :</strong> {selectedDemande.typeMvt}</li>
                <li><strong>Départ :</strong> {selectedDemande.depart}</li>
                <li><strong>Arrivée :</strong> {selectedDemande.arrivee}</li>
                <li><strong>Quantité :</strong> {selectedDemande.quantite}</li>
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
