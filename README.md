# Express-js
This template will be usefull to create an express js application.

Some commonly used code snippets.


npm install ejs
npm install express
npm install mongoose
npm install pug
npm install express-fileupload
npm install body-parser
npm install bcrypt
npm install jest
npm install supertest
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @mui/icons-material
npm install react-bootstrap bootstrap

[
	When you are using the react bootstrap then remember to add this link in index.html
	  <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
	/>
]


 /////////////// ------------- JEST ----------------////////////


[
	add this in json scripts tag :   "test": "jest --coverage"
	for running the test flie : npm test 
]



////////////// ------------- EXPRESS JS- ----------/////////////


var express = require('express');

var path = require('path');

var bodyparser = require('body-parser');

var fileUpload = require('express-fileupload');

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public'))) 

app.set('views',path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

app.use(fileUpload())




///////////// ------------ FORMIC ------------ ////////////////


`npm i formik`

//////////----------redux--------------////////////////

`https://github.com/the-road-to-learn-react/react-redux-example`

`https://dmitripavlutin.com/react-usereducer/`

///////////////// ---------- DATABASE ---------- /////////////////


const mongoose = require("mongoose");

mongoose.connect(

  `mongodb://localhost:27017/enterprise-mid-2`, 
  
  {
    useNewUrlParser: true,  
    useUnifiedTopology: true   
  } 
  
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {

  console.log("Connected successfully to local db");
  
});

module.exports=db;


/////////////////// --------------------- SAMPLE SCHEMA -----------/////////


const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

var Schema = mongoose.Schema

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
    image:{
        type: String,
        required: false,
    }
});

UserSchema.pre("save", function(next){
    const record=this;
    bcrypt.hash(record.password,5,function(err,hash){
        console.log("Applying hash")
        record.password = hash;
        next();
    })
})

const Users = mongoose.model("User", UserSchema);

module.exports = {Users};

<!-- Verfiy user -->

const verifyUserAccount=(req,res)=>{
    Users.findOne({userName:req.body.userName},(error,user)=>{
        if(!error) {
            console.log(user)
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                // result == true
                if(result) {
                    res.redirect(`/Dashboard?user_id=${user._id}`)
                }
                else {
               
                    res.render("Error",{error_message:"User name or passwod does not match!!"})
                }
            })
        }
        else{
            res.render("Error",{error_message:error.message})
        }
    })
   
}

<!-- Create Account -->

const createUserAccount=(req,res)=>{
    // console.log(req.files)
    const image=req.files.image
    console.log("rec image")
    console.log(image)
    image.mv(path.resolve(__dirname,'../../public/images',image.name),(error)=>{
        Users.create({...req.body,image:image.name},(error,user)=>{
            console.log(user)
            res.redirect(`/Dashboard?user_id=${user._id}`)  
        })
    });
}


<!-- Update -->

Todo.findByIdAndUpdate(id,{description:description,image:image.name},(error, doc)=>{
                        if(!error){
                            res.redirect('/api/viewAllTodos')
                        }
                        else{
                            res.redirect('/api/updateItem')
                        }
                    })

<!-- Delete -->
const removeQuestion = (req, res) => {
    Quiz.deleteOne({_id:req.query._id},(error)=>{
        if(!error)
        {
            console.log("Delte")
            res.redirect(req.get('referer'));
        }
        else{
            res.send(error.message)
        }
    })
}

<!-- Joining two collections -->
const renderViewMyQuestionsPage=async (req,res)=>{
    const response = await Quiz.find({CreatedBy:req.query.user_id});
    let quizQuestionList=[]    
    try {    
    await Promise.all(response.map(async (file) => {
        console.log(file.CreatedBy.toString())
        const creatorData = await Users.find({_id:file.CreatedBy.toString()})
        quizQuestionList.push({
            quizItem:file,
            authorName:creatorData[0].userName,
        })
    }));
    }catch (error) {
        console.log(error);
    }
    console.log(quizQuestionList)
    res.render('ViewMyQuestions',{user_id:req.query.user_id,quizQuestionList:quizQuestionList});
}

<!-- Forms  -->

 enctype="multipart/form-data"
 
 <form action="/action_page.php">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Submit">
</form> 


<form>
  <input type="radio" id="html" name="fav_language" value="HTML">
  <label for="html">HTML</label><br>
  <input type="radio" id="css" name="fav_language" value="CSS">
  <label for="css">CSS</label><br>
  <input type="radio" id="javascript" name="fav_language" value="JavaScript">
  <label for="javascript">JavaScript</label>
</form> 



<form action="/action_page.php">
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  <label for="vehicle1"> I have a bike</label><br>
  <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
  <label for="vehicle2"> I have a car</label><br>
  <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
  <label for="vehicle3"> I have a boat</label><br><br>
  <input type="submit" value="Submit">
</form> 


<select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>


