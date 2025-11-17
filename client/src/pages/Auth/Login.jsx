import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import API from "../../services/api";
import "./Auth.css";

const Login = () => {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const data = await API.post("/auth/login", { email, password });
        login(data);
        navigate("/")
    }catch(error){
        alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">

            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type='submit'>Login</button>
          </form>
      </div>
    </div>
  )
}



export default Login
