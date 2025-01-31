import "./RoomIndex.css";

export default function RoomIndex() {
  const header = [
    "ห้อง",
    "สถานะ",
    "ลูกค้า",
    "ข้อมูลผู้ติดต่อ",
    "ระบุวันที่เข้าพัก",
    "วันที่ออก",
  ];
  const items = [
    {
      id: "1",
      name: "John Doe",
      status: "avalible",
      userTypu: "person",
      contact: "",
      checkin: "12/12/2568",
      checkout: "12/12/2568",
    },
    {
      id: "2",
      name: "Jane Smith",
      status: "notAvalible",
      userTypu: "legalEntity",
      contact: "",
      checkin: "12/12/2568",
      checkout: "12/12/2568",
    },
    {
      id: "3",
      name: "HAN.co.th",
      status: "book",
      userTypu: "",
      contact: "",
      checkin: "12/12/2568",
      checkout: "12/12/2568",
    },
  ];
  return (
    <div className="card">
      <h3 className="text-lg text-dark-base">จัดการห้องเช่า</h3>

      <table className="table">
        <thead>
          <tr className="">
            {header.map((element: any) => {
              return <th className="">{element}</th>;
            })}
          </tr>
        </thead>
        {items.map((element: any) => {
          return (
            <tbody>
              <tr className="">
                <td className="">{element.name}</td>
                <td className="">{element.status}</td>
                <td className="">{element.userType}</td>
                <td className="">{element.contact}</td>
                <td className="">{element.checkin}</td>
                <td className="">{element.checkout}</td>
              </tr>
              <tr className="h-2" />
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
