import { useState } from "react";

const CreateRoom = (props: { [x: string]: any; data: any; state: string }) => {
  const data = props.data;
  const state = props.state;

  const [room, setRoom] = useState({
    id: data?.id ? data.id : "",
    name: data?.name ? data.name : "",
    status: data?.status ? data.status : "",
    userType: data?.userType ? data.userType : "",
    contact: data?.contact ? data.contact : "",
    checkin: data?.checkin ? data.checkin : "",
    checkout: data?.checkout ? data.checkout : "",
    rent: data?.rent ? data.rent : 0,
    serviceFee: data?.serviceFee ? data.serviceFee : 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (room.name && room.status) {
      props.onAddItem({
        id: Date.now(),
        name: room.name,
        status: room.status,
        userType: room.userType,
      });
    }
  };

  const cancel = () => {
    props.onCancel(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-dark-base">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-end capitalize">
            {state} Room
          </h2>
          <button className="btn !text-dark-base" onClick={() => cancel()}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-gray-700">ชื่อห้อง</label>
            <input
              type="text"
              name="name"
              value={room.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <label className="block mt-4 mb-2 text-gray-700">สถานะ</label>
            <input
              type="text"
              name="username"
              value={room.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <label className="block mt-4 mb-2 text-gray-700">สถานะลูกค้า</label>
            <input
              type="text"
              name="password"
              value={room.userType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

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

export default CreateRoom;
