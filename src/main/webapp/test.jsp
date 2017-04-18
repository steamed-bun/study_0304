<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
   
  </head>
  
  <body>
    <s:debug></s:debug>
	<a href="sel-checkCaptcha.action">点击</a>
    <form action="sel-checkCaptcha.action">
      <s:textfield name="code" label="code"></s:textfield>
      <s:submit></s:submit>
    </form>
  </body>
</html>
