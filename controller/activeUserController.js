const Following=require("../models/Follower");

const follow_post=(req,res,next)=>{
    const follow = new Following({
        username : req.session.userid,
        following: req.params.username
    });
    Following.findOne({username:follow.username, following:follow.following})
    .then(result=>{
        if(result){
            console.log("already following");
            res.send("already following");
        }
        else{
            follow.save()
            .then(result=>{res.json({status:"true"});})
            .catch(err=>{console.log(err)})   
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