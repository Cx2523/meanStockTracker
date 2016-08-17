var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var passportFaceBook = require('./server/passportFaceBookAuth');
var passportLocal = require('./server/passportLocalAuth');
var cors = require('cors');
var bodyParser = require('body-parser');


var userCtrl = require('./server/userCtrl');

var PORT = 8080;

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./public'));



app.listen(PORT,function(){
  console.log('facebook-viewer is listening on port: ' + PORT);
});


app.use(passport.initialize());


///FACEBOOK LOGIN///////////////////////////////////////////////
passportFaceBook.serialize;
passportFaceBook.deserialize;

app.get('/auth/facebook', passportFaceBook.faceBookAuth);
app.get('/auth/facebook/callback',passportFaceBook.faceBookAuth,function(req, res){
  res.send('HOME PAGE');
});

app.get('/',function(req, res){
  res.send("HOME PAGE");
});

///LOGIN//////////////////////////////////////////////
app.post('/auth/register', userCtrl.create);
app.post('/auth/login', userCtrl.login);
app.put('/user/:username',userCtrl.removeStock);
app.post('/user/:username',userCtrl.trackStocks);
app.patch('/user/:username',userCtrl.deleteUser);
//////////LOCAL HOST////////////////////////////////////////
// mongoose.connect('mongodb://localhost/ecommerceTest',function(err){
//   if(err){
//     console.log("There was an error connecting to ecommerceTest");
//   } else {
//     console.log("Connected to ecommerceTest db");
//   }
// });

mongoose.connect('mongodb://chris:abc123@ds139985.mlab.com:39985/stocktracker',function(err){
  if(err){
    console.log("There was an error connecting to mLab db");
    console.log(err);
  } else {
    console.log("Connected to mLab db");
  }
});
