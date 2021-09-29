const mongoose = require("mongoose");

const schema = mongoose.Schema;

const tweetSchema = new schema({
    username:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    

},{timestamps:true})

const Tweet=mongoose.model('tweet',tweetSchema);

module.exports=Tweet;