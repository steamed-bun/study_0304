angular.module('adminLogin',[])
    .controller('adminCtrl',function($scope,$http){
        $scope.manager={
            pwd:'',
            repwd:''
        };
        //首次登陆成功后，要修改密码
        $scope.goAdmin=function(){
            console.log($scope.manager);
            var locationHref=window.location.href;
            locationHref=locationHref.slice(locationHref.indexOf('?')+1);
            var locationHref=locationHref.split('=');
            var manageId=locationHref[1];
            if($scope.manager.pwd &&  $scope.manager.repwd){
                //当用户输入信息才登陆
                var pwd=$scope.manager.pwd;
                var repwd=$scope.manager.repwd;
                if(pwd==repwd){
                    //当密码相同时才能提交修改
                    var postData='manager.managerId='+manageId+'&manager.password='+pwd;
                    $http({
                        method:'POST',
                        url:'manager-updatePassword.action',
                        data: postData,
                        headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                    }).success(function(response){
                        console.log(response); //在此处查看返回的数据是否正确
                        if(response.status=='yes'){
                            //页面跳转到登录成功页
                            window.location.href='admin.html';
                        }
                    });
                }else{
                    $('.login-hint').html('两次密码不一致！');
                }
            }else{
                //给出提示信息
                $('.login-hint').html('请输入密码！');
            }
        };
    });