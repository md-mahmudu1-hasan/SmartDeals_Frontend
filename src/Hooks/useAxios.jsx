import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const UseAxios = () => {
  return instance;
};

export default UseAxios;
