/*
  NodeJS Video Streamer - index.js 
  By: Johnathon Slightham
*/
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const postRoute = require('./post.route');
const fileUpload = require('express-fileupload');

printWelcome();
// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true}).then(
  () => {console.log('Connected to database') },
  err => { console.log('Can not connect to the database: '+ err)}
);

// Express
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/posts', postRoute);
app.listen(8000, function () {
  console.log("Express listening on port 8000");
});

/*
  Get thumbnail for video with :id
*/
app.get("/thumbnails/:id", (req, res) => {
  let id = req.params.id;
  if(id)
    res.sendFile(__dirname + "/thumbnails/" + id + ".jpg");
  else
    res.send(500);
 });

/*
 Stream video with :id
*/
app.get("/video2/:id", (req, res) => {
  
  let id = req.params.id; // ID of video to be streamed

    // Check if the header includes range
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Missing range header");
    }
    
    const videoPath = "videos/" + id + ".mp4"; // path of the video
    const videoSize = fs.statSync("videos/" + id + ".mp4").size; // size of the video
  
    // Parse Range
    const CHUNK_SIZE = 5 ** 6; // Half megabyte
    let start = Number(range.replace(/\D/g, ""));
    let end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
  
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
  
    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
  
    // Stream the video chunk to the client
    videoStream.pipe(res);
  });


function printWelcome(){
  console.log("-----------------------------------");
  console.log("NodeJS-Video-Streamer by jslightham");
  console.log("Version 1.0");
  console.log("-----------------------------------");
  console.log();
}