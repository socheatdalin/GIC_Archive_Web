import React, { useState, useEffect } from "react";
import Web from "../../assets/ux.png";
import Comment from "../../components/comment";
import Header from '../../components/GuestHeader'
import { Link, useParams } from "react-router-dom";
import axios from "axios";



function ThesisDetail() {
  const { id } = useParams();
  const [thesis, setThesis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [File, setfile] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/thesis/all/${id}`)
      .then((response) => {
        setThesis(response.data[0]);
        setLoading(false); // Set loading to false when data is available
        setfile(response.data[0].filepath);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false on error
      });
  }, [id]);

  return (
    <>
      <Header />
      <div className="p-5 container ">
        <div className="p-5 border border-1 rounded-2 shadow p-3 mb-5 my-5 bg-body-tertiary rounded  ">
          <div className="card-thesis d-flex flex-row mb-3 justify-content-start grid gap-0 column-gap-5  ">
            <img
              src={`http://localhost:3001/static/${thesis.imagePath}`}
              class="img-thumbnail"
              alt="network"
              style={{ width: "350px" }}
            ></img>
            <div className="information">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <h4 className="fw-semibold">{thesis.title}</h4>
                  <p></p>
                  <h6>Posted by: {thesis.student_username}</h6>
                  <h6>Tags: {thesis.tags}</h6>
                  <h6>Company: {thesis.company}</h6>

                  <p className="text-secondary">Description: {thesis.descr}</p>
                  <div className="d-grid gap-2 d-md-flex justify-content-start">
                    <Link to="/login">
                      <button
                        className="btn btn-primary me-md-2"
                        type="button"
                      // onClick={handleButtonClick}
                      >
                        Code
                      </button></Link>
                    <Link to="/login">
                      <button className="btn btn-primary" type="button">
                        Pdf
                      </button></Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="contain">
            <div class="row">
              <div class="col-sm-6">
                <Comment />
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
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

                      <p>GitHub URL: <Link to="/login"><a href={thesis.github_url} target="_blank" rel="noopener noreferrer">Require Login</a> </Link></p>
                    </div>
                    <p></p>
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

export default ThesisDetail;
