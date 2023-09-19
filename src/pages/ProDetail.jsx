import React from "react";
import Navbar from "../components/Navbar";
import pic from "../assets/SNA.jpg";
import Comment from "../components/comment";
import StarRating from "../components/StarRating";
function ProDetail() {
  return (
    <>
      <Navbar />
      <div className="p-5 container">
        <nav>
          <ol class="breadcrumb fw-bold fs-4">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active" aria-current="page"><a href="/project/detail">Detail</a></li>
          </ol>
      </nav>
        <div className="p-5 border border-1 rounded-2 shadow p-3 mb-5 my-5 bg-body-tertiary rounded  ">
          <div className="card-body d-flex flex-row mb-3 justify-content-start grid gap-0 column-gap-5  ">
            <img
              src={pic}
              class="img-fluid"
              style={{ width: "350px" }}
              alt="network"
            ></img>
            <div className="information">
              <h4>Network Adminstrator</h4>
              <h5>Project name:</h5>
              <p>Git hub Link: </p>
              <p>Posted By: </p>
              <p>Upload at: </p>

              <p>
                {" "}
                It is a website use to build for store the source code and
                document before the theis defense{" "}
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-start">
                <button className="btn btn-primary me-md-2" type="button">
                  Code
                </button>
                <button className="btn btn-primary" type="button">
                  {" "}
                  Pdf{" "}
                </button>
              </div>
            </div>
          </div>


          <div className="container">
            <div class="row">
              <div class="col-sm-6">
                <Comment />
              </div>
              <div class="col-sm-6">
                <h4>Tags</h4>
                <div className="text-success">
                  <hr></hr>
                </div>
                <div
                  className="Tags border border-secondary border-1 rounded-2 d-flex align-items-center p-2"
                  style={{ width: "100px" }}
                >
                  <img
                    src={pic}
                    alt="webpage"
                    className="img-fluid img-smaller"
                  />
                  <span className="ms-2">SNA</span>
                </div>
                

              <div className='pt-5'>
              <h4>Code</h4>
              <div className="text-success">
                <hr></hr>
              </div>
              <p>https://github.com/SAM-Khema/e-commerce</p>
            </div>

            <div className='pt-5'>
              <h4>Feedback</h4>
              <div className="text-success">
                <hr></hr>
              </div>
              <StarRating />
            </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProDetail;
