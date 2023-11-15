import React, { useState, useEffect } from "react";
import Web from "../assets/ux.png";
import Mobile from "../assets/user-interface.png";
import Network from "../assets/local-area-network.png";
import Data from "../assets/data-science.png";
import { Link } from "react-router-dom";
import "../styles/Thesis.css";
import star from "../assets/star.png";
import Navbar from "../components/Header/Navbar";
import { FaGithub } from "react-icons/fa";
import Loader from "../components/Loader";

const Thesis = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchLikeCount = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/thesisliked/${id}`);
      if (response.ok) {
        const data = await response.json();
        return data[0].countlike;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Error:", error);
      return 0;
    }
  };

  const fetchDataForCategory = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/thesis/${category}`
      );
      if (response.ok) {
        const data = await response.json();
        const updatedData = await Promise.all(
          data.map(async (thesis) => {
            const likeCount = await fetchLikeCount(thesis.thesis_id);
            return { ...thesis, likeCount };
          })
        );
        setItems(updatedData);
        setSelectedCategory(category);
        setIsLoaded(true);
      } else {

        throw new Error("Failed to fetch thesis for category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/thesis/all");
        if (response.ok) {
          const thesis = await response.json();
          const updatedProjects = await Promise.all(
            thesis.map(async (thesis) => {
              const likeCount = await fetchLikeCount(thesis.thesis_id);
              return { ...thesis, likeCount };
            })
          );
          setItems(updatedProjects);
          setIsLoaded(true);
        } else {
          throw new Error("Failed to fetch thesis");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (!isLoaded) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-5 container">
        <div className=" first-part">
          <div className="d-flex flex-row justify-content-between">
            <div>
              <h2 className="fw-semibold">Thesis</h2>
            </div>
          </div>
          <h6>Everything you need to find in the thesis statement</h6>
        </div>
        <div className="d-flex flex-row rounded-pill justify-content-start grid gap-0 column-gap-2 my-4">
          <div
            className={`Tags d-flex align-items-center justify-content-center p-2 ${selectedCategory === "web" ? "selected-category" : ""
              }`}
            style={{ width: "160px", height: "50px" }}
            onClick={() => fetchDataForCategory("web")}
          >
            <img src={Web} alt="webpage" className="img-fluid img-smaller" />
            <span className="ms-2">Web</span>
          </div>
          <div
            className={`Tags d-flex align-items-center justify-content-center p-2 ${selectedCategory === "mobile" ? "selected-category" : ""
              }`}
            style={{ width: "160px", height: "50px" }}
            onClick={() => fetchDataForCategory("mobile")}
          >
            <img src={Mobile} alt="webpage" className="img-fluid img-smaller" />
            <span className="ms-2">Mobile</span>
          </div>

          <div
            className={`Tags d-flex align-items-center justify-content-center p-2 ${selectedCategory === "network" ? "selected-category" : ""
              }`}
            style={{ width: "160px", height: "50px" }}
            onClick={() => fetchDataForCategory("network")}
          >
            <img
              src={Network}
              alt="webpage"
              className="img-fluid img-smaller"
            />
            <span className="ms-2">Network</span>
          </div>

          <div
            className={`Tags d-flex align-items-center justify-content-center p-2 ${selectedCategory === "datascience" ? "selected-category" : ""
              }`}
            style={{ width: "160px", height: "50px" }}
            onClick={() => fetchDataForCategory("datascience")}
          >
            <img src={Data} alt="webpage" className="img-fluid img-smaller" />
            <span className="ms-2">Data Science</span>
          </div>
        </div>
        <div className="trending my-5">
          <h3 className="fw-semibold">Trending Thesis</h3>
        </div>
        {items.map((item) => (
          <div className="shadow p-2 mb-5 bg-body-tertiary rounded d-lg-block ">
            <div className="card-body row ">
              <div className="col-lg-3 col-md-4 col-sm-12">
                <img
                  src={`http://localhost:3001/static/${item.imagePath}`}
                  alt="pic"
                  className="img-fluid img-thesis"
                ></img>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12">
                <div className="row">
                  <div className="information col-lg-9">
                    <div key={item.id}>
                      <h4 className="fw-semibold">{item.title} </h4>
                      <h6 className="text-primary text-opacity-75">
                        <FaGithub /> {item.github_url}
                      </h6>
                      <p className="text-secondary">{item.descr}</p>
                      <Link to={`/thesis/${item.thesis_id}`}>
                        <button className="btn btn-outline-primary fw-bolder">
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <button className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">
                      <img src={star} className=" img-star" alt="pic"></img>
                      {item.likeCount}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Thesis;
