angular.module('custBus-controller',[])
  .controller('custInfoCtrl',function($scope,$location){
  	//模拟用户注册时的信息
  	//TODO   此处应该采用AJAX从数据库中取得数据
  	$scope.cust={
  	  id : '03131098',
  	  name :'花开半夏',
  	  sex : '男',
  	  tel : '18829289125',
  	  birth : '2013-1-2'
  	};
  	$scope.saveInfo=function(){ //保存数据
  		//TODO 将用户修改过的数据保存到数据库中
      console.log($scope.cust);
  	};
    //页面跳转到更换手机号的页面
    $scope.changeTel=function(){
      $location.path('/changeTelOne');
    };

  	//此处用jquery实现输入框获得焦点时，显示日历--开始
    $('#cust-info-birth').datepicker({
      dateFormat : 'yy-mm-dd',
      showOtherMonths : true
    });
    //此处用jquery实现输入框获得焦点时，显示日历--开始
  })
  .controller('changeTelOneCtrl',function($scope,$location,$interval){
    //TODO   应该从数据库中获得用户曾注册过的信息
    $scope.oldTel='18829289120';
    $scope.veriCode='';

    //TODO  应该从第三方发送验证码
    function getMes(){
      $scope.sendCode='1234';
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
    $scope.nextStep=function(){
      if($scope.veriCode.length>0){
        if($scope.veriCode== $scope.sendCode){
          $location.path('/changeTelTwo');
          $interval.cancel(timer);//取消周期性定时器
        }else{
          $('.veri-error-hint').slideDown();
        }
      }
    };
  })
  .controller('changeTelTwoCtrl',function($scope,$interval,$location){
    $scope.user={
      newTel:'',
      verCode:''
    };

    //当用户在输入手机号时，发送验证码按钮变成可点击状态
    $scope.checkTel=function(){
      $('.veri-code-box>span').css('background','#B4A078');
    };

    //TODO  应该从第三方发送验证码
    function getMes(){
      $scope.sendCode='1234';
    }

    //点击获取验证码时，验证手机号是否正确，若正确，则要获得验证码
    var verTrue=[true,true];//(此处为了避免用户多次重复触发获得验证码事件，故用了两个标志即：verTrue[0]和verTrue[1])
    var timer;
    $scope.getVeriCode=function(){
      var reg=/^1[3|4|5|7|8][0-9]{9}$/;
      var userInput=$scope.user.newTel;
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
    $scope.submitTel=function(){
      if($scope.user.verCode.length>0){
        if($scope.user.verCode== $scope.sendCode){
          //TODO   将数据提交到后台
          $location.path('/changeTelThree');
          $interval.cancel(timer);
        }else{
          //当验证码输入错误时，给出提示
          $('.change-tel-hint').html('验证码输入错误');
          $('.change-tel-hint').slideDown();
        }
      }
    };
  });