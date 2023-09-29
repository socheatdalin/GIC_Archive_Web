import React from 'react';
import Analytic from "../../assets/Analytics Lab.jpg"

function aboutus() {
  return (
    <>
    <div>
      <div className="container pb-5">
      <div className="row ">
        <div className="col-lg-6 d-flex flex-column pt-4 pt-lg-0 order-2 order-lg-1">
                     <img src={ Analytic } class="img-fluid" style={{width: '80%'}} alt="" />
        </div>
        <div class="col-lg-6 order-2 order-lg-1 pt-3 justify-content-center pt-5">
           <h3 className = "fw-bold MuiTypography-root MuiTypography-h1 css-1l41qki-MuiTypography-root ">How does it help our Study</h3>
           <div className='d-flex'>
            <div className='pt-5 d-flex align-items-center gap-3'>
                <img src='https://cdn-icons-png.flaticon.com/512/189/189249.png' alt='download' style={{width: '20%'}}/>
                <div className='pt-3'>
                     <h6 className='fw-semibold'>Download</h6>
                      <p>It's make the user able to install the file pdf</p>
                </div>
            </div>
            <div className='pt-5 d-flex align-items-center gap-3'>
                <img src='https://www.bgs.ac.uk/wp-content/uploads/2021/12/GitHub_logo.jpg' alt='git hub' style={{width: '35%'}}/>
                <div className='pt-3'>
                     <h6 className='fw-semibold'>Git Control</h6>
                      <p>User will be able to store and get the code more easier.</p>
                </div>
            </div>
                
           </div>
        </div>
        
      </div>
      
    </div>

    </div>
    </>
    
  );
}
export default aboutus;