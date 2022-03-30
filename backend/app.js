//define the expressapi
const express = require('express');

const path = require('path');
const fs = require('fs');

//define the body-parser
/**-----------------------------------------------------------------------------
 * Body-parser is the Node.js body parsing middleware.It is responsible
 * for parsing the incoming request bodies in a middleware before you handle it.
 -------------------------------------------------------------------------------*/
const bodyParser = require("body-parser")

//define the mongoose

const mongoose = require("mongoose");

//define the user router
const router = require('./routers/router');
// Create folder for uploading files.

const app = express();


var filesDir = path.join(path.dirname(require.main.filename), "/public");
console.log(filesDir);
if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
  fs.mkdirSync(path.join(filesDir, "/uploads"));
}
//Connect to the mango database

mongoose.connect("mongodb+srv://hamzakhaled:xTuenKxHuxK7S6q@cluster0.rrhas.mongodb.net/hamzas_blog?")
        .then(()=>{
          console.log("the database is connected :)")
        }).catch(()=>{
          console.log("the connection is faild :(");
        })

//Upload files



// inital the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/images', express.static(path.join('public/uploads')));
// app.use(express.static('public'))
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads/')));

//This error comes becouse the server run one two defrentec servers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept ,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  // res.setHeader("multipart/form-data")
  next();
});
//Auth Router
app.use("/api/",router);
//Post Router

module.exports =app;
