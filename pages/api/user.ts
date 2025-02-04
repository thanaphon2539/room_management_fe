// pages/api/user.ts
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const userList = async () => {
  try {
    console.log('apiUrl >>>', apiUrl);
    const xxx = await axios.get(`${apiUrl}/user`)
    console.log('xxx >>>', xxx);
    const res = await fetch(`${apiUrl}/user`);
    // ตรวจสอบสถานะการตอบกลับของ API และแปลงเป็น JSON

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const { data } = await res.json(); // แปลงผลลัพธ์เป็น JSON
    return data;
  } catch (error) {
    alert(error); // แสดง alert เมื่อเกิดข้อผิดพลาด
    throw error; // โยนข้อผิดพลาดเพื่อให้สามารถจัดการในที่อื่นได้
  }
};

export { userList };
