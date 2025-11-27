

import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/communication-historique.css";

export default function HistoriqueParametres() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatut, setFilterStatut] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = 6;

  // Liste figée (statique)
  const historique = [
    { destinataire: "admin@campus.cm", sujet: "Test Email", type: "Email", date: "2025-11-15", statut: "Envoyé" },
    { destinataire: "user@campus.cm", sujet: "Notification", type: "SMS", date: "2025-11-14", statut: "Échec" },
    { destinataire: "prof@campus.cm", sujet: "Rappel réunion", type: "Email", date: "2025-11-13", statut: "Envoyé" },
    { destinataire: "etudiant@campus.cm", sujet: "Résultats examens", type: "Email", date: "2025-11-12", statut: "Envoyé" },
    { destinataire: "staff@campus.cm", sujet: "Maintenance", type: "SMS", date: "2025-11-11", statut: "Échec" },
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

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Ouvrir/Fermer popups
  const openView = (item) => { setSelectedItem(item); setShowViewPopup(true); };
  const openEdit = (item) => { setSelectedItem(item); setShowEditPopup(true); };
  const openDelete = (item) => { setSelectedItem(item); setShowDeletePopup(true); };
  const closeAll = () => { setShowSettingsPopup(false); setShowViewPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedItem(null); };

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
        <button className="btn btn-settings" onClick={() => setShowSettingsPopup(true)}>
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
                  <button className="btn btn-info btn-sm" onClick={() => openView(h)}>👁️ Voir</button>
                  <button className="btn btn-success btn-sm" onClick={() => openEdit(h)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(h)}>🗑️ Supprimer</button>
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
            <button disabled={currentPage === 1} onClick={goPrev}>⬅️ Précédent</button>
            <span>Page {currentPage} / {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={goNext}>Suivant ➡️</button>
          </div>
        )}
      </div>

      {/* Popup Voir */}
      {showViewPopup && selectedItem && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Détail de l’envoi</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="popup-body">
              <p><strong>Destinataire :</strong> {selectedItem.destinataire}</p>
              <p><strong>Sujet :</strong> {selectedItem.sujet}</p>
              <p><strong>Type :</strong> {selectedItem.type}</p>
              <p><strong>Date :</strong> {selectedItem.date}</p>
              <p><strong>Statut :</strong> {selectedItem.statut}</p>
            </div>
          </div>
        </div>
      )}

      {/* Popup Modifier */}
      {showEditPopup && selectedItem && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier un envoi</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Destinataire :</label><input type="text" defaultValue={selectedItem.destinataire} /></div>
                            <div className="form-group"><label>Sujet :</label><input type="text" defaultValue={selectedItem.sujet} /></div>
              <div className="form-group">
                <label>Type :</label>
                <select defaultValue={selectedItem.type}>
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                </select>
              </div>
              <div className="form-group"><label>Date d’envoi :</label><input type="date" defaultValue={selectedItem.date} /></div>
              <div className="form-group">
                <label>Statut :</label>
                <select defaultValue={selectedItem.statut}>
                  <option value="Envoyé">Envoyé</option>
                  <option value="Échec">Échec</option>
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
              <h2>Supprimer un envoi</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer cet envoi ? (Action inactive pour l’instant)</p>
              <ul>
                <li><strong>Destinataire :</strong> {selectedItem.destinataire}</li>
                <li><strong>Sujet :</strong> {selectedItem.sujet}</li>
                <li><strong>Type :</strong> {selectedItem.type}</li>
                <li><strong>Date :</strong> {selectedItem.date}</li>
                <li><strong>Statut :</strong> {selectedItem.statut}</li>
              </ul>
              <div className="form-actions">
                <button type="button" className="btn-delete">🗑️ Supprimer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup Modifier paramètres */}
      {showSettingsPopup && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier les paramètres</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Adresse Email système :</label><input type="email" placeholder="admin@smartcampus.cm" /></div>
              <div className="form-group"><label>Serveur SMTP :</label><input type="text" placeholder="smtp.smartcampus.cm" /></div>
              <div className="form-group"><label>Port :</label><input type="number" placeholder="587" /></div>
              <div className="form-group"><label>Mot de passe :</label><input type="password" placeholder="********" /></div>
              <div className="form-actions">
                <button type="button" className="btn-add">💾 Enregistrer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
