"use client";

import { useState } from 'react';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleUsernameChange = (e : any) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e : any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e : any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
  };

  return (
    <div className="signup-form">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Entrez votre nom d'utilisateur"
            required
          />
        </div>
        <div className="form-group">
          <label>Adresse e-mail:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Entrez votre adresse e-mail"
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        <button type="submit">Créer le compte</button>
      </form>
    </div>
  );
};

export default SignupForm;
