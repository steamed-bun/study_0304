(function(){
	/*----------------与数据相关开始---------------------*/
	//首页焦点轮播图开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/indexBook.json",
			dataType:"json",
			success:function(data){
				console.log("indexBook.json文件请求成功");
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<5;i++){
					$(".slides>li>a>img")[i].src=data[i].img;
				}
			},
			error:function(){
				console.log("indexBook.json文件未得到");
			}
		});
	});
	//首页焦点轮播图结束
	
	//新书推荐开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/newBook.json",
			dataType:"json",
			success:function(data){
				console.log("newBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><div class='new-mask'></div><div class='new-book-txt'><p>"+data[i].nNanme+"</p><p>"+data[i].nPrice+"</P></div></a></li>");
					$(".new-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("newBook.json文件未得到");
			}
		});
	});
	//新书推荐结束
	
	//教育类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/eduBook.json",
			dataType:"json",
			success:function(data){
				console.log("eduBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".edu-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("eduBook.json文件未得到");
			}
		});
	});
	//教育类书籍结束
	
	//小说类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/storyBook.json",
			dataType:"json",
			success:function(data){
				console.log("storyBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".story-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("storyBook.json文件未得到");
			}
		});
	});
	//小说类书籍结束
	
	//文艺类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/literaryBook.json",
			dataType:"json",
			success:function(data){
				console.log("literaryBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".literary-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("literaryBook.json文件未得到");
			}
		});
	});
	//文艺类书籍结束
	
	//青春类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/youthBook.json",
			dataType:"json",
			success:function(data){
				console.log("youthBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".youth-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("youthBook.json文件未得到");
			}
		});
	});
	//青春类书籍结束
	
	//童书类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/childBook.json",
			dataType:"json",
			success:function(data){
				console.log("childBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".child-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("childBook.json文件未得到");
			}
		});
	});
	//童书类书籍结束
	
	//生活类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/lifeBook.json",
			dataType:"json",
			success:function(data){
				console.log("lifeBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".life-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("lifeBook.json文件未得到");
			}
		});
	});
	//生活类书籍结束
	
	//人文社科类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/humanBook.json",
			dataType:"json",
			success:function(data){
				console.log("humanBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".human-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("humanBook.json文件未得到");
			}
		});
	});
	//人文社科类书籍结束
	
	//经管类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/chargeBook.json",
			dataType:"json",
			success:function(data){
				console.log("chargeBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".charge-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("chargeBook.json文件未得到");
			}
		});
	});
	//经管类书籍结束
	
	//励志类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/motivateBook.json",
			dataType:"json",
			success:function(data){
				console.log("motivateBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".motivate-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("motivateBook.json文件未得到");
			}
		});
	});
	//励志类书籍结束
	
	//科技类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/scienceBook.json",
			dataType:"json",
			success:function(data){
				console.log("scienceBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".science-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("scienceBook.json文件未得到");
			}
		});
	});
	//科技类书籍结束
	
	//工具类书籍开始
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/referenceBook.json",
			dataType:"json",
			success:function(data){
				console.log("referenceBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<4;i++){
					var isGoodBook=parseInt(data[i].isGoodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					if(isGoodBook==1){
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='javascript:;'><img src='"+data[i].img+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].recommend+"</p><h4>"+data[i].title+"</h4><span>"+data[i].price+"</span></div></li>");
					}
					$(".reference-book-list").append($fragment);
				}
			},
			error:function(){
				console.log("referenceBook.json文件未得到");
			}
		});
	});
	//工具书类书籍结束
	
	//大家都在说开始
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
	//大家都在说结束
	/*----------------与数据相关结束---------------------*/

	/*--------------与特效相关开始------------------------*/
	// 首页轮播图处的js-----开始
	$('#indexFocusBox').flexslider({
		animation: "fade",
		direction:"horizontal",
		easing:"swing"
	});		
	// 首页轮播图处的js-----结束
	
	//大家都在说图片活动效果----开始 
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
	//大家都在说图片活动效果----结束 
	/*--------------与特效相关结束------------------------*/

	/*-----------------与页面跳转相关--------------------*/ 
	//页面跳转到登录页
	$(".login-txt").click(function(){
		location.href="sign.html";
	});
	//页面跳转到注册页
	$(".regist-txt").click(function(){
		location.href="sign.html#/register";
	});
})();