const Tweet=require("../models/tweet")


//post req and response controller for creating tweet
const add_tweet_post=(req,res,next)=>{
    if(req.session.userid){
    const tweet=new Tweet({
        username:req.session.userid,
        body:req.body.body
    })
    tweet.save()
    .then(result=>res.send(result))
    .catch(err=>{next(err);})}
    else{
        res.send("login first");
    }
}

//delete req which deletes tweet
const delete_tweet=(req,res,next)=>{
    Tweet.findByIdAndDelete({_id:req.params.id})
    .then(result=>res.send(result))
    .catch(err=>next(err))
}


const get_tweet=(req,res,next)=>{
    if(req.session.userid){
    Tweet.findOne({username:req.session.userid,_id:req.params.id})
    .then((result)=>{
        res.send(result);
    })
    .catch(err=>{next(err)})
    }
    else{
        res.send("login first");
    }
}



module.exports={
    add_tweet_post,
    delete_tweet,
    get_tweet
}