angular.module('bookList',[])
	.controller('bookListCtrl',function($scope){
		/*---------------多图旋转轮播图开始------------*/
		//设置基础变量
		var $butLeft=null,
		    $butRight=null,
		  	$butPlay=null,
			$imglist=null,
			origin='232px 648px',  //前者是单张图片的宽度，后者根据情况调（只是为了将图片的中心点往下移）
			originImg='232px 680px',
			//TODO 此处应从数据库中获得相关图片
			imgs=[
						['./images/spotlight/s00005.jpg','./images/spotlight/s00002.jpg','./images/spotlight/s00004.jpg','./images/spotlight/s00002.jpg','./images/spotlight/s00001.jpg'],
						['./images/spotlight/s00006.jpg','./images/spotlight/s00007.jpg','./images/spotlight/s00003.jpg','./images/spotlight/s00002.jpg','./images/spotlight/s00001.jpg'],
						['./images/spotlight/s00005.jpg','./images/spotlight/s00003.jpg','./images/spotlight/s00003.jpg','./images/spotlight/s00004.jpg','./images/spotlight/s00005.jpg'],
						['./images/spotlight/s00006.jpg','./images/spotlight/s00007.jpg','./images/spotlight/s00003.jpg','./images/spotlight/s00002.jpg','./images/spotlight/s00001.jpg'],
						['./images/spotlight/s00001.jpg','./images/spotlight/s00002.jpg','./images/spotlight/s00003.jpg','./images/spotlight/s00006.jpg','./images/spotlight/s00007.jpg']
					],
			imgAll=createImg(imgs),
			imgArrIndex=0, //记录图片数组的索引
			imgAng=45,  //做动画时，每张图片旋转的角度
			imgTime=300,//每张图片的动画间隔是300ms
			rotating=false, //为标志，只是为了避免在动画期间，用户仍可以点击造成页面出错
			autoTime=null, //存周期性定时器
			autoInterval=4000;//自动播放的间隔时间

		//初始化函数
		function init(){
			$butLeft=$('.butLeft');
			$butRight=$('.butRight');
			$butPlay=$('.butPlay');
			$imglist=$('.mainbox ul li');

			configer(); //设置页面一加载，图片的旋转角度
			setEvent();//为各个按钮添加事件
		}
		//设置各图片的初始样子
		function configer(){
			var ang=6,  //固定角度（每次加的角度）
				aint=-14;  //初始化角度（第一个图片的角度）
				$imglist.css('transform-origin',origin);//设置li的旋转中心
				$imglist.each(function(i){  //i是循环的索引
					var $this=$(this);
					$this.css({rotate:aint+(i*ang)+"deg"}); //对每个li进行旋转
				});
		}
		//为各按钮绑定事件
		function setEvent(){
			$butLeft.bind("click",function(){
				anigo(-1);
				return false;
			});
			$butRight.bind("click",function(){
				anigo(1);
				return false;
			});
			//鼠标悬浮停止图片自动轮播
			$('.mainbox').mouseenter(function(){
				autoStop();
			});
			//鼠标离开停止图片自动轮播
			$('.mainbox').mouseleave(function(){
				autoGo();
			});
		}
		//根据提供的url生成span(有指定的图片背景)
		function createImg(arr){
			var imgArr=[];
			for(var i in arr){
				var $span;
				imgArr[i]=arr[i];
				for(var x in arr[i]){
					$span=$('<span style="background-image:url('+arr[i][x]+');background-size:cover;"></span>');
					imgArr[i][x]=$span;
				}
			}
			return imgArr;
		}
		//控制图片的切换和旋转
		function anigo(d){
			if(rotating) return false;  //一旦return，后面的代码就不执行了
			rotating=true;
			imgArrIndex+=d; //确定显示那一组的下标
			//下述if语句使得切换可以循环
			if(imgArrIndex>imgAll.length-1){
				imgArrIndex=0;
			}else if(imgArrIndex<0){
				imgArrIndex=imgAll.length-1;
			}
			//遍历页面中的li，并为其添加span，显示指定图片
			$imglist.each(function(i){
				var $thisItme=$(this);//当前li
				var $thisImg=$thisItme.children("span"); //当前li下的span
				var $targetImg=imgAll[imgArrIndex][i];
				var thisTime=(d==1) ? imgTime*i : imgTime*(imgAll.length-1-i);//从左往右时间增加，从右往左时间减少（只是为了实现每张图片是一个接一个旋转出来的效果）
				$thisItme.append($targetImg);
				
				$thisImg.css('transform-origin',originImg);  //设定原来图片的圆心点
				$targetImg.css({transformOrigin:originImg,rotate:(0-d)*imgAng+"deg"});  //初始化新图片的旋转圆心点和旋转角度
				
				setTimeout(function(){
					$thisImg.transition({rotate:imgAng*d+"deg"}); //原来的图片转出去
					$targetImg.transition({rotate:"0deg"},500,function(){
						$thisImg.remove(); //删除原来的图片
						if(thisTime==($imglist.length-1)*imgTime){  //当当前动画执行完之后，才允许再次执行
							rotating=false;
						}
					}); //新图片归位*/
				},thisTime);
			});
		}
		//实现自动播放
		function autoGo(){
			clearInterval(autoTime);//一定要清除，否则会生成多个定时器操作一个东西
			anigo(1);//使得处于播放状态时，页面一加载，就会自动播放
			autoTime=setInterval(function(){
				anigo(1);
			},autoInterval);
		}

		//实现暂停
		function autoStop(){
			clearInterval(autoTime);
		}
		init();//调用初始化函数
		autoGo();
		/*---------------多图旋转轮播图结束------------*/
		
		/*---------调用分页页码插件，实现分页功能开始-------*/
	    $('.page-area').cypager({
	    	pg_size:25,
	    	pg_nav_count:8,
	    	pg_total_count:300,
	    	pg_prev_name:'前一页',
	    	pg_next_name:'后一页',
	    	pg_call_fun:function(count){
	    		//此处应到数据库中拿数据
	    		console.log('当前要请求第'+count+'页');
          		//TODO 根据商家点击不同的数字显示不同的内容
	    	}
	    });
	    /*---------调用分页页码插件，实现分页功能结束-------*/
	});