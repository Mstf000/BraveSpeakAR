import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../assets/css/Login.css'; // Assuming you saved your CSS here

const API_URL = 'http://localhost:5000';

// Add this function to handle signing up
const attemptSignup = async (userType, username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            userType, username, email, password
        });
        return response.data;
    } catch (error) {
        console.error('Signup error:', error.response);
        throw error;
    }
};

// Add this function to handle logging in
const attemptLogin = async (userType, username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            userType, username, password
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response);
        throw error;
    }
};
const LoginSignup = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [loginUser, setLoginUser] = useState({ username: '', password: '' });

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('User')) || [];
        if (storedUsers.length === 0) {
            const admin = { username: 'admin', email: 'ahmed14massoud2021@gmail.com', password: 'admin142021' };
            storedUsers.push(admin);
            localStorage.setItem('User', JSON.stringify(storedUsers));
        }
        setUsers(storedUsers);
    }, []);

    const handleNewUserChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = () => {
        // Basic validation, expand according to your needs
        if (!newUser.username || newUser.username.length < 5 || newUser.username.length > 15) {
            swal("Validation error", "Username must be between 5 and 15 characters.", "error");
            return false;
        }
        if (!validateEmail(newUser.email)) {
            swal("Validation error", "Please enter a valid email.", "error");
            return false;
        }
        if (!newUser.password || newUser.password.length < 7 || newUser.password.length > 14) {
            swal("Validation error", "Password must be between 7 and 14 characters.", "error");
            return false;
        }
        return true;
    };

    const signup = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const data = await attemptSignup('patient', newUser.username, newUser.email, newUser.password); // Assuming 'patient' userType, change as needed
                console.log('Signup success:', data);
                swal("Account creation succeeded", "The account has been created, please login", "success");
                // Additional success handling
            } catch (error) {
                swal("Account creation failed", error.message, "error");
            }
        }
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const data = await attemptLogin('patient', loginUser.username, loginUser.password); // Assuming 'patient' userType, change as needed
            console.log('Login success:', data);
            swal("Login succeeded", "", "success").then((value) => {
                navigate('/admin');
            });
            // Additional success handling
        } catch (error) {
            swal("Login failed", error.message, "error");
        }
    };

    return (

        <div id="container">
            <div className="title-container">
                    <h1>BraveSpeakAR</h1>
                </div>
            <div className="main" id="main">
                <input type="checkbox" id="chk" checked={isSignup} onChange={() => setIsSignup(!isSignup)} />
                <div className={isSignup ? "signup show" : "signup"}>
                    <label htmlFor="chk" className="sig">Sign up</label>
                    <form onSubmit={signup}>
                        <div className="user-box">
                            <input type="text" title="Enter Username" name="username" value={newUser.username} onChange={handleNewUserChange} required autoComplete="off" />
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input type="email" title="Enter Email" name="email" value={newUser.email} onChange={handleNewUserChange} required autoComplete="off" />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input type="password" title="Enter Password" name="password" value={newUser.password} onChange={handleNewUserChange} required autoComplete="off" />
                            <label>Password</label>
                        </div>
                        <button type="submit">Sign up</button>
                    </form>
                </div>
                <div className={!isSignup ? "login show" : "login"}>
                    <label htmlFor="chk" className="log">Login</label>
                    <form onSubmit={login}>
                        <div className="user-box">
                            <input type="text" title="Enter Username" name="username" value={loginUser.username} onChange={handleLoginChange} required />
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input type="password" title="Enter Password" name="password" value={loginUser.password} onChange={handleLoginChange} required />
                            <label>Password</label>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
