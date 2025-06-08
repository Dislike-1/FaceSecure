import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture';
import './Login.css';
import Navbar from './Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [faceImage, setFaceImage] = useState(null);
  const [useFaceLogin, setUseFaceLogin] = useState(null); // null = no form visible
  const [message, setMessage] = useState('');

  // FACE LOGIN SUBMISSION
  const handleFaceLogin = async (e) => {
    e.preventDefault();
    if (!email || !faceImage) {
      alert('Please provide your email and capture your face.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, face_image: faceImage }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('username', data.username || email);
        window.location.href = '/';
      } else {
        setMessage(`❌ ${data.error || 'Face login failed.'}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  // PASSWORD LOGIN SUBMISSION
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/password-login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('username', data.username);
        window.location.href = '/';
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Password login failed due to network or server error.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>

        <div className="login-toggle">
          {useFaceLogin === null ? (
            <>
              <button onClick={() => setUseFaceLogin('password')}>
                Login using Password
              </button>
              <button onClick={() => setUseFaceLogin('face')}>
                Login using Face
              </button>
            </>
          ) : (
            <>
              {useFaceLogin === 'password' ? (
                <form onSubmit={handlePasswordLogin} className="login-form">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Login with Password</button>
                  <button type="button" onClick={() => setUseFaceLogin(null)}>
                    Switch to Face Login
                  </button>
                </form>
              ) : (
                <form onSubmit={handleFaceLogin} className="login-form">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <WebcamCapture onCapture={setFaceImage} />
                  <button type="submit">Login with Face</button>
                  <button type="button" onClick={() => setUseFaceLogin(null)}>
                    Switch to Password Login
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        {message && <p className="login-message">{message}</p>}
      </div>
    </>
  );
};

export default Login;
