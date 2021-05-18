const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const path = require('path');
const port = 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    res.render('index')
})

app.get("/game", (req, res) => {
    res.render('game')
})

app.get("/highscores", (req, res) => {
    res.render('highscores')
})

app.get("/end", (req, res) => {
    res.render('end')
}) 

const listener = server.listen(port, function () {
    console.log("Your app is listening on port " + listener.address().port);
})
