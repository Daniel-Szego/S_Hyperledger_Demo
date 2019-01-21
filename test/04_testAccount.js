var expect    = require("chai").expect;
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://192.168.226.229:3000/api");


console.log("Testing services for Account started");

describe("Account unit test",function(){
  this.timeout(15000);

  it("Test Account Get",function(done){

    // calling Account get
    server
    .get("/Account")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

  it("Create new Account",function(done){

    //create new Account
    server
    .post('/Account')
    .send({"$class": "org.sequence.model.Account",
		"tags": "test tag",
		"keyIds":[{"$class": "org.sequence.model.Key","id": "1"},
		   	  {"$class": "org.sequence.model.Key","id": "2"}],
  		"quorum": 0,
  		"id": "55"
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("Delete key",function(done){

    //Delete new key
    server
    .delete('/Account/55')
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
      done();
    });
  });



});

console.log("Testing services for Account finished");



