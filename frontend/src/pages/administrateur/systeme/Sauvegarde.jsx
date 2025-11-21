import "../../../styles/page.css";
import "../../../styles/systeme-sauvegarde.css";

export default function SystemeSauvegarde() {
  return (
    <div className="page-container systeme-sauvegarde-container">
      <div className="page-header">
        <h1 className="page-title">Sauvegarde et restauration</h1>
        <p className="page-subtitle">Gérez vos sauvegardes et restaurez vos données facilement</p>
      </div>

      <div className="sauvegarde-grid">
        {/* Statut de sauvegarde */}
        <div className="sauvegarde-card">
          <h2 className="card-title">Statut de sauvegarde</h2>
          <div className="card-content">
            <p><strong>Dernière sauvegarde :</strong> 20/11/2025 à 14h30</p>
            <p><strong>État :</strong> ✅ Sauvegarde réussie</p>
            <button className="btn btn-primary">🔄 Lancer une sauvegarde manuelle</button>
          </div>
        </div>

        {/* Planification d’une sauvegarde */}
        <div className="sauvegarde-card">
          <h2 className="card-title">Planification d’une sauvegarde</h2>
          <form className="card-form">
            <label>
              Fréquence :
              <select>
                <option>Quotidienne</option>
                <option>Hebdomadaire</option>
                <option>Mensuelle</option>
              </select>
            </label>
            <label>
              Heure :
              <input type="time" defaultValue="02:00" />
            </label>
            <label>
              Destination :
              <input type="text" placeholder="Ex: disque externe ou cloud" />
            </label>
            <button className="btn btn-primary">📅 Enregistrer la planification</button>
          </form>
        </div>

        {/* Restauration */}
        <div className="sauvegarde-card">
          <h2 className="card-title">Restauration à partir d’une sauvegarde</h2>
          <form className="card-form">
            <label>
              Sélectionner une sauvegarde :
              <select>
                <option>Sauvegarde du 20/11/2025</option>
                <option>Sauvegarde du 15/11/2025</option>
                <option>Sauvegarde du 01/11/2025</option>
              </select>
            </label>
            <button className="btn btn-danger">⚠️ Restaurer cette sauvegarde</button>
          </form>
        </div>
      </div>
    </div>
  );
}
