<?php
	// 此处模拟商家已存入数据库中的数据
	$userTel=$_REQUEST['tel'];
	$userPwd=$_REQUEST['pwd'];
	if($userTel=='18829292230' && $userPwd=='111111'){
		echo 'yes';//当用户信息存在时，返回yes
	}else{
		echo 'no';//当用户信息存在时，返回no
	}
?>