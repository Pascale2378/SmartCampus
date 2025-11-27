
import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/finance-alertes.css";

export default function AlertesPaiement() {
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedAlerte, setSelectedAlerte] = useState(null);

  const itemsPerPage = 6;

  // Liste figée (statique)
  const alertes = [
    { matricule: "ETU001", nom: "Jean Dupont", formation: "Licence Informatique", montant: "150000" },
    { matricule: "ETU002", nom: "Marie Claire", formation: "Master Gestion", montant: "200000" },
    { matricule: "ETU003", nom: "Paul Essomba", formation: "Licence Droit", montant: "120000" },
    { matricule: "ETU004", nom: "Alice Nguema", formation: "Master Mathématiques", montant: "180000" },
    { matricule: "ETU005", nom: "Serge Mbarga", formation: "Licence Économie", montant: "130000" },
    { matricule: "ETU006", nom: "Chantal Tchoumba", formation: "Licence Physique", montant: "140000" },
  ];

  // Pagination
  const totalPages = Math.ceil(alertes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = alertes.slice(startIndex, startIndex + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Ouvrir/Fermer popups
  const openAdd = () => setShowAddPopup(true);
  const openEdit = (a) => { setSelectedAlerte(a); setShowEditPopup(true); };
  const openDelete = (a) => { setSelectedAlerte(a); setShowDeletePopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedAlerte(null); };

  return (
    <div className="page-container alertes-paiement-container">
      <div className="page-header">
        <h1 className="page-title">Alertes de paiement</h1>
        <p className="page-subtitle">Suivi des étudiants avec montants dus et configuration des relances</p>
      </div>

      {/* Tableau */}
      <div className="page-content full-table">
        <table className="smart-table">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom de l’étudiant</th>
              <th>Formation</th>
              <th>Montant dû</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((a, index) => (
              <tr key={index}>
                <td>{a.matricule}</td>
                <td>{a.nom}</td>
                <td>{a.formation}</td>
                <td>{a.montant} FCFA</td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => openEdit(a)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(a)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-state">Aucune alerte trouvée</td>
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

      {/* Configuration des relances automatiques */}
      <div className="relances-card">
        <h2 className="card-title">Configuration des relances automatiques</h2>
        <form className="card-form">
          <label>
            Fréquence des relances :
            <select>
              <option>Quotidienne</option>
              <option>Hebdomadaire</option>
              <option>Mensuelle</option>
            </select>
          </label>
          <label>
            Canal de relance :
            <select>
              <option>Email</option>
              <option>SMS</option>
              <option>Notification App</option>
            </select>
          </label>
          <label>
            Nombre maximum de relances :
            <input type="number" placeholder="3" />
          </label>
          <label>
            Message par défaut :
            <textarea
              rows={4}
              placeholder="Cher étudiant, vous avez un montant dû. Merci de régulariser votre situation."
            ></textarea>
          </label>
          <button className="btn btn-primary">💾 Enregistrer</button>
        </form>
      </div>

      {/* Popup Ajouter */}
      {showAddPopup && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Ajouter une alerte</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Matricule :</label><input type="text" placeholder="ETU007" required /></div>
              <div className="form-group"><label>Nom :</label><input type="text" placeholder="Nom étudiant" required /></div>
              <div className="form-group"><label>Formation :</label><input type="text" placeholder="Formation" required /></div>
              <div className="form-group"><label>Montant dû :</label><input type="number" placeholder="150000" required /></div>
              <div className="form-actions">
                <button type="button" className="btn-add">✅ Enregistrer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Modifier */}
      {showEditPopup && selectedAlerte && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier une alerte</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Matricule :</label><input type="text" defaultValue={selectedAlerte.matricule} /></div>
              <div className="form-group"><label>Nom :</label><input type="text" defaultValue={selectedAlerte.nom} /></div>
              <div className="form-group"><label>Formation :</label><input type="text" defaultValue={selectedAlerte.formation} /></div>
              <div className="form-group"><label>Montant dû :</label><input type="number" defaultValue={selectedAlerte.montant} /></div>
              <div className="form-actions">
                <button type="button" className="btn-add">💾 Enregistrer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Supprimer */}
      {showDeletePopup && selectedAlerte && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Supprimer une alerte</h2>
                            <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer cette alerte ? (Action inactive pour l’instant)</p>
              <ul>
                <li><strong>Matricule :</strong> {selectedAlerte.matricule}</li>
                <li><strong>Nom :</strong> {selectedAlerte.nom}</li>
                <li><strong>Formation :</strong> {selectedAlerte.formation}</li>
                <li><strong>Montant dû :</strong> {selectedAlerte.montant} FCFA</li>
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
