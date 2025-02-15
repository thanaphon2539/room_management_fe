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

const roomList = async (params?: {
  keyword?: string;
  page?: number;
  limit?: number;
}): Promise<{
  pageCount: number;
  data: ResponseRoom[];
}> => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };
  if (params) {
    Object.assign(config, {
      params: params,
    });
  }
  const result = await axios
    .get(`${apiUrl}/room`, config)
    .then((response) => {
      console.log("response >>> ", response);
      const { meta, data } = response.data;
      if (data.length === 0) {
        return null;
      }
      return {
        pageCount: Number(meta.pageCount),
        data: data.map((el: IRoom) => {
          return {
            ...el,
            dateOfStay: el.dateOfStay
              ? dayjs(el.dateOfStay).format("DD/MM/YYYY")
              : null,
            issueDate: el.issueDate
              ? dayjs(el.issueDate).format("DD/MM/YYYY")
              : null,
          };
        }),
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
  return Promise.resolve(result);
};

const findWaterUnit = async (params: {
  month: number;
  year: number;
}): Promise<ResponseRoomWaterUnitAndElectricityUnit[]> => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };
  if (params) {
    Object.assign(config, {
      params: params,
    });
  }
  const result = await axios
    .get(`${apiUrl}/room/waterunit`, config)
    .then((response) => {
      console.log("response >>> ", response);
      const { data } = response.data;
      if (data.length === 0) {
        return [];
      }
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
  // console.log("result >>>", result);
  return Promise.resolve(result);
};

const findElectricityUnit = async (params: {
  month: number;
  year: number;
}): Promise<ResponseRoomWaterUnitAndElectricityUnit[]> => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  };
  if (params) {
    Object.assign(config, {
      params: params,
    });
  }
  const result = await axios
    .get(`${apiUrl}/room/electricityunit`, config)
    .then((response) => {
      console.log("response >>> ", response);
      const { data } = response.data;
      if (data.length === 0) {
        return [];
      }
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
  // console.log("result >>>", result);
  return Promise.resolve(result);
};
export { roomList, findWaterUnit, findElectricityUnit };
