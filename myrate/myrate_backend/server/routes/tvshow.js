const express = require("express");
 
// tvshowRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /tvshow.
const tvshowRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the tvshows.
tvshowRoutes.route("/tvshow").get(function (req, res) {
 let db_connect = dbo.getDb("media");
 db_connect
   .collection("tvshows")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single tvshow by id
tvshowRoutes.route("/tvshow/gettvshowbyid:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { id: ObjectId(req.params.id) };
 db_connect
   .collection("tvshows")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single book by title and author
tvshowRoutes.route("/tvshow/findtvshow").get(function (req, res) {
  let db_connect = dbo.getDb();
  let _name = req.query.name;
  let release = req.query.first_air_date;
  const query = {name: _name, first_air_date: release};
  const tvshow = db_connect.collection("tvshows").findOne(query, function (err, result) {
    if (err) {
      console.log("error in get tv show by name and first release: " + err);
      throw err;
    }
    res.json(result);
  });
 });

// This section will help you create a new tvshow.
tvshowRoutes.route("/tvshow/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
    name: req.body.name,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    first_air_date: req.body.first_air_date,
    api_id: req.body.api_id,
 };
 db_connect.collection("tvshows").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a tvshow by id.
tvshowRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    name: req.body.name,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    first_air_date: req.body.first_air_date,
    api_id: req.body.api_id,
   },
 };
 db_connect
   .collection("tvshows")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a tvshow
tvshowRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { id: ObjectId(req.params.id) };
 db_connect.collection("tvshows").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = tvshowRoutes;