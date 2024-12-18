import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import logo from "../../assets/images/Logo.png";
import signImg from '../../assets/images/signupImg.avif'

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, email, password, confirmPassword, phone } =
      formData;

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z\s]+$/.test(firstName.trim())) {
      newErrors.firstName = "Name can only contain letters";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z\s]+$/.test(lastName.trim())) {
      newErrors.lastName = "Name can only contain letters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@gmail\.com$/.test(email.trim())) {
      newErrors.email = "Email must be a valid Gmail address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password should not be empty.";
    } else if (password.length < 6) {
      newErrors.password = "Password should contain at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axiosInstance.post("/user/signup", formData);
      if (response.data.success) {
        alert("OTP sent successfully to your email.");
        navigate("/otp", { state: { email: formData.email } });
      } else {
        alert(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Failed to sign up.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url('../../../assets/images/signupImg.avif')` }}>
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>
      <div className="z-10 bg-white bg-opacity-95 rounded-2xl shadow-lg max-w-4xl w-11/12 flex overflow-hidden">
        <div className="hidden md:block w-1/2">
          <img
            src={signImg}
            alt="Cyclist"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-auto absolute top-4 right-4"
          />
          <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
            Create Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["firstName", "lastName", "email", "password", "confirmPassword", "phone"].map((field, index) => (
              <div key={index} className="flex flex-col">
                <input
                  type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors[field] && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors[field]}
                  </span>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
