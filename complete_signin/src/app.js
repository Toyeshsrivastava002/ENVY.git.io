const express = require('express');
const { stat } = require('fs');
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn")
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");

const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path )
hbs.registerPartials(partials_path)
require("./db/conn");
const Register = require('./models/registers')
const Comment = require('./models/comment')

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
   res.render("index")
})
app.get("/home",(req,res)=>{
    res.render("index")
 })
 app.get("/sign",(req,res)=>{
    res.render("register")
 })
 app.post("/sign", async(req,res)=>{
  try{
   const registerGuest = new Register({
      Email:req.body.email,
     Username:req.body.username,
     Password:req.body.pass
   })
   const data = registerGuest.save();
   res.status(201).render("index");
   
}
      
  catch(error){
   res.status(400).send(error);
  }
})

app.post("/login", async(req,res)=>{
   try{
    const  name = req.body.username;
    const password = req.body.pass;
   
    const data = await Register.findOne({Username:name});
    if (data.Password === password){
      
      const commentGuest = new Comment({
        Username:req.body.username,
        Password:req.body.pass,
         Comments:req.body.comment
        
      })
      const cdata = await commentGuest.save();
      res.status(201).render("index");
      // app.get("index",(req,res)=>{
      //    document.getElementById('ss').innerHTML=name;
      // })
      }
      
    }
    catch(error){
    res.status(400).send(error);
   }
 })

app.get("/login",(req,res)=>{
    res.render("login")
 })
 app.get("/about",(req,res)=>{
    res.render("about")
 })
app.listen(port,()=>{
    console.log("Server is running...")
})