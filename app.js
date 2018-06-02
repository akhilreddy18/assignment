var express = require("express");
var app = express();
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
//app.use("public");

 var candidates = [
        {name: "Akhil", age: "22"},
        {name: "Indra", age: "25"},
        {name: "Zaahid", age:"30"},
        {name: "Akhil", age: "22"},
        {name: "Indra", age: "25"},
        {name: "Zaahid", age:"30"},
        {name: "Akhil", age: "22"},
        {name: "Indra", age: "25"},
        {name: "Zaahid", age:"30"}
    ];

app.get("/", function(req, res){
    res.redirect("candidates");
});

app.get("/candidates", function(req, res){
    res.render("candidates", {candidates: candidates});
});

app.post("/candidates", function(req, res){
    var name = req.body.name;
    var age = req.body.age;
    var newcandidate = {name: name, age: age};
    candidates.push(newcandidate);
    res.redirect("/candidates");
});

app.get("/candidates/new", function(req, res){
    res.render("new");
});

app.get("/careers", function(req, res){
    res.render("careers");
});

app.get("/contact", function(req, res){
    res.render("careers");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.listen(3000, function(){
    console.log("Asolvi server has started");
});