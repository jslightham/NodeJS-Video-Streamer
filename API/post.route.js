const express = require('express');
const postRoutes = express.Router();
const hbjs = require('handbrake-js')
const fs = require("fs");
const ffmpeg = require('fluent-ffmpeg');

// Require Post model in our routes module
let Post = require('./post.model');

/* 
  Route for uploading a video
  First save the video to API/toTranscode/id.mp4, then use ffmpeg to get a screenshot
  and save the screenshot to API/thumbnails/id.jpg. Then, use handbrake to transcode
  the video to a compressed mp4 for easier streaming. 
*/
 postRoutes.route('/upload').post((req, res) => {
  // Create the post object and initiate the values
  let post = new Post();
  console.log(req.body);
  post.title = req.body.title;
  post.description = req.body.description;
  post.transcoding = true;
  post.progress = 0;
  post.likes = 0;
  post.comments = [];
  
  // Check if a file was included in the uplaod
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }

  const myFile = req.files.file;

  // Place the file into toTranscode directory
  myFile.mv(`${__dirname}/toTranscode/${post._id}.mp4`, err => {
    
    // If there was an error, print it to the console
    if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
    }

    // Save the post to the databse
    post.save();

    // Take a 480p screenshot of the video 50% through, and save it to the
    // thumbnails folder.
    ffmpeg(`${__dirname}/toTranscode/${post._id}.mp4`)
      .screenshots({
        timestamps: ['50%'],
        filename: `${post._id}.jpg`,
        folder: `${__dirname}/thumbnails`,
        size: '704x480'
      });
    
    // Transcode the video in the toTranscode directory to an mp4 using Very Fast 1080p30 preset, and save to videos directory
    hbjs.spawn({ input: `${__dirname}/toTranscode/${post._id}.mp4`, output: `${__dirname}/videos/${post._id}.mp4`, preset: "Very Fast 1080p30" })
      .on('error', err => {
        console.log(err)
      })

      // Save the progress and eta to the database
      .on('progress', prog => {
        post.progress = prog.percentComplete;

        // if the eta is empty, leave it the same
        if (prog.eta) {
          post.eta = prog.eta;
        }
        post.save()
      })

      // When done transcoding, delete the old file, and change status of transcoding to false
      .on('end', () => {
        post.transcoding = false;
        post.save

        // Delete file in toTranscode directory
        fs.unlink(`${__dirname}/toTranscode/${post._id}.mp4`, (err) => {
          // Log deletion error to console
          if (err) {
            console.error(err)
            return;
          }
        })
      })
    return res.send({ name: myFile.name, path: `/${post._id}` });
  });
})

/*
  Route to add a like to video with id of :id
*/
postRoutes.route('/like/:id').get(function (req, res) {
  let id = req.params.id;
  
  // Find the post that has the id
  Post.findById(id, function (err, post) {
    if (err) {
      res.json(err);
    }

    // Add a like and save to database
    post.likes++;
    post.save();
    res.json(post);
  });
});

/*
  Route to add a comment to the video with an id of :id
*/
postRoutes.route('/postComment/:id').post(function (req, res) {
  let id = req.params.id;
  
  // Find the post that has the id
  Post.findById(id, function (err, post) {
    if (err) {
      res.json(err);
    }

    // Push comment on to the comments array, and save it
    post.comments.push(req.body.comment);
    post.save();
    res.json(post);
  });
});


/*
  Get the entry for the video with id of :id
*/
postRoutes.route('/vinfo/:id').get(function (req, res) {
  let id = req.params.id;
  
  // Find the video with id
  Post.findById(id, function (err, post) {
    if (err) {
      res.json(err);
    }
    res.json(post);
  });
});


/*
  Search for all videos that contain query in their title
*/
postRoutes.route('/search').post(function (req, res) {
  let query = req.body.query;

  // Get all posts
  Post.find(function (err, posts) {
    if (err) {
      res.json(err);
    }
    else {
      // Filter for posts that have a title containing query
      posts = posts.filter(post => {
        return post.title.toLowerCase().includes(query.toLowerCase());
      });
      res.json(posts);
    }
  });
});


/*
  Get info for all videos
*/
postRoutes.route('/').get(function (req, res) {
  Post.find(function (err, posts) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(posts);
    }
  });
});

module.exports = postRoutes;