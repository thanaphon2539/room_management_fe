import { useState } from "react";
import CreateRoom from "./CreateRoom";

interface Room {
  id: number;
  name: string;
  status: string;
  userType: string;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      name: "John Doe",
      status: "john@example.com",
      userType: "legalEntity",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "jane@example.com",
      userType: "person",
    },
    {
      id: 3,
      name: "Jane Smith",
      status: "jane@example.com",
      userType: "",
    },
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);

  // เพิ่ม room
  const addRoom = (newRoom: Room) => {
    setRooms([...rooms, newRoom]);
    setShowCreateForm(false);
  };

  // แสดง popup ยืนยันการลบ
  const confirmDeleteRoom = (id: number) => {
    setDeleteRoomId(id);
  };

  // ลบ
  const handleDelete = () => {
    if (deleteRoomId !== null) {
      setRooms(rooms.filter((user) => user.id !== deleteRoomId));
      setDeleteRoomId(null);
    }
  };

  // อัปเดตข้อมูลผู้ใช้
  const updateRoom = (updatedRoom: Room) => {
    setRooms(
      rooms.map((user) => (user.id === updatedRoom.id ? updatedRoom : user))
    );
    setEditingRoom(null);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">รายการห้องเช่า</h2>
          {!editingRoom && !showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn btn-primary"
            >
              <i className="bi bi-plus" /> <p>สร้างห้องเช่า</p>
            </button>
          )}
        </div>

        {showCreateForm ? (
          <CreateRoom addRoom={addRoom} />
        ) : editingRoom ? (
          <EditRoom
            room={editingRoom}
            updateRoom={updateRoom}
            setEditingRoom={setEditingRoom}
          />
        ) : (
          <div className="base-table">
            <table className="base-table">
              <thead>
                <tr>
                  <th>ชื่อห้อง</th>
                  <th>สถานะ</th>
                  <th>ประเภท</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.status}</td>
                    <td>{row.userType}</td>
                    <td>
                      <div className="flex justify-center">
                        <button
                          onClick={() => setEditingRoom(row)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                        >
                          <i className="bi bi-pencil-fill" />
                          แก้ไข
                        </button>
                        <button
                          onClick={() => confirmDeleteRoom(row.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          <i className="bi bi-trash" />
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Popup Modal สำหรับยืนยันการลบ */}
      {deleteRoomId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setDeleteRoomId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component สำหรับแก้ไขข้อมูลผู้ใช้
function EditRoom({
  room,
  updateRoom,
  setEditingRoom,
}: {
  room: Room;
  updateRoom: (user: Room) => void;
  setEditingRoom: (user: Room | null) => void;
}) {
  const [name, setName] = useState(room.name);
  const [status, setStatus] = useState(room.status);
  const [userType, setUserType] = useState(room.userType);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">แก้ไขห้อง</h3>
      <input
        type="text"
        className="input-text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select className="input-select" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select a status</option>
        <option value="available">ว่าง</option>
        <option value="notAvailable">ไม่ว่าง</option>
      </select>
      <select className="input-select" value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="">Select a usertype</option>
        <option value="person">บุคคล</option>
        <option value="legalEntity">นิติบุคคล</option>
      </select>
      <div className="flex space-x-2">
        <button
          onClick={() => updateRoom({ ...room, name, id: 0 })}
          className="btn-success"
        >
          บันทึก
        </button>
        <button
          onClick={() => setEditingRoom(null)}
          className="btn-gray"
        >
          ย้อนกลับ
        </button>
      </div>
    </div>
  );
}
function setEditingRoom(arg0: null) {
  throw new Error("Function not implemented.");
}

