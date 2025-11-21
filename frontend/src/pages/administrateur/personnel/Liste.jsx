import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/personnel-liste.css";

export default function PersonnelListe() {
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFunction, setFilterFunction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    // ajoute davantage pour tester au besoin
  ];

  const filtered = personnel.filter(
    (p) =>
      p.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterFunction === "" || p.fonction === filterFunction)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goTo = (n) => setCurrentPage(n);

  return (
    <div className="page-container personnel-liste-container">
      <div className="page-header">
        <h1 className="page-title">Liste du personnel</h1>
        <p className="page-subtitle">Recherche, filtre et gestion des membres</p>
      </div>

      {/* Barre de recherche plein largeur */}
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
        <button className="btn btn-add-personnel" onClick={() => setShowPopup(true)}>
          ➕ Ajouter un personnel
        </button>
      </div>

      {/* Filtre sous la barre de recherche, aligné à gauche */}
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

      {/* Tableau pleine largeur/hauteur */}
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
                  <button className="btn btn-success btn-sm">✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm">🗑️ Supprimer</button>
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

      {/* Popup ajout personnel */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Ajouter un personnel</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>✖</button>
            </div>
            <form className="popup-form">
              <div className="form-row">
                <label>Nom complet</label>
                <input type="text" placeholder="Ex: Jean Dupont" />
              </div>
              <div className="form-row">
                <label>Fonction</label>
                <select>
                  <option>Professeur</option>
                  <option>Secrétaire</option>
                  <option>Comptable</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="form-row">
                <label>Contact</label>
                <input type="email" placeholder="Email ou téléphone" />
              </div>
              <div className="form-row">
                <label>Date d'inscription</label>
                <input type="date" />
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
