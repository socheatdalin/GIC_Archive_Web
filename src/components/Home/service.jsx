import React from 'react'
import '../../styles/service.css'
import user from "../../assets/user-interface.png"
import network from "../../assets/local-area-network.png"
import web from "../../assets/ux.png"
function service() {
  return (
    <div className='service'>
        <section id="services" class="services section-bg bg-aliceblue ">
    <div className="container" data-aos="fade-up">

      <div className="section-title">
        <h3 className='text-center pt-5 fw-semibold'>What we do</h3>
        <p className='px-3 text-center'>Here are some overview of our works</p>
      </div>
      <div className='project pl-5'>
         <div className="card shadow">
            <img src={web} class="card-img-top rounded mx-auto d-block" alt=""></img>
            <div class="card-body">
                <h5 class="card-title fw-semibold">Web Development</h5>
                <p class="card-text">Web development is a dynamic field that requires continuous learning and adaptation to new technologies, trends, and best practices.</p>
               
            </div>
        </div>
        <div className="card shadow ">
            <img src={user} class="card-img-top rounded mx-auto d-block" alt="mobile"></img>
            <div class="card-body">
                <h5 class="card-title fw-semibold">Mobile</h5>
                <p class="card-text">Mobile technology has not only transformed how we communicate but also how we access information and manage our daily lives. </p>
               
            </div>
        </div>
        <div className="card shadow ">
            <img src={network} class="card-img-top rounded mx-auto d-block" alt="mobile"></img>
            <div class="card-body ">
                <h5 class="card-title fw-semibold">Network</h5>
                <p class="card-text">Networking is a complex and essential field, serving as the backbone of modern communication and the digital age.</p>
               
            </div>
        </div>
        
      </div>
     
    </div>

        
        </section>
  </div>
  )
}
export default service;
