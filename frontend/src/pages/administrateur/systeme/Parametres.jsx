import "../../../styles/page.css";
import "../../../styles/systeme-parametres.css";

export default function SystemeParametres() {
  return (
    <div className="page-container systeme-parametres-container">
      <div className="page-header">
        <h1 className="page-title">Paramètres généraux</h1>
        <p className="page-subtitle">Configuration globale du système SmartCampus</p>
      </div>

      <div className="parametres-grid">
        {/* Informations de base */}
        <div className="parametres-card">
          <h2 className="card-title">Informations de base</h2>
          <form className="card-form">
            <label>
              Nom de l’établissement :
              <input type="text" placeholder="SmartCampus" />
            </label>
            <label>
              Adresse :
              <input type="text" placeholder="Yaoundé, Cameroun" />
            </label>
            <label>
              Langue par défaut :
              <select>
                <option>Français</option>
                <option>Anglais</option>
              </select>
            </label>
            <button className="btn btn-primary">💾 Enregistrer</button>
          </form>
        </div>

        {/* Couleurs de l’interface */}
        <div className="parametres-card">
          <h2 className="card-title">Couleurs de l’interface</h2>
          <form className="card-form">
            <label>
              Couleur principale :
              <input type="color" defaultValue="#6f42c1" />
            </label>
            <label>
              Couleur secondaire :
              <input type="color" defaultValue="#fd7e14" />
            </label>
            <label>
              Couleur des boutons :
              <input type="color" defaultValue="#007bff" />
            </label>
            <button className="btn btn-primary">🎨 Appliquer</button>
          </form>
        </div>

        {/* Configuration Email */}
        <div className="parametres-card">
          <h2 className="card-title">Configuration Email</h2>
          <form className="card-form">
            <label>
              Adresse Email système :
              <input type="email" placeholder="admin@smartcampus.cm" />
            </label>
            <label>
              Serveur SMTP :
              <input type="text" placeholder="smtp.smartcampus.cm" />
            </label>
            <label>
              Port :
              <input type="number" placeholder="587" />
            </label>
            <label>
              Mot de passe :
              <input type="password" placeholder="********" />
            </label>
            <button className="btn btn-primary">📧 Tester la connexion</button>
          </form>
        </div>
      </div>
    </div>
  );
}
