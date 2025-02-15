import { useState } from "react";
import RoomIcon from "./RoomIcon";
import { v4 as uuidv4 } from "uuid";

const CreateRoom = (props: { [x: string]: any; data: any; state: string }) => {
  const data = props.data;
  const state = props.state;
  const roomData = {
    id: "",
    name: "",
    status: "",
    userType: "",
    contact: "",
    checkin: "",
    checkout: "",
    rent: [{ name: "ค่าเช่า", amount: 0 }],
    serviceFee: [{ name: "ค่าบริการ", amount: 0 }],
  };

  const [room, setRoom] = useState({
    roomTotal: 1,
    userType: data?.userType ? data.userType : "person",
    contact: {
      name: "",
      phone: "",
      idCard: "",
      address: "",
    },
    company: {
      name: "",
      phone: "",
      idTex: "",
      address: "",
    },
    arrRoom: [
      {
        id: data?.id ? data.id : "",
        name: data?.name ? data.name : "test",
        status: data?.status ? data.status : "blank",
        checkin: data?.checkin ? data.checkin : "",
        checkout: data?.checkout ? data.checkout : "",
        rent: data?.rent ? data.rent : [{ name: "", amount: 0 }],
        serviceFee: data?.serviceFee
          ? data.serviceFee
          : [{ name: "", amount: 0 }],
      },
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (room.roomTotal) {
    //   try {
    //     if (state === "create") {
    //       console.log("create >>>", room);
    //       // await createUser({
    //       //   name: user.name,
    //       //   username: user.username,
    //       //   password: user.password,
    //       // });
    //     } else if (state === "edit") {
    //       console.log("edit >>>", room);
    //       // await updateUser(user.id, user.name);
    //     }
    //     if (state === "create") {
    //       // props.onAddItem({
    //       //   name: user.name,
    //       //   isActive: user.isActive,
    //       //   updatedAt: user.updatedAt,
    //       // });
    //     } else {
    //       // props.onEditItem({
    //       //   id: user.id,
    //       //   name: user.name,
    //       // });
    //     }

    //     cancel();
    //     // window.location.reload();
    //   } catch (error) {
    //     console.error("Error saving user:", error);
    //   }
    // }
  };

  const cancel = () => {
    props.onCancel(false);
  };

  const handleClick = (state: string, value: any, index: number) => {
    if (state === "userType") {
      setRoom((prev) => ({
        ...prev,
        userType: value, // เปลี่ยนค่า selected ตาม div ที่คลิก
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
        [e.target.name]: e.target.value,
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
                  { name: "", amount: 0 },
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
                  { name: "", amount: 0 },
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
    value: any
  ) => {
    const updatedData = room.arrRoom.map((prev, i) => {
      if (index === i) {
        if (rentIndex > -1) {
          prev.rent = prev.rent.map((item: any, ii: number) =>
            ii === rentIndex
              ? { ...item, [value.target.name]: value.target.value }
              : item
          );
        }
        if (serviceIndex > -1) {
          prev.serviceFee = prev.serviceFee.map((item: any, ii: number) =>
            ii === serviceIndex
              ? { ...item, [value.target.name]: value.target.value }
              : item
          );
        }
        if (rentIndex < 0 && serviceIndex < 0) {
          prev = {
            ...prev,
            [value.target.name]: value.target.value,
          };
        }
      }
      return prev;
    });
    setRoom({ ...room, arrRoom: updatedData });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-dark-base">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-end capitalize">
            {state} Room
          </h2>
          <button className="btn !text-dark-base" onClick={() => cancel()}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="max-h-[calc(80vh)] overflow-y-auto space-y-2">
          <form onSubmit={handleSubmit} className="space-y-2">
            <label className="block mb-2 text-gray-700">ประเภทลูกค้า</label>
            <div className="grid grid-cols-2 gap-2">
              <div
                className={`div-box ${
                  room.userType === "person" ? "active" : ""
                }`}
                onClick={() => handleClick("userType", "person", 0)}
              >
                <RoomIcon item={"person"} />
                <p>บุคคล</p>
              </div>
              <div
                className={`div-box ${
                  room.userType === "legalEntity" ? "active" : ""
                }`}
                onClick={() => handleClick("userType", "legalEntity", 0)}
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
            </div>

            {room.userType === "legalEntity" && (
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
                    name="idTex"
                    value={room.company.idTex}
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

            {room.userType === "legalEntity" && state === "create" && (
              <div className="flex space-x-10 items-center">
                <label className="block mb-2 text-gray-700">จำนวนห้อง</label>
                <div className="space-x-5 flex items-center">
                  <button onClick={() => handleClick("roomTotal", -1, 0)}>
                    <i className="bi bi-dash-lg" />
                  </button>
                  <p className="border border-base-border min-w-20 text-center rounded-lg py-1">
                    {room.roomTotal}
                  </p>
                  <button onClick={() => handleClick("roomTotal", 1, 0)}>
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
                        name="checkin"
                        value={element.checkin}
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
                        name="checkout"
                        value={element.checkout}
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
                            value={rent.amount}
                            name="amount"
                            onChange={(e) => handleInputChange(index, i, -1, e)}
                          />
                          <div className="flex space-x-2 ms-2">
                            <button
                              className="btn btn-base"
                              onClick={() => addBill("deleterent", index, i)}
                            >
                              <i className="bi bi-dash-lg" />
                            </button>
                            <button
                              className="btn btn-base"
                              onClick={() => addBill("addrent", index, i)}
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
                            value={rent.amount}
                            name="amount"
                            onChange={(e) => handleInputChange(index, -1, i, e)}
                          />
                          <div className="flex space-x-2 ms-2">
                            <button
                              className="btn btn-base"
                              onClick={() => addBill("deleteservice", index, i)}
                            >
                              <i className="bi bi-dash-lg" />
                            </button>
                            <button
                              className="btn btn-base"
                              onClick={() => addBill("addservice", index, i)}
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
                type="submit"
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
