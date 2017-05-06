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
    .controller('hotBookCtrl',function($scope){
    	var params = {
			fileInput: $("#fileImage").get(0),
			dragDrop: $("#fileDragArea").get(0),
			upButton: $("#fileSubmit").get(0),
			url: $("#uploadForm").attr("action"),
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
				$("#uploadInf").html("图片上传成功！");
				var reData=JSON.parse(response);
				$scope.bookOtherInfo.imgsUrl=reData.imagesURL;
				console.log($scope.bookOtherInfo.imgsUrl);
				if($scope.bookOtherInfo.imgsUrl.length==8){
					$scope.verTrue[7]=true;
					$('.img-hint').css('display','none');
					$('.upload_choose').css('display','none');
					$('.upload_submit').css('display','none');
				}else{
					$scope.verTrue[7]=false;
					$('.img-hint').html('请只上传8张图片');
					$('.img-hint').css('display','inline-block');
					$('.upload_choose').css('display','block');
					$('.upload_submit').css('display','inline-block');
				}
				console.log(response);
			},
			onFailure: function(file) {
				$("#uploadInf").html("图片上传失败！");	
				$("#uploadImage_" + file.index).css("opacity", 0.2);
			},
			onComplete: function() {
				//提交按钮隐藏
				$("#fileSubmit").hide();
				//file控件value置空
				$("#fileImage").val("");
				$("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
			}
		};
		ZXXFILE = $.extend(ZXXFILE, params);
		ZXXFILE.init();
    })
    .controller('weSpeakCtrl',function($scope){
    	var params = {
			fileInput: $("#fileImage").get(0),
			dragDrop: $("#fileDragArea").get(0),
			upButton: $("#fileSubmit").get(0),
			url: $("#uploadForm").attr("action"),
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
				$("#uploadInf").html("图片上传成功！");
				var reData=JSON.parse(response);
				$scope.bookOtherInfo.imgsUrl=reData.imagesURL;
				console.log($scope.bookOtherInfo.imgsUrl);
				if($scope.bookOtherInfo.imgsUrl.length==8){
					$scope.verTrue[7]=true;
					$('.img-hint').css('display','none');
					$('.upload_choose').css('display','none');
					$('.upload_submit').css('display','none');
				}else{
					$scope.verTrue[7]=false;
					$('.img-hint').html('请只上传8张图片');
					$('.img-hint').css('display','inline-block');
					$('.upload_choose').css('display','block');
					$('.upload_submit').css('display','inline-block');
				}
				console.log(response);
			},
			onFailure: function(file) {
				$("#uploadInf").html("图片上传失败！");	
				$("#uploadImage_" + file.index).css("opacity", 0.2);
			},
			onComplete: function() {
				//提交按钮隐藏
				$("#fileSubmit").hide();
				//file控件value置空
				$("#fileImage").val("");
				$("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
			}
		};
		ZXXFILE = $.extend(ZXXFILE, params);
		ZXXFILE.init();
    })
    .controller('weSearchCtrl',function($scope){
    	var params = {
			fileInput: $("#fileImage").get(0),
			dragDrop: $("#fileDragArea").get(0),
			upButton: $("#fileSubmit").get(0),
			url: $("#uploadForm").attr("action"),
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
				$("#uploadInf").html("图片上传成功！");
				var reData=JSON.parse(response);
				$scope.bookOtherInfo.imgsUrl=reData.imagesURL;
				console.log($scope.bookOtherInfo.imgsUrl);
				if($scope.bookOtherInfo.imgsUrl.length==8){
					$scope.verTrue[7]=true;
					$('.img-hint').css('display','none');
					$('.upload_choose').css('display','none');
					$('.upload_submit').css('display','none');
				}else{
					$scope.verTrue[7]=false;
					$('.img-hint').html('请只上传8张图片');
					$('.img-hint').css('display','inline-block');
					$('.upload_choose').css('display','block');
					$('.upload_submit').css('display','inline-block');
				}
				console.log(response);
			},
			onFailure: function(file) {
				$("#uploadInf").html("图片上传失败！");	
				$("#uploadImage_" + file.index).css("opacity", 0.2);
			},
			onComplete: function() {
				//提交按钮隐藏
				$("#fileSubmit").hide();
				//file控件value置空
				$("#fileImage").val("");
				$("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
			}
		};
		ZXXFILE = $.extend(ZXXFILE, params);
		ZXXFILE.init();
    });
   /* .contorller('editSmCateCtrl',function($scope){
    	//为页面上的书籍大类添加点击事件
    	$('.bigCata>li').click(function(){
    		var curCataId=$(this).attr('data-id');
    		console.log(curCataId);
    	});
    });*/