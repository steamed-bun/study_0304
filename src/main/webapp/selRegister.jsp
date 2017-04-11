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
  	<center>
  		注册<br/>
  		 
  		<s:form action="sel-addSeller.action" method="post" namespace="/">
  			<s:textfield label="昵称" name="seller.selName"></s:textfield>
  			<s:textfield label="年龄" name="seller.selAge"></s:textfield>
  			<s:textfield label="性别" name="seller.selSex"></s:textfield>
  			<s:textfield label="邮箱" name="seller.selTel"></s:textfield>
  			<s:textfield label="身份证" name="seller.selIdCard"></s:textfield>
  			<s:textfield label="密码" name="seller.selPassword"></s:textfield>
  			<s:textfield label="重复密码" value="gfdsa"></s:textfield>
			
  				<s:hidden name="selId"></s:hidden>
  				<s:hidden name="seller.shop.shopId"></s:hidden>
  			
  			<s:submit></s:submit>
  		</s:form>
	</center>
  </body>
</html>
