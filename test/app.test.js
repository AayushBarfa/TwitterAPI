const session = require('supertest-session');
const expect = require("chai").expect;
const app =require('../app');


var request=null;
beforeEach(function () {
    request = session(app);
  });

describe("login", function(){
    it ("session not created",function(done){
        request.get("/")
        .expect(200)
        .expect(/session not created/,done)
    });

    it ("correct user",async function(){
        const response= await request.post("/user/login")
        .send({username: "AayushBarfa", password:"password"})
        .expect(200)
        expect(response.body).to.include.keys("username", "password", "_id");
        expect(response.body.username).to.eql("AayushBarfa");
    });
    
    
    it ("Incorrect user",function(done){
        request.post("/user/login")
        .send({username: "AayushBa", password:"password"})
        .expect(400)
        .expect(/invalid user or password/,done())
    });
});



describe("register", function() {
    // it ("new user register",async function(){
    //     const response= await request.post("/user/register")
    //     .send({username: "baba", password:"password"})
    //     .expect(201);
    //     expect(response.body).to.include.keys("username", "password", "_id");
    //     expect(response.body.username).to.eql("baba");
    // });

    it ("register with existing username",function(done){
        request.post("/user/register")
        .send({username: "AayushBarfa", password:"password"})
        .expect(400)
        .expect(/{"invalid":1}/,done)
    });
});



describe('after authenticating session', function () {

    var authenticatedSession;
  
    beforeEach(function (done) {
      request.post("/user/login")
      .send({username: "AayushBarfa", password:"password"})
        .expect(200)
        .end(function (err) {
          if (err) return done(err);
          authenticatedSession = request;
          return done();
        });
    });

    it ("session not created",function(done){
        authenticatedSession.get("/")
        .expect(200)
        .expect(/session is created/,done)
    });

    it('follow after login', function (done) {
      authenticatedSession.post("/user/follow/AayushiBarfa")
      .expect(201)
      .expect(/{"status":"true"}/,done)
    });
    it('DELETE unfollow after login', function (done) {
        authenticatedSession.delete("/user/unfollow/AayushiBarfa")
        .expect(200)
        .expect(/unfollow/,done)
      });
var id;
      it ("POST tweet created",async function(){
        const response= await authenticatedSession.post("/tweet/post")
        .send({body:"tweet new body from test"})
        .expect(201)
        expect(response.body).to.include.keys("username", "body", "_id");
        expect(response.body.username).to.eql("AayushBarfa");
        id=response.body._id;
    });

    it ("GET read tweet",async function(){
        const response= await authenticatedSession.get(`/tweet/get/${id}`)
        .expect(200)
        expect(response.body).to.include.keys("username", "body", "_id");
        expect(response.body.username).to.eql("AayushBarfa");
        expect(response.body.body).to.eql("tweet new body from test");
    });

    it ("DELETE tweet created",async function(){
        const response= await authenticatedSession.delete(`/tweet/delete/${id}`)
        .expect(201)
        expect(response.body).to.include.keys("username", "body", "_id");
        expect(response.body.username).to.eql("AayushBarfa");
    });

  
  });