import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/pedagogie-formations.css";

export default function PedagogieFormations() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchCourse, setSearchCourse] = useState("");
  const [coursePage, setCoursePage] = useState(1);
  const coursesPerPage = 10;

  const formations = [
    { id: 1, titre: "Licence Informatique", duree: "3 ans", responsable: "Dr. Nguema", cours: ["Programmation Web", "Bases de données", "Algorithmes", "Systèmes d’exploitation", "Réseaux informatiques", "Intelligence artificielle"] },
    { id: 2, titre: "Master Gestion", duree: "2 ans", responsable: "Pr. Kouassi", cours: ["Comptabilité avancée", "Finance d’entreprise", "Marketing stratégique", "Gestion RH", "Audit et contrôle"] },
    { id: 3, titre: "Licence Droit", duree: "3 ans", responsable: "Dr. Essono", cours: ["Introduction au droit", "Droit civil", "Droit pénal", "Droit international", "Procédure civile"] },
    { id: 4, titre: "Master Mathématiques", duree: "2 ans", responsable: "Pr. Tchoumba", cours: ["Analyse avancée", "Algèbre linéaire", "Probabilités", "Statistiques", "Topologie"] },
    { id: 5, titre: "Licence Économie", duree: "3 ans", responsable: "Dr. Mbarga", cours: ["Microéconomie", "Macroéconomie", "Économie internationale", "Économétrie"] },
    { id: 6, titre: "Master Informatique", duree: "2 ans", responsable: "Pr. Nchout", cours: ["Big Data", "Cloud Computing", "Sécurité informatique", "Machine Learning"] },
    { id: 7, titre: "Licence Gestion", duree: "3 ans", responsable: "Dr. Biyong", cours: ["Gestion financière", "Marketing", "Comptabilité", "Management"] },
    { id: 8, titre: "Master Droit", duree: "2 ans", responsable: "Pr. Essono", cours: ["Droit des affaires", "Droit fiscal", "Droit social"] },
    { id: 9, titre: "Licence Physique", duree: "3 ans", responsable: "Dr. Ewane", cours: ["Mécanique", "Optique", "Électromagnétisme", "Thermodynamique"] },
    { id: 10, titre: "Licence Chimie", duree: "3 ans", responsable: "Dr. Olinga", cours: ["Chimie organique", "Chimie inorganique", "Biochimie"] },
    { id: 11, titre: "Licence Biologie", duree: "3 ans", responsable: "Dr. Ndongo", cours: ["Biologie cellulaire", "Génétique", "Écologie"] },
    { id: 12, titre: "Master Finance", duree: "2 ans", responsable: "Pr. Kouassi", cours: ["Finance internationale", "Gestion de portefeuille", "Analyse financière"] },
    
  ];

  // Filtrage des formations
  const filtered = formations.filter((f) =>
    f.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination des formations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  // Pagination des cours
  const filteredCourses = selectedFormation
    ? selectedFormation.cours.filter((c) =>
        c.toLowerCase().includes(searchCourse.toLowerCase())
      )
    : [];
  const totalCoursePages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startCourse = (coursePage - 1) * coursesPerPage;
  const pageCourses = filteredCourses.slice(startCourse, startCourse + coursesPerPage);

  return (
    <div className="page-container formations-container">
      <div className="page-header">
        <h1 className="page-title">Liste des formations</h1>
        <p className="page-subtitle">Cartes en grille, recherche et pagination</p>
      </div>

      {/* Barre de recherche + bouton ajouter */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher une formation…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-add-formation" onClick={() => setShowAddPopup(true)}>
          ➕ Ajouter une formation
        </button>
      </div>

      {/* Grille de cartes */}
      <div className="formations-grid">
        {pageItems.map((f) => (
          <div
            key={f.id}
            className="formation-card"
            onClick={() => {
              setSelectedFormation(f);
              setSearchCourse("");
              setCoursePage(1);
            }}
          >
            <h3 className="formation-title">{f.titre}</h3>
            <p><strong>Durée:</strong> {f.duree}</p>
            <p><strong>Responsable:</strong> {f.responsable}</p>
          </div>
        ))}
        {pageItems.length === 0 && (
          <div className="empty-state-card">Aucune formation trouvée</div>
        )}
      </div>

      {/* Pagination formations */}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>⬅️ Précédent</button>
          <div className="pages">
            {Array.from({ length: totalPages }, (_, idx) => {
              const n = idx + 1;
              return (
                <button
                  key={n}
                  className={`page-btn ${currentPage === n ? "active" : ""}`}
                  onClick={() => setCurrentPage(n)}
                >
                  {n}
                </button>
              );
            })}
          </div>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Suivant ➡️</button>
        </div>
      )}

      {/* Popup ajout formation */}
      {showAddPopup && (
        <div className="popup-overlay" onClick={() => setShowAddPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Ajouter une formation</h2>
              <button className="close-btn" onClick={() => setShowAddPopup(false)}>✖</button>
            </div>
            <form className="popup-form">
              <div className="form-grid">
                <div className="form-item">
                  <label>Intitulé</label>
                  <input type="text" placeholder="Ex: Licence Informatique" />
                </div>
                <div className="form-item">
                  <label>Durée</label>
                  <input type="text" placeholder="Ex: 3 ans" />
                </div>
                <div className="form-item">
                  <label>Responsable</label>
                  <input type="text" placeholder="Ex: Dr. Nguema" />
                </div>
                <div className="form-item form-item--full">
                  <label>Description</label>
                  <textarea rows={3} placeholder="Optionnel"></textarea>
                </div>
              </div>
              <div className="popup-actions">
                <button type="submit" className="btn btn-success">✅ Enregistrer</button>
                <button type="button" className="btn btn-danger" onClick={() => setShowAddPopup(false)}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

           {/* Popup cours formation */}
      {selectedFormation && (
        <div className="popup-overlay" onClick={() => setSelectedFormation(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>{selectedFormation.titre} – Cours</h2>
              <button className="close-btn" onClick={() => setSelectedFormation(null)}>✖</button>
            </div>

            

            {/* Liste des cours */}
            <ul className="courses-list">
              {pageCourses.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
              {pageCourses.length === 0 && (
                <li className="empty-state">Aucun cours trouvé</li>
              )}
            </ul>

            {/* Pagination cours */}
            {totalCoursePages > 1 && (
              <div className="pagination">
                <button
                  disabled={coursePage === 1}
                  onClick={() => setCoursePage(coursePage - 1)}
                >
                  ⬅️ Précédent
                </button>
                <span>Page {coursePage} / {totalCoursePages}</span>
                <button
                  disabled={coursePage === totalCoursePages}
                  onClick={() => setCoursePage(coursePage + 1)}
                >
                  Suivant ➡️
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div> // <-- fermeture du container principal
  );
}
