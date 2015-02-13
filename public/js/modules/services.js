(function ($, window, document) {

  $(function () {

    blockPosition();

    function blockPosition() {
      var content = $('.content-holder')
        , contentHeight = content.height()
        , services = $('.services-do')
        , servicesHeight = services.outerHeight();

      services.css('top', 20 + contentHeight / 2 + 'px');
      services.css('margin-top', '-' + servicesHeight / 2 + 'px');

      window.onresize = function () {
        blockPosition();
      };
    }

    var doDigital = $('.digital-do')
      , doMarketing = $('.marketing-do')
      , doWeb = $('.web-do')
      , doDesign = $('.design-do')
      , doClient = $('.client-do')
      , doSell = $('.sell-do')
      , doLoyal = $('.loyal-do');

    doMarketing.on('click', function () {
      changePosition($(this), {top: '30%', left: '23%'}, function (toggle) {
        if (toggle) {
          $('.services-title p').text('как оптимизировать затраты на интернет-маркетинг?');
          $('.marketing-service').fadeIn();
        }
        else {
          $('.services-title p').text('мы делаем анализ вашего бизнеса, внедряем технологии, повышаем эффективность');
          $('.marketing-service').fadeOut();
        }
      });
    });

    doWeb.on('click', function () {
      changePosition($(this), {top: '0', left: '50%'});
    });

    doDesign.on('click', function () {
      changePosition($(this), {top: '30%', left: '77%'});
    });

    doClient.on('click', function () {
      changePosition($(this), {top: '100%', left: '50%'});
    });

    doSell.on('click', function () {
      changePosition($(this), {top: '70%', left: '23%'});
    });

    doLoyal.on('click', function () {
      changePosition($(this), {top: '70%', left: '77%'});
    });

    function changePosition(element, defaultPosition, cb) {
      if (element.hasClass('active')) {
        element.removeClass('active').animate(defaultPosition, function () {
          element.removeClass('do-big');
          element.siblings().removeClass('bounceOutRight').addClass('bounceInRight');
          cb(false);
        });
      } else {
        element.addClass('active').animate({left: '50%', top: '50%'}, function () {
          element.addClass('do-big');
          cb(true);
        });
        element.siblings().removeClass('bounceInRight').addClass('bounceOutRight');
      }
    }

  });

}(jQuery, window, document));