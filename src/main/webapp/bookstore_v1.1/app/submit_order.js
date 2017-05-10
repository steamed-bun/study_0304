angular.module('submitOrder',[])
    .controller('selectAddrCtrl',function($scope,$http){
        $scope.userAddr={
            userName:'嘿嘿嘿 ',
            tel:'18769289125',
            addrDetail:'陕西省西安市长安区西安邮电大学南校区西区'
        };
        //TODO   A.从数据库中获得买家保存的地址信息
        /*$http({
            method:'POST',
            url:'',
            data: ,
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
        }).success(function(response){
            console.log(response);
        });*/
        //给修改按钮添加事件
        $scope.editMyAddr=function(){
            $('.select-addr-box').css('display','none');
            $('.edit-addr-box').css('display','block');
            console.log('我是修改按钮');
        };
        //给切换地址按钮添加点击事件
        $scope.changeMyAddr=function(){
            $('.addr-as-default').css('display','block');
            console.log('我是切换地址');
        };
        //给新建地址按钮添加事件
        $scope.addNewAddr=function(){
            $('.select-addr-box').css('display','none');
            $('.new-addr-box').css('display','block');
            console.log('我是新建地址');
        };
    })
    .controller('newAddrCtrl',function($scope,$http){
        //保存买家输入的地址的对象
        $scope.userNewAddr={
            selectProvince:'',
            selectProvinceId:'',
            selectCity:'',
            selectCityId:'',
            selectRegi:'',
            selectRegiId:'',
            street:'',
            name:'',
            email:'',
            isDefault:''
        };
        //TODO B.给新建地址的确认按钮添加事件
        $scope.saveNewAddr=function(){
            /*$http({
             method:'POST',
             url:'',
             data: ,
             headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
             }).success(function(response){
             console.log(response);
             });*/
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
        //TODO 从数据库中获得待修改的地址信息
        $scope.userEditAddr={
            selectProvince:'陕西',
            selectProvinceId:'1',
            selectCity:'西安',
            selectCityId:'1',
            selectRegi:'长安',
            selectRegiId:'1',
            street:'西安邮电大学南校区',
            name:'系会',
            email:'2814241400@qq.com',
            isDefault:true
        };
        //TODO  C.获得用于待编辑的地址所有信息
        /*$http({
             method:'POST',
             url:'',
             data: ,
             headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
         }).success(function(response){
            console.log(response);
         });*/
        //TODO 给编辑地址的确认按钮添加事件
        $scope.saveEditAddr=function(){
            /*$http({
                 method:'POST',
                 url:'',
                 data: ,
                 headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
             }).success(function(response){
                console.log(response);
             });*/
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
    .controller('addrAsDefaultCtrl',function($scope,$http){
        $scope.userAddrLists=[
            {
                userName:'不好就',
                tel:'13819242249',
                addrDetail:'陕西省西安市长安区西安邮电大学南校区西区'
            },
            {
                userName:'不好就',
                tel:'13819242249',
                addrDetail:'陕西省西安市长安区西安邮电大学南校区西区'
            },
            {
                userName:'不好就',
                tel:'13819242249',
                addrDetail:'陕西省西安市长安区西安邮电大学南校区西区'
            }
        ];
        //给第一个地址信息块添加‘默认地址’
        $('.wait-addrs>li:first-child default-addr-mark').html('默认地址');
        //给关闭按钮添加事件
        $('.close-wait-addr').click(function(){
            $('.addr-as-default').css('display','none');
        });
        //TODO D.页面一加载得到该买家的所有地址信息(可能不止一条)
        /*$http({
             method:'POST',
             url:'',
             data: ,
             headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
         }).success(function(response){
            console.log(response);
         });*/

        //TODO E.给选择默认地址的确认按钮添加事件
        $scope.saveDefaultAddr=function(){
            console.log('我要保存选择的默认地址');
            /*$http({
                 method:'POST',
                 url:'',
                 data: ,
                 headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
             }).success(function(response){
                console.log(response);
             });*/
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
        $scope.userBooks=[
            {
                imgUrl:'./images/index/e00001.jpg',
                bookName:'你是我的小确幸',
                perPrice:'12',
                bookNum:'1',
                totalPrice:'12'
            },
            {
                imgUrl:'./images/index/e00001.jpg',
                bookName:'你是我的小确幸',
                perPrice:'12',
                bookNum:'1',
                totalPrice:'12'
            }
        ];
        $scope.order={
            totalPrice:'24',
            totalShouldPay:'24'
        };
        //TODO F.从数据中获得用户待购买的书籍信息
        /*$http({
             method:'POST',
             url:'',
             data: ,
             headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
         }).success(function(response){
            console.log(response);
         });*/
        $scope.goPay=function(){
           window.location.href='purchase.html';
        };
    });