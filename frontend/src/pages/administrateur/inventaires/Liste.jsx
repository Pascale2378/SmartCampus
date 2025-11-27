
import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/inventaires-liste.css";

export default function InventairesListe() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Liste figée (statique)
  const articles = [
    { reference: "INV-001", article: "Ordinateur Dell", categorie: "Informatique", quantite: 10, statut: "Bon", etat: "OK" },
    { reference: "INV-002", article: "Projecteur Epson", categorie: "Audiovisuel", quantite: 3, statut: "Utilisable", etat: "OK" },
    { reference: "INV-003", article: "Chaise bureau", categorie: "Mobilier", quantite: 25, statut: "Bon", etat: "OK" },
    { reference: "INV-004", article: "Routeur Cisco", categorie: "Réseau", quantite: 5, statut: "Maintenance", etat: "ALERT" },
    { reference: "INV-005", article: "Table pliante", categorie: "Mobilier", quantite: 12, statut: "Bon", etat: "OK" },
    { reference: "INV-006", article: "Caméra IP", categorie: "Sécurité", quantite: 8, statut: "Utilisable", etat: "OK" },
    { reference: "INV-007", article: "Serveur HP", categorie: "Informatique", quantite: 2, statut: "Maintenance", etat: "ALERT" },
    { reference: "INV-008", article: "Micro sans fil", categorie: "Audiovisuel", quantite: 6, statut: "Bon", etat: "OK" },
    { reference: "INV-009", article: "Switch 24 ports", categorie: "Réseau", quantite: 4, statut: "Bon", etat: "OK" },
    { reference: "INV-010", article: "Extincteur", categorie: "Sécurité", quantite: 20, statut: "Bon", etat: "OK" },
  ];

  // Filtrage
  const filtered = articles.filter((a) => {
    const matchSearch =
      a.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === "" || a.categorie === filterCategory;
    const matchStatus = filterStatus === "" || a.statut === filterStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goTo = (n) => setCurrentPage(n);

  // Ouvrir/Fermer popups
  const openAdd = () => setShowAddPopup(true);
  const openEdit = (a) => { setSelectedArticle(a); setShowEditPopup(true); };
  const openDelete = (a) => { setSelectedArticle(a); setShowDeletePopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedArticle(null); };

  return (
    <div className="page-container inventaires-liste-container">
      <div className="page-header">
        <h1 className="page-title">Liste des inventaires</h1>
        <p className="page-subtitle">Recherche, filtres et gestion des articles</p>
      </div>

      {/* Barre de recherche */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher par nom d’article ou référence…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-add-article" onClick={openAdd}>
          ➕ Ajouter un article
        </button>
      </div>

      {/* Filtres */}
      <div className="filters-row">
        <div className="filter-group">
          <label className="filter-label">Catégorie</label>
          <select
            className="filter-select"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Toutes</option>
            <option>Informatique</option>
            <option>Audiovisuel</option>
            <option>Mobilier</option>
            <option>Réseau</option>
            <option>Sécurité</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Statut</label>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Tous</option>
            <option>Bon</option>
            <option>Utilisable</option>
            <option>Maintenance</option>
          </select>
        </div>
      </div>

      {/* Tableau */}
      <div className="page-content full-table">
        <table className="smart-table smart-table--spacious">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Article</th>
              <th>Catégorie</th>
              <th>Quantité</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((a, i) => (
              <tr key={`${a.reference}-${i}`}>
                <td className="cell-left">{a.reference}</td>
                <td className="cell-left">{a.article}</td>
                <td>{a.categorie}</td>
                <td>{a.quantite}</td>
                <td>
                  {a.statut === "Bon" && <span className="badge badge-success">Bon</span>}
                  {a.statut === "Utilisable" && <span className="badge badge-info">Utilisable</span>}
                  {a.statut === "Maintenance" && <span className="badge badge-warning">Maintenance</span>}
                </td>
                <td className="cell-actions">
                  <button className="btn btn-success btn-sm" onClick={() => openEdit(a)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => openDelete(a)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-state">Aucun résultat</td>
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
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                       <div className="popup-header">
              <h2>Ajouter un article</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
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
                <label>Catégorie</label>
                <input type="text" placeholder="Catégorie" required />
              </div>
              <div className="form-group">
                <label>Quantité</label>
                <input type="number" placeholder="Quantité" required />
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select required>
                  <option value="Bon">Bon</option>
                  <option value="Utilisable">Utilisable</option>
                  <option value="Maintenance">Maintenance</option>
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
      {showEditPopup && selectedArticle && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier un article</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Référence</label>
                <input type="text" defaultValue={selectedArticle.reference} />
              </div>
              <div className="form-group">
                <label>Article</label>
                <input type="text" defaultValue={selectedArticle.article} />
              </div>
              <div className="form-group">
                <label>Catégorie</label>
                <input type="text" defaultValue={selectedArticle.categorie} />
              </div>
              <div className="form-group">
                <label>Quantité</label>
                <input type="number" defaultValue={selectedArticle.quantite} />
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select defaultValue={selectedArticle.statut}>
                  <option value="Bon">Bon</option>
                  <option value="Utilisable">Utilisable</option>
                  <option value="Maintenance">Maintenance</option>
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
      {showDeletePopup && selectedArticle && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Supprimer un article</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer cet article ? (Action inactive pour l’instant)</p>
              <ul>
                <li><strong>Référence :</strong> {selectedArticle.reference}</li>
                <li><strong>Article :</strong> {selectedArticle.article}</li>
                <li><strong>Catégorie :</strong> {selectedArticle.categorie}</li>
                <li><strong>Quantité :</strong> {selectedArticle.quantite}</li>
                <li><strong>Statut :</strong> {selectedArticle.statut}</li>
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
