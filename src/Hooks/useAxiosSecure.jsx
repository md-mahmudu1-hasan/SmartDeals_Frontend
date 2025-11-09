import axios from "axios";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const UseAxiosSecure = () => {
  useEffect(() => {
    const reqInsterseptor = instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      instance.interceptors.request.eject(reqInsterseptor);
    };
  }, []);

  return instance;
};

export default UseAxiosSecure;
