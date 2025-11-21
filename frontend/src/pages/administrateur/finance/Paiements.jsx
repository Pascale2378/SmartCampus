import "../../../styles/page.css";
import "../../../styles/finance-paiements.css";

export default function FinancePaiements() {
  return (
    <div className="page-container paiements-container">
      <div className="page-header">
        <h1 className="page-title">Liste des paiements</h1>
        <p className="page-subtitle">Suivi des paiements effectués par les étudiants et le personnel</p>
      </div>

      <div className="page-content">
        <table className="smart-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Mode de paiement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jean Dupont</td>
              <td>150 000 FCFA</td>
              <td>20/11/2025</td>
              <td>Mobile Money</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
