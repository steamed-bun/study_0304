(function(){
	//获得用户名
	$(function(){
		$.ajax({
			type:"GET",
			url:"data/index/indexBook.json",
			dataType:"json",
			success:function(data){
				console.log("请求数据成功");
				
			},
			error:function(){
				console.log("请求数据遇到错误了");
			}
		});
	});
})();