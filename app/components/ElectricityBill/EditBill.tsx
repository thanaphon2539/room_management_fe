import { useEffect, useState } from "react";
import { ResponseRoomWaterUnitAndElectricityUnit } from "@/pages/api/room";

const EditBill = (props: { [x: string]: any; data: any; state: string }) => {
  const data = props.data;
  const state = props.state;

  const [bill, setBill] = useState<ResponseRoomWaterUnitAndElectricityUnit[]>(
    []
  );

  useEffect(() => {
    setBill([...data]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (room.name && room.status) {
    //   props.onAddItem({
    //     id: Date.now(),
    //   });
    // }
  };

  const cancel = () => {
    props.onCancel(false);
  };

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = bill.map((prev, i) => {
      if (i === index) {
        prev = { ...prev, [name]: value }; // แก้ไขข้อมูลห้องหลัก
      }
      return prev;
    });

    setBill([...updatedData]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-dark-base">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-end capitalize">
            {state} Bill
          </h2>
          <button className="btn !text-dark-base" onClick={() => cancel()}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="max-h-[calc(80vh)] overflow-y-auto space-y-2">
          <form>
            {bill.map((item: any, i: number) => {
              return (
                <div key={`item${i}`} className="grid grid-cols-4 gap-2">
                  <div
                    className={`pb-2 self-end text-center ${
                      i === 0 ? "pt-[30px]" : ""
                    }`}
                  >
                    {item.nameRoom}
                  </div>
                  <div>
                    {i === 0 && (
                      <label className="block mb-2 text-center">
                        ค่าไฟเดือนที่แล้ว
                      </label>
                    )}
                    <input
                      type="text"
                      disabled
                      className="input-text text-center text-dark-light"
                      value={item.unitBefor}
                    />
                  </div>
                  <div>
                    {i === 0 && (
                      <label className="block mb-2 text-center">
                        ค่าไฟเดือนปัจจุบัน
                      </label>
                    )}
                    <input
                      type="text"
                      className="input-text text-center text-error-base"
                      value={item.unitAfter}
                      name="unitAfter"
                      onChange={(e) => handleInputChange(i, e)}
                    />
                  </div>
                  <div>
                    {i === 0 && (
                      <label className="block mb-2 text-center">
                        หน่วยที่ใช้
                      </label>
                    )}
                    <p className="div-card text-center text-dark-medium">
                      {item.unitAfter - item.unitBefor}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full btn btn-success"
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

export default EditBill;
