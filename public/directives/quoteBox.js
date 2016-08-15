app.directive('quoteBox',function(){
  return {
    restrict:'E',
    templateUrl:'directives/quoteBoxTempl.html',
    link:function($scope, elem, attr){
      $scope.stocksTest = "HELLO";
      console.log("This is stocks in the directive");
      console.log($scope.stocks);
    },
    scope:{
      stocks:'='
    }


  };
});
