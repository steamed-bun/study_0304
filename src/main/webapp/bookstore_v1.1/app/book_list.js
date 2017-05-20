angular.module('bookList',[])
	.directive('onRepeatFinishedRender', function ($timeout) {
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				if (scope.$last === true) {
					$timeout(function () {
						//这里element, 就是ng-repeat渲染的最后一个元素
						scope.$emit('ngRepeatFinished', element);
					});
				}
			}
		};
	})
	.controller('bookListCtrl',function($scope,$http){
		//根据书籍大类id获取对应的子类
		var getSmallCate=function (cateId){
			postData='category.categoryPId='+cateId;
			return   $http({
				method:'POST',
				url:'select-selectCategory.action',
				data:postData,//已序列化用户输入的数据
				headers:{'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
			}).then(function(response){
				console.log(response); //打印响应数据（采用then方法获得的响应数据比用success方法获得的响应数据信息多）
				return response.data;//将响应数据的data属性值返回
			});
		};
		$scope.bigCate={'bigCateId':'','bigCateText':''};
		$scope.smallCate={'smallCateId':'','smallCateText':''};
		$scope.smallCates=[];
		//应从地址栏的url中获得如下信息
		var locationHref=window.location.href;
		locationHref=locationHref.slice(locationHref.indexOf('?')+1);
		console.log(locationHref);
		var bigCateStr='';
		var smCateIdStr='';
		var bigCateId='';
		var smCateId='';
		if(locationHref.indexOf('=')==locationHref.lastIndexOf('=')){
			//当地址栏中只有一个参数时（意味着是从大类进来的）
			console.log('从大类进来的');
			locationHref=locationHref.split('=');
			bigCateId=locationHref[1];
			//console.log(bigCateId);
			getSmallCate(bigCateId).then(function(data){
				var dataHasBigCate=data.category;
				$scope.bigCate.bigCateId=dataHasBigCate.categoryId;
				$scope.bigCate.bigCateText=dataHasBigCate.categoryName;
				$('.nextCateMArk').css('display','none');
				//加载分类处子类的名称
				var dataHasSmallCate=data.categories;
				var smCate;
				for(var i=0;i<dataHasSmallCate.length;i++){
					smCate={};
					smCate.smCateId=dataHasSmallCate[i].categoryId;
					smCate.smCateText=dataHasSmallCate[i].categoryName;
					$scope.smallCates.push(smCate);
				}
				//记载该大类对应的所有书籍
				var postData='book.category.categoryPId='+$scope.bigCate.bigCateId+'&pageNum=1&totalPageNo=0&sort=0';
				$http({
					method:'POST',
					url:'book-getBooksForCPIdC.action',//user 获取大类 浏览量
					data: postData,
					headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				}).success(function(response){
					console.log(response);//查看响应数据是否正确
					if(response.status=='yes'){
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
									var postData='book.category.categoryPId='+$scope.bigCate.bigCateId+'&pageNum='+count+'&sort=0';
									console.log('当前要请求第'+count+'页');
									//根据商家点击不同的数字显示不同的内容
									'book.category.categoryPId=1&pageNum=1&sort=0'
									$http({
										method:'POST',
										url:'book-getBooksForCPIdC.action',//user 子类 浏览量 分页
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
					}
				});
			});
		}else{
			//当地址栏中有两个参数时（意味着是从子类进来的）
			console.log('我从子类进来的');
			locationHref=locationHref.split('&');
			bigCateStr=locationHref[0].split('=');
			smCateIdStr=locationHref[1].split('=');
			bigCateId=bigCateStr[1];
			smCateId=smCateIdStr[1];
			//console.log(bigCateId);
			//console.log(smCateId);
			getSmallCate(bigCateId).then(function(data){
				//console.log(data);
				var dataHasBigCate=data.category;
				$scope.bigCate.bigCateId=dataHasBigCate.categoryId;
				$scope.bigCate.bigCateText=dataHasBigCate.categoryName;
				var dataHasSmallCate=data.categories;
				var smCate;
				var markIndex;
				for(var i=0;i<dataHasSmallCate.length;i++){
					smCate={};
					smCate.smCateId=dataHasSmallCate[i].categoryId;
					smCate.smCateText=dataHasSmallCate[i].categoryName;
					$scope.smallCates.push(smCate);
					if(dataHasSmallCate[i].categoryId==smCateId){
						console.log('我找到相等的了');
						$scope.smallCate.smallCateId=dataHasSmallCate[i].categoryId;
						$scope.smallCate.smallCateText=dataHasSmallCate[i].categoryName;
						$('.nextCateMArk').css('display','inline-block');
						$('.classify a').removeClass('cate-default');
						markIndex=i+3;
						$scope.$on("ngRepeatFinished", function (repeatFinishedEvent, element){
							var repeatId = element.parent().attr("repeat-id");
							switch (repeatId){
								case "r1":
									//repeat-id为r1的ul, repeat渲染完成
									//console.log('r1渲染完毕');
									//console.log($('.classify a:nth-child('+markIndex+')')[0]);
									$('.classify a:nth-child('+markIndex+')').addClass('cate-default');
									break;
							}
						});
						//加载该子类对应的所有书籍
						var postData='book.category.categoryId='+$scope.smallCate.smallCateId+'&pageNum=1&totalPageNo=0&sort=0';
						console.log(smCateId);
						console.log(postData);
						//根据选择的子类id加载书籍
						$http({
							method:'POST',
							url:'book-getBooksByCategory.action', //user 按照点击量查询 sort {1 : 从低到高  0 : 从高到低}
							data:postData,
							headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
						}).success(function(response){
							console.log(response);//查看响应数据是否正确
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
										var postData='book.category.categoryId='+smCateId+'&pageNum='+count+'&sort=0';
										console.log('当前要请求第'+count+'页');
										//根据商家点击不同的数字显示不同的内容
										$http({
											method:'POST',
											url:'book-getBooksByCategory.action',//user 子类 浏览量 分页
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
					}
				}
			});
		}

		/*------给分类加事件开始-------*/

		//根据用于选择的类别，加载该类书(根据子类id获取书籍)
		$scope.loadSelectBook=function($event){
			console.log('我要加载某类书');
			$curElem=$($event.target);
			$('.classify a').removeClass('cate-default');
			$curElem.addClass('cate-default');
			var smCateId=$curElem.attr('data-id');//获得子类的id
			$scope.smallCate.smallCateId=smCateId;
			$scope.smallCate.smallCateText=$curElem.html();
			var postData='book.category.categoryId='+smCateId+'&pageNum=1&totalPageNo=0&sort=0';
			console.log(smCateId);
			console.log(postData);
			//根据选择的子类id加载书籍
			$http({
				method:'POST',
				url:'book-getBooksByCategory.action', //user 按照点击量查询 sort {1 : 从低到高  0 : 从高到低}
				data:postData,
				headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
			}).success(function(response){
				console.log(response);//查看响应数据是否正确
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
							var postData='book.category.categoryId='+smCateId+'&pageNum='+count+'&sort=0';
							console.log('当前要请求第'+count+'页');
							//根据商家点击不同的数字显示不同的内容
							$http({
							 method:'POST',
							 url:'book-getBooksByCategory.action',//user 子类 浏览量 分页
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
		};
		//回到首页
		$scope.goIndex=function(){
			window.location.href='index_login.html';
		};
		//回到指定大类的书籍
		$scope.goBigCate=function(){
			window.location.href='book_list.html?bigSmateId='+$scope.bigCate.bigCateId;
		};
		//加载所有的书籍（根据大类id来获取）
		$scope.loadAllBooks=function($event){
			console.log('我要加载所有的书籍');
			$curElem=$($event.target);
			$('.classify a').removeClass('cate-default');
			$curElem.addClass('cate-default');
			console.log($(this)[0]);
			var postData='book.category.categoryPId='+$scope.bigCate.bigCateId+'&pageNum=1&totalPageNo=0&sort=0';
			$http({
				method:'POST',
				url:'book-getBooksForCPIdC.action',//user 获取大类 浏览量
				data: postData,
				headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
			}).success(function(response){
				console.log(response);//查看响应数据是否正确
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
								var postData='book.category.categoryPId='+$scope.bigCate.bigCateId+'&pageNum='+count+'&sort=0';
								console.log('当前要请求第'+count+'页');
								//根据商家点击不同的数字显示不同的内容
								'book.category.categoryPId=1&pageNum=1&sort=0'
								$http({
									method:'POST',
									url:'book-getBooksForCPIdC.action',//user 子类 浏览量 分页
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
		};
		//默认排序（默认按浏览量view-to-low排序）
		$scope.loadSortByDefault=function($event){
			$curElem=$($event.target);
			$('.sort a').removeClass('sort-default');
			$curElem.addClass('sort-default');
			console.log('我是默认排序');
			if($('#allBooks').hasClass('cate-default')){
				//对大类进行按浏览量排序
				$http({
					method:'POST',
					url:'book-getBooksForCPIdC.action',//user 大类 浏览量
					data: 'book.category.categoryPId='+$scope.bigCate.bigCateId+'&pageNum=1&totalPageNo=0&sort=0',
					headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				}).success(function(response){
					console.log(response);//查看响应数据是否正确
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
								var postData='book.category.categoryPId='+$scope.bigCate.bigCateId+'&pageNum='+count+'&sort=0';
								console.log('当前要请求第'+count+'页');
								//根据商家点击不同的数字显示不同的内容
								$http({
									method:'POST',
									url:'book-getBooksForCPIdC.action',//user 子类 浏览量 分页
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
			}else{
				//对子类进行按浏览量排序
				$http({
					method:'POST',
					url:'book-getBooksByCategory.action',//user 子类 浏览量
					data: 'book.category.categoryId='+$scope.smallCate.smallCateId+'&pageNum=1&totalPageNo=0&sort=0',
					headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				}).success(function(response){
					console.log(response);//查看响应数据是否正确
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
								var postData='book.category.categoryId='+$scope.smallCate.smallCateId+'&pageNum='+count+'&sort=0';
								console.log('当前要请求第'+count+'页');
								//根据商家点击不同的数字显示不同的内容
								$http({
									method:'POST',
									url:'book-getBooksByCategory.action',//user 子类 浏览量 分页
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
			}
		};
		//按价格展示书籍
		$scope.loadSortByPrice=function($event){
			$curElem=$($event.target);
			$('.sort a').removeClass('sort-default');
			$curElem.addClass('sort-default');
			console.log('按价格排序');
			var sortPriceMark;
			if($curElem.hasClass('price-to-low')){
				//需要price-to-high
				$curElem.removeClass('price-to-low');
				$curElem.addClass('price-to-high');
				sortPriceMark=1;
			}else{
				//需要price-to-low
				$curElem.removeClass('price-to-high');
				$curElem.addClass('price-to-low');
				sortPriceMark=0;
			}
			//根据价格进行排序
			//确定当前显示的是大类还是子类
			if($('#allBooks').hasClass('cate-default')){
				//当前显示的是“全部”，则请求大类的接口
				$http({
					method:'POST',
					url:'book-getBooksForCPIdP.action',//user 大类 价格
					data: 'book.category.categoryPId='+$scope.bigCate.bigCateId+'&pageNum=1&totalPageNo=0&sort='+sortPriceMark,
					headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				}).success(function(response){
					console.log(response);//查看响应数据是否正确
					console.log('大类接口');
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
								var postData='book.category.categoryPId='+$scope.bigCate.bigCateId+'&pageNum='+count+'&sort='+sortPriceMark;
								console.log('当前要请求第'+count+'页');
								//根据商家点击不同的数字显示不同的内容
								$http({
									method:'POST',
									url:'book-getBooksForCPIdP.action',//user 大类 价格 分页
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
			}else{
				//当前显示的是某个子类，则请求子类接口
				$http({
					method:'POST',
					url:'book-getBooksForCIdP.action',//user 子类 价格
					data: 'book.category.categoryId='+$scope.smallCate.smallCateId+'&pageNum=1&totalPageNo=0&sort='+sortPriceMark,
					headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				}).success(function(response){
					console.log(response);//查看响应数据是否正确
					console.log('子类接口');
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
							var postData='book.category.categoryId='+$scope.smallCate.smallCateId+'&pageNum='+count+'&sort='+sortPriceMark;
							console.log('当前要请求第'+count+'页');
							//根据商家点击不同的数字显示不同的内容
							$http({
								method:'POST',
								url:'book-getBooksForCIdP.action',//user 子类 价格 分页
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
				});
			}
			console.log($scope.bigCate.bigCateId);
			console.log($scope.smallCate.smallCateId);
			console.log($scope.smallCate.smallCateText);
		};
		//根据浏览量进行排序
		$scope.loadSortByView=function($event){
			$curElem=$($event.target);
			$('.sort a').removeClass('sort-default');
			$curElem.addClass('sort-default');
			$curElem=$($event.target);
			console.log('根据浏览量进行排序');
			var sortViewMark;
			if($curElem.hasClass('view-to-low')){
				//需要view-to-high
				$curElem.removeClass('view-to-low');
				$curElem.addClass('view-to-high');
				sortViewMark=1;
			}else{
				//需要view-to-low
				$curElem.removeClass('view-to-high');
				$curElem.addClass('view-to-low');
				sortViewMark=0;
			}
			if($('#allBooks').hasClass('cate-default')){
				//对大类进行按浏览量排序
				$http({
					method:'POST',
					url:'book-getBooksForCPIdC.action',//user 大类 浏览量
					data: 'book.category.categoryPId='+$scope.bigCate.bigCateId+'&pageNum=1&totalPageNo=0&sort='+sortViewMark,
					headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				}).success(function(response){
					console.log(response);//查看响应数据是否正确
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
								var postData='book.category.categoryPId='+$scope.bigCate.bigCateId+'&pageNum='+count+'&sort='+sortViewMark;
								console.log('当前要请求第'+count+'页');
								//根据商家点击不同的数字显示不同的内容
								$http({
									method:'POST',
									url:'book-getBooksForCPIdC.action',//user 子类 浏览量 分页
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
			}else{
				//对子类进行按浏览量排序
				$http({
					method:'POST',
					url:'book-getBooksByCategory.action',//user 子类 浏览量
					data: 'book.category.categoryId='+$scope.smallCate.smallCateId+'&pageNum=1&totalPageNo=0&sort='+sortViewMark,
					headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				}).success(function(response){
					console.log(response);//查看响应数据是否正确
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
								var postData='book.category.categoryId='+$scope.smallCate.smallCateId+'&pageNum='+count+'&sort='+sortViewMark;
								console.log('当前要请求第'+count+'页');
								//根据商家点击不同的数字显示不同的内容
								$http({
									method:'POST',
									url:'book-getBooksByCategory.action',//user 子类 浏览量 分页
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
			}
		};
		/*------给分类加事件结束-------*/

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
	});