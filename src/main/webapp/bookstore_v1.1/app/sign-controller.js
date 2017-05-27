angular.module('sign-controller',[])
   .controller('signTitleBox',function($scope,$location){
       $scope.isLogin=true;
       $scope.isRegister=false;        
       //为登录按钮添加事件
       $scope.login=function(){
          $scope.isLogin=true;
          $scope.isRegister=false;
          $location.path("/login");//页面跳转到登录页
       };
       //为注册按钮添加事件
       $scope.register=function(){
          $scope.isLogin=false;
          $scope.isRegister=true;
          $location.path("/register");//页面跳转到注册页
       }     

       //根据当前页面的url，来确定登录和注册的颜色
       if($location.url()=='/login'){
          $scope.isLogin=true;
          $scope.isRegister=false;
       }else{
          $scope.isLogin=false;
          $scope.isRegister=true;
       }
   })
   .controller('loginCtrl',function($scope,$http,$location,$window){
      $scope.userIsRem=false;//初始化用户是记住密码
      if($.cookie('userEmail')!= undefined && $.cookie('userPwd')!= undefined){
         //当用户曾记住过密码
          $scope.userMaster={
            email:$.cookie('userEmail'),
            pwd:$.cookie('userPwd')
          };//初始化数据模型为曾记住过的东西
          $scope.userIsRem=true;
      }else{
          $scope.userMaster={
            email:'',
            pwd:''
          };//初始化数据模型为空
      }
      $scope.user=angular.copy($scope.userMaster);//实现对象的copy
      $scope.userRole=true;//初始化用户的角色为顾客

      //为登录按钮添加事件
      $scope.checkUser=function(){
          //将用户输入的信息拼接成查询字符串
          var seller={};
          var user={};
          var postData='';
          var absUrl=$location.absUrl();
          var markIndex=absUrl.lastIndexOf('#');
          var newUrl;
          //根据用户的角色进入不同的页面
          if($scope.userRole){
              //当用户的角色是顾客时
              user.email=$scope.user.email;
              user.userPassword=$scope.user.pwd;
              $.each(user,function(key,value) {
                  postData+='user.'+key+'='+value+'&'
              });
              postData=postData.slice(0,postData.length-1);
              console.log(postData);
              $http({
                  method:'POST',
                  url:'user-sellectUser.action?chose=login',
                  data:postData,//序列化用户输入的数据
                  headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
              }).success(function(data){
                  console.log(data);
                  data=data.status;
                   if(data=='yes'){
                       console.log("顾客登录成功！");
                       sessionStorage.setItem("isLogin","true");
                       location.href="index_login.html";
                   }else{
                      //显示错误提示信息
                      //此处是用jquery实现
                      var $errorInfo=$('.login-error-txt');
                      $errorInfo.html('登录失败，用户名或密码错误！');
                      $errorInfo.slideDown();//错误提示信息缓慢出现
                      setTimeout(function(){
                        $errorInfo.slideUp();
                      },3000);
                   }
              });
          }else{
              //当用户的角色是商家时
              seller.selTel=$scope.user.email;
              seller.selPassword=$scope.user.pwd;
              $.each(seller,function(key,value) {
                  postData+='seller.'+key+'='+value+'&'
              });
              postData=postData.slice(0,postData.length-1);
              $http({
                  method:'POST',
                  url:'sel-sellectSeller.action?chose=login',
                  data:postData,//已经序列化的用户输入的数据
                  headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
              }).success(function(data){
                  newUrl=absUrl.slice(0,markIndex-9)+'merchant_login.html';
                  console.log(data);
                  data=data.status;
                  if(data=='yes'){
                      //页面跳转到商家登录页
                      $window.location.href=newUrl;
                      console.log('商家登录成功');
                  }else{
                      //显示错误提示信息
                      //此处是用jquery实现
                      var $errorInfo=$('.login-error-txt');
                      $errorInfo.html('登录失败，用户名或密码错误！');
                      $errorInfo.slideDown();//错误提示信息缓慢出现
                      setTimeout(function(){
                        $errorInfo.slideUp();
                      },3000);
                  }
              });
          }
          //根据用户的选择，来确定是否记住密码----用的是jquery中的cookie插件
          if( $scope.userIsRem){
            //当用户选择的是记住密码---设置cookie
            $.cookie('userEmail',$scope.user.email,{path:'/',expires:7});
            $.cookie('userPwd',$scope.user.pwd,{path:'/',expires:7});
          }else{
            //当用户选择的不是记住密码----删除cookie
            $.cookie('userEmail',$scope.user.email,{path:'/',expires:-10});
            $.cookie('userPwd',$scope.user.pwd,{path:'/',expires:-10});
          }
      };

       //使用jquery中的方法，为input加获得和失去焦点事件
       $('.user_info').focus(function(){//获得焦点
          $(this).css('border-color','#3DBCF5');//改变输入框的颜色
       });
       $('.user_info').blur(function(){//失去焦点
          $(this).css('border-color','#CCC');
       });
   })
   .controller('registerCtrl',function($scope,$http,$location,$window){
        $scope.masterMer={sellerId:'',sellerAge:'',sellerSex:'男',uname:'',uEmail:'',pwd:'',veri:''};
        $scope.masterRegi={uname:'',uEmail:'',pwd:'',veri:''};
        $scope.mer=angular.copy($scope.masterMer);//实现对象的copy
        $scope.regi=angular.copy($scope.masterRegi);//实现对象的copy

        //根据用户选择的角色，来确定页面上的显示内容
        $scope.regiRole=true;//初始化用户为顾客身份
        $scope.$watch('regiRole',function(newVal,oldVal){
            $scope.verCode='';

            //下面是angular.js
            var verTrue=[true,true];//验证码(此处为了避免用户多次重复触发获得验证码事件，故用了两个标志即：verTrue[0]和verTrue[1])
            var getMes=function(){
            //TODO   模拟平台发送验证码
            var postD='receiver='+$scope.regi.uEmail;
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
            var regExp=[/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
                        /^\d{2,3}$/,
                        /^[\u4e00-\u9fa5]{4,10}$/,
                        /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/];
            $scope.isThrough=[false,false,false,false,false,false,false];
            //验证身份证
            $('#myId').blur(function(){
               var userInput=$scope.mer.sellerId;
               if(userInput){
                  //当用户有输入值时
                  if(regExp[0].test(userInput)){
                     //当用户输入的符合正则表达式时
                     $('.sellerId-hint').html('恭喜您！格式正确');
                     $('.sellerId-hint').removeClass('regi-error-hint');
                     $('.sellerId-hint').addClass('regi-right-hint');
                     $scope.isThrough[0]=true;
                  }else{
                     //当用户输入的不符合正则表单式时
                     $('.sellerId-hint').html('身份证为数字且为15位或18位');
                     $('.sellerId-hint').removeClass('regi-right-hint');
                     $('.sellerId-hint').addClass('regi-error-hint');
                     $scope.isThrough[0]=false;
                  }
               }else{
                  //当用户没有输入值时
                  $('.sellerId-hint').html('身份证不能为空');
                  $('.sellerId-hint').removeClass('regi-right-hint');
                  $('.sellerId-hint').addClass('regi-error-hint');
                  $scope.isThrough[0]=false;
               }
            });
            //验证年龄
            $('#myAge').blur(function(){
               var userInput=$scope.mer.sellerAge;
                console.log(userInput);
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
                     $('.sellerAge-hint').html('请输入大于9数字');
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
               var userInput=$scope.regi.uname;
               if(userInput){
                  //当用户有输入值时
                  if(regExp[2].test(userInput)){
                     //当用户输入的符合正则表达式时
                     $('.name-hint').html('恭喜您！格式正确');
                     $('.name-hint').removeClass('regi-error-hint');
                     $('.name-hint').addClass('regi-right-hint');
                     $scope.isThrough[2]=true;
                  }else{
                     //当用户输入的不符合正则表单式时
                     $('.name-hint').html('昵称应为4-10个汉字');
                     $('.name-hint').removeClass('regi-right-hint');
                     $('.name-hint').addClass('regi-error-hint');
                     $scope.isThrough[2]=false;
                  }
               }else{
                  //当用户没有输入值时
                  $('.name-hint').html('昵称不能为空');
                  $('.name-hint').removeClass('regi-right-hint');
                  $('.name-hint').addClass('regi-error-hint');
                  $scope.isThrough[2]=false;
               }
            });
            //验证邮箱
            $('#tel').blur(function(){
               var userInput=$scope.regi.uEmail;
               if(userInput){
                  //当用户有输入值时
                  if(regExp[3].test(userInput)){
                     //当用户输入的符合正则表达式时
                     $('.tel-hint').html('恭喜您！格式正确');
                     $('.tel-hint').removeClass('regi-error-hint');
                     $('.tel-hint').addClass('regi-right-hint');
                     $scope.isThrough[3]=true;
                  }else{
                     //当用户输入的不符合正则表单式时
                     $('.tel-hint').html('仅支持常见的163、qq邮箱等');
                     $('.tel-hint').removeClass('regi-right-hint');
                     $('.tel-hint').addClass('regi-error-hint');
                     $scope.isThrough[3]=false;
                  }
               }else{
                  //当用户没有输入值时
                  $('.tel-hint').html('邮箱不能为空');
                  $('.tel-hint').removeClass('regi-right-hint');
                  $('.tel-hint').addClass('regi-error-hint');
                  $scope.isThrough[3]=false;
               }
            });
            //验证密码
            $('#pwd').blur(function(){
               var userInput=$scope.regi.pwd;
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
              var userInput=$scope.regi.repwd;
              if(userInput==$scope.regi.pwd){
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
                      $scope.isThrough[6]=true;
                    }else{
                      //当用户输入的不是邮箱中接收到的时
                      $('.veri-hint').html('验证码输入错误');
                      $('.veri-hint').removeClass('regi-right-hint');
                      $('.veri-hint').addClass('regi-error-hint');
                      $scope.isThrough[6]=false;
                    }
                  }else{
                    $('.veri-hint').html('验证码不能为空');
                    $('.veri-hint').removeClass('regi-right-hint');
                    $('.veri-hint').addClass('regi-error-hint');
                    $scope.isThrough[6]=false;
                  }
                }else{
                  $('.veri-hint').html('请先获取验证码');
                  $('.veri-hint').removeClass('regi-right-hint');
                  $('.veri-hint').addClass('regi-error-hint');
                  $scope.isThrough[6]=false;
                }
            });
            /*------------表单验证结束-----------*/
     
            /*-----------------根据用户选择的角色，来决定页面上的显示内容---------------*/
            if(!newVal){
              //当用户选择为商户身份时---此处用到了jquery
              $('.register-merchant-box').slideDown();
            }else{
              //当用户选择为顾客身份时---此处用到了jquery
              $('.register-merchant-box').slideUp();
            }
            /*-----------------根据用户选择的角色，来决定页面上的显示内容---------------*/

            $scope.sendMessage=function(){
                if($scope.isThrough[3]){
                    //当写了邮箱时发送验证码才可以点击
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

            $scope.regist=function(){
                //当所有数据都合法时，提交数据
                var postData='';
                var postUrl;
                var seller={};
                var user={};
                var absUrl;
                var markIndex;
                var newUrl;
                if(!newVal){
                    //当是商家时
                    postUrl='sel-addSeller.action';
                    console.log($scope.isThrough);
                    if($scope.isThrough[0]&&$scope.isThrough[1]&&$scope.isThrough[2]&&$scope.isThrough[3]&&$scope.isThrough[4]&&$scope.isThrough[5]&&$scope.isThrough[6]){
                        console.log('商家可以注册');
                        seller.selIdCard=$scope.mer.sellerId;
                        seller.selAge=$scope.mer.sellerAge;
                        seller.selSex=$scope.mer.sellerSex;
                        seller.selName=$scope.regi.uname;
                        seller.selTel=$scope.regi.uEmail;
                        seller.selPassword=$scope.regi.pwd;
                        //将用户输入的信息拼接成查询字符串
                        $.each(seller,function(key,value) {
                          postData+='seller.'+key+'='+value+'&'
                        });
                        postData+='selId='+'';
                        console.log(postData);
                        console.log(seller);
                    }else{
                        console.log('商家不可以注册');
                    }
                }else{
                    //当是顾客时
                    postUrl='user-addUser.action';
                    console.log($scope.isThrough);
                    if($scope.isThrough[3]&&$scope.isThrough[4]&&$scope.isThrough[5]&&$scope.isThrough[6]){
                        console.log('顾客可以注册');
                        user.userName=$scope.regi.uname;
                        user.userPassword=$scope.regi.pwd;
                        user.email=$scope.regi.uEmail;
                        //将用户输入的信息拼接成查询字符串
                        $.each(user,function(key,value) {
                            postData+='user.'+key+'='+value+'&'
                        });
                        postData+='userId='+'';
                        console.log(postData);
                        console.log(user);
                    }else{
                        console.log('顾客不可以注册');
                    }
                }

                $http({
                    method:'POST',
                    url:postUrl,
                    data:postData,//序列化用户输入的数据
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                }).success(function(data){
                    data=data.status;
                    console.log(data);
                    if(data=='yes'){
                        //页面跳转到注册成功页
                        absUrl=$location.absUrl();
                        markIndex=absUrl.lastIndexOf('#');
                        newUrl=absUrl.slice(0,markIndex-9)+'register_success.html';
                        $window.location.href=newUrl;
                        console.log("注册成功！");
                    }else{
                        //注册失败，请重新注册
                        $window.location.href=$location.absUrl();
                        console.log("注册失败，服务器有问题，请重新注册！");
                    }
                });
            }

            //采用jquery，实现输入框获得焦点和失去焦点的效果
            $(".regi_input").focus(function(){
                $(this).css('border-color','#3B88C4');
            });
            $(".regi_input").blur(function(){
                $(this).css('border-color','#CCC');
            });
        });
    });