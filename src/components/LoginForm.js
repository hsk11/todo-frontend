import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { login, isUserAuthenticated } from '../libs/api';

// REACT LOGIN FORM with email and password fields



const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();
  useEffect(() => {
    if (isUserAuthenticated()) {
      history('/tasks');
    }
  });
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    // VALIDATE EMAIL AND PASSWORD
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // If the email and password are valid, continue with the login process
    e.preventDefault();
    login(email, password)
      .then((token) => {
        localStorage.setItem('token', token);
        history('/tasks');
        window.location.reload();
      }).catch((error) => {
        console.error('Login failed:', error);
        setError('Login failed. Please try again.');
      });
  };

  return (
    <>
       <h1>Login</h1>
           <form onSubmit={handleSubmit} className="cont">
  
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <span className='redText'>{error}</span>
      <br />
      <button type="submit">Login</button>
      <Link className="anchorButton" to='/register'>Register</Link>
      
    </form>
    </>
  );
};

export default LoginForm;