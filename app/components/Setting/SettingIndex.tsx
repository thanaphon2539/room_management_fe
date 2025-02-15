import { useEffect, useState } from "react";
import EditSetting from "./Edit";
import EditUnit from "./EditUnit";
import { ResponseSetting, settingList } from "@/pages/api/setting";

export default function RoomIndex() {
  const [showEdit, setShowEdit] = useState(false);
  const [showEditUnit, setShowEditUnit] = useState(false);
  const [dataEdit, setDataEdit] = useState<ResponseSetting>();
  const [dataEditUnit, setDataEditUnit] = useState<ResponseSetting>();
  const [data, setData] = useState<ResponseSetting>();

  const onEdit = (value: boolean) => {
    setShowEdit(value); // Set to true or false based on the value passed
  };

  const onEditUnit = (value: boolean) => {
    setShowEditUnit(value); // Set to true or false based on the value passed
  };

  useEffect(() => {
    const fetchSetting = async () => {
      const data = await settingList();
      console.log("data >>>", data);
      setData(data);
    };
    fetchSetting();
  }, []); // ใช้ [] เพื่อให้ useEffect ถูกเรียกแค่ครั้งเดียว

  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">จัดการตั้งค่า</h2>
          <button
            className="btn btn-warning"
            onClick={() => {
              setShowEditUnit(true);
              setDataEditUnit(data);
            }}
          >
            <i className="bi bi-pencil-fill" />
            <p>แก้ไขหน่วย</p>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="card border border-base-border ">
            <h1 className="font-bold ">หน่วยค่าน้ำ</h1>
            <p className="flex items-end ms-5">
              <span className="flex-1">ราคาต่อหน่วย</span>
              <span className="px-3 text-3xl">{data?.billUnit?.waterUnit}</span>
              <span>บาท</span>
            </p>
          </div>

          <div className="card border border-base-border ">
            <h1 className="font-bold ">หน่วยค่าไฟ</h1>
            <p className="flex items-end ms-5">
              <span className="flex-1">ราคาต่อหน่วย</span>
              <span className="px-3 text-3xl">
                {data?.billUnit?.electricityUnit}
              </span>
              <span>บาท</span>
            </p>
          </div>

          <div className="card border border-base-border col-span-2">
            <h1 className="font-bold flex justify-between">
              ข้อมูลผู้ติดต่อ
              <button
                className="btn btn-warning"
                onClick={() => {
                  setShowEdit(true);
                  setDataEdit(data);
                }}
              >
                <i className="bi bi-pencil-fill" />
                <p>แก้ไข</p>
              </button>
            </h1>
            <div className="ms-5">
              <p>{data?.contact?.name}</p>
              <p>โทร: {data?.contact?.phone}</p>
              <p>อีเมล: {data?.contact?.email}</p>
              <p>ที่อยู่: {data?.contact?.address}</p>
              <p>บริษัท: {data?.contact?.company}</p>
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditSetting
          onAddItem={onEdit}
          onCancel={onEdit}
          data={dataEdit}
          state={"Edit"}
        />
      )}
      {showEditUnit && (
        <EditUnit
          onAddItem={onEditUnit}
          onCancel={onEditUnit}
          data={dataEditUnit}
          state={"Edit"}
        />
      )}
    </div>
  );
}
