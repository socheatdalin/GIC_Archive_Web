/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import React from "react";
import "../styles/comment.css";
import axois from "axios";
function comment({ text, theme }) {
  const [comments, setComments] = useState([]);
  const [comment_text, setNewComment] = useState('');


  useEffect(() => {
    fetchComments();
  }, []);


  const fetchComments = async () => {
    // try {
    //   const response = await axois.get('http://localhost:3001/comment/all');
    //   setComments(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const addComment = async () => {
    try {
      const response = await axois.post('http://localhost:3001/comment/create', {
        comment_text: comment_text,
      });
      setComments([...comments, response.data.comment_text]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="contain pt-1">
        <div className="row">
          <h5 className="fw-bold">Comments</h5>
        </div>
      </div>
      <div className="contain mt-1 d-flex justify-content-evenly ">
        <div className={`comment ${theme}-comment`}>
          <div className="row">

            <div class="col-md-8 d-none d-lg-block mr-4">
              <div class="input-group mb-3 ">
                <input
                  type="text"
                  class="form-control "
                  placeholder="Add a comment"
                  aria-describedby="button-addon2"
                  value={comment_text}
                  name="comment_text"
                  onChange={(e) => setNewComment(e.target.value)}
                ></input>
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={addComment}
                >
                  Post
                </button>
              </div>
              <div class="case">
                <ul class="list-unstyled ">
                  {/* {comments.map((comment) => (
                  <li key={comment.comment_id}>
                    <strong>Comment ID:</strong> {comment.comment_id}<br />
                    <strong>Project ID:</strong> {comment.project_id}<br />
                    <strong>Student ID:</strong> {comment.student_id}<br />
                    <strong>Comment:</strong> {comment.comment_text}<br />
                    <strong>Timestamp:</strong> {comment.timestamp}<br /><br />
                  </li>
                ))} */}
                  <li class="media d-flex">
                    {/* {comments.map((comment) => (
                <div key={comment.id}>{comment.student_id}</div>
              ))} */}
                    <span class="icons round pt-2">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/groups.png"
                        class="align-self-start "
                        alt="icons"
                      ></img>
                    </span>

                    <div class="media-body">
                      <div class="row ">
                        <h6 class="user pt-3">Vy</h6>
                        <div class="ml-auto ">
                          {/* <p class="text d-flex">3m</p> */}
                          <p class="reply">
                            "I liked it "
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li class="media d-flex">

                    <span class="icons round pt-2">
                      <img
                        src="https://i.imgur.com/JgYD2nQ.jpg"
                        class="align-self-start "
                        alt="icons"
                      ></img>
                    </span>

                    <div class="media-body">
                      <div class="row ">
                        <h6 class="user pt-3">Khema</h6>
                        <div class="ml-auto ">

                          <p class="reply">
                            wish it more cutter
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default comment;
