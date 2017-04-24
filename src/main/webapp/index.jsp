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
		$(function() {
            $("#selWeixin").change(function () {
                console.log("selWeiXin IN");
                $.ajaxFileUpload({
                    url: "upLoad-addSelWeiXin.action",// 文件上传服务器请求Action
                    secureuri: true,// 安全提交，默认为false
                    fileElementId: "selWeixin",// 文件类型的id
                    dataType: "json",// 返回值类型
                    success: function (data) {// 服务器响应成功
                        console.log("selWeiXin ajaxFileUpload back");
                        console.log(data);
                    },
                    error: function (data) {// 服务器响应失败
                        alert("error");
                    }
                })
                return false;
            });
            $("#selImage").change(function () {
                console.log("selImage IN");
                $.ajaxFileUpload({
                    url: "upLoad-addSelImage.action",// 文件上传服务器请求Action
                    secureuri: true,// 安全提交，默认为false
                    fileElementId: "selImage",// 文件类型的id
                    dataType: "json",// 返回值类型
                    success: function (data) {// 服务器响应成功
                        console.log("selImage ajaxFileUpload back");
                        console.log(data);
                    },
                    error: function (data) {// 服务器响应失败
                        alert("error");
                    }
                })
                return false;
            });
        })
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
		<s:file name="selWeixin" label="selWeiXin" id="selWeixin"></s:file>
		<br>
    	<s:file name="selImage" label="selImage" id="selImage"></s:file>
		<br>

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
