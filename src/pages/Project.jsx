import React, { Component } from "react";
import Navbar from "../components/Header/Navbar";
import { Link } from "react-router-dom";
import pic from "../assets/SNA.jpg";
import "../styles/project.css";
import star from "../assets/star.png";
import Drop from "../components/drop";
import "reactjs-popup/dist/index.css";
import { FaGithub } from 'react-icons/fa';
class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/admin/project/all")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <Navbar />
        <div className="p-5 container ">
          <div className="trending my-3 d-flex flex-row justify-content-between">
            <div>
              <h2 className="fw-semibold">Trending Projects</h2>
            </div>
            <Drop />
          </div>
          {items.map((item) => (
            <div className="shadow  p-2 mb-5 bg-body-tertiary rounded d-lg-block ">
              <div className="card-project row ">
                <div className="col-lg-3 col-md-4 col-sm-12">
                  <img
                    src={pic}
                    className="img-project img-fluid"
                    alt="pic"
      
                  ></img>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="row">
                    <div className="information col-lg-9">
                      <div key={item.id}>
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
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12">
                      <button className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">
                        <img src={star} className=" img-star" alt="pic"></img>
                        5, 075
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
}

export default Project;
