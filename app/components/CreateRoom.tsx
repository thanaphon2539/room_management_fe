import { useState } from "react";

interface Room {
  id: number;
  name: string;
  status: string;
  userType: string;
}

interface CreateRoomProps {
  addRoom: (user: Room) => void;
}

export default function CreateRoom({ addRoom }: CreateRoomProps) {
  const [room, setRoom] = useState({ name: "", status: "", userType: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (room.name && room.status) {
      addRoom({
        id: Date.now(),
        name: room.name,
        status: room.status,
        userType: room.userType,
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-700">ชื่อห้อง</label>
        <input
          type="text"
          name="name"
          value={room.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <label className="block mt-4 mb-2 text-gray-700">สถานะ</label>
        <input
          type="text"
          name="username"
          value={room.status}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <label className="block mt-4 mb-2 text-gray-700">สถานะลูกค้า</label>
        <input
          type="text"
          name="password"
          value={room.userType}
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
            onClick={() => addRoom({ id: 0, name: "", status: "", userType: "" })}
            className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
