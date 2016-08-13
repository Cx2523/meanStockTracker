var app = angular.module('stock_app',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('home',{
    url: '/home',
    templateUrl:'./html_Templates/home_Page.html'
  })
  .state('register',{
    url:'/register',
    templateUrl:'./html_Templates/register.html',
    controller:'loginCtrl'
  })
  .state('login',{
    url:'/login',
    templateUrl:'./html_Templates/login.html',
    controller:'loginCtrl'
  })
  .state('user',{
    url:'/user/:username',
    templateUrl:'./html_Templates/user.html',
    controller:'userCtrl'
  });


  $urlRouterProvider.otherwise('/home');

});
