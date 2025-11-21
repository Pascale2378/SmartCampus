import "../../../styles/page.css";
import "../../../styles/systeme-securite.css";

export default function SecuriteAcces() {
  return (
    <div className="page-container securite-acces-container">
      <div className="page-header">
        <h1 className="page-title">Sécurité et Accès</h1>
        <p className="page-subtitle">Paramètres de sécurité du système SmartCampus</p>
      </div>

      <div className="securite-grid">
        {/* Politique de mot de passe */}
        <div className="securite-card">
          <h2 className="card-title">Politique de mot de passe</h2>
          <form className="card-form">
            <label>
              Longueur minimale :
              <input type="number" placeholder="8" />
            </label>
            <label>
              Complexité requise :
              <select>
                <option>Faible</option>
                <option>Moyenne</option>
                <option>Élevée</option>
              </select>
            </label>
            <label>
              Expiration (jours) :
              <input type="number" placeholder="90" />
            </label>
            <button className="btn btn-primary">💾 Enregistrer</button>
          </form>
        </div>

        {/* Authentification */}
        <div className="securite-card">
          <h2 className="card-title">Authentification</h2>
          <form className="card-form">
            <label>
              Méthode par défaut :
              <select>
                <option>Mot de passe</option>
                <option>2FA (SMS)</option>
                <option>2FA (Email)</option>
                <option>Application mobile</option>
              </select>
            </label>
            <label>
              Activer l’authentification multi-facteurs :
              <input type="checkbox" />
            </label>
            <button className="btn btn-primary">🔐 Appliquer</button>
          </form>
        </div>

        {/* Sections actives */}
        <div className="securite-card">
          <h2 className="card-title">Sections actives</h2>
          <div className="card-content">
            <ul className="sections-list">
              <li>📚 Module Pédagogie</li>
              <li>👥 Module Personnel</li>
              <li>🏛️ Module Inventaires</li>
              <li>⚙️ Module Système</li>
            </ul>
            <button className="btn btn-primary">⚙️ Gérer les sections</button>
          </div>
        </div>

        {/* Restriction de mot de passe */}
        <div className="securite-card">
          <h2 className="card-title">Restriction de mot de passe</h2>
          <form className="card-form">
            <label>
              Interdire les mots de passe communs :
              <input type="checkbox" defaultChecked />
            </label>
            <label>
              Historique (nombre de mots de passe mémorisés) :
              <input type="number" placeholder="5" />
            </label>
            <label>
              Blocage après tentatives échouées :
              <input type="number" placeholder="3" />
            </label>
            <button className="btn btn-primary">🚫 Appliquer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
