angular.module('adminLogin',[])
    .controller('adminCtrl',function($scope,$http){
        $scope.manager={
            managerEmail:'',
            password:''
        };
        //首次登陆成功后，要修改密码
        $scope.goEditPwd=function(){
            console.log($scope.manager);
            if($scope.manager.managerEmail &&  $scope.manager.password){
                //当用户输入信息才登陆
                var email=$scope.manager.managerEmail;
                var pwd=$scope.manager.password;
                var postData='manager.password='+pwd+'&manager.managerEmail='+email;
                $http({
                    method:'POST',
                    url:'manager-getSellerByEmail.action',
                    data: postData,
                    headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
                }).success(function(response){
                    console.log(response); //在此处查看返回的数据是否正确
                    if(response.status=='yes'){
                        if(parseInt(response.manager.fresh)==0){
                            //首次登陆跳转到修改密码页
                            window.location.href='admin_edit_pwd.html?manageId='+response.manager.managerId;
                        }else{
                            window.location.href='admin.html';
                        }
                    }else{
                        $('.login-hint').html('用户名或密码错误！');
                    }
                });
            }else{
                //给出提示信息
                $('.login-hint').html('请输入用户名和密码！');
            }
        };
    });