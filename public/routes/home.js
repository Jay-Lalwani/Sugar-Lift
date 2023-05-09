// const express = require('express');
// const router = express.Router();
// const http = require("https");

// var bg = "test";

// router.get('/', function(req,res){
    
    
//     req.session.page = '';
//   if('myLogin' in req.session === false)
//     {
//         req.session.myLogin = false;
//         res.redirect("https://sugar-lift.sites.tjhsst.edu/login");
//     }
       
// // Example Time for DEXCOM API: "2017-06-16T15:45:00";

// if (req.session.myLogin) {
//     var options2 = {
//           "method": "GET",
//           "hostname": "api.dexcom.com",
//           "port": null,
//           "path": "/v2/users/self/dataRange",
//           "headers": {
//             "authorization": "Bearer " + req.session.token['access_token'],
//             }
//         };
    
//         var req3 = http.request(options2, function (res2) {
//         var chunks2 = [];
    
//         res2.on("data", function (chunk2) {
//             chunks2.push(chunk2);
//         });
    
//         res2.on("end", function () {
//             var body2 = Buffer.concat(chunks2);
        
//             var temp = body2.toString();
//             var i = temp.lastIndexOf("systemTime");
//             var end = temp.slice(i+13, i+32);
//             var start = end.slice(0, 11) + "00:00:00"; // change to 09:00:00
//             console.log(start, end);
//             var options = {
//               "method": "GET",
//               "hostname": "api.dexcom.com",
//               "port": null,
//               "path": "/v2/users/self/egvs?startDate="+start+"&endDate="+end,
//               "headers": {
//                 "authorization": "Bearer " + req.session.token['access_token'],
//                     }
//             };
        
        
//             var req2 = http.request(options, function (res) {
//             var chunks = [];
        
//             res.on("data", function (chunk) {
//                     chunks.push(chunk);
//             });
        
//             res.on("end", function () {
//                 var body = Buffer.concat(chunks);
                
//                 bg = JSON.parse(body.toString())["egvs"]; // middle
//                 console.log("bg", bg);
//             }); }); req2.end();
    
//     }); }); req3.end();
    
//     let dataPoints = bg;
    
//     datas = [];
//     labels = [];
    
//     if (bg != "test"){
//   for (let i = 0; i < bg.length; i++) {
//         datas.push(bg[i]["value"]);
//         labels.push(bg[i]["displayTime"].slice(11, 16));
//     }
//     req.session.curr = datas[0];
    
//             var dat = labels[0].slice(0, 10)
//         if('exercise' in req.session === false)
//         {
//             req.session.exercise = false;
//         }
//         if(req.session.exercise)
//         {
//              var sql = 'INSERT INTO history (dat, bef, af) VALUES (?, ?, ?);';
//             res.app.locals.pool.query(sql,[dat, req.session.before, req.session.curr],function(error, results, fields){
//             console.log(results[0]);
//                     });
//             req.session.exercise = false;
//         }
        
//         var sql2 = 'SELECT * FROM history;';
//             res.app.locals.pool.query(sql2,function(error, results, fields){
//             console.log(results[0]);
//                     });
    
//     datas.reverse();
//     labels.reverse();
//     }

// res.render('test', {'login' : req.session.myLogin, "labels": labels, "datas": datas} );

// }


    

//  }); // end of sugar-lift.sites.tjhsst.edu/ endpoint


// module.exports = router;


// NEW VERSION BELOW --------------------------------

const express = require('express');
const router = express.Router();
const http = require("https");

var bg = "test";

router.get('/', async function(req, res) {
  req.session.page = '';
  if (!req.session.myLogin) {
    req.session.myLogin = false;
    res.redirect("https://sugar-lift.sites.tjhsst.edu/login");
    return;
  }

  // Example Time for DEXCOM API: "2017-06-16T15:45:00";

  if (req.session.myLogin) {
    try {
      var options2 = {
        "method": "GET",
        "hostname": "api.dexcom.com",
        "port": null,
        "path": "/v2/users/self/dataRange",
        "headers": {
          "authorization": "Bearer " + req.session.token['access_token'],
        }
      };

      const body2 = await new Promise((resolve, reject) => {
        const req3 = http.request(options2, function(res2) {
          var chunks2 = [];

          res2.on("data", function(chunk2) {
            chunks2.push(chunk2);
          });

          res2.on("end", function() {
            var body2 = Buffer.concat(chunks2);
            resolve(body2);
          });

          res2.on("error", function(err) {
            reject(err);
          });
        });
        req3.end();
      });

      var temp = body2.toString();
      var i = temp.lastIndexOf("systemTime");
      var end = temp.slice(i + 13, i + 32);
    var endTimestamp = new Date(end).getTime();
    var startTimestamp = endTimestamp - (10 * 60 * 60 * 1000);
    var start = new Date(startTimestamp).toISOString().slice(0, 19);
    
      var options = {
        "method": "GET",
        "hostname": "api.dexcom.com",
        "port": null,
        "path": "/v2/users/self/egvs?startDate=" + start + "&endDate=" + end,
        "headers": {
          "authorization": "Bearer " + req.session.token['access_token'],
        }
      };

      const body = await new Promise((resolve, reject) => {
        const req2 = http.request(options, function(res) {
          var chunks = [];

          res.on("data", function(chunk) {
            chunks.push(chunk);
          });

          res.on("end", function() {
            var body = Buffer.concat(chunks);
            resolve(body);
          });

          res.on("error", function(err) {
            reject(err);
          });
        });
        req2.end();
      });

      bg = JSON.parse(body.toString())["egvs"]; // middle

      let dataPoints = bg;

      datas = [];
      labels = [];

    //   if (bg != "test") { // maybe remove
        for (let i = 0; i < bg.length; i++) {
          datas.push(bg[i]["value"]);
          labels.push(bg[i]["displayTime"].slice(11, 16));
        }
        req.session.curr = datas[0];
        
        datas.reverse();
        labels.reverse();
        
        req.session.dat = bg[0]["displayTime"].slice(0, 10)
        if('exercise' in req.session === false)
        {
            req.session.exercise = false;
        }
        
        if(req.session.exercise)
        {
             var sql = 'INSERT INTO history (dat, ex, bef, af) VALUES (?, ?, ?, ?);';
            res.app.locals.pool.query(sql,[req.session.dat, req.session.ex, req.session.before, req.session.curr],function(error, results, fields){
            var sql2 = 'SELECT * FROM history;';
            res.app.locals.pool.query(sql2,function(error, results, fields){
                var cal = JSON.parse(JSON.stringify(results));
                            
              res.render('test', {
                'login': req.session.myLogin,
                "labels": labels,
                "datas": datas,
                "cal": cal
              });
                    });
                
            });
            req.session.exercise = false;
        }
        else{
        var sql2 = 'SELECT * FROM history;';
            res.app.locals.pool.query(sql2,function(error, results, fields){
        var cal = JSON.parse(JSON.stringify(results));
                    
      res.render('test', {
        'login': req.session.myLogin,
        "labels": labels,
        "datas": datas,
        "cal": cal
      });
            }); }
      
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Error getting data');
    }
  }
});

router.get('/workoutData', function(req, res){
var date_chx = req.query.date
var ex_chx = req.query.exercise

if(ex_chx == 'Weightlifting'){
  var sql = "SELECT lifts.lift, lifts.weight, lifts.sets, lifts.reps FROM lifts JOIN history ON lifts.dat=history.dat WHERE history.ex=? AND lifts.dat=?;";
  res.app.locals.pool.query(sql, [ex_chx, date_chx], function(error, results, fields) {
    if (error) {
      console.log('Error getting workout data from database.');
      console.error(error);
      res.status(500).send('Error getting workout data from database.');
    } else {
      res.json(results);
    }
  });
  
}
else if(ex_chx == 'Cycling'){
    var sql = "SELECT bikes.distance, bikes.time FROM bikes JOIN history ON bikes.dat=history.dat WHERE history.ex=? AND bikes.dat=?;";
  res.app.locals.pool.query(sql, [ex_chx, date_chx], function(error, results, fields) {
    if (error) {
      console.log('Error getting workout data from database.');
      console.error(error);
      res.status(500).send('Error getting workout data from database.');
    } else {
      res.json(results);
    }
  });
}
else if(ex_chx == 'Sprinting'){
    var sql = "SELECT sprints.distance, sprints.time FROM sprints JOIN history ON sprints.dat=history.dat WHERE history.ex=? AND sprints.dat=?;";
  res.app.locals.pool.query(sql, [ex_chx, date_chx], function(error, results, fields) {
    if (error) {
      console.log('Error getting workout data from database.');
      console.error(error);
      res.status(500).send('Error getting workout data from database.');
    } else {
      res.json(results);
    }
  });
}
else if(ex_chx == 'Walking'){
    var sql = "SELECT walks.distance, walks.time FROM walks JOIN history ON walks.dat=history.dat WHERE history.ex=? AND walks.dat=?;";
  res.app.locals.pool.query(sql, [ex_chx, date_chx], function(error, results, fields) {
    if (error) {
      console.log('Error getting workout data from database.');
      console.error(error);
      res.status(500).send('Error getting workout data from database.');
    } else {
      res.json(results);
    }
  });
}
else if(ex_chx == 'Swimming'){
    var sql = "SELECT swims.distance, swims.time FROM swims JOIN history ON swims.dat=history.dat WHERE history.ex=? AND swims.dat=?;";
  res.app.locals.pool.query(sql, [ex_chx, date_chx], function(error, results, fields) {
    if (error) {
      console.log('Error getting workout data from database.');
      console.error(error);
      res.status(500).send('Error getting workout data from database.');
    } else {
      res.json(results);
    }
  });
}
else if(ex_chx == 'Sports'){
    var sql = "SELECT sports.sport, sports.time FROM sports JOIN history ON sports.dat=history.dat WHERE history.ex=? AND sports.dat=?;";
  res.app.locals.pool.query(sql, [ex_chx, date_chx], function(error, results, fields) {
    if (error) {
      console.log('Error getting workout data from database.');
      console.error(error);
      res.status(500).send('Error getting workout data from database.');
    } else {
      res.json(results);
    }
  });
}
});

module.exports = router;

