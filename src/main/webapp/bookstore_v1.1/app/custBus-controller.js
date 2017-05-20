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
        //辅助兄弟控制器之间传数据的
        $scope.$on("to-parent",function(e,data){
            console.log(data);
            $scope.$broadcast('to-child',data);
        });
    })
    .controller('isNoAddrCtrl',function($scope,$http){
        console.log('我是没有地址');
        $scope.userArr=[];
        //从数据库中获得买家保存的地址信息
        $http({
            method:'POST',
            url:'address-getAddressByUserId.action',
            data: '',//no data
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
        }).success(function(response){
            console.log(response);
            var perAddr;
            if(response.status=='yes'){
                if(response.addresses.length!=0){
                    //当有地址时
                    response=response.addresses;
                    for(var i=0;i<response.length;i++){
                        perAddr={};
                        perAddr.name=response[i].name;
                        perAddr.tel=response[i].tel;
                        perAddr.addrDetail=response[i].province.provinceName+response[i].city.cityName+response[i].county.countyName+response[i].street;
                        perAddr.addressId=response[i].addressId;
                        if(parseInt(response[i].def)==1){
                            //是默认地址
                            perAddr.def=true;
                            perAddr.defText='默认地址';
                        }else{
                            //不是默认地址
                            perAddr.def=false;
                            perAddr.defText='';
                        }
                        $scope.userArr.push(perAddr);
                    }
                    $('.display-addr').css('display','block');
                    console.log($scope.userArr);
                }else{
                    //当没有地址时
                    $('.no-addr-box').css('display','flex');
                }
            }
        });
        //给显示地址界面上的删除添加事件
        $scope.deleteMyAddr=function($event){
            console.log('我要删除地址');
            var $curElem=$($event.target);
            var addrId=$curElem.attr('data-id');
            console.log(addrId);
            $http({
                method:'POST',
                url:'address-deleteAddress.action',
                data:'address.addressId='+addrId,//序列化用户输入的数据
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
                console.log(data);
                if(data.status=='yes'){
                    //删除成功
                    //window.location.href='customer_business.html#/addrMange';
                    $curElem.parent().parent().remove();
                }else{
                    $('.oper-hint').html('删除失败，请重试！');
                    $('.oper-hint').slideDown();//错误提示信息缓慢出现
                    setTimeout(function(){
                        $('.oper-hint').slideUp();
                    },3000);
                }
            });
        };
        //给显示地址界面上的编辑添加事件
        $scope.editMyAddr=function($event){
            console.log('我要编辑地址');
            var $curElem=$($event.target);
            var addrId=$curElem.attr('data-id');
            console.log(addrId);
            $scope.$emit("to-parent",addrId);
            $('.edit-addr-box').css('display','block');
        };
        //给地址显示界面的新建地址添加事件
        $scope.goNewAddr2=function(){
            $('.new-addr-box').css('display','block');
        };
        //给没有地址界面的新建地址添加事件
        $scope.goAddNewAddr=function(){
            $('.new-addr-box').css('display','block');
        };
    })
    .controller('editAddrCtrl',function($scope,$http){
        console.log('我是编辑地址');
        //获得待修改的地址信息的基础变量设置
        $scope.userEditAddr={
            selectProvince:'',
            provinceId:'',
            selectCity:'',
            cityId:'',
            selectRegi:'',
            countyId:'',
            street:'test',
            name:'',
            tel:'',
            def:'',
            addressId:''
        };
        //根据地址id获得当前地址信息
        $scope.$on("to-child",function(e,data){
            var addrId=data;
            console.log(data);
            //根据地址的id号从数据库中获得该地址的信息
            $http({
                method:'POST',
                url:'address-getAddressById.action',
                data:'address.addressId='+addrId,//序列化用户输入的数据
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(response){
                console.log(response);
                if(response.status=='yes'){
                    response=response.address;
                    $scope.userEditAddr.selectProvince=response.province.provinceName;
                    $scope.userEditAddr.provinceId=response.province.provinceId;
                    $scope.userEditAddr.selectCity=response.city.cityName;
                    $scope.userEditAddr.cityId=response.city.cityId;
                    $scope.userEditAddr.selectRegi=response.county.countyName;
                    $scope.userEditAddr.countyId=response.county.countyId;
                    $scope.userEditAddr.street=response.street;
                    $scope.userEditAddr.name=response.name;
                    $scope.userEditAddr.tel=response.tel;
                    if(response.def==1){
                        $scope.userEditAddr.def=true;
                    }else{
                        $scope.userEditAddr.def=false;
                    }
                    $scope.userEditAddr.addressId=response.addressId;
                }
            });

            //给编辑地址的确认按钮添加事件
            $scope.saveEditAddr=function(){
                var provinceId=$('.mer-province').attr('data-id'),
                    cityId=$('.mer-city').attr('data-id'),
                    regiId=$('.mer-regi').attr('data-id');
                var isDefault='';
                if($scope.userEditAddr.def==true){
                    isDefault=1;
                }else{
                    isDefault=0;
                }
                var postData='address.province.provinceId='+provinceId+'&address.city.cityId='+cityId+'&address.county.countyId='+regiId+'&address.street='+$scope.userEditAddr.street+'&address.tel='+$scope.userEditAddr.tel+'&address.def='+isDefault+'&address.addressId='+$scope.userEditAddr.addressId+'&address.name='+$scope.userEditAddr.name;
                console.log(postData);
                $http({
                    method:'POST',
                    url:'address-saveOrUpdateAddress.action',
                    data:postData,
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                }).success(function(response){
                    console.log(response);
                    if(response.status=='yes'){
                        $('.display-addr').css('display','block');
                        $('.edit-addr-box').css('display','none');
                         $('.oper-hint').html('编辑地址成功！');
                         $('.oper-hint').slideDown();//错误提示信息缓慢出现
                         setTimeout(function(){
                         $('.oper-hint').slideUp();
                         },3000);
                    }else{
                         $('.oper-hint').html('编辑地址失败！');
                         $('.oper-hint').slideDown();//错误提示信息缓慢出现
                         setTimeout(function(){
                         $('.oper-hint').slideUp();
                         },3000);
                    }
                });
            };
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
                            $scope.userEditAddr.selectProvince=$(event.target).html();
                            $('.mer-province').attr('data-id',$(event.target).attr('data-id'));
                            $scope.$apply(); //传播Model的变化，否则view不能更新
                            break;
                        case "$('.mer-city')":
                            $scope.userEditAddr.selectCity=$(event.target).html();
                            $('.mer-city').attr('data-id',$(event.target).attr('data-id'));
                            $scope.$apply(); //传播Model的变化，否则view不能更新
                            break;
                        case "$('.mer-regi')":
                            $scope.userEditAddr.selectRegi=$(event.target).html();
                            $('.mer-regi').attr('data-id',$(event.target).attr('data-id'));
                            $scope.$apply(); //传播Model的变化，否则view不能更新
                            break;
                    }
                    hideArea($area,$icon);
                });
            }
            //从数据库中获得省的信息
            $('#display-pro').click(function(){
                console.log('我被点了');
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
                    console.log(data);
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
                    console.log(data);
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
                    console.log(data);
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
        });
        //给编辑地址的取消按钮添加事件
        $scope.cancelEditAddr=function(){
            $('.edit-addr-box').css('display','none');
            $('.display-addr').css('display','block');
        };
    })
    .controller('newAddrCtrl',function($scope,$http){
        console.log('我是新建地址');
        $scope.userNewAddr={
            selectProvince:'',
            provinceId:'',
            selectCity:'',
            cityId:'',
            selectRegi:'',
            countyId:'',
            street:'',
            name:'',
            tel:'',
            def:true
        };
        //给新建地址的确认按钮添加事件
        $scope.saveNewAddr=function(){
            //当数据库中已有3条地址时，则不能再新建了
            $http({
                method:'POST',
                url:'address-getAddressByUserId.action',
                data: '',//no data
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(response){
                console.log(response);
                var perAddr;
                if(response.status=='yes'){
                    response=response.addresses;
                    if(response.length>=3){
                        $('.new-addr-box').css('display','none');
                        $('.oper-hint').html('已有3条地址，不能再新建！');
                        $('.oper-hint').slideDown();//错误提示信息缓慢出现
                        setTimeout(function(){
                            $('.oper-hint').slideUp();
                        },3000);
                    }else{
                        var provinceId=$('.mer-province').attr('data-id'),
                            cityId=$('.mer-city').attr('data-id'),
                            regiId=$('.mer-regi').attr('data-id');
                        var isDefault='';
                        if($scope.userNewAddr.def==true){
                            isDefault=1;
                        }else{
                            isDefault=0;
                        }
                        var postData='address.province.provinceId='+provinceId+'&address.city.cityId='+cityId+'&address.county.countyId='+regiId+'&address.street='+$scope.userNewAddr.street+'&address.tel='+$scope.userNewAddr.tel+'&address.def='+isDefault+'&address.name='+$scope.userNewAddr.name;
                        $http({
                            method:'POST',
                            url:'address-saveOrUpdateAddress.action',
                            data:postData,
                            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                        }).success(function(response){
                            console.log(response);
                            if(response.status=='yes'){
                                $('.display-addr').css('display','block');
                                $('.new-addr-box').css('display','none');
                                $('.no-addr-box').css('display','none');
                              /*  $('.oper-hint').html('新建地址成功！');
                                $('.oper-hint').slideDown();
                                setTimeout(function(){
                                    $('.oper-hint').slideUp();
                                },3000);*/
                                window.location.href='customer_business.html#/addrMange';
                            }
                        });
                    }
                }
            });
        };
        //给新建地址的取消按钮添加事件
        $scope.cancelNewAddr=function(){
            $('.new-addr-box').css('display','none');
            $('.display-addr').css('display','block');
            console.log('我是新建地址的取消按钮');
        };
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
                        $scope.userNewAddr.selectProvince=$(event.target).html();
                        $('.mer-province').attr('data-id',$(event.target).attr('data-id'));
                        $scope.$apply(); //传播Model的变化，否则view不能更新
                        break;
                    case "$('.mer-city')":
                        $scope.userNewAddr.selectCity=$(event.target).html();
                        $('.mer-city').attr('data-id',$(event.target).attr('data-id'));
                        $scope.$apply(); //传播Model的变化，否则view不能更新
                        break;
                    case "$('.mer-regi')":
                        $scope.userNewAddr.selectRegi=$(event.target).html();
                        $('.mer-regi').attr('data-id',$(event.target).attr('data-id'));
                        $scope.$apply(); //传播Model的变化，否则view不能更新
                        break;
                }
                hideArea($area,$icon);
            });
        }
        //从数据库中获得省的信息
        $('#display-pro-new').click(function(){
            console.log('省被点击了');
            var html='';
            var i;
            var len;
            var provinces=[];
            var provincesId=[];
            var $options=$('#all-provinces-new').children();
            if($options.length != 0){
                //当省中已经有信息时，显示省信息，并将选择的写入input框中
                displayArea($('#all-provinces-new'),$('.mer-pro-icon'));
                selectInfo($('#all-provinces-new'),"$('.mer-province')",$('.mer-pro-icon'));
                return ;
            }
            //从数据库中拿到省的信息
            console.log('执行到这');
            $http({
                method:'GET',
                url:'select-getProvince.action',
            }).success(function(data){
                console.log(data);
                for(var i in data.province){
                    provinces[i]=data.province[i].provinceName;
                    provincesId[i]=data.province[i].provinceId;
                }
                for(i=0,len=provinces.length;i<len;i++){
                    html+='<li data-id='+provincesId[i]+'>'+provinces[i]+'</li>'
                }
                $('#all-provinces-new').append(html);
                displayArea($('#all-provinces-new'),$('.mer-pro-icon'));
                selectInfo($('#all-provinces-new'),"$('.mer-province')",$('.mer-pro-icon'));
            });
            console.log('期望到这');
            //provinces=['陕西1','陕西2','陕西3','陕西4','陕西5','陕西6','陕西7','陕西8','陕西9','陕西10','陕西11','陕西12','陕西13','陕西14'];
        });

        //当市的选择框被点击时，显示市信息
        $('#display-city-new').click(function(){
            console.log('市被点击了');
            var html='';
            var i;
            var len;
            var citys=[];
            var cityId=[];
            var provinceId=$('.mer-province').attr('data-id');
            var postData='provinceId='+provinceId;
            var $options=$('#all-citys-new').children();
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
                console.log(data);
                for(var i in data.cities){
                    citys[i]=data.cities[i].cityName;
                    cityId[i]=data.cities[i].cityId;
                }
                for(i=0,len=citys.length;i<len;i++){
                    html+='<li data-id='+cityId[i]+'>'+citys[i]+'</li>'
                }
                $('#all-citys-new').append(html);
                displayArea($('#all-citys-new'),$('.mer-city-icon'));
                selectInfo($('#all-citys-new'),"$('.mer-city')",$('.mer-city-icon'));
            });
            //citys=['西安1','西安2','西安3','西安4','西安5','西安6','西安7','西安8','西安9','西安10','西安11','西安12','西安13','西安14'];
        });
        //当区的选择框被点击时，显示区信息
        $('#display-regi-new').click(function(){
            console.log('区被点击了');
            var html='';
            var i;
            var len;
            var regis=[];
            var regisId=[];
            var cityId=$('.mer-city').attr('data-id');
            var postData='cityId='+cityId;
            var $options=$('#all-regis-new').children();
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
                console.log(data);
                for(var i in data.counties){
                    regis[i]=data.counties[i].countyName;
                    regisId[i]=data.counties[i].countyId;
                }
                for(i=0,len=regis.length;i<len;i++){
                    html+='<li data-id='+regisId[i]+'>'+regis[i]+'</li>'
                }
                $('#all-regis-new').append(html);
                $('#all-regis-new').css('display','block');
                displayArea($('#all-regis-new'),$('.mer-area-icon'));
                selectInfo($('#all-regis-new'),"$('.mer-regi')",$('.mer-area-icon'));
            });
            //var regis=['长安1','长安2','长安3','长安4','长安5','长安6','长安7','长安8','长安9','长安10','长安11','长安12','长安13','长安14'];
        });
        /*------显示省市区信息结束-------*/
    })
    .controller('orderMangeCtrl',function($scope){
        //给关于订单的每一项加单击事件
        $('.order-status>li').click(function(){
            var index=parseInt($(this).attr('data-id'));
            $('.order-status>li').removeClass('highlight-orderStatus');
            $(this).addClass('highlight-orderStatus');
            $('.order-box>div').css('display','none');
            $('.order-box>div:nth-child('+index+')').css('display','block');
        });
    });