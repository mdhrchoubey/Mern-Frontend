import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import Header from '../Header';
import Footer from './Footer';
import ChangePasswordForm from './ChangePassword';

const userName=window.localStorage.getItem("name");
// const image=window.localStorage.getItem("ImagePath")


const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [teacherList, setTeacherList]=useState([])
  const [query, setQuery]=useState([]);
  const[taskData,setTaskData]=useState([]); 
  const [refresh, setRefresh] = useState(false);
  // const [previewImage, setPreviewImage]=useState(null)



  const Display=()=>{
    let url="https://mern-backend-zwld.vercel.app/user/displayTeacher";
    axios.get(url).then((res)=>{
        console.log(res.data)
        setTeacherList(res.data)
    })
    
};
useEffect(()=>{
    Display()
},[])

const sendMessage = (teacherId, message) => {
    const url = "https://mern-backend-zwld.vercel.app/query/sendMessage";
    const data = {
      sender: userName,
      receiver: teacherId,
      message: message
    };
    axios.post(url, data)
      .then((res) => {
        console.log(res.data);
        // handle success
        alert("Query Send")
        
      })
      
      .catch((err) => {
        console.error(err);
        // handle error
      });
      
      
  };

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

  const handleToggleStatus = async (id, status) => {
    try {
      const newStatus = status === 'pending' ? 'completed': 'pending';
      const updatedTodo = await axios.put(`https://mern-backend-zwld.vercel.app/query/Display/${id}`, { status: newStatus });
      setTaskData(taskData.map(todo => (todo._id === id ? updatedTodo.data : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
  setRefresh(!refresh);
};

useEffect(() => {
  displayQuery();
}, [refresh]);

const ans=query.map((key)=>{
  if(key.sender===userName){
    return(
      <>
      
        <tr>
          <th>{key.message}</th>
          <th>{key.sender}</th>
          <th>{key.status}</th>
        </tr>
       
      
      </>
    )
  }
 
})

  return (
    <>
    <Header/>
    <div className="dashboard-container">
      <sidebar className="sidebar">
        {/* <div className="logo">Student Dashboard</div> */}
        <nav>
          <ul>
            <li 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <i className="icon profile-icon">👤</i>
              <span>Profile</span>
            </li>
            {/* <li 
              className={activeTab === 'results' ? 'active' : ''}
              onClick={() => setActiveTab('results')}
            >
              <i className="icon results-icon"></i>
              <span>Results</span>
            </li> */}
            <li 
              className={activeTab === 'Query' ? 'active' : ''}
              onClick={() => setActiveTab('Query')}
            >
              <i className="icon query-icon"></i>
              <span>Query</span>
            </li>
            {/* <li 
              className={activeTab === 'Query_Update' ? 'active' : ''}
              onClick={() => setActiveTab('Query_Update')}
            >
              <i className="icon query-icon"></i>
              <span>Query Update</span>
            </li> */}
            <li 
              className={activeTab === 'ChangePassword' ? 'active' : ''}
              onClick={() => setActiveTab('ChangePassword')}
            >
              <i className="icon query-icon"></i>
              <span>Change Password</span>
            </li>
          </ul>
        </nav>
      </sidebar>
      <main className="main-content">
        {activeTab === 'profile' && (
          <div className="profile-content">
            <h2>Student Profile</h2>
            {/* Add profile content here */}
            {/* {image} */}
            {/* {ans} */}<br/>
            

            {userName}
            <hr/>
            <Profile/>
          </div>
        )}
        {activeTab === 'results' && (
          <div className="results-content">
            <h2>Academic Results</h2>
            {/* Add results content here */}
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
          <div className="Query-content">
            {/* <h2>Query</h2> */}
            <section>
            <select id="Display">
             <option value="">Select a Teacher</option>
                {teacherList.map((key) => (
                    
                    <option key={key._id} value={key._id}>
                {key.name} 
                ({key.role})
            </option>
         ))}
        </select>
        <div className="popup">
  
  <textarea style={{width:"300px", height:"100px"}}
    placeholder="Type your message here..."
  />
 
 <button onClick={() => sendMessage(document.getElementById("Display").value, document.querySelector("textarea").value)}>Send</button>
  {/* <button >Cancel</button> */}
</div>
    </section>
</div>
<hr/>
<table>
<tr className="table-row"> 
  <td className="table-cell"> Message</td>
  <td className="table-cell">Namer</td>
  <td className="table-cell">Status</td>
</tr>
{ans}
</table>
  </div>
          </>
          )}
       
        {activeTab === 'ChangePassword' && (
          <div className="results-content">
            <h2>Change Password</h2>
            <ChangePasswordForm/>
            {/* Add results content here */}
          </div>
        )}
        
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default StudentDashboard;





// {query.map((key)=>(
//   <tr key={key._id} className="table-row"> 
//   <td className="table-cell">{key.message}</td>
//   <td className="table-cell">{key.sender}</td>
//   <td className="table-cell">{key.ans}</td>
//   <td className="table-cell">{key.status}</td>
//   <td className="table-cell">
//     <a>
//       <div
//         className="status pending"
//         style={{ color: "orangered", fontWeight: "600" }}
//       >
//         {key.status}
//       </div>
//     </a>
//   </td>

// </tr>
// ))}



// {activeTab === 'Query_Update' && (
  
// )}





  // <tr key={key._id} className="table-row">
  // <td className="table-cell">{key.message}</td>
  // <td className="table-cell">{key.sender}</td>
  
  // {key.status === "pending" && (
  //   <td className="table-cell">
  //     <a>
  //       <div
  //         className="status pending"
  //         style={{ color: "orangered", fontWeight: "600" }}
  //       >
  //         {key.status}
  //       </div>
  //     </a>
  //   </td>
  // )}
  // {key.status === "completed" && (
  //   <td className="table-cell">
  //     <a>
  //       <div
  //         className="status completed"
  //         style={{ color: "#4CBB17" }}
  //       >
  //         {key.status}
  //       </div>
  //     </a>
  //   </td>
  // )}
  
  
  // </tr>
  // )