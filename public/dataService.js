app.service('dataService',function($http){
  this.getQuote = function(symbol){
    return $http({
      method:'GET',
      url:'https://www.quandl.com/api/v3/datasets/WIKI/' + symbol + '.json?api_key=1R_LufxzJX3wAsJo9BDa'
    }).then(function(successData){
      return successData;
    })
  }

});
