import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await API.post("/auth/register", { name, email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
    <h2>Signup</h2>
    <form onSubmit={handleSubmit} className='auth-form'>

        <input type='text' placeholder='Name' value={name} 
          onChange={(e) => setName(e.target.value)} required />
          <br/>
        <input type='email' placeholder='Email' value={email} 
          onChange={(e) => setEmail(e.target.value)} required />
          <br/>
        <input type='password' placeholder='Password' value={password}
          onChange={(e) => setPassword(e.target.value)} required />
          <br/>
        <button type='submit'>Signup</button>
    </form>
    </div>
    </div>
  )
}

export default Signup
