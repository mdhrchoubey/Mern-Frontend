
import { Link } from "react-router-dom";
import img from "../image/logo.png"
// const userName=window.localStorage.getItem("name");
const LoginHeader = () => {
    



 
  return (
    <header className="university-header">
      <div className="top-header">
        <Link to="/">
        <img src={img} alt="University Logo" className="university-logo" />
        </Link>
        
        <div className="university-info">
          <h1>Aryans Public Higher Secondry School</h1>
          <p>Aiims , Saket Nagar, Bhopal (M.P.)</p>
          <p className="university-subtitle">(Affilated by MP Government.)</p>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;