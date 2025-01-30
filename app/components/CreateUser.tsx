import { useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
}

interface CreateUserProps {
  addUser: (user: User) => void;
}

export default function CreateUser({ addUser }: CreateUserProps) {
  const [user, setUser] = useState({ name: "", username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.name && user.username) {
      addUser({
        id: Date.now(),
        name: user.name,
        username: user.username,
        password: user.password,
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <label className="block mt-4 mb-2 text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <label className="block mt-4 mb-2 text-gray-700">Password</label>
        <input
          type="text"
          name="password"
          value={user.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            บันทึก
          </button>
          <button
            type="button"
            onClick={() => addUser({ id: 0, name: "", username: "" })}
            className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
