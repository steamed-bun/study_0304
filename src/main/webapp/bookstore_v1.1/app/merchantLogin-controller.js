angular.module('merchantLogin-controller',[])
    .controller('merInfoCtrl',function($scope,$http){
  		/*-----------基础的数据设置开始----------*/
	  	//从数据库中获得该商家的信息
	  	$http({
            method:'GET',
            url:'sel-sellectSeller.action?chose=CHOSE',
        }).success(function(data){
            data=data.seller;
            console.log(data);
            console.log('我获得数据了');
            $scope.user={
                img:data.selImage,
                name:data.selName,
                age:data.selAge,
                sex:data.selSex,
                mail:data.selTel,
                id:data.selIdCard,
                pwd:data.selPassword,
                rePwd:data.selPassword,
                keyId:data.selId
            };
            console.log($scope.user);
        });

        /*
	  	$scope.user={
	  	    img:'./images/userImg.jpg',
	  	    name:'小布点儿',
	  	    age:20,
	  	    sex:'女',
	  	    mail:'2814241400@qq.com',
	  	    id:'611111199301131229',
	  	    pwd:'hzx121314?',
	  	    rePwd:'hzx121314?',
            keyId:'112'
	  	};
        */
	  	$scope.changeImgHint='';
        $scope.img={
            name:'',
            imgId:''
        };
	  	/*-----------基础的数据设置结束-----------*/
	  	


	  	/*----------与更换头像相关的事件开始-------*/
  		// 改变头像---开始
	  	//显示改变头像box
	  	$scope.showChangeImg=function(){
	  	    $scope.changeImgBox={
	  	  	    "display":"block"
	  	    };
            /*----------更换头像开始-------*/
            //对所选择的图片做处理
            var options={
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: $('.my-img>img').attr('src')
            };
            var cropper = $('.cust-img-box').cropbox(options);//调用图片上传插件的方法
            $scope.changeImgHint='';
            //实现图片的改变
            $('#selImage').on('change', function(e){
                $scope.img.name=$(this).attr('name');
                $scope.img.imgId=$(this).attr('id');
                var reader = new FileReader();
                reader.onload = function(e) {
                    options.imgSrc = e.target.result;
                    cropper = $('.cust-img-box').cropbox(options);
                }
                reader.readAsDataURL(this.files[0]);
            });
            //放大图片
            $('.bigger-img').on('click', function(){
                cropper.zoomIn();//将图片放大
            });
            //缩小图片
            $('.smaller-img').on('click', function(){
                cropper.zoomOut();//将图片缩小
            });

            //给保存按钮加事件保存用户新的头像到数据库中
            $scope.saveImg=function(){
                //将用户新的头像保存到数据库中
                //此处要根据后台给的反馈实时给用户提示
                var subImg = cropper.getDataURL();
                $('.my-img>img').attr('src',subImg);
                $('.my-img>img').attr('ng-src',subImg);
                $.ajaxFileUpload({
                    url: "upLoad-addSelImage.action",// 文件上传服务器请求Action
                    secureuri: true,// 安全提交，默认为false
                    fileElementId: $scope.img.imgId,// 文件类型的id
                    dataType: "text",// 返回值类型
                    success: function (data) {// 服务器响应成功
                        $scope.changeImgHint='上传成功！';
                        $scope.$apply(); //传播Model的变化。
                    },
                    error: function (data) {// 服务器响应失败
                        console.log('服务器有问题，请稍后再试');
                        $scope.changeImgHint='服务器有问题，请稍后再试！';
                        $scope.$apply(); //传播Model的变化。
                    }
                });
            };
            /*----------更换头像结束-------*/
	  	};
	  	//隐藏改变头像box
	  	$scope.hideChangeImg=function(){
	  	  $scope.changeImgBox={
	  	  	"display":"none"
	  	  };
	  	};
	 


	  	/*-----保存商家信息开始--------*/
	  	$scope.saveMerInfo=function(){
            //将用户输入的信息按指定名称拼接成查询字符串
            var seller={};
            var postData='';
            var $errorInfo=$('.save-data');
            console.log($scope.isThrough);
            if($scope.isThrough[0]&&$scope.isThrough[1]&&$scope.isThrough[2]&&$scope.isThrough[3]&&$scope.isThrough[4]&&$scope.isThrough[5]){
                console.log('可以保存');
                seller.selIdCard=$scope.user.id;
                seller.selAge=$scope.user.age;
                seller.selSex=$scope.user.sex;
                seller.selName=$scope.user.name;
                seller.selTel=$scope.user.mail;
                seller.selPassword=$scope.user.pwd;
                $.each(seller,function(key,value) {
                    postData+='seller.'+key+'='+value+'&'
                });
                postData+='selId='+$scope.user.keyId;
                console.log(postData);
                //提交到服务器保存用户修改的数据
                $http({
                    method:'POST',
                    url:'sel-addSeller.action',
                    data:postData,//序列化用户输入的数据
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                }).success(function(data){
                    console.log(data);
                    data=data.status;
                    if(data=='yes'){
                        console.log('修改成功');
                        //修改成功后，给用户提示
                        $errorInfo.html('修改成功！');
                        $errorInfo.slideDown();//提示信息缓慢出现
                        setTimeout(function(){
                            $errorInfo.slideUp();
                        },3000);
                    }else{
                        console.log('修改失败');
                        $errorInfo.html('修改失败，服务器暂时不可用！');
                        $errorInfo.slideDown();//提示信息缓慢出现
                        setTimeout(function(){
                            $errorInfo.slideUp();
                        },3000);
                    }
                });
                console.log('已保存商家信息');
            }else{
                console.log('不可以保存');
                $errorInfo.html('修改失败，请检查输入信息格式！');
                $errorInfo.slideDown();//提示信息缓慢出现
                setTimeout(function(){
                    $errorInfo.slideUp();
                },3000);
            }
	  	}
	  	/*-----保存商家信息结束--------*/

	  	/*------与页面样式相关的JS特效开始-------*/
	  	//输入框获得焦点
	  	$('.user-input').focus(function(){
            var dataId=parseInt($(this).attr('data-id'));
	  		$(this).css('border','#3dbcf5 solid 1px');
            console.log(dataId);
            $scope.isThrough[dataId]=false;
	  	});
	  	//输入框获得焦点
	  	$('.user-input').blur(function(){
	  		$(this).css('border','#EEE  solid 1px');

	  	});
	  	/*------与页面样式相关的JS特效结束-------*/

	  	var regExp=[/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
                    /^[1-9]{2,3}$/,
                    /^[\u4e00-\u9fa5]{4,10}$/,
                    /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/];
        $scope.isThrough=[true,true,true,true,true,true];
        //验证身份证
        $('#myId').blur(function(){
           var userInput=$scope.user.id;
           if(userInput){
              //当用户有输入值时
              if(regExp[0].test(userInput)){
                 //当用户输入的符合正则表达式时
                 $('.sellerId-hint').html('恭喜您！格式正确');
                 $('.sellerId-hint').removeClass('regi-error-hint');
                 $('.sellerId-hint').addClass('regi-right-hint');
                 $scope.isThrough[3]=true;
              }else{
                 //当用户输入的不符合正则表单式时
                 $('.sellerId-hint').html('身份证为数字且为15位或18位');
                 $('.sellerId-hint').removeClass('regi-right-hint');
                 $('.sellerId-hint').addClass('regi-error-hint');
                 $scope.isThrough[3]=false;
              }
           }else{
              //当用户没有输入值时
              $('.sellerId-hint').html('身份证不能为空');
              $('.sellerId-hint').removeClass('regi-right-hint');
              $('.sellerId-hint').addClass('regi-error-hint');
              $scope.isThrough[3]=false;
           }
        });
        //验证年龄
        $('#myAge').blur(function(){
           var userInput=$scope.user.age;
           if(userInput){
              //当用户有输入值时
              if(regExp[1].test(userInput)){
                 //当用户输入的符合正则表达式时
                 $('.sellerAge-hint').html('恭喜您！格式正确');
                 $('.sellerAge-hint').removeClass('regi-error-hint');
                 $('.sellerAge-hint').addClass('regi-right-hint');
                 $scope.isThrough[1]=true;
              }else{
                 //当用户输入的不符合正则表单式时
                 $('.sellerAge-hint').html('年龄不符合实际，最小11岁');
                 $('.sellerAge-hint').removeClass('regi-right-hint');
                 $('.sellerAge-hint').addClass('regi-error-hint');
                 $scope.isThrough[1]=false;
              }
           }else{
              //当用户没有输入值时
              $('.sellerAge-hint').html('年龄不能为空');
              $('.sellerAge-hint').removeClass('regi-right-hint');
              $('.sellerAge-hint').addClass('regi-error-hint');
              $scope.isThrough[1]=false;
           }
        });
        //验证昵称
        $('#username').blur(function(){
           var userInput=$scope.user.name;
           if(userInput){
              //当用户有输入值时
              if(regExp[2].test(userInput)){
                 //当用户输入的符合正则表达式时
                 $('.name-hint').html('恭喜您！格式正确');
                 $('.name-hint').removeClass('regi-error-hint');
                 $('.name-hint').addClass('regi-right-hint');
                 $scope.isThrough[0]=true;
              }else{
                 //当用户输入的不符合正则表单式时
                 $('.name-hint').html('昵称应为4-10个汉字');
                 $('.name-hint').removeClass('regi-right-hint');
                 $('.name-hint').addClass('regi-error-hint');
                 $scope.isThrough[0]=false;
              }
           }else{
              //当用户没有输入值时
              $('.name-hint').html('昵称不能为空');
              $('.name-hint').removeClass('regi-right-hint');
              $('.name-hint').addClass('regi-error-hint');
              $scope.isThrough[0]=false;
           }
        });
        //验证邮箱
        $('#tel').blur(function(){
           var userInput=$scope.user.mail;
           if(userInput){
              //当用户有输入值时
              if(regExp[3].test(userInput)){
                 //当用户输入的符合正则表达式时
                 $('.tel-hint').html('恭喜您！格式正确');
                 $('.tel-hint').removeClass('regi-error-hint');
                 $('.tel-hint').addClass('regi-right-hint');
                 $scope.isThrough[2]=true;
              }else{
                 //当用户输入的不符合正则表单式时
                 $('.tel-hint').html('仅支持常见的163、qq邮箱等');
                 $('.tel-hint').removeClass('regi-right-hint');
                 $('.tel-hint').addClass('regi-error-hint');
                 $scope.isThrough[2]=false;
              }
           }else{
              //当用户没有输入值时
              $('.tel-hint').html('邮箱不能为空');
              $('.tel-hint').removeClass('regi-right-hint');
              $('.tel-hint').addClass('regi-error-hint');
              $scope.isThrough[2]=false;
           }
        });
        //验证密码
        $('#pwd').blur(function(){
           var userInput=$scope.user.pwd;
           if(userInput){
              //当用户有输入值时
              if(regExp[4].test(userInput)){
                 //当用户输入的符合正则表达式时
                 $('.pwd-hint').html('恭喜您！格式正确');
                 $('.pwd-hint').removeClass('regi-error-hint');
                 $('.pwd-hint').addClass('regi-right-hint');
                 $scope.isThrough[4]=true;
              }else{
                 //当用户输入的不符合正则表单式时
                 $('.pwd-hint').html('密码仅能为6-16位大小写字母和数字的组合');
                 $('.pwd-hint').removeClass('regi-right-hint');
                 $('.pwd-hint').addClass('regi-error-hint');
                 $scope.isThrough[4]=false;
              }
           }else{
              //当用户没有输入值时
              $('.pwd-hint').html('密码不能为空');
              $('.pwd-hint').removeClass('regi-right-hint');
              $('.pwd-hint').addClass('regi-error-hint');
              $scope.isThrough[4]=false;
           }
        });
        //验证重复密码
        $('#repwd').blur(function(){
          var userInput=$scope.user.rePwd;
          if(userInput==$scope.user.pwd){
            $('.repwd-hint').html('恭喜您！两次密码一致');
            $('.repwd-hint').removeClass('regi-error-hint');
            $('.repwd-hint').addClass('regi-right-hint');
            $scope.isThrough[5]=true;
          }else{
            $('.repwd-hint').html('两次密码不一致');
            $('.repwd-hint').removeClass('regi-right-hint');
            $('.repwd-hint').addClass('regi-error-hint');
            $scope.isThrough[5]=false;
          }
        });
        /*------------表单验证结束-----------*/
  })
    .controller('bookAdminCtrl',function($scope,$window,$location,$http){
	  	$scope.bookList=[];
        //与分页相关的数据设定
        $scope.paging={
            totalNum:'',//数据的总条数
            perNum:10,//每页显示数据的条数
            totalNav:''//显示的导航数目
        };
        /*-------书籍管理获取基础信息开始-----------*/
	  	//根据书籍大类的id值从数据库中获得书籍信息
        var getBookInfo=function (cateId){
            var postData='book.category.categoryPId='+cateId+'&pageNum=1&totalPageNo=0&sort=0';
            console.log(postData);
            return   $http({
                        method:'POST',
                        url:'book-getBooksForSPIdC.action',
                        data:postData,//已序列化用户输入的数据
                        headers:{'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                     }).then(function(response){
                        console.log(response); //打印响应数据（采用then方法获得的响应数据比用success方法获得的响应数据信息多）
                        return response.data;//将响应数据的data属性值返回
                     });
        }
        //高亮显示当前商家查看的书籍大类并从数据库中查书籍信息
        $('.book-big-categorys a').click(function(){
            var categoryId=$(this).attr('data-id');
            var bookInfo,
                reData;
            $('.book-big-categorys a').css('color','#656565');
            $(this).css('color','#ddbea1');//高亮显示当前点击的书籍大类名称
            getBookInfo(categoryId).then(function(data){
                console.log(data);
                var books=data.books;
                $scope.bookList=[];
                $scope.paging.totalNum=data.totalPageNo;
                for(var i=0;i<books.length;i++){
                    var book={};
                    var imgsObj;
                    var imgsUrl=[];
                    book.name=books[i].bookName;
                    book.id=books[i].bookId;
                    book.price=books[i].bookPrice;
                    book.likes=books[i].likes;
                    imgsObj=books[i].bookImages;
                    for(var k=0;k<imgsObj.length;k++){
                        imgsUrl.push(imgsObj[k].imageURL);
                    }
                    //找出可以放在首页的书
                    for(var j=0;j<imgsUrl.length;j++){
                        if(imgsUrl[j].search('-y')!=-1){
                            //当找到可以放在首页的书
                            book.curImg=imgsUrl[j];
                            break;
                        }
                    }
                    $scope.bookList.push(book);
                }
                console.log($scope.bookList);
                //调用分页码插件分页
                //调用分页页码插件，实现分页功能
                $('.page-area').cypager({
                    pg_size:parseInt($scope.paging.perNum),
                    pg_nav_count:Math.ceil($scope.paging.totalNum/$scope.paging.perNum),
                    pg_total_count:parseInt($scope.paging.totalNum),
                    pg_prev_name:'前一页',
                    pg_next_name:'后一页',
                    pg_call_fun:function(count){
                        //此处应到数据库中拿数据
                        console.log('当前要请求第'+count+'页');
                        //根据商家点击不同的数字显示不同的内容
                        var postData='book.category.categoryPId='+categoryId+'&pageNum='+count+'&sort=0';
                        $http({
                            method:'POST',
                            url:'book-getBooksForSPIdC.action',
                            data: postData,
                            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                        }).success(function(data){
                            console.log(data);
                            var books=data.books;
                            $scope.bookList=[];
                            for(var i=0;i<books.length;i++){
                                var book={};
                                var imgsObj;
                                var imgsUrl=[];
                                book.name=books[i].bookName;
                                book.id=books[i].bookId;
                                book.price=books[i].bookPrice;
                                book.likes=books[i].likes;
                                imgsObj=books[i].bookImages;
                                for(var k=0;k<imgsObj.length;k++){
                                    imgsUrl.push(imgsObj[k].imageURL);
                                }
                                //找出可以放在首页的书
                                for(var j=0;j<imgsUrl.length;j++){
                                    if(imgsUrl[j].search('-y')!=-1){
                                        //当找到可以放在首页的书
                                        book.curImg=imgsUrl[j];
                                        break;
                                    }
                                }
                                $scope.bookList.push(book);
                            }
                        });
                    }
                });
            });
        });
        //页面一加载默认显示第一个大类的书籍
        getBookInfo(1).then(function(data){
            console.log(data);
            var books=data.books;
            $scope.bookList=[];
            $scope.paging.totalNum=data.totalPageNo;
            for(var i=0;i<books.length;i++){
                var book={};
                var imgsObj;
                var imgsUrl=[];
                book.name=books[i].bookName;
                book.id=books[i].bookId;
                book.price=books[i].bookPrice;
                book.likes=books[i].likes;
                imgsObj=books[i].bookImages;
                for(var k=0;k<imgsObj.length;k++){
                    imgsUrl.push(imgsObj[k].imageURL);
                }
                //找出可以放在首页的书
                for(var j=0;j<imgsUrl.length;j++){
                    if(imgsUrl[j].search('-y')!=-1){
                        //当找到可以放在首页的书
                        book.curImg=imgsUrl[j];
                        break;
                    }
                }
                $scope.bookList.push(book);
            }
            console.log($scope.bookList);
            //调用分页码插件分页
            //调用分页页码插件，实现分页功能
            $('.page-area').cypager({
                pg_size:parseInt($scope.paging.perNum),
                pg_nav_count:Math.ceil($scope.paging.totalNum/$scope.paging.perNum),
                pg_total_count:parseInt($scope.paging.totalNum),
                pg_prev_name:'前一页',
                pg_next_name:'后一页',
                pg_call_fun:function(count){
                    //此处应到数据库中拿数据
                    console.log('当前要请求第'+count+'页');
                    //根据商家点击不同的数字显示不同的内容
                    var postData='book.category.categoryPId=1&pageNum='+count+'&sort=0';
                    $http({
                        method:'POST',
                        url:'book-getBooksForSPIdC.action',
                        data: postData,
                        headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                    }).success(function(data){
                        console.log(data);
                        var books=data.books;
                        $scope.bookList=[];
                        for(var i=0;i<books.length;i++){
                            var book={};
                            var imgsObj;
                            var imgsUrl=[];
                            book.name=books[i].bookName;
                            book.id=books[i].bookId;
                            book.price=books[i].bookPrice;
                            book.likes=books[i].likes;
                            imgsObj=books[i].bookImages;
                            for(var k=0;k<imgsObj.length;k++){
                                imgsUrl.push(imgsObj[k].imageURL);
                            }
                            //找出可以放在首页的书
                            for(var j=0;j<imgsUrl.length;j++){
                                if(imgsUrl[j].search('-y')!=-1){
                                    //当找到可以放在首页的书
                                    book.curImg=imgsUrl[j];
                                    break;
                                }
                            }
                            $scope.bookList.push(book);
                        }
                    });
                }
            });
        });
	  	/*-------书籍管理获取基础信息结束-----------*/

        //点击书籍时跳到书籍详情页
        $scope.jumpDetail=function($event){
            var $curElem=$($event.target);
            var bookId=$curElem.attr('data-id');
            console.log($curElem[0]);
            window.location.href='book_details_merchant.html?bigSmateId='+bookId;
        };
        //给删除按钮添加事件
        $scope.toDeleteBook=function($event){
            var $curElem=$($event.target);
            var bookId=$curElem.attr('data-id');
            console.log(bookId);
            //根据书籍id删除书籍
            $http({
                method:'POST',
                url:'book-deleteBook.action',
                data:'book.bookId='+bookId,//已经序列化的用户输入的数据
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
                console.log(data);
                if(data.status=='yes'){
                    //删除成功
                    var $errorInfo=$('.oper-hint');
                    $errorInfo.html('删除成功！');
                    $errorInfo.slideDown();//错误提示信息缓慢出现
                    setTimeout(function(){
                        $errorInfo.slideUp();
                    },3000);
                    $curElem.parent().parent().parent().remove();
                }else{
                    var $errorInfo=$('.oper-hint');
                    $errorInfo.html('删除失败！');
                    $errorInfo.slideDown();//错误提示信息缓慢出现
                    setTimeout(function(){
                        $errorInfo.slideUp();
                    },3000);
                }
            });
        };
        //给编辑按钮添加事件
        $scope.toEditBook=function($event){
            var $curElem=$($event.target);
            var bookId=$curElem.attr('data-id');
            console.log(bookId);
            window.location.href='mer_edit_book.html?bookId='+bookId;
        };
	  	/*-----与页面样式相关的功能函数开始------*/
        //点击加号时，页面跳转到添加新书页面
        $scope.jumpAddNewBook=function(){
            var absUrl=$location.absUrl();
            var markIndex=absUrl.lastIndexOf('#');
            var newUrl=absUrl.slice(0,markIndex-19)+'mer_add_book.html';
            $window.location.href=newUrl;
        }
	  	//展开、折叠更多书籍类别
	  	$scope.showMoreCate=function(){
	  		$('.book-cate-more').toggle(500);
	  	};
	  	//点击设置时显示或隐藏编辑或删除选项
        $scope.showOrHideOper=function($event){
            var $curElem=$($event.target);
            $siblingItem=$curElem.next();
            $siblingItem.toggle(500);
        };
	  	/*
	  	//鼠标移除时隐藏操作
	  	$('.book-display>li').mouseleave(function(){
	  		$bookOper=$(this).children('.book-img-edit').children('.book-oper');
	  		$bookOper.css('display','none');
	  	});
	  	*/
	   
	  	/*-----与页面样式相关的功能函数结束------*/
  })
    .controller('shopAdminCtrl', function($scope,$http){
  		/*----------基础数据设置开始--------------*/
        //从数据库中取得店铺相关信息
        $http({
            method:'GET',
            url:'shop-selectShop.action',
        }).success(function(data){
            data=data.shop;
            console.log(data);
            console.log('我获得数据了');
            $scope.user={
                img:data.shopImage,
                //shopId:data.shopId,
                name:data.shopName,
                notice:data.notice,
                degree:data.shopGrade,
                selectProvince:data.province.provinceName,
                selectProvinceId:data.province.provinceId,
                selectCity:data.city.cityName,
                selectCityId:data.city.cityId,
                selectRegi:data.county.countyName,
                selectRegiId:data.county.countyId,
                street:data.street
            };
           // console.log($scope.user);
        });

	  	/*$scope.user={
            img:'./images/userImg.jpg',
	  	    name:'',
	  	    notice:'',
	  	    degree:2,
	  	    selectProvince:'请选择',
            selectCity:'请选择',
            selectRegi:'请选择',
	  	    street:''
	  	};*/
	  	$scope.changeImgHint='成功了吗';
        $scope.img={
            name:'',
            imgId:''
        };
	  	/*-----------基础的数据设置结束-----------*/
	  	


	  	/*----------与更换头像相关的事件开始-------*/
  		// 改变头像---开始
	  	//显示改变头像box
	  	$scope.showChangeImg=function(){
	  	    $scope.changeImgBox={
	  	  	    "display":"block"
	  	     };
            /*更换头像开始*/
            //对所选择的图片做处理
            var options={
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: $('.my-img>img').attr('src')
            };
            var cropper = $('.cust-img-box').cropbox(options);//调用图片上传插件的方法
            $scope.changeImgHint='';
            //实现图片的改变
            $('#selWeixin').on('change', function(e){
                $scope.img.name=$(this).attr('name');
                $scope.img.imgId=$(this).attr('id');
                var reader = new FileReader();
                reader.onload = function(e) {
                    options.imgSrc = e.target.result;
                    cropper = $('.cust-img-box').cropbox(options);
                }
                reader.readAsDataURL(this.files[0]);
            });
            //放大图片
            $('.bigger-img').on('click', function(){
                cropper.zoomIn();//将图片放大
            });
            //缩小图片
            $('.smaller-img').on('click', function(){
                cropper.zoomOut();//将图片缩小
            });

            //给保存按钮加事件保存用户新的头像到数据库中
            $scope.saveImg=function(){
                //将用户新的头像保存到数据库中
                //此处要根据后台给的反馈实时给用户提示
                var subImg = cropper.getDataURL();
                $('.my-img>img').attr('src',subImg);
                $('.my-img>img').attr('ng-src',subImg);
                $.ajaxFileUpload({
                    url: "upLoad-addSelWeiXin.action",// 文件上传服务器请求Action
                    secureuri: true,// 安全提交，默认为false
                    fileElementId: $scope.img.imgId,// 文件类型的id
                    dataType: "text",// 返回值类型
                    success: function (data) {// 服务器响应成功
                        $scope.changeImgHint='上传成功！';
                        $scope.$apply(); //传播Model的变化。
                    },
                    error: function (data) {// 服务器响应失败
                        console.log('服务器有问题，请稍后再试');
                        $scope.changeImgHint='服务器有问题，请稍后再试！';
                        $scope.$apply(); //传播Model的变化。
                    }
                });
            };
            /*更换头像结束*/
	  	};
	  	//隐藏改变头像box
	  	$scope.hideChangeImg=function(){
	  	     $scope.changeImgBox={
	  	  	    "display":"none"
             };
	  	};
	  	/*-----保存商家信息开始--------*/
	  	$scope.saveMerInfo=function(){
            var postData='',
                provinceId=$('.mer-province').attr('data-id'),
                cityId=$('.mer-city').attr('data-id'),
                regiId=$('.mer-regi').attr('data-id');
            var shopInfo={
                //shopId:$scope.user.shopId,
                shopName:$scope.user.name,
                notice:$scope.user.notice,
                shopGrade:$scope.user.degree,
                street:$scope.user.street
            };
            for (var key in shopInfo){
                postData+='shop.'+key+'='+shopInfo[key]+'&';
            }
            postData+='shop.province.provinceId='+provinceId+'&shop.city.cityId='+cityId+'&shop.county.countyId='+regiId;
            console.log(postData);
            //将商家的信息提交到数据库中

            $http({
                method:'POST',
                url:'shop-updateShop.action',
                data:postData,//已序列化用户输入的数据
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
                data=data.status;
                if(data=='yes'){
                    console.log("商家店铺信息修改成功");
                    //修改成功，显示修改成功提示信息
                    var $errorInfo=$('.save-data');
                    $errorInfo.html('修改成功！');
                    $errorInfo.slideDown();//错误提示信息缓慢出现
                    setTimeout(function(){
                        $errorInfo.slideUp();
                    },3000);
                }else{
                    //修改失败，显示错误提示信息
                    var $errorInfo=$('.save-data');
                    $errorInfo.html('修改失败，请稍后再次修改！');
                    $errorInfo.slideDown();//错误提示信息缓慢出现
                    setTimeout(function(){
                        $errorInfo.slideUp();
                    },3000);
                }
            });

	  	}
	  	/*-----保存商家信息结束--------*/
  		
  		/*--------与页面样式相关的功能函数开始-----------*/
  		//点击不同的标签显示不同的内容
  		$('.shop-admin-title>span').click(function(){
  			var curLable=$(this);
  			var id=$(this).attr('data-id');
  			$('.shop-admin-title>span').removeClass('highlight-title');
  			curLable.addClass('highlight-title');
  			switch(id){
  				case '1':
  					$('.shop-info-box').css('display','block');
  					$('.shop-stat-box').css('display','none');
  					break;
  				case '2':
  					$('.shop-info-box').css('display','none');
  					$('.shop-stat-box').css('display','block');
  					break;
  			}
  		});
  		//当输入框获得焦点时，高亮显示输入框
  		$('.user-input').focus(function(){
  			$(this).css('border','#a1c1c0 solid 1px');
  		});
  		//当输入框失去焦点时，正常显示输入框
  		$('.user-input').blur(function(){
  			$(this).css('border','#DDD solid 1px');
  		});
  		/*--------与页面样式相关的功能函数结束-----------*/
  
        /*------显示省市区信息开始-------*/
        //显示下拉选择框 $area:将要显示的那个下拉框，$icon该下拉框对应的小图标
        var displayArea=function($area,$icon){
            $area.css('display','block');
            $icon.css('background-image','url("./images/up.png")');
        }
        //隐藏下拉选择框 $area:将要显示的那个下拉框，$icon该下拉框对应的小图标
        var hideArea=function($area,$icon){
            $area.css('display','none');
            $icon.css('background-image','url("./images/down.png")');
        }
        //获得商家选择的地址值  $area:下拉选项【$('#all-provinces')】 inputElem:显示选择的值的那个输入框【$('.mer-province')】的字符串形式（字符串只是为了方便用switch语句）$icon:下拉列表旁边的小图标
        var selectInfo=function($area,inputElem,$icon){
            $area.click(function(){
                switch (inputElem){
                    case "$('.mer-province')":
                        $scope.user.selectProvince=$(event.target).html();
                        $('.mer-province').attr('data-id',$(event.target).attr('data-id'));
                        $scope.$apply(); //传播Model的变化，否则view不能更新
                        break;
                    case "$('.mer-city')":
                        $scope.user.selectCity=$(event.target).html();
                        $('.mer-city').attr('data-id',$(event.target).attr('data-id'));
                        $scope.$apply(); //传播Model的变化，否则view不能更新
                        break;
                    case "$('.mer-regi')":
                        $scope.user.selectRegi=$(event.target).html();
                        $('.mer-regi').attr('data-id',$(event.target).attr('data-id'));
                        $scope.$apply(); //传播Model的变化，否则view不能更新
                        break;
                }
                hideArea($area,$icon);
            });
        }
        //从数据库中获得省的信息
        $('#display-pro').click(function(){
            var html='';
            var i;
            var len;
            var provinces=[];
            var provincesId=[];
            var $options=$('#all-provinces').children();
            if($options.length != 0){
                //当省中已经有信息时，显示省信息，并将选择的写入input框中
                displayArea($('#all-provinces'),$('.mer-pro-icon'));
                selectInfo($('#all-provinces'),"$('.mer-province')",$('.mer-pro-icon'));
                return ;
            }
            //从数据库中拿到省的信息
            $http({
                method:'GET',
                url:'select-getProvince.action',
            }).success(function(data){
                for(var i in data.province){
                    provinces[i]=data.province[i].provinceName;
                    provincesId[i]=data.province[i].provinceId;
                }
                for(i=0,len=provinces.length;i<len;i++){
                    html+='<li data-id='+provincesId[i]+'>'+provinces[i]+'</li>'
                }
                $('#all-provinces').append(html);
                displayArea($('#all-provinces'),$('.mer-pro-icon'));
                selectInfo($('#all-provinces'),"$('.mer-province')",$('.mer-pro-icon'));
            });
            //provinces=['陕西1','陕西2','陕西3','陕西4','陕西5','陕西6','陕西7','陕西8','陕西9','陕西10','陕西11','陕西12','陕西13','陕西14'];
        });

        //当市的选择框被点击时，显示市信息
        $('#display-city').click(function(){
            var html='';
            var i;
            var len;
            var citys=[];
            var cityId=[];
            var provinceId=$('.mer-province').attr('data-id');
            var postData='provinceId='+provinceId;
            var $options=$('#all-citys').children();
            if($options != 0){
                $options.remove();
            }
            //从数据库中拿到市的信息
            $http({
                method:'POST',
                url:'select-getCities.action',
                data:postData,//序列化用户输入的数据
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
                for(var i in data.cities){
                    citys[i]=data.cities[i].cityName;
                    cityId[i]=data.cities[i].cityId;
                }
                for(i=0,len=citys.length;i<len;i++){
                    html+='<li data-id='+cityId[i]+'>'+citys[i]+'</li>'
                }
                $('#all-citys').append(html);
                displayArea($('#all-citys'),$('.mer-city-icon'));
                selectInfo($('#all-citys'),"$('.mer-city')",$('.mer-city-icon'));
            });
            //citys=['西安1','西安2','西安3','西安4','西安5','西安6','西安7','西安8','西安9','西安10','西安11','西安12','西安13','西安14'];
        });
        //当区的选择框被点击时，显示区信息
        $('#display-regi').click(function(){
            var html='';
            var i;
            var len;
            var regis=[];
            var regisId=[];
            var cityId=$('.mer-city').attr('data-id');
            var postData='cityId='+cityId;
            var $options=$('#all-regis').children();
            if($options != 0){
                $options.remove();
            }
            //从数据库中拿到区的信息
            $http({
                method:'POST',
                url:'select-getCounties.action',
                data:postData,//序列化用户输入的数据
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
                for(var i in data.counties){
                    regis[i]=data.counties[i].countyName;
                    regisId[i]=data.counties[i].countyId;
                }
                for(i=0,len=regis.length;i<len;i++){
                    html+='<li data-id='+regisId[i]+'>'+regis[i]+'</li>'
                }
                $('#all-regis').append(html);
                $('#all-regis').css('display','block');
                displayArea($('#all-regis'),$('.mer-area-icon'));
                selectInfo($('#all-regis'),"$('.mer-regi')",$('.mer-area-icon'));
            });
            //var regis=['长安1','长安2','长安3','长安4','长安5','长安6','长安7','长安8','长安9','长安10','长安11','长安12','长安13','长安14'];
        });
        /*------显示省市区信息结束-------*/
    })
    .controller('dealSuccCtrl',function($scope,$http){
        //已完成的订单
        $scope.accomplishOrder=[];
        //向服务器请求新订单信息
        $http({
            method:'POST',
            url:'trade-getTradeItemBySelId.action',
            data:'tradeItem.status=3',//序列化用户输入的数据
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
        }).success(function(data){
            console.log(data);
            if(parseInt(data.size)==0){
                //说明暂无订单信息
                $('.no-order').css('display','inline-block');
                $('.dealSucc-info-box').css('display','none');
            }else{
                $('.no-order').css('display','none');
                $('.dealSucc-info-box').css('display','table');
                //有订单信息
                for(var i=0;i<data.size;i++){
                    var book={};
                    book.bookName=data[i].book.bookName;
                    book.bookPrice=data[i].book.bookPrice;
                    book.bookNum=data[i].quantity;
                    book.bookTotalPrice=data[i].price;
                    book.tradeId=data[i].itemId;
                    book.tradeTime=data[i].trade.tradeTime.slice(0,10);
                    $scope.accomplishOrder.push(book);
                }
                console.log($scope.accomplishOrder);
            }
        });
    })
    .controller('sentGoodsCtrl', function($scope,$http) {
        //已发货（书籍在运输中）
        $scope.dealingOrder=[];
        //向服务器请求新订单信息
        $http({
            method:'POST',
            url:'trade-getTradeItemBySelId.action',
            data:'tradeItem.status=1',//序列化用户输入的数据
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
        }).success(function(data){
            console.log(data);
            if(parseInt(data.size)==0){
                //说明暂无订单信息
                $('.no-order').css('display','inline-block');
                $('.dealSucc-info-box').css('display','none');
            }else{
                $('.no-order').css('display','none');
                $('.dealSucc-info-box').css('display','table');
                //有订单信息
                for(var i=0;i<data.size;i++){
                    var book={};
                    book.bookName=data[i].book.bookName;
                    book.bookPrice=data[i].book.bookPrice;
                    book.bookNum=data[i].quantity;
                    book.bookTotalPrice=data[i].price;
                    book.tradeId=data[i].itemId;
                    book.tradeTime=data[i].trade.tradeTime.slice(0,10);
                    $scope.dealingOrder.push(book);
                }
                console.log($scope.dealingOrder);
            }
        });
        //给查看物流按钮添加点击事件
        $scope.showLogistics=function(){
            $('.logistics-mask').css('display','block');
        };
        //给关闭按钮添加点击事件
        $scope.closeLogistics=function(){
            $('.logistics-mask').css('display','none');
        };
    })
    .controller('newOrderCtrl',function($scope,$http){
        //新订单（商家需确认发货）
        $scope.newOrder=[];
        //向服务器请求新订单信息
        $http({
            method:'POST',
            url:'trade-getTradeItemBySelId.action',
            data:'tradeItem.status=0',//序列化用户输入的数据
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
        }).success(function(data){
            console.log(data);
            if(parseInt(data.size)==0){
                //说明暂无订单信息
                $('.no-order').css('display','inline-block');
                $('.dealSucc-info-box').css('display','none');
            }else{
                $('.no-order').css('display','none');
                $('.dealSucc-info-box').css('display','table');
                //有订单信息
                for(var i=0;i<data.size;i++){
                    var book={};
                    book.bookName=data[i].book.bookName;
                    book.bookPrice=data[i].book.bookPrice;
                    book.bookNum=data[i].quantity;
                    book.bookTotalPrice=data[i].price;
                    book.tradeId=data[i].itemId;
                    book.tradeTime=data[i].trade.tradeTime.slice(0,10);
                    $scope.newOrder.push(book);
                }
                console.log($scope.newOrder);
            }
        });
        //给确认发货按钮添加点击事件
        $scope.confirmOrder=function($event){
            var $curElem=$($event.target);
            var orderId=$curElem.attr('data-id');
            console.log(orderId);
            $http({
                method:'POST',
                url:'trade-updateTradeStatus.action',
                data:'tradeItem.itemId='+orderId+'&tradeItem.status=0',//序列化用户输入的数据
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
                console.log(data);
                if(data.status=='yes'){
                    //确认发货成功，移除当前订单
                    $curElem.parent().parent().remove();
                    var $errorInfo=$('.oper-hint');
                    $errorInfo.html('已确认发货！');
                    $errorInfo.slideDown();//错误提示信息缓慢出现
                    setTimeout(function(){
                        $errorInfo.slideUp();
                    },3000);
                }
            });
        };
    });