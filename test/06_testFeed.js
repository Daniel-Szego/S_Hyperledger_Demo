var expect    = require("chai").expect;
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://192.168.226.229:3000/api");


console.log("Testing services for Feed started");

describe("Feed unit test",function(){
  this.timeout(15000);

  it("Test Feed Get",function(done){

    // calling home page api
    server
    .get("/Feed")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

  it("Create new Feed",function(done){

    //create new Feed
    server
    .post('/Feed')
    .send({
 	 "$class": "org.sequence.model.Feed",
	  "type": "Action",
  	"filter": "test filter",
  	"id": "55"
	})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("Delete Feed",function(done){

    //Delete new Feed
    server
    .delete('/Feed/55')
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
      done();
    });
  });


});

console.log("Testing services for Feed finished");



