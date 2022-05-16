const express = require("express");
const groupRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

groupRoutes.route("/groups").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("groups")
    .find(req.query)
    .toArray(function (err, result){
      if (err) throw err;
      res.json(result);
    });
});

groupRoutes.route("/group/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("groups")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

groupRoutes.route("/group/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    users: req.body.users,
  };
  db_connect.collection("groups").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

groupRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();  
  let myquery = { _id: ObjectId( req.params.id )};  
  let newvalues = {    
    $set: {      
      users: req.body.users,      
  }, }});

groupRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("groups").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = groupRoutes;