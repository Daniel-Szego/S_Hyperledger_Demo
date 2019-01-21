var expect    = require("chai").expect;
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://192.168.226.229:3000/api");


console.log("Testing services for Key started");

describe("Key unit test",function(){
  this.timeout(15000);

  it("Test Key Get",function(done){

    // calling home page api
    server
    .get("/Key")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

  it("Create new key",function(done){

    //create new key
    server
    .post('/Key')
    .send({"$class": "org.sequence.model.Key",
	   "id": "55"})
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
    .delete('/Key/55')
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
      done();
    });
  });

});

console.log("Testing services for Key finished");



