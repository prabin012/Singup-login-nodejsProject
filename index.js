// const express = require('express');

import express  from "express";
import {connectDB} from "./dbConnection/data.js";
import path from "path";
import { users } from "./Users/users.js";
import cookieParser from "cookie-parser";
import  Jwt from "jsonwebtoken";
import { decode } from "punycode";

// const connectDB= require("./dbConnection/data.js");
// import {dataBase} from './dbConnection/mongodb.js';

const app = express();
// middleware to get datd from body

app.use(express.urlencoded({extends:true}));
app.use(cookieParser());

// statix exzpress

app.use(express.static(path.join(path.resolve(),"public")));
connectDB();
// const users =[];
app.use(express.json());

// app.get('/',(req, res)=>{
//     res.sendFile("./index.html");
// })
app.get('/something',(req, res)=>{
    res.send("welcome to backend and authentication");
})
app.get('/login', (req,res)=>{
    res.render("index.ejs");
})

app.get('/succes',(req,res)=>{
    res.render("succes.ejs");
})
// to send the data to databse from server
app.get('/add', async(req ,res)=>{
    await users.create({
        email :"abc123@gmai.com",
        password :"123"
    })
    res.send("Sucessfull")
})

// function to authenticate the users

const isAuthencate = async(req, res, next)=>{
    const {token} = req.cookies;
    if(token){
        next();
        req.users = await users.findById(decode._id);
    }else{
        res.render("login.ejs");
    }

}

// login render
app.get('/',(req,res)=>{
    res.render("login.ejs");
})

app.get('/logouts',isAuthencate, (req, res)=>{
    res.render("logout.ejs")
})

// to get cookies

// app.get('/', (req , res)=>{
    
// })

app.post("/loginhere", (req, res)=>{
    res.cookie("token", "cookieSet",{
        httpOnly:true,
        expires:new Date(Date.now()+60 *1000)
    });
    res.redirect("/logouts");
})

app.get('/logout', (req, res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now())
    });

    res.redirect('/register');
})

// to send the data into fronten or window
// app.get('/users',(req,res)=>{
//     res.json({
//         users
//     })
// })
app.get('/register', (req, res)=>{
    res.render("register.ejs")
});

app.post('/register',(req , res)=>{
    const {name, email, password} =req.body;
    users.create({name,email,password});
    res.redirect('/login');
});


app.get('/log-out',(req, res)=>{
    res.render("logout.ejs") 
});
app.post("/index", async(req, res)=>{
    
const {email, password} = req.body;
let user = await users.findOne({email});
let userPassword = await users.findOne({password});
if(!user){
    return res.redirect('./register')
}
const isMatch =users.password === password;
console.log(user.password);
console.log(password);
if(!isMatch){
  return  res.render("index.ejs", {email,message:"incorrect password"})
    
}
res.cookie("token", "cookieSet",{
    httpOnly:true,
    expires:new Date(Date.now()+60 *1000)
});
   res.render("logout.ejs", {message:"lofin Sucessful"});
   
});



// Server

app.listen(5000, () =>{
    console.log("surver is running on prompt", 5000);
}); 