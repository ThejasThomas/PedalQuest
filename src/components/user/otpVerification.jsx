import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/images/Logo.png";
import { axiosInstance } from "../../api/axiosInstance";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromSignup = location.state?.email || ""; // Get email from state
  const [email, setEmail] = useState(emailFromSignup); // Set email state
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(20); // 20 seconds timer
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleOTPChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");

    try {
      setError("");
      setMessage("");

      const response = await axios.post("http://localhost:3000/user/verifyOtp", {
        email,
        otp: otpCode,
      });

      if (response.data.success) {
        setMessage("OTP Verified Successfully");
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP Verification Failed");
    }
  };

  const handleResendOTP = async () => {
    try {
      setError("");
      setMessage("");

      const response = await axiosInstance.post("/user/resendOtp", {
        email,
      });

      if (response.data.success) {
        setMessage("New OTP sent successfully.");
        setOtp(new Array(6).fill(""));
        setTimer(20);
        setIsActive(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-white">
      <div className="absolute top-5 left-5">
        <img src={logo} alt="Logo" className="w-30 h-auto" />
      </div>

      <div className="max-w-md w-full text-center mt-20">
        <h2 className="text-2xl font-semibold text-black mb-4">Please Verify Account</h2>
        <p className="text-base text-gray-600 mb-10 px-4 leading-relaxed">
          Enter the six-digit code we sent to your email address ({email}) to verify your new PedalQuest Account.
        </p>

        <form onSubmit={handleVerifyOTP} className="flex flex-col items-center gap-6">
          <div className="flex gap-3 justify-center mb-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleOTPChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-14 h-14 border border-gray-300 rounded-lg text-2xl text-center bg-gray-100 focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
              />
            ))}
          </div>

          {isActive ? (
            <div className="text-lg text-black mb-4">{formatTime(timer)}</div>
          ) : (
            <button
              type="button"
              className="py-2 px-6 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition duration-300"
              onClick={handleResendOTP}
            >
              Resend OTP
            </button>
          )}

          {isActive && (
            <button
              type="submit"
              className="w-full max-w-sm py-4 bg-black text-white rounded-full text-base font-medium hover:bg-gray-800 transition duration-300"
            >
              Verify & Continue
            </button>
          )}
        </form>

        {error && <div className="text-red-500 mt-4">{error}</div>}
        {message && <div className="text-green-500 mt-4">{message}</div>}
      </div>
    </div>
  );
};

export default OTPVerification;
