angular.module('bookDetail',[])
   .controller('bookDetailCtrl',function($scope,$http){
       //基础数据设置
       $scope.book={
           bigCateName:'',
           bigCateId:'',
           smCataName:'',
           smCataId:'',
           bName:'',
           bId:'',
           sImgUrls:[],
           bImgUrls:[],
           recom:'',
           author:'',
           price:'',
           purNum:1,
           approve:'',
           disApprove:'',
           detailUrl:''
       };
       var allImgs=[],
           imgsArr;
       //从地址栏中获取bookId
       var locationHref=window.location.href;
       locationHref=locationHref.slice(locationHref.indexOf('?')+1);
       var locationHref=locationHref.split('=');
       var bookId=locationHref[1];
       var postData='book.bookId='+bookId;
       console.log(postData);
        //从数据库获得书籍的相关信息
       $http({
           method:'POST',
           url:'book-getBookById.action',
           data:postData,//序列化用户输入的数据
           headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
       }).success(function(response){
           var $stars=$('.book-source i');
           $stars.removeClass('icon');
           //当请求成功时
           console.log(response);
           $scope.book.bigCateName=response.category.categoryName;
           $scope.book.bigCateId=response.category.categoryId;
           $scope.book.smCataName=response.book.category.categoryName;
           $scope.book.smCataId=response.book.category.categoryId;
           $scope.book.bName= response.book.bookName;
           $scope.book.bId=response.book.bookId;
           $scope.book.recom=response.book.oneWord;
           $scope.book.author=response.book.author;
           $scope.book.price=response.book.bookPrice;
           $scope.book.approve=response.book.likes;
           $scope.book.disApprove=response.book.noLike;
           $scope.book.detailUrl=response.book.summary;
           $scope.book.sellerShopName=response.book.shop.shopName;
           //根据店铺等级设置五角星的个数
           $scope.book.sellerShopGrade=response.book.shop.shopGrade;
           for(var n=0;n<$scope.book.sellerShopGrade;n++){
               $($stars[n]).addClass('icon');
           }
           imgsArr=response.book.bookImages;//获取到所有的书籍图片
           for(var i=0;i<imgsArr.length;i++){
               allImgs.push(imgsArr[i].imageURL);
           }
           for(var j=0;j<allImgs.length;j++){
               if(allImgs[j].search('-s')!=-1){
                   $scope.book.sImgUrls.push(allImgs[j]);
               }else{
                  if(allImgs[j].search('-y')!=-1){
                      console.log(allImgs[j]);
                  }else{
                      $scope.book.bImgUrls.push(allImgs[j]);
                  }
               }
           }
       });

       //加入购物车
       $scope.addBookToShopcar=function(){
           console.log('我要加入购物车');
           //验证库存
           $http({
               method:'POST',
               url:'book-validateBookQuantity.action',
               data: 'book.bookId='+bookId+'&book.quantity='+$scope.book.purNum,
               headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
           }).success(function(response){
               console.log(response); //在此处查看返回的数据是否正确
               if(response.status=='no'){
                   //库存不足，不能加入购物车
                   var $errorInfo=$('.oper-hint');
                   $errorInfo.html('库存不足，请减少购买数量！');
                   $errorInfo.slideDown();//错误提示信息缓慢出现
                   setTimeout(function(){
                       $errorInfo.slideUp();
                   },3000);
               }else{
                   //库存足够，可以购买
                   var postData='shopCartItemTo.book.bookId='+bookId+'&shopCartItemTo.book.bookName='+$scope.book.bName+'&shopCartItemTo.book.bookPrice='+$scope.book.price+'&shopCartItemTo.book.bookImages.imageURL='+$scope.book.sImgUrls[0]+'&shopCartItemTo.quantity='+$scope.book.purNum;
                   console.log(postData);
                   $http({
                       method:'POST',
                       url:'cartTo-addShopCartItem.action',
                       data: postData,
                       headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                   }).success(function(response){
                       console.log(response); //在此处查看返回的数据是否正确
                       if(response.status=='yes'){
                           //加入购物车成功
                           var $errorInfo=$('.oper-hint');
                           $errorInfo.html('加入购物车成功！');
                           $errorInfo.slideDown();//错误提示信息缓慢出现
                           setTimeout(function(){
                               $errorInfo.slideUp();
                           },3000);
                       }else{
                           var $errorInfo=$('.oper-hint');
                           $errorInfo.html('加入购物车失败！');
                           $errorInfo.slideDown();//错误提示信息缓慢出现
                           setTimeout(function(){
                               $errorInfo.slideUp();
                           },3000);
                       }
                   });
               }
           });
       };
       /*-----与放大镜相关的开始------*/
       $scope.changeMediImg=function($event){
           var $curElem=$($event.target);
           var $parElem=$curElem.parent();
           var curSrc=$curElem.attr('src');
           var markIndex=curSrc.lastIndexOf('.')-8;
           var subStr=curSrc.slice(markIndex,markIndex+6);
           var bigImgsUrl=$scope.book.bImgUrls;
           var newSrc;
           for(var i=0;i<bigImgsUrl.length;i++){
               if(bigImgsUrl[i].search(subStr)!=-1){
                   newSrc=bigImgsUrl[i];
                   break;
               }
           }
           $('.book-big-img>img').attr('src',newSrc);//改变中等图的图片
           $('.book-small-img>li').removeClass('highlight-small-img');
           $parElem.addClass('highlight-small-img');
           //每当中等图片更新后，都需要重新放大
           $(document).ready(function () {
               $(".demo-img").blowup({
                   background : "#FFF",
               });
           });
       };
       //调用放大镜插件 实现放大
       $(document).ready(function () {
            $(".demo-img").blowup({
              background : "#FFF",
            });
       });
       /*-----与放大镜相关的结束------*/

       /*----与购物车数量加减相关开始------*/
       //数量增加操作
       $scope.addNum=function(){
           $scope.book.purNum++;
           if ($scope.book.purNum!=0){
               $('.disabled-mask').removeClass('disabled');
               $(".reduce-num").css('color','#666');
           }
       };
       //数量减少操作
       $scope.reduceNum=function($event){
           $scope.book.purNum--;
           if($scope.book.purNum==0){
               $('.disabled-mask').addClass('disabled');
               $($event.target).css('color','#CCC');
           }else{
               $($event.target).css('color','#CCC');
           }
       };
       /*----与购物车数量加减相关结束------*/
   });


