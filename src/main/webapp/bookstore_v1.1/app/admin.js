angular.module('admin',['ngRoute','admin-controller'])
	.controller('adminNameCtrl',function($scope){
		/*-------------展开与隐藏二级菜单开始-------------*/
		$('.child-menu-par').click(function(){
			var $sbilingItem=$(this).next();
			var $iconItem=$(this).children();
			var num=$(this).attr('data-id');
			//二级菜单进行折叠的函数
			var fold=function($aimElem,$aimIcon){
				$aimElem.slideUp();
				$aimIcon.css('background-image','url("./images/down-arrow.png")');
				$aimElem.removeClass('open');
			};
			switch(num){
				case '1':
					//让信息统计折叠
					$('.book-items').slideUp();
					$('.arrIcon-two').css('background-image','url("./images/down-arrow.png")');
					$('.book-items').removeClass('open');
					break;
				case '2':
					//让书籍推荐折叠
					$('.book-items').slideUp();
					$('.arrIcon-two').css('background-image','url("./images/down-arrow.png")');
					$('.book-items').removeClass('open');
					break;
				case '3':
					//让订单查询折叠
					$('.book-items').slideUp();
					$('.arrIcon-two').css('background-image','url("./images/down-arrow.png")');
					$('.book-items').removeClass('open');
					break;
				case '4':
					//让级别评定折叠
					$('.book-items').slideUp();
					$('.arrIcon-two').css('background-image','url("./images/down-arrow.png")');
					$('.book-items').removeClass('open');
					break;
				case '5':
					//让管理书籍类别折叠
					$('.book-items').slideUp();
					$('.arrIcon-two').css('background-image','url("./images/down-arrow.png")');
					$('.book-items').removeClass('open');
					break;
			}
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
	});