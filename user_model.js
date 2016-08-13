var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Stocks = require('./stock_model.js');
var Schema = mongoose.Schema;

var User = new Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  name:{
    type:String,
    required:true,
    unique:true
  },
  stocks:Array,//[Stocks.schema],
  hash:String,
  salt:String
});

User.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

User.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

User.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 70000);


  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, 'secret');
};

module.exports = mongoose.model('users', User);
