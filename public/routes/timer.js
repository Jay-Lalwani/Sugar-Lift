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
    var dat = req.session.dat;

    var sql = 'INSERT INTO lifts (dat, lift, weight, sets, reps) VALUES (?, ?, ?, ?, ?);';
    res.app.locals.pool.query(sql, [dat, lift, weight, sets, reps], function(error, results, fields) {
      if (error) {
        console.log('Error inserting lift into database.');
        console.error(error);
      } 
    });
  }

  // Send a response back to the client indicating success
  res.sendStatus(200);
});


module.exports = router;