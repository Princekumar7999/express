const express = require("express");

const app = express();
app.use(express.json());
app.use(middleware);
app.use(logger);


let courses = [
    {id:1,name:"java"},
    {id:2,name:"javascript"},
    {id:3,name:"python"}
];



app.get('/courses',(req,res) => {
    res.json(courses);
})

app.post('/courses',(req,res) => {
    console.log(req.body);
    let singlecourse = {id: courses.length+1,
        name: req.body.name
    }
    courses.push(singlecourse);
    res.send(courses);
})

function middleware(req,res,next){
    console.log("Middleware is called");
    next();
}
function logger(req,res,next){
    const method = req.method;
    const ip = req.socket.remoteAddress; 
    const hostname = require('os').hostname(); 
    const date = new Date().toISOString();
  
    console.log(`${date} - ${method} - ${ip} - ${hostname} - ${req.url}`);
    next();
}
//logger
//method,ip,hostname,date

//put call update id 1 to spring
//delete call delete id 2

app.put('/courses',(req,res) => {
    let id = req.body.id;
    let name = req.body.name;
   for(let i=0;i<courses.length;i++){
    if(courses[i].id == id){
        courses[i].name = name;
    }
}
    res.send(courses);
})

app.delete('/courses',(req,res) => {
    let id = req.body.id;
    
   for(let i=0;i<courses.length;i++){
    if(courses[i].id === id){
        courses.splice(i,1);
    }
}
    res.send(courses);
})

app.listen(3000,() => {
    console.log("Server is running on port 3000");
})

//read nosql database
