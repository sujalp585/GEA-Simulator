/*  EXPRESS */
const express = require('express');
const app = express();
const session = require('express-session');
var request = require('request');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
  res.render('pages/login');
});

app.get('/geauth', function(req, res) {
  res.render('pages/geauth', {accessToken: authAccessToken});
});

app.get('/hood/:gatewayAccessToken', function(req, res, next) {
  var gat = req.params.gatewayAccessToken;
  res.render('pages/hood', {gatewayAccessToken: gat});
});

app.get('/error', (req, res) => res.send("Error logging in"));

const port = process.env.PORT || 5000;
app.listen(port , () => console.log('App listening on port ' + port));

 
/* Passport (auth middleware) setup */
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var authAccessToken;

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://accounts-fld.brillion.geappliances.com/oauth2/auth',
  tokenURL: 'https://accounts-fld.brillion.geappliances.com/oauth2/token',
  clientID: 'ec9c4305c718887531ed5b1f807339f63e56bab2',
  clientSecret: '3170196b1f8872efbfd3bacce5835729debded6e718b61703fe6850161352f2a',
  callbackURL: "http://localhost:5000/auth/callback"
},
  function(accessToken, refreshToken, profile, cb) {
    authAccessToken = accessToken;
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication with OAuth, redirect to page that does GE-specific auth
    res.redirect('/geauth');
  });

//app.get('/smartHQLogin', passport.authenticate('oauth2')); //when callbackURL is updated: uncomment & remove the below line
app.get('/smartHQLogin', function(req, res) {
  res.render('pages/geauth', {accessToken: 'ue1cfzx4rypaz05pq1zv2a09d9cgvg2t'});
});

