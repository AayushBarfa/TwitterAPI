const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema= new schema({
        username: {type: String, unique: true},
        password: {type: String, require:true},
        noOfFollowers:{type: Number,},
        noOfFollowings:{type:Number,}
},{timestamps:true});

const User= mongoose.model('User', userSchema);

module.exports=User;