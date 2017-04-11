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
     <script type="text/javascript" src="scrips/jquery-1.9.1.min.js"></script>
     <script type="text/javascript">
    	$(function(){
    		$("#delete").click(function(){
    			var bookName = $(this).next(":input").val();
    			var bookId = $(this).next(":input").next(":input").val();
    			alter(bookId);
    			var flag = confirm("确定要删除" + bookName + "的信息")
    			if(flag){
    				var $tr = $(this).parent().parent();
    				//var url = this.href;
    				$.ajax({
    					url : "book-deleteBook.action",
    					data: {"bookId" : bookId},
    					dataType : "json",
    					type : "POST",
    					success:function(data){
    						alert("success");
    						$tr.remove();
    					},
    					error: function(data){
    						alert("error");
    					}
    				})
    				/* $.post(url, args, function(data){
    					//若data的返回值为1，则删除成功，为0则失败
    					if(data == "1"){
    						alert("删除成功！")
    						
    					}else{
    						alert("删除失败！");
    					}
    				}); */
    			}
    			//取消超链接的默认行为
    			return false;
    		})
    	})
    </script> 
  </head>
  
  <body>
  	<table cellpadding="10">
			<tr>			
				<td>bookId</td>
				<td>bookName</td>
				<td>author</td>
				<td>category</td>
				<td>bookPrice</td>
				<td>quantity</td>
				<td>likes</td>
				<td>noLike</td>
				<td>publicationDate</td>
				<td>publisher</td>
				<td>summary</td>
				<td>images</td>
			</tr>
			<s:iterator value="#request.books">
				<tr>
					<td>${bookId }</td>
					<td>${bookName }</td>
					<td>${author }</td>
					<td>${category.categoryName}</td>
					<td>${bookPrice }</td>
					<td>${quantity }</td>
					<td>${likes }</td>
					<td>${noLike }</td>
					<td>${publicationDate }</td>
					<td>${publisher }</td>
					<td>${bookName }</td>
					<td>${summary }</td>
					<td>${bookImages }</td>
					<td>
						<a href="" id="delete">delete</a>
						<input type="hidden" value="${bookName }"/>
						<input type="hidden" value="${bookId }"/>
					</td>
					<td>
						<a href="book-getSelect.action?bookId=${bookId }">edit</a>
					</td>
				</tr>
			</s:iterator>
		</table>
	<a href="book-getSelect.action">添加一本书</a>
	<a href="sel-sellectSeller.action?chose=SESSION">返回主页面</a>
  </body>
</html>
