
import React, { useState, useEffect } from 'react';
import { BsFillStarFill, BsStar } from 'react-icons/bs';
import axios from 'axios';
import { useUser } from './UserContext'; // Import the useUser hook

function LikeButton({ project_id, thesis_id }) {
  const { user } = useUser(); // Access user data from the context

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Fetch like data when the component mounts
    const fetchLikeData = async () => {
      try {
        const response = await axios.get(`/like/${project_id}`);
        setLikes(response.data.likes);
        setLiked(response.data.liked);
      } catch (error) {
        console.error('Error fetching like data', error);
      }
    };

    fetchLikeData();
  }, [project_id, thesis_id]);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(`/like`, {
        liked: !liked,
        project_id,
        thesis_id,
        student_id: user ? user.id : null,
        teacher_id: user ? user.teacher_id : null,
      });
      setLikes(response.data.likes);
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like', error);
    }
  };

  const iconFill = 'gold'; // Change this to the desired fill color

  const iconStyle = {
    fill: iconFill,
  };

  return (
    <div className="like-button-container">
      <button
        className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
        onClick={handleLikeClick}
      >
        {liked ? <BsFillStarFill style={iconStyle} /> : <BsStar style={iconStyle} />}
      </button>
    </div>
  );
}

export default LikeButton;
