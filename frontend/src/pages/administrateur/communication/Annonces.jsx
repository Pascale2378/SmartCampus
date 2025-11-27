
import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/communication-annonces.css";

export default function AnnoncesGlobales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCible, setFilterCible] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  const itemsPerPage = 6;

  // Liste figée (statique)
  const annonces = [
    { titre: "Maintenance serveur", contenu: "Le serveur principal sera en maintenance ce weekend…", cible: "Tous", publication: "2025-11-15", expiration: "2025-11-20", statut: "Active" },
    { titre: "Nouvelle formation", contenu: "Une formation sur la cybersécurité est prévue…", cible: "Personnel", publication: "2025-11-10", expiration: "2025-11-30", statut: "Active" },
    { titre: "Vacances scolaires", contenu: "Les vacances débuteront le 20 décembre…", cible: "Étudiants", publication: "2025-11-05", expiration: "2025-12-20", statut: "Active" },
    { titre: "Réunion générale", contenu: "Réunion prévue pour tous les départements…", cible: "Tous", publication: "2025-11-01", expiration: "2025-11-10", statut: "Expirée" },
  ];

  // Filtrage
  const filtered = annonces.filter((a) => {
    const matchSearch =
      a.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.contenu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCible = filterCible === "" || a.cible === filterCible;
    return matchSearch && matchCible;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Ouvrir/Fermer popups
  const openAdd = () => setShowAddPopup(true);
  const openEdit = (a) => { setSelectedAnnonce(a); setShowEditPopup(true); };
  const openDelete = (a) => { setSelectedAnnonce(a); setShowDeletePopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedAnnonce(null); };

  return (
    <div className="page-container annonces-globales-container">
      <div className="page-header">
        <h1 className="page-title">Gestion des annonces globales</h1>
        <p className="page-subtitle">Publiez et gérez les annonces pour tout le campus</p>
      </div>

      {/* Barre de recherche + bouton nouvelle annonce */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher une annonce…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-add-annonce" onClick={openAdd}>
          ➕ Nouvelle annonce
        </button>
      </div>

      {/* Filtre par cible */}
      <div className="filters-row">
        <label>Cible :</label>
        <select
          value={filterCible}
          onChange={(e) => {
            setFilterCible(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Toutes</option>
          <option value="Tous">Tous</option>
          <option value="Personnel">Personnel</option>
          <option value="Étudiants">Étudiants</option>
        </select>
      </div>

      {/* Tableau */}
      <div className="page-content full-table">
        <table className="smart-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Contenu (extrait)</th>
              <th>Cible</th>
              <th>Date de publication</th>
              <th>Date d’expiration</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((a, index) => (
              <tr key={index}>
                <td>{a.titre}</td>
                <td className="cell-left">{a.contenu}</td>
                <td>{a.cible}</td>
                <td>{a.publication}</td>
                <td>{a.expiration}</td>
                <td>
                  {a.statut === "Active" && <span className="badge badge-success">Active</span>}
                  {a.statut === "Expirée" && <span className="badge badge-danger">Expirée</span>}
                </td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => openEdit(a)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(a)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={7} className="empty-state">Aucune annonce trouvée</td>
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
              <h2>Nouvelle annonce</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Titre :</label><input type="text" placeholder="Titre de l’annonce" required /></div>
              <div className="form-group"><label>Contenu :</label><textarea rows={4} placeholder="Texte de l’annonce" required></textarea></div>
              <div className="form-group">
                <label>Cible :</label>
                <select required>
                  <option value="Tous">Tous</option>
                  <option value="Personnel">Personnel</option>
                  <option value="Étudiants">Étudiants</option>
                </select>
              </div>
              <div className="form-group"><label>Date de publication :</label><input type="date" required /></div>
              <div className="form-group"><label>Date d’expiration :</label><input type="date" required /></div>
              <div className="form-actions">
                <button type="button" className="btn-add">✅ Publier</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Modifier */}
      {showEditPopup && selectedAnnonce && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier une annonce</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Titre :</label><input type="text" defaultValue={selectedAnnonce.titre} /></div>
                          <div className="form-group"><label>Contenu :</label><textarea rows={4} defaultValue={selectedAnnonce.contenu}></textarea></div>
              <div className="form-group">
                <label>Cible :</label>
                <select defaultValue={selectedAnnonce.cible}>
                  <option value="Tous">Tous</option>
                  <option value="Personnel">Personnel</option>
                  <option value="Étudiants">Étudiants</option>
                </select>
              </div>
              <div className="form-group"><label>Date de publication :</label><input type="date" defaultValue={selectedAnnonce.publication} /></div>
              <div className="form-group"><label>Date d’expiration :</label><input type="date" defaultValue={selectedAnnonce.expiration} /></div>
              <div className="form-group">
                <label>Statut :</label>
                <select defaultValue={selectedAnnonce.statut}>
                  <option value="Active">Active</option>
                  <option value="Expirée">Expirée</option>
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
      {showDeletePopup && selectedAnnonce && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Supprimer une annonce</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer cette annonce ? (Action inactive pour l’instant)</p>
              <ul>
                <li><strong>Titre :</strong> {selectedAnnonce.titre}</li>
                <li><strong>Contenu :</strong> {selectedAnnonce.contenu}</li>
                <li><strong>Cible :</strong> {selectedAnnonce.cible}</li>
                <li><strong>Publication :</strong> {selectedAnnonce.publication}</li>
                <li><strong>Expiration :</strong> {selectedAnnonce.expiration}</li>
                <li><strong>Statut :</strong> {selectedAnnonce.statut}</li>
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
