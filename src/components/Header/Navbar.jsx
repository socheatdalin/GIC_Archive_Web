import React, { useState } from "react";
import axios from "axios";
import Logo from "../../assets/itc_logo.png";
import { Link } from "react-router-dom";
import Navigation from "./navigation";
import "../../styles/Navbar.css";
import Search from "./Search";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import Popup from "./Popup";
function Navbar() {
        let navigate = useNavigate();
        const [auth, setAuth] = useState(false);
        const [name, setname] = useState('');
        const [password, setPassword] = useState("");
        const [email, setEmail] = useState('');
        const [gender, setGender] = useState('');
        const [userId, setuserId] = useState('');
        const [first_name, setFirstname] = useState('');
        const [last_name, setLastName] = useState('');
        const [role, setRole] = useState('');
        const [generation, setGeneration] = useState('');
        useEffect(() => {

                axios.get("http://localhost:3001/me", {
                        withCredentials: true,
                        headers: {
                                // 'Authorization': sessionStorage.getItem("access_token"),
                                "Content-Type": "application/json"
                        }
                })
                        .then((result) => {
                                setAuth(true);
                        })
                        .catch(err => {
                                console.log("Server error:", err);
                        });


        }, [])
        const handleLogin = () => {
                axios.get("http://localhost:3001/me", {
                        withCredentials: true,
                        headers: {
                                // 'Authorization': sessionStorage.getItem("access_token"),
                                "Content-Type": "application/json"
                        }
                })
                        .then((result) => {
                                setAuth(true);
                                console.log(result.data.email);
                                axios.post("http://localhost:3001/login", { email: result.data.email, password: password, role: role })
                                        .then((response) => {
                                                const token = response.data.token;

                                                if (role === "student" || role === "teacher") {
                                                        console.log(response.data);
                                                        console.log("Login successful");
                                                        console.log(token);
                                                        console.log(response.data.email);
                                                        // sessionStorage.setItem("access_token", token);
                                                        // navigate('http://localhost:3002/home');
                                                }
                                                else {
                                                        window.location.href = "http://localhost:3002/home";
                                                }
                                        })
                                        .catch(err => {
                                                console.log("Server error:", err);
                                        });
                        })
                        .catch(err => {
                                console.log("Server error:", err);
                        });


                window.location.replace('http://localhost:3003/home');
        };

        const Logout = async () => {
                try {
                        axios.post("http://localhost:3001/logout", {
                                headers: {
                                        // 'Authorization': sessionStorage.removeItem("access_token"),
                                        "Content-Type": "application/json"
                                }
                        });

                        window.location.replace('http://localhost:3000');
                } catch (err) {
                        console.log("Server error:", err);
                }
        }

        return (

                <div className="Navbar">
                        <div className="leftSide">
                                <img src={Logo} alt="itc" />
                                <h6>Institute of technology of Cambodia</h6>
                        </div>
                        <Navigation />

                        <div className="rightSide">
                                <Search />
                                <div className="profile-section">
                                        <div className="profile-avatar">
                                                <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 24 24"
                                                >
                                                        <g
                                                                fill="none"
                                                                stroke="white"
                                                                stroke-dasharray="28"
                                                                stroke-dashoffset="28"
                                                                stroke-linecap="round"
                                                                stroke-width="2"
                                                        >
                                                                <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
                                                                        <animate
                                                                                fill="freeze"
                                                                                attributeName="stroke-dashoffset"
                                                                                dur="0.4s"
                                                                                values="28;0"
                                                                        />
                                                                </path>
                                                                <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
                                                                        <animate
                                                                                fill="freeze"
                                                                                attributeName="stroke-dashoffset"
                                                                                begin="0.5s"
                                                                                dur="0.4s"
                                                                                values="28;0"
                                                                        />
                                                                </path>
                                                        </g>
                                                </svg>
                                        </div>
                                        <div></div>
                                        <div className="profile-name">
                                        </div>
                                        <div className="profile-dropdown">
                                                <ul>
                                                        <li>
                                                                <Link to="/userpf">Profile</Link>
                                                        </li>
                                                        <li onClick={handleLogin}>Dashboard
                                                        </li>
                                                        <li onClick={Logout}>
                                                                Logout
                                                        </li>
                                                </ul>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default Navbar;
