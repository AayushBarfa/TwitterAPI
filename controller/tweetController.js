const Tweet=require("../models/tweet")

//post request and response controller for creating tweet
const add_tweet_post=(req,res,next)=>{
    if(req.session.userid){
        const tweet=new Tweet({
            username:req.session.userid,
            body:req.body.body
        })
        tweet.save()
        .then(result=>res.status(201).send(result))
        .catch(err=>{next(err);})
    }
    else{
        res.status(401).send("login first");
    }
}

//delete request to delete a tweet
const delete_tweet=(req,res,next)=>{
    if(req.session.userid){
        Tweet.findOneAndDelete({_id:req.params.id,username:req.session.userid})
        .then(result=>res.status(201).send(result))
        .catch(err=>next(err))
    }
    else{
        res.status(401).send("login first");
    }
}

//get request for reading the data of tweet 
const get_tweet=(req,res,next)=>{
    if(req.session.userid){
        Tweet.findById(req.params.id)
        .then((result)=>{
            res.send(result);
        })
        .catch(err=>{next(err)})
    }
    else{
        console.log("login first");
        res.send("login first");
    }
}

module.exports={
    add_tweet_post,
    delete_tweet,
    get_tweet,
}