import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate=useNavigate();
  return (
 <div>
  <header>
    <h2>Job Tracker</h2>
    <button onClick={()=>{
      navigate("/login");
    }}>Login</button>
  </header>
  <div>

  </div>
  </div>);
}
