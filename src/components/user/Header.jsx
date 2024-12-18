import React from "react";
import heroImage from "../../assets/images/HomePage.jpg";

const Header = () => {
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center p-4 md:p-8">
        <div className="text-xl font-bold">PEDALQUEST</div>
        <ul className="flex space-x-4 list-none">
          <li>
            <a href="/" className="text-gray-700 hover:text-blue-500 font-bold">
              Home
            </a>
          </li>
          <li>
            <a href="/store" className="text-gray-700 hover:text-blue-500">
              Store
            </a>
          </li>
          <li>
            <a href="/about" className="text-gray-700 hover:text-blue-500">
              About Us
            </a>
          </li>
          <li>
            <a href="/contact" className="text-gray-700 hover:text-blue-500">
              Contact Us
            </a>
          </li>
        </ul>
        <button className="text-lg bg-none border-none cursor-pointer">
          🌙
        </button>
      </nav>
      <div className="relative text-center">
        <img
          src={heroImage}
          alt="Cyclist in gear"
          className="w-full h-auto"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
          PEDALQUEST
        </h1>
      </div>
    </header>
  );
};

export default Header;
