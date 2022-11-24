/*  Express.JS (app) Setup */
const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

/* Application Routing */
app.get('/', function(req, res) {
  res.render('pages/login');
});

app.get('/smartHQLogin', function(req, res) {
  // OAuth process:
  // 1)Successful authentication with OAuth to get authorization code
  // 2)Exchange this authorization code for an OAuth access token

  //Step 1 of OAuth process
  var smartHQUrl = "https://accounts-fld.brillion.geappliances.com/oauth2/auth"
  + "?response_type=" + "code"
  + "&redirect_uri=" + encodeURIComponent("http://localhost:5000/auth/callback")
  + "&client_id=" + "ec9c4305c718887531ed5b1f807339f63e56bab2";

  res.redirect(smartHQUrl);
});

app.get('/auth/callback', function(req, res) {
    var authCode = req.query.code; //SmartHQ authentication will post the OAuth code as a query param in URL ("?code=")
    console.log("OAuth Authorization Code: " + authCode);


    //Step 2 of OAuth process: OAuth code was obtained. Now make another call to get an OAuth token...
    var tokenFetchBodyData = {
      "client_id" : "ec9c4305c718887531ed5b1f807339f63e56bab2",
      "client_secret" : "3170196b1f8872efbfd3bacce5835729debded6e718b61703fe6850161352f2a",
      "grant_type" : "authorization_code",
      "code": authCode,
      "redirect_uri" : "http://localhost:5000/auth/callback"
    };

    //Converts the tokenFetchBodyData data into a format suitable for 'x-www-form-urlencoded'
    var formBody = [];
    for (var property in tokenFetchBodyData) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(tokenFetchBodyData[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    //Execute the call to get the OAuth token
    let response = fetch('https://accounts-fld.brillion.geappliances.com/oauth2/token', {
      method: 'POST',
      headers: {"Content-Type": "application/x-www-form-urlencoded" },
      body: formBody
    })
    .then((response) => response.json())
    .then((data) => {
      authAccessToken = data.access_token;
      console.log("OAuth Authorization Token: " + authAccessToken);

      //we've obtained the OAuth access token from the OAuth auth code. Proceed to next page...
      res.render('pages/geauth', {authAccessToken : authAccessToken});
    });
});

app.get('/hood', function(req, res) {
  res.render('pages/hood', {gatewayAccessToken: req.query.gatewayAccessToken});
});

app.get('/error', (req, res) => res.send("Error!"));

/* Start up the app on a port */
const port = process.env.PORT || 5000;
app.listen(port , () => console.log('App listening on port ' + port));
