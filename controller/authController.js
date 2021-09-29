const User = require("../models/user.js"); //User model imported

//registering user and authenticating username that they previously used or not
const post_register_newuser = (req, res, next) => {
  let user = new User(req.body);
  User.findOne({ username: user.username }) //checking username exists
    .then((existUsername) => {
      if (existUsername) {
        console.log("username taken");
        res.status(400).json({ invalid: 1 }); //if user name is already taken
      } else {
        console.log("new user");
        user.save() //storing the user in data base
        .then((result) => res.status(201).json(result))
        .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

//exporting the controllers for auth routes
module.exports = {
  post_register_newuser,
};
