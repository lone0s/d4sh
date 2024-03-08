"use client";

import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();

  const handleUsernameChange = (e : any) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e : any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e : any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    const payload = {
      username : username,
      password : password,
      email : email
    }
    try {

      const {data} = await axios.post("/api/auth/sign",payload)
      alert(JSON.stringify(data));
      router.push("/dashboard")

    }catch(e){
      const error = e as AxiosError;

      alert(error.message);
    }
  };

  return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
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
              <label className="block text-gray-700">Adresse e-mail:</label>
              <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Entrez votre adresse e-mail"
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
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Créer le compte</button>
          </form>
        </div>
      </div>
  );
};

export default SignupForm;
