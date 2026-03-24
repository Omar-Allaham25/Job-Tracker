import axios from "axios";

type updatedData={
  job_title:string;
  status:string;
  notes?:string;
}
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const loginUser = (credentials: { email: string; password: string }) =>
  API.post("/auth/login", credentials);
export const registerUser=(credential:{name:string,email:string,password:string,confirmPassword:string})=>
  API.post("/auth/register",credential);
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
export const deleteApplication=((id:number)=>API.delete(`/applications/update/${id}`));
export const updateApplication=((id:number,updatedData:updatedData)=>API.patch(`/applications/${id}`,updatedData));