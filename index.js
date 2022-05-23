// const http = require('http');
// const fs = require('fs');
// const server = http.createServer(function (req, res) {
    
//     if(req.url=="/"){
//         res.write("Hello zee")
//         res.end();
//     }
//     else if(req.url=="/home"){
//         const homePage = fs.readFileSync("home.html");
//         res.write(homePage);
//         res.end()
//     }
// })

// server.listen(3000,function () {
//     console.log("Listening the server...");
// })


// ------------------------------------------------------------------------------------------------

const express = require('express');
const path = require('path');
var bodyparser = require('body-parser');
var db = require('./DatabaseConnector')

const {User,Quizez,ScoreList} = require('./Schemas')

const fs = require('fs')
const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//Pages and templates..

app.get("/LoginPage",(req,res) => {
    res.sendFile(path.join(__dirname, '/public/html/LoginPage.html'))
})
app.get("/SignUpPage",(req,res) => {
    res.sendFile(path.join(__dirname, '/public/html/SinUpPage.html'))
})

app.get("/Dashboard",async (req,res) => {
    const response = await ScoreList.find({}); 
    console.log(req.query.id)
    res.render("Dashboard.ejs",{fistName:req.query.fistName,listOfScores:response,link_addnewquestion:`/CreateQuizQuestion?_id=${req.query.id}`,link_viewallquestions:`/ListOfAllQuestions?_id=${req.query.id}`})
})
app.get("/CreateQuizQuestion",(req,res) => {
    res.render("CreateQuizQuestion",{_id:req.query._id,link:`/addQuestion?_id=${req.query._id}`})
})

app.get("/ListOfAllQuestions", async (req, res) => {
    const response = await Quizez.find({});
    let quizQuestionList=[]   
    try {    
    await Promise.all(response.map(async (file) => {
        console.log(file.CreatedBy.toString())
        const creatorData = await User.find({_id:file.CreatedBy.toString()})
        console.log(creatorData[0].userName)
        quizQuestionList.push({
            quizItem:file,
            authorName:creatorData[0].userName,
            delete_link:`/deleteQuestionById?question_id=${file._id}&_id=${req.query._id}`
        })
    }));
    }catch (error) {
        console.log(error);
    }

    res.render("ListOfAllQuestions",{_id:req.query._id,quizQuestionList})
})
//Database crude operations 

app.get('/deleteQuestionById', function(req, res) {
    // console.log(req.query.question_id)
    Quizez.deleteOne({_id: req.query.question_id},(err)=>{
        if(!err) {
            res.redirect(`/ListOfAllQuestions?_id=${req.query._id}`)
        }
        else {
            res.send("Error in deleting")
        }
    })
    
})

app.post('/createUserAccount', async (req, res) => {
    // const homePage = fs.readFileSync("home.html")
    // res.send({
    //     responseMessage: "Its home page"
    // })
    // res.sendFile(path.join(__dirname, "/public/html/home.html"))
    // res.json(" :) ")

    const userHandler = new User(req.body);
    try {
        const user = await userHandler.save();
        console.log(user);

        res.render('Dashboard.ejs')
      } catch (error) {
        res.status(500).send(error);
      }
})

app.post("/login", async (req, res) => {
    const response = await User.find({
        userName: req.body.userName,
        password: req.body.password
    });
    console.log(response)
    try {
        if(response!=[])
        res.redirect(`/Dashboard?id=${response[0]._id}&fistName=${response[0].fistName}`)
        // res.sendFile(path.join(__dirname, "/public/Dashboard.html"))
        else       
        res.sendFile(path.join(__dirname, "/public/LoginPage.html"))
  
    } catch (error) {
      res.status(500).send(error);
    }
})

app.post("/addQuestion",async (req, res) => {
    const quizHandler = new Quizez({
        Question:req.body.message,
        Options:req.body.options,
        RightAnswer:req.body.right_answer,
        CreatedBy:req.query._id
    });
    try {
        await quizHandler.save();
        // res.send(quizHandler);
        res.render("CreateQuizQuestion",{_id:req.query._id,link:`/addQuestion?_id=${req.query._id}`})
      } catch (error) {
        res.status(500).send(error);
      }
})

app.get("/getAllQuestions", async (req, res)=>{
    const response = await Quizez.find({});
    try {
    let quizQuestionList=[]   
      
    await Promise.all(response.map(async (file) => {
        console.log(file.CreatedBy.toString())
        const creatorData = await User.find({_id:file.CreatedBy.toString()})
        console.log(creatorData[0].userName)
        quizQuestionList.push({
            quizItem:file,
            authorName:creatorData[0].userName
        })
    }));

     res.send(quizQuestionList);
    } catch (error) {
      res.status(500).send(error);
    }
})

app.post("/sumitScore", async (req, res)=>{
    const scoreHandler = new ScoreList(req.body);
    try {
        const item = await scoreHandler.save();
        console.log(item);
        res.send({"responsePayload":item})
      } catch (error) {
        res.status(500).send(error);
      }
})
app.get("/scoreList", async (req, res) => {
    const response = await ScoreList.find({});
    res.send(response)
})

app.listen(3001,function(){
    console.log("Listening on port 3000...");
})
