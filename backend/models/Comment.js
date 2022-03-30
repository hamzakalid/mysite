const mangoose = require('mongoose');

const commentSchema = mangoose.Schema({
  content : {
    type : String,
    required : true,
  },
  user : {
    type : String,
    required : true,
  },
  date : {
    type : Date,
    default : Date.now,
  },
  post : {
    type : String,
    required : true,
  },
  likes : {
    type : Number,
    default : 0,
  },
  dislikes : {
    type : Number,
    default : 0,
  },
  replies : [{
    type : String,
  }],
});
