import { useState } from "react";
import "../../../styles/page.css";
import "../../../styles/finance-alertes.css";

export default function AlertesPaiement() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const alertes = [
    { matricule: "ETU001", nom: "Jean Dupont", formation: "Licence Informatique", montant: "150000 FCFA" },
    { matricule: "ETU002", nom: "Marie Claire", formation: "Master Gestion", montant: "200000 FCFA" },
    { matricule: "ETU003", nom: "Paul Essomba", formation: "Licence Droit", montant: "120000 FCFA" },
    { matricule: "ETU004", nom: "Alice Nguema", formation: "Master Mathématiques", montant: "180000 FCFA" },
    { matricule: "ETU005", nom: "Serge Mbarga", formation: "Licence Économie", montant: "130000 FCFA" },
    { matricule: "ETU006", nom: "Chantal Tchoumba", formation: "Licence Physique", montant: "140000 FCFA" },
    // ➕ Ajoute plus de données pour tester la pagination
  ];

  // Pagination
  const totalPages = Math.ceil(alertes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = alertes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="page-container alertes-paiement-container">
      <div className="page-header">
        <h1 className="page-title">Alertes de paiement</h1>
        <p className="page-subtitle">Suivi des étudiants avec montants dus et configuration des relances</p>
      </div>

      {/* Tableau */}
      <div className="page-content full-table">
        <table className="smart-table">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom de l’étudiant</th>
              <th>Formation</th>
              <th>Montant dû</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((a, index) => (
              <tr key={index}>
                <td>{a.matricule}</td>
                <td>{a.nom}</td>
                <td>{a.formation}</td>
                <td>{a.montant}</td>
                <td>
                  <button className="btn btn-info btn-sm">👁️ Voir</button>
                  <button className="btn btn-danger btn-sm">🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-state">Aucune alerte trouvée</td>
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

           {/* Configuration des relances automatiques */}
      <div className="relances-card">
        <h2 className="card-title">Configuration des relances automatiques</h2>
        <form className="card-form">
          <label>
            Fréquence des relances :
            <select>
              <option>Quotidienne</option>
              <option>Hebdomadaire</option>
              <option>Mensuelle</option>
            </select>
          </label>
          <label>
            Canal de relance :
            <select>
              <option>Email</option>
              <option>SMS</option>
              <option>Notification App</option>
            </select>
          </label>
          <label>
            Nombre maximum de relances :
            <input type="number" placeholder="3" />
          </label>
          <label>
            Message par défaut :
            <textarea
              rows={4}
              placeholder="Cher étudiant, vous avez un montant dû. Merci de régulariser votre situation."
            ></textarea>
          </label>
          <button className="btn btn-primary">💾 Enregistrer</button>
        </form>
      </div>
    </div>
  );
}
