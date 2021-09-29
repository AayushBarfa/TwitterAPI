const User = require("../models/user.js");
const express = require("express");

const router = express.Router();

//deleting user from data base for testing purpose
router.delete("/user/delete/:username", (req, res, next) => {
  User.findOneAndDelete({ username: req.params.username })
    .then((result) => {
      res.status(201).send("deleted");
    })
    .catch((error) => {
      next(error);
    });
});

//logging out user and destroying the session
router.get("/user/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//index page to conform session creation
router.get("/", (req, res) => {
  if (req.session.userid) {
    res.status(200).send("session is created");
  } else res.status(200).send("session not created");
});

module.exports = router;
