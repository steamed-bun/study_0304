angular.module('bookList',[])
	.controller('bookListCtrl',function($scope,$http){
		//从地址栏中得到搜索书籍的名称
		var locationHref=window.location.href;
		locationHref=locationHref.slice(locationHref.indexOf('?')+1);
		var locationHref=locationHref.split('=');
		var bookName=decodeURI(locationHref[1]);
		//TODO  页面一加载显示搜索到的书籍信息
		$http({
			method:'POST',
			url:'book-getBookForSearch.action',
			data: 'book.bookName='+bookName+'&pageNum=1&totalPageNo=0',
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
		}).success(function(response){
			console.log(response);
			if(response.status=='yes'){
				//当拿到书籍时,渲染到页面上
				data=response.books;
				console.log(data);
				$(".book-list").children().remove();
				var $fragment;//用来保存要添加的html片段
				for(var i=0;i<data.length;i++){
					var imgsObj;
					var imgsUrl=[];  //保存当前书籍的所有图片
					var curImg;
					var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					imgsObj=data[i].bookImages;
					for(var k=0;k<imgsObj.length;k++){
						imgsUrl.push(imgsObj[k].imageURL);
					}
					//找出可以放在首页的书
					for(var j=0;j<imgsUrl.length;j++){
						if(imgsUrl[j].search('-y')!=-1){
							//当找到可以放在首页的书
							curImg=imgsUrl[j];
							break;
						}
					}
					if(isGoodBook==1){
						$fragment=$("<li><a href='book_details.html?bookId="+data[i].bookId+"'><img src='"+curImg+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].oneWord+"</p><h4>"+data[i].bookName+"</h4><span>"+data[i].bookPrice+"</span></div></li>");
					}else{
						$fragment=$("<li><a href='book_details.html?bookId="+data[i].bookId+"'><img src='"+curImg+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].oneWord+"</p><h4>"+data[i].bookName+"</h4><span>"+data[i].bookPrice+"</span></div></li>");
					}
					$(".book-list").append($fragment);
				}
				//调用分页插件，进行分页
				$('.page-area').cypager({
					pg_size:8,
					pg_nav_count:Math.ceil(response.totalPageNo/8),
					pg_total_count:parseInt(response.totalPageNo),
					pg_prev_name:'前一页',
					pg_next_name:'后一页',
					pg_call_fun:function(count){
						//此处应到数据库中拿数据
						var postData='book.bookName='+bookName+'&pageNum='+count;
						console.log('当前要请求第'+count+'页');
						//根据商家点击不同的数字显示不同的内容
						'book.bookName=测试&pageNum=1'
						$http({
							method:'POST',
							url:'book-getBookForSearch.action',//user 子类 浏览量 分页
							data: postData,
							headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
						}).success(function(response){
							console.log(response);//查看响应数据是否正确
							data=response.books;
							console.log(data);
							$(".book-list").children().remove();
							var $fragment2;//用来保存要添加的html片段
							for(var i=0;i<data.length;i++){
								var imgsObj;
								var imgsUrl=[];  //保存当前书籍的所有图片
								var curImg;
								var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
								imgsObj=data[i].bookImages;
								for(var k=0;k<imgsObj.length;k++){
									imgsUrl.push(imgsObj[k].imageURL);
								}
								//找出可以放在首页的书
								for(var j=0;j<imgsUrl.length;j++){
									if(imgsUrl[j].search('-y')!=-1){
										//当找到可以放在首页的书
										curImg=imgsUrl[j];
										break;
									}
								}
								if(isGoodBook==1){
									$fragment2=$("<li><a href='book_details.html?bookId="+data[i].bookId+"'><img src='"+curImg+"'/><i class='good-book'></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].oneWord+"</p><h4>"+data[i].bookName+"</h4><span>"+data[i].bookPrice+"</span></div></li>");
								}else{
									$fragment2=$("<li><a href='book_details.html?bookId="+data[i].bookId+"'><img src='"+curImg+"'/><i></i></a><div class='book-sell-info'><p class='recom-txt'>"+data[i].oneWord+"</p><h4>"+data[i].bookName+"</h4><span>"+data[i].bookPrice+"</span></div></li>");
								}
								$(".book-list").append($fragment2);
							}
						});
					}
				});
			}
		});
	});