import axios from "axios";
import { getToken } from "@/app/login/cookie";
import dayjs from "dayjs";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IUser {
  id: number;
  name: string;
  username: string;
  isActive: boolean;
  updatedAt: Date;
}

export interface ResponseUser {
  id: number;
  name: string;
  username: string;
  isActive: string;
  updatedAt: string;
}

const userList = async (): Promise<ResponseUser[]> => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }
  const result = await axios
    .get(`${apiUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      const { data } = response.data;
      if (data.length === 0) {
        return [];
      }
      return data.map((el: IUser) => {
        return {
          id: el.id,
          name: el.name,
          isActive: el.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน",
          updatedAt: dayjs(el.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
        };
      });
    })
    .catch((error) => {
      console.error("Axios error:", error);
      if (error.response) {
        console.log("Response Data:", error.response.data);
        // console.log("Response Status:", error.response.status);
        // console.log("Response Headers:", error.response.headers);
        const { meta } = error.response.data;
        alert(meta.message); // แสดง alert เมื่อเกิดข้อผิดพลาด
      }
    });
  // console.log("result >>>", result);
  return Promise.resolve(result);
};

const createUser = async (input: {
  name: string;
  username: string;
  password: string;
}): Promise<{
  id: number;
}> => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }
  const result = await axios
    .post(
      `${apiUrl}/user/create`,
      input, // Payload goes here
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      const { data } = response.data;
      return data.id;
    })
    .catch((error) => {
      console.error("Axios error:", error);
      if (error.response) {
        console.log("Response Data:", error.response.data);
        // console.log("Response Status:", error.response.status);
        // console.log("Response Headers:", error.response.headers);
        const { meta } = error.response.data;
        alert(meta.message); // แสดง alert เมื่อเกิดข้อผิดพลาด
      }
    });
  // console.log("result >>>", result);
  return Promise.resolve(result);
};

const updateUser = async (
  id: number,
  name: string
): Promise<{
  id: number;
}> => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }
  const result = await axios
    .patch(
      `${apiUrl}/user/${id}`,
      { name: name }, // Payload goes here
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      const { data } = response.data;
      return data.id;
    })
    .catch((error) => {
      console.error("Axios error:", error);
      if (error.response) {
        console.log("Response Data:", error.response.data);
        // console.log("Response Status:", error.response.status);
        // console.log("Response Headers:", error.response.headers);
        const { meta } = error.response.data;
        alert(meta.message); // แสดง alert เมื่อเกิดข้อผิดพลาด
      }
    });
  // console.log("result >>>", result);
  return Promise.resolve({
    id: result,
  });
};

const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("ไม่พบข้อมูล Token");
    }
    const result = await axios
      .delete(`${apiUrl}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        const { data } = response.data;
        return {
          id: data.id,
        };
      })
      .catch((error) => {
        console.error("Axios error:", error);
        if (error.response) {
          console.log("Response Data:", error.response.data);
          // console.log("Response Status:", error.response.status);
          // console.log("Response Headers:", error.response.headers);
          const { meta } = error.response.data;
          alert(meta.message); // แสดง alert เมื่อเกิดข้อผิดพลาด
        }
      });
    // console.log("result >>>", result);
    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting user:", error);
    alert(error); // แสดง alert เมื่อเกิดข้อผิดพลาด
    return false;
  }
};

export { userList, createUser, updateUser, deleteUser };
