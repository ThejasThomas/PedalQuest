
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserSignup from './components/user/signup'
import OTPVerification from './components/user/userOtp'
import UserHome from './components/user/home'
import ProductDetail from './components/user/productOverview'
import UserLogin from './components/user/login'
import AdminLogin from './components/admin/adminLogin'
import AdminDashboard from './components/admin/dashboard'
function App() {

  return (
    <>
      <BrowserRouter>
      
      <Routes>
       
            
      <Route path='/' element={<UserSignup/>}/>
      <Route path='/otp' element ={<OTPVerification/>} />
      <Route path='/home' element={<UserHome/>}/>
      <Route path='/product' element={<ProductDetail/>} />
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/admin' element={<AdminLogin/>}/>
      <Route path='/dashboard' element={<AdminDashboard/>}/>
      

      </Routes>
     
      </BrowserRouter>
    </>
  )
}

export default App
