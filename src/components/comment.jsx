import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { useParams } from "react-router-dom";

import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

function Comment({ text, theme, project_id, thesis_id }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/comment/thesis/${id}`)
      .then((response) => {
        setComments(response.data);
        setPhoto(response.data[0].filepath);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const addComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/comment/create",
        {
          comment_text: commentText,
          project_id,
          thesis_id,
          student_id: user ? user.id : null, // Include the user's ID in the request
          teacher_id: user ? user.teacher_id : null,
        }
      );
      setComments([...comments, response.data]); // Add the new comment to the comments array
      setCommentText("");
      window.location.replace(window.location.href);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/comment/delete/${id}`
      );

      if (response.status === 200) {
        console.log("Comment deleted successfully");
        window.location.replace(window.location.href);
      } else {
        console.error(
          "Error deleting comment:",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const [displayedCommentCount, setDisplayedCommentCount] = useState(3);

  const loadMoreComments = () => {
    setDisplayedCommentCount(displayedCommentCount + 3); // Increase the number of displayed comments
  };

  const CommentComponent = ({ comment, index }) => (
    <div className="comment-container d-flex justify-content-around">
      <div className="icon-container">
        <img
          src={`http://localhost:3001/static/${comment.imagepath}`}
          className="rounded-circle"
          width="60"
          alt="pic"
        />
      </div>
      <div className="comment-content">
        <div className="user-info">
          <h6 className="user fw-bold">{comment.student_username}</h6>
          <h6 className="user fw-bold">{comment.teacher_username}</h6>
          <p className="comment-text">{comment.comment_text}</p>
        </div>
        <p className="timestamp ">{comment.timestamp}</p>
      </div>
      <div>
        {/* <HiOutlinePencilAlt style={{ cursor: "pointer"}} /> */}
        <HiOutlineTrash
          onClick={() => deleteComment(comment.comment_id)}
          style={{ cursor: "pointer", color: "#ff0000" }}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="contain pt-1">
        <div className="row">
          <h5 className="fw-bold">Comments</h5>
        </div>
      </div>
      <div className="contain mt-1">
        <div className={`comment ${theme}-comment`}>
          <div className="row">
            <div className="col-md-8 d-none d-lg-block mx-2">
              <div className="input-group mb-3" style={{ width: "350px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a comment"
                  aria-describedby="button-addon2"
                  value={commentText}
                  name="comment_text"
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={addComment}
                >
                  Post
                </button>
              </div>
              <div className="case">
                <ul className="list-unstyled">
                  <div className="comments-container">
                    {comments
                      .slice(0, displayedCommentCount)
                      .map((comment, index) => (
                        <CommentComponent key={index} comment={comment} />
                      ))}
                  </div>
                  {displayedCommentCount < comments.length && (
                    <div className="d-flex justify-content-center">
                      <button className="btn  " onClick={loadMoreComments}>
                        More{" "}
                      </button>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
