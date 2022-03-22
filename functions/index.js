const functions = require("firebase-functions");

// nodeJs packages
const express = require("express");
const cors = require("cors");

const authRouter = require("./routers/auth.router.js");
const postRouter = require("./routers/posts.router.js");

const app = express();

// create a new router instance
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use(cors({origin: true}));

// exprot the app
exports.app = functions.https.onRequest(app);
