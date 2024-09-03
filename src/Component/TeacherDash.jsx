import React, { useState, useEffect } from 'react';
import './TeacherDash.css';
import axios from 'axios';
import TeacherProfile from '../TeacherProfile';
import TeacherHeader from '../TeacherHeader';
import Footer from './Footer';
import ChangePasswordForm from './ChangePassword';

const userName=window.localStorage.getItem("name");


const TeacherDash = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [teacherList, setTeacherList]=useState([])
  const[taskData,setTaskData]=useState([]); 
  const [refresh, setRefresh] = useState(false);

  const [replyModal, setReplyModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedQuery, setSelectedQuery] = useState({});

  const handleReply = (query) => {
    setSelectedQuery(query);
    setReplyText(); // Pre-fill with existing reply if any
    setReplyModal(true);
  };


  const handleReplySubmit = async () => {
    try {
      const newStatus = selectedQuery.status === 'pending' ? 'completed' : 'pending';
      const replyData = {
        queryId: selectedQuery._id,
        reply: replyText,
        status: newStatus
      };
      
      const response = await axios.put("https://mern-backend-zwld.vercel.app/query/reply", replyData);
      if (response.data.status === true) {
        setQuery(query.map(q => q._id === selectedQuery._id ? { ...q, reply: replyText, status: newStatus } : q));
      }
      
      setReplyModal(false);
      setReplyText("");
      displayQuery();
    } catch (error) {
      console.error(error);
    }
  };




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

      // const handleToggleStatus = async (id, status) => {
      //   try {
      //     const newStatus = status === 'pending' ? 'completed': 'pending';
      //     const updatedTodo = await axios.put(`https://mern-backend-zwld.vercel.app/query/Display/${id}`, { status: newStatus });
      //     setTaskData(taskData.map(todo => (todo._id === id ? updatedTodo.data : todo)));
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };

      const handleClick = () => {
        setRefresh(!refresh);
      };
      
      useEffect(() => {
        displayQuery();
      }, [refresh]);




      

  return (
    <>
    <TeacherHeader/>
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
            <li 
              className={activeTab === 'results' ? 'active' : ''}
              onClick={() => setActiveTab('results')}
            >
              <i className="icon results-icon"></i>
              <span>Results</span>
            </li>
            <li 
              className={activeTab === 'Query' ? 'active' : ''}
              onClick={() => setActiveTab('Query')}
            >
              <i className="icon query-icon"></i>
              <span>Query</span>
            </li>
            <li 
              className={activeTab === 'changePassword' ? 'active' : ''}
              onClick={() => setActiveTab('changePassword')}
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
            
            
            <TeacherProfile/>
          </div>
        )}
        {activeTab === 'results' && (
          <div className="results-content">
            <h2>Academic Results</h2>
            {/* Add results content here */}
          </div>
        )}
        {activeTab === 'Query' && (
          <div className="Query-content">
            <div style={{display:'flex', justifyContent:"space-around", width:"48%"}} >
            <h2>Query Update</h2>
            <h4 ><td className="table-cell" style={{border:"none", }}>
          <button onClick={handleClick} style={{marginLeft:"60px",marginBottom:"10px"}}  className="refresh-button">
            Refresh
          </button>
        </td></h4>
            </div>
            <table className="table" style={{textAlign:"center"}}>
  <thead>
    <tr>
      <th className="table-header">Message</th>
      <th className="table-header">Sender</th>
      <th className="table-header">Ans</th>
      
      <th className="table-header">Pending/Completed</th>
      <th className="table-header">Action</th>
      {/* <th className="table-header">Status</th> */}
      
    </tr>
  </thead>
  <tbody>
    {query.map((key) => (
      <tr key={key._id} className="table-row">
        <td className="table-cell">{key.message}</td>
        <td className="table-cell">{key.sender}</td>
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
         <td className="table-cell">
  <button className="reply-button" onClick={() => handleReply(key,key._id, key.status)}>
    Reply
  </button>
</td>
        {/* <td className="table-cell">
          <button
            onClick={() => handleToggleStatus(key._id, key.status)}
            className="status-button"
            style={{ "--clr": "#00ad54" }}
          >
            <span className="button-decor"></span>
            <div className="button-content">
              <div className="button__icon">
                <i
                  className="fa-regular fa-circle-check"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
              <span className="button__text">Status</span>
            </div>
          </button>
        </td> */}

        
      </tr>
    ))}
  </tbody>
</table>
          </div>
          
        )}


        
      </main>
      {replyModal && (
    <div className="reply-modal">
      <h2>Reply to Query</h2>
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Type your reply here..."
      />
      <button className="reply-submit" onClick={() => handleReplySubmit(selectedQuery._id, selectedQuery.status)}>
        Submit Reply
      </button>
    </div>
  )}{replyModal && (
    <div className="modal-overlay">
      <div className="reply-modal">
        <h2>Reply to Query</h2>
        <p><strong>Query:</strong> {selectedQuery.message}</p>
        <p><strong>Sender:</strong> {selectedQuery.sender}</p>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply here..."
        />
        <div className="modal-buttons">
          <button className="reply-submit" onClick={handleReplySubmit}>
            Submit Reply
          </button>
          <button className="reply-cancel" onClick={() => setReplyModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
  {activeTab === 'changePassword' && (
  <>
  <div className="change-password-modal">
  <ChangePasswordForm/>
  </div>
  
  </>
)}

    </div>
    <Footer/>
    </>
  );
};

export default TeacherDash;