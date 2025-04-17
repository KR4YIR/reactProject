import React, { useState } from "react";
import axios from "axios";
import './session.css'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        name: "",
        lastname: "",
    });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleLogin = () =>{
    navigate('/SignIn')
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      const response = await axios.post(
        "http://localhost:5017/api/Users/SignUp",
        formData
      );
      
      
      toast.success(`Sign-Up Successful! Confirmation code sent to ${formData.email}.`, {
        onClose: () => {
          // Navigate after the toast disappears
          navigate('/SignIn');
        }
      });
      setSuccess(true);
      setError("");
    } catch (err) {
      console.error("Error during sign-up:", err);
      toast.error("Sign-up failed. Please try again.");
      setError("Sign-up failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
  <div className="background">
    <div className="form-container">
      <h1>Sign Up</h1>
      {success && <p>Sign-up successful!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        
          <div className="names">
            <label>
            First Name:
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
            />
            </label>
            <br />
          </div>
          <div className="names">
            <label>
            Last Name:
            <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                required
            />
            </label>
          </div>
        <br />
        
        <label>
          Username:
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
          />
        </label>
        
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        
        
        <button type="submit">Sign Up</button>
        <br />
        <p className='navigate'>Already have an account?
           <a className='navigate' onClick={handleLogin}> SignIn</a>
        </p>
      </form>
        
    </div>
    <ToastContainer position="top-right" autoClose={3000} />

  </div>
  );
};

export default SignUp;