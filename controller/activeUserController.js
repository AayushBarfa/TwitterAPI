const Following=require("../models/Follower");
const service =require("./service/followService");                            //importing services to increment and dercrement, followers and follwing count

//post request to follow new user
const follow_post=(req,res,next)=>{
    if(req.session.userid){ 
        var follow = new Following({                                           //building schema for saving into database
            username : req.session.userid,
            following: req.params.username
         });
    }
    else{
        res.status(401).send("login first");
    }
    Following.findOne({username:follow.username, following:follow.following})  //checking if already following or not
    .then(result=>{
        if(result){
            console.log("already following");
            res.status(400).json({status:"false"});
        }
        else{
            if(!service.IncrementFollowersFollowing(follow)){                  //incrementing followers and following counts into respective users                   
                follow.save() 
                .then(result=>{res.status(201).json({status:"true"});})
                .catch(err=>{next(err)})   
            }
            else{
                res.status(400).send("usernotfound");                          //if user is not found in database
            }
        }
    })
    .catch(err=>{next(err)}); 
 }



 //delete request to unfollow the user
 const unfollow_delete= (req,res,next)=>{
    Following.findOneAndDelete({username: req.session.userid, following:req.params.username}) //deleting the following from database
    .then(result=>{
        if(result){
            console.log("unfollow successful")
            service.decrementFollowersFollowing(result)                                       //decrementing followers and following counts into respective users
            res.send("unfollow successful");
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