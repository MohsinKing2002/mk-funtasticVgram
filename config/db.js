const mongoose = require('mongoose');

exports.connectDB = ()=>{
    mongoose.connect(process.env.DB)
    .then(res => console.log(`DB connected with ${res.connection.host}`));
}