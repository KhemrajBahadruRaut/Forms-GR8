import React from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <div className="bg-white"> {/* Set navbar background to white */}
      <div className="container mx-auto px-4"> {/* Constrain content within container */}
        <nav className="flex items-center justify-between flex-wrap py-4">
          {/* Logo + Name */}
          <a href="/" className="flex items-center space-x-3">
            <img
              src={assets.GR8NEPAL}
              className="h-12"
              alt="Flowbite Logo"
            />
          
          </a>

          {/* Mobile menu button */}
          {/* <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 md:hidden hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> */}

          {/* Nav Links */}
          {/* <div className="hidden md:flex space-x-6">
            {['Home', 'About', 'Services', 'Pricing', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-900 hover:text-blue-700 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div> */}
          <div>
             Onboarding Form
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
