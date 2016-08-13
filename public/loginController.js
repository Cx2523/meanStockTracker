app.controller('loginCtrl', function($scope, $state, $stateParams, loginService){
  //$scope.test = "This is in the controller";

  $scope.loginFacebook = function(){
    loginService.loginFacebook();
  };

  $scope.registerLocal = function(){
    loginService.registerLocal($scope.Name, $scope.Email, $scope.pw).then(function(successData){

      localStorage.setItem('profile',JSON.stringify(successData));
      $stateParams.username; //= successData.data.userName;
      $state.go("user",{username:successData.data.userName});

    });
  };

  $scope.loginLocal = function(){

      loginService.loginLocal($scope.loginEmail, $scope.loginpw)
          .then(function(successData){
            //The back end needs to send back the user data here
            //and then transition to the user page for that user.
            // console.log("successData",successData);
            // $scope.userName = successData.data.userName;
            // console.log("$scope.userName", $scope.userName);
            localStorage.setItem('profile',JSON.stringify(successData));

            $stateParams.username; //= successData.data.userName;
            $state.go("user",{username:successData.data.userName});
          });
  };





});
