const mongoose = require("mongoose")


//Create and schema [the Structure]
const postSchema = mongoose.Schema({
  title : {
    type : String,
    required: true,
  },

  description : {
    type :String,
    required : true,
  },
  content : {
    type :String,
    required : true,
  },
  cover : {
    type : String,
  },
  likes:{
    type : Number,
    default : 0,
  },
  views:{
    type : Number,
    default : 0,
  },
  comments : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Comment",
  }],
  user : {
    type :String,
  },
  date : {
    type :Date,
  }

})

//Make this schema valid for other files
module.exports = mongoose.model('Post ',postSchema);
