import { useState } from "react";
import RoomIcon from "./RoomIcon";

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
    arrRoom: [
      {
        id: data?.id ? data.id : "",
        name: data?.name ? data.name : "",
        status: data?.status ? data.status : "avalible",
        contact: data?.contact ? data.contact : "",
        checkin: data?.checkin ? data.checkin : "",
        checkout: data?.checkout ? data.checkout : "",
        rent: data?.rent ? data.rent : [{ name: "ค่าเช่า", amount: 0 }],
        serviceFee: data?.serviceFee
          ? data.serviceFee
          : [{ name: "ค่าบริการ", amount: 0 }],
      },
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (room.name && room.status) {
    //   props.onAddItem({
    //     id: Date.now(),
    //     name: room.name,
    //     status: room.status,
    //     userType: room.userType,
    //   });
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
      }));
    }
    if (state === "roomTotal") {
      setRoom((prev) => ({
        ...prev,
        roomTotal: prev.roomTotal + value > 0 ? prev.roomTotal + value : 1, // เปลี่ยนค่า selected ตาม div ที่คลิก
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

            {/* {showEdit && ()} */}

            <div className="grid grid-cols-2 gap-2">
              <h1 className="block text-gray-700 col-span-2 font-bold">
                ข้อมูลผู้ติดต่อ
              </h1>
              <div className="col-span-2">
                <label className="block mb-2 text-gray-700">ชื่อ</label>
                <input type="text" name="name" className="input-text" />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">เบอร์โทร</label>
                <input type="text" name="name" className="input-text" />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">
                  เลขบัตรประชาชน
                </label>
                <input type="text" name="name" className="input-text" />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-gray-700">ที่อยู่</label>
                <textarea className="input-text" />
              </div>
            </div>

            {room.userType === "legalEntity" && (
              <div className="grid grid-cols-2 gap-2">
                <h1 className="block text-gray-700 col-span-2 font-bold">
                  รายละเอียดข้อมูลบริษัท
                </h1>
                <div className="col-span-2">
                  <label className="block mb-2 text-gray-700">ชื่อบริษัท</label>
                  <input type="text" name="name" className="input-text" />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">เบอร์โทร</label>
                  <input type="text" name="name" className="input-text" />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">
                    เลขประจำตัวผู้เสียภาษี
                  </label>
                  <input type="text" name="name" className="input-text" />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-gray-700">ที่อยู่</label>
                  <textarea className="input-text" />
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
                <div className="div-card space-y-2 ">
                  {/* {element} */}
                  <p>ห้องที่ {index + 1}</p>
                  <label className="block mb-2 text-gray-700">ชื่อห้อง</label>
                  <input
                    type="text"
                    name="name"
                    value={element.name}
                    className="input-text"
                    placeholder="ชื่อห้อง"
                  />

                  <label className="block mb-2 text-gray-700">สถานะ</label>
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className={`div-box ${
                        element.status === "avalible" ? "active" : ""
                      }`}
                      onClick={() =>
                        handleClick("roomStatus", "avalible", index)
                      }
                    >
                      <RoomIcon item={"avalible"} />
                      <p>ว่าง</p>
                    </div>
                    <div
                      className={`div-box ${
                        element.status === "notAvalible" ? "active" : ""
                      }`}
                      onClick={() =>
                        handleClick("roomStatus", "notAvalible", index)
                      }
                    >
                      <RoomIcon item={"notAvalible"} />
                      <p>ไม่ว่าง</p>
                    </div>
                    <div
                      className={`div-box ${
                        element.status === "book" ? "active" : ""
                      }`}
                      onClick={() => handleClick("roomStatus", "book", index)}
                    >
                      <RoomIcon item={"book"} />
                      <p>จอง</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-2 text-gray-700">
                        วันที่เข้าพัก
                      </label>
                      <input type="date" name="name" className="input-text" />
                    </div>
                    <div>
                      <label className="block mb-2 text-gray-700">
                        วันที่ออก
                      </label>
                      <input type="date" name="name" className="input-text" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block mb-2 text-gray-700">ค่าเช่า</label>
                    {element.rent.map((rant: any) => {
                      return (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className="input-text !mb-0"
                            placeholder="ค่าเช่า"
                          />
                          <input
                            type="text"
                            className="input-text !mb-0"
                            placeholder="จำนวน"
                          />
                          <div className="flex space-x-2 ms-2">
                            <button className="btn btn-base">
                              <i className="bi bi-dash-lg" />
                            </button>
                            <button className="btn btn-base">
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
                    {element.serviceFee.map((rant: any) => {
                      return (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className="input-text !mb-0"
                            placeholder="ค่าบริการ"
                          />
                          <input
                            type="text"
                            className="input-text !mb-0"
                            placeholder="จำนวน"
                          />
                          <div className="flex space-x-2 ms-2">
                            <button className="btn btn-base">
                              <i className="bi bi-dash-lg" />
                            </button>
                            <button className="btn btn-base">
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
