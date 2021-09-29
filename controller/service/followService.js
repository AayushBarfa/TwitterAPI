const User=require("../../models/user")


//incrementing followers and following counts into respective users
function IncrementFollowersFollowing(follow){
    User.findOneAndUpdate({"username":follow.username}, { $inc: { noOfFollowings: 1} })
    .then(res=>{
        if(res){
        User.findOneAndUpdate({"username":follow.following}, { $inc: { noOfFollowers: 1} })
        .then(res2=>{
            if(res2){
            console.log("both incremented");
            return true;
        }
        else{
            console.log("not incremented");
            return false;
        }
        })
        .catch(err=>{console.log(err);return false})
        }
        else{
            console.log("check")
            return false;
        }
    })
    .catch(err=>{console.log(err);return false})
}

//decrementing followers and following counts into respective users
function decrementFollowersFollowing(result){
    User.findOneAndUpdate({"username":result.username}, { $inc: { noOfFollowings: -1} })           //incrementing following 
    .then(res=>{
        if(res){
        User.findOneAndUpdate({"username":result.following}, { $inc: { noOfFollowers: -1} })
        .then(res2=>{
            if(res2){
            console.log("both decremented");
            return ;
        }
        else{
            console.log("not decremented");
            return ;
        }
        })
        .catch(err=>{console.log(err);return })
        }
        else{
            console.log("check")
            return ;
        }
    })
    .catch(err=>{console.log(err);return })
}


module.exports={
    IncrementFollowersFollowing,
    decrementFollowersFollowing
}