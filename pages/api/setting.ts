import axios from "axios";
import { getToken } from "@/app/login/cookie";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  position: string;
}

export interface BillUnit {
  id: number;
  waterUnit: number;
  electricityUnit: number;
}

export interface ResponseSetting {
  billUnit: BillUnit;
  contact: Contact;
}

const settingList = async (): Promise<ResponseSetting> => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }
  const billUnit: BillUnit = await axios
    .get(`${apiUrl}/setting/billunit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      const { data } = response.data;
      return data;
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

  const contact: Contact = await axios
    .get(`${apiUrl}/setting/contactaddress`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      const { data } = response.data;
      return data;
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

  return Promise.resolve({
    billUnit,
    contact,
  });
};
export { settingList };
