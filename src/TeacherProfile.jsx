import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ForgetPassword from './Login/ForgetPassword';
import ChangePasswordForm from './Component/ChangePassword';


const TeacherProfile = () => {
  const userName = window.localStorage.getItem("name");
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [newPassword, setNewPassword] = useState('');


  useEffect(() => {
    if (userName) {
      fetchUserProfile();
    } else {
      setMessage('No user logged in');
    }
  }, [userName]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`https://mern-backend-zwld.vercel.app/user/profile/${userName}`);
      setProfile(response.data);
      // setMessage('Profile fetched successfully');
      window.localStorage.setItem("ImagePath", response.data.imagePath)
      if (response.data.imagePath) {
        setPreviewImage(`https://mern-backend-zwld.vercel.app/${response.data.imagePath}`);
      }
    } catch (error) {
      setMessage('Error fetching user profile');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`https://mern-backend-zwld.vercel.app/user/profileupdate/${userName}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(response.data);
      setMessage('Profile updated successfully');
      alert("Profile updated successfully");
      window.localStorage.setItem("name", response.data.name);
      fetchUserProfile(); // Refresh the profile data
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

 

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={profile.name || ''}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={profile.email || ''}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Profile Picture:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        {previewImage && (
          <div className="mb-4">
            {/* <img src={previewImage} alt="Profile" className="w-32 h-32 object-cover rounded-full" /> */}
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Profile
        </button>
      </form>
<hr/>
{/* <ForgetPassword/> */}
{/* <ChangePasswordForm/> */}


    </div>
  );
};

export default TeacherProfile;






// const handleReplySubmit = async (id, status) => {

//   try {
//     const newStatus = status === 'pending' ? 'completed': 'pending';
//     const replyData = {
//       queryId: selectedQuery._id,
//       reply: replyText,
//     };
//     console.log(replyData)
//     const response = await axios.put("https://mern-backend-zwld.vercel.app/query/reply", replyData, );
    // setTaskData(taskData.map(statusQuery=>(statusQuery.replyData.queryId? response.data.status : statusQuery)))
//     console.log(response.data);
//     setReplyModal(false);
//     setReplyText("");
//     displayQuery();
//   } catch (error) {
//     console.error(error);
//   }