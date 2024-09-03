import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from "./image/logo.png"
const userName=window.localStorage.getItem("name");
import { useEffect, useState } from 'react';
import axios from 'axios';



const Header = ({ lastLogin }) => {
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState('');
  // const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState();
    
  const navigate = useNavigate();


  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`https://mern-backend-zwld.vercel.app/user/profileheader/${userName}`);
      setProfile(response.data);
      window.localStorage.setItem("ImagePath", response.data.imagePath);
      if (response.data.imagePath) {
        console.log(response.data.imagePath)
        setPreviewImage(`https://mern-backend-zwld.vercel.app/${response.data.imagePath}`);
      }
      console.log(response.data.imagePath)
    } catch (error) {
      setMessage('Error fetching user profile');
    }
  };

  useEffect(() => {
    if (userName) {
      fetchUserProfile();
    } else {
      setMessage('No user logged in');
    }
  }, []);


  const Logout=()=>{
    window.localStorage.clear();
    navigate("/")
  }
  return (
    <header className="university-header">
      <div className="top-header">
        <img src={img} alt="University Logo" className="university-logo" />
        <div className="university-info">
          <h1>Aryans Public Higher Secondry School</h1>
          <p>Aiims , Saket Nagar, Bhopal (M.P.)</p>
          <p className="university-subtitle">(Affilated by MP Government.)</p>
        </div>
      </div>
      
      <div className="user-info-bar">
        <div className="user-details">
          <span className="welcome-text">Welcome :</span>
          <span className="student-name">{userName}</span>
          {/* <span className="role">Role: [{role}]</span> */}
          {/* <span className="department">Department: [{department}]</span> */}
        </div>
        <div className="login-info">
          {/* <span>Last Login:{lastLogin}</span> */}
          {/* <button className="logout-button">Logout</button> */}

          {previewImage && (
          <div className="mb-4">
            <img src={previewImage} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full" />
          </div>
        )}


          <button className="logout-button" onClick={Logout}>Logout</button>
        </div>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li><a href="#">STUDENT SERVICES</a></li>
          <li><a href="#">HELP DESK/Grievance System</a></li>
          <li><a href="#">TRAINING & PLACEMENT</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;