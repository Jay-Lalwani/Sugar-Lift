const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

router.get('/lift', function(req,res){
    req.session.before = req.session.curr
    req.session.exercise = true;
    res.render("lift");
})

router.post('/addLift', function(req, res) {
  // Get the lift data from the request body
  var liftData = req.body.liftData;
    
  // Loop through the lift data and insert each lift into the mySQL database
  for (var i = 0; i < liftData.length; i++) {
    var lift = liftData[i].lift;
    var weight = liftData[i].weight;
    var sets = liftData[i].sets;
    var reps = liftData[i].reps;
    res.locals.dat = req.session.dat;

    var sql = 'INSERT INTO lifts (dat, lift, weight, sets, reps) VALUES (?, ?, ?, ?, ?);';
    res.app.locals.pool.query(sql, [res.locals.dat, lift, weight, sets, reps], function(error, results, fields) {
      if (error) {
        console.log('Error inserting lift into database.');
        console.error(error);
      } 
    });
  }

  // Send a response back to the client indicating success
  res.sendStatus(200);
});


router.get('/bike', function(req,res){
    req.session.before = req.session.curr
    req.session.exercise = true;
    res.render("bike");
})

router.post('/addBike', function(req, res) {
  // Get the lift data from the request body
  var bikeData = req.body.bikeData;
    
  // Loop through the lift data and insert each lift into the mySQL database
  for (var i = 0; i < bikeData.length; i++) {
    var distance = bikeData[i].distance;
    var time = bikeData[i].time;
    res.locals.dat = req.session.dat;

    var sql = 'INSERT INTO bikes (dat, distance, time) VALUES (?, ?, ?);';
    res.app.locals.pool.query(sql, [res.locals.dat, distance, time], function(error, results, fields) {
      if (error) {
        console.log('Error inserting lift into database.');
        console.error(error);
      } 
    });
  }
  // Send a response back to the client indicating success
  res.sendStatus(200);
});

router.get('/sprint', function(req,res){
    req.session.before = req.session.curr
    req.session.exercise = true;
    res.render("sprint");
})

router.post('/addSprint', function(req, res) {
  // Get the lift data from the request body
  var sprintData = req.body.sprintData;
    
  // Loop through the lift data and insert each lift into the mySQL database
  for (var i = 0; i < sprintData.length; i++) {
    var distance = sprintData[i].distance;
    var time = sprintData[i].time;
    res.locals.dat = req.session.dat;

    var sql = 'INSERT INTO sprints (dat, distance, time) VALUES (?, ?, ?);';
    res.app.locals.pool.query(sql, [res.locals.dat, distance, time], function(error, results, fields) {
      if (error) {
        console.log('Error inserting lift into database.');
        console.error(error);
      } 
    });
  }
  res.sendStatus(200);
});
router.get('/walk', function(req,res){
    req.session.before = req.session.curr
    req.session.exercise = true;
    res.render("walk");
})

router.post('/addWalk', function(req, res) {
  // Get the lift data from the request body
  var walkData = req.body.walkData;
    
  // Loop through the lift data and insert each lift into the mySQL database
  for (var i = 0; i < walkData.length; i++) {
    var distance = walkData[i].distance;
    var time = walkData[i].time;
    res.locals.dat = req.session.dat;

    var sql = 'INSERT INTO walks (dat, distance, time) VALUES (?, ?, ?);';
    res.app.locals.pool.query(sql, [res.locals.dat, distance, time], function(error, results, fields) {
      if (error) {
        console.log('Error inserting lift into database.');
        console.error(error);
      } 
    });
  }
  res.sendStatus(200);
});
  router.get('/swim', function(req,res){
    req.session.before = req.session.curr
    req.session.exercise = true;
    res.render("swim");
})

router.post('/addSwim', function(req, res) {
  // Get the lift data from the request body
  var swimData = req.body.swimData;
    
  // Loop through the lift data and insert each lift into the mySQL database
  for (var i = 0; i < swimData.length; i++) {
    var distance = swimData[i].distance;
    var time = swimData[i].time;
    res.locals.dat = req.session.dat;

    var sql = 'INSERT INTO swims (dat, distance, time) VALUES (?, ?, ?);';
    res.app.locals.pool.query(sql, [res.locals.dat, distance, time], function(error, results, fields) {
      if (error) {
        console.log('Error inserting lift into database.');
        console.error(error);
      } 
    });
  }
  res.sendStatus(200);
});

router.get('/sport', function(req,res){
    req.session.before = req.session.curr
    req.session.exercise = true;
    res.render("sport");
})

router.post('/addSport', function(req, res) {
  // Get the lift data from the request body
  var sportData = req.body.sportData;
    
  // Loop through the lift data and insert each lift into the mySQL database
  for (var i = 0; i < sportData.length; i++) {
    var sport = sportData[i].sport;
    var time = sportData[i].time;
    res.locals.dat = req.session.dat;

    var sql = 'INSERT INTO sports (dat, sport, time) VALUES (?, ?, ?);';
    res.app.locals.pool.query(sql, [res.locals.dat, sport, time], function(error, results, fields) {
      if (error) {
        console.log('Error inserting lift into database.');
        console.error(error);
      } 
    });
  }
  res.sendStatus(200);
});

module.exports = router;