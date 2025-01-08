import { Routes, Route } from "react-router-dom";
import UserSignup from "../pages/user/signup/signup";
import OTPVerification from '../pages/user/otpverification/otpVerification';
import UserHome from "../pages/user/home/home"
import ProductDetail from "../pages/user/productOverview/productOverview";
import UserLogin from "../pages/user/login/login";
import Store from "../pages/user/store/Store";

function UserRoute() {
  return (
    <Routes>
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/otp" element={<OTPVerification />} />
      <Route path="/home" element={<UserHome />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/store" element={<Store />} />
    </Routes>
  );
}

export default UserRoute;
