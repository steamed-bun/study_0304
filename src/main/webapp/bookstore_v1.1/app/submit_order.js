angular.module('submitOrder',[])
    .directive('onRepeatFinishedRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        //这里element, 就是ng-repeat渲染的最后一个元素
                        scope.$emit('ngRepeatFinished', element);
                    });
                }
            }
        };
    })
    .controller('submitCtrl',function($scope){
        $scope.$on("to-parent",function(e,data){
            console.log(data);
            $scope.$broadcast('to-child',data);
        });
        $scope.$on("to-parent-edit-addr",function(e,data){
            $scope.$broadcast('to-child-edit-addr',data);
        });
    })
    .controller('selectAddrCtrl',function($scope,$http){
        $scope.userAddr={
            name:' ',
            tel:'',
            addrDetail:''
        };
        //TODO   A.从数据库中获得买家保存的地址信息
        $http({
            method:'POST',
            url:'address-getDefAddress.action',
            data: '', //no data
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
        }).success(function(response){
            console.log(response);
            if(response.status=='no'){
                //该用户没有默认地址
                $('.new-addr-box').css('display','block');
                console.log('我走的是没有默认地址这条路');
            }else{
                console.log('我走的是有默认地址这条路');
                //该用户有默认地址
                response=response.address;
                console.log(response);
                $scope.userAddr.name=response.name;
                $scope.userAddr.tel=response.tel;
                $scope.userAddr.addrDetail=response.province.provinceName+response.city.cityName+response.county.countyName+response.street;
                $('.select-addr-box').css('display','block');
                //给修改按钮添加事件
                $scope.editMyAddr=function(){
                    $('.select-addr-box').css('display','none');
                    $('.edit-addr-box').css('display','block');
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
                    //获得用于待编辑的地址所有信息
                    $http({
                        method:'POST',
                        url:'address-getDefAddress.action',
                        data: '',// no data
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
                            $scope.$emit("to-parent-edit-addr",$scope.userEditAddr);
                        }
                    });
                };
                //给切换地址按钮添加点击事件
                $scope.changeMyAddr=function(){
                    $('.addr-as-default').css('display','block');
                    console.log('我是切换地址');
                    //页面一加载得到该买家的所有地址信息(可能不止一条)
                    $scope.userAddrLists=[];
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
                            for(var i=0;i<response.length;i++){
                                perAddr={};
                                perAddr.userName=response[i].name;
                                perAddr.tel=response[i].tel;
                                perAddr.addrDetail=response[i].province.provinceName+response[i].city.cityName+response[i].county.countyName+response[i].street;
                                perAddr.addressId=response[i].addressId;
                                $scope.userAddrLists.push(perAddr);
                            }
                            console.log($scope.userAddrLists);
                            //将获得的地址信息，传给父ctrl
                            $scope.$emit("to-parent",$scope.userAddrLists);
                        }
                    });
                };
                //给新建地址按钮添加事件
                $scope.addNewAddr=function(){
                    $('.select-addr-box').css('display','none');
                    $('.new-addr-box').css('display','block');
                    console.log('我是新建地址');
                };
            }
        });
    })
    .controller('newAddrCtrl',function($scope,$http){
        //保存买家输入的地址的对象
        //provinceId=1&address.county.countyId=1&address.city.cityId=1&address.street=test&address.tel=18829289582&address.def=1
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
            def:''

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
                        $('.select-addr-box').css('display','block');
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
                                $('.select-addr-box').css('display','block');
                                $('.edit-addr-box').css('display','none');
                                $('.oper-hint').html('新建地址成功！');
                                $('.oper-hint').slideDown();//错误提示信息缓慢出现
                                setTimeout(function(){
                                    $('.oper-hint').slideUp();
                                },3000);
                            }
                        });
                    }
                }
            });
        };
        //给新建地址的取消按钮添加事件
        $scope.cancelNewAddr=function(){
            $('.new-addr-box').css('display','none');
            $('.select-addr-box').css('display','block');
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
    .controller('editAddrCtrl',function($scope,$http){
        $scope.$on("to-child-edit-addr",function(e,data){
            console.log(data);
            // 获得待修改的地址信息的基础变量设置
            $scope.userEditAddr={
                selectProvince:data.selectProvince,
                provinceId:data.provinceId,
                selectCity:data.selectCity,
                cityId:data.cityId,
                selectRegi:data.selectRegi,
                countyId:data.countyId,
                street:data.street,
                name:data.name,
                tel:data.tel,
                def:data.def,
                addressId:data.addressId
            };
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
                    $('.select-addr-box').css('display','block');
                    $('.edit-addr-box').css('display','none');
                   /* $('.oper-hint').html('编辑地址成功！');
                    $('.oper-hint').slideDown();//错误提示信息缓慢出现
                    setTimeout(function(){
                        $('.oper-hint').slideUp();
                    },3000);*/
                    window.location.href='submit_order.html';
                }
             });
        };
        //给编辑地址的取消按钮添加事件
        $scope.cancelEditAddr=function(){
            $('.edit-addr-box').css('display','none');
            $('.select-addr-box').css('display','block');
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
    })
    .controller('addrAsDefaultCtrl',function($scope,$http){
        $scope.userAddrLists=[];
        $scope.$on("to-child",function(e,data){
            console.log(data);
            $scope.userAddrLists=data;
            $scope.$on("ngRepeatFinished", function (repeatFinishedEvent, element){
                var repeatId = element.parent().attr("repeat-id");
                switch (repeatId){
                    case "r1":
                        console.log('r1渲染完了');
                        //给第一个地址信息块添加‘默认地址’
                        var $firstElem=$('.wait-addrs>li:first-child');
                        $('.wait-addrs>li').removeClass('highlight-select-addr');
                        $firstElem.addClass('highlight-select-addr');
                        $('.default-addr-mark').html('');
                        $($firstElem.children('.default-addr-mark')).html('默认地址');
                        break;

                }
            });
        });
        //给关闭按钮添加事件
        $('.close-wait-addr').click(function(){
            $('.addr-as-default').css('display','none');
        });
        //给选择默认地址的确认按钮添加事件
        $scope.saveDefaultAddr=function(){
            var addressId=$('.highlight-select-addr').attr('data-id');
            var postData='address.addressId='+addressId+'&address.def=1';
            $http({
                 method:'POST',
                 url:'address-saveOrUpdateAddress.action',
                 data:postData ,
                 headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
             }).success(function(response){
                console.log(response);
                if(response.status=='yes'){
                    //设置默认地址成功
                    $('.select-addr-box').css('display','block');
                    $('.addr-as-default').css('display','none');
                    window.location.href='submit_order.html';
                }
             });
        };
        //给选择默认地址的取消按钮添加事件
        $scope.cancalSaveDefaultAddr=function(){
            $('.addr-as-default').css('display','none');
        };
        //高亮被选择的地址
        $scope.highlightAddrDefault=function($index){
            var elemIndex=$index+1;
            var $curElem=$('.wait-addrs>li:nth-child('+elemIndex+')');
            $('.wait-addrs>li').removeClass('highlight-select-addr');
            $('.default-addr-mark').html('');
            $curElem.addClass('highlight-select-addr');
            $($curElem.children('.default-addr-mark')).html('默认地址');
        }
    })
    .controller('userBookInfoCtrl',function($scope,$http){
        //每本书的信息
        $scope.userBooks=[];
        $scope.order={
            totalMoney:'24',
            totalShouldPay:'24'
        };
        //从数据中获得用户待购买的书籍信息
        $http({
             method:'POST',
             url:'trade-getTradeItemsByUserId.action',
             data: 'tradeItem.status=-1',//no data
             headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
         }).success(function(data){
            console.log(data);
            console.log('没看上档次');
            data=data.tradeItems;
            for(var k=0;k<data.length;k++){
                var book={};
                book.bookName=data[k].book.bookName;
                book.bookPrice=data[k].book.bookPrice;
                book.quantity=data[k].quantity;
                book.itemMoney=data[k].price;
                book.bookId=data[k].book.bookId;
                $scope.userBooks.push(book);
            }
            $scope.order.totalMoney=data[0].trade.totalPrice;
            $scope.order.totalShouldPay=data[0].trade.totalPrice;
            $scope.order.tradeId=data[0].trade.tradeId;
         });
        //去付款
        $scope.goPay=function(){
            //检测是否有默认地址
            $http({
                method:'POST',
                url:'address-getDefAddress.action',
                data:'',//已经序列化的用户输入的数据
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
            }).success(function(data){
                console.log(data);
                if(data.status=='no'){
                    //没有默认地址，要给买家提示
                    var $errorInfo=$('.oper-hint');
                    $errorInfo.html('请输入收货地址！');
                    $errorInfo.slideDown();//错误提示信息缓慢出现
                    setTimeout(function(){
                        $errorInfo.slideUp();
                    },3000);
                }else{
                    var postData='trade.tradeId='+$scope.order.tradeId+'&trade.address.addressId='+data.address.addressId;
                    $http({
                        method:'POST',
                        url:'trade-updateAddress.action',
                        data:postData,//已经序列化的用户输入的数据
                        headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                    }).success(function(data){
                        console.log(data);
                        if(data.status=='yes'){
                            window.location.href='purchase.html?money='+$scope.order.totalMoney+'&tradeId='+$scope.order.tradeId;
                        }
                    });
                }
            });
        };
    });