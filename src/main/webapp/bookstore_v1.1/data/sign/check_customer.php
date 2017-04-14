<?php
	// 此处模拟顾客已存入数据库中的数据
	$userTel=$_REQUEST['tel'];
	$userPwd=$_REQUEST['pwd'];
	if($userTel=='18829289125' && $userPwd=='1234567'){
		echo 'yes';//当用户信息存在时，返回yes
	}else{
		echo 'no';//当用户信息存在时，返回no
	}
?>