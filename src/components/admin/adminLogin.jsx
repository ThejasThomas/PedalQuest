'use client'

import { useState } from 'react'
import { Eye, EyeOff, User } from 'lucide-react'
import { Button } from "../../components/UI/button"
import { Input } from "../../components/UI/input"
import adminLoginImg from '../../../src/assets/images/adminLogin.jpg'
import logo from '../../assets/images/Logo.png'

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempted with:', formData)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={adminLoginImg}
          alt="Mountain biker in action"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-black p-6 lg:p-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-3xl lg:text-4xl font-bold">
            Admin Login
          </h1>
          <img
            src={logo}
            alt="Company logo"
            className="object-contain w-12 h-12 lg:w-16 lg:h-16"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col justify-center">
          <div className="relative">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border-[#30363d] text-white pl-12 h-12 w-full"
              required
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent border-[#30363d] text-white pr-12 pl-12 h-12 w-full"
              required
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-medium mt-4"
          >
            Login
          </Button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          © 2023 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  )
}

