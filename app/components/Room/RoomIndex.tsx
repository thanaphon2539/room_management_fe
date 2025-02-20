import "./RoomIndex.css";
import RoomIcon from "./RoomIcon";
import ModalDelete from "../ModalDelete";
import { useEffect, useState } from "react";
import CreateRoom from "./CreateRoom";
import { v4 as uuidv4 } from "uuid";
import {
  deleteRoom,
  Rent,
  ResponseRoom,
  roomList,
  ServiceFee,
} from "@/pages/api/room";
import dayjs from "dayjs";

export default function RoomIndex() {
  const header = [
    "ห้อง",
    "สถานะ",
    "ประเภทลูกค้า",
    "ข้อมูลผู้ติดต่อ",
    "ข้อมูลบริษัท",
    "ระบุวันที่เข้าพัก",
    "วันที่ออก",
    "ค่าเช่า",
    "ค่าบริการ",
    "จัดการ",
  ];
  const [showDelete, setShowDelete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState<ResponseRoom>();
  const [loading, setLoading] = useState(true);
  const [items, setItem] = useState<ResponseRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await roomList();
      setItem(response.data);
      setLoading(false);
    };
    fetchRoom();
  }, []); // ใช้ [] เพื่อให้ useEffect ถูกเรียกแค่ครั้งเดียว

  if (loading) return <p>Loading...</p>;

  const onDelete = async () => {
    console.log("deleteRoomId >>>", deleteRoomId);
    if (deleteRoomId !== null) {
      const success = await deleteRoom(deleteRoomId);
      if (success) {
        setItem(items.filter((items) => items.id !== deleteRoomId));
      }
      setShowDelete(false);
      setDeleteRoomId(null);
    }
  };
  const onCreate = (value: boolean) => {
    console.log("onCreate >>>", value);
    setShowCreate(false);
  };
  const onEdit = (value: boolean) => {
    console.log("onEdit >>>", value);
    setShowEdit(false);
  };

  const handleSearch = async () => {
    try {
      const filter = {};
      if (searchQuery) {
        Object.assign(filter, {
          keyword: searchQuery,
        });
      }
      const response = await roomList(filter);
      setItem(response.data);
    } catch (error) {
      setItem([]);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
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
            <i className="bi bi-plus-lg" /> <p>สร้างห้องเช่า</p>
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              name="search"
              className="input-text !w-2/4"
              placeholder="ค้นหาห้องเช่า / ชื่อผู้ติดต่อ / ชื่อบริษัท"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="btn btn-dark text-nowrap h-fit"
              onClick={handleSearch}
            >
              <i className="bi bi-search" />
              <p>ค้นหา</p>
            </button>
          </div>
        </form>

        <div className="table-h">
          <table className="table">
            <thead>
              <tr>
                {header.map((element: any) => {
                  return <th key={uuidv4()}>{element}</th>;
                })}
              </tr>
            </thead>
            {items.map((element: ResponseRoom) => {
              return (
                <tbody key={uuidv4()}>
                  <tr>
                    <td>{element.nameRoom}</td>
                    <td>
                      <RoomIcon item={element.status} />
                    </td>
                    <td>
                      <RoomIcon item={element.type} />
                    </td>
                    <td
                      className="truncate-cell"
                      title={element?.roomContact?.name}
                    >
                      {element?.roomContact?.name}
                    </td>
                    <td
                      className="truncate-cell"
                      title={element?.roomCompany?.name}
                    >
                      {element.type === "legalEntity" && element?.roomCompany
                        ? element.roomCompany?.name
                        : ""}
                    </td>
                    <td>
                      {element.dateOfStay
                        ? dayjs(element.dateOfStay).format("DD/MM/YYYY")
                        : null}
                    </td>
                    <td>
                      {element.issueDate
                        ? dayjs(element.issueDate).format("DD/MM/YYYY")
                        : null}
                    </td>
                    <td>{element?.rentTotal}</td>
                    <td>{element?.serviceFeeTotal}</td>
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
                          onClick={() => {
                            setShowDelete(true);
                            setDeleteRoomId(element.id);
                          }}
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
        </div>

        {showDelete && (
          <ModalDelete
            title="คุณแน่ใจหรือไม่ว่าต้องการลบสิ่งนี้?"
            onConfirm={onDelete}
            onCancel={() => setShowDelete(false)}
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
            onEditItem={onEdit}
            onCancel={setShowEdit}
            data={dataEdit}
            state={"edit"}
          />
        )}
      </div>
    </div>
  );
}
