import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <form>
        <h2>Job Tracker</h2>
        <p>Track you job applications</p>
        <label>Email</label>
        <input
          type="email"
          title="Email"
          placeholder="Your.email@example.com"
        />
        <label>Password</label>
        <input type="password" title="Password" placeholder="••••••••" />
        <button type="submit">Login</button>
        <p>Don't have an account?</p>
      </form>
      <button
        onClick={() => {
          return navigate("./Register");
        }}
      >
        Register here{" "}
      </button>
    </div>
  );
}
