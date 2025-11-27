import React, { useState } from "react";

import "../styles/login.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu peux ajouter la logique de connexion (API, vérification, etc.)
    alert(`Connexion avec ${formData.email}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Connexion</h1>
        <p className="login-subtitle">Accédez à votre espace administrateur</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <button type="submit" className="btn-login">Se connecter</button>
        </form>

        <div className="login-links">
          <a href="#">Mot de passe oublié ?</a>
          <a href="#">Créer un compte</a>
        </div>
      </div>
    </div>
  );
}
