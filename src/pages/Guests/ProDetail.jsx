import React, { useState, useEffect } from "react";
import Navbar from "../../components/GuestHeader";
import Comment from "../../components/comment_project";
import LikeButton from "../../components/LikeButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { UserProvider, useUser } from "../../components/UserContext"; // Assuming useUser is exported from UserContext
import { BsStar } from 'react-icons/bs';


function ProDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const user = useUser(); // Assuming useUser returns user information

  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/project/${id}`)
      .then((response) => {
        setProject(response.data[0]);
        setLoading(false);
        setPhoto(response.data[0].imagepath);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="p-5 container">
        <div className="p-5 border border-1 rounded-2 shadow p-3 mb-5 my-5 bg-body-tertiary rounded  ">
          <div className="card-work d-flex flex-row mb-3 ">
            <div className="information">
              {loading ? (
                <Loader />
              ) : (
                <div className="d-flex justify-content-start grid gap-0 column-gap-5">
                  <img
                    src={`http://localhost:3001/static/${project.imagepath}`}
                    style={{ width: "350px", height: "220px" }}
                    alt="network"
                  ></img>
                  <div>
                    <h4 className="fw-semibold">{project.title}</h4>
                    <p></p>
                    <h6>Class: {project.course_name}</h6>
                    <h6>Taught by: {project.fullname}</h6>
                    <h6>Member: {project.student_names}</h6>
                    <p className="text-secondary">
                      Description: {project.descr}
                    </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-start">
                      <Link to="/login">
                        <button
                          className="btn btn-primary me-md-2"
                          type="button"
                        >
                          Code
                        </button>
                      </Link>
                      <Link to="/login">
                        <button
                          className="btn btn-primary "
                          type="button"
                        >
                          Pdf
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              {loading ? (
                <Loader />
              ) : (
                <div>
                  {user ? (
                    <UserProvider>
                      <LikeButton project_id={project.project_id} />
                    </UserProvider>
                  ) : (
                    <div className="like-button-container">
                      <Link to={`/login`}>
                        <button
                          className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
                        >
                          {<BsStar style={{ color: 'grey' }} />}
                        </button></Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="contain">
            {loading ? (
              <Loader />
            ) : (
              <div>
                <div class="row ">
                  <div class="col-sm-6">
                    {user ? (
                      <UserProvider>
                        <Comment project_id={project.project_id} />
                      </UserProvider>
                    ) : (
                      <div>
                        <div className="contain pt-1">
                          <div className="row">
                            <h5 className="fw-bold">Comments</h5>
                          </div>
                        </div>
                        <div className="input-group mb-3" style={{ width: "350px" }}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add a comment"
                            aria-describedby="button-addon2"
                            name="comment_text"
                          />
                          <Link to="/login">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              id="button-addon2"
                            >
                              Post
                            </button>
                          </Link>
                        </div>
                      </div>

                    )}
                  </div>
                  <div class="col-sm-6">
                    <div className="">
                      <h4>Code</h4>
                      <div className="text-success">
                        <hr></hr>
                      </div>
                      <p>
                        GitHub URL:{" "}
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.github_url}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProDetail;
