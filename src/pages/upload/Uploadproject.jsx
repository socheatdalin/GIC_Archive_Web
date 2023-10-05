import React, { useState } from "react";
import axios from "axios";

const FileUploadForm = () => {
  const [inputFile, setInputFile] = React.useState(null);
  const [inputTitle, setinputTitle] = useState("");
  const [inputDescr, setinputDescr] = useState("");
  const [github_url, setUrl] = useState("");
  const [inputCourse, setInputCourse] = useState("");

  const handleFileChange = (event) => {
    setInputFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", inputTitle);
    formData.append("descr", inputDescr);
    formData.append('course_name', inputCourse);
    formData.append("github_url", github_url);
    formData.append("file", inputFile);
    console.log(formData.get("file"));

    axios
      .post("http://localhost:3001/admin/project/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result);
        window.location.replace("http://localhost:3003/home/project/list");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="p-3">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <form
              className="p-5 border border-info rounded-3 shadow-lg"
              action="/uploadpro"
              encType="multipart/form-data"
              method="post"
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                borderRadius: "10px", // Rounded corners
              }}
            >
              <h4 className="text-info">Create Project</h4>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="title"
                  placeholder="Please enter your Title"
                  onChange={(e) => setinputTitle(e.target.value)}
                  value={inputTitle}
                  required
                />
              </div>
              <div class="mb-3 ">
                  <label for="" class="form-label">Course</label>
                  <input type="course" name='course' class="form-control" placeholder="Please enter your course's name" onChange={(e) => setInputCourse(e.target.value)} value={inputCourse} required></input>
                </div>
              <div class="mb-3 ">
                  <label for="" class="form-label">Git Url</label>
                  <input type="url" name='url' class="form-control" placeholder="Link of your github" onChange={(e) => setUrl(e.target.value)} value={github_url} required></input>
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">Description</label>
                  <textarea class="form-control" id="" rows="5" type="desc" name='desc' placeholder="Write some introduction ..." onChange={(e) => setinputDescr(e.target.value)} value={inputDescr} required></textarea>
                </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                />
              </div>
              <div className="text-center">
                <button className="btn btn-primary" type="submit">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadForm;
