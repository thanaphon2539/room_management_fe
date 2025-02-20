import { useState } from "react";
import { updateContactaddres } from "@/pages/api/setting";

const EditSetting = (props: { [x: string]: any; data: any; state: string }) => {
  const data = props.data;
  const state = props.state;

  const [setting, setSetting] = useState({
    water: data?.water ? data?.water : 0,
    electricity: data?.electricity ? data?.electricity : 0,
    contact: {
      name: data?.contact?.name ? data?.contact?.name : "",
      phone: data?.contact?.phone ? data?.contact?.phone : "",
      email: data?.contact?.email ? data?.contact?.email : "",
      address: data?.contact?.address ? data?.contact?.address : "",
      company: data?.contact?.company ? data?.contact?.company : "",
      idTax: data?.contact?.idTax ? data?.contact?.idTax : "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateContactaddres(setting.contact);
      cancel();
      window.location.reload();
    } catch (error) {
      console.error("Error update contact address:", error);
    }
  };

  const cancel = () => {
    props.onCancel(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSetting({
      ...setting,
      contact: {
        ...setting.contact,
        [e.target.name]: e.target.value,
      },
    });
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
                  name="name"
                  value={setting.contact.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">เบอร์โทร</label>
                <input
                  type="text"
                  className="input-text"
                  name="phone"
                  value={setting.contact.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">อีเมล</label>
                <input
                  type="text"
                  className="input-text"
                  name="email"
                  value={setting.contact.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-gray-700">ที่อยู่</label>
                <textarea
                  className="input-text"
                  name="address"
                  value={setting.contact.address}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-gray-700">บริษัท</label>
                <input
                  type="text"
                  className="input-text"
                  name="company"
                  value={setting.contact.company}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-gray-700">
                  เลขประจำตัวผู้เสียภาษี
                </label>
                <input
                  type="text"
                  className="input-text"
                  name="idTax"
                  value={setting.contact.idTax}
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

export default EditSetting;
