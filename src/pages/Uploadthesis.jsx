import React, { useState } from 'react';
import axios from 'axios';
// import Navbar from '../../src/components/Navbar';

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [field, setField] = useState('');
  const [company, setCompany] = useState('');
  const [teacher, setTeacher] = useState('');
  const [id, setId] = useState('');
  const [year, setYear] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {

    // e.preventDefault();
    // Create a FormData object to send the file and other data to the server
    const formData = new FormData();
    // formData.append('student_name', name);
    // formData.append('student_id', id);
    // formData.append('supervisor', teacher);
    // formData.append('title', title);
    // formData.append('field', field);
    // formData.append('company', company);
    // formData.append('year', year);
    // formData.append('descr', desc);
    // formData.append('GITHub_Url', url);
    formData.append('file', selectedFile);

    console.log(formData.get('file'));
    // Simulate an upload progress (replace with your actual API call)
    // simulateUploadProgress(formData);
    axios.post("http://localhost:3001/thesis/create", formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((result) => {
        console.log(result);
        window.location.replace('/thesis')
      })
      .catch(error => console.log(error));

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
    <>
      {/* <Navbar /> */}
      <div className='p-5 container'>
        <form className='p-5 border border-info border-1 rounded-2  ' action="/upload" enctype="multipart/form-data" id="" method="post" onSubmit={handleSubmit}>
          <h4 className='text-info '>Create Thesis</h4>
          <div className=' row'>
            <div className='right-hand col'>
              {/* <div class="mb-3 ">
                <label for="" class="form-label">Name</label>
                <input type="name" name="name" class="form-control" id="" placeholder="Please Enter your name" onChange={(e) => setName(e.target.value)}
                  value={name} required></input>
              </div> */}
              {/* <div class="mb-3  ">
                <label for="" class="form-label">Title</label>
                <input type="title" name='title' class="form-control" id="" placeholder="Please Enter your Title" onChange={(e) => setTitle(e.target.value)} value={title} required></input>
              </div> */}
              {/* <div class="mb-3  ">
                <label for="" class="form-label">fields</label>
                <select class="form-select form-select-md" name='field' onChange={(e) => setField(e.target.value)} value={field} required >
                  <option></option>
                  <option>Web</option>
                  <option>Mobile</option>
                  <option>Network</option>
                  <option>Data Science</option>
                </select>
              </div> */}
              {/* <div class="mb-3  ">
                <label for="" class="form-label">Company</label>
                <input type="company" name='company' class="form-control" id="" placeholder="Please Enter your company" onChange={(e) => setCompany(e.target.value)} value={company} required></input>
              </div> */}
              {/* <div class="mb-3  ">
                <label for="" class="form-label">Teacher's name </label>
                <input type="teacher" name='teacher' class="form-control" id="" placeholder="Please Enter your teacher's name" onChange={(e) => setTeacher(e.target.value)} value={teacher} required ></input>
              </div>
              <div class="mb-3  ">
                <label for="" class="form-label">Years</label>
                <select class="form-select form-select-md" type="year" name='year' onChange={(e) => setYear(e.target.value)} value={year} required >
                  <option></option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div> */}
            {/* <div className='left-hand col'>
              <div class="mb-3 ">
                <label for="" class="form-label">ID</label>
                <input type="id" name='id' class="form-control" placeholder="Please Enter your ID" onChange={(e) => setId(e.target.value)} value={id} required></input>
              </div>
              <div class="mb-3 ">
                <label for="" class="form-label">GithubUrl</label>
                <input type="url" name='url' class="form-control" placeholder="Link of your github" onChange={(e) => setUrl(e.target.value)} value={url} required></input>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Description</label>
                <textarea class="form-control" id="" rows="8" type="desc" name='desc' placeholder="Write some introduction ..." onChange={(e) => setDesc(e.target.value)} value={desc} required></textarea>
              </div> */}
              <div class="mb-3">
                <label for="formFile" class="form-label"></label>
                <input class="form-control" type="file" id="formFile" name='file' onChange={handleFileChange} ></input>
              </div>
            </div>
          </div>
          <div class="col-12 d-flex justify-content-center">
            <button class="btn btn-primary" type='submit' >Next</button>
            {/* {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>} */}
          </div>
        </form>



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
