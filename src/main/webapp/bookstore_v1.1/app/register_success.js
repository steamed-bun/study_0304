angular.module('registerSucc',[])
   .controller('registerSuccCtrl',function($scope,$interval,$location,$window){
   		/*---添加倒计时开始-----*/
   		$scope.time=5;
   		var absUrl;
   		var markIndex;
   		var newUrl;
		var timer = $interval(function(){
			$scope.time--;
			if($scope.time==0){
				//清除定时器
				$interval.cancel(timer);
				//当倒计时完后，页面跳转到登录页
				absUrl=$location.absUrl();
				markIndex=absUrl.lastIndexOf('/');
				newUrl=absUrl.slice(0,markIndex)+'/sign.html#/login';
				$window.location.href=newUrl;
				console.log($location.absUrl());
			}
		},1000);
   		/*---添加倒计时结束-----*/
   });