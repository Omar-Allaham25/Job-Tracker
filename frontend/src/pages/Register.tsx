import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error,setError]=useState("");
  const navigate=useNavigate();
const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  setFormData({...formData,[e.target.name]:e.target.value});
}
const handleSubmit= async (e:React.FormEvent)=>{
  e.preventDefault();
  setError("");
 try{
  const response=await axios.post("http://localhost:5000/api/auth/register",formData)
  if(response.data.status!=="succes"){
    throw new Error(response.data.message);
    
  }
  localStorage.setItem("token",response.data.token);
  localStorage.setItem("user",JSON.stringify(response.data.user));
  navigate("/dashboard");
}catch(err){
  if (axios.isAxiosError(err)) {
    setError(
      err.response?.data?.message ||
        "There is something wrong please try again",
    );
  } else {
    setError("Server error");
  }
}
}
  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Start tracking your job applications </p>
        {error &&<div className="font_red">{error}</div>}
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Your name "onChange={handlechange} required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="your.email@example.com"onChange={handlechange} required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="••••••••"onChange={handlechange} required />
        <label htmlFor="confirmPassword">Confirm Password </label>
        <input id="confirmPassword" type="password" placeholder="••••••••" onChange={handlechange}required />
        <button type="submit">Register</button>
        <p>Already have an account?</p>
      </form>
      <button onClick={()=>{
        navigate("/login");
      }}>Login here</button>
    </div>
  );
}
