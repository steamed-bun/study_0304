angular.module('bookDetail',[])
   .controller('bookDetailCtrl',function($scope){
   	  /*-----与放大镜相关的开始------*/
        //当点击小图片时，大图片跟着切换
        $('.book-small-img img').hover(function(){
           var $curElem=$(this);
           var $parElem=$curElem.parent();
           var curSrc=$(this).attr('src');
           var markIndex=curSrc.lastIndexOf('.')-2;
           var newSrc=curSrc.slice(0,markIndex)+curSrc.slice(markIndex+2);
           $('.book-big-img>img').attr('src',newSrc);//改变中等图的图片
           $('.book-small-img>li').removeClass('highlight-small-img');
           $parElem.addClass('highlight-small-img');
            //每当中等图片更新后，都需要重新放大
           $(document).ready(function () {
               $(".demo-img").blowup({
                  background : "#FFF",
               });
           });
        });
        //调用放大镜插件 实现放大
   	  $(document).ready(function () {
            $(".demo-img").blowup({
              background : "#FFF",
            });
        });
   	  /*-----与放大镜相关的结束------*/

        /*----与购物车数量加减相关开始------*/
        //获得文本框对象
        var t = $(".input-num");
        //数量增加操作
        $(".add-num").click(function(){    
           t.val(parseInt(t.val())+1)
           if (parseInt(t.val())!=0){
               $('.disabled-mask').removeClass('disabled');
               $(".reduce-num").css('color','#666');
           }
        }) 
        //数量减少操作
        $(".reduce-num").click(function(){
           t.val(parseInt(t.val())-1);

           if (parseInt(t.val())==0){
               $('.disabled-mask').addClass('disabled');
               $(this).css('color','#CCC');
               console.log($(this)[0]);
           }else{
               $(this).css('color','#666');
           }
        })
   });


