import { useState } from "react";
import EditSetting from "./Edit";
import EditUnit from "./EditUnit";

export default function RoomIndex() {
  const data = {
    water: 5,
    electricity: 10,
    contact: {
      name: "Johnathan Carter",
      phone: "+1-555-123-4567",
      email: "johnathan.carter@example.com",
      address: "123 Main Street, Beverly Hills, Los Angeles, CA 90210, USA",
      company: "Tech Solutions Inc.",
      position: "Software Engineer",
    },
  };
  const [showEdit, setShowEdit] = useState(false);
  const [showEditUnit, setShowEditUnit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [dataEditUnit, setDataEditUnit] = useState({});
  const onEdit = (value: boolean) => {
    setShowEdit(false);
  };
  const onEditUnit = (value: boolean) => {
    setShowEdit(false);
  };

  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">จัดการตั้งค่า</h2>
          <button
            className="btn btn-warning"
            onClick={() => {
              setShowEditUnit(true);
              setDataEditUnit(data);
            }}
          >
            <i className="bi bi-pencil-fill" />
            <p>แก้ไขหน่วย</p>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="card border border-base-border ">
            <h1 className="font-bold ">หน่วยค่าน้ำ</h1>
            <p className="flex items-end ms-5">
              <span className="flex-1">ราคาต่อหน่วย</span>
              <span className="px-3 text-3xl">{data.water}</span>
              <span>บาท</span>
            </p>
          </div>

          <div className="card border border-base-border ">
            <h1 className="font-bold ">หน่วยค่าไฟ</h1>
            <p className="flex items-end ms-5">
              <span className="flex-1">ราคาต่อหน่วย</span>
              <span className="px-3 text-3xl">{data.electricity}</span>
              <span>บาท</span>
            </p>
          </div>

          <div className="card border border-base-border col-span-2">
            <h1 className="font-bold flex justify-between">
              ข้อมูลผู้ติดต่อ
              <button
                className="btn btn-warning"
                onClick={() => {
                  setShowEdit(true);
                  setDataEdit(data);
                }}
              >
                <i className="bi bi-pencil-fill" />
                <p>แก้ไข</p>
              </button>
            </h1>
            <div className="ms-5">
              <p>{data.contact.name}</p>
              <p>โทร: {data.contact.phone}</p>
              <p>อีเมล: {data.contact.email}</p>
              <p>ที่อยู่: {data.contact.address}</p>
              <p>บริษัท: {data.contact.company}</p>
              <p>ตำแหน่ง: {data.contact.position}</p>
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditSetting
          onAddItem={onEdit}
          onCancel={setShowEdit}
          data={dataEdit}
          state={"Edit"}
        />
      )}
      {showEditUnit && (
        <EditUnit
          onAddItem={onEditUnit}
          onCancel={setShowEditUnit}
          data={dataEdit}
          state={"Edit"}
        />
      )}
    </div>
  );
}
