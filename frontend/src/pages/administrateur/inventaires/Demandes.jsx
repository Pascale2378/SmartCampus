import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/inventaires-demandes.css";

export default function InventairesDemandes() {
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const demandes = [
    { reference: "REQ-001", article: "Ordinateur Dell", typeMvt: "Sortie", depart: "Magasin central", arrivee: "Salle Info A", quantite: 2, statut: "En attente" },
    { reference: "REQ-002", article: "Projecteur Epson", typeMvt: "Sortie", depart: "Magasin A/V", arrivee: "Amphi 2", quantite: 1, statut: "Approuvée" },
    { reference: "REQ-003", article: "Chaise bureau", typeMvt: "Entrée", depart: "Fournisseur ABC", arrivee: "Magasin mobilier", quantite: 20, statut: "Reçue" },
    { reference: "REQ-004", article: "Routeur Cisco", typeMvt: "Sortie", depart: "Magasin réseau", arrivee: "Serveur 1", quantite: 1, statut: "Refusée" },
    { reference: "REQ-005", article: "Caméra IP", typeMvt: "Entrée", depart: "Fournisseur SEC", arrivee: "Magasin sécurité", quantite: 5, statut: "Reçue" },
    { reference: "REQ-006", article: "Micro sans fil", typeMvt: "Sortie", depart: "Magasin A/V", arrivee: "Salle polyvalente", quantite: 2, statut: "Approuvée" },
    { reference: "REQ-007", article: "Switch 24 ports", typeMvt: "Entrée", depart: "Fournisseur NET", arrivee: "Magasin réseau", quantite: 3, statut: "En attente" },
    { reference: "REQ-008", article: "Extincteur", typeMvt: "Sortie", depart: "Magasin sécurité", arrivee: "Bloc B", quantite: 4, statut: "Approuvée" },
    { reference: "REQ-009", article: "Table pliante", typeMvt: "Entrée", depart: "Fournisseur MOB", arrivee: "Magasin mobilier", quantite: 10, statut: "Reçue" },
    { reference: "REQ-010", article: "Serveur HP", typeMvt: "Sortie", depart: "Magasin informatique", arrivee: "Salle Serveurs", quantite: 1, statut: "En attente" },
    { reference: "REQ-011", article: "Câble HDMI", typeMvt: "Sortie", depart: "Magasin A/V", arrivee: "Amphi 1", quantite: 5, statut: "Approuvée" },
  ];

  const filtered = demandes.filter(
    (d) =>
      d.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.depart.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.arrivee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goTo = (n) => setCurrentPage(n);

  return (
    <div className="page-container inventaires-demandes-container">
      <div className="page-header">
        <h1 className="page-title">Suivi des demandes d’article</h1>
        <p className="page-subtitle">Recherche, suivi des mouvements et gestion des demandes</p>
      </div>

      {/* Barre de recherche full width + bouton à droite */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher par article, référence, départ ou arrivée…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-add-request" onClick={() => setShowPopup(true)}>
          ➕ Nouvelle demande
        </button>
      </div>

      {/* Tableau pleine largeur/hauteur */}
      <div className="page-content full-table">
        <table className="smart-table smart-table--spacious">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Article</th>
              <th>Type de mouvement</th>
              <th>Départ</th>
              <th>Arrivée</th>
              <th>Quantité</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((d, i) => (
              <tr key={`${d.reference}-${i}`}>
                <td className="cell-left">{d.reference}</td>
                <td className="cell-left">{d.article}</td>
                <td>
                  {d.typeMvt === "Sortie" && <span className="badge badge-danger">Sortie</span>}
                  {d.typeMvt === "Entrée" && <span className="badge badge-success">Entrée</span>}
                </td>
                <td className="cell-left">{d.depart}</td>
                <td className="cell-left">{d.arrivee}</td>
                <td>{d.quantite}</td>
                <td>
                  {d.statut === "Approuvée" && <span className="badge badge-info">Approuvée</span>}
                  {d.statut === "Reçue" && <span className="badge badge-success">Reçue</span>}
                  {d.statut === "En attente" && <span className="badge badge-warning">En attente</span>}
                  {d.statut === "Refusée" && <span className="badge badge-danger">Refusée</span>}
                </td>
                <td className="cell-actions">
                  <button className="btn btn-success btn-sm">✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm">🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={8} className="empty-state">Aucun résultat</td>
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

      {/* Popup pro: création d’une demande */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Nouvelle demande d’article</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>✖</button>
            </div>
            <form className="popup-form">
              <div className="form-grid">
                <div className="form-item">
                  <label>Référence</label>
                  <input type="text" placeholder="Ex: REQ-012" />
                </div>
                <div className="form-item">
                  <label>Article</label>
                  <input type="text" placeholder="Nom de l’article" />
                </div>
                <div className="form-item">
                  <label>Type de mouvement</label>
                  <select>
                    <option>Sortie</option>
                    <option>Entrée</option>
                  </select>
                </div>
                <div className="form-item">
                  <label>Départ</label>
                  <input type="text" placeholder="Ex: Magasin central" />
                </div>
                <div className="form-item">
                  <label>Arrivée</label>
                  <input type="text" placeholder="Ex: Salle B-1" />
                </div>
                <div className="form-item">
                  <label>Quantité</label>
                  <input type="number" min="1" placeholder="1" />
                </div>
                <div className="form-item">
                  <label>Statut</label>
                  <select>
                    <option>En attente</option>
                    <option>Approuvée</option>
                    <option>Reçue</option>
                    <option>Refusée</option>
                  </select>
                </div>
                <div className="form-item form-item--full">
                  <label>Commentaires</label>
                  <textarea rows={3} placeholder="Optionnel"></textarea>
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
