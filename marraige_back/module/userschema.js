const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    images: [
        {
            imageName: String,
            comments: [
                {
                    commentText: String,
                    userEmail: String
                }
            ]
        }
    ]
});


const User = mongoose.model("user", userSchema)

module.exports = User


// const userSchema = new mongoose.Schema({
    
// const User = mongoose.model("user", userSchema);

// module.exports = User;
