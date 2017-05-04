(function(){
  /*--------路由设置与获取基础信息开始--------------*/
  angular.module('merchantLogin',['ngRoute','merchantLogin-controller'])
	.controller('merNameCtrl',function($scope,$http){
		//从数据库中获得商家姓名
		$http({
            method:'GET',
            url:'sel-sellectSeller.action?chose=CHOSE',
        }).success(function(data){
            $scope.mer={
				name:data.seller.selName
			};
        });
	})
	.config(function($routeProvider){
	   $routeProvider
	      .when('/merchantInfo',{
	      	 templateUrl:'./view/merchantLogin/merchantInfo.html',
	  	     controller:'merInfoCtrl'
	      })
	      .when('/dealSuccess',{
	      	 templateUrl:'./view/merchantLogin/dealSuccess.html',
	  	     controller:'dealSuccCtrl'
	      })
	      .when('/dealing',{
	      	 templateUrl:'./view/merchantLogin/dealing.html',
	  	     controller:'dealingCtrl'
	      })
		   .when('/waitDealing',{
			   templateUrl:'./view/merchantLogin/waitDealing.html',
			   controller:'waitDealingCtrl'
		   })
		   .when('/waitSure',{
			   templateUrl:'./view/merchantLogin/waitSure.html',
			   controller:'waitSureCtrl'
		   })
	      .when('/bookAdmin',{
	      	 templateUrl:'./view/merchantLogin/bookAdmin.html',
	  	     controller:'bookAdminCtrl'
	      })
	      .when('/shopAdmin',{
	      	 templateUrl:'./view/merchantLogin/shopAdmin.html',
	  	     controller:'shopAdminCtrl'
	      })
	      .otherwise({redirectTo:'/merchantInfo'})
	});
	/*--------路由设置与获取基础信息结束--------------*/


	/*-------------展开与隐藏二级菜单开始-------------*/
	$('.child-menu-par').click(function(){
		var $sbilingItem=$(this).next();
		var $iconItem=$(this).children();
		var num=$(this).attr('data-id');
		if(num=='1'){
			//让我的书屋折叠
			$('.book-items').slideUp();
			$('.arrIcon-two').css('background-image','url("./images/down-arrow.png")');
			$('.book-items').removeClass('open');
		}
		if(num=='2'){
			//让订单查询折叠
			$('.order-items').slideUp();
			$('.arrIcon-one').css('background-image','url("./images/down-arrow.png")');
			$('.order-items').removeClass('open');
		}
		if($sbilingItem.hasClass('open')){
			//当当前点击元素是展开的时候
			$sbilingItem.slideUp();
			$iconItem.css('background-image','url("./images/down-arrow.png")');
			$sbilingItem.removeClass('open');
		}else{
			$sbilingItem.slideDown();
			$iconItem.css('background-image','url("./images/up-arrow.png")');
			$sbilingItem.addClass('open');
		}	
	});
	/*-------------展开与隐藏二级菜单结束-------------*/

	/*----根据商家点击不同的选项，高亮不同的条目并在右边显示不同的内容开始---*/
	$('.left-menus a').click(function(){
		var num=$(this).attr('data-id');
		$('.left-menus a').removeClass('height-left-mean');
		if(num!='1'&&num!='2'){
			$(this).addClass('height-left-mean');
		}else{
			//此时点击的是我的信息
			$('.my-info').addClass('height-left-mean');
		}
	});
	/*----根据商家点击不同的选项，高亮不同的条目并在右边显示不同的内容结束---*/
})();
