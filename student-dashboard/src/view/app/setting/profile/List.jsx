
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { visuallyHidden } from '@mui/utils';
import { useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/joy';
// import { useNavigate } from 'react-router-dom';

export default function List() {
        // const navigate = useNavigate();
        const [auth, setAuth] = React.useState(false);
        const [name, setname] = useState('');
        const [email, setEmail] = useState('');
        const [gender, setGender] = useState('');
        const [userId, setuserId] = useState('');
        const [first_name, setFirstname] = useState('');
        const [last_name, setLastName] = useState('');
        const [role, setRole] = useState('');
        const [generation, setGeneration] = React.useState('');

        useEffect(() => {

                axios.get("http://localhost:3001/me", {
                        headers: {
                                'Authorization': sessionStorage.getItem("token"),
                                "Content-Type": "application/json"
                        }
                })
                        .then((result) => {
                                setAuth(true);
                                setEmail(result.data.email);
                                setname(result.data.name);
                                setGender(result.data.gender);
                                setFirstname(result.data.first_name);
                                setLastName(result.data.last_name);
                                setGeneration(result.data.generation);
                                setRole(result.data.role_name);
                                console.log(result.data)
                        })
                        .catch(err => {
                                console.log("Server error:", err);
                        });

        }, [])

        const handleLogout = () => {
                axios.get('http://localhost:3001/logout')
                        .then(res => {
                                sessionStorage.removeItem("token");
                                // navigate('/');
                        })
                        .catch((err => console.log(err)))
        }
        return (

                <div>
                        <div class="container d-flex justify-content-center align-items-center">

                                <div class="card">

                                        <div class="upper">
                                                <img src="https://i.imgur.com/Qtrsrk5.jpg" alt="" class="img-fluid" />
                                        </div>

                                        <div class="user text-center">

                                                <div class="profile">

                                                        <img src="https://i.imgur.com/JgYD2nQ.jpg" class="rounded-circle" width="80" alt='' />
                                                </div>
                                        </div>
                                        <div class="mt-5 text-center">
                                                <h4 class="mb-0">{name}</h4>
                                                <br /><span class="text-muted d-block mb-2">{role}</span>
                                                <br /><span class="text-muted d-block mb-2">Firstname:{first_name} </span>
                                                <br /><span class="text-muted d-block mb-2">Last Name: {last_name} </span>
                                                <br /><span class="text-muted d-block mb-2">Gender:{gender} </span>
                                                <br /><span class="text-muted d-block mb-2">Email:{email} </span>
                                                <br /><span class="text-muted d-block mb-2">Generation:{generation} </span>
                                                <br /><a href="/"><button onClick={handleLogout}>Logout</button></a>
                                        </div>

                                </div>

                        </div>
                </div>
        )
}
