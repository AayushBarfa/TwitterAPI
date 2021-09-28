const express=require("express");
const mongoose=require("mongoose");
const authRoute = require("./routes/auth");
const activeUserRoute =require("./routes/activeUser");
const tweetRoute=require("./routes/tweetsRoute");

const port= process.env.PORT || 4000; //setting port 


const app=express();



// register view engine
app.set('view engine', 'ejs');


//db connected
const dbURI="mongodb+srv://AayushMongoose:newpassword1234@cluster0.0dt7p.mongodb.net/Twitterdb?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(result =>{
    console.log("connect to db");
    
    // server running on localhost:3000
    app.listen(port,()=>{console.log(`running on localhost:${port}`)});
  })
  .catch(err => console.log(err,"error"));



app.use(authRoute);                 //including authroutes all related to login, logout and registering authentication.

app.use(activeUserRoute);           //include active user routes like  post route for follow and delete route for unfollow
 
app.use(tweetRoute);                //include route related to tweets post for tweet creation, delete for tweet deletion and get for tweet read.



//handling 404 request
app.use((req, res) => {
    console.log(req.session)
  res.status(404).render('404');
});


app.use((err,req,res,next)=>{
  res.status(500).json({error: err.message });
})