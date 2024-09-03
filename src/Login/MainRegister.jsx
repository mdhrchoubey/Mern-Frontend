import { useState } from 'react';
import '../App.css'
import { Link } from "react-router-dom";
import axios from 'axios';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import Footer from '../Component/Footer';

const SignupForm = () => {

    const navigate = useNavigate();
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://mern-backend-zwld.vercel.app/user/signup", formData)
      .then((response) => {
        console.log(response.data);
        setFormData({
          email: "",
          name: "",
        //   standard: "",
          role: "",
          gender: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
      alert("User Registeration Done")
    // // Handle form submission
    // console.log(formData);
    navigate("/login")
  };

  return (
    <>
    <LoginHeader/>
    <hr/>
    <div className="signup-container">
      <div className="welcome-section">
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please login with your personal info</p>
        <button className="sign-in-btn"><Link style={{color:"whitesmoke"}} to="/login">Signin</Link></button>
      </div>
      <div className="form-section">
        <h2>Create Account</h2>
        <div className="social-buttons">
          <button>f</button>
          <button>G+</button>
          <button>in</button>
        </div>
        {/* <p>or use your email for registration</p> */}
        <form onSubmit={handleSubmit}>

          <label>
            Select Role
          </label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
          <button type="submit" className="sign-up-btn" >Register</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SignupForm;