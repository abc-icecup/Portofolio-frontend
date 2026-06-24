import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin-signup.css";

import logo from "../assets/images/logo_my_porto.svg";

function SignIn() {
  
  const navigate = useNavigate();
  
  //HUBUNGKAN BACKEND
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Function handleSubmit (BACKEND)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        }
      );

      // ambil token JWT
      const token = response.data.token;

      // simpan token ke localStorage
      localStorage.setItem("token", token);

      // simpan data user jika ada
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login berhasil");

      console.log(response.data);

      // redirect ke dashboard
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login gagal");
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
            <h1>Welcome Back!!</h1>
            <p>Sign In to build your protofolio</p>

            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Sign In</button>
            </form>

            <div className="auth-link">
              Don’t Have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;