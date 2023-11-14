import React, { useState, useEffect } from "react";
import Web from "../../assets/ux.png";
import Comment from "../../components/comment";
import Navbar from "../../components/GuestHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import LikeButton from "../../components/LikeButton";
import { UserProvider, useUser } from "../../components/UserContext";
import {  BsStar } from 'react-icons/bs';

function ThesisDetail() {
  const { id } = useParams();
  const [thesis, setThesis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const user = useUser(); // Assuming useUser returns user information

  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/thesis/all/${id}`)
      .then((response) => {
        setThesis(response.data[0]); // Access the first item in the array
        setLoading(false); // Set loading to false when data is available
        setPhoto(response.data[0].imagePath);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false on error
      });
  }, [id]);


  return (
    <>
      <Navbar />
      <div className="p-5 container ">
        <div className="p-5 border border-1 rounded-2 shadow p-3 mb-5 my-5 bg-body-tertiary rounded  ">
          <div className="card-thesis d-flex flex-row mb-3  ">
            {loading ? (
              <Loader />
            ) : (
              <div className="d-flex justify-content-start grid gap-0 column-gap-5">
                <img
                  src={`http://localhost:3001/static/${photo}`}
                  alt="network"
                  style={{ width: "300px" ,height: "230px" }}
                ></img>
                <div className="information">
                  <div>
                    <h4 className="fw-semibold">{thesis.title}</h4>
                    <p></p>
                    <h6>Posted by: {thesis.student_username}</h6>
                    <h6>Tags: {thesis.tags}</h6>
                    <h6>Company: {thesis.company}</h6>

                    <p className="text-secondary">
                      Description: {thesis.descr}
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
              </div>
            )}
            {loading ? (
              <Loader />
            ) : (
              <div>
                {user ? (
                  <UserProvider>
                    <LikeButton thesis_id={thesis.thesis_id} />
                  </UserProvider>
                ) : (
                <div className="like-button-container">
                <Link to={`/login`}>
                <button
                  className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
                >
                  { <BsStar style={{ color: 'grey' }}/>}
                </button></Link>
                </div>
                )}
              </div>
            )}
          </div>
          <div className="contain">
            {loading ? (
              <Loader />
            ) : (
              <div class="row">
                <div class="col-sm-6">
                  {user ? (
                    <UserProvider>
                      <Comment thesis_id={thesis.thesis_id} />
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
                  <h4>Fields</h4>
                  <div className="text-success">
                    <hr></hr>
                  </div>
                  <div
                    className="Tags d-flex align-items-center justify-content-center p-2"
                    style={{ width: "120px", height: "50px" }}
                  >
                    <img
                      src={Web}
                      alt="webpage"
                      className="img-fluid img-smaller"
                    />
                    <span className="ms-2">{thesis.field}</span>
                  </div>

                  <div className="pt-5">
                    <h4>Code</h4>
                    <div className="text-success">
                      <hr></hr>
                      <p>
                        GitHub URL:{" "}
                        <a
                          href={thesis.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {thesis.github_url}
                        </a>
                      </p>
                    </div>
                    <p></p>
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

export default ThesisDetail;
