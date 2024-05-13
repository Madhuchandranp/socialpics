const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
 
text: String,
replies: [
    {
        text: String
    }
],
date: { type: Date, default: Date.now },

user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },

});
  
  const Comment = mongoose.model('Comment', commentSchema);

  module.exports=Comment
  