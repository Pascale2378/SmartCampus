
import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/personnel-liste.css";

export default function PersonnelListe() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterFunction, setFilterFunction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Liste figée (statique)
  const personnel = [
    { nom: "Jean Dupont", fonction: "Professeur", contact: "jean@campus.cm", date: "20/11/2025" },
    { nom: "Marie Claire", fonction: "Secrétaire", contact: "marie@campus.cm", date: "18/11/2025" },
    { nom: "Paul Nguema", fonction: "Comptable", contact: "paul@campus.cm", date: "15/11/2025" },
    { nom: "Alice Essono", fonction: "Professeur", contact: "alice@campus.cm", date: "12/11/2025" },
    { nom: "David Tchoumba", fonction: "Secrétaire", contact: "david@campus.cm", date: "10/11/2025" },
    { nom: "Sarah Kouassi", fonction: "Comptable", contact: "sarah@campus.cm", date: "08/11/2025" },
    { nom: "Pierre Martin", fonction: "Professeur", contact: "pierre@campus.cm", date: "07/11/2025" },
    { nom: "Laura Biyong", fonction: "Secrétaire", contact: "laura@campus.cm", date: "05/11/2025" },
    { nom: "Hervé Nchout", fonction: "Comptable", contact: "herve@campus.cm", date: "04/11/2025" },
    { nom: "Nadia Olinga", fonction: "Professeur", contact: "nadia@campus.cm", date: "03/11/2025" },
    { nom: "Marc Ewane", fonction: "Professeur", contact: "marc@campus.cm", date: "02/11/2025" },
  ];

  // Filtrage
  const filtered = personnel.filter(
    (p) =>
      p.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterFunction === "" || p.fonction === filterFunction)
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
  const openEdit = (p) => { setSelectedPersonnel(p); setShowEditPopup(true); };
  const openDelete = (p) => { setSelectedPersonnel(p); setShowDeletePopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedPersonnel(null); };

  return (
    <div className="page-container personnel-liste-container">
      <div className="page-header">
        <h1 className="page-title">Liste du personnel</h1>
        <p className="page-subtitle">Recherche, filtre et gestion des membres</p>
      </div>

      {/* Barre de recherche */}
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
        <button className="btn btn-add-personnel" onClick={openAdd}>
          ➕ Ajouter un personnel
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
              <th>Contact</th>
              <th>Date d'inscription</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p, i) => (
              <tr key={`${p.nom}-${i}`}>
                <td className="cell-left">{p.nom}</td>
                <td>{p.fonction}</td>
                <td className="cell-left">{p.contact}</td>
                <td>{p.date}</td>
                <td className="cell-actions">
                  <button className="btn btn-success btn-sm" onClick={() => openEdit(p)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(p)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-state">Aucun résultat</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={goPrev} disabled={currentPage === 1}>Précédent</button>
          <span>Page {currentPage} / {totalPages}</span>
          <button onClick={goNext} disabled={currentPage === totalPages}>Suivant</button>
        </div>
      </div>

      {/* Popup Ajouter */}
      {showAddPopup && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Ajouter un personnel</h2>
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
                <label>Contact</label>
                <input type="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <label>Date d'inscription</label>
                <input type="date" required />
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
      {showEditPopup && selectedPersonnel && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier un personnel</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                <label>Nom</label>
                <input type="text" defaultValue={selectedPersonnel.nom} />
              </div>
              <div className="form-group">
                <label>Fonction</label>
                <input type="text" defaultValue={selectedPersonnel.fonction} />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input type="email" defaultValue={selectedPersonnel.contact} />
              </div>
              <div className="form-group">
                <label>Date d'inscription</label>
                <input type="text" defaultValue={selectedPersonnel.date} />
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
      {showDeletePopup && selectedPersonnel && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Supprimer un personnel</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer ce membre du personnel ? (Action inactive pour l’instant)</p>
              <ul>
                <li><strong>Nom :</strong> {selectedPersonnel.nom}</li>
                <li><strong>Fonction :</strong> {selectedPersonnel.fonction}</li>
                <li><strong>Contact :</strong> {selectedPersonnel.contact}</li>
                <li><strong>Date :</strong> {selectedPersonnel.date}</li>
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
