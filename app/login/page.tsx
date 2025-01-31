'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (username === 'admin' && password === '1') {
      // Clear error and redirect to /home
      setError('');
      router.push('/home'); // Redirect to /home
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 mt-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 mt-2 border rounded-lg"
        />
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
