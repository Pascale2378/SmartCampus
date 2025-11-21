import "../../../styles/page.css";
import "../../../styles/communication-preferences.css";

export default function PreferencesNotification() {
  return (
    <div className="page-container notifications-container">
      <div className="page-header">
        <h1 className="page-title">Préférences de notification</h1>
        <p className="page-subtitle">Configurez les canaux de communication pour chaque type d’utilisateur</p>
      </div>

      <div className="notifications-grid">
        {/* Étudiants */}
        <div className="notif-card">
          <h2 className="card-title">Étudiants</h2>
          <form className="card-form">
            <label><input type="checkbox" defaultChecked /> Email</label>
            <label><input type="checkbox" /> SMS</label>
            <label><input type="checkbox" defaultChecked /> Application mobile</label>
            <button className="btn btn-primary">💾 Enregistrer</button>
          </form>
        </div>

        {/* Formateurs */}
        <div className="notif-card">
          <h2 className="card-title">Formateurs</h2>
          <form className="card-form">
            <label><input type="checkbox" defaultChecked /> Email</label>
            <label><input type="checkbox" defaultChecked /> SMS</label>
            <label><input type="checkbox" /> Application mobile</label>
            <button className="btn btn-primary">💾 Enregistrer</button>
          </form>
        </div>

        {/* Administrateurs */}
        <div className="notif-card">
          <h2 className="card-title">Administrateurs</h2>
          <form className="card-form">
            <label><input type="checkbox" defaultChecked /> Email</label>
            <label><input type="checkbox" /> SMS</label>
            <label><input type="checkbox" defaultChecked /> Application mobile</label>
            <label><input type="checkbox" /> Notifications système</label>
            <button className="btn btn-primary">💾 Enregistrer</button>
          </form>
        </div>

        {/* Personnel */}
        <div className="notif-card">
          <h2 className="card-title">Personnel</h2>
          <form className="card-form">
            <label><input type="checkbox" defaultChecked /> Email</label>
            <label><input type="checkbox" /> SMS</label>
            <label><input type="checkbox" /> Application mobile</label>
            <button className="btn btn-primary">💾 Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
