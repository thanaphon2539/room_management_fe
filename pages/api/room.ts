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
  licensePlate: string;
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

export interface Other {
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
  serviceOther: Other[];
  rentTotal: number;
  serviceFeeTotal: number;
  otherTotal: number;
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
  rentTotal: number;
  serviceFeeTotal: number;
  otherTotal: number;
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
    // console.log("response >>> ", response);
    const { meta, data } = response.data;
    return {
      pageCount: Number(meta?.pageCount) || 1, // ป้องกัน undefined
      data:
        data?.map((el: IRoom) => ({
          ...el,
          dateOfStay: el.dateOfStay
            ? dayjs(el.dateOfStay).format("YYYY-MM-DD")
            : "",
          issueDate: el.issueDate
            ? dayjs(el.issueDate).format("YYYY-MM-DD")
            : "",
          rent:
            el?.rent?.length > 0 ? el.rent : [{ name: "ค่าเช่า", price: 0 }],
          serviceFee:
            el?.serviceFee?.length > 0
              ? el.serviceFee
              : [{ name: "ค่าบริการ", price: 0 }],
          other:
            el?.serviceOther?.length > 0
              ? el.serviceOther
              : [{ name: "ค่าอื่นๆ", price: 0 }],
        })) || [], // ป้องกัน undefined
    };
  } catch (error: any) {
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
    if (error?.response) {
      console.log("Response Data:", error?.response?.data);
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    return []; // คืนค่าเริ่มต้น
  }
};

const createRoom = async (input: any) => {
  const token = getToken();
  if (!token) throw new Error("ไม่พบข้อมูล Token");

  const config = {
    method: "POST",
    url: `${apiUrl}/room/create`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: input,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    return null; // คืนค่าเริ่มต้น
  }
};

const updateRoom = async (id: number, input: any) => {
  const token = getToken();
  if (!token) throw new Error("ไม่พบข้อมูล Token");

  const config = {
    method: "PUT",
    url: `${apiUrl}/room/update/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: input,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    return null; // คืนค่าเริ่มต้น
  }
};

const deleteRoom = async (id: number) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("ไม่พบข้อมูล Token");
    }
    const result = await axios
      .delete(`${apiUrl}/room/${id}`, {
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
        if (error.response) {
          console.log("Response Data:", error.response.data);
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
    alert(error); // แสดง alert เมื่อเกิดข้อผิดพลาด
    return false;
  }
};

const updateWaterUnit = async (input: any) => {
  const token = getToken();
  if (!token) throw new Error("ไม่พบข้อมูล Token");

  const config = {
    method: "POST",
    url: `${apiUrl}/room/update/waterunit`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: input,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    return null; // คืนค่าเริ่มต้น
  }
};

const updateElectricityUnit = async (input: any) => {
  const token = getToken();
  if (!token) throw new Error("ไม่พบข้อมูล Token");

  const config = {
    method: "POST",
    url: `${apiUrl}/room/update/electricityunit`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: input,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    return null; // คืนค่าเริ่มต้น
  }
};

export {
  roomList,
  findWaterUnit,
  findElectricityUnit,
  createRoom,
  updateRoom,
  deleteRoom,
  updateWaterUnit,
  updateElectricityUnit,
};
