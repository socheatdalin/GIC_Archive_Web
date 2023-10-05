import React, {useState, useEffect} from "react";
import Navbar from "../components/Header/Navbar";
import pic from "../assets/SNA.jpg";
import Comment from "../components/comment";
import LikeButton from "../components/LikeButton";
import { useParams } from "react-router-dom";
import axios from "axios";


function ProDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [File, setfile] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/team_project/${id}`)
      .then((response) => {
        setProject(response.data[0]);
        setLoading(false); 
        setfile(response.data[0].filepath);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleButtonClick = () => {//make it able to route in new page
    if (project.github_url) {
      window.open(project.github_url, "_blank");
    }
  };

  const handleOpenFile = (url) => {
    if (project.fileName) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <>
      <Navbar />
      <div className="p-5 container">
       
        <div className="p-5 border border-1 rounded-2 shadow p-3 mb-5 my-5 bg-body-tertiary rounded  ">
          <div className="card-work d-flex flex-row mb-3 justify-content-start grid gap-0 column-gap-5  ">
            <img
              src={pic}
              style={{ width: "350px", height: "220px" }}
              alt="network"
            ></img>

            <div className="information">
            {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <h4 className="fw-semibold">{project.title}</h4>
                  <p></p>
                  <h6>Class: {project.course_name}</h6>
                  <h6>Taught by: {project.teacher_name}</h6>
                  <h6>Posted by: {project.inputname}</h6>
                  <p className="text-secondary">Description: {project.descr} </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-start">
                      <button className="btn btn-primary me-md-2" type="button" onClick={handleButtonClick}>
                        Code
                      </button>
                      <button className="btn btn-primary" type="button"  onClick={() =>
                        handleOpenFile(`http://localhost:3001/static/${File}`)
                      }>
                        Pdf
                      </button>
                    </div>
                </div>
              )}
            </div>
            <LikeButton />
          </div>

          <div className="contain">
            <div class="row ">

              <div class="col-sm-6">
                <Comment />
              </div>
              
              {loading ? (
                <p>Loading...</p>
              ) : (

              <div class="col-sm-6">
                <div className="">
                  <h4>Code</h4>
                  <div className="text-success">
                    <hr></hr>
                  </div>
                  <p>GitHub URL: <a href={project.github_url} target="_blank" rel="noopener noreferrer">{project.github_url}</a></p>
                </div>
              </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProDetail;
