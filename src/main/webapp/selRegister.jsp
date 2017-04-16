<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  	<script type="text/javascript" src="script/jquery-1.7.2.min.js"></script>
    <base href="<%=basePath%>">
    <script type="text/javascript">
		$(function(){
		})
	</script>
  </head>
  
  <body>
  private Integer userId;
  private String userName;
  private String userPassword;
  private int userAge;
  private String userWeiXin;
  private String userImage;
  private String userSex;
  private String userIdCard;
  private String email;
  	<center>
  		注册<br/>
  		<s:form action="user-addUser.action" method="post" namespace="/">
  			<s:textfield label="昵称" name="user.userName"></s:textfield>
  			<s:textfield label="年龄" name="user.userAge"></s:textfield>
  			<s:textfield label="性别" name="user.userSex"></s:textfield>
  			<s:textfield label="密码" name="user.userPassword"></s:textfield>
  				<%--<s:hidden name="userId"></s:hidden>--%>
			<s:textfield abel="Id" name="userId" value="29"></s:textfield>
  			<s:submit></s:submit>
  		</s:form>
	</center>
  </body>
</html>
