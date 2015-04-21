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
      servicesBlock.css('top', 20 + contentHeight / 2 + 'px');
      servicesBlock.css('margin-top', '-' + servicesHeight / 2 + 'px');

      $.each(services, function (i, service) {
        servicesBlock.append(getService(service, true));
        var serviceClass = $('.' + service.class.split(' ')[0]);
        serviceClass.on('click', function () {
          var $this = $(this);
          getCurObj(services, 'class', $this.data('title'), function (obj) {
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