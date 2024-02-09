
"use client";
import { useState } from 'react';
import Link from 'next/link';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e : any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e : any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
  };

  return (
    <div className="login-form">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            value={username}
            onInput={handleUsernameChange}
            placeholder="Entrez votre nom d'utilisateur"
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onInput={handlePasswordChange}
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        <button type="submit">Se connecter</button>
        <p>Vous n'avez pas de compte ?</p> 
          <Link href="/Signup" passHref>
            Se créer un compte
          </Link>
      </form>
    </div>
  );
};

export default LoginForm;
