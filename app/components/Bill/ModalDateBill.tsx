import { useEffect, useState } from "react";
import { updateElectricityUnit } from "@/pages/api/room";
import dayjs from "dayjs";

const ModalDateBill = (props: { [x: string]: any }) => {
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));

  const handleSubmit = async () => {
    props.onSubmit();
  };

  const cancel = () => {
    props.onCancel(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    props.onChangeDate(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-dark-base">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-end capitalize">วันที่</h2>
          <button className="btn !text-dark-base" onClick={() => cancel()}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="max-h-[calc(80vh)] overflow-y-auto space-y-2">
          <form>
            <input
              type="date"
              className="input-text text-center"
              value={date}
              name="date"
              onChange={(e) => handleInputChange(e)}
            />
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

export default ModalDateBill;
