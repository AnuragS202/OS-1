import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-xl text-blue-500 font-semibold">Online Sales.Ai</span>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">Form Builder</Link>
            </li>
            <li>
              <Link to="/preview/latest" className="text-gray-600 hover:text-blue-500 transition-colors">Preview Form</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;