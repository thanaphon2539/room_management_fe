import "./RoomIndex.css";
import RoomIcon from "./RoomIcon";
import ModalDelete from "../ModalDelete";
import { useEffect, useState } from "react";
import CreateRoom from "./CreateRoom";
import { v4 as uuidv4 } from "uuid";
import { Rent, ResponseRoom, roomList, ServiceFee } from "@/pages/api/room";

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
  const [showDelete, setShowDelete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  const [loading, setLoading] = useState(true);
  const [items, setItem] = useState<ResponseRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      const data = await roomList();
      setItem(data);
      setLoading(false);
    };
    fetchRoom();
  }, []); // ใช้ [] เพื่อให้ useEffect ถูกเรียกแค่ครั้งเดียว

  if (loading) return <p>Loading...</p>;

  const onDelete = (value: boolean) => {
    console.log(value);
    setShowDelete(false);
  };
  const onCreate = (value: boolean) => {
    console.log(value);
    setShowCreate(false);
  };
  const onEdit = (value: boolean) => {
    console.log(value);
    setShowEdit(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const data = await roomList({
        keyword: searchQuery,
      });
      setItem(data);
    } catch (error) {
      console.log("error >>>", error);
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
              placeholder="ค้นหาห้องเช่า"
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
                  <td>{element?.roomContact?.name}</td>
                  <td>{element.dateOfStay}</td>
                  <td>{element.issueDate}</td>
                  <td>
                    {element?.rent?.map((rent: Rent) => {
                      return <p key={uuidv4()}>{rent.total}</p>;
                    })}
                  </td>
                  <td>
                    {element?.serviceFee?.map((serviceFee: ServiceFee) => {
                      return <p key={uuidv4()}>{serviceFee.total}</p>;
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
