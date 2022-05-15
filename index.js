const express = require('express');
const path = require("path");
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))

const port = process.env.PORT || "8000";

var sampleRoute = require('./routes/sampleRoute')

app.get("/", (req, res) => {
    res.status(200).send("This is basic template.");
});

//Replace with your.
app.use("/template",sampleRoute);



app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
