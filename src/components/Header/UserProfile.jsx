import React, { useState } from 'react';
import axois from 'axios';
import "../../styles/userpf.css";
import { useEffect } from 'react';
// import { use } from '../../../../Gic_Archive_Backend/routes';



function UserProfile() {
    const [profile, setprofile] = useState([]);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {

        Profile();
    }, [])

    const row = profile;

    const Profile = async () => {
        await axois.get("http://localhost:3001/getstudent")
            .then((result) => {
                // setprofile(result.data)
                console.log(result.data);
                setName(result.data[0].username);
                setGender(result.data[0].gender);
            })
            .catch(error => console.log(error));
    };
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
                        <span class="text-muted d-block mb-2">Student</span>
                        <span class="text-muted d-block mb-2">Gender:{row.gender} </span>
                        <span class="text-muted d-block mb-2">Email:{row.email} </span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserProfile