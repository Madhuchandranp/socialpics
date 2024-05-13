// // Frontend (React.js)
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useEffect } from 'react';
// import SendIcon from '@mui/icons-material/Send';
// import Button from '@mui/material/Button';
// function CommentForm() {
//   const [text, setText] = useState('');
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get('http://localhost:5500/api/marraige/getcomment');
//         setComments(response.data);
//         alert(`Image uploaded successfully!`)
//       } catch (error) {
//         console.error('Error fetching comments:', error);

//       }
//     };

//     fetchComments();
//   }, []);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5500/api/marraige/postcomment', { text });
//       setText('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   return (
//     <div>
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter your comment..."
//       />
//       <Button type="submit"><SendIcon/></Button>
//     </form>
//     <h2>Comments</h2>
//     <ul>
//       {comments.map(comment => (
//         <li key={comment._id}>{comment.text}</li>
//       ))}
//     </ul>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
// import { postcomment } from '../marraige_back/controller/commentcontrol';

function CommentForm({imageId}) {
  
  // const imageId=postcomment;
  // console.log("imgid",postcomment);
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  console.log("Comments",comments,imageId);

  const userId=localStorage.getItem("userId")
  console.log("comuser",userId);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (postcomment) {
        const response = await axios.get(`http://localhost:5500/api/marraige/getcomment/${postcomment}`);
        const updatedComments = response.data.map(comment => ({
          ...comment,
          user: currentUser
        }));
        setComments(updatedComments);
      }

      } catch (error) {

        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postcomment,currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        imageId,
        text,
        userId,
        // imageName: imageName 
      };
    
      const res = await axios.post('http://localhost:5500/api/marraige/comment/postcomment', {data});
      setText('');
      console.log(res.data);

      // Refresh comments after posting
      // fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    alert('comment added successfully!');

  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/marraige/deletecomment/${id}`);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleReply = async (parentid, replyText) => {
    try {
      await axios.post('http://localhost:5500/api/marraige/postreply', { parentid, replyText });
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Write your comment here, `}/>
          <Button type="submit"><SendIcon/></Button>
      
      </form>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>{comment.user}: {comment.text}
           <Button onClick={() => handleDelete(comment._id)}>Delete</Button>
            <Button onClick={() => handleReply(comment._id, 'Your reply text')}>Reply</Button>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentForm;
