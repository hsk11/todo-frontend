import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { createUser, isUserAuthenticated } from '../libs/api';


const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    useEffect(() => {
        if (isUserAuthenticated()) {
            history('/tasks');
        }
    },[]);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handlePassword2Change = (e) => {
        setPassword2(e.target.value);
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        // VALIDATE FORM
        if (!email || !password || !name || !password2) {
            setError('Please enter all fields');
            return;
        }
        // check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if(password !== password2){
            setError('Passwords do not match');
            return;
        }
        // Perform user registration logic here
        createUser(email, name, password).then(() => {
            console.log('User created successfully');
            history('/tasks');
        }).catch((error) => {
            console.error('Registration failed:', error);
            setError('Registration failed. ' + (error.response.data.message ||  error.response.data.error[0].message))
        })
    };

    return (
        <>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="cont">
            <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <br />
            <label>
                Email:
                <input name="email" type="email" value={email} onChange={handleEmailChange} />
            </label>
            <br />
            <label>
                Password:
                <input name="password" type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <label>
                Retype Password:
                <input name="password" type="password" value={password2} onChange={handlePassword2Change} />
            </label>
            <br />

            <span className='redText'>{error}</span>
            <button type="submit">Register</button>

            <Link className="anchorButton" to='/login'>Login</Link>
        </form>
        </>
    );
};

export default RegisterForm;