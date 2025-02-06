const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const loginApi = async (username: string, password: string) => {
  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    alert(error); // แสดง alert เมื่อเกิดข้อผิดพลาด
    throw error; // โยนข้อผิดพลาดเพื่อให้สามารถจัดการในที่อื่นได้
  }
};

export { loginApi };
