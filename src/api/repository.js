import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL 

const userRepository = {
  getAllUsers: async () => {
    console.log("API_URL:", API_URL); // เช็คว่ามีค่าหรือไม่
    const response = await axios.get(API_URL);
    return response.data;
  },
};

export default userRepository;
