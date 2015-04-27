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