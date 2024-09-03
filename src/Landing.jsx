import { useEffect,useState } from "react"
import Footer from "./Component/Footer"
import StudentDashboard from "./Component/StudentDash"
import EnquiryForm from "./Enquiry"
import Mainlogin from "./Login/MainLogin"
import MainHeadr from "./MainHeader"
import MiddelPart from "./MiddelPart"
import SecondPart from "./SecondComponent"
import Modal from "./Model"
import './index.css'


const Landing=()=>{
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      // Show the modal when the component mounts
      setShowModal(true);
    }, []);
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
    return(
        <>
        <div >
        <Modal show={showModal} handleClose={handleCloseModal}>
        <EnquiryForm />
      </Modal>
        </div>

        <MainHeadr/>
        <hr/>
        
        <MiddelPart/>
        <hr/>
        < SecondPart/>
        <hr/>
        <Footer/>
        

        {/* <Mainlogin/> */}

        

        
        </>
    )
}
export default Landing