import React, { useState } from 'react';
// import { YouTube } from 'lucide-react';
import "./MainHeader.css"
import img from "./image/logo.png"
import MiddelPart from './MiddelPart';
import { Link } from 'react-router-dom';

const MainHeadr = () => {
  const [fontSize, setFontSize] = useState('normal');

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  return (
    <>
    <header className={`rgpv-header font-${fontSize}`}>
      <div className="main-header">
        <img src={img} alt="RGPV Logo" className="rgpv-logo" />
        <div className="university-title">
          <h1>APS</h1>
          <h2>Aryans Public Higher Secondry School</h2>
          <p>Aiims , Saket Nagar, Bhopal (M.P.)</p>
          <p>An ISO 9001:2015 Certified Organization</p>
        </div>
      </div>
      
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/">
            Home</Link></li>
          {/* <li><a href="#">The University</a></li> */}

          <li className="dropdown">
            <a href="#" className="dropdown-toggle">About APS</a>
            <ul className="dropdown-menu">
              <li><a href="#">Contact</a></li>
              <li><a href="#">Establish</a></li>
              <li><a href="#">Teacher</a></li>
              <li><a href="#">Infrastructure</a></li>
            </ul>
          </li>

          {/* <li><a href="#">Academics</a></li> */}
          {/* <li><a href="#">Admissions</a></li> */}
          <li className="dropdown">
            <a href="#" className="dropdown-toggle">Academics</a>
            <ul className="dropdown-menu">
              <li><a href="#">Admission</a></li>
              <li><a href="#">Student Enrollment</a></li>
              <li><a href="#">Result</a></li>
              <li><a href="#">Fee Structure</a></li>
            </ul>
          </li>

          <li><a href="#">Student's Life</a></li>
          {/* <li><a href="#">Governance</a></li> */}
          <li className="dropdown">
            <a href="#" className="dropdown-toggle">Training</a>
            <ul className="dropdown-menu">
              <li><a href="#">Skill India</a></li>
              <li><a href="#">InternShip</a></li>
              <li><a href="#">Extra Curricular</a></li>
              <li><a href="#">Top Students</a></li>
            </ul>
          </li>
          <li>
            <Link to="login">
            Login/Signup
            </Link>
            </li>
        </ul>
      </nav>
    </header>
    
    </>
  );
};

export default MainHeadr;