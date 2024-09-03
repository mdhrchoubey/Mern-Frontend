import { useState, useEffect } from 'react';
import axios from 'axios';
const userName=window.localStorage.getItem("name");

const ProfilePicDisplay = () => {
  const [profilePic, setProfilePic] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfilePic();
  }, []);

  const fetchProfilePic = async () => {
      const response = await axios.get(`https://mern-backend-zwld.vercel.app/user/profile-pic/${userName}`);
      console.log(response)
  }


  return (
    <div className="profile-pic-display">

      {profilePic}
    </div>
  );
};

export default ProfilePicDisplay;