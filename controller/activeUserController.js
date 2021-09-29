const Following=require("../models/Follower");

const follow_post=(req,res,next)=>{
    console.log(req.session.userid,req.params.username);
    if(req.session.userid){
    var follow = new Following({
        username : req.session.userid,
        following: req.params.username
    });
    }
    else{
        res.status(401).send("login first");
    }
    Following.findOne({username:follow.username, following:follow.following})
    .then(result=>{
        if(result){
            console.log("already following");
            res.status(400).json({status:"false"});
        }
        else{
            follow.save()
            .then(result=>{res.status(201).json({status:"true"});})
            .catch(err=>{next(err)})   
        }
    })
    .catch(err=>{next(err)}); 
 }


 const unfollow_delete= (req,res,next)=>{
    Following.findOneAndDelete({username: req.session.userid, following:req.params.username})
    .then(result=>{
        if(result){
            
            res.send("unfollow");
        }
        else{
            res.send("error")
        }
    })
    .catch(err=>{next(err)})
   
 }

 module.exports={
    follow_post,
    unfollow_delete
 }