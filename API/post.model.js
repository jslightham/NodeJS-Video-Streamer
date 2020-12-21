/*
  NodeJS-Video-Streamer - post.model.js

*/
// Schema for a video post
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  comments: {
    type: Array
  },
  transcoding: {
    type: Boolean
  },
  progress: {
    type: Number
  },
  eta:{
    type: String
  },
  likes:{
    type: Number
  },
},{
    collection: 'posts'
});

module.exports = mongoose.model('Post', Post);