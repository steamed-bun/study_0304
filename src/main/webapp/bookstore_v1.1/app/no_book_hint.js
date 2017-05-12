(function(){
	//从地址栏中获得书籍名称
	var locationHref=window.location.href;
	locationHref=locationHref.slice(locationHref.indexOf('?')+1);
	var locationHref=locationHref.split('=');
	var bookName=decodeURI(locationHref[1]);
	console.log(bookName);
	$('.searchBookName').html(bookName);
	/*----------------与数据相关开始---------------------*/
	//猜你喜欢开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/weSay.json",
			dataType:"json",
			success:function(data){
				console.log("weSay.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<16;i++){
					$fragment=$("<li><div class='say-img-box'><img src='"+data[i].img+"'/></div><p class='say-book-info clearfix'><a href='javascript:;'>"+data[i].title+"</a><i>"+data[i].price+"</i></p></li>");
					$(".say-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("weSay.json文件未得到");
			}
		});
	});
	//猜你喜欢结束
	/*----------------与数据相关结束---------------------*/

	/*--------------与特效相关开始------------------------*/
	// 首页轮播图处的js-----开始
	$('#indexFocusBox').flexslider({
		animation: "fade",
		direction:"horizontal",
		easing:"swing"
	});		
	// 首页轮播图处的js-----结束
	
	//猜你喜欢图片活动效果----开始 
	var $sayBookList=$('.say-book-list');
	var sayBookWidth=276;//每张图片的宽度
	var timer;
	function nextImg(){
		var curLeft=parseInt($sayBookList.css('left'));
		var newLeft=curLeft-sayBookWidth;
		if(curLeft>-12*sayBookWidth){
			$sayBookList.animate({left:newLeft},1000);
		}else{
			$sayBookList.animate({left:0},1000);
		}
	}
	function prevImg(){
		var curLeft=parseInt($sayBookList.css('left'));
		var newLeft=curLeft+sayBookWidth;
		if(curLeft<0){
			$sayBookList.animate({left:newLeft},1000);
		}else{
			$sayBookList.animate({left:-12*sayBookWidth},1000);
		}
	}
	$('.we-say-next').click(nextImg);
	$('.we-say-prev').click(prevImg);
	$(function(){
		timer=setInterval(nextImg,3000);
	});
	$('.we-say-book-box').mouseenter(function(){
		clearInterval(timer);
	});
	$('.we-say-book-box').mouseleave(function(){
		timer=setInterval(nextImg,3000);
	});
	//猜你喜欢图片活动效果----结束 
	/*--------------与特效相关结束------------------------*/

	/*---------------顾客登录后的首页特效-----------------*/ 
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
})();