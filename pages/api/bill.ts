import axios from "axios";
import { getToken } from "@/app/login/cookie";
import dayjs from "dayjs";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface ResponseBillList {
  nameRoom: string;
  status: string;
  type: string;
  contactName: string;
  companyName: string;
}
const billList = async (params: {
  year: string;
  month: string;
  type: any;
}): Promise<{
  data: ResponseBillList[] | [];
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
    params: params || {}, // ป้องกัน undefined params
  };

  try {
    const response = await axios.get(`${apiUrl}/bill`, config);
    // console.log("response >>> ", response);
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.log("Response Data:", error?.response?.data);
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    // คืนค่าเริ่มต้น เพื่อให้ไม่เป็น undefined
    return {
      data: [],
    };
  }
};

const invoiceBill = async (input: {
  nameRoom: string;
  year: number;
  month: number;
  type: any;
}) => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }

  try {
    const response = await axios.post(`${apiUrl}/bill/invoice`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob", // รองรับการดาวน์โหลดไฟล์
    });
    // console.log("response >>> ", response);
    return response;
  } catch (error: any) {
    if (error?.response) {
      console.log("Response Data:", error?.response?.data);
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    // คืนค่าเริ่มต้น เพื่อให้ไม่เป็น undefined
    return {
      data: false,
    };
  }
};

const receiptBill = async (input: {
  nameRoom: string;
  year: number;
  month: number;
  type: any;
}) => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }

  try {
    const response = await axios.post(`${apiUrl}/bill/receipt`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob", // รองรับการดาวน์โหลดไฟล์
    });
    // console.log("response >>> ", response);
    return response;
  } catch (error: any) {
    if (error?.response) {
      console.log("Response Data:", error?.response?.data);
      alert(error.response.data?.meta?.message || "เกิดข้อผิดพลาด");
    }
    // คืนค่าเริ่มต้น เพื่อให้ไม่เป็น undefined
    return {
      data: false,
    };
  }
};

export { billList, invoiceBill, receiptBill };
