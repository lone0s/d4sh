"use client";

import {useState} from 'react'

export default function Signin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mail, setMail] = useState('')


    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    };

    const handleMailChange = (e: any) => {
        setMail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return(
        <div className="sign-form">
        <h2>Création de compte</h2>
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
            <label>Adresse mail:</label>
            <input
              type="email"
              value={mail}
              onInput={handleMailChange}
              placeholder="Entrez votre adresse mail"
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
        </form>
      </div>    
    )
}
