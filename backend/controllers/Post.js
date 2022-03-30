// This is the Post mangoose model

const Post = require("../models/Post");

// import Post from "../models/Post";

// PostController Class


// this is the getPosts posts
function getPosts(req,res,next){

  // get the queries from the url
  const page = req.query.page;    // current page
  const limit = req.query.limit;  // number of posts per page
  const order = req.query.order;  // order by
  const search = req.query.search; // search by title
  const tag = req.query.tag;    // search by tag
  const author = req.query.author;  // search by author

  // get the posts from the database
  Post.find({})
    .skip(page * limit)
    .limit(limit)
    .sort(order)
    .exec((err,posts)=>{
      if(err){
        return next(err);
      }
      // send the posts to the client
      res.json(posts);
    }
  );
}

// this is the getPost post
function getPost(req,res,next){
  // get the id from the url
  const id = req.params.id;
  // get the post from the database
  Post.findById(id,(err,post)=>{
    if(err){
      return next(err);
    }
    // send the post to the client
    res.json(post);
  });
}

// this is the createPost post
function createPost(req,res,next){
  // get the data from the request
  const data = req.body;
  // create the post
  const post = new Post(data);
  // save the post to the database
  post.save((err,post)=>{
    if(err){
      return next(err);
    }
    // send the post to the client
    res.json(post);
  }
  );
}

// this function is the updatePost post
function updatePost(req,res,next){
  // get the id from the url
  const id = req.params.id;
  // get the data from the request
  const data = req.body;
  // update the post
  Post.findByIdAndUpdate(id,data,(err,post)=>{
    if(err){
      return next(err);
    }
    // send the post to the client
    res.json(post);
  }
  );
}

// this function is the deletePost post
function deletePost(req,res,next){
  // get the id from the url
  const id = req.params.id;
  // delete the post
  Post.findByIdAndRemove(id,(err,post)=>{
    if(err){
      return next(err);
    }
    // send the post to the client
    res.json(post);
  }
  );
}

// this function is the likePost post
function likePost(req,res,next){
  // get the id from the url
  const id = req.params.id;
  // incerase the like
  Post.findByIdAndUpdate(id,{$inc:{likes:1}},(err,post)=>{
    if(err){
      return next(err);
    }
    // send the post to the client
    res.json(post);
  });
}

// this function is the dislikePost post
function dislikePost(req,res,next){
  // get the id from the url
  const id = req.params.id;
  // Decrease the like
  Post.findByIdAndUpdate(id,{$inc:{likes:-1}},(err,post)=>{
    if(err){
      return next(err);
    }
    // send the post to the client
    res.json(post);
  });
}

// this function is the commentPost post
function commentPost(req,res,next){
  // get the id from the url
  const id = req.params.id;
  // get the data from the request
  const data = req.body;
  // update the post
  Post.findByIdAndUpdate(id,{$push:{comments:data}},(err,post)=>{
    if(err){
      return next(err);
    }
    // send the post to the client
    res.json(post);
  });
}

// this function is the deleteComment post
function deleteComment(req,res,next){
  // get the id from the url
  const id = req.params.id;
  // get the comment id from the url
  const commentId = req.params.commentId;
  // delete the comment
  Post.findByIdAndUpdate(id,{$pull:{comments:{_id:commentId}}},(err,post)=>{
    if(err){
      return next(err);
    }
    // send the post to the client
    res.json(post);
  });
}

// this function is the replyComment post
function replyComment(req,res,next){
  // get the id from the url
  const id = req.params.id;
  // get the comment id from the url
  const commentId = req.params.commentId;
  // get the data from the request
  const data = req.body;
  // update the post
  Post.findByIdAndUpdate(id,{$push:{'comments.$.replies':data}},(err,post)=>{
    if(err){
      return next(err);
    }
    // send the post to the client
    res.json(post);
  }
  );
}

// this function is the deleteReply post
function deleteReply(req,res,next){
  // get the id from the url
  const id = req.params.id;
  // get the comment id from the url
  const commentId = req.params.commentId;
  // get the reply id from the url
  const replyId = req.params.replyId;
  // delete the reply
  Post.findByIdAndUpdate(id,{$pull:{'comments._id':{_id:commentId},replies:{_id:replyId}}},(err,post)=>{
    if(err){
      return next(err);
    }
    // send the post to the client
    res.json(post);
  }
  );
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  commentPost,
  deleteComment,
  replyComment,
  deleteReply

};
