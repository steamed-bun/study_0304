angular.module('submitOrder',[])
    .controller('selectAddrCtrl',function($scope,$http){
        $scope.userAddr={
            userName:'嘿嘿嘿 ',
            tel:'18769289125',
            addrDetail:'陕西省西安市长安区西安邮电大学南校区西区'
        };
        //TODO   从数据库中获得买家保存的地址信息
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
        };
        //给切换地址按钮添加点击事件
        $scope.changeMyAddr=function(){
            $('.addr-as-default').css('display','block');
        };
        //给新建地址按钮添加事件
        $scope.addNewAddr=function(){
            $('.select-addr-box').css('display','none');
            $('.edit-addr-box').css('display','block');
        };
    })
    .controller('editAddrCtrl',function($scope,$http){

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
        //TODO 页面一加载得到该买家的所有地址信息
        /*$http({
             method:'POST',
             url:'',
             data: ,
             headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
         }).success(function(response){
            console.log(response);
         });*/

        //TODO 给选择默认地址的确认按钮添加事件
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

    });