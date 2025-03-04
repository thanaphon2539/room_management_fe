import { useEffect, useState } from "react";
import { updateWaterUnit } from "@/pages/api/room";

const EditBill = (props: { [x: string]: any; data: any; state: string }) => {
  const data = props.data;
  // const state = props.state;
  const [bill, setBill] = useState<any[]>([]);

  useEffect(() => {
    setBill([
      ...data.items.map((el: any) => ({
        ...el,
        year: data.year,
        month: data.month,
      })),
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("bill >>>", bill);
    let success = false;
    const updateData = bill.map((el) => ({
      roomId: el.id,
      year: el.year,
      month: el.month,
      unitBefor: Number(el.unitBefor),
      unitAfter: Number(el.unitAfter),
    }));
    const result = await updateWaterUnit(updateData);
    if (result && result?.data?.id?.length > 0) {
      success = true;
    }
    if (success) {
      window.location.reload();
    }
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
        prev = { ...prev, [name]: value };
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
            บันทึกค่าน้ำ
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
                        ค่าน้ำเดือนที่แล้ว
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
                        ค่าน้ำเดือนปัจจุบัน
                      </label>
                    )}
                    <input
                      type="text"
                      className={`${
                        item.unitBefor <= item.unitAfter ||
                        "!border-error-base focus:outline-none focus:ring-error-base"
                      } input-text text-center text-primary-base`}
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
                      {item.unitAfter !== 0
                        ? item.unitAfter - item.unitBefor
                        : 0}
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
