import React, { Component } from 'react';
import {FcLikePlaceholder , FcLike } from 'react-icons/fc';
// import '../styles/LikeButton.css'; // Import the CSS file

class LikeButton extends Component {
  constructor() {
    super();
    this.state = {
      likes: 0,
      liked: false,
    };
  }

  handleLikeClick = () => {
    this.setState((prevState) => ({
      likes: prevState.liked ? prevState.likes - 1 : prevState.likes + 1,
      liked: !prevState.liked,
    }));
  };

  render() {
    const { likes, liked } = this.state;

    return (
      <div className="like-button-container"> {/* Apply the container class */}

                  <button className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2" onClick={this.handleLikeClick}>
                    {liked ? (
                            <>
                              <FcLike /> 
                            </>
                        ) : (
                            <>
                              <FcLikePlaceholder />
                            </>
                        )}
          {/* {likes} */}
                  </button>
      </div>
    );
  }
}

export default LikeButton;
