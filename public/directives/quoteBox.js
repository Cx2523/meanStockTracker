app.directive('quoteBox',function(){
  return {
    restrict:'E',
    templateUrl:'directives/quoteBoxTempl.html',
    link:function($scope, elem, attr){
      // console.log("This is stocks in the directive");
      // console.log($scope.stocks);
    },
    scope:{
      stock:'='
    },
    controller:"userCtrl"


  };
});
