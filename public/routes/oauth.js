const express = require('express');
const router = express.Router();

const {  AuthorizationCode } = require('simple-oauth2');

const https = require('https');
    
var dexcom_client_id = 'sdhGpHIg0GDy8mBubGrD9ncmN06xOZJN';
var dexcom_client_secret = 'Jd645jItC030Q1cf';
var dexcom_redirect_uri = 'https://sugar-lift.sites.tjhsst.edu/login_worker';    //    <<== you choose this one

// Here we create an oauth2 variable that we will use to manage out OAUTH operations


var client = new AuthorizationCode({
  client: {
    id: dexcom_client_id,
    secret: dexcom_client_secret
  },
  auth: {
    tokenHost: 'https://api.dexcom.com/v2/oauth2/',
    authorizePath: 'https://api.dexcom.com/v2/oauth2/login',
    tokenPath: 'https://api.dexcom.com/v2/oauth2/token'
  }
});


const OAUTH_SCOPE = 'offline_access';

var authorizationUri = client.authorizeURL({
    scope: OAUTH_SCOPE,
    redirect_uri: dexcom_redirect_uri
});


// console.log(authorizationUri)

function checkAuthentication(req,res,next) {

    if ('authenticated' in req.session) {
        // the user has logged in
        next()
    }
    else {
        // the user has not logged in
        res.redirect(authorizationUri)
        // res.render('unverified', {'login_link' : authorizationUri})
    }
}


router.get('/login', [checkAuthentication], function (req, res) {
    
       
        req.session.myLogin = true;
    
        res.redirect('https://sugar-lift.sites.tjhsst.edu/'+req.session.page)
});


router.get('/logout', function (req, res) {
    
    delete req.session.authenticated;
    req.session.myLogin = false;
    res.redirect('https://sugar-lift.sites.tjhsst.edu/'+req.session.page);

});


// -------------- intermediary login_worker helper -------------- //
async function convertCodeToToken(req, res, next) {
    var theCode = req.query.code;
    
    var options = {
        'code': theCode,
        'redirect_uri': dexcom_redirect_uri,
        'scope': 'read'
     };
    
    // needed to be in try/catch
    try {
        var accessToken = await client.getToken(options);      // await serializes asyncronous fcn call
        res.locals.token = accessToken.token;
        
        next()
    } 
    catch (error) {
        console.log('Access Token Error', error.message);
        res.sendStatus(502); // error creating token
    }
}


router.get('/login_worker', [convertCodeToToken], function(req, res) { 

    req.session.authenticated = true;
    req.session.token = res.locals.token;
    
    res.redirect('https://sugar-lift.sites.tjhsst.edu/login');
    
});
    


module.exports.oauth_router = router;
//module.exports.checkAuthentication = [checkAuthentication, possiblyRefreshToken, getProfile];