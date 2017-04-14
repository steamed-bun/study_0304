(function(){
	// 为首页导航部分添加鼠标悬浮时的效果----开始
	var $nav_items=$(".header-items a");
	$nav_items.bind("click",function(){
		$nav_items.removeClass("cur-header-item");
		$(this).addClass("cur-header-item");
	});
	// 为首页导航部分添加鼠标悬浮时的效果----结束
	
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