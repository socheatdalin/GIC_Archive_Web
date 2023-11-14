import React, { useState, useEffect } from "react";
import Navbar from "../components/Header/Navbar";
import { Link } from "react-router-dom";
import star from "../assets/star.png";
import Dropdown from "react-bootstrap/Dropdown";
import "reactjs-popup/dist/index.css";
import { FaGithub } from "react-icons/fa";
import Loader from "../components/Loader";

function Project() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  async function fetchLikeCount(Id) {
    try {
      const response = await fetch(`http://localhost:3001/countlike/${Id}`);
      if (response.ok) {
        const data = await response.json();
        return data[0].countlike;
      } else {
        return 0; // Handle error case
      }
    } catch (error) {
      console.error("Error:", error);
      return 0; // Handle error case
    }
  }
  const fetchDataForCategory = async (eventKey) => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/project/all/${eventKey}`
      );
      if (response.ok) {
        const data = await response.json();
        const updatedData = await Promise.all(
          data.map(async (project) => {
            const likeCount = await fetchLikeCount(project.project_id);
            return { ...project, likeCount };
          })
        );
        setItems(updatedData);
        setIsLoaded(true);
      } else {
        console.error(`Failed to fetch projects for category: ${eventKey}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelect = async (eventKey) => {
    setSelectedCategory(eventKey);
    await fetchDataForCategory(eventKey);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/admin/project/all");
        if (response.ok) {
          const projects = await response.json();

          // Fetch like count for each project
          const updatedProjects = await Promise.all(
            projects.map(async (project) => {
              const likeCount = await fetchLikeCount(project.project_id);
              return { ...project, likeCount };
            })
          );
          // setPhoto(response.data[0].imagepath);
          setItems(updatedProjects);
          setIsLoaded(true);
        } else {
          throw new Error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="p-5 container ">
        <div className="trending my-3 d-flex flex-row justify-content-between">
          <div>
            <h2 className="fw-semibold">Trending Projects</h2>
          </div>
          <div>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {selectedCategory ? selectedCategory : "Filter"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="OperatingSystem">
                  Operating System
                </Dropdown.Item>
                <Dropdown.Item eventKey="Network">Network</Dropdown.Item>
                <Dropdown.Item eventKey="SoftwareEngineering">
                  Software Engineering
                </Dropdown.Item>
                <Dropdown.Item eventKey="InternetProgramming">
                  Internet Programming
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {items.map((item) => (
          <div
            className="shadow  p-2 mb-5 bg-body-tertiary rounded d-lg-block "
            key={item.id}
          >
            <div className="card-project row ">
              <div className="col-lg-3 col-md-4 col-sm-12">
                <img
                  src={`http://localhost:3001/static/${item.imagepath}`}
                  className="img-project img-fluid"
                  alt="project"
                ></img>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12">
                <div className="row">
                  <div className="information col-lg-9">
                    <h4 className="fw-semibold">{item.title} </h4>
                    <h6>Course: {item.course_name}</h6>
                    <h6 className="text-primary text-opacity-75">
                      <FaGithub /> {item.github_url}
                    </h6>
                    <p className="text-secondary">{item.descr}</p>
                    <Link to={`/project/${item.project_id}`}>
                      <button className="btn btn-outline-primary fw-bolder">
                        View
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12">
                    <button className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">
                      <img src={star} className="img-star" alt="star"></img>
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
}

export default Project;
