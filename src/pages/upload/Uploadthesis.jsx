import React, { useState } from 'react';
import axios from 'axios';

const FileUploadForm = () => {
  const [inputFile, setInputFile] = React.useState(null);
  const [inputPhoto, setInputPhoto] = React.useState(null);
  const [inputname, setInputName] = useState('');
  const [inputTitle, setinputTitle] = useState('');
  const [inputField, setinputField] = useState('');
  const [inputCompany, setInputCompany] = useState('');
  const [inputTag, setInputTags] = useState('');
  const [inputDescr, setinputDescr] = useState('');
  const [github_url, setUrl] = useState('');
  const [InputTeacherName, setInputTeacher_name] = React.useState('');


  const handleFileChange = (event) => {
    setInputFile(event.target.files[0]);
  };
  const handlePhotoChange = (event) => {
    setInputPhoto(event.target.files[0]);
  };

  const handleSubmit = async () => {

    const formData = new FormData();
    // formData.append('username', inputName);
    formData.append('title', inputTitle);
    formData.append('field', inputField.value);
    formData.append('company', inputCompany);
    formData.append('teacher_name', InputTeacherName)
    formData.append('descr', inputDescr);
    formData.append('github_url', github_url);
    formData.append('tags', inputTag);
    formData.append('image', inputPhoto);
    formData.append('file', inputFile);
    console.log(formData.get('file'));
    console.log(formData.get('image'));
    
    axios.get("http://localhost:3001/me", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((result) => {
        console.log(result.data.id);
        axios.post("http://localhost:3001/student/thesis/create/" + result.data.id, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((result) => {
            console.log(result);
            // console.log("hello");
            window.location.replace('/home/thesis/list')
          })
          .catch(error => console.log(error));
      })
      .catch(err => {
        console.log("Server error:", err);
      });
  }

  return (
    <>
      <div className='contain'>
        <div className='p-5  '>
          <form className='p-5 border border-info border-1 rounded-2  ' action="/upload" enctype="multipart/form-data" id="" method="post" onSubmit={handleSubmit} style={{
            backgroundColor: "#f8f9fa", // Light gray background
            borderRadius: "10px", // Rounded corners
          }}>
            <h4 className='text-info '>Create Thesis</h4>
            <div className=' row'>
              <div className='right-hand col'>
                <div class="mb-3  ">
                  <label for="" class="form-label">Title</label>
                  <input type="title" name='title' class="form-control" id="" placeholder="Please enter your Title" onChange={(e) => setinputTitle(e.target.value)} value={inputTitle} required></input>
                </div>
                <div class="mb-3 ">
                  <label for="" class="form-label">Name</label>
                  <input type="name" name="name" class="form-control" id="" placeholder="Please enter your name" onChange={(e) => setInputName(e.target.value)}
                    value={inputname} required></input>
                </div>
                <div class="mb-3  ">
                  <label for="" class="form-label">Teacher's name </label>
                  <input type="teacher" name='teacher' class="form-control" id="" placeholder="Please enter your teacher's name" onChange={(e) => setInputTeacher_name(e.target.value)} value={InputTeacherName} required ></input>
                </div>
                <div class="mb-3  ">
                  <label for="" class="form-label">Field</label>
                  <select class="form-select form-select-md" name='field' onChange={(e) => setinputField(e.target.value)} value={inputField} required >
                    <option></option>
                    <option>Web</option>
                    <option>Mobile</option>
                    <option>Network</option>
                    <option>Data Science</option>
                  </select>
                </div>
                <div class="mb-3  ">
                  <label for="" class="form-label">Company</label>
                  <input type="company" name='company' class="form-control" id="" placeholder="Please enter your company" onChange={(e) => setInputCompany(e.target.value)} value={inputCompany} required></input>
                </div>
              </div>
              <div className='left-hand col'>
                <div class="mb-3 ">
                  <label for="" class="form-label">Tags</label>
                  <input type="tags" name='tags' class="form-control" placeholder="Please enter your tags" onChange={(e) => setInputTags(e.target.value)} value={inputTag} required></input>
                </div>
                <div class="mb-3 ">
                  <label for="" class="form-label">Git Url</label>
                  <input type="url" name='url' class="form-control" placeholder="Link of your github" onChange={(e) => setUrl(e.target.value)} value={github_url} required></input>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Description</label>
                  <textarea class="form-control" id="" rows="5" type="desc" name='desc' placeholder="Write some introduction ..." onChange={(e) => setinputDescr(e.target.value)} value={inputDescr} required></textarea>
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">Image</label>
                  <input class="form-control" type="file" id="formFile" name='image' onChange={handlePhotoChange} ></input>
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">Document</label>
                  <input class="form-control" type="file" id="formFile" name='file' onChange={handleFileChange} ></input>
                </div>
              </div>
            </div>
            <div class="col-12 d-flex justify-content-center">
              <button class="btn btn-primary" type='submit' >Next</button>
            </div>
          </form>


        </div>
      </div>

    </>
  );
};

export default FileUploadForm;
