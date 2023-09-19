import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [year, setYear] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile && name && id && year) {
      
      // Create a FormData object to send the file and other data to the server
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', name);
      formData.append('id', id);
      formData.append('year', year);

      // Simulate an upload progress (replace with your actual API call)
      simulateUploadProgress(formData);
    }
  };

  const simulateUploadProgress = (formData) => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 500);
  };

  return (
    <><Navbar />
    <div className='p-5 container'>
        <div className='p-5 border border-info border-1 rounded-2  '>
          <h4 className='text-info '>Create Project</h4>
          <div className=' row'>
            <div className='right-hand col'>
              <div class="mb-3 ">
                  <label for="" class="form-label">Name</label>
                  <input type="name" class="form-control" id="" placeholder="Please Enter your name"></input>
              </div>
              <div class="mb-3  ">
                  <label for="" class="form-label">Title</label>
                  <input type="title" class="form-control" id="" placeholder="Please Enter your Title"></input>
              </div>
              <div class="mb-3  ">
                  <label for="" class="form-label">Course</label>
                  <input type="company" class="form-control" id="" placeholder="Please enter the course name"></input>
              </div>
              <div class="mb-3  ">
                  <label for="" class="form-label">Member</label>
                  <select class="form-select form-select-md">
                    <option></option>
                    <option>None</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
              </div>
              <div class="mb-3  ">
                  <label for="" class="form-label">Member's name </label>
                  <input type="name" class="form-control" id="" placeholder="Please Enter your the name"></input>
              </div>
              <div class="mb-3  ">
                  <label for="" class="form-label">Years</label>
                  <select class="form-select form-select-md">
                    <option></option>
                    <option>4</option>
                    <option>5</option>
                  </select>
              </div>
          </div>
          <div className='left-hand col'>
              <div class="mb-3 ">
                  <label for="" class="form-label">ID</label>
                  <input type="text" class="form-control" placeholder="Please Enter your ID"></input>
              </div>
              <div class="mb-3 ">
                  <label for="" class="form-label">GithubUrl</label>
                  <input type="text" class="form-control" placeholder="Link of your github"></input>
              </div>
              <div class="mb-3">
                    <label for="" class="form-label">Description</label>
                    <textarea class="form-control" id="" rows="8" placeholder="Write some introduction ..."></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label"></label>
                <input class="form-control" type="file" id="formFile"></input>
              </div>
          </div>
          </div>
          <div class="col-12 d-flex justify-content-center">
            <button class="btn btn-primary">Next</button>
          </div>
        </div>
    
    
        
      {/* <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      </div> */}
      
    </div>
    </>
  );
};

export default FileUploadForm;
