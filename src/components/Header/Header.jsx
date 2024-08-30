import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="mb-4">
      <nav>
        <ul className="flex">
          <li className="mr-4">
            <Link to="/" className="text-blue-500 hover:text-blue-700">Form Builder</Link>
          </li>
          <li>
            <Link to="/preview/latest" className="text-blue-500 hover:text-blue-700">Preview Form</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;