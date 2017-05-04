(function(){
  /*--------路由设置与获取基础信息开始--------------*/
  angular.module('merAddBook',[])
	.controller('merNameCtrl',function($scope,$http){
		$http({
			method:'GET',
			url:'sel-sellectSeller.action?chose=CHOSE',
		}).success(function(data){
			$scope.mer={
				name:data.seller.selName
			};
		});
	})
	.controller('uploadCtrl',function($scope,$http){
		//基本信息
		$scope.book={
		 	 bookName:'',
		 	 bookPrice:'',
			 author:'',
			 publicationDate:'',
			 publisher:'',
			 recom:''
		};
		$scope.bookOtherInfo={
			bigCate:'',
			smallCate:'',
			summery:'',
			imgs:''
		};
		$scope.summery={
			textHint:'点击添加',
			isAdd:false
		};
		//提示用户是否已添加过书籍详情
		if(window.location.search){
			//当用户已经添加书籍简介时
			$scope.summery.textHint='您已添加了书籍简介';
			$('.book-info-add>label').css('cursor','default');
			$scope.summery.isAdd=true;
		}else{
			$scope.summery.textHint='点击添加';
			$('.book-info-add>label').css('cursor','pinter');
			$scope.summery.isAdd=false;
		}
		$scope.reg=[/^\d{1,}$/, /^((((19|20)\d{2})-(0?(1|[3-9])|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/,/^[\u4E00-\u9FA5]{30,100}$/];
		$scope.verTrue=[false,false,false,false,false,false,false,false];
		//上传书籍图片
		var params = {
			fileInput: $("#fileImage").get(0),
			dragDrop: $("#fileDragArea").get(0),
			upButton: $("#fileSubmit").get(0),
			url: $("#uploadForm").attr("action"),
			filter: function(files) {
				var arrFiles = [];
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
			onProgress: function(file, loaded, total) {
				var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
				eleProgress.show().html(percent);
			},
			onSuccess: function(file, response) {
				$("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
			},
			onFailure: function(file) {
				$("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");	
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
		//调用后台提供的富文本编辑器
		$scope.addBook=function(){
			console.log('我要调用编辑器');
			window.open('http://localhost:8080/bookstore_v1.1/edit_book_details.html','_self');
		};
		//根据用户选择的书籍大类，来显示待选择的书籍子类
		$(".book-cate-select").change(function () {
			var selectId;
			$(".book-cate-select option:selected").each(function () {
				selectId= parseInt($(this).attr('data-id'));
			});
			if(selectId != 0){
				$http({
					method:'POST',
					url:'select-selectCategory.action',
					data: 'category.categoryPId='+selectId,//已序列化用户输入的数据
					headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
				}).success(function(data){
					$scope.bookOtherInfo.smallCate=data.categories;
					$('.book-smCate-select').css('display','inline-block');
					console.log($scope.bookOtherInfo.smallCate);
				});
			}
		});
		//对输入信息的合法性进行验证

		/*-------基础功能函数开始----------*/
		//实现输入框获得焦点时高亮
		$('.add-book-input').focus(function(){
			$(this).css('border','#1e90ff solid 1px');
		});
		//实现输入框失去焦点时去除高亮，且进行表单验证
		$('.add-book-input').blur(function(){
			$(this).css('border','#DDD solid 1px');
			var veriLabel=$(this).attr('data-veri');
			var inputInfo;
			switch (veriLabel){
				case 'bookName':
					inputInfo=$scope.book.bookName;
					if(inputInfo){
						$scope.verTrue[0]=true;
						$('.name-hint').css('display','none');
					}else{
						$('.name-hint').html('书名不能为空！');
						$scope.verTrue[0]=false;
						$('.name-hint').css('display','inline-block');
					}
					break;
				case 'bookPrice':
					inputInfo=$scope.book.bookPrice;
					if(inputInfo){
						//当输入信息存在
						if($scope.reg[0].test(inputInfo)){
							//当格式符合要求
							$scope.verTrue[1]=true;
							$('.price-hint').css('display','none');
						}else{
							//当格式不符合要求
							$('.price-hint').html('价格应为数字！');
							$('.price-hint').css('display','inline-block');
							$scope.verTrue[1]=false;
						}
					}else{
						//当输入信息为空
						$('.price-hint').html('价格不能为空！');
						$scope.verTrue[1]=false;
						$('.price-hint').css('display','inline-block');
					}
					break;
				case 'bookAuthor':
					inputInfo=$scope.book.author;
					if(inputInfo){
						$scope.verTrue[2]=true;
						$('.author-hint').css('display','none');
					}else{
						$('.author-hint').html('作者不能为空！');
						$scope.verTrue[2]=false;
						$('.author-hint').css('display','inline-block');
					}
					break;
				case 'bookTime':
					inputInfo=$scope.book.publicationDate;
					if(inputInfo){
						//当输入信息存在
						if($scope.reg[1].test(inputInfo)){
							//当格式符合要求
							$scope.verTrue[3]=true;
							$('.time-hint').css('display','none');
						}else{
							//当格式不符合要求
							$('.time-hint').html('日期不符合要求！');
							$('.time-hint').css('display','inline-block');
							$scope.verTrue[3]=false;
						}
					}else{
						//当输入信息为空
						$('.time-hint').html('出版日期不能为空！');
						$('.time-hint').css('display','inline-block');
						$scope.verTrue[3]=false;
					}
					break;
				case 'bookPublisher':
					inputInfo=$scope.book.publisher;
					if(inputInfo){
						$scope.verTrue[4]=true;
						$('.publisher-hint').css('display','none');
					}else{
						$('.publisher-hint').html('出版商不能为空！');
						$scope.verTrue[4]=false;
						$('.publisher-hint').css('display','inline-block');
					}
					break;
				case 'bookRecom':
					inputInfo=$scope.book.recom;
					if(inputInfo){
						//当输入信息存在
						if($scope.reg[2].test(inputInfo)){
							//当格式符合要求
							$scope.verTrue[6]=true;
							$('.recom-hint').css('display','none');
						}else{
							//当格式不符合要求
							$('.recom-hint').html('推荐语不符合要求');
							$('.recom-hint').css('display','inline-block');
							$scope.verTrue[6]=false;
						}
					}else{
						//当输入信息为空
						$('.recom-hint').html('推荐语不能为空！');
						$scope.verTrue[6]=false;
						$('.recom-hint').css('display','inline-block');
					}
					break;
			}
		});

		/*-------基础功能函数结束----------*/
	});
})();


