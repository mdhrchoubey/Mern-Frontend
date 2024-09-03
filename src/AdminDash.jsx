import React, { useState, useEffect } from 'react';
import './AdminDash.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Adduser from './Adduser';

// import { useNavigate } from 'react-router-dom';

import Header from './Header';
import Footer from './Component/Footer';
import AdminPassword from './AdminPasswordReset';
// import ForgetPassword from './Login/ForgetPassword';

const userName=window.localStorage.getItem("name");


const AdminDash = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [teacherList, setTeacherList]=useState([])
  const [displayTeacher, setDisplayTeacher]=useState([]);
  // const[taskData,setTaskData]=useState([]); 
  const [refresh, setRefresh] = useState(false);
  const nav = useNavigate()




  const Display=()=>{
    let url="https://mern-backend-zwld.vercel.app/user/displayStudent";
    axios.get(url).then((res)=>{
        console.log(res.data)
        setTeacherList(res.data)
    })
    
};
useEffect(()=>{
    Display()
},[])


const DisplayTeacher=()=>{
    let url="https://mern-backend-zwld.vercel.app/user/displayTeacher";
    axios.get(url).then((res)=>{
        console.log(res.data)
        setDisplayTeacher(res.data)
    })
    
};
useEffect(()=>{
    DisplayTeacher()
},[])

const [query, setQuery]=useState([]);

    const displayQuery=()=>{
        let url="https://mern-backend-zwld.vercel.app/query/displayQuery";
        axios.get(url).then((res)=>{
            console.log(res.data)
            setQuery(res.data)
        })
    }
    useEffect(() => {
        displayQuery();
      }, []);


      const handleClick = () => {
        setRefresh(!refresh);
      };
      
      useEffect(() => {
        displayQuery();
      }, [refresh]);


      const PopupWindow = ({ trigger, content, title }) => {
        const [isOpen, setIsOpen] = useState(false);
      
        const togglePopup = () => setIsOpen(!isOpen);
      
        return (
          <>
            {React.cloneElement(trigger, { onClick: togglePopup })}
            
            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-11/12 md:max-w-md mx-auto">
                  <div className="border-b px-4 py-2 flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    {/* <button onClick={togglePopup} className="text-black close-btn"> */}
                      {/* <X size={24} /> */}
                    {/* </button> */}
                  </div>
                  <div className="p-4">
                    {content}
                  </div>
                </div>
              </div>
            )}
          </>
        );
      };

      const [resetModel, setResetModel] = useState(false);
      const [newPassword, setNewPassword] = useState("");
      const [selectedUser, setSelectedUser] = useState({});
      const [message, setMessage] = useState('');
      const [error, setError] = useState('');

    
      const handleReply = (query) => {
        console.log(query)
        setSelectedUser(query);
        setNewPassword(); // 
        setResetModel(true);
      };


      const handleResetPassword = async () => {
        console.log(selectedUser._id)
        const resetdata={
            newPassword,
            passid:selectedUser._id
        }
        try {
          const response = await axios.post('https://mern-backend-zwld.vercel.app/user/reset-password',resetdata );
          alert("Password reset done")
          nav("/adminDash")
          const data = await response.json();
          
          if (response.ok) {
            
            console.log(data.message)
            setMessage(data.message);
            setError('');
          } else {
            setError(data.error);
            setMessage('');
          }
        } catch (err) {
          setError('An error occurred. Please try again.');
          setMessage('');
        }
      };









  return (
    <>
    <Header/>
    <div className="dashboard-container">
      <sidebar className="sidebar">
        {/* <div className="logo">Admin Dashboard</div> */}
        <nav>
          <ul>
            <li 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <i className="icon profile-icon">👤</i>
              <span>Teacher List</span>
            </li>
            <li 
              className={activeTab === 'results' ? 'active' : ''}
              onClick={() => setActiveTab('results')}
            >
              <i className="icon results-icon"></i>
              <span>Student List</span>
            </li>
            <li 
              className={activeTab === 'Query' ? 'active' : ''}
              onClick={() => setActiveTab('Query')}
            >
              <i className="icon query-icon"></i>
              <span>Query</span>
            </li>
           
            <li 
              className={activeTab === 'adduser' ? 'active' : ''}
              onClick={() => setActiveTab('adduser')}
            >
              <i className="icon query-icon"></i>
              <span>Adduser</span>
            </li>
            {/* <li 
              className={activeTab === 'password' ? 'active' : ''}
              onClick={() => setActiveTab('password')}
            >
              <i className="icon query-icon">📊</i>
              <span>Password</span>
            </li> */}
            <li>
            {/* <button onClick={Logout}>Logout</button> */}
            </li>
          </ul>
        </nav>
      </sidebar>
      <main className="main-content">
        {activeTab === 'profile' && (
          <div className="profile-content">
            <h2 style={{textAlign:"center", color:"red"}}>Teacher List</h2>
            <hr/>
            {/* Add profile content here */}
            {/* {userName} */}
          
            {/* <hr/> */}
            <div>
              {/* <h2 style={{textAlign:"center"}}>
            Teacher List
            </h2> */}
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Reset Password</th>
                    </tr>
                </thead>
                <tbody>
                    {displayTeacher.map((key)=>(
                        <tr key={key.id}>
                            <td>{key.name}</td>
                            <td>{key.email}</td>
                            <td>{key.gender}</td>
                            <td>
                            <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Popup Window Example</h1> */}
      <button className="popup" onClick={() => handleReply(key,key._id, key.status)}>
          Reset
        </button>  
      
    </div>
                              
                              {/* <button onClick={reset}>Reset Password</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
          </div>
        )}
        {activeTab === 'results' && (
          <div className="results-content">
            {/* <h2>Academic Results</h2> */}
            <div> <h2 style={{textAlign:"center", color:"red"}}>
           Student List
           </h2>
           <hr/>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Reset Password</th>
                    </tr>
                </thead>
                <tbody>
                    {teacherList.map((key)=>(
                        <tr key={key.id}>
                            <td>{key.name}</td>
                            <td>{key.email}</td>
                            <td>{key.gender}</td>
                            <td>
                            
        <button className="popup" onClick={() => handleReply(key,key._id, key.status)}>
          Reset
        </button>  
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           </div>
          </div>
        )}
        {activeTab === 'Query' && (<>

<div className="Query_Update" >
<div style={{display:'flex', justifyContent:"space-around", width:"48%"}} >
<h2>Query_Update</h2>
<h4 ><td className="table-cell" style={{border:"none"}}>
<button onClick={handleClick} className="refresh-button">
Refresh
</button>
</td></h4>
</div>

<hr/>



<table className="table">
<thead>
<tr>
<th className="table-header"> Student Name</th>
<th className="table-header">Message</th>
<th className="table-header">Action</th>
<th className="table-header">Pending/Completed</th>

</tr>
</thead>
<tbody>
{query.map((key) => (
<tr key={key._id} className="table-row">

<td className="table-cell">{key.sender}</td>
<td className="table-cell">{key.message}</td>
<td className="table-cell">{key.reply}</td>

{key.status === "pending" && (
<td className="table-cell">
<a>
<div
className="status pending"
style={{ color: "orangered", fontWeight: "600" }}
>
{key.status}
</div>
</a>
</td>
)}
{key.status === "completed" && (
<td className="table-cell">
<a>
<div
className="status completed"
style={{ color: "#4CBB17" }}
>
{key.status}
</div>
</a>
</td>
)}


</tr>
))}
</tbody>
</table>

</div>
</>
          
        )}
        {activeTab === 'adduser' && (
          <div className="results-content">
            <h2>Add User</h2>
            {/* Add results content here */}
            <Adduser/>
          </div>
        )}
{resetModel && (
    <div className="reply-modal">
      {/* <h2>Reply to Query</h2> */}
      <input
        value={newPassword}
        type='password'
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Type your reply here..."
      />
      <button className="reply-submit" onClick={() => handleResetPassword(selectedUser._id,)}>
        Reset Password
      </button>
    </div>
  )}
        
        
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default AdminDash;