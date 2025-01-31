import { useState } from "react";
import CreateRoom from "./CreateRoom";

interface Bill {
  id: number;
  name: string;
  status: string;
  userType: string;
  oldBill: number;
  bill: number;
  totalBill: number;
}

export default function BillList() {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: 1,
      name: "John Doe",
      status: "",
      userType: "legalEntity",
      oldBill: 0,
      bill: 0,
      totalBill: 0
    },
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [deleteBillId, setDeleteBillId] = useState<number | null>(null);

  // เพิ่ม room
  const addBill = (newBill: Bill) => {
    setBills([...bills, newBill]);
    setShowCreateForm(false);
  };

  // แสดง popup ยืนยันการลบ
  const confirmDeleteRoom = (id: number) => {
    setDeleteBillId(id);
  };

  // ลบ
  const handleDelete = () => {
    if (deleteBillId !== null) {
      setBills(bills.filter((bill) => bill.id !== deleteBillId));
      setDeleteBillId(null);
    }
  };

  // อัปเดตข้อมูลผู้ใช้
  const updateRoom = (updatedRoom: Bill) => {
    setBills(
      bills.map((bill) => (bill.id === updatedRoom.id ? updatedRoom : bill))
    );
    setEditingRoom(null);
  };

  function updateBill(user: Bill): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">รายการห้องเช่า</h2>
          {!editingBill && !showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-base"
            >
              <i className="bi bi-plus" /> สร้างห้องเช่า
            </button>
          )}
        </div>

        {showCreateForm ? (
          <CreateRoom addRoom={addRoom} />
        ) : editingBill ? (
          <EditBill
            bill={editingBill}
            updateBill={updateBill}
            setEditingBill={setEditingBill}
          />
        ) : (
          <div className="base-table">
            <table className="base-table">
              <thead>
                <tr>
                  <th>ชื่อห้อง</th>
                  <th>สถานะ</th>
                  <th>ประเภท</th>
                  <th>ค่าไฟเดือนที่แล้ว</th>
                  <th>ค่าไฟเดือนปัจจุบัน</th>
                  <th>หน่วย</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.status}</td>
                    <td>{row.userType}</td>
                    <td>{row.oldBill}</td>
                    <td>{row.bill}</td>
                    <td>{row.totalBill}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Popup Modal สำหรับยืนยันการลบ */}
      {deleteBillId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setDeleteBillId(null)}
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
function EditBill({
  bill,
  updateBill,
  setEditingBill,
}: {
  bill: Bill;
  updateBill: (user: Bill) => void;
  setEditingBill: (user: Bill | null) => void;
}) {
  const [name, setName] = useState(bill.name);
  const [status, setStatus] = useState(bill.status);
  const [userType, setUserType] = useState(bill.userType);

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
          onClick={() => updateBill({ ...bill, name, id: 0 })}
          className="btn-green"
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

