var expect    = require("chai").expect;
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://192.168.226.229:3000/api");


console.log("Testing services for Transaction started");

describe("Transaction unit test",function(){
  this.timeout(15000);

  it("Test Transaction Get",function(done){

    // calling home page api
    server
    .get("/Transactions")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

  it("Create new Action",function(done){

    //create new Action, otherwise transaction can not be tested
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
  	  "id": "77"
	})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });


  it("Create new Transaction",function(done){

    //create new Transaction
    server
    .post('/Transactions')
    .send({
	  "$class": "org.sequence.model.Transactions",
	  "timestamp": "-",
	  "sequenceNumber": 0,
	  "transactionState": "Proposal",
	  "actions": ["org.sequence.model.Action#77"],
	  "id": "55"
	})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("Delete Transaction",function(done){

    //Delete new Transaction
    server
    .delete('/Transactions/55')
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
      done();
    });
  });

  it("Delete test Action",function(done){

    //Delete test Action
    server
    .delete('/Action/77')
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
      done();
    });
  });





});

console.log("Testing services for Account finished");



