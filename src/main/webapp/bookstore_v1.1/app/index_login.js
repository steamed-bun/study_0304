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

	$(function(){
		$.ajax({
			type:"GET",
			url:"book-getTopBooks.action?book.category.categoryId=1",
			dataType:"json",
			success:function(response){
				data=response.books;
				console.log(data);
				console.log("eduBook.json文件请求成功");
				var $fragment;//用来保存要添加的html片段
				//通过控制循环次数，来将数据与html页面相关联
				for(var i=0;i<data.length;i++){
					var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
					var imgsObj=data[i].bookImages;
					var imgsUrl=[];  //保存当前书籍的所有图片
					var curImg;
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
					$(".edu-book-list").append($fragment);
				}
				bookByCate2();
			},
			error:function(){
				console.log("位得到服务器数据文件");
			}
		});
	});

	//教育类书籍结束
	
	//小说类书籍开始
	function bookByCate2(){
		$(function(){
			$.ajax({
				type:"GET",
				url:"book-getTopBooks.action?book.category.categoryId=2",
				dataType:"json",
				success:function(response){
					data=response.books;
					console.log(data);
					console.log("eduBook.json文件请求成功");
					var $fragment;//用来保存要添加的html片段
					//通过控制循环次数，来将数据与html页面相关联
					for(var i=0;i<data.length;i++){
						var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
						var imgsObj=data[i].bookImages;
						var imgsUrl=[];  //保存当前书籍的所有图片
						var curImg;
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
						$(".story-book-list").append($fragment);
					}
					bookByCate3();
				},
				error:function(){
					console.log("位得到服务器数据文件");
				}
			});
		});
	}
	//小说类书籍结束
	
	//文艺类书籍开始
	function bookByCate3(){
		$(function(){
			$.ajax({
				type:"GET",
				url:"book-getTopBooks.action?book.category.categoryId=3",
				dataType:"json",
				success:function(response){
					data=response.books;
					console.log(data);
					console.log("eduBook.json文件请求成功");
					var $fragment;//用来保存要添加的html片段
					//通过控制循环次数，来将数据与html页面相关联
					for(var i=0;i<data.length;i++){
						var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
						var imgsObj=data[i].bookImages;
						var imgsUrl=[];  //保存当前书籍的所有图片
						var curImg;
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
						$(".literary-book-list").append($fragment);
					}
					bookByCate4();
				},
				error:function(){
					console.log("位得到服务器数据文件");
				}
			});
		});
	}
	//文艺类书籍结束
	
	//青春类书籍开始
	function bookByCate4(){
		$(function(){
			$.ajax({
				type:"GET",
				url:"book-getTopBooks.action?book.category.categoryId=4",
				dataType:"json",
				success:function(response){
					data=response.books;
					console.log(data);
					console.log("eduBook.json文件请求成功");
					var $fragment;//用来保存要添加的html片段
					//通过控制循环次数，来将数据与html页面相关联
					for(var i=0;i<data.length;i++){
						var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
						var imgsObj=data[i].bookImages;
						var imgsUrl=[];  //保存当前书籍的所有图片
						var curImg;
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
						$(".youth-book-list").append($fragment);
					}
					bookByCate5();
				},
				error:function(){
					console.log("位得到服务器数据文件");
				}
			});
		});
	}
	//青春类书籍结束
	
	//童书类书籍开始
	function bookByCate5(){
		$(function(){
			$.ajax({
				type:"GET",
				url:"book-getTopBooks.action?book.category.categoryId=5",
				dataType:"json",
				success:function(response){
					data=response.books;
					console.log(data);
					console.log("eduBook.json文件请求成功");
					var $fragment;//用来保存要添加的html片段
					//通过控制循环次数，来将数据与html页面相关联
					for(var i=0;i<data.length;i++){
						var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
						var imgsObj=data[i].bookImages;
						var imgsUrl=[];  //保存当前书籍的所有图片
						var curImg;
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
						$(".child-book-list").append($fragment);
					}
					bookByCate6();
				},
				error:function(){
					console.log("位得到服务器数据文件");
				}
			});
		});
	}
	//童书类书籍结束
	
	//生活类书籍开始
	function bookByCate6(){
		$(function(){
			$.ajax({
				type:"GET",
				url:"book-getTopBooks.action?book.category.categoryId=6",
				dataType:"json",
				success:function(response){
					data=response.books;
					console.log(data);
					console.log("eduBook.json文件请求成功");
					var $fragment;//用来保存要添加的html片段
					//通过控制循环次数，来将数据与html页面相关联
					for(var i=0;i<data.length;i++){
						var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
						var imgsObj=data[i].bookImages;
						var imgsUrl=[];  //保存当前书籍的所有图片
						var curImg;
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
						$(".life-book-list").append($fragment);
					}
					bookByCate7();
				},
				error:function(){
					console.log("位得到服务器数据文件");
				}
			});
		});
	}
	//生活类书籍结束
	
	//人文社科类书籍开始
	function bookByCate7(){
		$(function(){
			$.ajax({
				type:"GET",
				url:"book-getTopBooks.action?book.category.categoryId=7",
				dataType:"json",
				success:function(response){
					data=response.books;
					console.log(data);
					console.log("eduBook.json文件请求成功");
					var $fragment;//用来保存要添加的html片段
					//通过控制循环次数，来将数据与html页面相关联
					for(var i=0;i<data.length;i++){
						var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
						var imgsObj=data[i].bookImages;
						var imgsUrl=[];  //保存当前书籍的所有图片
						var curImg;
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
						$(".human-book-list").append($fragment);
					}
					bookByCate8();
				},
				error:function(){
					console.log("位得到服务器数据文件");
				}
			});
		});
	}
	//人文社科类书籍结束
	
	//经管类书籍开始
	function bookByCate8(){
		$(function(){
			$.ajax({
				type:"GET",
				url:"book-getTopBooks.action?book.category.categoryId=8",
				dataType:"json",
				success:function(response){
					data=response.books;
					console.log(data);
					console.log("eduBook.json文件请求成功");
					var $fragment;//用来保存要添加的html片段
					//通过控制循环次数，来将数据与html页面相关联
					for(var i=0;i<data.length;i++){
						var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
						var imgsObj=data[i].bookImages;
						var imgsUrl=[];  //保存当前书籍的所有图片
						var curImg;
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
						$(".charge-book-list").append($fragment);
					}
					bookByCate9();
				},
				error:function(){
					console.log("位得到服务器数据文件");
				}
			});
		});
	}
	//经管类书籍结束
	
	//励志类书籍开始
	function bookByCate9(){
		$(function(){
			$.ajax({
				type:"GET",
				url:"book-getTopBooks.action?book.category.categoryId=9",
				dataType:"json",
				success:function(response){
					data=response.books;
					console.log(data);
					console.log("eduBook.json文件请求成功");
					var $fragment;//用来保存要添加的html片段
					//通过控制循环次数，来将数据与html页面相关联
					for(var i=0;i<data.length;i++){
						var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
						var imgsObj=data[i].bookImages;
						var imgsUrl=[];  //保存当前书籍的所有图片
						var curImg;
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
						$(".motivate-book-list").append($fragment);
					}
					bookByCate10();
				},
				error:function(){
					console.log("位得到服务器数据文件");
				}
			});
		});
	}
	//励志类书籍结束
	
	//科技类书籍开始
	function bookByCate10(){
		$(function(){
			$.ajax({
				type:"GET",
				url:"book-getTopBooks.action?book.category.categoryId=10",
				dataType:"json",
				success:function(response){
					data=response.books;
					console.log(data);
					console.log("eduBook.json文件请求成功");
					var $fragment;//用来保存要添加的html片段
					//通过控制循环次数，来将数据与html页面相关联
					for(var i=0;i<data.length;i++){
						var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
						var imgsObj=data[i].bookImages;
						var imgsUrl=[];  //保存当前书籍的所有图片
						var curImg;
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
						$(".science-book-list").append($fragment);
					}
					bookByCate11();
				},
				error:function(){
					console.log("位得到服务器数据文件");
				}
			});
		});
	}
	//科技类书籍结束
	
	//工具类书籍开始
	function bookByCate11(){
		$(function(){
			$.ajax({
				type:"GET",
				url:"book-getTopBooks.action?book.category.categoryId=11",
				dataType:"json",
				success:function(response){
					data=response.books;
					console.log(data);
					console.log("eduBook.json文件请求成功");
					var $fragment;//用来保存要添加的html片段
					//通过控制循环次数，来将数据与html页面相关联
					for(var i=0;i<data.length;i++){
						var isGoodBook=parseInt(data[i].goodBook);//由这个标志来确定到底是否显示“正品保证”这个标志
						var imgsObj=data[i].bookImages;
						var imgsUrl=[];  //保存当前书籍的所有图片
						var curImg;
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
						$(".reference-book-list").append($fragment);
					}
				},
				error:function(){
					console.log("位得到服务器数据文件");
				}
			});
		});
	}
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
})();