const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const activeUserRoute = require("./routes/activeUser");
const tweetRoute = require("./routes/tweetsRoute");
const testRoute = require("./routes/forTest"); // created this route for testing purpose only

require("dotenv").config(); //env variable created using dotenv package

const port = process.env.PORT || 4000; //setting port

const app = express();

//db connected
const dbURI = process.env.DB_KEY; //key stored in env variable
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connect to db");
    // server running on localhost:(port define above)
    app.listen(port, () => {
      console.log(`running on localhost:${port}`);
    });
  })
  .catch((err) => console.log(err, "error"));

app.use(authRoute); //including authroutes all related to login, logout and registering authentication.

app.use(activeUserRoute); //include active user routes like  post route for follow and delete route for unfollow

app.use(tweetRoute); //include route related to tweets post for tweet creation, delete for tweet deletion and get for tweet read.

app.use(testRoute); //includes routes rlated to tests

//handling 404 request
app.use((req, res) => {
  console.log("unknown request");
  res.status(404).json({ error: 404, body: "Page Not found" });
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;
