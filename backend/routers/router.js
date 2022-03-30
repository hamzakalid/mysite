const express = require('express');

const router = express.Router();


const {getPosts} = require('../controllers/Post');
// start to create routers
function route(prefix,url){
  return `/${prefix}/${url}`;
}

// get all posts
router.get(route("posts",""), (req, res,next) => {
  getPosts(req,res,next);
});

// get one post
router.get(route("posts","/:id"), (req, res,next) => {
  getPost(req,res,next);
});

// create one post
router.post(route("posts",""), (req, res,next) => {
  createPost(req,res,next);
});

// update one post
router.put(route("posts","/:id"), (req, res,next) => {
  updatePost(req,res,next);
});

// delete one post
router.delete(route("posts","/:id"), (req, res,next) => {
  deletePost(req,res,next);
});

// like one post
router.put(route("posts","/:id/like"), (req, res,next) => {
  likePost(req,res,next);
});

// dislike one post
router.put(route("posts","/:id/dislike"), (req, res,next) => {
  dislikePost(req,res,next);
});

// comment one post
router.post(route("posts","/:id/comment"), (req, res,next) => {
  commentPost(req,res,next);
});

// delete one comment
router.delete(route("posts","/:id/comment/:commentId"), (req, res,next) => {
  deleteComment(req,res,next);
});

// reply one comment
router.post(route("posts","/:id/comment/:commentId/reply"), (req, res,next) => {
  replyComment(req,res,next);
});

// delete one reply
router.delete(route("posts","/:id/comment/:commentId/reply/:replyId"), (req, res,next) => {
  deleteReply(req,res,next);
});




module.exports = router;
