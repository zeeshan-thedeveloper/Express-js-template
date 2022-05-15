const express = require('express')
const sampleRoute = express.Router();

sampleRoute.get('/', function (req, res){
    const data = ['item 1', 'item 2', 'item 3'];
    res.render('sample',{data});
})

module.exports=sampleRoute;