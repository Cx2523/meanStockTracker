var User = require('./user_model');
var passport = require('passport');
require('./passportLocalAuth')(passport);
////////////////////////////////////////////////////////////////////////////////
function create(req, res){
  console.log(req.body);
  if(!req.body.password || !req.body.name || !req.body.email){
    res.send("Error: All field required");
  }

  var newUser =  new User(req.body);

  newUser.setPassword(req.body.password);

  newUser.save(newUser,function(err, result){
    if(err){
      console.log(err);
      res.send("User could not be saved");
    } else {
      // User.find({name:req.body.name},function(err, result){
      //   console.log("This is result in the register function");
      //   console.log(result);
      //   res.send(result);
      // });
      login(req,res);
    }
  });
}
////////////////////////////////////////////////////////////////////////////

function login(req, res) {
  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  console.log(req.body);
  passport.authenticate('local', function(err, user, info){
    var token;
    console.log(err);
    console.log(user);
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "userName": user.name,
        "email":user.email,
        "stocks":user.stocks,
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
}
/////////////////////////////////////////////////////////////////////////////
function trackStocks(req, res){
  console.log("This is req in trackStocks:");
  console.log(req.body.name);
  User.findOneAndUpdate({name:req.body.name},{$push:{stocks:{$each: req.body.symbol}}},{new:true},
  function(err, result){
    if(err){
      console.log("ERROR");
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
}

function removeStock(req, res){
  User.findOneAndUpdate({name:req.body.name},{$pull:{stocks:req.body.symbol}},{new:true},function(err, result){
    if(err){
      console.log("ERROR");
      console.log(err);
    }
    else{
      console.log("This is req.body.symbol");
      console.log(req.body.symbol);
      console.log("This is result after pull:");
      console.log(result);
      res.send(result);
    }
  });
}

function deleteUser(req, res){
  console.log("This is req.body.name in delete USer");
  console.log(req.body);
  User.findOneAndRemove({name:req.body.name},function(err,result){
    if(err){
      console.log("ERROR");
      console.log(err);
    }
    else
    {

      res.send(result);
    }
  });
}

module.exports = {
  create:create,
  login:login,
  trackStocks:trackStocks,
  removeStock:removeStock,
  deleteUser:deleteUser
};
