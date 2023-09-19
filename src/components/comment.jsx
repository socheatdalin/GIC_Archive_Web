import React from 'react'
import '../styles/comment.css'
function comment() {
  return (
    <>
  
    <div class="container ">
    <div class="row">
        <h6>Comments</h6>
    </div>
    </div>
    <div class="container mt-1 d-flex justify-content-evenly">
    <div class="row">
        <div class="col-md-8 d-none d-lg-block mr-4">
        <div class="input-group mb-3 ">
            <input type="text" class="form-control " placeholder="Add a comment" aria-describedby="button-addon2" ></input>
            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Post</button>
        </div>
            <div class="case">
                <ul class="list-unstyled ">
                  
                    <li class="media d-flex"> <span class="icons round pt-2"><img src="https://img.icons8.com/bubbles/100/000000/groups.png" class="align-self-start " alt='icons'></img></span>
                        <div class="media-body">
                            <div class="row ">
                                <h6 class="user pt-2">Michael Andrews</h6>
                                <div class="ml-auto ">
                                    <p class="text d-flex">3m</p>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li class="media my-5 d-flex"> <span class="round"><img src="https://img.icons8.com/office/100/000000/user-group-man-man--v1.png" alt ='icons' class="align-self-start mr-3" /></span>
                        <div class="media-body">
                            <div class="row">
                                <h6 class="user">Giana Ekstrom Bothman</h6>
                                <div class="ml-auto ">
                                    <p class="text d-flex">2h</p>
                                </div>
                            </div>
                            <p class="text">Commented on your"Le Doux" Artwork</p>
                            <div class="media mt-3 comment  d-flex"> <img src="https://img.icons8.com/bubbles/100/000000/lock-male-user.png" alt ='icons' class="icons align-self-center mr-1" />
                                <div class="media-body pt-3">
                                    <p class="reply">"Love this art, what inspired you to make this "</p>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </div>

      
    </div>
</div>

</>
  )
}

export default comment