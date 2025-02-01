import { useState } from "react";
import CreateUser from "./CreateUser";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  // เพิ่มผู้ใช้ใหม่
  const addUser = (newUser: User) => {
    setUsers([...users, newUser]);
    setShowCreateForm(false);
  };

  // แสดง popup ยืนยันการลบ
  const confirmDeleteUser = (id: number) => {
    setDeleteUserId(id);
  };

  // ลบผู้ใช้
  const handleDelete = () => {
    if (deleteUserId !== null) {
      setUsers(users.filter((user) => user.id !== deleteUserId));
      setDeleteUserId(null);
    }
  };

  // อัปเดตข้อมูลผู้ใช้
  const updateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">รายการผู้ใช้งานระบบ</h2>
          {!editingUser && !showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn btn-primary"
            >
              <i className="bi bi-plus" /> <p>สร้างผู้ใช้งาน</p>
            </button>
          )}
        </div>

        {showCreateForm ? (
          <CreateUser addUser={addUser} />
        ) : editingUser ? (
          <EditUser
            user={editingUser}
            updateUser={updateUser}
            setEditingUser={setEditingUser}
          />
        ) : (
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="border-b py-2 flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold">{user.name}</span> -{" "}
                  {user.email}
                </div>
                <div className="flex">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="btn btn-warning"
                  >
                    <i className="bi bi-pencil-fill" />
                    <p>แก้ไข</p>
                  </button>
                  <button
                    onClick={() => confirmDeleteUser(user.id)}
                    className="btn btn-error"
                  >
                    <i className="bi bi-trash" />
                    <p>ลบ</p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Popup Modal สำหรับยืนยันการลบ */}
      {deleteUserId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setDeleteUserId(null)}
                className="btn-gray"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-error">
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
function EditUser({
  user,
  updateUser,
  setEditingUser,
}: {
  user: User;
  updateUser: (user: User) => void;
  setEditingUser: (user: User | null) => void;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Edit User</h3>
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="w-full p-2 border rounded mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex space-x-2">
        <button
          onClick={() => updateUser({ ...user, name, email })}
          className="btn-success"
        >
          บันทึก
        </button>
        <button onClick={() => setEditingUser(null)} className="btn-gray">
          ย้อนกลับ
        </button>
      </div>
    </div>
  );
}
