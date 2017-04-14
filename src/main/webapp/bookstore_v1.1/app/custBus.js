(function(){
	/*---------------顾客登录后的首页特效开始-----------------*/ 
	//在顶部的导航栏上，当鼠标悬浮在用户名上时，显示更多菜单
	$(".user-box").mouseenter(function(){
		$(".user-bus").css("display","block");

	});
	$(".user-box").mouseleave(function(){
		$(".user-bus").css("display","none");
	});
	//在划出的导航栏上，当鼠标悬浮在用户头像上时，显示更多菜单
	$(".aside-user-box").mouseenter(function(){
		$(".aside-user-bus").css("display","block");
	});
	$(".aside-user-box").mouseleave(function(){
		$(".aside-user-bus").css("display","none");
	});
	/*---------------顾客登录后的首页特效结束-----------------*/
	

	/*------------顾客登录后各种业务开始----------------*/
	angular.module('custBus',['ngRoute','custBus-controller'])
	  .controller('custBusCtrl',function($scope,$location,$timeout){
	  	//此处是对顾客登录后各种业务，左侧栏各项的控制
	  	
	  	//基础的数据设置---开始
	  	//TODO   此处应该从数据库中取得相关信息
	  	$scope.user={
	  	  img:'images/userImg.jpg',
	  	  name:'花开半夏',
	  	};
	  	$scope.changeImgHint='成功了吗';
	  	//基础的数据设置---结束

	  	// 改变头像---开始
	  	//显示改变头像box
	  	$scope.showChangeImg=function(){
	  	  $scope.changeImgBox={
	  	  	"display":"block"
	  	  };
	  	};
	  	//隐藏改变头像box
	  	$scope.hideChangeImg=function(){
	  	  $scope.changeImgBox={
	  	  	"display":"none"
	  	  };
	  	};
	 
	  	//对所选择的图片做处理
	  	var options={
	  		thumbBox: '.thumbBox',
			spinner: '.spinner',
			imgSrc: $scope.user.img
	  	};
	  	var cropper = $('.cust-img-box').cropbox(options);//调用图片上传插件的方法
	  	//实现用户头像的更新
	  	var subImg='';//裁剪后图片的url
	  	var getImg=function(){
	  		subImg = cropper.getDataURL();
	  		$('.custBus-icon>img').attr('src',subImg);
	  	}
	  	//实现图片的移动
	  	$('#loadImg').on('change', function(){
			var reader = new FileReader();
			reader.onload = function(e) {
				options.imgSrc = e.target.result;
				cropper = $('.cust-img-box').cropbox(options);
			}
			reader.readAsDataURL(this.files[0]);
			getImg();
		});
		$('.bigger-img').on('click', function(){
			cropper.zoomIn();//将图片放大
		});
		$('.smaller-img').on('click', function(){
			cropper.zoomOut();//将图片缩小
		});	
		$(".cust-img-box").on("mouseup",function(){
 			getImg();//鼠标移动时，实时更新用户头像
  		});

  		//给保存按钮加事件保存用户新的头像到数据库中
  		$scope.saveImg=function(){
  			//TODO 将用户新的头像保存到数据库中
  			//TODO 此处要根据后台给的反馈实时给用户提示
  			alert("我要保存到数据库中了");
  		};
	  	// 改变头像---结束

	  	//对下面各业务项添加鼠标单击事件---开始
	  	$scope.jumpInfo=function(){
	  	  //跳到个人资料呢
	  	  $location.path('/custInfo');
	  	};
	  	$scope.jumpOrder=function(){
	  	  //跳到订单管理
	  	  $location.path('/orderMange');
	  	};
	  	$scope.jumpAddress=function(){
	  	  //跳到地址管理
	  	  $location.path('/addrMange');
	  	};
	  	$scope.jumpAccount=function(){
	  	  //跳到账户安全
	  	  $location.path('/accountMange');
	  	};
	  	//对下面各业务项添加鼠标单击事件---结束
	  })
	  .config(function($routeProvider){
	  	 $routeProvider
	  	    .when('/custInfo',{
	  	       templateUrl:'view/custBus/cust_info.html',
	  	       controller:'custInfoCtrl'
	  	    })
	  	    .when('/orderMange',{
	  	       templateUrl:'view/custBus/order_mange.html',
	  	       //controller:'orderMangeCtrl'
	  	    })
	  	    .when('/addrMange',{
	  	       templateUrl:'view/custBus/addr_mange.html',
	  	       //controller:'addrMangeCtrl'
	  	    })
	  	    .when('/accountMange',{
	  	       templateUrl:'view/custBus/account_mange.html',
	  	       //controller:'accountMangeCtrl'
	  	    })
	  	    .when('/changeTelOne',{
	  	    	templateUrl:'view/custBus/changeTel/change_tel_one.html',
	  	    	controller:'changeTelOneCtrl'
	  	    })
	  	    .when('/changeTelTwo',{
	  	    	templateUrl:'view/custBus/changeTel/change_tel_two.html',
	  	    	controller:'changeTelTwoCtrl'
	  	    })
	  	    .when('/changeTelThree',{
	  	    	templateUrl:'view/custBus/changeTel/change_tel_three.html',
	  	    	//controller:'changeTelThreeCtrl'
	  	    })
	  	    .when('/displayDetail',{
	  	    	templateUrl:'view/custBus/orderDetails/order.html',
	  	    	//controller:'displayDetailCtrl'
	  	    })
	  	    .otherwise({redirectTo:'/custInfo'})
	  });
	/*------------顾客登录后各种业务结束----------------*/ 
})();






