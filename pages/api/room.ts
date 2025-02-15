import axios from "axios";
import { getToken } from "@/app/login/cookie";
import dayjs from "dayjs";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

enum typeRoom {
  legalEntity = "legalEntity",
  person = "person",
}

enum statusRoom {
  blank = "blank",
  busy = "busy",
  reserve = "reserve",
}

interface Contact {
  id: number;
  name: string;
  phone: string;
  idCard: string;
  address: string;
}

interface Company {
  id: number;
  name: string;
  phone: string;
  idTax: string;
  address: string;
}

export interface Rent {
  id: number;
  name: string;
  price: number;
  total: number;
}

export interface ServiceFee {
  id: number;
  name: string;
  price: number;
  total: number;
}

interface IRoom {
  id: number;
  nameRoom: string;
  type: typeRoom;
  status: statusRoom;
  dateOfStay: Date;
  issueDate: Date;
  roomContact: Contact;
  roomCompany: Company;
  rent: Rent[];
  serviceFee: ServiceFee[];
}

export interface ResponseRoom {
  id: number;
  nameRoom: string;
  type: typeRoom;
  status: statusRoom;
  dateOfStay: string;
  issueDate: string;
  roomContact: Contact;
  roomCompany: Company;
  rent: Rent[];
  serviceFee: ServiceFee[];
}

const roomList = async (params?: {
  keyword?: string;
}): Promise<ResponseRoom[]> => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (params) {
    Object.assign(config, {
      params: params
    })
  }
  const result = await axios
    .get(`${apiUrl}/room`, config)
    .then((response) => {
      console.log(response.data);
      const { data } = response.data;
      if (data.length === 0) {
        return [];
      }
      return data.map((el: IRoom) => {
        return {
          ...el,
          dateOfStay: el.dateOfStay ? dayjs(el.dateOfStay) : null,
          issueDate: el.issueDate ? dayjs(el.issueDate) : null,
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
export { roomList };
