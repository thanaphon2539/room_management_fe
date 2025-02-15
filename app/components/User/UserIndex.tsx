"use client";

import "./../Room/RoomIndex";
import ModalDelete from "../ModalDelete";
import React, { useEffect, useState } from "react";
import CreateUser from "./CreateUser";
import { v4 as uuidv4 } from "uuid";
import { deleteUser, ResponseUser, userList } from "@/pages/api/user";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function UserIndex() {
  const header = ["ลำดับ", "ชื่อ", "สถานะ", "อัพเดทล่าสุด"];
  const [users, setUsers] = useState<ResponseUser[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState<ResponseUser>();
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await userList();
      setUsers(data);
      setLoading(false);
    };
    fetchUser();
  }, []); // ใช้ [] เพื่อให้ useEffect ถูกเรียกแค่ครั้งเดียว

  if (loading) return <p>Loading...</p>;

  const onDelete = async () => {
    if (deleteUserId !== null) {
      const success = await deleteUser(deleteUserId);
      if (success) {
        setUsers(users.filter((user) => user.id !== deleteUserId));
      }
      setShowDelete(false);
      setDeleteUserId(null);
    }
  };
  const onCreate = (newUser: ResponseUser) => {
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
            <i className="bi bi-plus-lg" /> <p>สร้างผู้ใช้งาน</p>
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
            <p>ค้นหา</p>
          </button>
        </div>

        <table className="table mt-4">
          <thead>
            <tr>
              {header.map((element: any) => {
                return <th key={uuidv4()}>{element}</th>;
              })}
            </tr>
          </thead>
          {users.map((element: ResponseUser, key: number) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td>{key + 1}</td>
                  <td>{element.name}</td>
                  <td>
                    <i
                      className={`mx-2 bi bi-check-circle-fill ${
                        element.isActive === "เปิดใช้งาน"
                          ? "text-success-base"
                          : "text-dark-light"
                      }`}
                    ></i>
                    {element.isActive}
                  </td>
                  <td>{element.updatedAt}</td>
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
            title="คุณแน่ใจหรือไม่ว่าต้องการลบสิ่งนี้?"
            onConfirm={onDelete}
            onCancel={() => setShowDelete(false)}
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
