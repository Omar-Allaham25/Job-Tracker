import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const loginUser = (credentials: { email: string; password: string }) =>
  API.post("/auth/login", credentials);
export const regidterUser=(credential:{name:string,email:string,password:string,confirmPassword:string})=>{
  API.post("/auth/register",credential);
}
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const getMyApplications=(()=>API.get("/applications"));