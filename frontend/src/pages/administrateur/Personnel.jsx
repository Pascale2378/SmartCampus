import React, { useState } from "react";
import "../../styles/page.css";
import "../../styles/personnel.css";

export default function Personnel() {
  // Liste fictive du personnel
  const [personnel, setPersonnel] = useState([
    { nom: "Mme. Nguem", poste: "Secrétaire", email: "nguem@mail.com", contact: "+237 699 11 22 33" },
    { nom: "Mr. Tchoua", poste: "Comptable", email: "tchoua@mail.com", contact: "+237 677 44 55 66" },
    { nom: "Mme. Essomba", poste: "Bibliothécaire", email: "essomba@mail.com", contact: "+237 690 77 88 99" },
    { nom: "Mr. Kamga", poste: "Technicien", email: "kamga@mail.com", contact: "+237 691 22 33 44" },
    { nom: "Mme. Fokou", poste: "RH", email: "fokou@mail.com", contact: "+237 692 55 66 77" },
    { nom: "Mr. Mvondo", poste: "Sécurité", email: "mvondo@mail.com", contact: "+237 693 88 99 00" },
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const personnelPerPage = 4;

  const indexOfLast = currentPage * personnelPerPage;
  const indexOfFirst = indexOfLast - personnelPerPage;
  const currentPersonnel = personnel.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(personnel.length / personnelPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Popup
  const [showForm, setShowForm] = useState(false);
  const [newPersonnel, setNewPersonnel] = useState({ nom: "", poste: "", email: "", contact: "" });

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleChange = (e) => {
    setNewPersonnel({ ...newPersonnel, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPersonnel([...personnel, newPersonnel]);
    setNewPersonnel({ nom: "", poste: "", email: "", contact: "" });
    setShowForm(false);
  };

  return (
    <div className="page-container personnel-page">
      <h1 className="page-title">Gestion du Personnel</h1>
      <button className="btn-add-personnel" onClick={handleOpenForm}>
        Ajouter un membre du personnel
      </button>

      <div className="personnel-wrapper">
        <table className="personnel-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Poste</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPersonnel.map((p, index) => (
              <tr key={index}>
                <td>{p.nom}</td>
                <td>{p.poste}</td>
                <td>{p.email}</td>
                <td>{p.contact}</td>
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
            <h2 className="popup-title">Ajouter un membre du personnel</h2>
            <form className="personnel-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" name="nom" value={newPersonnel.nom} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Poste</label>
                <input type="text" name="poste" value={newPersonnel.poste} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={newPersonnel.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input type="text" name="contact" value={newPersonnel.contact} onChange={handleChange} />
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
