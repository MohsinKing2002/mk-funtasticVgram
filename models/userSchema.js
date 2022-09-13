const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required !!!"]
    }, 
    email:{
        type: String,
        required: [true, "email is required !!!"],
        unique: [true, "email already exists !!!"]
    }, 
    password:{
        type: String,
        required: [true, "password is required !!!"],
        select: false
    }, 
    avatar:{
        public_id: String,
        url: String
    },
    posts:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "Post"
        }
    ],
    followings:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    followers:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
})

/*************************************** Hash user password before save *************************** */
userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
    }
    
    next();
})

/*************************************** Hash user password before save *************************** */
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

/*************************************** Hash user password before save *************************** */
userSchema.methods.genarateToken = async function(){
    return jwt.sign({_id:this._id}, process.env.SECRET_KEY);
}


module.exports = mongoose.model("User", userSchema);