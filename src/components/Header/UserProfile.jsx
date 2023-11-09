import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../styles/userpf.css";
import { useEffect } from 'react';

function UserProfile() {
    let navigate = useNavigate();

    const [auth, setAuth] = useState(false);
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [userId, setuserId] = useState(null);
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [generation, setGeneration] = useState('');
    const [photo, setPhoto] = useState('');
    useEffect(() => {

        axios.get("http://localhost:3001/me", {
            headers: {
                'Authorization': sessionStorage.getItem("access_token"),
                "Content-Type": "application/json"
            }
        })
            .then((result) => {
                setAuth(true);
                setuserId(result.data.id);
                setEmail(result.data.email);
                setname(result.data.name);
                setPhoto(result.data.filepath);
                setGender(result.data.gender);
                setFirstname(result.data.first_name);
                setLastName(result.data.last_name);
                setGeneration(result.data.generation);
                setRole(result.data.role_name);
                setuserId(result.data.teacher_id);
            })
            .catch(err => {
                console.log("Server error:", err);
            });


    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
            .then(res => {
                sessionStorage.removeItem("token");
                navigate('/');
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

                            <img src={`http://localhost:3001/static/${photo}`} class="rounded-circle" width="80" height="50" alt='' />
                        </div>
                    </div>
                    <div class="mt-5 text-center">
                        <h4 class="mb-0">{name}</h4>
                        <span class="text-muted d-block mb-2">{role}</span>
                        <span class="text-muted d-block mb-2">{userId}</span>
                        <span class="text-muted d-block mb-2">Firstname:{first_name} </span>
                        <span class="text-muted d-block mb-2">Last Name: {last_name} </span>
                        <span class="text-muted d-block mb-2">Gender:{gender} </span>
                        <span class="text-muted d-block mb-2">Email:{email} </span>
                        <span class="text-muted d-block mb-2">Generation:{generation} </span>

                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <div>
                            <a href="/home"><button className='btn' style={{ backgroundColor: 'white', color: 'black', border: '1px solid', transition: 'background-color 0.3s, color 0.3s' }} >Back</button></a>
                        </div>
                        <div>
                            <button className='btn' onClick={handleLogout}>Logout</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserProfile