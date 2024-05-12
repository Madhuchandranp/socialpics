const mongoose=require('mongoose')
const imageschema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    // userEmail:{
    //     type:String,
    //     required:false
    // }
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }]
   
})

const Image=mongoose.model("Image",imageschema)

module.exports=Image