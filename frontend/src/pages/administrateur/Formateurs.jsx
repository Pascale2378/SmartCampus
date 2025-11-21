import React, { useState } from "react";
import "../../styles/page.css";
import "../../styles/formateurs.css";
import { useNavigate } from "react-router-dom";



export default function Formateurs() {
  // Liste fictive de formateurs
  const [formateurs, setFormateurs] = useState([
    { nom: "Dr. Kamga", specialite: "Mathématiques", email: "kamga@mail.com", contact: "+237 699 11 22 33" },
    { nom: "Prof. Essomba", specialite: "Physique", email: "essomba@mail.com", contact: "+237 677 44 55 66" },
    { nom: "Mr. Tchoua", specialite: "Informatique", email: "tchoua@mail.com", contact: "+237 690 77 88 99" },
    { nom: "Mme. Fokou", specialite: "Chimie", email: "fokou@mail.com", contact: "+237 691 22 33 44" },
    { nom: "Dr. Nguetcha", specialite: "Biologie", email: "nguetcha@mail.com", contact: "+237 692 55 66 77" },
    { nom: "Prof. Mvondo", specialite: "Philosophie", email: "mvondo@mail.com", contact: "+237 693 88 99 00" },
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const formateursPerPage = 10;

  const indexOfLast = currentPage * formateursPerPage;
  const indexOfFirst = indexOfLast - formateursPerPage;
  const currentFormateurs = formateurs.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(formateurs.length / formateursPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Popup
  const [showForm, setShowForm] = useState(false);
  const [newFormateur, setNewFormateur] = useState({ nom: "", specialite: "", email: "", contact: "" });

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleChange = (e) => {
    setNewFormateur({ ...newFormateur, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormateurs([...formateurs, newFormateur]);
    setNewFormateur({ nom: "", specialite: "", email: "", contact: "" });
    setShowForm(false);
  };

  return (
    <div className="page-container formateurs-page">
      {/* Titre et sous-titre */}
      <div className="page-header">
        <h1 className="page-title">Gestion des Formateurs</h1>
        <p className="page-subtitle">Suivi des enseignants, spécialités et informations de contact</p>
      </div>

      <button className="btn-add-formateur" onClick={handleOpenForm}>
        Ajouter un formateur
      </button>

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
            {currentFormateurs.map((f, index) => (
              <tr key={index}>
                <td>{f.nom}</td>
                <td>{f.specialite}</td>
                <td>{f.email}</td>
                <td>{f.contact}</td>
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
            <h2 className="popup-title">Ajouter un formateur</h2>
            <form className="formateur-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" name="nom" value={newFormateur.nom} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Spécialité</label>
                <input type="text" name="specialite" value={newFormateur.specialite} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={newFormateur.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input type="text" name="contact" value={newFormateur.contact} onChange={handleChange} />
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
