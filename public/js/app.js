(function ($, window, document) {
  $(function () {

    if (!$.fn.bootstrapValidator) return;

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    $('#captchaOperation').html([randomNumber(1, 50), '+', randomNumber(1, 10), '='].join(' '));

    $('#registerForm')
      .bootstrapValidator({
        container: 'tooltip',
        feedbackIcons: {
          valid: 'fa fa-check',
          invalid: 'fa fa-times',
          validating: 'fa fa-refresh'
        },
        live: 'submitted',
        fields: {
          email: {
            validators: {
              notEmpty: {
                message: 'Please enter a valid email address.'
              },
              emailAddress: {
                message: 'Please enter a valid email address.'
              },
              remote: {
                type: 'POST',
                url: '/auth/checkRegister',
                data: function (validator) {
                  return {
                    email: validator.getFieldElements('email').val()
                  };
                }
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'Passwords must be at least 6 characters.'
              },
              stringLength: {
                min: 6,
                max: 20,
                message: 'Passwords must be at least 6 characters.'
              }
            }
          },
          lastname: {
            validators: {
              notEmpty: {
                message: 'Please enter your first name.'
              }
            }
          },
          firstname: {
            validators: {
              notEmpty: {
                message: 'Please enter your last name.'
              }
            }
          },
          phone: {
            validators: {
              notEmpty: {
                message: 'Please enter your phone number.'
              }
            }
          },
          captcha: {
            validators: {
              callback: {
                message: 'Wrong answer.',
                callback: function (value, validator) {
                  var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
                  return value == sum;
                }
              }
            }
          }
        }
      })
      .on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();

        var $form = $(e.target),
          validator = $form.data('bootstrapValidator'),
          submitButton = validator.getSubmitButton();

        $.post('/auth/register', $form.serialize(), function (result) {
          if (result.valid == true || result.valid == 'true') {
            window.location.href = '/';
          }
        }, 'json');
      });

    $('#loginForm').bootstrapValidator({
      container: 'tooltip',
      feedbackIcons: {
        valid: 'fa fa-check',
        invalid: 'fa fa-times',
        validating: 'fa fa-refresh'
      },
      live: 'submitted',
      fields: {
        loginEmail: {
          validators: {
            notEmpty: {
              message: 'Enter your email to sign in.'
            },
            emailAddress: {
              message: 'Enter your email to sign in.'
            },
            remote: {
              type: 'POST',
              url: '/auth/getUser',
              data: function (validator) {
                return {
                  loginEmail: validator.getFieldElements('loginEmail').val()
                };
              }
            }
          }
        },
        loginPassword: {
          validators: {
            notEmpty: {
              message: 'Enter your password to sign in.'
            },
            remote: {
              type: 'POST',
              url: '/auth/login',
              data: function (validator) {
                return {
                  loginEmail: validator.getFieldElements('loginEmail').val(),
                  loginPassword: validator.getFieldElements('loginPassword').val()
                };
              }
            }
          }
        }
      }
    })
      .on('success.form.bv', function (e) {

        e.preventDefault();

        var $form = $(e.target),
          validator = $form.data('bootstrapValidator'),
          submitButton = validator.getSubmitButton();

        $.post('/auth/login', $form.serialize(), function (result) {
          if (result.valid == true || result.valid == 'true') {
            window.location.href = '/';
          }
        }, 'json');
      });

  });
}(jQuery, window, document));
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