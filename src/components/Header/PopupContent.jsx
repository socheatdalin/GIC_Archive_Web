import React from 'react';
import "../../styles/userpf.css";
function PopupContent() {
  return (
    <div className="popup-content" style={{display: "none"}}>
        <div class="container d-flex justify-content-center align-items-center" >
             
             <div class="card">

              <div class="upper">
                <img src="https://i.imgur.com/Qtrsrk5.jpg" alt= "" class="img-fluid" />
              </div>

              <div class="user text-center">

                <div class="profile">

                  <img src="https://i.imgur.com/JgYD2nQ.jpg" class="rounded-circle" width="80" alt='' />     
                </div>
              </div>
              <div class="mt-5 text-center">
                <h4 class="mb-0">Benjamin Tims</h4>
                <span class="text-muted d-block mb-2">Student</span>   
                <span class="text-muted d-block mb-2">Gender: Female</span> 
                <span class="text-muted d-block mb-2">Email: khema@gmail.com</span>     
              </div>
               
             </div>

           </div>
  
    </div>
  );
}

export default PopupContent;
