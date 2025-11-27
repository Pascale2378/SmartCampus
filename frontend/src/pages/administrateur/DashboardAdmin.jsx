import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaBoxOpen, FaChartBar, FaBell } from "react-icons/fa";

import "../../styles/dashboardAdmin.css";

export default function DashboardAdmin() {
  return (
    <div className="dashboard-admin">
      {/* En-tête de page */}
      <div className="page-header">
        <h1 className="page-title">Tableau de bord Administrateur</h1>
        <p className="page-subtitle">Vue d’ensemble des étudiants, formateurs, personnel et inventaires</p>
      </div>

      {/* Les cartes du haut */}
      <div className="top-cards">
        <div className="card">
          <FaUserGraduate size={30} color="#007bff" />
          <h3>Étudiants</h3>
          <p>1 245 inscrits</p>
        </div>
        <div className="card">
          <FaChalkboardTeacher size={30} color="#28a745" />
          <h3>Formateurs</h3>
          <p>32 formateurs actifs</p>
        </div>
        <div className="card">
          <FaUsers size={30} color="#ffc107" />
          <h3>Personnel</h3>
          <p>18 employés</p>
        </div>
        <div className="card">
          <FaBoxOpen size={30} color="#17a2b8" />
          <h3>Inventaires</h3>
          <p>256 articles</p>
        </div>
      </div>

      {/* Section statistiques */}
      <div className="stats-section">
        <div className="big-card">
          <FaChartBar size={25} color="#007bff" />
          <h3>Statistiques générales</h3>
          <p>Graphiques à afficher ici plus tard…</p>
        </div>
        <div className="big-card">
          <FaBell size={25} color="#dc3545" />
          <h3>Notifications récentes</h3>
          <ul>
            <li>Nouvel étudiant inscrit</li>
            <li>Demande de congé approuvée</li>
            <li>Ajout d’un nouvel article dans l’inventaire</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
