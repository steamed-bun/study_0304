angular.module('pay',[])
	.controller('payCtrl',function($scope){
		$scope.pay={num:34.00};
		//完成订单后，页面跳转到订单详情页
		$scope.goOrderDetail=function($scope){
			window.location.href="customer_business.html#/orderMange";
		};
		//当用户点击已完成付款时，显示弹出层
		$('.already-payment-txt').click(function(){
			$('.check-order-mask').css('display','block');
		});
		//关闭弹出层
		$('.close-check-order').click(function(){
			$('.check-order-mask').css('display','none');
		});
	});