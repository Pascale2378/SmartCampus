import "../../../styles/page.css";
import "../../../styles/pedagogie-emplois.css";

export default function EmploiTemps() {
  const horaires = [
    "08h - 10h",
    "10h - 12h",
    "12h - 14h",
    "14h - 16h",
    "16h - 18h",
  ];

  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  // Exemple de données emploi du temps
  const emploi = {
    "08h - 10h": {
      Lundi: "Mathématiques",
      Mardi: "Physique",
      Mercredi: "Informatique",
      Jeudi: "Gestion",
      Vendredi: "Anglais",
      Samedi: "Libre",
    },
    "10h - 12h": {
      Lundi: "Physique",
      Mardi: "Mathématiques",
      Mercredi: "Anglais",
      Jeudi: "Informatique",
      Vendredi: "Libre",
      Samedi: "Sport",
    },
    "12h - 14h": {
      Lundi: "Pause",
      Mardi: "Pause",
      Mercredi: "Pause",
      Jeudi: "Pause",
      Vendredi: "Pause",
      Samedi: "Pause",
    },
    "14h - 16h": {
      Lundi: "Informatique",
      Mardi: "Gestion",
      Mercredi: "Libre",
      Jeudi: "Mathématiques",
      Vendredi: "Physique",
      Samedi: "Libre",
    },
    "16h - 18h": {
      Lundi: "Anglais",
      Mardi: "Libre",
      Mercredi: "Physique",
      Jeudi: "Libre",
      Vendredi: "Mathématiques",
      Samedi: "Libre",
    },
  };

  return (
    <div className="page-container emploi-temps-container">
      <div className="page-header">
        <h1 className="page-title">Emploi du temps</h1>
        <p className="page-subtitle">Organisation des cours par jour et horaire</p>
      </div>

      <div className="page-content full-table">
        <table className="smart-table">
          <thead>
            <tr>
              <th>Horaire</th>
              {jours.map((jour) => (
                <th key={jour}>{jour}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horaires.map((h) => (
              <tr key={h}>
                <td className="horaire-cell">{h}</td>
                {jours.map((jour) => (
                  <td key={jour}>{emploi[h][jour]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
