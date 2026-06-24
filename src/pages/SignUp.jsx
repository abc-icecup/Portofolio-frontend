import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin-signup.css";

import logo from "../assets/images/logo_my_porto.svg";

function SignUp() {

  const navigate = useNavigate();

  //HUBUNGKAN BACKEND
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  //Function handleSubmit (BACKEND)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/auth/register",
        {
          username,
          email,
          password,
        }
      );

      alert(response.data.message);

      // simpan token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // simpan user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // reset form
      setUsername("");
      setEmail("");
      setPassword("");

      // redirect dashboard
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Register gagal");
    }
  };  

  //FRONTEND
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-logo">
            <img src={logo} alt="Logo MyPorto" />
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-box">
            <h1>Welcome!!</h1>
            <p>Sign Up to start build your protofolio</p>

            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Sign Up</button>
            </form>

            <div className="auth-link">
              Already Have an account? <Link to="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;