<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
   	<script type="text/javascript" src="script/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="script/ajaxfileupload.js"></script>
    <script type="text/javascript">
    $(function(){
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
	})
    </script>
  </head>
  
  <body>
  	<center>
    	注册成功！ <br>
    	<br>
    	<s:form action="shop-addShop.action" method="post" namespace="/">
    		<s:textfield name="shop.shopName" label="店铺名字" value="唐唐"></s:textfield>
    		<s:textarea name="shop.notice" label="一句话描述" value="belive me"></s:textarea>
    		
    		<s:select list="#request.province" listKey="provinceId" listValue="provinceName" 
			name="shop.province.provinceId" label="省份" id="province" headerKey="" 
			headerValue="请选择.."></s:select>
			
			
			<tr>
    		<td class="tdLabel"><label class="label">市:</label></td>
   			<td>
	   			<select name="shop.city.cityId" id="city">
	    			<option value="">请选择..</option>
				</select>
			</td>
			</tr>
			<tr>
    		<td class="tdLabel"><label class="label">县/区:</label></td>
   			<td>
	   			<select name="shop.county.countyId" id="county">
	    			<option value="">请选择..</option>
				</select>
			</td>
			</tr>
			
    		<s:textfield name="shop.street" label="街道地址" value="朱雀大街" ></s:textfield>
    		<s:hidden name="shopId"></s:hidden>
    		<s:submit></s:submit>
    	</s:form>
    	
    </center>
    <s:debug></s:debug>
  </body>
</html>
