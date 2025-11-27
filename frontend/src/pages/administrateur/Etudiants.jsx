import React, { useState } from "react";
import "../../styles/page.css";
import "../../styles/etudiants.css";

export default function Etudiants() {
  // Données statiques (lecture seule)
  const students = [
    { nom: "Jean Dupont", matricule: "ETU001", filiere: "Informatique", email: "jean.dupont@mail.com", contact: "+237 699 11 22 33" },
    { nom: "Marie Claire", matricule: "ETU002", filiere: "Mathématiques", email: "marie.claire@mail.com", contact: "+237 677 44 55 66" },
    { nom: "Paul Nguema", matricule: "ETU003", filiere: "Physique", email: "paul.nguema@mail.com", contact: "+237 690 77 88 99" },
    { nom: "Alice Mbarga", matricule: "ETU004", filiere: "Chimie", email: "alice.mbarga@mail.com", contact: "+237 691 22 33 44" },
    { nom: "David Essomba", matricule: "ETU005", filiere: "Biologie", email: "david.essomba@mail.com", contact: "+237 692 55 66 77" },
    { nom: "Sarah Tchoua", matricule: "ETU006", filiere: "Informatique", email: "sarah.tchoua@mail.com", contact: "+237 693 88 99 00" },
    { nom: "Marc Kamga", matricule: "ETU007", filiere: "Mathématiques", email: "marc.kamga@mail.com", contact: "+237 694 11 22 33" },
    { nom: "Linda Fokou", matricule: "ETU008", filiere: "Physique", email: "linda.fokou@mail.com", contact: "+237 695 44 55 66" },
    { nom: "Joseph Nguetcha", matricule: "ETU009", filiere: "Chimie", email: "joseph.nguetcha@mail.com", contact: "+237 696 77 88 99" },
    { nom: "Claudine Mvondo", matricule: "ETU010", filiere: "Biologie", email: "claudine.mvondo@mail.com", contact: "+237 697 22 33 44" },
  ];

  // Recherche
  const [searchTerm, setSearchTerm] = useState("");
  const filteredStudents = students.filter((s) =>
    s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.filiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Popups
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openAdd = () => setShowAddPopup(true);
  const openEdit = (student) => { setSelectedStudent(student); setShowEditPopup(true); };
  const openDelete = (student) => { setSelectedStudent(student); setShowDeletePopup(true); };
  const closeAll = () => { setShowAddPopup(false); setShowEditPopup(false); setShowDeletePopup(false); setSelectedStudent(null); };

  return (
    <div className="page-container etudiants-page">
      {/* En-tête */}
      <div className="page-header">
        <h1 className="page-title">Gestion des Étudiants</h1>
        <p className="page-subtitle">Suivi des inscriptions, filières et informations de contact</p>
      </div>

      {/* Toolbar : recherche + bouton ajouter */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher un étudiant…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn-add-student" onClick={openAdd}>
          ➕ Ajouter un étudiant
        </button>
      </div>

      {/* Tableau */}
      <div className="students-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Matricule</th>
              <th>Filière</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, idx) => (
              <tr key={indexOfFirst + idx}>
                <td>{student.nom}</td>
                <td>{student.matricule}</td>
                <td>{student.filiere}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
                <td className="cell-actions">
                  <button className="btn-edit" onClick={() => openEdit(student)}>✏️ Modifier</button>
                  <button className="btn-delete" onClick={() => openDelete(student)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {currentStudents.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-state">Aucun étudiant trouvé</td>
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
              <h2>Ajouter un étudiant</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="student-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" placeholder="Nom de l'étudiant" />
              </div>
              <div className="form-group">
                <label>Matricule</label>
                <input type="text" placeholder="Matricule" />
              </div>
              <div className="form-group">
                <label>Filière</label>
                <input type="text" placeholder="Filière" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input type="text" placeholder="Téléphone" />
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
      {showEditPopup && selectedStudent && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Modifier un étudiant</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <form className="student-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" defaultValue={selectedStudent.nom} />
              </div>
              <div className="form-group">
                <label>Matricule</label>
                <input type="text" defaultValue={selectedStudent.matricule} />
              </div>
              <div className="form-group">
                <label>Filière</label>
                <input type="text" defaultValue={selectedStudent.filiere} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue={selectedStudent.email} />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input type="text" defaultValue={selectedStudent.contact} />
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
      {showDeletePopup && selectedStudent && (
        <div className="popup-overlay" onClick={closeAll}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Supprimer un étudiant</h2>
              <button className="close-btn" onClick={closeAll}>✖</button>
            </div>
            <div className="confirm-content">
              <p>Voulez-vous vraiment supprimer l’étudiant suivant ?</p>
              <ul>
                <li><strong>Nom :</strong> {selectedStudent.nom}</li>
                <li><strong>Matricule :</strong> {selectedStudent.matricule}</li>
                <li><strong>Filière :</strong> {selectedStudent.filiere}</li>
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
