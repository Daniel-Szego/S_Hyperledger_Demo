var expect    = require("chai").expect;
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://192.168.226.229:3000/api");


console.log("Testing services for Action started");

describe("Action unit test",function(){
  this.timeout(15000);


  it("Test Action Get",function(done){

    // calling home page api
    server
    .get("/Action")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

  it("Create new Action",function(done){

    //create new Action
    server
    .post('/Action')
    .send({
 	 "$class": "org.sequence.model.Action",
  	"timestamp": "-",
  	"type": "Issue",
  	"amount": 0,
  	"requiredApprovementNumber": 0,
  	"approvments": [],
  	"flavorId": "resource:org.sequence.model.Flavor#1",
	"filter": "-",
  	"filterParams": [],
  	"snapshot": {
    	  "$class": "org.sequence.model.Snapshot",
    	  "actionTags": [],
    	  "flavourTags": [],
    	  "sourceAccountTags": [],
    	  "destinationAccountTags": [],
    	  "tokenTags": [],
    	  "transactionTags": []
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

  it("Delete Action",function(done){

    //Delete new Action
    server
    .delete('/Action/55')
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
      done();
    });
  });


});

console.log("Testing services for Action finished");



