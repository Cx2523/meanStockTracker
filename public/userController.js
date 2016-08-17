app.controller('userCtrl',function($scope,$state,loginService,dataService){
  var profile = JSON.parse(localStorage.getItem('profile'));
  $scope.userName = profile.data.userName;
  $scope.stocks = profile.data.stocks;

  $scope.logout = function(){
    window.localStorage.removeItem('profile');
    $state.go("login");
  };

  var symbol = $scope.symbol
  var userName = $scope.userName;

  $scope.addStock = function(symbol){
      symbol = symbol.split(",");
      loginService.addStock(symbol, userName).then(function(successData){
        $scope.stocks = successData.data.stocks;
      });
  };

  $scope.removeStock = function(symbol){
    loginService.removeStock(symbol, userName).then(function(successData){
      $scope.stocks = successData.data.stocks;
    });
  }

  $scope.deleteUser = function(){
    loginService.deleteUser(userName).then(function(successData){
      $state.go("register");
    });
  }

  $scope.getQuote = function(symbol){
    dataService.getQuote(symbol).then(function(successData){
      var headers = successData.data.dataset.column_names;
      var latestData = successData.data.dataset.data[0];
      var quote = {};
      headers.forEach(function(value, index){
        quote[value] = latestData[index];
      });
      //console.log("THis is the new quote object: ", quote);
      $scope.quote = quote;
      $scope.refreshTime = successData.data.dataset.refreshed_at;
    });
  }


});
