import { ResponseSetting } from "@/pages/api/setting";
import { useState } from "react";
import { updateUnit } from "@/pages/api/setting";

const EditUnit = (props: {
  [x: string]: any;
  data?: ResponseSetting;
  state: string;
}) => {
  const data = props.data;
  const state = props.state;
  const [setting, setSetting] = useState({
    billUnit: {
      waterUnit: data?.billUnit?.waterUnit ? data?.billUnit?.waterUnit : 0,
      electricityUnit: data?.billUnit?.electricityUnit
        ? data?.billUnit?.electricityUnit
        : 0,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUnit({
        waterUnit: Number(setting.billUnit.waterUnit),
        electricityUnit: Number(setting.billUnit.electricityUnit),
      });
      cancel();
      window.location.reload();
    } catch (error) {
      console.error("Error update unit:", error);
    }
  };

  const cancel = () => {
    props.onCancel(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSetting({
      ...setting,
      billUnit: {
        ...setting.billUnit,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-dark-base">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-end capitalize">
            {state === "Edit" ? "แก้ไขหน่วย" : ""}
          </h2>
          <button className="btn !text-dark-base" onClick={() => cancel()}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="max-h-[calc(80vh)] overflow-y-auto space-y-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-2 text-gray-700">
                  ราคาค่าน้ำต่อหน่วย
                </label>
                <input
                  type="text"
                  className="input-text"
                  name="waterUnit"
                  value={setting.billUnit.waterUnit}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">
                  ราคาค่าไฟต่อหน่วย
                </label>
                <input
                  type="text"
                  className="input-text"
                  name="electricityUnit"
                  value={setting.billUnit.electricityUnit}
                  onChange={handleChange}
                />
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

export default EditUnit;
