//当用户点击已完成付款时，显示弹出层
$('.already-payment-txt').click(function(){
	$('.check-order-mask').css('display','block');
});
//关闭弹出层
$('.close-check-order').click(function(){
	$('.check-order-mask').css('display','none');
});