import { Routes, Route } from 'react-router-dom';
import UserSignup from '../components/user/signup';
import OTPVerification from '../components/user/userOtp';
import UserHome from '../components/user/home';
import ProductDetail from '../components/user/productOverview';
import UserLogin from '../components/user/login';

function UserRoute() {
  return (
    <Routes>
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/otp" element={<OTPVerification />} />
      <Route path="/home" element={<UserHome />} />
      <Route path="/product" element={<ProductDetail />} />
    </Routes>
  );
}

export default UserRoute;
