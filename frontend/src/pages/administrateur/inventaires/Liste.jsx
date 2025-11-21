import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/inventaires-liste.css";

export default function InventairesListe() {
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    // Ajoute plus d’articles si besoin
  ];

  const filtered = articles.filter((a) => {
    const matchSearch =
      a.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === "" || a.categorie === filterCategory;
    const matchStatus = filterStatus === "" || a.statut === filterStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goTo = (n) => setCurrentPage(n);

  return (
    <div className="page-container inventaires-liste-container">
      <div className="page-header">
        <h1 className="page-title">Liste des inventaires</h1>
        <p className="page-subtitle">Recherche, filtres et gestion des articles</p>
      </div>

      {/* Barre de recherche full width + bouton à droite */}
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
        <button className="btn btn-add-article" onClick={() => setShowPopup(true)}>
          ➕ Ajouter un article
        </button>
      </div>

      {/* Filtres sous la barre de recherche: catégorie + statut (à gauche) */}
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

      {/* Tableau pleine largeur/hauteur */}
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
                  <button className="btn btn-success btn-sm">✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm">🗑️ Supprimer</button>
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

        {/* Pagination 10 par page */}
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

      {/* Popup d’ajout d’article */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Ajouter un article</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>✖</button>
            </div>
            <form className="popup-form">
              <div className="form-grid">
                <div className="form-item">
                  <label>Référence</label>
                  <input type="text" placeholder="Ex: INV-011" />
                </div>
                <div className="form-item">
                  <label>Article</label>
                  <input type="text" placeholder="Nom de l’article" />
                </div>
                <div className="form-item">
                  <label>Catégorie</label>
                  <select>
                    <option>Informatique</option>
                    <option>Audiovisuel</option>
                    <option>Mobilier</option>
                    <option>Réseau</option>
                    <option>Sécurité</option>
                  </select>
                </div>
                <div className="form-item">
                  <label>Quantité</label>
                  <input type="number" min="0" placeholder="0" />
                </div>
                <div className="form-item">
                  <label>Statut</label>
                  <select>
                    <option>Bon</option>
                    <option>Utilisable</option>
                    <option>Maintenance</option>
                  </select>
                </div>
                <div className="form-item">
                  <label>Notes</label>
                  <textarea rows={3} placeholder="Commentaires (optionnel)"></textarea>
                </div>
              </div>
              <div className="popup-actions">
                <button type="submit" className="btn btn-success">✅ Enregistrer</button>
                <button type="button" className="btn btn-danger" onClick={() => setShowPopup(false)}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
