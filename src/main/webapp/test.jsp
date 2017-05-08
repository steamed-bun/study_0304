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
    <script type="text/javascript" src="script/jquery-1.7.2.min.js"></script>
    <script type="text/javascript">
      function getJson(){
        $.post("book-getBooks.action",{},function(data){
          console.log(data);
          console.log(${books});
        })
      }
      function getJson(){
        var form = new FormData(document.getElementById("tf"));
//             var req = new XMLHttpRequest();
//             req.open("post", "${pageContext.request.contextPath}/public/testupload", false);
//             req.send(form);
        $.ajax({
          url:"upLoad-saveRecommend.action",
          type:"post",
          data:form,
          processData:false,
          contentType:false,
          success:function(data){
            console.log(data);
          },
          error:function(e){
            alert("错误！！");
            window.clearInterval(timer);
          }
        });
      }
    </script>
  </head>
  
  <body>

	<a href="sel-checkCaptcha.action">点击</a>
    <%--<form action="sel-checkCaptcha.action">--%>
      <%--<s:textfield name="code" label="code"></s:textfield>--%>
      <%--<s:submit></s:submit>--%>
    <%--</form>--%>
    <input type="button" value="getBooks" onclick="getJson();">
    <s:form id="tf" namespace="/" enctype="multipart/form-data">
      <s:file name="images"></s:file>
      <s:file name="images"></s:file>
      <s:hidden name="recommend" value="2"></s:hidden>
    </s:form>
    <input type="button" value="testJson" onclick="getJson();">
  </body>
</html>
