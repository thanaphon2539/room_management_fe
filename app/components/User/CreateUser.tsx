import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateUser = (props: { [x: string]: any; data: any; state: string }) => {
  const data = props.data;
  const state = props.state;
  const settingData = {
    water: 5,
    electricity: 10,
    contact: {
      id: "",
      name: "",
      username: "",
      password: "",
    },
  };

  const [user, setUser] = useState({
    id: data?.id ? data?.id : uuidv4(),
    name: data?.name ? data?.name : "",
    username: data?.username ? data?.username : "",
    password: data?.password ? data?.password : "",
  });

  const cancel = () => {
    props.onCancel(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.name && user.username) {
      if (state === "create") {
        props.onAddItem({
          id: Date.now(),
          name: user.name,
          username: user.username,
          password: user.password,
        });
      }
      if (state === "edit") {
        props.onEditItem({
          id: user.id,
          name: user.name,
          username: user.username,
          password: user.password,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-dark-base">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-end capitalize">
            {state} User
          </h2>
          <button className="btn !text-dark-base" onClick={() => cancel()}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="max-h-[calc(80vh)] overflow-y-auto space-y-2">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div>
                <label className="block mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input-text"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  className="input-text"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
              {state === "create" && (
                <div>
                  <label className="block mb-2 text-gray-700">Password</label>
                  <input
                    type="text"
                    name="password"
                    className="input-text"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="flex-1 justify-center btn btn-success"
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

export default CreateUser;
