import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api/jobsApi";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   await loginUser(formData);
    //   navigate("/Dashboard");
    // } catch (error) { console.error(error) }

    if (formData.email && formData.password) {
      navigate("/Dashboard");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Job Tracker</h2>
        <p>Track your job applications</p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email" 
          type="email"
          placeholder="Your.email@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p>Don't have an account?</p>
      </form>

      <button type="button" onClick={() => navigate("/Register")}>
        Register here
      </button>
    </div>
  );
}
