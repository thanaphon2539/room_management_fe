import "./../Room/RoomIndex";
import ModalDelete from "../ModalDelete";
import { useState } from "react";
import CreateUser from "./CreateUser";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: number;
  name: string;
  username: string;
}

export default function UserIndex() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", username: "john@example.com" },
    { id: 2, name: "Jane Smith", username: "jane@example.com" },
  ]);
  const [showDelete, setShowDelete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const onDelete = (value: boolean) => {
    setShowDelete(false);
    if (deleteUserId !== null && value) {
      setUsers(users.filter((user) => user.id !== deleteUserId));
      setDeleteUserId(null);
    }
  };
  const onCreate = (newUser: User) => {
    setUsers([...users, newUser]);
    setShowCreate(false);
  };
  const onEdit = (value: boolean) => {
    setShowEdit(false);
  };
  return (
    <div className="container">
      <div className="card">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">รายการผู้ใช้งานระบบ</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreate(true)}
          >
            <i className="bi bi-plus" /> <p>สร้างผู้ใช้งาน</p>
          </button>
        </div>

        <table className="table mt-4">
          {users.map((element: any) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td className="!text-start">{element.name}</td>
                  <td className="!text-start">{element.username}</td>
                  <td>
                    <div className="flex justify-end">
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
                          setDeleteUserId(element.id);
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

        {showDelete && (
          <ModalDelete
            title="Are you sure you want to delete this User?"
            onConfirm={onDelete}
          />
        )}
        {showCreate && (
          <CreateUser
            onAddItem={onCreate}
            onCancel={setShowCreate}
            data={undefined}
            state={"create"}
          />
        )}
        {showEdit && (
          <CreateUser
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
