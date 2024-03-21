"use client"
import { useState } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleUsernameChange = (e : any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e : any ) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    const payload = {
      username: username,
      password: password,
    };

    try {
      const { data } = await axios.post("/api/auth/login", payload);
      router.push("/dashboard");
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.status === 401) {
        setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
      } else {
        setErrorMessage("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nom d'utilisateur:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Entrez votre nom d'utilisateur"
              className="form-input mt-1 block w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Entrez votre mot de passe"
              className="form-input mt-1 block w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Se connecter</button>
        </form>
        {errorMessage && (
          <p className="mt-4 text-red-500">{errorMessage}</p>
        )}
        <p className="mt-4">Vous n'avez pas de compte ? <Link href="/signup" passHref className="text-blue-500">Se créer un compte</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
