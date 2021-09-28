const User=require("../models/user.js");

//home page for session checking if session is present then provide logout botton and if not then redirect to login page  
const get_index=(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("Welcome User <a href='/user/logout'>click to logout</a>");
    }else
    res.redirect('/user/login')
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
      res.send("<script>alert('username is already taken!');</script>");
      res.end();
    }
    else{
        user.save();
       res.redirect('/user/login');
    }})
    .catch(err=>next(err));  
 }



module.exports={
    get_index,
    post_register_newuser

}