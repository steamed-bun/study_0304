angular.module('bookList',[])
	.controller('bookListCtrl',function($scope,$http){
		//TODO  页面一加载显示搜索到的书籍信息
		/*$http({
			method:'POST',
			url:'book-getBookForSearch.action',
			data: 'book.bookName=测试&pageNum=1&totalPageNo=0',
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } //当POST请求时，必须添加的
		}).success(function(response){
			console.log(response);
		});*/

		/*---------调用分页页码插件，实现分页功能开始-------*/
	    $('.page-area').cypager({
	    	pg_size:25,
	    	pg_nav_count:8,
	    	pg_total_count:300,
	    	pg_prev_name:'前一页',
	    	pg_next_name:'后一页',
	    	pg_call_fun:function(count){
	    		//此处应到数据库中拿数据
	    		console.log('当前要请求第'+count+'页');
          		//TODO 根据商家点击不同的数字显示不同的内容
	    	}
	    });
	    /*---------调用分页页码插件，实现分页功能结束-------*/
	});