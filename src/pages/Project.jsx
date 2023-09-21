import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import SNA from "../assets/global-network.png";
import SE from "../assets/web.png";
import pic from "../assets/SNA.jpg";
import "../styles/project.css";
import star from "../assets/star.png";
import Drop from "../components/drop";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";


function Project() {

  return (
    <>
      <Navbar />
      <div className="p-5 container ">
        <div className="  first-part ">
          <div className="d-flex flex-row justify-content-between">
            <div>
              <h1>Project</h1>
            </div>
            <Drop />
          </div>
          <p className="fs-4">Class Project - Everything you can find here</p>
        </div>
        <div className="d-flex flex-row mb-3 justify-content-start grid gap-0 column-gap-2 my-4">
          <div
            className="newTags d-flex align-items-center justify-content-center p-2"
            style={{ width: "140px", height: "50px" }}
          >
            <img src={SNA} alt="webpage" className="img-fluid img-smaller" />
            <span className="ms-2">SNA</span>
          </div>

          <div
            className="newTags d-flex align-items-center justify-content-center p-2"
            style={{ width: "140px", height: "50px" }}
          >
            <img src={SE} alt="webpage" className="img-fluid img-smaller" />
            <span className="ms-2">SE</span>
          </div>
        </div>

        <div className="trending my-5">
          <h2>Trending Projects</h2>
        </div>
        <div className="shadow p-3 mb-5 d-flex bg-body-tertiary rounded d-md-none d-sm-none  d-lg-block d-flex">
          <div className="card-project d-flex flex-row mb-3 justify-content-start grid gap-0 column-gap-5 ">
            <img
              src={pic}
              className="img-project"
              alt="pic"
              style={{ paddingTop: "7px" }}
            ></img>
            <div className="information">
              <h4>Network Adminstrator</h4>
              <h6 className="">Project Name: </h6>
              <h6 className="text-primary text-opacity-75">Git hub Link: </h6>
              <p className="">
                It is overview project in used to explore on the Active
                directory
              </p>

              <Link to="/project/detail">
                <button
                  className="btn btn-outline-primary fw-bolder"
                  type="submit"
                >
                  View
                </button>
              </Link>
            </div>
            <div>
              <button className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">
                <img src={star} className=" img-star" alt="pic"></img>
                5, 075
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* responsive */}
      <div className="project pl-0  d-none d-md-block d-sm-block d-lg-none px-5 ">
        <div className="card shadow pt-2">
          <img
            src={pic}
            class="card-img-top rounded mx-auto d-block"
            alt=""
          ></img>
          <div class="card-body ">
            <h4 class="card-title">Network Adminstrator</h4>
            <p>Project Name: </p>
            <p>Git hub Link: </p>
            <p class="card-text">
              It is overview project in used to explore on the Active directory
            </p>
            <div class="d-grid gap-2 d-md-block">
              <Link to="/project/detail">
                {" "}
                <button class="btn btn-outline-primary fw-bolder" type="submit">
                  View
                </button>
              </Link>
              <a
                href="/rating"
                class=" focus-ring py-1 pb-2 mx-2  px-2 text-decoration-none border rounded-2"
              >
                <img
                  src={star}
                  className=" img-star"
                  alt="pic"
                  style={{ width: "20px" }}
                ></img>
                Stars/hours
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Project;
