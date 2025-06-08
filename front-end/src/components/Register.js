import React, { useState } from 'react';
import axios from 'axios';
import WebcamCapture from './WebcamCapture';
import './Register.css';
import Navbar from './Navbar';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    faceImage: null,
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValidEmail = (email) => {
    // Basic email format check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNext = () => {
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        face_image: formData.faceImage,
      };
      await axios.post('http://127.0.0.1:8000/api/users/register/', payload);
      alert('Registration successful!');
      window.location.href = "/login";
    } catch (error) {
      alert('Registration failed.');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        {step === 1 ? (
          <form>
            <h2>Register - Step 1</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h2>Register - Step 2</h2>
            <WebcamCapture onCapture={(img) =>
              setFormData(prev => ({ ...prev, faceImage: img }))
            } />
            <button type="submit">Register</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Register;
