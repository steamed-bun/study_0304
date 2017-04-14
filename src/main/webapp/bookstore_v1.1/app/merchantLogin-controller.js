angular.module('merchantLogin-controller',[])
  .controller('merInfoCtrl',function($scope,MerchantName){
  		/*-----------基础的数据设置开始----------*/
	  	//TODO   此处应该从数据库中取得相关信息
	  	$scope.user={
	  	  img:'./images/userImg.jpg',
	  	  name:MerchantName.name,
	  	  age:20,
	  	  sex:'女',
	  	  mail:'2814241400@qq.com',
	  	  id:'611111199301131229',
	  	  pwd:'hzx121314?',
	  	  rePwd:'hzx121314?'
	  	};
	  	$scope.changeImgHint='成功了吗';
	  	/*-----------基础的数据设置结束-----------*/
	  	


	  	/*----------与更换头像相关的事件开始-------*/
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
	  		$('.my-img>img').attr('src',subImg);
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
	  	/*----------与更换头像相关的事件结束-------*/

	  	/*-----保存商家信息开始--------*/
	  	$scope.saveMerInfo=function(){
	  		alert('已保存商家信息');
	  	}
	  	/*-----保存商家信息结束--------*/
  })
  .controller('bookAdminCtrl',function($scope){
	  	/*-------书籍管理获取基础信息开始-----------*/
	  	//此处应从数据库中获得书籍信息
	  	$scope.bookNum={
	  		edu:344,
	  		story:112,
	  		art:97,
	  		youth:102,
	  		child:99,
	  		life:123,
	  		hum:99,
	  		manage:109,
	  		motivate:113,
	  		science:89,
	  		reference:56
	  	};
	  	/*-------书籍管理获取基础信息结束-----------*/


	  	/*-----与页面样式相关的功能函数开始------*/
	  	//展开、折叠更多书籍类别
	  	$scope.showMoreCate=function(){
	  		$('.book-cate-more').toggle(500);
	  	};
	  	//点击设置时显示或隐藏编辑或删除选项
	  	$('.oper-icon').click(function(){
	  		$siblingItem=$(this).next();
	  		$siblingItem.toggle(500);
	  	});
	  	/*
	  	//鼠标移除时隐藏操作
	  	$('.book-display>li').mouseleave(function(){
	  		$bookOper=$(this).children('.book-img-edit').children('.book-oper');
	  		$bookOper.css('display','none');
	  	});
	  	*/
	    //调用分页页码插件，实现分页功能
	    $('.page-area').cypager({
	    	pg_size:25,
	    	pg_nav_count:8,
	    	pg_total_count:300,
	    	pg_prev_name:'前一页',
	    	pg_next_name:'后一页',
	    	pg_call_fun:function(count){
	    		//此处应到数据库中拿数据
	    		console.log('当前要请求第'+count+'页');
	    	}
	    });
	    //根据商家点击不同的数字显示不同的内容
	    
	  	/*-----与页面样式相关的功能函数结束------*/
  })
  .controller('shopAdminCtrl', function($scope){
  		/*----------基础数据设置开始--------------*/
  			//TODO   此处应该从数据库中取得相关信息
	  	$scope.user={
	  	  img:'./images/userImg.jpg',
	  	  name:'妖精的口袋',
	  	  notice:'主营儿童书籍主营儿童书籍主营儿童书籍主营儿童书籍主营儿童书籍',
	  	  degree:2,
	  	  province:'陕西',
	  	  city:'西安',
	  	  countryName:'长安',
	  	  street:'子午'
	  	};
	  	$scope.changeImgHint='成功了吗';
	  	/*-----------基础的数据设置结束-----------*/
	  	


	  	/*----------与更换头像相关的事件开始-------*/
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
	  		$('.my-img>img').attr('src',subImg);
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
	  	/*----------与更换头像相关的事件结束-------*/

	  	/*-----保存商家信息开始--------*/
	  	$scope.saveMerInfo=function(){
	  		alert('已保存商家信息');
	  	}
	  	/*-----保存商家信息结束--------*/
  		
  		/*--------与页面样式相关的功能函数开始-----------*/
  		//点击不同的标签显示不同的内容
  		$('.shop-admin-title>span').click(function(){
  			var curLable=$(this);
  			var id=$(this).attr('data-id');
  			$('.shop-admin-title>span').removeClass('highlight-title');
  			curLable.addClass('highlight-title');
  			switch(id){
  				case '1':
  					$('.shop-info-box').css('display','block');
  					$('.shop-stat-box').css('display','none');
  					break;
  				case '2':
  					$('.shop-info-box').css('display','none');
  					$('.shop-stat-box').css('display','block');
  					break;
  			}
  		});
  		//当输入框获得焦点时，高亮显示输入框
  		$('input[type="text"]').focus(function(){
  			$(this).css('border','#a1c1c0 solid 1px');
  		});
  		//当输入框失去焦点时，正常显示输入框
  		$('input[type="text"]').blur(function(){
  			$(this).css('border','#DDD solid 1px');
  		});

  		/*--------与页面样式相关的功能函数结束-----------*/
  })
  .controller('dealSuccCtrl',function($scope){

  })
  .controller('dealingCtrl', function($scope){

  });