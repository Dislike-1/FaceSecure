import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavbarDark.css'

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <nav className="navbar">
    <div>
    <p id='companyname'>Face Recog & Login System</p>
    <p id='slogan'>Your face is your identitiy</p>
    </div>

    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="http://127.0.0.1:8000/admin/users/customuser/">AdminPanel</Link>



      <button className="theme-toggle-btn" onClick={toggleTheme}>
      {isDark ? 'Light' : 'Dark'} Mode
    </button>
    </div>

  </nav>
  );
};

export default Navbar;
