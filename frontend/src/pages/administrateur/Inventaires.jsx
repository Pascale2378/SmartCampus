import React, { useState } from "react";
import "../../styles/page.css";
import "../../styles/inventaires.css";

export default function Inventaires() {
  // Liste fictive des inventaires
  const [inventaires, setInventaires] = useState([
    { nom: "Ordinateur Dell", categorie: "Informatique", quantite: 10, etat: "Bon", contact: "+237 699 11 22 33" },
    { nom: "Projecteur Epson", categorie: "Audiovisuel", quantite: 3, etat: "Utilisable", contact: "+237 677 44 55 66" },
    { nom: "Table de classe", categorie: "Mobilier", quantite: 50, etat: "Bon", contact: "+237 690 77 88 99" },
    { nom: "Chaise", categorie: "Mobilier", quantite: 100, etat: "À réparer", contact: "+237 691 22 33 44" },
    { nom: "Tableau blanc", categorie: "Fourniture", quantite: 20, etat: "Bon", contact: "+237 692 55 66 77" },
    { nom: "Imprimante HP", categorie: "Informatique", quantite: 5, etat: "Bon", contact: "+237 693 88 99 00" },
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentInventaires = inventaires.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(inventaires.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Popup
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({ nom: "", categorie: "", quantite: "", etat: "", contact: "" });

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInventaires([...inventaires, newItem]);
    setNewItem({ nom: "", categorie: "", quantite: "", etat: "", contact: "" });
    setShowForm(false);
  };

  return (
    <div className="page-container inventaires-page">
      <h1 className="page-title">Gestion des Inventaires</h1>
      <button className="btn-add-inventaire" onClick={handleOpenForm}>
        Ajouter un inventaire
      </button>

      <div className="inventaires-wrapper">
        <table className="inventaires-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Quantité</th>
              <th>État</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentInventaires.map((i, index) => (
              <tr key={index}>
                <td>{i.nom}</td>
                <td>{i.categorie}</td>
                <td>{i.quantite}</td>
                <td>{i.etat}</td>
                <td>{i.contact}</td>
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
            <h2 className="popup-title">Ajouter un inventaire</h2>
            <form className="inventaire-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" name="nom" value={newItem.nom} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Catégorie</label>
                <input type="text" name="categorie" value={newItem.categorie} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Quantité</label>
                <input type="number" name="quantite" value={newItem.quantite} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>État</label>
                <input type="text" name="etat" value={newItem.etat} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input type="text" name="contact" value={newItem.contact} onChange={handleChange} />
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
