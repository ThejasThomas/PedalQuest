import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaChevronDown } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { axiosInstance } from '../../../api/axiosInstance';
import logo from '../../../assets/images/Logo.png'
import bannerImg from '../../../assets/images/Homepage.jpg'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get('/admin/category');
      
      if (data.success) {
        setCategories(data.categories);
      } else {
        setError(data.message || 'Failed to fetch categories');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full">
      <nav className="bg-black text-white border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-8 h-8" />
          </a>
          
          <div className="flex items-center space-x-6">
            <a href="/" className="text-sm font-medium hover:text-gray-300">Home</a>
            <a href="/dark" className="text-sm font-medium hover:text-gray-300">Dark</a>
            <a href="/return" className="text-sm font-medium hover:text-gray-300">Return</a>
            <a href="/contact" className="text-sm font-medium hover:text-gray-300">Contact Us</a>
            <button className="text-white hover:text-gray-300">
              <FaShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
      
      <div className="relative h-[300px] w-full">
        <img
          src={bannerImg}
          alt="Cyclist at sunset"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.alt = 'Image not available';
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white text-black px-4 py-2 rounded flex items-center space-x-2"
            disabled={loading || error}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Category</span>
                <FaChevronDown className="ml-2" />
              </>
            )}
          </button>
          {isOpen && !loading && !error && (
            <div className="absolute z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
              {categories.length === 0 ? (
                <span className="block px-4 py-2 text-sm text-gray-500">No categories available</span>
              ) : (
                categories.map((category) => (
                  <a
                    key={category._id}
                    href={`/category/${category._id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {category.name}
                  </a>
                ))
              )}
            </div>
          )}
          {error && (
            <div className="absolute z-10 w-48 py-2 mt-2 bg-red-50 text-red-500 rounded-md shadow-xl">
              <span className="block px-4 py-2 text-sm">{error}</span>
            </div>
          )}
        </div>
        
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="w-full sm:w-64 px-4 py-2 text-sm text-gray-900 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FaSearch className="text-gray-400" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Price Range</h4>
            <select className="form-select w-full sm:w-48">
              <option>Select price range</option>
              <option>$0 - $50</option>
              <option>$51 - $100</option>
              <option>$101 - $200</option>
              <option>$201+</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;