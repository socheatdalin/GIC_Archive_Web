
import React from 'react';
import hero from '../../assets/hero-img.png';
import "../../styles/Home.css";
import Service from './service';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
function Home() {
  return (
    <>
    <Navbar />
   
    <div>
      <div className="container">
      <div className="row">
        <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
          <h1 className = "font-weight-bold MuiTypography-root MuiTypography-h1 css-1l41qki-MuiTypography-root ">Discover a place where you will love to study</h1>
          <h5>All of the project and thesis will be hosting in here</h5>
          <p>Be the first to get the best knowledge before they hit the mass market! Hot Foreclosure deals with one simple search</p>
          <div className=" justify-content-start">
                        <Link to='/login'><button className="btn me-md-2" type="button">Sign in</button></Link>
                    </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 hero-img pt-3" data-aos="zoom-in" data-aos-delay="200">
          <img src={ hero } class="img-fluid animated" alt="" />
        </div>
        
      </div>
      
    </div>
    <Service/>
    <Footer />
    </div>
    </>
    
  );
}
export default Home;