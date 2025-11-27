
import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/systeme-logs.css";

export default function LogsSysteme() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const itemsPerPage = 6;

  // Liste figée (statique)
  const logs = [
    { horodatage: "2025-11-20 14:30:12", niveau: "INFO", source: "AuthService", message: "Connexion réussie pour l’utilisateur admin" },
    { horodatage: "2025-11-20 14:35:45", niveau: "WARNING", source: "Database", message: "Temps de réponse élevé détecté" },
    { horodatage: "2025-11-20 14:40:01", niveau: "ERROR", source: "MailService", message: "Échec d’envoi d’email à user@campus.cm" },
    { horodatage: "2025-11-20 14:45:22", niveau: "INFO", source: "Scheduler", message: "Sauvegarde planifiée exécutée avec succès" },
    { horodatage: "2025-11-20 14:50:10", niveau: "ERROR", source: "FileSystem", message: "Impossible d’accéder au répertoire /backup" },
  ];

  // Filtrage
  const filteredLogs = logs.filter((log) => {
    const matchSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = filterLevel === "" || log.niveau === filterLevel;
    const matchSource = filterSource === "" || log.source === filterSource;
    return matchSearch && matchLevel && matchSource;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Ouvrir/Fermer popups
  const openAdd = () => setShowAddPopup(true);
  const openEdit = (log) => { setSelectedLog(log); setShowEditPopup(true); };
  const openDelete = (log) => { setSelectedLog(log); setShowDeletePopup(true); };
  const openView = (log) => { setSelectedLog(log); setShowViewPopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setShowViewPopup(false); setSelectedLog(null); };

  return (
    <div className="page-container logs-systeme-container">
      <div className="page-header">
        <h1 className="page-title">Logs système</h1>
        <p className="page-subtitle">Surveillance et analyse des événements du système</p>
      </div>

      {/* Barre de recherche + bouton ajouter */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher par message ou source…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-add" onClick={openAdd}>
          ➕ Ajouter un log
        </button>
      </div>

      {/* Filtres */}
      <div className="filters-row">
        <div className="filter-group">
          <label>Niveau :</label>
          <select
            value={filterLevel}
            onChange={(e) => {
              setFilterLevel(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Tous</option>
            <option value="INFO">INFO</option>
            <option value="WARNING">WARNING</option>
            <option value="ERROR">ERROR</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Source :</label>
          <select
            value={filterSource}
            onChange={(e) => {
              setFilterSource(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Toutes</option>
            <option value="AuthService">AuthService</option>
            <option value="Database">Database</option>
            <option value="MailService">MailService</option>
            <option value="Scheduler">Scheduler</option>
            <option value="FileSystem">FileSystem</option>
          </select>
        </div>
      </div>

      {/* Tableau */}
      <div className="page-content full-table">
        <table className="smart-table">
          <thead>
            <tr>
              <th>Horodatage</th>
              <th>Niveau</th>
              <th>Source</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.horodatage}</td>
                <td>{log.niveau}</td>
                <td>{log.source}</td>
                <td className="cell-left">{log.message}</td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => openView(log)}>👁️ Voir</button>
                  <button className="btn btn-success btn-sm" onClick={() => openEdit(log)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(log)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageLogs.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-state">Aucun log trouvé</td>
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
              <h2>Ajouter un log</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Horodatage :</label><input type="text" placeholder="2025-11-21 10:00:00" required /></div>
              <div className="form-group"><label>Niveau :</label><select required><option>INFO</option><option>WARNING</option><option>ERROR</option></select></div>
              <div className="form-group"><label>Source :</label><input type="text" placeholder="Service" required /></div>
              <div className="form-group"><label>Message :</label><textarea rows={3} placeholder="Message du log" required></textarea></div>
              <div className="form-actions">
                <button type="button" className="btn-add">✅ Enregistrer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Modifier */}
      {showEditPopup && selectedLog && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
              <h2>Modifier un log</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Horodatage :</label><input type="text" defaultValue={selectedLog.horodatage} /></div>
              <div className="form-group">
                <label>Niveau :</label>
                <select defaultValue={selectedLog.niveau}>
                  <option value="INFO">INFO</option>
                  <option value="WARNING">WARNING</option>
                  <option value="ERROR">ERROR</option>
                </select>
              </div>
              <div className="form-group"><label>Source :</label><input type="text" defaultValue={selectedLog.source} /></div>
              <div className="form-group"><label>Message :</label><textarea rows={3} defaultValue={selectedLog.message}></textarea></div>
              <div className="form-actions">
                <button type="button" className="btn-add">💾 Enregistrer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Supprimer */}
      {showDeletePopup && selectedLog && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Supprimer un log</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer ce log ? (Action inactive pour l’instant)</p>
              <ul>
                <li><strong>Horodatage :</strong> {selectedLog.horodatage}</li>
                <li><strong>Niveau :</strong> {selectedLog.niveau}</li>
                <li><strong>Source :</strong> {selectedLog.source}</li>
                <li><strong>Message :</strong> {selectedLog.message}</li>
              </ul>
              <div className="form-actions">
                <button type="button" className="btn-delete">🗑️ Supprimer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup Voir */}
      {showViewPopup && selectedLog && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Détail du log</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="popup-body">
              <p><strong>Horodatage :</strong> {selectedLog.horodatage}</p>
              <p><strong>Niveau :</strong> {selectedLog.niveau}</p>
              <p><strong>Source :</strong> {selectedLog.source}</p>
              <p><strong>Message :</strong> {selectedLog.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
