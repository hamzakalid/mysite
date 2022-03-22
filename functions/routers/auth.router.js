/* eslint-disable padded-blocks */

const admin = require("firebase-admin");
const express = require("express");
const auth = require("firebase/auth");
// const { getAuth } = require("firebase/auth");
// const firebase = require("firebase/app");

// firebase.initializeApp(functions.config().firebase);

admin.initializeApp({
  apiKey: "AIzaSyBrTgNqcy0ufEevrR_AeFRYTBsbEisJzME",
  authDomain: "test-firebase-db-b2391.firebaseapp.com",
  projectId: "test-firebase-db-b2391",
  storageBucket: "test-firebase-db-b2391.appspot.com",
  messagingSenderId: "957110827948",
  appId: "1:957110827948:web:2c9da7a9ff96262d26d809",
});
// auth.initializeApp(admin.app());
const db = admin.firestore();

// eslint-disable-next-line new-cap
const router = express.Router();
// Login router
router.post("/login", (req, res)=>{
});

router.post("/signup", (req, res)=>{
  // Create new user
  console.log(req.body);
  db.collection("users").add({

    uid: req.body.uid,
    email: req.body.email,
    displayName: req.body.displayName,
    photoURL: req.body.photoURL,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),

  }).then((result)=>{

    return res.status(200).send({
      msg: "User created successfully",
    });

  }).catch((err)=>{

    return res.status(500).send({

      msg: "Error creating user",
      error: err,

    });

  });
});
router.get("/check/:actionCode", (req, res)=>{
  console.log(req.params.actionCode);
  // const auth =getAuth()
  auth.applyActionCode(req.params.actionCode).then((result)=>{

    return res.status(200).send({
      msg: "Action code applied successfully",
      a: req.params.actionCode,
    });
  }).catch((err)=>{
    return res.status(500).send({
      msg: "Error applying action code",
      error: err,
    });
  });
});
module.exports = router;
