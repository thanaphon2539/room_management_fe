import { useState } from "react";

const EditSetting = (props: { [x: string]: any; data: any; state: string }) => {
  const data = props.data;
  const state = props.state;
  const settingData = {
    water: 5,
    electricity: 10,
    contact: {
      name: "",
      phone: "",
      email: "",
      address: "",
      company: "",
      position: "",
    },
  };

  const [setting, setSetting] = useState({
    water: data?.water ? data?.water : 0,
    electricity: data?.electricity ? data?.electricity : 0,
    contact: {
      name: data?.contact?.name ? data?.contact?.name : "",
      phone: data?.contact?.phone ? data?.contact?.phone : "",
      email: data?.contact?.email ? data?.contact?.email : "",
      address: data?.contact?.address ? data?.contact?.address : "",
      company: data?.contact?.company ? data?.contact?.company : "",
      position: data?.contact?.position ? data?.contact?.position : "",
    },
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
            {state} Setting
          </h2>
          <button className="btn !text-dark-base" onClick={() => cancel()}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="max-h-[calc(80vh)] overflow-y-auto space-y-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <label className="block mb-2 text-gray-700">ชื่อ</label>
                <input
                  type="text"
                  className="input-text"
                  value={setting.contact.name}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">เบอร์โทร</label>
                <input
                  type="text"
                  className="input-text"
                  value={setting.contact.phone}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">อีเมล</label>
                <input
                  type="text"
                  className="input-text"
                  value={setting.contact.email}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-gray-700">ที่อยู่</label>
                <textarea
                  className="input-text"
                  value={setting.contact.address}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">บริษัท</label>
                <input
                  type="text"
                  className="input-text"
                  value={setting.contact.company}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">ตำแหน่ง</label>
                <input
                  type="text"
                  className="input-text"
                  value={setting.contact.position}
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

export default EditSetting;
