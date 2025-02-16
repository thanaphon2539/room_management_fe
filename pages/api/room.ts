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
  pageCount: number;
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

export interface ResponseRoomWaterUnitAndElectricityUnit {
  id: number;
  nameRoom: string;
  type: typeRoom;
  status: statusRoom;
  month: number;
  year: number;
  unitBefor: number;
  unitAfter: number;
}

export interface ResponseRoomList {
  pageCount: number;
  data: ResponseRoom[];
}

const roomList = async (params?: {
  keyword?: string;
  page?: number;
  limit?: number;
}): Promise<ResponseRoomList> => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
    params: params || {}, // ป้องกัน undefined params
  };

  try {
    const response = await axios.get(`${apiUrl}/room`, config);
    console.log("response >>> ", response);

    const { meta, data } = response.data;
    return {
      pageCount: Number(meta?.pageCount) || 1, // ป้องกัน undefined
      data:
        data?.map((el: IRoom) => ({
          ...el,
          dateOfStay: el.dateOfStay
            ? dayjs(el.dateOfStay).format("DD/MM/YYYY")
            : "",
          issueDate: el.issueDate
            ? dayjs(el.issueDate).format("DD/MM/YYYY")
            : "",
        })) || [], // ป้องกัน undefined
    };
  } catch (error: any) {
    console.error("Axios error:", error);
    if (error?.response) {
      console.log("Response Data:", error?.response?.data);
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    // คืนค่าเริ่มต้น เพื่อให้ไม่เป็น undefined
    return {
      pageCount: 1,
      data: [],
    };
  }
};

const findWaterUnit = async (params: {
  month: number;
  year: number;
}): Promise<ResponseRoomWaterUnitAndElectricityUnit[]> => {
  const token = getToken();
  if (!token) throw new Error("ไม่พบข้อมูล Token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
    params: params,
  };

  try {
    const response = await axios.get(`${apiUrl}/room/waterunit`, config);
    console.log("response >>> ", response);
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Axios error:", error);
    if (error?.response) {
      console.log("Response Data:", error?.response?.data);
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    return []; // คืนค่าเริ่มต้น
  }
};

const findElectricityUnit = async (params: {
  month: number;
  year: number;
}): Promise<ResponseRoomWaterUnitAndElectricityUnit[]> => {
  const token = getToken();
  if (!token) throw new Error("ไม่พบข้อมูล Token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
    params: params,
  };

  try {
    const response = await axios.get(`${apiUrl}/room/electricityunit`, config);
    console.log("response >>> ", response);
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Axios error:", error);
    if (error?.response) {
      console.log("Response Data:", error?.response?.data);
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    return []; // คืนค่าเริ่มต้น
  }
};
export { roomList, findWaterUnit, findElectricityUnit };
