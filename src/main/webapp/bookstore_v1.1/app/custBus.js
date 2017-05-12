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
	  .controller('custBusCtrl',function($scope,$location,$timeout,$http){
		  //获得地址栏中的参数
		  var locationHref=$location.path();
		  console.log(locationHref);
		  //根据地址栏中的参数高亮地址栏中对应的操作名称
		  switch(locationHref){
			  case '/custInfo':
				  $('.custBus-items>li').removeClass('highlight-oper');
				  $('.custBus-items>li:nth-child(1)').addClass('highlight-oper');
				  break;
			  case '/orderMange':
				  $('.custBus-items>li').removeClass('highlight-oper');
				  $('.custBus-items>li:nth-child(2)').addClass('highlight-oper');
				  break;
			  case '/addrMange':
				  $('.custBus-items>li').removeClass('highlight-oper');
				  $('.custBus-items>li:nth-child(3)').addClass('highlight-oper');
				  break;
		  }
		  //此处是对顾客登录后各种业务，左侧栏各项的控制
		  //基础的数据设置---开始
		  $scope.user={
			   img:'images/userImg.jpg',
			   name:'花开半夏'
		  };
	  		//从数据库中获取用户头像和姓名
		  $http({
			  method:'POST',
			  url:'user-sellectUser.action',
			  data: 'chose=CHOOSE',
			  headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
		  }).success(function(data){
				data=data.user;
				$scope.user.img=data.userImage;
				$scope.user.name=data.userName;
		  });
		  $scope.changeImgHint='';
		  $scope.img={imgId:''};
	  	  //基础的数据设置---结束

	  	  // 改变头像---开始
	  	  //显示改变头像box
	  	  $scope.showChangeImg=function(){
	  	  	 $scope.changeImgBox={
	  	  		"display":"block"
	  	  	 };
			//对所选择的图片做处理
			var options={
				thumbBox: '.thumbBox',
				spinner: '.spinner',
				imgSrc: $('.custBus-icon>img').attr('src')
			};
			var cropper = $('.cust-img-box').cropbox(options);//调用图片上传插件的方法
			//实现用户头像的更新
			var subImg='';//裁剪后图片的url
			var getImg=function(){
				subImg = cropper.getDataURL();
				$('.custBus-icon>img').attr('src',subImg);
			}
			//实现图片的移动
			$('#userImage').on('change', function(e){
				$scope.img.imgId=$(this).attr('id');
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
				console.log("我要保存到数据库中了");
				var subImg = cropper.getDataURL();
				$('.custBus-icon>img').attr('src',subImg);
				$('.custBus-icon>img').attr('ng-src',subImg);
				$.ajaxFileUpload({
					url: "upLoad-saveUserImage.action",// 文件上传服务器请求Action
					secureuri: true,// 安全提交，默认为false
					fileElementId: $scope.img.imgId,// 文件类型的id
					dataType: "text",// 返回值类型
					success: function (data) {// 服务器响应成功
						$scope.changeImgHint='上传成功！';
						$('.operHint').css('display','block');
						$scope.$apply(); //传播Model的变化。
						getImg();
					},
					error: function (data) {// 服务器响应失败
						console.log('服务器有问题，请稍后再试');
						$scope.changeImgHint='服务器有问题，请稍后再试！';
						$scope.$apply(); //传播Model的变化。
					}
				});
			};
			// 改变头像---结束
		  };
	  	   //隐藏改变头像box
	  	   $scope.hideChangeImg=function(){
	  	       $scope.changeImgBox={
	  	  		"display":"none"
			   };
			   $('.operHint').css('display','none');
	  	   };
	 

	  	//对下面各业务项添加鼠标单击事件---开始
	  	$scope.jumpInfo=function($event){
	  	  	//跳到个人资料呢
			$('.custBus-items>li').removeClass('highlight-oper');
			$($event.target).addClass('highlight-oper');
	  	  	$location.path('/custInfo');
	  	};
	  	$scope.jumpOrder=function($event){
	  	    //跳到订单管理
			$('.custBus-items>li').removeClass('highlight-oper');
			$($event.target).addClass('highlight-oper');
	  	    $location.path('/orderMange');
	  	};
	  	$scope.jumpAddress=function($event){
	  	    //跳到地址管理
			$('.custBus-items>li').removeClass('highlight-oper');
			$($event.target).addClass('highlight-oper');
	  	    $location.path('/addrMange');
	  	};
	  	$scope.jumpAccount=function($event){
	  	    //跳到账户安全
			$('.custBus-items>li').removeClass('highlight-oper');
			$($event.target).addClass('highlight-oper');
	  	    $location.path('/accountMange');
	  	};
		  //切换账户
		  $scope.changeAccount=function(){
			  window.href="sign.html#/login";
			  console.log('我要进行页面跳转啦');
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
	  	       controller:'addrMangeCtrl'
	  	    })
	  	    .when('/accountMange',{
	  	       templateUrl:'view/custBus/account_mange.html',
	  	       controller:'accountMangeCtrl'
	  	    })
	  	    .when('/changeTelOne/:userId/:email',{
	  	    	templateUrl:'view/custBus/changeTel/change_tel_one.html',
	  	    	controller:'changeTelOneCtrl'
	  	    })
	  	    .when('/changeTelTwo/:userId',{
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






