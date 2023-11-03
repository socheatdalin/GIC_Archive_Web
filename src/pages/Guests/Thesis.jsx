import React, { Component } from "react";
import Web from "../../assets/ux.png";
import Mobile from "../../assets/user-interface.png";
import Network from "../../assets/local-area-network.png";
import Data from "../../assets/data-science.png";
import { Link } from "react-router-dom";
import "../../styles/Thesis.css";
import star from "../../assets/star.png";
import { FaGithub } from 'react-icons/fa';
import Header from '../../components/GuestHeader'
class Thesis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  async fetchLikeCount(Id) {
    try {
      const response = await fetch(`http://localhost:3001/thesisliked/${Id}`);
      if (response.ok) {
        const data = await response.json();
        return data[0].countlike; // Assuming the API response is an array with a single object
      } else {
        return 0; // Handle error case
      }
    } catch (error) {
      console.error('Error:', error);
      return 0; // Handle error case
    }
  }


  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3001/admin/thesis/all');
      if (response.ok) {
        const thesis = await response.json();

        // Fetch like count for each project
        const updatedProjects = await Promise.all(
          thesis.map(async (thesis) => {
            const likeCount = await this.fetchLikeCount(thesis.thesis_id);
            return { ...thesis, likeCount };
          })
        );

        this.setState({
          isLoaded: true,
          items: updatedProjects,
        });
      } else {
        throw new Error('Failed to fetch thesis');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <Header />
        <div className="p-5 container">
          <div className=" first-part">
            <div className="d-flex flex-row justify-content-between">
              <div>
                <h2 className="fw-semibold">Thesis</h2>
              </div>
              {/* <Dropdown /> */}
            </div>

            <h6 >Everything you need to find in theis statement</h6>
          </div>
          <div className="d-flex flex-row rounded-pill justify-content-start grid gap-0 column-gap-2 my-4">
            <div
              className="Tags d-flex align-items-center justify-content-center p-2"
              style={{ width: "160px", height: "50px" }}
            >
              <img src={Web} alt="webpage" className="img-fluid img-smaller" />
              <span className="ms-2">Web</span>
            </div>

            <div
              className="Tags d-flex align-items-center justify-content-center p-2"
              style={{ width: "160px", height: "50px" }}
            >
              <img src={Mobile} alt="webpage" className="img-fluid img-smaller" />
              <span className="ms-2">Mobile</span>
            </div>

            <div
              className="Tags d-flex align-items-center justify-content-center p-2"
              style={{ width: "160px", height: "50px" }}
            >
              <img
                src={Network}
                alt="webpage"
                className="img-fluid img-smaller"
              />
              <span className="ms-2">Network</span>
            </div>

            <div
              className="Tags d-flex align-items-center justify-content-center p-2"
              style={{ width: "160px", height: "50px" }}
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
                        <Link to={`/thesisguest/${item.thesis_id}`}>
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
  }
}

export default Thesis;
