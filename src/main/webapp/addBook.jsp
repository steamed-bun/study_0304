<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
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
    <center>
		<s:form action="book-addBook.action" method="post" namespace="/">
			<s:textfield label="书名" name="book.bookName" value="皮皮虾"></s:textfield>
			<s:textfield label="出版日期" name="book.publicationDate" value="2017"></s:textfield>
			<s:textfield label="作者" name="book.author" value="PDD"></s:textfield>
			<s:textfield label="出版商" name="book.publisher" value="b站"></s:textfield>
			<s:textfield label="价格" name="book.bookPrice" value="33"></s:textfield>
			<s:textfield label="数量" name="book.quantity" value="20"></s:textfield>
			
			<s:select list="#request.categories" label="类型" listKey="categoryId" 
			listValue="categoryName" name="book.category.categoryId"></s:select>
			
			<s:textfield label="简介" name="book.summary" value="开心开心"></s:textfield>
			<s:hidden name="bookId"></s:hidden>
			<s:submit></s:submit>
		</s:form>
	</center>
  </body>
</html>
