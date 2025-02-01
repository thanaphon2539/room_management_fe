import "./RoomIndex.css";
import RoomIcon from "./RoomIcon";
import ModalDelete from "../ModalDelete";
import { useState } from "react";
import CreateRoom from "./CreateRoom";
import { v4 as uuidv4 } from "uuid";

export default function RoomIndex() {
  const header = [
    "ห้อง",
    "สถานะ",
    "ประเภทลูกค้า",
    "ข้อมูลผู้ติดต่อ",
    "ระบุวันที่เข้าพัก",
    "วันที่ออก",
    "ค่าเช่า",
    "ค่าบริการ",
    "จัดการ",
  ];
  const items = [
    {
      id: "1",
      name: "John Doe",
      status: "avalible",
      userType: "person",
      contact: "",
      checkin: "12/12/2568",
      checkout: "12/12/2568",
      rent: [
        { name: "ค่าเช่า", amount: 2000 },
        { name: "ค่าเช่า", amount: 2000 },
      ],
      serviceFee: [{ name: "ค่าบริการ", amount: 2000 }],
    },
    {
      id: "2",
      name: "Jane Smith",
      status: "notAvalible",
      userType: "legalEntity",
      contact: "",
      checkin: "12/12/2568",
      checkout: "12/12/2568",
      rent: [{ name: "ค่าเช่า", amount: 2000 }],
      serviceFee: [
        { name: "ค่าบริการ", amount: 2000 },
        { name: "ค่าบริการ", amount: 2000 },
      ],
    },
    {
      id: "3",
      name: "HAN.co.th",
      status: "book",
      userType: "",
      contact: "",
      checkin: "12/12/2568",
      checkout: "12/12/2568",
      rent: [{ name: "ค่าเช่า", amount: 2000 }],
      serviceFee: [{ name: "ค่าบริการ", amount: 2000 }],
    },
  ];
  const [showDelete, setShowDelete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState();

  const onDelete = (value: boolean) => {
    setShowDelete(false);
  };
  const onCreate = (value: boolean) => {
    setShowCreate(false);
  };
  const onEdit = (value: boolean) => {
    setShowEdit(false);
  };
  return (
    <div className="container">
      <div className="card">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">จัดการห้องเช่า</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreate(true)}
          >
            <i className="bi bi-plus" /> <p>สร้างห้องเช่า</p>
          </button>
        </div>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            name="search"
            className="input-text !w-2/4"
            placeholder="ค้นหา"
          />
          <button className="btn btn-dark text-nowrap h-fit">
            <i className="bi bi-search" />
            <p>ค้าหา</p>
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              {header.map((element: any) => {
                return <th key={uuidv4()}>{element}</th>;
              })}
            </tr>
          </thead>
          {items.map((element: any) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td>{element.name}</td>
                  <td>
                    <RoomIcon item={element.status} />
                  </td>
                  <td>
                    <RoomIcon item={element.userType} />
                  </td>
                  <td>{element.contact}</td>
                  <td>{element.checkin}</td>
                  <td>{element.checkout}</td>
                  <td>
                    {element.rent.map((rent: any) => {
                      return (
                        <p key={uuidv4()}>
                          {rent.name} {rent.amount}
                        </p>
                      );
                    })}
                  </td>
                  <td>
                    {element.serviceFee.map((serviceFee: any) => {
                      return (
                        <p key={uuidv4()}>
                          {serviceFee.name} {serviceFee.amount}
                        </p>
                      );
                    })}
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          setShowEdit(true);
                          setDataEdit(element);
                        }}
                      >
                        <i className="bi bi-pencil-fill" />
                        <p>แก้ไข</p>
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => setShowDelete(true)}
                      >
                        <i className="bi bi-trash" />
                        <p>ลบ</p>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="h-2" />
              </tbody>
            );
          })}
        </table>

        {showDelete && (
          <ModalDelete
            title="Are you sure you want to delete this Room?"
            onConfirm={onDelete}
          />
        )}
        {showCreate && (
          <CreateRoom
            onAddItem={onCreate}
            onCancel={setShowCreate}
            data={undefined}
            state={"create"}
          />
        )}
        {showEdit && (
          <CreateRoom
            onAddItem={onEdit}
            onCancel={setShowEdit}
            data={dataEdit}
            state={"Edit"}
          />
        )}
      </div>
    </div>
  );
}
