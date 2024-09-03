import React, { useState } from 'react';
import "./Enquiry.css"

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    mobileNo: '',
    address: '',
    schoolBranch: '',
    enquiry: '',
    captcha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="enquiry-form-container">
      <form onSubmit={handleSubmit} className="enquiry-form">
        <h2>Admission Enquiry 2024-25</h2>
        
        <div className="form-group">
          <label>Student Name *</label>
          <input 
            type="text" 
            name="studentName" 
            value={formData.studentName} 
            onChange={handleChange} 
            placeholder="Enter Your Name" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Email ID *</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Enter Valid Email-Id" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Mobile No *</label>
          <input 
            type="tel" 
            name="mobileNo" 
            value={formData.mobileNo} 
            onChange={handleChange} 
            placeholder="Enter Your Mobile No" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Class *</label>
          <select name="class" onChange={handleChange} required>
            <option value="">--Select Class--</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            {/* Add more classes as needed */}
          </select>
        </div>

        <div className="form-group">
          <label>Current Address *</label>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            placeholder="Enter Your Current Address" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>School Branch *</label>
          <div className="branch-selection">
            {['Saket Nagar', 'Gandhi Nagar', 'Rohit Nagar', 'Ratibad', 'Katara Extn.', 'Dwarka Dham'].map(branch => (
              <button 
                type="button" 
                className={`branch-btn ${formData.schoolBranch === branch ? 'active' : ''}`} 
                onClick={() => setFormData({ ...formData, schoolBranch: branch })}
                key={branch}
              >
                {branch}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Enquiry *</label>
          <textarea 
            name="enquiry" 
            value={formData.enquiry} 
            onChange={handleChange} 
            placeholder="Write something here.." 
            required 
          />
        </div>
        
        <div className="form-group captcha-group">
          <img src="/api/captcha" alt="Captcha" />
          <input 
            type="text" 
            name="captcha" 
            value={formData.captcha} 
            onChange={handleChange} 
            placeholder="Enter captcha code" 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">SEND</button>
      </form>
    </div>
  );
};

export default EnquiryForm;
