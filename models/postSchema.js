const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type: String, 
        required: true
    },
    image: {
        public_id: String,
        url: String
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    likes:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    comments:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            comment:{
                type: String
            }
        }
    ],
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post", postSchema);