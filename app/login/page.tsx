"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "./cookie";
import { loginApi } from "@/pages/api/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submission
    const { meta, data } = await loginApi(username, password);
    if (meta.code === 200) {
      saveToken(data.accessToken.token);
      setError("");
      router.push("/home");
    } else {
      setError(meta.message);
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
