const mongoose = require("mongoose");
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

const Scores = new mongoose.Schema({
    fistName: {
            type: String,
            required: false,
          },  
    userName: {
        type: String,
        required: true,
    },
    score: {
        type: String,
        required: true,
      },
    AttemptedDate:{
        type: String,
        required: true,
    }
    });
    

const UserSchema = new mongoose.Schema({
fistName: {
        type: String,
        required: false,
      }, 
lastName:{
        type: String,
        required: false,
      },  
userName: {
    type: String,
    required: true,
},
password: {
    type: String,
    required: true,
  },
});

const Quiz = new mongoose.Schema({
    Question: {
      type: String,
      required: true,
    },
    Options:[{type: String}],
    RightAnswer:{
       type : String,
    },
    CreatedBy:{
        type:ObjectId
    }
  });

const User = mongoose.model("User", UserSchema);
const Quizez = mongoose.model("Quizez", Quiz);
const ScoreList = mongoose.model("ScoreList", Scores);
 
  module.exports = {User,Quizez,ScoreList};