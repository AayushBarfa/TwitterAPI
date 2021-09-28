const mongoose = require("mongoose");

const schema = mongoose.Schema;

const followingSchema = new schema({
    username:{
        type : String,
        required: true 
    },
    following:{
        type : String,
        required: true
    }

}, {timestamps:true})

const Following =mongoose.model('following',followingSchema);

module.exports= Following;