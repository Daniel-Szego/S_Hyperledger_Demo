var expect    = require("chai").expect;
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://192.168.226.229:3000/api");


console.log("Initialiying unit test - Creating test data for tests");
console.log("!! DO NOT USE IN PRODUCTION !!");

describe("Calling create test data function",function(){

  it("Call create test data function",function(done){
   this.timeout(15000);

    // calling Account get
    server
    .post("/CreateTestData")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

});

console.log("!! DO NOT USE IN PRODUCTION !!");



