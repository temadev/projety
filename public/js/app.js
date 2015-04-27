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
      anchors: ['hero', 'services', 'portfolio-1', 'portfolio-2', 'portfolio-3', 'features', 'contacts'],
      slidesNavPosition: 'top',
      scrollBar: true,
      sectionSelector: 'section',
      slideSelector: '.slide',
      verticalCentered: false
    });

  });

}(jQuery, window, document));

(function ($, window, document) {
  $(function () {

    var content = $('.content-holder')
      , contentHeight = content.height()
      , portfolioBlock = $('.portfolio-do')
      , sectionServices = $('.section-portfolio')
      , portfolioHeight = sectionServices.outerHeight() * .75;

    var portfolio = [
      {
        title: 'ГТС',
        description: '<a href="http://gts76.ru">ГлобалТехноСтрой</a> — компания занимается арендой спецтехники'
      },
      {
        title: 'Выбери.by',
        description: '<a href="http://vibery.by">Выбери.by</a> — создание информационного портала о банках Беларуси'
      },
      {
        title: 'Росконкурс',
        description: '<a href="http://cvsi.ru">Росконкурс</a> — создание и сопровождение портала Всероссийских конкурсов'
      }
    ];

    portfolioInit();
    window.onresize = function () {
      portfolioInit();
    };

    function portfolioInit() {

      sectionServices.each(function (i) {
        portfolioBlock = $(this).find('.portfolio-do');
        portfolioBlock.css('height', portfolioHeight + 'px');
        portfolioBlock.css('top', contentHeight*0.05 + contentHeight / 2 + 'px');
        portfolioBlock.css('margin-top', '-' + portfolioHeight / 2 + 'px');
        portfolioBlock.append('<div class="portfolio-title"><p>' + portfolio[i].description + '</p></div>');
        $('.portfolio-title').css('top', '-' + contentHeight*0.075 + 'px');

        var portfolioDescription = portfolioBlock.find('.project-description')
          , descriptionHeight = portfolioDescription.outerHeight();

        portfolioDescription.css('margin-top', '-' + (descriptionHeight/2 + contentHeight*0.05) + 'px');
        portfolioDescription.css('top', '50%');
      });

    }

  });
}(jQuery, window, document));
(function ($, window, document) {
  $(function () {

    var content = $('.content-holder')
      , contentHeight = content.height()
      , servicesBlock = $('.services-do')
      , sectionServices = $('.section-services')
      , servicesHeight = sectionServices.outerHeight() * .75
      , serviceSize = servicesHeight * .18
      , mainSize = servicesHeight * .28;

    $.ajax({
      type: 'post',
      url: '/services',
      data: {
        mainSize: mainSize,
        serviceSize: serviceSize
      },
      success: function (services) {
        servicesInit(services);
        window.onresize = function () {
          servicesInit(services);
        };
      }
    });

    function servicesInit(services) {

      servicesBlock.css('height', servicesHeight + 'px');
      servicesBlock.css('top', contentHeight * 0.05 + contentHeight / 2 + 'px');
      servicesBlock.css('margin-top', '-' + servicesHeight / 2 + 'px');
      servicesBlock.append('<div class="services-title"><p>' + services[0].description + '</p></div>');
      $('.services-title').css('top', '-' + contentHeight * 0.075 + 'px');

      $.each(services, function (i, service) {
        servicesBlock.append(getService(service, true));
        var serviceClass = $('.' + service.class.split(' ')[0]);
        serviceClass.on('click', function () {
          var $this = $(this);
          getCurObj(services, 'class', $this.data('title'), function (obj) {
            if (!obj.main) {
              var itemsClass = '.' + obj.itemsClass.split(' ')[0];
              changePosition(services, $this, function (toggle) {
                if (toggle) {
                  $('.services-title p').text(obj.description);
                  $('.services-description').html(obj.content);
                  servicesBlock.find(itemsClass).fadeIn();
                }
                else {
                  servicesBlock.find(itemsClass).fadeOut();
                }
              });
              $.each(obj.items, function (i, item) {
                var itemClass = $('.' + item.class.split(' ')[0])
                  , itemDescription = $('.services-description');
                itemClass.on('click', function () {
                  var $this = $(this);
                  getCurObj(obj.items, 'class', $this.data('title'), function (e) {
                    if (e.content) {
                      if (itemDescription.html() !== e.content) {
                        itemDescription.html(e.content);
                      }
                      else {
                        itemDescription.html(obj.content);
                      }
                    }
                  });
                })
              });
            }
          });
        });
      });
    }

    function changePosition(services, element, cb) {
      if (element.hasClass('active')) {

        getCurObj(services, 'class', element.data('title'), function (obj) {
          var size = obj.size ? obj.size : serviceSize + 'px'
            , marginLeft = obj.marginLeft ? obj.marginLeft : '-' + serviceSize / 2 + 'px'
            , paddingTop = obj.paddingTop ? obj.paddingTop : serviceSize / 5 + 'px'
            , fontSize = obj.fontSize ? obj.fontSize : serviceSize / 10 + 'px'
            , iconSize = obj.iconSize ? obj.iconSize : serviceSize / 3 + 'px';

          $('.services-title p').text(services[0].description);
          element.removeClass('active').animate({top: obj.top, left: obj.left}, function () {
            element.css({'width': size});
            element.css({'height': size});
            element.css({'margin-top': obj.marginTop});
            element.css({'margin-left': marginLeft});
            element.css({'padding-top': paddingTop});
            element.find('strong').css({'font-size': fontSize});
            element.find('.icon i').css({'font-size': iconSize});
            element.siblings().removeClass('bounceOutRight').addClass('bounceInRight');
          });
        });

        if (cb && typeof(cb) === "function") {
          cb();
        }
      } else {
        element.addClass('active').animate({left: '50%', top: '50%'}, function () {

          element.css({'width': mainSize + 'px'});
          element.css({'height': mainSize + 'px'});
          element.css({'margin-top': '-' + mainSize / 2 + 'px'});
          element.css({'margin-left': '-' + mainSize / 2 + 'px'});
          element.css({'padding-top': mainSize / 5 + 'px'});
          element.find('strong').css({'font-size': mainSize / 10 + 'px'});
          element.find('.icon i').css({'font-size': mainSize / 3 + 'px'});

          if (cb && typeof(cb) === "function") {
            cb(true);
          }
        });
        element.siblings().removeClass('bounceInRight').addClass('bounceOutRight');
      }
    }

    function getService(service, animation) {
      var title = service.title.toUpperCase().replace(/ /g, '<br>')
        , size = service.size ? service.size : serviceSize + 'px'
        , marginLeft = service.marginLeft ? service.marginLeft : '-' + serviceSize / 2 + 'px'
        , paddingTop = service.paddingTop ? service.paddingTop : serviceSize / 5 + 'px'
        , fontSize = service.fontSize ? service.fontSize : serviceSize / 10 + 'px'
        , iconSize = service.iconSize ? service.iconSize : serviceSize / 3 + 'px'
        , animationClass = animation ? 'do wow bounceIn ' : '';
      var newObj = '<div style="top: ' + service.top + '; left: ' + service.left + '; width: ' + size + '; height: ' + size + '; margin-top: ' + service.marginTop + '; margin-left: ' + marginLeft + '; padding-top: ' + paddingTop + ';" class="' + animationClass + service.class + '" data-title="' + service.class + '">' +
        '<span class="icon"><i style="font-size: ' + iconSize + '" class="' + service.icon + '"></i></span>' +
        '<strong style="font-size: ' + fontSize + '">' + title + '</strong>' +
        '</div>';

      if (service.items && service.items.length) {
        newObj += '<div class="' + service.itemsClass + '">';
        $.each(service.items, function (i, serv) {
          newObj += getService(serv);
        });
        newObj += '<div class="services-description"></div>';
        newObj += '</div>';
      }

      return newObj;
    }

    function getCurObj(givenArray, givenKey, givenValue, cb) {
      $.each(givenArray, function (index, obj) {
        $.each(obj, function (key, value) {
          if (key == givenKey && value == givenValue) {
            if (cb && typeof(cb) === "function") {
              return cb(obj);
            }
          }
        });
      });
    }

  });
}(jQuery, window, document));