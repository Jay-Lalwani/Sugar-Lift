const express = require('express');
const router = express.Router();
const http = require("https");


router.get('/', function(req,res){
    
    
    req.session.page = ''
  if('myLogin' in req.session === false)
    {
        req.session.myLogin = false;
    }
    else{
       
// "2017-06-16T15:45:00";


var options2 = {
  "method": "GET",
  "hostname": "api.dexcom.com",
  "port": null,
  "path": "/v2/users/self/dataRange",
  "headers": {
    "authorization": "Bearer " + req.session.token['access_token'],
    }
};

var req3 = http.request(options2, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
 
    var body2 = Buffer.concat(chunks);
    var endDate = body2.toString();
    var i = endDate.lastIndexOf("systemTime");
    endDate = endDate.slice(i+13, i+32);
    var startDate = endDate.slice(0, 11) + "00:00:00";
    req.session.endDate = endDate;
    req.session.startDate = startDate;
  });
});

req3.end();
console.log(req.session.startDate);
console.log(req.sesion.endDate);




var options = {
  "method": "GET",
  "hostname": "api.dexcom.com",
  "port": null,
  "path": "/v2/users/self/egvs?startDate="+startDate+"&endDate="+endDate,
  "headers": {
    "authorization": "Bearer " + req.session.token['access_token'],
    }
};

var req2 = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    // console.log(body.toString());

  });
});

req2.end();

    }
    
    req.session.bloodSugar = 60; //current blood sugar
    // console.log(req.session.data);
    res.render('test', {'login' : req.session.myLogin} )

})


module.exports = router;