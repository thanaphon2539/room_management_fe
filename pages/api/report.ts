import { getToken } from "@/app/login/cookie";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const generateRentExcel = async (input: {
  type: string;
  year: number;
  month: number;
}) => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }

  try {
    const response = await axios.post(`${apiUrl}/report/rent`, input, {
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

const generateCheckInExcel = async (input: {
  type: string;
  year: number;
  month: number;
}) => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }

  try {
    const response = await axios.post(`${apiUrl}/report/checkin`, input, {
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

const generateCheckOutExcel = async (input: {
  type: string;
  year: number;
  month: number;
}) => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }

  try {
    const response = await axios.post(`${apiUrl}/report/checkout`, input, {
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

const generateBlankRoomExcel = async (input: {
  type: string;
  year: number;
  month: number;
}) => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }

  try {
    const response = await axios.post(`${apiUrl}/report/blank`, input, {
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

const generateElectricityExcel = async (input: {
  type: string;
  year: number;
  month: number;
}) => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }

  try {
    const response = await axios.post(`${apiUrl}/report/electricity`, input, {
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

const generateWaterExcel = async (input: {
  type: string;
  year: number;
  month: number;
}) => {
  const token = getToken();
  if (!token) {
    throw new Error("ไม่พบข้อมูล Token");
  }

  try {
    const response = await axios.post(`${apiUrl}/report/water`, input, {
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
export {
  generateRentExcel,
  generateCheckInExcel,
  generateCheckOutExcel,
  generateBlankRoomExcel,
  generateElectricityExcel,
  generateWaterExcel,
};
