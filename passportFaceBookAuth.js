var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new FacebookStrategy({
      clientID:'272243896469704',
      clientSecret:'16e03d0cfd8311a8f9727528c84edec5',
      callbackURL:'http://localhost:8080/auth/facebook/callback'
    },function(token, refreshToken, profile, done){
        console.log("This is token:");
        console.log(token);
      return done(null,profile);
    }));

    var serialize = passport.serializeUser(function(user,done){
      done(null, user);
    });
    var deserialize = passport.deserializeUser(function(user,done){
      done(null,obj);
    });

    module.exports = {
      faceBookAuth:passport.authenticate('facebook'),
      serialize:serialize,
      deserialize:deserialize
    }
