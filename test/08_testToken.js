var expect    = require("chai").expect;
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://192.168.226.229:3000/api");


console.log("Testing services for Token started");

describe("Token unit test",function(){
  this.timeout(15000);

  it("Test Token Get",function(done){

    // calling home page api
    server
    .get("/Token")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

  it("Create new Token",function(done){

    //create new Token
    server
    .post('/Token')
    .send({
 	 "$class": "org.sequence.model.Token",
	  "amount": 0,
	  "flavorId": "resource:org.sequence.model.Flavor#1",
	  "accountId": {
	    "$class": "org.sequence.model.Account",
 	   "keyIds": [],
	    "quorum": 0,
	    "id": "0247"
	  },
	  "id": "55"
	})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("Delete Token",function(done){

    //Delete new Token
    server
    .delete('/Token/55')
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
      done();
    });
  });


});

console.log("Testing services for Account finished");



