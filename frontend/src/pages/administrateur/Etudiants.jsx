import React, { useState } from "react";
import "../../styles/page.css";
import "../../styles/etudiants.css";

export default function Etudiants() {
  // Liste fictive d'étudiants
  const [students, setStudents] = useState([
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
    { nom: "Patrick Tchatchoua", matricule: "ETU011", filiere: "Informatique", email: "patrick.tchatchoua@mail.com", contact: "+237 698 11 22 33" },
    { nom: "Nathalie Essomba", matricule: "ETU012", filiere: "Mathématiques", email: "nathalie.essomba@mail.com", contact: "+237 699 44 55 66" },
    { nom: "Eric Mvondo", matricule: "ETU013", filiere: "Physique", email: "eric.mvondo@mail.com", contact: "+237 690 77 88 99" },
    { nom: "Sylvie Kamdem", matricule: "ETU014", filiere: "Chimie", email: "sylvie.kamdem@mail.com", contact: "+237 691 22 33 44" },
    { nom: "Roland Fokou", matricule: "ETU015", filiere: "Biologie", email: "roland.fokou@mail.com", contact: "+237 692 55 66 77" },
    { nom: "Brigitte Nguem", matricule: "ETU016", filiere: "Informatique", email: "brigitte.nguem@mail.com", contact: "+237 693 88 99 00" },
    { nom: "Samuel Tchoua", matricule: "ETU017", filiere: "Mathématiques", email: "samuel.tchoua@mail.com", contact: "+237 694 11 22 33" },
    { nom: "Carine Mbarga", matricule: "ETU018", filiere: "Physique", email: "carine.mbarga@mail.com", contact: "+237 695 44 55 66" },
    { nom: "Franck Essomba", matricule: "ETU019", filiere: "Chimie", email: "franck.essomba@mail.com", contact: "+237 696 77 88 99" },
    { nom: "Estelle Mvondo", matricule: "ETU020", filiere: "Biologie", email: "estelle.mvondo@mail.com", contact: "+237 697 22 33 44" },
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 12;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Popup
  const [showForm, setShowForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ nom: "", matricule: "", filiere: "", email: "", contact: "" });

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents([...students, newStudent]);
    setNewStudent({ nom: "", matricule: "", filiere: "", email: "", contact: "" });
    setShowForm(false);
  };

  return (
    <div className="page-container etudiants-page">
      {/* Titre et sous-titre */}
      <div className="page-header">
        <h1 className="page-title">Gestion des Étudiants</h1>
        <p className="page-subtitle">Suivi des inscriptions, filières et informations de contact</p>
      </div>

      <button className="btn-add-student" onClick={handleOpenForm}>
        Ajouter un étudiant
      </button>

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
            {currentStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.nom}</td>
                <td>{student.matricule}</td>
                <td>{student.filiere}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
                <td>
                  <button className="btn-edit">Modifier</button>
                  <button className="btn-delete">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>Précédent</button>
          <span>Page {currentPage} / {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Suivant</button>
        </div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="popup-title">Ajouter un étudiant</h2>
            <form className="student-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" name="nom" value={newStudent.nom} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Matricule</label>
                <input type="text" name="matricule" value={newStudent.matricule} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Filière</label>
                <input type="text" name="filiere" value={newStudent.filiere} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={newStudent.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input type="text" name="contact" value={newStudent.contact} onChange={handleChange} />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-add">✅ Ajouter</button>
                <button type="button" className="btn-cancel" onClick={handleCloseForm}>❌ Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
