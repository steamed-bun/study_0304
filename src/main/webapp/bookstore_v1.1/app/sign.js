//配置sign页的路由开始
angular.module('sign',['ngRoute','sign-controller'])
       .config(function($routeProvider){
       		$routeProvider
       			.when('/login',{
       				templateUrl:'view/sign/login.html',
       				controller:'loginCtrl'
       			})
       			.when('/register',{
       				templateUrl:'view/sign/register.html',
       				controller:'registerCtrl'
       			})
       			.otherwise({
       				// 重定向到开始页面
       				redirectTo:'/login'
       			});
       });
//配置sign页的路由结束