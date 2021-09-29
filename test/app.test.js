const session = require("supertest-session");
const expect = require("chai").expect;
const app = require("../app");

//--------------------------------------------------
var request = null;
beforeEach(function () {
  request = session(app);
});

//--------------------------------------------------
describe("register test user", function () {
  it("POST('/user/register') new user register", async function () {
    const response = await request
      .post("/user/register")
      .send({ username: "AayushBarfa", password: "password" })
      .expect(201);
    expect(response.body).to.include.keys("username", "password", "_id");
    expect(response.body.username).to.eql("AayushBarfa");
  });

  it("POST('/user/register') register with existing username", function (done) {
    request
      .post("/user/register")
      .send({ username: "AayushBarfa", password: "password" })
      .expect(400)
      .expect(/{"invalid":1}/, done);
  });
});
//--------------------------------------------------

describe("login aythentications ", function () {
  it("session not created", function (done) {
    request
      .get("/")
      .expect(200)
      .expect(/session not created/, done);
  });

  it("POST'/user/login' correct user", async function () {
    const response = await request
      .post("/user/login")
      .send({ username: "AayushBarfa", password: "password" })
      .expect(200);
    expect(response.body).to.include.keys("username", "password", "_id");
    expect(response.body.username).to.eql("AayushBarfa");
  });

  it("POST('/user/login') Incorrect user", function (done) {
    request
      .post("/user/login")
      .send({ username: "AayushBa", password: "password" })
      .expect(400)
      .expect(/invalid user or password/, done());
  });
});

//--------------------------------------------------

describe("after authenticating session", function () {
  var authenticatedSession;

  beforeEach(function (done) {
    request
      .post("/user/login")
      .send({ username: "AayushBarfa", password: "password" })
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = request;
        return done();
      });
  });

  it("GET'/' session not created", function (done) {
    authenticatedSession
      .get("/")
      .expect(200)
      .expect(/session is created/, done);
  });

  it("POST(/user/follow/chandu) follow after login", function (done) {
    authenticatedSession
      .post("/user/follow/chandu")
      .expect(201)
      .expect(/{"status":"true"}/, done);
  });
  it("DELETE(/user/follow/chandu) unfollow after login", function (done) {
    authenticatedSession
      .delete("/user/unfollow/chandu")
      .expect(200)
      .expect(/unfollow successful/, done);
  });
  var id;
  it("POST('/tweet/post') tweet created", async function () {
    const response = await authenticatedSession
      .post("/tweet/post")
      .send({ body: "tweet new body from test" })
      .expect(201);
    expect(response.body).to.include.keys("username", "body", "_id");
    expect(response.body.username).to.eql("AayushBarfa");
    id = response.body._id;
  });

  it("GET('/tweet/get/:id') read tweet", async function () {
    const response = await authenticatedSession
      .get(`/tweet/get/${id}`)
      .expect(200);
    expect(response.body).to.include.keys("username", "body", "_id");
    expect(response.body.username).to.eql("AayushBarfa");
    expect(response.body.body).to.eql("tweet new body from test");
  });

  it("DELETE('/tweet/delete/:id') deleting tweet", async function () {
    const response = await authenticatedSession
      .delete(`/tweet/delete/${id}`)
      .expect(201);
    expect(response.body).to.include.keys("username", "body", "_id");
    expect(response.body.username).to.eql("AayushBarfa");
  });
});
//--------------------------------------------------

describe("deleting the test user", function () {
  it("DELETE('/tweet/delete/:id') deleting user", function (done) {
    request
      .delete("/user/delete/AayushBarfa")
      .expect(201)
      .expect(/deleted/, done);
  });
});
