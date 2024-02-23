
"use client";
import { useState } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleUsernameChange = (e : any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e : any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e : any) => {

    e.preventDefault();

    const payload = {
      username : username,
      password : password,
    }
    try {

      const {data} = await axios.post("/api/auth/login",payload)
      alert(JSON.stringify(data));
      router.push("/dashboard")

    }catch(e){
      const error = e as AxiosError;

      alert(error.message);
    }
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
          <Link href="/signup" passHref>
            Se créer un compte
          </Link>
      </form>
    </div>
  );
};

export default LoginForm;
