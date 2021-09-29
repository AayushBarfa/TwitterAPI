const User=require("../models/user.js");

//home page for session checking if session is present then provide logout botton and if not then redirect to login page  
const get_index=(req,res) => {
    if(req.session.userid){
        res.status(200).send("session is created");
    }else
    res.status(200).send("session not created");
}



//registering user and authenticating username that they previously used or not
const post_register_newuser=(req,res,next) => {
    //validation
   console.log(req.body);
    let user=new User(req.body);
  //checking username exists
   User.findOne({ username: user.username})
   .then((existUsername)=>{
    if (existUsername) {
      console.log('username taken');
      res.status(400).json({invalid : 1});
    }
    else{
      console.log('new user');
      user.save()
      .then(result =>res.status(201).json(result))
      .catch(err=>next(err))
        
    }})
    .catch(err=>next(err));  
 }



module.exports={
    get_index,
    post_register_newuser

}