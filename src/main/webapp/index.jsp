<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <script type="text/javascript" src="script/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="script/ajaxfileupload.js"></script>
    <base href="<%=basePath%>">
    <script type="text/javascript">
		$(function(){
			$("#photo").change(function(){
	  			alert("success1");
		  		$.ajaxFileUpload({
					url:"upLoad-addSelWeiXin.action",// 文件上传服务器请求Action
					secureuri:true,// 安全提交，默认为false
					fileElementId:"photo",// 文件类型的id
					dataType:"json",// 返回值类型
					success:function(data){// 服务器响应成功
						alert(data.path);
						alert("success2");
					},
					error:function(data){// 服务器响应失败
						alert("error");
					}
				})
				return false;
			});
			$("#selImage").change(function(){
	  			alert("success1");
		  		$.ajaxFileUpload({
					url:"upLoadAction.action",// 文件上传服务器请求Action
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
			$("#province").change(function(){
				$("#city option:not(:first)").remove();
				var provinceId = $(this).val();
				if(provinceId != ""){
					alert(provinceId);
					$.ajax({
						url: "select-selectCities.action",// 文件请求Action
						type: "POST",
						data : {"provinceId" : provinceId},
						dataType: "json",// 返回值类型
						success:function(data){// 服务器响应成功
							for(var i = 0; i < data.length ; i++){
								var cityId = data[i].cityId;
								var cityName = data[i].cityName;
								$("#city").append("<option value='" + cityId  + "'>" + cityName +"</option>");
							}
						},
						error:function(data){// 服务器响应失败
							alert("error");
						}
					});
				}
			});
			$("#city").change(function(){
				$("#county option:not(:first)").remove();
				var cityId = $(this).val();
				if(cityId != ""){
					alert(cityId);
					$.ajax({
						url: "select-selectCounties.action",// 文件请求Action
						type: "POST",
						data : {"cityId" : cityId},
						dataType: "json",// 返回值类型
						success:function(data){// 服务器响应成功
							for(var i = 0; i < data.length ; i++){
								var countyId = data[i].countyId;
								var countyName = data[i].countyName;
								$("#county").append("<option value='" + countyId + "'>" + countyName +"</option>");
							}
						},
						error:function(data){// 服务器响应失败
							alert("error");
						}
					});
				}
			});
		})//user-sellectUser.action?user.email=12@&user.userPassword=123
		function getJson(){
			$.post("book-addImages.action",{"test":"1","test":"2"},function(data){
				console.log(data);
				<%--alert(${seller.selId});--%>
				<%--console.log(${seller});--%>
			})
		}
	</script>
  </head>
  
  <body>
    <center>
    	 <s:file name="selImage" id="selImage"></s:file>
   		<s:file name="photo" label="photo" id="photo"></s:file>
<%--   		<s:select list="#request.province" listKey="provinceId" listValue="provinceName"
			name="shop.province.provinceId" label="省份" id="province" headerKey="" 
			headerValue="请选择.."></s:select>
		<select id="city">
		<option value="">请选择..</option>
		</select>
		<select id="county">
			<option value="">请选择..</option>
		</select>--%>
		<a href="test.html">删书</a>
		<input type="button" value="testJson" onclick="getJson();">

   </center>
  <s:debug></s:debug>
  </body>
</html>
