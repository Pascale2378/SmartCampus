import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/communication-annonces.css";

export default function AnnoncesGlobales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCible, setFilterCible] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const itemsPerPage = 10;

  const annonces = [
    { titre: "Maintenance serveur", contenu: "Le serveur principal sera en maintenance ce weekend…", cible: "Tous", publication: "2025-11-15", expiration: "2025-11-20", statut: "Active" },
    { titre: "Nouvelle formation", contenu: "Une formation sur la cybersécurité est prévue…", cible: "Personnel", publication: "2025-11-10", expiration: "2025-11-30", statut: "Active" },
    { titre: "Vacances scolaires", contenu: "Les vacances débuteront le 20 décembre…", cible: "Étudiants", publication: "2025-11-05", expiration: "2025-12-20", statut: "Active" },
    { titre: "Réunion générale", contenu: "Réunion prévue pour tous les départements…", cible: "Tous", publication: "2025-11-01", expiration: "2025-11-10", statut: "Expirée" },
    // ➕ Ajoute plus d’annonces pour tester la pagination
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
        <button className="btn btn-add-annonce" onClick={() => setShowPopup(true)}>
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
                  <button className="btn btn-success btn-sm">✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm">🗑️ Supprimer</button>
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
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>⬅️ Précédent</button>
            <span>Page {currentPage} / {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Suivant ➡️</button>
          </div>
        )}
      </div>

      {/* Popup nouvelle annonce */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Nouvelle annonce</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>✖</button>
            </div>
            <form className="popup-form">
              <label>
                Titre :
                <input type="text" placeholder="Titre de l’annonce" />
              </label>
              <label>
                Contenu :
                <textarea rows={4} placeholder="Texte de l’annonce"></textarea>
              </label>
              <label>
                Cible :
                <select>
                  <option>Tous</option>
                  <option>Personnel</option>
                  <option>Étudiants</option>
                </select>
              </label>
              <label>
                Date de publication :
                <input type="date" />
              </label>
              <label>
                Date d’expiration :
                <input type="date" />
              </label>
              <div className="popup-actions">
                <button type="submit" className="btn btn-success">✅ Publier</button>
                <button type="button" className="btn btn-danger" onClick={() => setShowPopup(false)}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
