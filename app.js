const express = require('express');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');
const path = require('path');

//http and cors for socket
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

const app = express();

dotenv.config({path: "./config/config.env"});

//using middlewares
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(cookieParser());

//set up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

//using routes
app.use(require("./routes/userRoute"));
app.use(require("./routes/postRoute"));

//connecting to db
connectDB();

//socket
const server = http.createServer(app);
const io = new Server(server, {});

io.on("connection", (socket)=>{

    socket.on("join_room", (data)=>{
        socket.join(data);
    })

    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("disconnect", ()=>{})
})

//accessing client/build/index.html
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
    });
}

server.listen(process.env.PORT, ()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})