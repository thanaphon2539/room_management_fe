import { useState } from "react";

const EditBill = (props: { [x: string]: any; data: any; state: string }) => {
  const data = props.data;
  const state = props.state;
  const billData = {
    id: "",
    oldBill: "",
    newBill: "",
  };

  const [bill, setBill] = useState({
    id: data?.id ? data?.id : "",
    oldBill: data?.bill.old ? data?.bill.old : "",
    newBill: data?.bill.old ? data?.bill.new : "",
  });

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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block mb-2 text-gray-700">
                  ค่าน้ำเดือนที่แล้ว
                </label>
                <input
                  type="text"
                  className="input-text text-center"
                  value={bill.oldBill}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">
                  ค่าน้ำเดือนปัจจุบัน
                </label>
                <input
                  type="text"
                  className="input-text text-center"
                  value={bill.newBill}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">หน่วยที่ใช้</label>
                <p className="div-card text-center">
                  {bill.newBill - bill.oldBill}
                </p>
              </div>
            </div>

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

export default EditBill;
