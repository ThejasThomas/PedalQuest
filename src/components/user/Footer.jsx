import React from "react";
import footerBg from "../../../src/assets/images/footerBg.jpg";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">SUNDAY SALE</h2>
        <img
          src={footerBg}
          alt="Cyclist silhouette"
          className="max-w-full h-auto"
        />
      </div>
      <div className="flex justify-around flex-wrap gap-8 px-4">
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-medium mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <a href="/contact" className="text-gray-700 hover:text-blue-500">
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/shipping"
                className="text-gray-700 hover:text-blue-500"
              >
                Shipping Details
              </a>
            </li>
            <li>
              <a href="/returns" className="text-gray-700 hover:text-blue-500">
                Return & Refund
              </a>
            </li>
            <li>
              <a href="/payment" className="text-gray-700 hover:text-blue-500">
                Payment
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-medium mb-4">About Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="/story" className="text-gray-700 hover:text-blue-500">
                Our Story
              </a>
            </li>
            <li>
              <a href="/careers" className="text-gray-700 hover:text-blue-500">
                Careers
              </a>
            </li>
            <li>
              <a
                href="/sustainability"
                className="text-gray-700 hover:text-blue-500"
              >
                Sustainability
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-medium mb-4">Contact</h3>
          <ul className="space-y-2">
            <li>
              <a href="/service" className="text-gray-700 hover:text-blue-500">
                Service Hotline
              </a>
            </li>
            <li>
              <a href="/feedback" className="text-gray-700 hover:text-blue-500">
                Feedback
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-sm text-gray-600">
        <p>©2023 All Right Reserved. From us at PedalQuest</p>
      </div>
    </footer>
  );
};

export default Footer;
