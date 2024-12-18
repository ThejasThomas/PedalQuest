import { useState } from 'react'
import { Eye, EyeOff, User } from 'lucide-react'
import { Button } from "../UI/button"
import { Input } from "../UI/input"
import { toast } from 'react-toastify'
import loginImg from '../../assets/images/loginImg.jpg'
import logo from '../../assets/images/Logo.png'
import googleLogo from '../../assets/images/Google_logo.png'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../api/axiosInstance'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  // Form validation function
  const validateForm = () => {
    const newErrors = {}

    const trimmedEmail = formData.email.trim()
    const trimmedPassword = formData.password.trim()

    if (!trimmedEmail) {
      newErrors.email = 'Email should not be empty'
    }
    if (!trimmedPassword) {
      newErrors.password = 'Password should not be empty.'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const response = await axiosInstance.post('/user/login', formData)
      if (response.data.success) {
        toast.success('Login successful')
        navigate('/home')
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data?.message || error.message)
      toast.error(error.response?.data?.message || 'Login failed.Please try again.')
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSignup = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
        <div className="w-1/3 relative hidden lg:block">
          <img
            src={loginImg}
            alt="Cyclist on forest road"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-2/3 p-8 flex flex-col justify-center bg-black text-white">
          <div className="flex justify-center mb-8">
            <img
              src={logo}
              alt="Company logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          <h1 className="text-center text-4xl font-bold mb-12">Login</h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border-[#30363d] text-white pl-12 h-12"
                required
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent border-[#30363d] text-white pr-12 pl-12 h-12"
                required
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="text-right">
              <a href="/forgot-password" className="text-white hover:underline text-sm">
                Forgot Password?
              </a>
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-medium">
              Login
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-black">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-md p-3 hover:bg-gray-100 transition-colors"
            >
              <img src={googleLogo} alt="Google logo" width={20} height={20} />
              Continue with Google
            </button>

            <div className="text-center text-gray-400">
              Don&apos;t have an account?{' '}
              <a onClick={handleSignup} href="/signup" className="text-red-600 hover:underline">
                Sign up now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
