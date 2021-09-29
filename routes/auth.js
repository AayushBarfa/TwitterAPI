const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const express=require("express");
const User=require("../models/user.js");
const controller = require("../controller/authController");//controller imported
require('dotenv').config()
const router = express.Router();


//-----------------------------------------------
//session handling and cookie parsing




// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
router.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true
}));

// parsing the incoming data
router.use(express.json());//temp
router.use(express.urlencoded({extended: true}));


//serving public file
router.use(express.static(__dirname));

// cookie parser middleware
router.use(cookieParser());

var session;
//-------------------------------------------------




//render login page from view 
router.get('/user/login',(req,res)=>{
    res.render('login');
})

//----------------------------------------------------------
//login auth and session creation 
router.post('/user/login',(req,res,next) => {
    User.findOne({ username: req.body.username})
    .then((result)=>{
    
    if(result && req.body.password == result.password){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.json(result);
    }
    else{
        res.status(400).send('Invalid username or password');
    }})
    .catch(err=>next(err));
})
//---------------------------------------------------------


router.get('/user/logout',(req,res) => {                           //logging out user and destroying the session
    req.session.destroy();
    res.redirect('/');
});



router.get('/user/register',(req,res)=>{                          //render register page 
    res.render('register')
})



router.post('/user/register',controller.post_register_newuser);    //authenticating and registering user

router.get('/',controller.get_index);                              //index page to conform session creation




//exporting router and session variable
 module.exports = router;