<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <script type="text/javascript" src="script/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="script/ajaxfileupload.js"></script>
    <base href="<%=basePath%>">
    <script type="text/javascript">
		$(function(){
			$("#selImage").change(function(){
		  		$.ajaxFileUpload({
					url:"upLoad-addSelImage.action",// 文件上传服务器请求Action
					secureuri:true,// 安全提交，默认为false
					fileElementId:"selImage",// 文件类型的id
					dataType:"json",// 返回值类型
					success:function(data){// 服务器响应成功
						alert("success2");
					},
					error:function(data){// 服务器响应失败
						alert("error");
					}
				})
				return false;
			});		
			$("#selWeiXin").change(function(){
		  		$.ajaxFileUpload({
					url:"upLoad-addSelWeiXin.action",// 文件上传服务器请求Action
					secureuri:true,// 安全提交，默认为false
					fileElementId:"selWeiXin",// 文件类型的id
					dataType:"json",// 返回值类型
					success:function(data){// 服务器响应成功
						alert("success2");
					},
					error:function(data){// 服务器响应失败
						alert("error");
					}
				})
				return false;
			});	
		})
	</script>
  </head>
  
  <body>
  	<center>
  		<a href="shop-delete.action">注销</a>
  		<h3>商家信息</h3><br>
  		头像:<img src="${requestScope.seller.selImage}"/><br>
    		<s:file name="photo" id="selImage"></s:file><br>
    	微信:	<img src="${requestScope.seller.selWeiXin}"/><br>
    	<s:file name="photo" id="selWeiXin"></s:file><br>
		昵称:${seller.selName }<br>
		账号:${seller.selId }<br>
		身份证号:${seller.selIdCard }<br>
		年龄:${seller.selAge }<br>
		性别:${seller.selSex }<br>
		 <a href="sel-forUpdateSeller?selId=${seller.selId }">修改SELLER</a>
		<%--<a href="sel-addSeller?selId=${seller.selId }">修改SELLER</a> --%>
		<h3>交易管理</h3><br>
		<h3>我的书屋</h3><br>
		<a href="book-getBooks.action">查看所有的书籍</a>
		<h3>店铺信息</h3><br>
		${seller.shop.shopId }<br>
		${seller.shop.shopName }<br>
		${seller.shop.notice }<br>
		${seller.shop.established }<br>
		${seller.shop.shopGrade }<br>
		${seller.shop.province.provinceName }<br>
		${seller.shop.city.cityName }<br>
		${seller.shop.county.countyName }<br>
		${seller.shop.street }<br>
		${seller.shop.shopImage }
  		<a href="shop-selectSelect.action?shopId=${seller.shop.shopId }">修改店铺</a>
  		<s:debug></s:debug>
  	</center>
  </body>
</html>
