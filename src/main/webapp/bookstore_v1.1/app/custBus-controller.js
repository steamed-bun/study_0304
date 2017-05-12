angular.module('custBus-controller',[])
  .controller('custInfoCtrl',function($scope,$location,$http){
  	  $scope.cust={};//保存买家用户信息的对象
  	  //从数据库中获得用户个人的信息
      $http({
          method:'POST',
          url:'user-sellectUser.action',
          data: 'chose=CHOOSE',
          headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
      }).success(function(data){
          console.log(data);
          if(data.status=='yes'){
              data=data.user;
              $scope.cust.id= data.userId;
              $scope.cust.name=data.userName;
              $scope.cust.sex=data.userSex;
              $scope.cust.tel=data.email;//邮箱
              $scope.cust.Age=data.userAge;
          }
      });

  	  $scope.saveInfo=function(){ //保存数据
            console.log($scope.cust);
            var postData='user.userId='+$scope.cust.id+'&user.userName='+$scope.cust.name+'&user.userSex='+$scope.cust.sex+'&user.email='+$scope.cust.tel+'&user.userAge='+$scope.cust.Age;
            console.log(postData);
            //将用户修改过的数据保存到数据库中
            $http({
                method:'POST',
                url:'user-addUser.action',
                data: postData,
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
                 console.log(data);
                if(data.status=='yes'){
                    //修改成功
                    var $errorInfo=$('.oper-hint');
                    $errorInfo.html('修改成功！');
                    $errorInfo.slideDown();//错误提示信息缓慢出现
                    setTimeout(function(){
                        $errorInfo.slideUp();
                    },3000);
                }else{
                    var $errorInfo=$('.oper-hint');
                    $errorInfo.html('修改失败！');
                    $errorInfo.slideDown();//错误提示信息缓慢出现
                    setTimeout(function(){
                        $errorInfo.slideUp();
                    },3000);
                }
            });
  	};
    //页面跳转到更换手机号的页面
    $scope.changeTel=function(){
        //console.log($scope.cust.id);
        //console.log($scope.cust.tel);
        var params='/changeTelOne/'+$scope.cust.id+'/'+$scope.cust.tel;
        $location.path(params);
    };

    //此处用jquery实现输入框获得焦点时，显示日历--开始
  })
  .controller('changeTelOneCtrl',function($scope,$routeParams,$location,$interval,$http){
      //console.log($routeParams.userId);
      //console.log($routeParams.email);
      $scope.changeEmail={
          userId:$routeParams.userId,
          email:$routeParams.email
      };
      //console.log($scope.changeEmail);
      $scope.veriCode='';
      //$scope.cust={};//保存用户信息的对象
      //应该从数据库中获得用户曾注册过的信息
      /* $http({
           method:'POST',
           url:'user-sellectUser.action',
           data: 'chose=CHOOSE',
           headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
       }).success(function(data){
           console.log(data);
           data=data.user;
           $scope.cust.id= data.userId;
           $scope.cust.name=data.userName;
           $scope.cust.sex=data.userSex;
           $scope.cust.tel=data.email;//邮箱
       });*/
        //应该从第三方发送验证码
        function getMes(){
            var postD='receiver='+$scope.changeEmail.email;
            console.log(postD);
            $http({
                method:'POST',
                url:'mail-sendEmail.action',
                data:postD,//序列化用户输入的数据
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
                console.log(data);
                $scope.sendCode=data;
            });
        }

        var verTrue=[true,true];//(此处为了避免用户多次重复触发获得验证码事件，故用了两个标志即：verTrue[0]和verTrue[1])
        var timer;
        $scope.getVeriCode=function(){
           var index=0;
           if(verTrue[0]){
              //当verTrue[0]为真时，发送短信验证码请求
              getMes();
              verTrue[0]=false;
           }
           if(verTrue[1]){
              //显示多少秒后重新发送
              verTrue[1]=false;
              timer=$interval(function(){//此处用到了as中的周期性定时器
                 $('.veri-code-box>span').html((60-index)+'秒');
                 index++;
                 if(index>=61){
                    index=0;
                    verTrue[0]=true;
                    verTrue[1]=true;
                    $('.veri-code-box>span').html('获取验证码');
                    $interval.cancel(timer);//此处用到了as中的取消周期性定时器
                 }
              },1000);
           }
        };

        $scope.checkPast=function(){
           if($scope.veriCode.length==4){
              //当验证码正确后，下一步按钮可点击
              $('.change-next-btn').css('background','#C0AE8A');
           }
           if($scope.veriCode.length==0){
              $('.change-next-btn').css('background','#CCC');
           }
        };

        //页面跳转到下一步
        $scope.nextStep=function($event){
            var userId=$($event.target).attr('data-id');
            console.log(userId);
          if($scope.veriCode.length>0){
            if($scope.veriCode== $scope.sendCode){
              $location.path('/changeTelTwo/'+userId);
              $interval.cancel(timer);//取消周期性定时器
            }else{
              $('.veri-error-hint').slideDown();
            }
          }
        };
  })
  .controller('changeTelTwoCtrl',function($scope,$routeParams,$interval,$location,$http){
      //console.log($routeParams.userId);
      $scope.user={
          userId:$routeParams.userId,
          newEmail:'',
          verCode:''
        };

        //当用户在输入手机号时，发送验证码按钮变成可点击状态
        $scope.checkTel=function(){
          $('.veri-code-box>span').css('background','#B4A078');
        };

        //应该从第三方发送验证码
        function getMes(){
            var postD='receiver='+$scope.user.newEmail;
            console.log(postD);
            $http({
                method:'POST',
                url:'mail-sendEmail.action',
                data:postD,//序列化用户输入的数据
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
                console.log(data);
                $scope.sendCode=data;
            });
        }

        //点击获取验证码时，验证手机号是否正确，若正确，则要获得验证码
        var verTrue=[true,true];//(此处为了避免用户多次重复触发获得验证码事件，故用了两个标志即：verTrue[0]和verTrue[1])
        var timer;
        $scope.getVeriCode=function(){
            var reg=/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/;
            var userInput=$scope.user.newEmail;
            if(reg.test(userInput)){
                    //当手机号合法时，可以发送验证码
                    $('.change-tel-hint').slideUp();
                    var index=0;
                    if(verTrue[0]){
                          //当verTrue[0]为真时，发送短信验证码请求
                          getMes();
                          verTrue[0]=false;
                    }
                    if(verTrue[1]){
                      //显示多少秒后重新发送
                          verTrue[1]=false;
                          timer=$interval(function(){//此处用到了as中的周期性定时器
                              $('.veri-code-box>span').html((60-index)+'秒');
                              index++;
                              if(index>=61){
                                    index=0;
                                    verTrue[0]=true;
                                    verTrue[1]=true;
                                    $('.veri-code-box>span').html('获取验证码');
                                    $interval.cancel(timer);//此处用到了as中的取消周期性定时器
                              }
                          },1000);
                    }
            }else{
                //当手机号非法时，给出错误提示
                $('.change-tel-hint').slideDown();
            }
        };

        //判断是否输入足够数位的验证码，若够4位，则提交按钮可点击
        $scope.checkPast=function(){
          if($scope.user.verCode.length==4){
            $('.change-submit-btn').css('background','#B4A078');
          }
          if($scope.user.verCode.length==0){
            $('.change-submit-btn').css('background','#CCC');
          }
        };

        //判断用户是否输入了正确的验证码，若是则跳转到修改成功页，否则提示错误
        $scope.submitTel=function($event){
            var userId=$($event.target).attr('data-id');
          if($scope.user.verCode.length>0){
            if($scope.user.verCode== $scope.sendCode){
                //将用户修改过后的邮箱等数据提交到后台
                var postData='user.userId='+userId+'&user.email='+$scope.user.newEmail;
                $http({
                    method:'POST',
                    url:'user-addUser.action',//可以只提交userId 和修改后的邮箱
                    data:postData,//序列化用户输入的数据
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                }).success(function(data){
                    console.log(data);
                    if(data.status=='yes'){
                        $location.path('/changeTelThree');
                        $interval.cancel(timer);
                    }
                });
            }else{
                  //当验证码输入错误时，给出提示
                  $('.change-tel-hint').html('验证码输入错误');
                  $('.change-tel-hint').slideDown();
            }
          }
        };
  })
  .controller('addrMangeCtrl',function($scope){
      $scope.userArr=[
          {
              name:'哈哈哈',
              addrDetail:'陕西省西安市长安区西安邮电大学南校区',
              tel:'18829289125'
          },
          {
              name:'哈哈哈',
              addrDetail:'陕西省西安市长安区西安邮电大学南校区',
              tel:'18829289125'
          },
          {
              name:'哈哈哈',
              addrDetail:'陕西省西安市长安区西安邮电大学南校区',
              tel:'18829289125'
          }
      ];
      //TODO 页面一加载获取用户曾保存的地址
      /* $http({
           method:'POST',
           url:'user-sellectUser.action',
           data: 'chose=CHOOSE',
           headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
       }).success(function(data){
            console.log(data);
       });*/
      //给地址列表页的编辑加点击事件
      $scope.editMyAddr=function(){
          console.log('我要编辑地址');
          $('.edit-addr-box').css('display','block');
      };
      //给编辑地址页的关闭按钮添加事件
      $scope.closeEditAddr=function(){
          $('.edit-addr-box').css('display','none');

      };
      //给地址列表页的删除加点击事件
      $scope.deleteMyAddr=function(){
        console.log('我要删除地址');
      };
      //给没有地址页的新建地址添加点击事件
      $scope.goAddNewAddr=function(){
          $('.no-addr-box').css('display','none');
          $('.operate-addr-box').css('display','block');
      };
      //给展示地址页的新建地址添加点击事件
      $scope.goNewAddr2=function(){
          $('.operate-addr-box').css('display','block');
      };
       //给关闭按钮添加事件
       $scope.closeAddAddr=function(){
           console.log('我被点击了');
           $('.operate-addr-box').css('display','none');
           $('.display-addr').css('display','block');
       };
  })
  .controller('accountMangeCtrl',function($scope){

  });