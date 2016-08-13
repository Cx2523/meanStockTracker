app.service('loginService',function($http){
///////////////////////////////////////////////////////////////////////////////
  this.loginFacebook = function(){
    $http({
      method:'GET',
      url:'http://localhost:8080/auth/facebook'
    }).then(function(successData){
      console.log("Successfully logged in");
      console.log(successData);
    })
  }
///////////////////////////////////////////////////////////////////////////////
  this.registerLocal = function(name, email, pw){
    return $http({
      method:'POST',
      url:'http://localhost:8080/auth/register',
      data:JSON.stringify({
        "name":name,
        "email":email,
        "password":pw})
    }).then(function(successData){
      console.log("Successfully logged in");
      console.log(successData);
      return successData;
    })
  }
///////////////////////////////////////////////////////////////////////////////
this.loginLocal = function(email, pw){
  return $http({
    method:'POST',
    url:'http://localhost:8080/auth/login',
    data:JSON.stringify({
      "email":email,
      "password":pw})
  }).then(function(successData){
    console.log("Successfully logged in");
    console.log(successData);
    return successData;
  })
}

this.addStock = function(symbol, userName){
  return $http({
    method:'POST',
    url:'http://localhost:8080/user/:username',
    data:JSON.stringify({
      "symbol":symbol,
      "name":userName})
  }).then(function(successData){
    console.log("Successfully logged in");
    console.log(successData);
    return successData;
  })
}

this.removeStock = function(symbol, userName){
  return $http({
    method:'PUT',
    url:'http://localhost:8080/user/:username',
    data:JSON.stringify({
      "symbol":symbol,
      "name":userName})
  }).then(function(successData){
    return successData;
  })
}

this.deleteUser = function(userName){
  return $http({
    method:'PATCH',
    url:'http://localhost:8080/user/:username',
    data:JSON.stringify({
      "name":userName})
  }).then(function(successData){
    return successData;
  })
}






});
