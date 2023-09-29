import React, { useState } from 'react';
import axios from 'axios';

const [ID, setID] = React.useState('');
const [project_id, setProjectID] = React.useState('');
const [student_id, setStudentID] = React.useState('');
const [inputProjectID, setInputProjectID] = React.useState('');
const [inputStudentID, setInputStudentID] = React.useState('');


const Post = ({ post, onLike }) => {
  const handleLike = () => {
    // Simulate liking the post by sending a request to the server
    axios.post('/like', { userId: 1, postId: post.id }).then(() => {
      onLike(post.id);
    });
  };

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={handleLike}>Like</button>
      <span>Likes: {post.likes}</span>
    </div>
  );
};

export default Post;
