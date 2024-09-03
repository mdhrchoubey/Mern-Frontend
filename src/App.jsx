import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import SignupForm from './Login/MainRegister'
import Mainlogin from './Login/MainLogin'
import StudentDashboard from './Component/StudentDash'
import TeacherDash from './Component/TeacherDash'
import AdminDash from './AdminDash'
import ForgetPassword from './Login/ForgetPassword'
import ForgetAdmin from './Login/ForgetAdmin'
// import MainHeadr from './MainHeader'
// import Header from './Header'

const App=()=> {


  return (
    
    <>
    {/* <MainHeadr/> */}
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Landing/>}>
      <Route index element={<Landing/>}/>
      </Route>
      <Route path="login" element={<Mainlogin/>}/>
      <Route path='signup' element={<SignupForm/>}/>
      <Route path='studentDash' element={<StudentDashboard/>}/>
      <Route path='teacherDash' element={<TeacherDash/>}/>
      <Route path='adminDash' element={<AdminDash/>}/>
      <Route path='forgetpasswordAdmin' element={<ForgetAdmin/>}/>
      
      <Route path='forgetpassword' element={<ForgetPassword/>}/>
    </Routes>
    </BrowserRouter>
    {/* <Header/> */}
   

    </>
  )
}

export default App
