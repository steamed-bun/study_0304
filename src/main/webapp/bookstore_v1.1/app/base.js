(function(){
	/*-----为首页导航部分添加鼠标悬浮时的效果开始-----*/
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
	/*-----为首页导航部分添加鼠标悬浮时的效果结束-----*/
	
	/*-----当鼠标悬浮在书籍大类上时显示书籍子类开始----*/
	//鼠标悬浮显示书籍子类菜单
	$book_class.mouseenter(function(){
		var bookClass=$(this).children()[0];
		var bookSubclass=$(this).children()[1];
		var bigCateId=$($(this).children()[0]).attr('data-id');
		var $whoNav=$($(this).children()[0]);//区分是哪个导航栏
		var childLen=$(this).children().length;
		var curHtml1='',
			curHtml2='',
			curSmCate,
			$aimElem=$(this);
		//console.log(bigCateId);
		//console.log($whoNav.get(0));
		//console.log($(this)[0]);
		//console.log($(this).children().length);
		//console.log($(this).children()[0]);
		//console.log($(this).children()[1]);
		//console.log($(this).children()[2]);
		$(bookSubclass).css('display','block');
		$nav_items.removeClass("cur-header-item");
		$(bookClass).addClass("cur-header-item");
		console.log('我被执行了');
		if(childLen==2){
			return;
		}
		console.log('期望能执行到这');
		//从数据库中获取该书籍大类的子类
		if(bigCateId!=0){
			$.ajax({
				type: 'POST',
				url: 'select-selectCategory.action',
				data: 'category.categoryPId='+bigCateId,
				success: function(data){
					console.log(data);
					var html='';
					curSmCate=data.categories;
					//用js动态创建书籍子类
					if(curSmCate && curSmCate.length!=0){
						//当有子类时才添加
						for(var i=0;i<curSmCate.length;i++){
							html+='<li><a href="book_list.html?bigCateId='+bigCateId+'&smCateId='+curSmCate[i].categoryId+'">'+curSmCate[i].categoryName+'</a></li>';
						}
						curHtml1='<div class="book-subclass-box"><ul class="container clearfix book-subclass-items">'+html+'</ul></div>';
						curHtml2='<div class="aside-subclass-box"><ul class="container clearfix book-subclass-items">'+html+'</ul></div>';
						if($whoNav.hasClass('top-nav')){
							$aimElem.append(curHtml1);
							//console.log('top-nav被执行');
						}
						if($whoNav.hasClass('aside-nav')){
							$aimElem.append(curHtml2);
							//console.log('aside-nav被执行');
						}
					}
				}
			});
		}else{
			console.log('最讨厌这里了');
		}

	});
	//鼠标离开隐藏书籍子类菜单
	$book_class.mouseleave(function(){
		var bookSubclass=$(this).children()[1];
		$(bookSubclass).css('display','none');
	});

	/*-----当鼠标悬浮在书籍大类上时显示书籍子类结束----*/

	/*------当页面滚动时显示固定在上部的菜单栏开始-----*/
	$(window).scroll(function(){
		var pageScrollTop=$(window).scrollTop();
		var $newHead=$('aside');
		if( pageScrollTop > 200){
			$newHead.slideDown("normal");
		}else{
			$newHead.slideUp("fast");
		}
	});
	/*------当页面滚动时显示固定在上部的菜单栏结束-----*/
	
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

	/*----鼠标悬浮时显示购物车里面的东西开始-----*/
	//页面一加载得到购物车中东西的数量
	var shopCarLen;
	$.ajax({
		type:"GET",
		url:"cartTo-getShopCart.action",
		dataType:"json",
		success:function(data){
			console.log(data);
			var perOrders=data.shopCart;
			shopCarLen=perOrders.length;
			$('.shop-num').html(shopCarLen+'<i></i>');
			$('.shop-big-num>b').html(shopCarLen);
			time_remain=20;
		},
		error:function(){
			console.log('我没有拿到购物车信息');
		}
	});
	//在搜索框旁边的购物车上，鼠标悬浮时显示购物车里面的内容
	$('.shopcar-icon').mouseenter(function(){
		//从session中获取与购物车相关的信息
		$.ajax({
			type:"GET",
			url:"cartTo-getShopCart.action",
			dataType:"json",
			success:function(data){
				console.log(data);
				var perOrders=data.shopCart;
				if(perOrders.length!=0){
					$('.shop-book-small-list-box').css('display','block');
					$('.shop-book-list').children().remove();
					var $fragment;//用来保存要添加的html片段
					var imgUrl,
						bName,
						bPrice,
						bNum;
					var prices=[],
						totalBookPrice=0;
					for(var i=0;i<perOrders.length;i++){
						console.log(perOrders[i]);
						imgUrl=perOrders[i].book.bookImages[0].imageURL;
						bName=perOrders[i].book.bookName;
						bTotalPrice=perOrders[i].itemMoney;
						bNum=perOrders[i].quantity;
						bId=perOrders[i].book.bookId;
						prices.push(bTotalPrice);
						console.log(imgUrl);
						console.log(bName);
						console.log(bTotalPrice);
						console.log(bNum);
						$fragment=$("<li><div class='shop-book-img'><a href='book_details.html?bookId="+bId+"' style='background:url("+imgUrl+") center center no-repeat;background-size:contain;'></a></div><div class='shop-book-baseInfo'><a href='javascript:;'>"+bName+"</a><a>x"+bNum+"</a></div><div class='shop-book-price'><span>￥"+bTotalPrice+"</span><i class='deleteCurBook' data-id='"+bId+"'></i></div></li>");
						$('.shop-book-list-small').append($fragment);
					}
					if(prices.length!=0){
						for(var index in prices){
							totalBookPrice+=parseFloat(prices[index]);
						}
					}
					$('.bookTotalPrice').html('￥'+totalBookPrice);
				}else{
					var $errorInfo=$('.oper-hint');
					$errorInfo.html('请先选购书籍！');
					$errorInfo.slideDown();//错误提示信息缓慢出现
					setTimeout(function(){
						$errorInfo.slideUp();
					},3000);
				}
			},
			error:function(){
				console.log('我没有拿到购物车信息');
			}
		});
	});
	//给去结算添加事件
	$('.goPayPage').click(function(){
		window.location.href='submit_order.html';
	});
	//给购物车里面的删除按钮添加事件
	$(".shop-book-list").on('click', 'i.deleteCurBook', function() {
		var bookId=$(this).attr('data-id');
		var $parElem=$(this).parent().parent();
		console.log($parElem[0]);
		var postData='shopCartItemTo.book.bookId='+bookId;
		console.log(bookId);
		console.log('我要删除');
		$.ajax({
			type: 'POST',
			url: 'cartTo-deleteItem.action',
			data: postData,
			dataType: 'JSON',
			success: function(data){
				console.log(data);
				if(data.status=='yes'){
					//删除成功
					$parElem.remove();
					shopCarLen--;
					$('.shop-num').html(shopCarLen+'<i></i>');
					$('.shop-big-num>b').html(shopCarLen);
				}
			}
		});
	});

	//在搜索框旁边的购物车上，鼠标离开时隐藏购物车里面的内容
	$('.shopcar-icon').mouseleave(function(){
		$('.shop-book-small-list-box').css('display','none');
	});
	//在划出的导航栏上，鼠标悬浮在购物车上时显示购物车里面的内容
	$('.shopcar-big-icon').mouseenter(function(){
		//从session中获取与购物车相关的信息
		$.ajax({
			type:"GET",
			url:"cartTo-getShopCart.action",
			dataType:"json",
			success:function(data){
				console.log(data);
				var perOrders=data.shopCart;
				if(perOrders.length!=0){
					$('.shop-book-big-list-box').css('display','block');
					$('.shop-book-list').children().remove();
					var $fragment;//用来保存要添加的html片段
					var imgUrl,
						bName,
						bPrice,
						bNum;
					var prices=[],
						totalBookPrice=0;
					for(var i=0;i<perOrders.length;i++){
						console.log(perOrders[i]);
						imgUrl=perOrders[i].book.bookImages[0].imageURL;
						bName=perOrders[i].book.bookName;
						bTotalPrice=perOrders[i].itemMoney;
						bNum=perOrders[i].quantity;
						bId=perOrders[i].book.bookId;
						prices.push(bTotalPrice);
						console.log(imgUrl);
						console.log(bName);
						console.log(bTotalPrice);
						console.log(bNum);
						$fragment=$("<li><div class='shop-book-img'><a href='book_details.html?bookId="+bId+"' style='background:url("+imgUrl+") center center no-repeat;background-size:contain;'></a></div><div class='shop-book-baseInfo shop-book-big-baseInfo'><a href='javascript:;'>"+bName+"</a><a>x"+bNum+"</a></div><div class='shop-book-price shop-book-big-price'><span>￥"+bTotalPrice+"</span><i class='deleteCurBook' data-id='"+bId+"'></i></div></li>");
						$('.shop-book-list-big').append($fragment);
					}
					if(prices.length!=0){
						for(var index in prices){
							totalBookPrice+=parseFloat(prices[index]);
						}
					}
					$('.bookTotalPrice').html('￥'+totalBookPrice);
				}else{
					var $errorInfo=$('.oper-hint');
					$errorInfo.html('请先选购书籍！');
					$errorInfo.slideDown();//错误提示信息缓慢出现
					setTimeout(function(){
						$errorInfo.slideUp();
					},3000);
				}
			},
			error:function(){
				console.log('我没有拿到购物车信息');
			}
		});
	});
	//在搜索框旁边的购物车上，鼠标离开时隐藏购物车里面的内容
	$('.shopcar-big-icon').mouseleave(function(){
		$('.shop-book-big-list-box').css('display','none');
	});
	/*----鼠标悬浮时显示购物车里面的东西结束-----*/

	/*---与页面跳转相关的开始-----*/
	//页面跳转到登录页
	$(".login-txt").click(function(){
		location.href="sign.html#/login";
	});
	//页面跳转到注册页
	$(".regist-txt").click(function(){
		location.href="sign.html#/register";
	});
	/*---与页面跳转相关的结束-----*/

	/*--------根据数名搜索书籍开始-----------*/
	$('.search-icon').click(function(){
		var keyWord=$('.keywords-search').val();
		console.log(keyWord);
		if(!keyWord){
			//当用户没有输入搜索关键字时，给出提示，不去数据库中查书籍
			$('.oper-hint').html('请输入书名！');
			$('.oper-hint').slideDown();//错误提示信息缓慢出现
			setTimeout(function(){
				$('.oper-hint').slideUp();
			},3000);
			return;
		}
		//TODO 在数据库中搜索指定书籍
		$.ajax({
			type: 'POST',
			url: 'book-getBookForSearch.action',
			data: 'book.bookName='+keyWord+'&pageNum=1&totalPageNo=0',
			dataType: 'JSON',
			success: function(data){
				console.log(data);
				if(data.status=='no'){
					//当没有搜索到指定书籍时
					window.location.href='no_book_hint.html?bookName='+keyWord;
				}else{
					window.location.href='search_book_list.html?bookName='+keyWord;
				}
			}
		});
	});
	/*--------根据数名搜索书籍结束-----------*/

	/*-----显示倒计时开始------*/
	var time_remain=sessionStorage.getItem('time_remain');
	if(time_remain){
		$('.clearShopCarTime').html(time_remain+'分钟');
		var timer=setInterval(function(){
			time_remain--;
			$('.clearShopCarTime').html(time_remain+'分钟');
			if(time_remain==0){
				sessionStorage.removeItem('time_remain');
				clearInterval(timer);
				//TODO  向后台发送时间已到
				$('.shop-book-big-list-box').css('display','none');
				$('.shop-book-small-list-box').css('display','none');
				$('.shop-book-list').children().remove();
				$('.shop-num').html('0<i></i>');
				$('.shop-big-num>b').html('0');
			}
		},3000)
	}
	/*-----显示倒计时结束------*/

	/*----显示用户名开始--*/
	var userIsLogin=sessionStorage.getItem('isLogin');
	if(userIsLogin){
		//当为真时，意味着用户已登录
		$('.already-login-aside-img-box').css('display','block');
		$('.already-user-box').css('display','block');
		$('.shopcar-icon').css('display','inline-block');
		$('.not-already-login-aside-img-box').css('display','none');
		$('.not-already-user-box').css('display','none');
		console.log('我已登录');
	}else{
		//当为假时，意味着用户未登录
		$('.already-login-aside-img-box').css('display','none');
		$('.already-user-box').css('display','none');
		$('.shopcar-icon').css('display','none');
		$('.not-already-login-aside-img-box').css('display','block');
		$('.not-already-user-box').css('display','block');
		console.log('我没有登录');
	}
	/*----显示用户名结束--*/
})();
