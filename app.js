var express     = require("express"),
      app       = express(),
       fs       = require("fs"),
 bodyParser     = require("body-parser");
 var uniqid = require('uniqid');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use('/assets',express.static('public'));


function findById(id){
    let data = JSON.parse(fs.readFileSync("data.json"));
    for(var i=0; i<data["results"].length; i++){
        
        if(id == data["results"][i]['id']){
            var candidate = data["results"][i];
        }
    }
    return candidate;
}

function findIndex(id) {
    let data = JSON.parse(fs.readFileSync("data.json"));
    for(var i=0; i<data["results"].length; i++){
        if(id == data["results"][i]['id']){
            return i;
        }
    }
    return -1;
}

// ================Routes===========================

app.get("/", (req, res)=>{
    res.redirect("candidates");
});

app.get("/candidates", (req, res)=>{
    let data = JSON.parse(fs.readFileSync("data.json"));
    let candidates = data['results'];
    res.render("candidates", {candidates: candidates});
});


app.get("/candidates/new", (req, res)=>{
    res.render("new");
});


app.post("/candidates", (req, res)=>{
    let data = JSON.parse(fs.readFileSync("data.json"));
    let candidates = data['results'];
    var name = (req.body.name) ? req.body.name : "";
    var age = (req.body.age) ? req.body.age : "";
    var email = (req.body.email) ? req.body.email : "";
    var newcandidate = {id:uniqid(), name: name, age: age, email:email};
    candidates.push(newcandidate);
    
    let temp ={
      'results':candidates
    }
    let jsonData = JSON.stringify(temp);
    fs.writeFile('data.json', jsonData, 'utf8', (argument)=>{
    });
  
    res.redirect("/candidates");
});


app.get("/careers", (req, res)=>{
    res.render("careers");
});

app.get("/contact", (req, res)=>{
    res.render("careers");
});

app.get("/login", (req, res)=>{
    res.render("login");
});

app.get("/register", (req, res)=>{
    res.render("register");
});


app.get("/candidates/:id", (req, res)=>{
    var candidate = findById(req.params.id);
    res.render("show", {
      candidate:candidate
    });
});


app.get("/edit_candidates/:id", (req, res)=>{
    var candidate = findById(req.params.id);
      res.render('edit_candidate', {
        title:'Edit Candidate',
        candidate:candidate
      });
});


app.post("/edit_candidates/:id",(req,res)=>{
    let data = JSON.parse(fs.readFileSync("data.json"));
    let candidate = {};
    candidate.id = req.params.id;
    var index = findIndex(candidate.id);
    if(index !== -1){
        data["results"][index]['age']=req.body.age;
        data["results"][index]['name']=req.body.name;
        data["results"][index]['email']=req.body.email;
    }
    const jsonData = JSON.stringify(data);
    fs.writeFile('data.json', jsonData, 'utf8', (argument)=>{
        console.log("Details are updated");
    });
    res.redirect('/');
});


app.delete('/candidate_delete/:id',(req, res)=>{
    let data = JSON.parse(fs.readFileSync("data.json"));
    let candidates = data['results'];
  var index = findIndex(req.params.id);
  candidates.splice(index, 1);
  let temp ={
      'results':candidates
  }
  let jsonData = JSON.stringify(temp);
  fs.writeFile('data.json', jsonData, 'utf8', (argument)=>{
      console.log("Candidate deleted");
  });
  res.redirect('/');
  
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Asolvi server has started");
});

