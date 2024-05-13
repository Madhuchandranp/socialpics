const mongoose = require('mongoose');

const User = require('../module/userschema');

 const Comment = require("../module/commentschema");

 const Image=require('../module/imageschema')

//  const postcomment = async (req, res) => {
//   try {
//     const { imageId,text } = req.body;
//     const user= req.user;
//     console.log("User",user);
//     console.log(req.body);

//     // const validImageId = Types.ObjectId(imageId);

//     const newComment= new Comment({ imageId, text, email: user._id});
//     await newComment.save();
//     res.status(201).json(newComment);
//   } catch (error) {
//     console.error('Error adding comment:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
const postcomment = async (req, res) => {
  try {
    const { imageId, text,userId } = req.body.data;
    
  console.log(req.body);
  console.log("imageId:", imageId); 
  console.log("text:", text); 
  console.log("userId:", userId); 

  
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(408).json({ error: 'User not found' });
    }

    const image = user.images.find(img => img._id.toString() === imageId);
    
    if (!image) {
      return res.status(409).json({ error: 'Image not found' });
    }

 
    image.comments.push({ commentText: text, userEmail: user.email });
    await user.save();
    // const comment = await User.imageId.comments.push({  text, user });
    res.status(201).json(image.comments);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    // Delete the comment document
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const postReply = async (req, res) => {
  try {
    const { parentCommentId, replyText } = req.body;
    // Find the parent comment and add a reply
    const parentComment = await Comment.findById(parentCommentId);
    parentComment.replies.push({ text: replyText });
    await parentComment.save();
    res.status(201).json(parentComment);
  } catch (error) {
    console.error('Error replying to comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// const getcomment= async (req, res) => {
//   try {
//     const { imageId } = req.params;
//     const comments = await Comment.find({imageId});
//     res.status(200).json(comments);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const getcomment = async (req, res) => {
  try {
    const { imageName } = req.params;
    
    // Find the image using the imageName
    const image = await Image.findOne({ imageName });

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imageId = image._id;

    const comments = await Comment.find({ imageId });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




module.exports={
       postcomment,
       postReply,
       deleteComment,
       getcomment,
    }



  