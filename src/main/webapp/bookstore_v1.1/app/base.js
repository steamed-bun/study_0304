(function(){
	// 为首页导航部分添加鼠标悬浮时的效果----开始
	var $nav_items=$(".header-items a"),
		$book_class=$('.header-items>li:gt(0)'),
		$homepage=$('.header-items>li:eq(0) a');
	$nav_items.bind("click",function(){
		$nav_items.removeClass("cur-header-item");
		$(this).addClass("cur-header-item");
	});
	$homepage.mouseenter(function(){
		$nav_items.removeClass("cur-header-item");
		$(this).addClass("cur-header-item");
	});
	// 为首页导航部分添加鼠标悬浮时的效果----结束
	
	//当鼠标悬浮在书籍大类上时显示书籍子类---开始
	//鼠标悬浮显示书籍子类菜单
	$book_class.mouseenter(function(){
		var bookClass=$(this).children()[0];
		var bookSubclass=$(this).children()[1];
		$(bookSubclass).css('display','block');
		$nav_items.removeClass("cur-header-item");
		$(bookClass).addClass("cur-header-item");
	});
	//鼠标离开隐藏书籍子类菜单
	$book_class.mouseleave(function(){
		var bookSubclass=$(this).children()[1];
		$(bookSubclass).css('display','none');
	});
	//当鼠标悬浮在书籍大类上时显示书籍子类---结束

	//当页面滚动时显示固定在上部的菜单栏-----开始
	$(window).scroll(function(){
		var pageScrollTop=$(window).scrollTop();
		var $newHead=$('aside');
		if( pageScrollTop > 200){
			$newHead.slideDown("normal");
		}else{
			$newHead.slideUp("fast");
		}
	});
	//当页面滚动时显示固定在上部的菜单栏-----结束
	
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
})();