var expect    = require("chai").expect;
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://192.168.226.229:3000/api");


console.log("Testing services for Flavor started");

describe("Flavor unit test",function(){
  this.timeout(15000);

  it("Test Flavor Get",function(done){

    // calling home page api
    server
    .get("/Flavor")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

  it("Create new Flavor",function(done){

    //create new Flavor
    server
    .post('/Flavor')
    .send({
    "$class": "org.sequence.model.Flavor",
    "tags": "test",
    "isFungable": true,
		"keyIds":["org.sequence.model.Key#1",
	   		  "org.sequence.model.Key#2"],
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

  it("Delete Flavor",function(done){

    //Delete new Flavor
    server
    .delete('/Flavor/55')
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
      done();
    });
  });

});

console.log("Testing services for Flavor finished");



