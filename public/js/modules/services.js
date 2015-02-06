(function ($, window, document) {

  $(function () {

    blockPosition();

    function blockPosition() {
      var content = $('.content-holder')
        , contentHeight = content.height()
        , services = $('.services-do')
        , servicesHeight = services.outerHeight();

      services.css('top', contentHeight / 2 + 'px');
      services.css('margin-top', '-' + servicesHeight / 2 + 'px');

      var doDigital = $('.digital-do')
        , doMarketing = $('.marketing-do')
        , doWeb = $('.web-do')
        , doDesign = $('.design-do')
        , doSell = $('.sell-do')
        , doClient = $('.client-do')
        , doLoyal = $('.loyal-do');

      window.onresize = function() {
        blockPosition();
      };
    }

  });

}(jQuery, window, document));