// src/components/Home.js
import React from 'react';
import './Home.css'; 
import Navbar from './Navbar';
const Home = () => {
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');  
    window.location.href = '/';           
  };
  
    // if (!username) {
    // return <h2>No Content. Please Login.</h2>;
    // }
  return (
    <>
    <Navbar/>
    <div className="home-container">

      {username ? (
        <>

        <h2 id='welcome'>Welcome back, {username} 👋</h2>
        <p>You're successfully logged in using our facial recognition system.</p>

        <div className="profile-card">
          <h3>Profile Information</h3>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Current Status:</strong> Active</p>
        </div>

        <h3>Recent Activity</h3>
        <ul>
          <li>Logged in on: {new Date().toLocaleString()}</li>
          <li>Authentication successful</li>
        </ul>


        <div className="home-actions">
        <button onClick={() => window.location.href = "/about"}>About Us</button>
        <button onClick={handleLogout}>Logout</button>
        </div>

        </>
      ) : (
        <>
                <h2>No Content. Please Login.</h2> 
        </>

      )}
    </div>
    </>
  );
};

export default Home;
