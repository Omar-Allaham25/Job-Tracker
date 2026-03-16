import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div className="register-container">
      <form>
        <h2>Create Account</h2>
        <p>Start tracking your job applications </p>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" required />
        <label htmlFor="confirmPassword">Confirm Password </label>
        <input id="confirmPassword" type="password" required />
        <button type="submit">Register</button>
        <p>Already have an account?</p>
      </form>
      <button>Login here</button>
    </div>
  );
}
