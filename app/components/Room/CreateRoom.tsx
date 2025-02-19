import { useState } from "react";
import RoomIcon from "./RoomIcon";
import { createRoom, updateRoom } from "@/pages/api/room";
import { type } from "os";

const CreateRoom = (props: { [x: string]: any; data: any; state: string }) => {
  const data = props.data;
  const state = props.state;
  const roomData = {
    id: "",
    name: "",
    status: "",
    type: "",
    contact: "",
    dateOfStay: "",
    issueDate: "",
    rent: [{ name: "ค่าเช่า", price: 0 }],
    serviceFee: [{ name: "ค่าบริการ", price: 0 }],
  };

  // console.log("data >>>", data);
  const [room, setRoom] = useState({
    id: data?.id || null,
    roomTotal: 1,
    type: data?.type || "person",
    contact: {
      id: data?.roomContact?.id || null,
      name: data?.roomContact?.name || "",
      phone: data?.roomContact?.phone || "",
      idCard: data?.roomContact?.idCard || "",
      address: data?.roomContact?.address || "",
      licensePlate: data?.roomContact?.licensePlate || "",
    },
    company: {
      id: data?.roomCompany?.id || null,
      name: data?.roomCompany?.name || "",
      phone: data?.roomCompany?.phone || "",
      idTax: data?.roomCompany?.idTax || "",
      address: data?.roomCompany?.address || "",
    },
    arrRoom: [
      {
        id: data?.id ? data.id : "",
        name: data?.nameRoom ? data.nameRoom : "",
        status: data?.status ? data.status : "blank",
        dateOfStay: data?.dateOfStay ? data.dateOfStay : "",
        issueDate: data?.issueDate ? data.issueDate : "",
        rent: data?.rent ? data.rent : [{ name: "", price: 0 }],
        serviceFee: data?.serviceFee
          ? data.serviceFee
          : [{ name: "", price: 0 }],
      },
    ],
  });

  const cancel = () => {
    props.onCancel(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("state >>>", state);
    // console.log("room >>>", room);
    let success = false;
    if (state === "create") {
      // console.log("create >>>", room);
      const arrRoom = room.arrRoom.map((el) => ({
        nameRoom: el.name,
        status: el.status,
        dateOfStay: el.dateOfStay || null,
        issueDate: el.issueDate || null,
        rent:
          el.rent.filter((rent: any) => rent.name).length > 0
            ? el.rent.map((e: { name: any; price: number }) => ({
                name: e.name,
                price: Number(e.price),
              }))
            : [],
        serviceFee:
          el.serviceFee.filter((serviceFee: any) => serviceFee.name).length > 0
            ? el.serviceFee.map((e: { name: any; price: number }) => ({
                name: e.name,
                price: Number(e.price),
              }))
            : [],
      }));
      const data = {
        type: room.type,
        contact: room.contact,
        company: room.type !== "person" ? room.company : null,
        room: arrRoom,
      };
      // console.log("data >>>", data);
      const result = await createRoom(data);
      if (result?.data && result?.data?.id.length > 0) {
        success = true;
      }
    } else if (state === "edit" && room?.id) {
      console.log("edit >>>", room);
      const arrRoom = room.arrRoom[0];
      const data = {
        nameRoom: arrRoom.name,
        status: arrRoom.status,
        type: room.type,
        dateOfStay: arrRoom.dateOfStay || null,
        issueDate: arrRoom.issueDate || null,
        contact: room.contact,
        company: room.type !== "person" ? room.company : null,
        rent:
          arrRoom.rent.filter((rent: any) => rent.name).length > 0
            ? arrRoom.rent.map(
                (e: { id?: number; name: any; price: number }) => ({
                  id: e?.id,
                  name: e.name,
                  price: Number(e.price),
                })
              )
            : [],
        serviceFee:
          arrRoom.serviceFee.filter((serviceFee: any) => serviceFee.name)
            .length > 0
            ? arrRoom.serviceFee.map(
                (e: { id?: number; name: any; price: number }) => ({
                  id: e?.id,
                  name: e.name,
                  price: Number(e.price),
                })
              )
            : [],
      };
      const result = await updateRoom(room.id, data);
      if (result?.data && result?.data?.id) {
        success = true;
      }
    }
    if (state === "create") {
      // props.onAddItem({
      //   name: user.name,
      //   isActive: user.isActive,
      //   updatedAt: user.updatedAt,
      // });
    } else {
      // props.onEditItem({
      //   id: user.id,
      //   name: user.name,
      // });
    }
    if (success) {
      window.location.reload();
    }
    cancel();
  };

  const handleClick = (state: string, value: any, index: number) => {
    if (state === "type") {
      setRoom((prev) => ({
        ...prev,
        type: value, // เปลี่ยนค่า selected ตาม div ที่คลิก
        roomTotal: value === "person" ? 1 : prev.roomTotal,
        arrRoom:
          value === "person" ? [...prev.arrRoom].slice(0, 1) : prev.arrRoom,
      }));
    }
    if (state === "roomTotal") {
      setRoom((prev) => ({
        ...prev,
        roomTotal: prev.roomTotal > 0 ? prev.roomTotal + value : 1, // เปลี่ยนค่า selected ตาม div ที่คลิก
        arrRoom:
          prev.roomTotal > 0 && value > 0
            ? [...prev.arrRoom, roomData]
            : [...prev.arrRoom].slice(0, prev.arrRoom.length - 1),
      }));
    }
    if (state === "roomStatus") {
      setRoom((prev) => ({
        ...prev,
        arrRoom: prev.arrRoom.map((item, i) =>
          i === index ? { ...item, status: value } : item
        ),
      }));
    }
  };
  const handleChangeContact = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRoom((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [e.target.name]: e.target.value, // ทำให้การเปลี่ยนแปลงค่า input เปลี่ยน state ได้
      },
    }));
  };
  const handleChangeCompany = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRoom((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const addBill = (type: string, roomindex: number, index: number) => {
    if (type === "addrent") {
      setRoom((prev) => ({
        ...prev,
        arrRoom: prev.arrRoom.map((room, i) =>
          i === roomindex
            ? {
                ...room,
                rent: [
                  ...room.rent.slice(0, index + 1),
                  { name: "", price: 0 },
                  ...room.rent.slice(index + 1),
                ],
              }
            : room
        ),
      }));
    }
    if (type === "deleterent") {
      setRoom((prev) => ({
        ...prev,
        arrRoom: prev.arrRoom.map((room, i) =>
          i === roomindex
            ? {
                ...room,
                rent:
                  room.rent.length > 1
                    ? room.rent.filter((_: any, i: number) => i !== index)
                    : room.rent,
              }
            : room
        ),
      }));
    }
    if (type === "addservice") {
      setRoom((prev) => ({
        ...prev,
        arrRoom: prev.arrRoom.map((room, i) =>
          i === roomindex
            ? {
                ...room,
                serviceFee: [
                  ...room.serviceFee.slice(0, index + 1),
                  { name: "", price: 0 },
                  ...room.serviceFee.slice(index + 1),
                ],
              }
            : room
        ),
      }));
    }
    if (type === "deleteservice") {
      setRoom((prev) => ({
        ...prev,
        arrRoom: prev.arrRoom.map((room, i) =>
          i === roomindex
            ? {
                ...room,
                serviceFee:
                  room.serviceFee.length > 1
                    ? room.serviceFee.filter((_: any, i: number) => i !== index)
                    : room.serviceFee,
              }
            : room
        ),
      }));
    }
  };
  const handleInputChange = (
    index: number,
    rentIndex: number,
    serviceIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = room.arrRoom.map((prev, i) => {
      if (i === index) {
        if (rentIndex > -1) {
          prev.rent = prev.rent.map((item: any, ii: number) =>
            ii === rentIndex ? { ...item, [name]: value } : item
          );
        }
        if (serviceIndex > -1) {
          prev.serviceFee = prev.serviceFee.map((item: any, ii: number) =>
            ii === serviceIndex ? { ...item, [name]: value } : item
          );
        }
        if (rentIndex < 0 && serviceIndex < 0) {
          prev = { ...prev, [name]: value }; // แก้ไขข้อมูลห้องหลัก
        }
      }
      return prev;
    });

    setRoom((prev) => ({
      ...prev,
      arrRoom: updatedData,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-dark-base">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-end capitalize">
            {state === "create" ? "สร้างห้องเช่า" : "แก้ไขห้องเช่า"}
          </h2>
          <button className="btn !text-dark-base" onClick={() => cancel()}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="max-h-[calc(80vh)] overflow-y-auto space-y-2">
          <form className="space-y-2">
            <label className="block mb-2 text-gray-700">ประเภทลูกค้า</label>
            <div className="grid grid-cols-2 gap-2">
              <div
                className={`div-box ${room.type === "person" ? "active" : ""}`}
                onClick={() => handleClick("type", "person", 0)}
              >
                <RoomIcon item={"person"} />
                <p>บุคคล</p>
              </div>
              <div
                className={`div-box ${
                  room.type === "legalEntity" ? "active" : ""
                }`}
                onClick={() => handleClick("type", "legalEntity", 0)}
              >
                <RoomIcon item={"legalEntity"} /> <p>นิติบุคคล</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <h1 className="block text-gray-700 col-span-2 font-bold">
                ข้อมูลผู้ติดต่อ
              </h1>
              <div className="col-span-2">
                <label className="block mb-2 text-gray-700">ชื่อ</label>
                <input
                  type="text"
                  name="name"
                  value={room.contact.name}
                  onChange={handleChangeContact}
                  className="input-text"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">เบอร์โทร</label>
                <input
                  type="text"
                  name="phone"
                  value={room.contact.phone}
                  onChange={handleChangeContact}
                  className="input-text"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">
                  เลขบัตรประชาชน
                </label>
                <input
                  type="text"
                  name="idCard"
                  value={room.contact.idCard}
                  onChange={handleChangeContact}
                  className="input-text"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-gray-700">ที่อยู่</label>
                <textarea
                  className="input-text"
                  name="address"
                  value={room.contact.address}
                  onChange={handleChangeContact}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-gray-700">ทะเบียนรถ</label>
                <input
                  type="text"
                  name="licensePlate"
                  value={room.contact.licensePlate}
                  onChange={handleChangeContact}
                  className="input-text"
                />
              </div>
            </div>

            {room.type === "legalEntity" && (
              <div className="grid grid-cols-2 gap-2">
                <h1 className="block text-gray-700 col-span-2 font-bold">
                  รายละเอียดข้อมูลบริษัท
                </h1>
                <div className="col-span-2">
                  <label className="block mb-2 text-gray-700">ชื่อบริษัท</label>
                  <input
                    type="text"
                    name="name"
                    value={room.company.name}
                    onChange={handleChangeCompany}
                    className="input-text"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">เบอร์โทร</label>
                  <input
                    type="text"
                    name="phone"
                    value={room.company.phone}
                    onChange={handleChangeCompany}
                    className="input-text"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">
                    เลขประจำตัวผู้เสียภาษี
                  </label>
                  <input
                    type="text"
                    name="idTax"
                    value={room.company.idTax}
                    onChange={handleChangeCompany}
                    className="input-text"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-gray-700">ที่อยู่</label>
                  <textarea
                    className="input-text"
                    name="address"
                    value={room.company.address}
                    onChange={handleChangeCompany}
                  />
                </div>
              </div>
            )}

            {room.type === "legalEntity" && state === "create" && (
              <div className="flex space-x-10 items-center">
                <label className="block mb-2 text-gray-700">จำนวนห้อง</label>
                <div className="space-x-5 flex items-center">
                  <button
                    type="button"
                    onClick={() => handleClick("roomTotal", -1, 0)}
                  >
                    <i className="bi bi-dash-lg" />
                  </button>
                  <p className="border border-base-border min-w-20 text-center rounded-lg py-1">
                    {room.roomTotal}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleClick("roomTotal", 1, 0)}
                  >
                    <i className="bi bi-plus-lg" />
                  </button>
                </div>
              </div>
            )}

            {room.arrRoom.map((element: any, index: number) => {
              return (
                <div key={index} className="div-card space-y-2 ">
                  <p className="font-bold">ห้องที่ {index + 1}</p>
                  <label className="block mb-2 text-gray-700">ชื่อห้อง</label>
                  <input
                    type="text"
                    name="name"
                    value={element.name}
                    onChange={(e) => handleInputChange(index, -1, -1, e)}
                    className="input-text"
                    placeholder="ชื่อห้อง"
                  />

                  <label className="block mb-2 text-gray-700">สถานะ</label>
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className={`div-box ${
                        element.status === "blank" ? "active" : ""
                      }`}
                      onClick={() => handleClick("roomStatus", "blank", index)}
                    >
                      <RoomIcon item={"blank"} />
                      <p>ว่าง</p>
                    </div>
                    <div
                      className={`div-box ${
                        element.status === "busy" ? "active" : ""
                      }`}
                      onClick={() => handleClick("roomStatus", "busy", index)}
                    >
                      <RoomIcon item={"busy"} />
                      <p>ไม่ว่าง</p>
                    </div>
                    <div
                      className={`div-box ${
                        element.status === "reserve" ? "active" : ""
                      }`}
                      onClick={() =>
                        handleClick("roomStatus", "reserve", index)
                      }
                    >
                      <RoomIcon item={"reserve"} />
                      <p>จอง</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-2 text-gray-700">
                        วันที่เข้าพัก
                      </label>
                      <input
                        type="date"
                        name="dateOfStay"
                        value={element.dateOfStay}
                        onChange={(e) => handleInputChange(index, -1, -1, e)}
                        className="input-text"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-gray-700">
                        วันที่ออก
                      </label>
                      <input
                        type="date"
                        name="issueDate"
                        value={element.issueDate}
                        onChange={(e) => handleInputChange(index, -1, -1, e)}
                        className="input-text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block mb-2 text-gray-700">ค่าเช่า</label>
                    {element.rent.map((rent: any, i: number) => {
                      return (
                        <div key={`rent${i}`} className="flex gap-2">
                          <input
                            type="text"
                            className="input-text !mb-0"
                            placeholder="ค่าเช่า"
                            value={rent.name}
                            name="name"
                            onChange={(e) => handleInputChange(index, i, -1, e)}
                          />
                          <input
                            type="text"
                            className="input-text !mb-0"
                            placeholder="จำนวน"
                            value={rent.price}
                            name="price"
                            onChange={(e) => handleInputChange(index, i, -1, e)}
                          />
                          <div className="flex space-x-2 ms-2">
                            <button
                              className="btn btn-base"
                              onClick={() => addBill("deleterent", index, i)}
                              type="button" // เพิ่ม type="button" เพื่อไม่ให้ form ถูก submit
                            >
                              <i className="bi bi-dash-lg" />
                            </button>
                            <button
                              className="btn btn-base"
                              onClick={() => addBill("addrent", index, i)}
                              type="button" // เพิ่ม type="button"
                            >
                              <i className="bi bi-plus-lg" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <label className="block mb-2 text-gray-700">
                      ค่าบริการ
                    </label>
                    {element.serviceFee.map((rent: any, i: number) => {
                      return (
                        <div key={`service${i}`} className="flex gap-2">
                          <input
                            type="text"
                            className="input-text !mb-0"
                            placeholder="ค่าบริการ"
                            value={rent.name}
                            name="name"
                            onChange={(e) => handleInputChange(index, -1, i, e)}
                          />
                          <input
                            type="text"
                            className="input-text !mb-0"
                            placeholder="จำนวน"
                            value={rent.price}
                            name="price"
                            onChange={(e) => handleInputChange(index, -1, i, e)}
                          />
                          <div className="flex space-x-2 ms-2">
                            <button
                              className="btn btn-base"
                              onClick={() => addBill("deleteservice", index, i)}
                              type="button" // เพิ่ม type="button" เพื่อไม่ให้ form ถูก submit
                            >
                              <i className="bi bi-dash-lg" />
                            </button>
                            <button
                              className="btn btn-base"
                              onClick={() => addBill("addservice", index, i)}
                              type="button" // เพิ่ม type="button"
                            >
                              <i className="bi bi-plus-lg" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="flex gap-2 mt-4">
              <button
                type="button" // ใช้ type="button" แทน type="submit"
                onClick={handleSubmit} // เรียก handleSubmit เมื่อกดปุ่ม
                className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
