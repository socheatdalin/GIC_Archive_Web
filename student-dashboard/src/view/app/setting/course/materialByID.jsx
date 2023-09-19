import { useEffect } from 'react';
import axios from "axios";
import React, { useState } from 'react';

export default function MaterialByID() {
    let course_id = localStorage.getItem('course_id')
    let  id = localStorage.getItem('id')
    const [material,setMaterial] = useState('')
    useEffect( () => {
        axios.post("http://localhost:3000/admin/displayOne/material",{course_id:course_id,id: id},{ withCredentials: true })
        .then((result) => {
            setMaterial(result.data.results[0]._file)
          })
        .catch(error => console.log(error));
    }, [])
    return(
        <div style={{height:'700px', width:'100%'}}>
            <iframe style={{height:'100%', width:'100%'}} overflow= "hidden" scrolling="no" frameBorder="none" src={material}></iframe>
        </div>
    )
}