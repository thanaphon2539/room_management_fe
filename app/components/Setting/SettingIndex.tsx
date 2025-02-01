import { useState } from "react";

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
  const [dataEdit, setDataEdit] = useState();
  const onEdit = (value: boolean) => {
    setShowEdit(false);
  };

  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">จัดการตั้งค่า</h2>
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
            <h1 className="font-bold mb-4">ข้อมูลผู้ติดต่อ</h1>
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
    </div>
  );
}
