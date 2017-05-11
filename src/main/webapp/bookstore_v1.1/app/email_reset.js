angular.module('emailReset',[])
   .controller('emailResetTitleBox',function($scope,$http){
      var locationHref=window.location.href;
      locationHref=locationHref.slice(locationHref.indexOf('?')+1);
      locationHref=locationHref.split('=');
      $scope.regi={
         email:'',
         password:'',
         repwd:'',
         veri:'',
         role: locationHref[1]
      };
      $scope.verCode='';
      //下面是angular.js
      var verTrue=[true,true];//验证码(此处为了避免用户多次重复触发获得验证码事件，故用了两个标志即：verTrue[0]和verTrue[1])
      var getMes=function(){
         //发送验证码
         var postD='receiver='+$scope.regi.email;
         $http({
            method:'POST',
            url:'mail-sendEmail.action',
            data:postD,//序列化用户输入的数据
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
         }).success(function(data){
            console.log(data);
            $scope.verCode=data;
         });
      };


      /*------------表单验证开始-----------*/
      var regExp=[/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/];
      $scope.isThrough=[false,false,false,false];
      //验证邮箱
      $('#tel').blur(function(){
         var userInput=$scope.regi.email;
         if(userInput){
            //当用户有输入值时
            if(regExp[0].test(userInput)){
               //当用户输入的符合正则表达式时
               $('.tel-hint').html('恭喜您！格式正确');
               $('.tel-hint').removeClass('regi-error-hint');
               $('.tel-hint').addClass('regi-right-hint');
               $scope.isThrough[0]=true;
            }else{
               //当用户输入的不符合正则表单式时
               $('.tel-hint').html('仅支持常见的163、qq邮箱等');
               $('.tel-hint').removeClass('regi-right-hint');
               $('.tel-hint').addClass('regi-error-hint');
               $scope.isThrough[0]=false;
            }
         }else{
            //当用户没有输入值时
            $('.tel-hint').html('邮箱不能为空');
            $('.tel-hint').removeClass('regi-right-hint');
            $('.tel-hint').addClass('regi-error-hint');
            $scope.isThrough[0]=false;
         }
      });
      //验证密码
      $('#pwd').blur(function(){
         var userInput=$scope.regi.password;
         if(userInput){
            //当用户有输入值时
            if(regExp[1].test(userInput)){
               //当用户输入的符合正则表达式时
               $('.pwd-hint').html('恭喜您！格式正确');
               $('.pwd-hint').removeClass('regi-error-hint');
               $('.pwd-hint').addClass('regi-right-hint');
               $scope.isThrough[1]=true;
            }else{
               //当用户输入的不符合正则表单式时
               $('.pwd-hint').html('密码仅能为6-16位大小写字母和数字的组合');
               $('.pwd-hint').removeClass('regi-right-hint');
               $('.pwd-hint').addClass('regi-error-hint');
               $scope.isThrough[1]=false;
            }
         }else{
            //当用户没有输入值时
            $('.pwd-hint').html('密码不能为空');
            $('.pwd-hint').removeClass('regi-right-hint');
            $('.pwd-hint').addClass('regi-error-hint');
            $scope.isThrough[1]=false;
         }
      });
      //验证重复密码
      $('#repwd').blur(function(){
         var userInput=$scope.regi.repwd;
         if(userInput==$scope.regi.password){
            $('.repwd-hint').html('恭喜您！两次密码一致');
            $('.repwd-hint').removeClass('regi-error-hint');
            $('.repwd-hint').addClass('regi-right-hint');
            $scope.isThrough[2]=true;
         }else{
            $('.repwd-hint').html('两次密码不一致');
            $('.repwd-hint').removeClass('regi-right-hint');
            $('.repwd-hint').addClass('regi-error-hint');
            $scope.isThrough[2]=false;
         }
      });
      //验证验证码
      $('#veri').blur(function(){
         var obtainVer=$scope.verCode;
         if(obtainVer){
            var userInput=$scope.regi.veri;
            if(userInput){
               if(obtainVer==userInput){
                  //当用户输入的就是邮箱中接收到的时
                  $('.veri-hint').html('恭喜您！验证码正确');
                  $('.veri-hint').removeClass('regi-error-hint');
                  $('.veri-hint').addClass('regi-right-hint');
                  $scope.isThrough[3]=true;
               }else{
                  //当用户输入的不是邮箱中接收到的时
                  $('.veri-hint').html('验证码输入错误');
                  $('.veri-hint').removeClass('regi-right-hint');
                  $('.veri-hint').addClass('regi-error-hint');
                  $scope.isThrough[3]=false;
               }
            }else{
               $('.veri-hint').html('验证码不能为空');
               $('.veri-hint').removeClass('regi-right-hint');
               $('.veri-hint').addClass('regi-error-hint');
               $scope.isThrough[3]=false;
            }
         }else{
            $('.veri-hint').html('请先获取验证码');
            $('.veri-hint').removeClass('regi-right-hint');
            $('.veri-hint').addClass('regi-error-hint');
            $scope.isThrough[3]=false;
         }
      });
      /*------------表单验证结束-----------*/

      $scope.sendMessage=function(){
         if($scope.isThrough[0]){
            //当写了邮箱时发送验证码才可以点击
            $('.veri-hint').html('');
            var index=0;
            if(verTrue[0]){
               //当verTrue[0]为真时发送邮箱验证请求
               getMes();
               verTrue[0]=false;
            }
            if(verTrue[1]){
               //显示多少秒后重新发送
               verTrue[1]=false;//主要是为了避免在显示还剩多少秒时用户重复触发
               var timer=setInterval(function(){
                  $(".send-veriCode").html((60-index)+"秒后重新发送");
                  index++;
                  if(index>=61){
                     index=0;
                     verTrue[0]=true;
                     verTrue[1]=true;
                     $(".send-veriCode").html("发送验证码");
                     clearInterval(timer);
                  }
               },1000);
            }
         }else{
            //当没写邮箱就点击发送验证码时给出错误提示
            $('.veri-hint').html('请先输入邮箱号');
            $('.veri-hint').removeClass('regi-right-hint');
            $('.veri-hint').addClass('regi-error-hint');
         }
      }

      //提交用户重置的密码
      $scope.reset=function(){
         console.log($scope.isThrough);
         if($scope.isThrough[0]&&$scope.isThrough[1]&&$scope.isThrough[2]&&$scope.isThrough[3]){
            var curRole;
            if($scope.regi.role=='true'){
               //代表买家
               curRole=0;
            }else{
               //代表商家
               curRole=1;
            }
            var postData='email='+$scope.regi.email+'&password='+$scope.regi.password+'&role='+curRole;
            console.log(postData);
            $http({
               method:'POST',
               url:'test-updatePassword.action',
               data:postData,//序列化用户输入的数据
               headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
               console.log(data);
               if(data.status=='yes'){
                  var $errorInfo=$('.login-error-txt');
                  $errorInfo.html('重置成功！');
                  $errorInfo.slideDown();//错误提示信息缓慢出现
                  setTimeout(function(){
                     $errorInfo.slideUp();
                  },3000);
               }else{
                  var $errorInfo=$('.login-error-txt');
                  $errorInfo.html('用户不存在！');
                  $errorInfo.slideDown();//错误提示信息缓慢出现
                  setTimeout(function(){
                     $errorInfo.slideUp();
                  },3000);
               }
            });
         }else{
            var $errorInfo=$('.login-error-txt');
            $errorInfo.html('重置失败，所填信息不能为空！');
            $errorInfo.slideDown();//错误提示信息缓慢出现
            setTimeout(function(){
               $errorInfo.slideUp();
            },3000);
         }
      };

      //采用jquery，实现输入框获得焦点和失去焦点的效果
      $(".regi_input").focus(function(){
         $(this).css('border-color','#3B88C4');
      });
      $(".regi_input").blur(function(){
         $(this).css('border-color','#CCC');
      });

   });