import "../../../styles/page.css";
import "../../../styles/finance-recus.css";

export default function FinanceRecus() {
  return (
    <div className="page-container recus-container">
      <div className="page-header">
        <h1 className="page-title">Reçus et factures</h1>
        <p className="page-subtitle">Gestion des reçus et factures générés</p>
      </div>

      <div className="page-content">
        <ul className="recus-list">
          <li>Facture #001 - Jean Dupont - 150 000 FCFA</li>
          <li>Facture #002 - Marie Claire - 120 000 FCFA</li>
        </ul>
        <button className="btn btn-primary">➕ Générer une nouvelle facture</button>
      </div>
    </div>
  );
}
