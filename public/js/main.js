$(document).ready(function(){
// arrow animate
        $("#header_section").on("click","a", function (event) {
   
            //отменяем стандартную обработку нажатия по ссылке
    
            event.preventDefault();
  
     
    
          //забираем идентификатор бока с атрибута href
    
          var id  = $(this).attr('href'),
    
          
    
          //узнаем высоту от начала страницы до блока на который ссылается якорь
    
              top = $("#"+id).offset().top;
    
          
    
          //анимируем переход на расстояние - top за 1500 мс
    
          $('body,html').animate({scrollTop: top}, 1500);
    
      });
// arrow animate





    
    });

    $(function () {
      $('#1').hover(sourceSwap, sourceSwap);
     
  });

    var sourceSwap = function () {
      var $this = $(this);
      var newSource = $this.data('alt-src');
      $this.data('alt-src', $this.attr('src'));
      $this.attr('src', newSource);
  }

  

  