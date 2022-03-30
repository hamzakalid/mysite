/* eslint-disable space-before-blocks */
/* eslint-disable padded-blocks */

// const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
// const sotrage =require("firebase/storage");

const db = admin.firestore();

// eslint-disable-next-line new-cap
const router = express.Router();
// const storageRef = admin.storage().bucket("gs://test-firebase-db-b2391.appspot.com");

// This function is used to get all the posts
router.get("", (req, res)=>{
  const data = db.collection("posts").get();
  const posts = [];

  data.then((snapshot)=>{
    snapshot.forEach((doc)=>{
      const post = doc.data();
      post.id = doc.id;
      posts.push(post);
    });
    res.json({
      message: "Posts fetched successfully",
      posts: posts,
    });
  });
});

// This function is use to add a new post
router.post("", (req, res)=>{

  const post ={
    title: req.body.title,
    content: req.body.content,
    cover: req.body.cover,
    userId: req.body.userId,
    likes: 0,
    comments: [],
    category: "",
    created_at: new Date(),
    updated_at: new Date(),
  };
  console.log(post);

  db.collection("posts").add(post).then((doc)=>{
    return res.status(200).json({
      message: "Post added successfully",
      post: {
        id: doc.id,
        data: post,
      },
    });
  });

});

// This function is used to update a post
router.put("/:id", (req, res)=>{
  const post = {
    title: req.body.title,
    content: req.body.content,
    cover: req.body.cover,
    likes: req.body.likes| 0,
    comments: req.body.comments| [],
    category: req.body.category| "",
    created_at: new Date(),
    updated_at: new Date(),
  };

  db.collection("posts").doc(req.params.id).update(post).then(()=>{
    return res.status(200).json({

      message: "Post updated successfully",
      post: {
        id: req.params.id,
        data: post,
      },

    });
  });
});


// This function is used to delete a post
router.delete("/:id", (req, res)=>{
  db.collection("posts").doc(req.params.id).delete().then(()=>{
    return res.status(200).json({
      message: "Post deleted successfully",
    });
  });
});

// This function is used to get a post by id
router.get("/:id", (req, res)=>{
  db.collection("posts").doc(req.params.id).get().then((doc)=>{
    if (!doc.exists){
      return res.status(404).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      message: "Post found",
      post: {
        id: doc.id,
        data: doc.data(),
      },
    });
  });
});

// This function is used to like a post
router.get("/like/:id", (req, res)=>{
  const post = db.collection("posts").doc(req.params.id);
  post.get().then((doc)=>{
    if (!doc.exists){
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const newLikes = doc.data().likes + 1;
    post.update({
      likes: newLikes,
    });
    console.log(newLikes);
    return res.status(200).json({
      message: "Post liked successfully",
      post: {
        id: doc.id,
        data: doc.data(),
      },
    });
  });
});

// This function to dislike a post
router.get("/dislike/:id", (req, res)=>{
  const post = db.collection("posts").doc(req.params.id);
  post.get().then((doc)=>{
    if (!doc.exists) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const newLikes = doc.data().likes - 1;
    if (newLikes > 0){
      post.update({
        likes: newLikes,
      });
    }
    return res.status(200).json({
      message: "Post disliked successfully",
      post: {
        id: doc.id,
        data: doc.data(),
      },
    });
  });
});

// This function to add a comment to a post
router.post("/:id/comment", (req, res)=>{
  const comment = {
    id: req.body.id,
    content: req.body.content,
    user: req.body.user,
    replayOn: req.body.replayOn || null,
    created_at: req.body.created_at,
  };

  const post = db.collection("posts").doc(req.params.id);

  post.get().then((doc)=>{
    if (!doc.exists) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    // Get All comments
    const comments = doc.data().comments;

    // Add new comment
    comments.push(comment);

    // Save
    post.update({
      comments: comments,
    });

    return res.status(200).json({
      message: "Comment added successfully",
      post: {
        id: doc.id,
        data: doc.data(),
      },
    });

  });

});

// this function use to update one prop
router.put("/:id/one", (req, res)=>{
  const prop = req.body.prop;
  const value = req.body.value;
  const col = req.body.col;
  const post = db.collection(col).doc(req.params.id);
  post.get().then((doc)=>{
    if (!doc.exists){
      return res.status(404).json({
        message: "Post not found",
      });
    } else {
      post.update({
        [prop]: value,
      });
      return res.status(200).json({
        message: "Post updated successfully",
        post: {
          id: doc.id,
          data: doc.data(),
        },
      });
    }
  });
});

module.exports = router;
