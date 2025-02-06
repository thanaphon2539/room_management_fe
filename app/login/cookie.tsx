import Cookies from "js-cookie";

const saveToken = (token: string) => {
  Cookies.set("token", token, { expires: 7, secure: true });
};

const getToken = () => {
  return Cookies.get("token");
};

export { saveToken, getToken };
