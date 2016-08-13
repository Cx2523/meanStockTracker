var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stocks = new Schema({
  symbol:{
    type:String,
    required:true,
    unique:true
  }
});

module.exports = mongoose.model('stocks', Stocks);
