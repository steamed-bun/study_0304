<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

  </head>
  
  <body>
    <center>
    	<s:form action="user-sellectUser.action" method="post" namespace="/">
			<s:textfield name="user.email" label="user.email" value="12@"></s:textfield>
    		<s:textfield name="user.userPassword" label="user.userPassword" value="123"></s:textfield>
    		<s:submit></s:submit>
    	</s:form>
		<s:form action="sel-sellectSeller.action" method="post" namespace="/">
			<s:textfield name="seller.selTel" label="seller.selTel" value="514156689@qq.com"></s:textfield>
			<s:textfield name="seller.selPassword" label="seller.selPassword" value="123asdASD"></s:textfield>
			<s:submit></s:submit>
		</s:form>

    </center>
  </body>
</html>
