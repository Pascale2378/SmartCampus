
import React, { useState } from "react";
import "../../styles/page.css";
import "../../styles/formateurs.css";

export default function Formateurs() {
  // Liste figée de formateurs (statique)
  const formateurs = [
    { nom: "Dr. Kamga", specialite: "Mathématiques", email: "kamga@mail.com", contact: "+237 699 11 22 33" },
    { nom: "Prof. Essomba", specialite: "Physique", email: "essomba@mail.com", contact: "+237 677 44 55 66" },
    { nom: "Mr. Tchoua", specialite: "Informatique", email: "tchoua@mail.com", contact: "+237 690 77 88 99" },
    { nom: "Mme. Fokou", specialite: "Chimie", email: "fokou@mail.com", contact: "+237 691 22 33 44" },
    { nom: "Dr. Nguetcha", specialite: "Biologie", email: "nguetcha@mail.com", contact: "+237 692 55 66 77" },
    { nom: "Prof. Mvondo", specialite: "Philosophie", email: "mvondo@mail.com", contact: "+237 693 88 99 00" },
  ];

  // Barre de recherche
  const [searchTerm, setSearchTerm] = useState("");
  const filteredFormateurs = formateurs.filter((f) =>
    f.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const formateursPerPage = 5;
  const totalPages = Math.ceil(filteredFormateurs.length / formateursPerPage);
  const indexOfLast = currentPage * formateursPerPage;
  const indexOfFirst = indexOfLast - formateursPerPage;
  const currentFormateurs = filteredFormateurs.slice(indexOfFirst, indexOfLast);

  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Popups
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedFormateur, setSelectedFormateur] = useState(null);

  const openAdd = () => setShowAddPopup(true);
  const openEdit = (f) => { setSelectedFormateur(f); setShowEditPopup(true); };
  const openDelete = (f) => { setSelectedFormateur(f); setShowDeletePopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedFormateur(null); };

  return (
    <div className="page-container formateurs-page">
      {/* En-tête */}
      <div className="page-header">
        <h1 className="page-title">Gestion des Formateurs</h1>
        <p className="page-subtitle">Suivi des enseignants, spécialités et informations de contact</p>
      </div>

      {/* Toolbar : recherche + bouton ajouter */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher un formateur…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn-add-formateur" onClick={openAdd}>➕ Ajouter un formateur</button>
      </div>

      {/* Tableau */}
      <div className="formateurs-wrapper">
        <table className="formateurs-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Spécialité</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFormateurs.map((f, idx) => (
              <tr key={indexOfFirst + idx}>
                <td>{f.nom}</td>
                <td>{f.specialite}</td>
                <td>{f.email}</td>
                <td>{f.contact}</td>
                <td className="cell-actions">
                  <button className="btn-edit" onClick={() => openEdit(f)}>✏️ Modifier</button>
                  <button className="btn-delete" onClick={() => openDelete(f)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {currentFormateurs.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-state">Aucun formateur trouvé</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>⬅️ Précédent</button>
            <span>Page {currentPage} / {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Suivant ➡️</button>
          </div>
        )}
      </div>

      {/* Popup Ajouter */}
      {showAddPopup && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Ajouter un formateur</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="formateur-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Nom complet</label><input type="text" placeholder="Nom du formateur" required /></div>
              <div className="form-group"><label>Spécialité</label><input type="text" placeholder="Spécialité" required /></div>
              <div className="form-group"><label>Email</label><input type="email" placeholder="Email" required /></div>
              <div className="form-group"><label>Contact</label><input type="text" placeholder="Téléphone" required /></div>
              <div className="form-actions">
                <button type="button" className="btn-add">✅ Ajouter</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Modifier */}
      {showEditPopup && selectedFormateur && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier un formateur</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="formateur-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>Nom complet</label><input type="text" defaultValue={selectedFormateur.nom} /></div>
              <div className="form-group"><label>Spécialité</label><input type="text" defaultValue={selectedFormateur.specialite} /></div>
              <div className="form-group"><label>Email</label><input type="email" defaultValue={selectedFormateur.email} /></div>
              <div className="form-group"><label>Contact</label><input type="text" defaultValue={selectedFormateur.contact} /></div>
              <div className="form-actions">
                <button type="button" className="btn-add">💾 Enregistrer</button>
                <button type="button" className="btn-cancel" onClick={closeAll}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Supprimer */}
      {showDeletePopup && selectedFormateur && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
                            <h2>Supprimer un formateur</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>

            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer ce formateur ? (Action inactive pour l’instant)</p>
              <ul>
                <li><strong>Nom :</strong> {selectedFormateur.nom}</li>
                <li><strong>Spécialité :</strong> {selectedFormateur.specialite}</li>
                <li><strong>Email :</strong> {selectedFormateur.email}</li>
                <li><strong>Contact :</strong> {selectedFormateur.contact}</li>
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
