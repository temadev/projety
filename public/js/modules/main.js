(function ($, window, document) {

  $(function () {

    var body = $('body');

    body.on('hidden.bs.modal', '.modal', function () {
      $(this).removeData('bs.modal');
    });

    $('.logout').on('click', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/auth/logout',
        success: function () {
          window.location.href = '/';
        }
      });
    });

    /* WOW plugin triggers animation.css on scroll
     ================================================== */
    var wow = new WOW();


    /* Loader - Remove it to disable loader
     ================================================== */
    body.queryLoader2({
      onComplete: function () {
        wow.init();
      },
      backgroundColor: '#222',
      overlayId: 'overlay',
      barHeight: 2,
      percentage: true,
      minimumTime: 1000
    });


    /* Responsive Navigation
     ================================================== */

    function mobile_menu_dim() {
      var nav_width = $(window).width()
        , nav_height = $(window).outerHeight();
      $("#navbar").width(nav_width).height(nav_height - 50);
    }

    $("#navbar").hide();
    mobile_menu_dim();

    $('#menu-toggle-wrapper').on('click', function (event) {
      $(this).toggleClass('open');
      $('#navbar').slideToggle(200, function () {
        mobile_menu_dim();
      });
      event.preventDefault();
    });

    $('#navbar li a').on('click', function (event) {
      $('#menu-toggle-wrapper').toggleClass('open');
      $('#navbar').slideToggle(200);
    });

    $(window).resize(function () {
      mobile_menu_dim();
    });


    /* FullPage Scroll
     ================================================== */

    $('.page_sections').fullpage({
      menu: '#navbar ul',
      anchors: ['hero', 'services', 'portfolio', 'features', 'contacts'],
      slidesNavPosition: 'top',
      scrollBar: true,
      sectionSelector: 'section',
      slideSelector: '.slide'
    });

  });

}(jQuery, window, document));
