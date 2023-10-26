import React, { useState, useEffect } from "react";
import Web from "../assets/ux.png";
import Comment from "../components/comment";
import Navbar from "../components/Header/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";
import { UserProvider } from "../components/UserContext";

function ThesisDetail() {
  const { id } = useParams();
  const [thesis, setThesis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [File, setfile] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/thesis/all/${id}`)
      .then((response) => {
        setThesis(response.data[0]); // Access the first item in the array
        setLoading(false); // Set loading to false when data is available
        setfile(response.data[0].filepath);
        setPhoto(response.data[0].imagePath);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false on error
      });
  }, [id]);

  const handleButtonClick = () => {
    //make it able to route in new page
    if (thesis.github_url) {
      window.open(thesis.github_url, "_blank");
    }
  };
  const handleOpenFile = (url) => {
    if (thesis.fileName) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

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
                      <button
                        className="btn btn-primary me-md-2"
                        type="button"
                        onClick={handleButtonClick}
                      >
                        Code
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleOpenFile(`http://localhost:3001/static/${File}`)
                        }
                      >
                        Pdf
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {loading ? (
              <Loader />
            ) : (
              <div>
                <UserProvider>
                  <LikeButton thesis_id={thesis.thesis_id} />
                </UserProvider>
              </div>
            )}
          </div>
          <div className="contain">
            {loading ? (
              <Loader />
            ) : (
              <div class="row">
                <div class="col-sm-6">
                  {/* <Comment text="Thesis comment" theme="thesis"/> */}
                  <UserProvider>
                    <Comment thesis_id={thesis.thesis_id} />
                  </UserProvider>
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
