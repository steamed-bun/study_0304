angular.module('admin-controller',[])
    .controller('saleroomCtrl',function($scope){
    	/*----画图开始-------*/
        var ctx1=$('#chartOne')[0].getContext("2d");//获得canvas的绘图上下文
        var chart1 = new Chart(ctx1);//在指定的canvas上实例化chart对象
        var data1 = {
			labels : ["January","February","March","April","May","June"],
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : [280,4800,400,190,960,270,100]
				}
			]
		};
		chart1.Line(data1);
		/*----画图结束-------*/

		/*-----与页面样式相关开始--------*/
		$('.time-box>span').click(function(event){
			var dataId=parseInt($(event.target).attr('data-id'));
			$('.chart-box>div').css('display','none');
			$('.time-box>span').css('background','rgba(76, 175, 80, 0.74)');
			switch(dataId){
				case 0:
					$('.six-months').css('display','block');
					var ctx1=$('#chartOne')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart1 = new Chart(ctx1);//在指定的canvas上实例化chart对象
			        var data1 = {
						labels : ["January","February","March","April","May","June"],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,190,960,270,100]
							}
						]
					};
					chart1.Line(data1);
					break;
				case 1:
					$('.three-months').css('display','block');
					var ctx2=$('#chartTwo')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart2 = new Chart(ctx2);//在指定的canvas上实例化chart对象
			        var data2= {
						labels : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400]
							}
						]
					};
					chart2.Line(data2);
					break;
				case 2:
					$('.fifteen-days').css('display','block');
					var ctx3=$('#chartThree')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart3 = new Chart(ctx3);//在指定的canvas上实例化chart对象
			        var data3 = {
						labels : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,190,100,280,4800,400,190,960,270,100,123,123,456]
							}
						]
					};
					chart3.Line(data3);
					break;
				case 3:
					$('.seven-days').css('display','block');
					var ctx4=$('#chartFour')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart4 = new Chart(ctx4);//在指定的canvas上实例化chart对象
			        var data4 = {
						labels : [1,2,3,4,5,6,7],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,190,960,270,100]
							}
						]
					};
					chart4.Line(data4);
					break;
			}
			$(event.target).css('background','rgb(18, 107, 22)');
			console.log(dataId);
		});
		/*-----与页面样式相关结束--------*/
    })
    .controller('customerRegNumCtrl',function($scope){
    	/*----画图开始-------*/
        var ctx1=$('#chartOne')[0].getContext("2d");//获得canvas的绘图上下文
        var chart1 = new Chart(ctx1);//在指定的canvas上实例化chart对象
        var data1 = {
			labels : ["January","February","March","April","May","June"],
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : [280,4800,400,190,960,270,100]
				}
			]
		};
		chart1.Bar(data1);
		/*----画图结束-------*/

		/*-----与页面样式相关开始--------*/
		$('.time-box>span').click(function(event){
			var dataId=parseInt($(event.target).attr('data-id'));
			$('.chart-box>div').css('display','none');
			$('.time-box>span').css('background','rgba(76, 175, 80, 0.74)');
			switch(dataId){
				case 0:
					$('.six-months').css('display','block');
					var ctx1=$('#chartOne')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart1 = new Chart(ctx1);//在指定的canvas上实例化chart对象
			        var data1 = {
						labels : ["January","February","March","April","May","June"],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,190,960,270,100]
							}
						]
					};
					chart1.Bar(data1);
					break;
				case 1:
					$('.three-months').css('display','block');
					var ctx2=$('#chartTwo')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart2 = new Chart(ctx2);//在指定的canvas上实例化chart对象
			        var data2= {
						labels : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400]
							}
						]
					};
					chart2.Bar(data2);
					break;
				case 2:
					$('.fifteen-days').css('display','block');
					var ctx3=$('#chartThree')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart3 = new Chart(ctx3);//在指定的canvas上实例化chart对象
			        var data3 = {
						labels : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,190,100,280,4800,400,190,960,270,100,123,123,456]
							}
						]
					};
					chart3.Bar(data3);
					break;
				case 3:
					$('.seven-days').css('display','block');
					var ctx4=$('#chartFour')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart4 = new Chart(ctx4);//在指定的canvas上实例化chart对象
			        var data4 = {
						labels : [1,2,3,4,5,6,7],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,190,960,270,100]
							}
						]
					};
					chart4.Bar(data4);
					break;
			}
			$(event.target).css('background','rgb(18, 107, 22)');
			console.log(dataId);
		});
		/*-----与页面样式相关结束--------*/
    })
    .controller('sellerRegNumCtrl',function($scope){
    	/*----画图开始-------*/
        var ctx1=$('#chartOne')[0].getContext("2d");//获得canvas的绘图上下文
        var chart1 = new Chart(ctx1);//在指定的canvas上实例化chart对象
        var data1 = {
			labels : ["January","February","March","April","May","June"],
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : [280,4800,400,190,960,270,100]
				}
			]
		};
		chart1.Bar(data1);
		/*----画图结束-------*/

		/*-----与页面样式相关开始--------*/
		$('.time-box>span').click(function(event){
			var dataId=parseInt($(event.target).attr('data-id'));
			$('.chart-box>div').css('display','none');
			$('.time-box>span').css('background','rgba(76, 175, 80, 0.74)');
			switch(dataId){
				case 0:
					$('.six-months').css('display','block');
					var ctx1=$('#chartOne')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart1 = new Chart(ctx1);//在指定的canvas上实例化chart对象
			        var data1 = {
						labels : ["January","February","March","April","May","June"],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,190,960,270,100]
							}
						]
					};
					chart1.Bar(data1);
					break;
				case 1:
					$('.three-months').css('display','block');
					var ctx2=$('#chartTwo')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart2 = new Chart(ctx2);//在指定的canvas上实例化chart对象
			        var data2= {
						labels : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400,280,4800,400]
							}
						]
					};
					chart2.Bar(data2);
					break;
				case 2:
					$('.fifteen-days').css('display','block');
					var ctx3=$('#chartThree')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart3 = new Chart(ctx3);//在指定的canvas上实例化chart对象
			        var data3 = {
						labels : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,190,100,280,4800,400,190,960,270,100,123,123,456]
							}
						]
					};
					chart3.Bar(data3);
					break;
				case 3:
					$('.seven-days').css('display','block');
					var ctx4=$('#chartFour')[0].getContext("2d");//获得canvas的绘图上下文
			        var chart4 = new Chart(ctx4);//在指定的canvas上实例化chart对象
			        var data4 = {
						labels : [1,2,3,4,5,6,7],
						datasets : [
							{
								fillColor : "rgba(151,187,205,0.5)",
								strokeColor : "rgba(151,187,205,1)",
								pointColor : "rgba(151,187,205,1)",
								pointStrokeColor : "#fff",
								data : [280,4800,400,190,960,270,100]
							}
						]
					};
					chart4.Bar(data4);
					break;
			}
			$(event.target).css('background','rgb(18, 107, 22)');
			console.log(dataId);
		});
		/*-----与页面样式相关结束--------*/
    })
    .controller('hotBookCtrl',function($scope,$http){
		$scope.admin={imgsUrl:''};//保存上传图片的URL
    	var params = {
			fileInput: $("#fileImage").get(0),
			dragDrop: $("#fileDragArea").get(0),
			upButton: $("#fileSubmit").get(0),
			url: $("#uploadForm").attr("action"),
			param:'1',
			filter: function(files) {
				var arrFiles = [];
				var upName;
				for (var i = 0, file; file = files[i]; i++) {
					if (file.type.indexOf("image") == 0) {
						if (file.size >= 512000) {
							alert('您这张"'+ file.name +'"图片大小过大，应小于500k');	
						} else {
							arrFiles.push(file);	
						}			
					} else {
						alert('文件"' + file.name + '"不是图片。');	
					}
					upName=$('#fileImage').attr('name');
					console.log(upName);
				}
				return arrFiles;
			},
			onSelect: function(files) {
				var html = '', i = 0;
				$("#preview").html('<div class="upload_loading"></div>');
				var funAppendImage = function() {
					file = files[i];
					if (file) {
						var reader = new FileReader()
						reader.onload = function(e) {
							html = html + '<div id="uploadList_'+ i +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+ 
								'<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'">删除</a><br />' +
								'<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" /></p>'+ 
								'<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
							'</div>';
							
							i++;
							funAppendImage();
						}
						reader.readAsDataURL(file);
					} else {
						$("#preview").html(html);
						if (html) {
							//删除方法
							$(".upload_delete").click(function() {
								ZXXFILE.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
								return false;	
							});
							//提交按钮显示
							$("#fileSubmit").show();	
						} else {
							//提交按钮隐藏
							$("#fileSubmit").hide();	
						}
					}
				};
				funAppendImage();		
			},
			onDelete: function(file) {
				$("#uploadList_" + file.index).fadeOut();
			},
			onDragOver: function() {
				$(this).addClass("upload_drag_hover");
			},
			onDragLeave: function() {
				$(this).removeClass("upload_drag_hover");
			},
			onSuccess: function(file,response) {
				//$("#uploadInf").html("图片上传成功！");
				//显示图片上传成功的提示
				$('.oper-hint').html('图片上传成功！');
				$('.oper-hint').slideDown();//错误提示信息缓慢出现
				setTimeout(function(){
					$('.oper-hint').slideUp();
				},3000);
				//TODO:得到热卖书籍后台返回的URL
				console.log(response);//打印后台返回的响应数据
				var reData=JSON.parse(response);//将后台返回的JSON字符串转换为JS对象
				$scope.admin.imgsUrl=reData.imagesURL;//根据对象的属性得到所需的url
				console.log($scope.admin.imgsUrl);//打印查看获得的URL是否正确
			},
			onFailure: function(file) {
				//$("#uploadInf").html("图片上传失败！");	
				//显示图片上传失败的提示
				$('.oper-hint').html('图片上传成功！');
				$('.oper-hint').slideDown();//错误提示信息缓慢出现
				setTimeout(function(){
					$('.oper-hint').slideUp();
				},3000);
				$("#uploadImage_" + file.index).css("opacity", 0.2);
			},
			onComplete: function() {
				//提交按钮隐藏
				$("#fileSubmit").hide();
				//file控件value置空
				$("#fileImage").val("");
				//$("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
			}
		};
		ZXXFILE = $.extend(ZXXFILE, params);
		ZXXFILE.init();
    })
    .controller('weSpeakCtrl',function($scope,$http){
		$scope.admin={imgsUrl:''};//保存上传图片的URL
		var params = {
			fileInput: $("#fileImage").get(0),
			dragDrop: $("#fileDragArea").get(0),
			upButton: $("#fileSubmit").get(0),
			url: $("#uploadForm").attr("action"),
			param:'2',
			filter: function(files) {
				var arrFiles = [];
				var upName;
				for (var i = 0, file; file = files[i]; i++) {
					if (file.type.indexOf("image") == 0) {
						if (file.size >= 512000) {
							alert('您这张"'+ file.name +'"图片大小过大，应小于500k');
						} else {
							arrFiles.push(file);
						}
					} else {
						alert('文件"' + file.name + '"不是图片。');
					}
					upName=$('#fileImage').attr('name');
					console.log(upName);
				}
				return arrFiles;
			},
			onSelect: function(files) {
				var html = '', i = 0;
				$("#preview").html('<div class="upload_loading"></div>');
				var funAppendImage = function() {
					file = files[i];
					if (file) {
						var reader = new FileReader()
						reader.onload = function(e) {
							html = html + '<div id="uploadList_'+ i +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+
								'<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'">删除</a><br />' +
								'<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" /></p>'+
								'<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
								'</div>';

							i++;
							funAppendImage();
						}
						reader.readAsDataURL(file);
					} else {
						$("#preview").html(html);
						if (html) {
							//删除方法
							$(".upload_delete").click(function() {
								ZXXFILE.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
								return false;
							});
							//提交按钮显示
							$("#fileSubmit").show();
						} else {
							//提交按钮隐藏
							$("#fileSubmit").hide();
						}
					}
				};
				funAppendImage();
			},
			onDelete: function(file) {
				$("#uploadList_" + file.index).fadeOut();
			},
			onDragOver: function() {
				$(this).addClass("upload_drag_hover");
			},
			onDragLeave: function() {
				$(this).removeClass("upload_drag_hover");
			},
			onSuccess: function(file,response) {
				//$("#uploadInf").html("图片上传成功！");
				//显示图片上传成功的提示
				$('.oper-hint').html('图片上传成功！');
				$('.oper-hint').slideDown();//错误提示信息缓慢出现
				setTimeout(function(){
					$('.oper-hint').slideUp();
				},3000);
				//TODO:得到大家都在说后台返回的URL
				console.log(response);//打印后台返回的响应数据
				var reData=JSON.parse(response);//将后台返回的JSON字符串转换为JS对象
				$scope.admin.imgsUrl=reData.imagesURL;//根据对象的属性得到所需的url
				console.log($scope.admin.imgsUrl);//打印查看获得的URL是否正确
			},
			onFailure: function(file) {
				//$("#uploadInf").html("图片上传失败！");
				//显示图片上传失败的提示
				$('.oper-hint').html='图片上传失败！';
				$('.oper-hint').slideDown();//错误提示信息缓慢出现
				setTimeout(function(){
					$('.oper-hint').slideUp();
				},3000);
				$("#uploadImage_" + file.index).css("opacity", 0.2);
			},
			onComplete: function() {
				//提交按钮隐藏
				$("#fileSubmit").hide();
				//file控件value置空
				$("#fileImage").val("");
				//$("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
			}
		};
		ZXXFILE = $.extend(ZXXFILE, params);
		ZXXFILE.init();
    })
    .controller('weSearchCtrl',function($scope,$http){
		$scope.admin={imgsUrl:''};//保存上传图片的URL
		var params = {
			fileInput: $("#fileImage").get(0),
			dragDrop: $("#fileDragArea").get(0),
			upButton: $("#fileSubmit").get(0),
			url: $("#uploadForm").attr("action"),
			param:'3',
			filter: function(files) {
				var arrFiles = [];
				var upName;
				for (var i = 0, file; file = files[i]; i++) {
					if (file.type.indexOf("image") == 0) {
						if (file.size >= 512000) {
							alert('您这张"'+ file.name +'"图片大小过大，应小于500k');
						} else {
							arrFiles.push(file);
						}
					} else {
						alert('文件"' + file.name + '"不是图片。');
					}
					upName=$('#fileImage').attr('name');
					console.log(upName);
				}
				return arrFiles;
			},
			onSelect: function(files) {
				var html = '', i = 0;
				$("#preview").html('<div class="upload_loading"></div>');
				var funAppendImage = function() {
					file = files[i];
					if (file) {
						var reader = new FileReader()
						reader.onload = function(e) {
							html = html + '<div id="uploadList_'+ i +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+
								'<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'">删除</a><br />' +
								'<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" /></p>'+
								'<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
								'</div>';

							i++;
							funAppendImage();
						}
						reader.readAsDataURL(file);
					} else {
						$("#preview").html(html);
						if (html) {
							//删除方法
							$(".upload_delete").click(function() {
								ZXXFILE.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
								return false;
							});
							//提交按钮显示
							$("#fileSubmit").show();
						} else {
							//提交按钮隐藏
							$("#fileSubmit").hide();
						}
					}
				};
				funAppendImage();
			},
			onDelete: function(file) {
				$("#uploadList_" + file.index).fadeOut();
			},
			onDragOver: function() {
				$(this).addClass("upload_drag_hover");
			},
			onDragLeave: function() {
				$(this).removeClass("upload_drag_hover");
			},
			onSuccess: function(file,response) {
				//$("#uploadInf").html("图片上传成功！");
				//显示图片上传成功的提示
				$('.oper-hint').html('图片上传成功!');
				$('.oper-hint').slideDown();//错误提示信息缓慢出现
				setTimeout(function(){
					$('.oper-hint').slideUp();
				},3000);
				//TODO:得到大家都在搜后台返回的URL
				console.log(response);//打印后台返回的响应数据
				var reData=JSON.parse(response);//将后台返回的JSON字符串转换为JS对象
				$scope.admin.imgsUrl=reData.imagesURL;//根据对象的属性得到所需的url
				console.log($scope.admin.imgsUrl);//打印查看获得的URL是否正确
			},
			onFailure: function(file) {
				//$("#uploadInf").html("图片上传失败！");
				//显示图片上传失败的提示
				$('.oper-hint').html='图片上传失败！';
				$('.oper-hint').slideDown();//错误提示信息缓慢出现
				setTimeout(function(){
					$('.oper-hint').slideUp();
				},3000);
				$("#uploadImage_" + file.index).css("opacity", 0.2);
			},
			onComplete: function() {
				//提交按钮隐藏
				$("#fileSubmit").hide();
				//file控件value置空
				$("#fileImage").val("");
				//$("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
			}
		};
		ZXXFILE = $.extend(ZXXFILE, params);
		ZXXFILE.init();
    })
    .controller('editSmCateCtrl',function($scope,$http){
		//编辑子类的基础变量设置
		$scope.smCates=[];
		//获取书籍大类的子类
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
		//页面一加载显示教育的子类
		getSmallCate('1').then(function(data){
			data=data.categories;
			for(var i=0;i<data.length;i++){
				var smallCate={};
				smallCate.categoryId=data[i].categoryId;
				smallCate.categoryName=data[i].categoryName;
				$scope.smCates.push(smallCate);
			}
		});
		//为页面上的书籍大类添加点击事件
		$('.bigCata>li').click(function(){
			var curCataId=$(this).attr('data-id');
			$scope.smCates=[];
			//请求指定大类的子类
			getSmallCate(curCataId).then(function(data){
				data=data.categories;
				for(var i=0;i<data.length;i++){
					var smallCate={};
					smallCate.categoryId=data[i].categoryId;
					smallCate.categoryName=data[i].categoryName;
					$scope.smCates.push(smallCate);
				}
			});
			$('.bigCata>li').css('background','rgba(76, 175, 80, 0.74)');
			$(this).css('background','rgb(18, 107, 22)');
			console.log(curCataId);
		});
		//给修改添加点击事件
		$scope.editSmate=function($event){
			var $curElem=$($event.target);
			if($curElem.html()=='保存成功'){
				return;
			}
			var saveSmCateId=$curElem.parent().parent().attr('data-smCatId');
			var $curInput=$curElem.parent().parent().children(0).children(0);//获得当前行的input标签
			var postData='';
			console.log(postData);
			if($curElem.hasClass('save-sm-cate')){
				//当按钮显示的是保存时
				$curInput.attr('readonly','true');
				postData='category.categoryId='+saveSmCateId+'&category.categoryName='+$curInput.val();
				//向服务器提交修改的子类名称和子类id
				$http({
					method:'POST',
					url:'select-updateCategory.action',
					data: postData,
					headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				}).success(function(response){
					//console.log(response); //在此处查看返回的数据是否正确
					if(response.status){
						$curElem.html('保存成功');
						$curElem.css('cursor','default');
						$curElem.removeClass('save-sm-cate');
					}
				});
			}else{
				//当按钮显示的是编辑时
				$curInput.removeAttr('readonly');
				$curElem.html('保存');
				$curElem.addClass('save-sm-cate');
			}
		};
		//给删除添加点击事件
		$scope.deleteSmate=function($event){
			var $curElem=$($event.target);
			var deleteSmCateId=$curElem.parent().parent().attr('data-smCatId');
			var postData='category.categoryId='+deleteSmCateId;
			//将被删除元素的id发给服务器，删除指定子类
			$http({
				method:'POST',
				url:'select-deleteCategory.action',
				data: postData,
				headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
			}).success(function(response){
				console.log(response); //在此处查看返回的数据是否正确
				if(response.noDelete=='noDelete'){
					$('.oper-hint').html('正在使用，不能删除！');
				}else{
					$('.oper-hint').html('删除成功！');
					$curElem.parent().parent().remove();
				}
				$('.oper-hint').slideDown();//错误提示信息缓慢出现
				setTimeout(function(){
					$('.oper-hint').slideUp();
				},3000);
			});
		};
    })
	.controller('addSmCateCtrl',function($scope,$http){
		$scope.smCate={
			edu:'',
			novel:'',
			liter:'',
			youth:'',
			child:'',
			life:'',
			human:'',
			charge:'',
			inspire:'',
			science:'',
			tool:''
		};
		$scope.oper={hint:''};
		//给添加添加点击事件
		$('.add-sm-cate').click(function(){
			console.log($(this)[0]);
			var bigCatId=parseInt($(this).attr('data-id'));
			var inputData='';//添加的子类名称
			switch(bigCatId){
				case 1:
					inputData=$scope.smCate.edu;
					break;
				case 2:
					inputData=$scope.smCate.novel;
					break;
				case 3:
					inputData=$scope.smCate.liter;
					break;
				case 4:
					inputData=$scope.smCate.youth;
					break;
				case 5:
					inputData=$scope.smCate.child;
					break;
				case 6:
					inputData=$scope.smCate.life;
					break;
				case 7:
					inputData=$scope.smCate.human;
					break;
				case 8:
					inputData=$scope.smCate.charge;
					break;
				case 9:
					inputData=$scope.smCate.inspire;
					break;
				case 10:
					inputData=$scope.smCate.science;
					break;
				case 11:
					inputData=$scope.smCate.tool;
					break;
			}
			var postData='category.categoryPId='+bigCatId+'&category.categoryName='+inputData;
			console.log(bigCatId);
			$http({
				method:'POST',
				url:'select-saveCategory.action',
				data: postData,
				headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
			}).success(function(response){
				console.log(response); //在此处查看返回的数据是否正确
				if(response.status=='yes'){
					$scope.oper.hint='添加成功，可继续添加！';
					$('.oper-hint').slideDown();//错误提示信息缓慢出现
					setTimeout(function(){
						$('.oper-hint').slideUp();
					},3000);
				}
			});
		});
		//当输入框获得焦点时
		$('.add-smCate-box input').focus(function(){
			$('.add-smCate-box input').removeClass('highlight-input')
			$(this).addClass('highlight-input');
		});
	})
	.controller('accessShopCtrl',function($scope,$http){
		$scope.oper={
			hint:'添加成功，可继续添加！',
			searchShop:''
		};
		//如下是写在页面上的变量（名称不可更改）
		$scope.shop={degree:''};//店铺级别评定
		//保存店铺评估后台返回的数据（应返回数组形式）
		$scope.shopInfo=[
			{
				shopName:'你好吗',
				userName:'哈哈',
				userEmail:'2814234600@qq.com',
				userId:'1'
			},
			{
				shopName:'你好吗',
				userName:'哈哈',
				userEmail:'2814234600@qq.com',
				userId:'1'
			},
			{
				shopName:'你好吗',
				userName:'哈哈',
				userEmail:'2814234600@qq.com',
				userId:'1'
			},
			{
				shopName:'你好吗',
				userName:'哈哈',
				userEmail:'2814234600@qq.com',
				userId:'1'
			},
			{
				shopName:'你好吗',
				userName:'哈哈',
				userEmail:'2814234600@qq.com',
				userId:'1'
			},
			{
				shopName:'你好吗',
				userName:'哈哈',
				userEmail:'2814234600@qq.com',
				userId:'1'
			},
			{
				shopName:'你好吗',
				userName:'哈哈',
				userEmail:'2814234600@qq.com',
				userId:'1'
			},
			{
				shopName:'你好吗',
				userName:'哈哈',
				userEmail:'2814234600@qq.com',
				userId:'1'
			},
			{
				shopName:'你好吗',
				userName:'哈哈',
				userEmail:'2814234600@qq.com',
				userId:'1'
			},
			{
				shopName:'你好吗',
				userName:'哈哈',
				userEmail:'2814234600@qq.com',
				userId:'1'
			}
		];//模拟后台返回的数据
		//与分页相关的数据设定
		$scope.paging={
			totalNum:25,//数据的总条数
			perNum:10,//每页显示数据的条数
			totalNav:''//显示的导航数目
		};
		//获得用户在级别评估上选的级别
		$('.shop-degree-box').change(function(){
			$(".shop-degree-box option:selected").each(function () {
				$scope.shop.degree= parseInt($(this).attr('data-id'));
			});
			console.log('级别：'+$scope.shop.degree);
		});
		//TODO:向后台数据库请求所有店铺信息
		$http({
			method:'POST',
			url:'sel-getSellersForBack.action', //提供所有信息的接口
			data: "pageNum=1&totalPageNo=0",//传递给后台请求第几页的页码数
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
		}).success(function(response){
			console.log(response); //打印后台返回的数据
			//TODO:在此应得到数据总条数,第一页的数据（每页展示10条数据），分页总数（分多少页,可以不需要）
			//TODO:与分页相关的变量名称，在此页搜：与分页相关的数据设定
		});
		//调用分页页码插件，实现分页功能
		$('.page-area').cypager({
			pg_size:$scope.paging.perNum,
			pg_nav_count:Math.ceil($scope.paging.totalNum/$scope.paging.perNum),
			pg_total_count:$scope.paging.totalNum,
			pg_prev_name:'前一页',
			pg_next_name:'后一页',
			pg_call_fun:function(count){
				//此处应到数据库中拿数据
				console.log('当前要请求第'+count+'页');
				//TODO 根据商家点击不同的数字显示不同店铺的内容
				/*$http({
					method:'POST',
					url:'sel-getSellersForBack.action',//分页的接口
					data: 'category.categoryPId='+selectId,//传递给后台请求第几页的页码数
					headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				}).success(function(response){
					console.log(response); //在此处查看返回的数据是否正确
				});*/
			}
		});
	})
	.controller('accessBookCtrl',function($scope,$http){
		$scope.oper={
			hint:'添加成功，可继续添加！',
			searchBook:''
		};
		//如下是写在页面上的变量（名称不可更改）
		$scope.book={degree:''};//店铺级别评定
		//保存书籍评估后台返回的数据（应返回数组形式）
		$scope.bookInfo=[
			{
				bookId:'1',
				bookName:'散射光',
				bookAuthor:'屈原',
				bookApprove:23
			},
			{
				bookId:'1',
				bookName:'散射光',
				bookAuthor:'屈原',
				bookApprove:23
			},
			{
				bookId:'1',
				bookName:'散射光',
				bookAuthor:'屈原',
				bookApprove:23
			},
			{
				bookId:'1',
				bookName:'散射光',
				bookAuthor:'屈原',
				bookApprove:23
			},
			{
				bookId:'1',
				bookName:'散射光',
				bookAuthor:'屈原',
				bookApprove:23
			},
			{
				bookId:'1',
				bookName:'散射光',
				bookAuthor:'屈原',
				bookApprove:23
			},
			{
				bookId:'1',
				bookName:'散射光',
				bookAuthor:'屈原',
				bookApprove:23
			},
			{
				bookId:'1',
				bookName:'散射光',
				bookAuthor:'屈原',
				bookApprove:23
			},
			{
				bookId:'1',
				bookName:'散射光',
				bookAuthor:'屈原',
				bookApprove:23
			},
			{
				bookId:'1',
				bookName:'散射光',
				bookAuthor:'屈原',
				bookApprove:23
			}
		];//模拟后台返回的数据
		//与分页相关的数据设定
		$scope.paging={
			totalNum:25,//数据的总条数
			perNum:10,//每页显示数据的条数
			totalNav:''//显示的导航数目
		};
		//获得用户在级别评估上选的级别
		$('.book-degree-box').change(function(){
			$(".book-degree-box option:selected").each(function () {
				$scope.book.degree= parseInt($(this).attr('data-id'));
			});
			console.log('级别：'+$scope.book.degree);
		});
		//TODO:向后台数据库请求所有书籍信息
		/*$http({
		 method:'GET',
		 url:'' //提供所有信息的接口
		 }).success(function(response){
		 console.log(response); //打印后台返回的数据
		 //TODO:在此应得到数据总条数,第一页的数据（每页展示10条数据），分页总数（分多少页,可以不需要）
		 //TODO:与分页相关的变量名称，在此页搜：与分页相关的数据设定
		 });*/
		//调用分页页码插件，实现分页功能
		$('.page-area').cypager({
			pg_size:$scope.paging.perNum,
			pg_nav_count:Math.ceil($scope.paging.totalNum/$scope.paging.perNum),
			pg_total_count:$scope.paging.totalNum,
			pg_prev_name:'前一页',
			pg_next_name:'后一页',
			pg_call_fun:function(count){
				//此处应到数据库中拿数据
				console.log('当前要请求第'+count+'页');
				//TODO 根据商家点击不同的数字显示不同书籍的内容
				/*$http({
				 method:'POST',
				 url:'select-selectCategory.action',//分页的接口
				 data: 'category.categoryPId='+selectId,//传递给后台请求第几页的页码数
				 headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				 }).success(function(response){
				 	console.log(response); //在此处查看返回的数据是否正确
				 });*/
			}
		});
	});