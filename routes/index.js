var express = require('express')
  , router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', function (req, res, next) {
  if (req.user) {
    User.findById(req.user._id).exec(function (err, user) {
      if (err) throw err;
      if (!user) {
        next();
        return;
      }
      res.send(user);
    });
  } else {
    next();
  }
});

router.post('/services', function (req, res, next) {

  var mainSize = req.body.mainSize
    , serviceSize = req.body.serviceSize;

  var services = [
    {
      title: 'Digital стратегия',
      description: 'Мы делаем анализ вашего бизнеса, внедряем технологии, повышаем эффективность',
      icon: 'pe-7s-way',
      class: 'digital-do',
      top: '50%',
      left: '50%',
      size: mainSize + 'px',
      marginTop: '-' + mainSize / 2 + 'px',
      marginLeft: '-' + mainSize / 2 + 'px',
      paddingTop: mainSize / 5 + 'px',
      fontSize: mainSize / 10 + 'px',
      iconSize: mainSize / 3 + 'px',
      main: true
    },
    {
      title: 'Интернет маркетинг',
      description: 'Как оптимизировать затраты на интернет-маркетинг?',
      content: '<p>Как оптимизировать затраты на интернет-маркетинг?</p>',
      icon: 'pe-7s-display1',
      class: 'marketing-do',
      top: '25%',
      left: '23%',
      marginTop: '0',
      itemsClass: 'marketing-service sub-services',
      items: [
        {
          title: 'Поисковое продвижение',
          content: '<p>Поисковое продвижение</p>',
          icon: 'pe-7s-rocket',
          class: 'marketing-one do service-invert',
          top: '25%',
          left: '23%',
          marginTop: '0'
        },
        {
          title: 'Рекламные кампании',
          content: '<p>Рекламные кампании</p>',
          icon: 'pe-7s-graph',
          class: 'marketing-two do service-invert',
          top: '2%',
          left: '50%',
          marginTop: '0'
        },
        {
          title: 'Оптимизация конверсий',
          content: '<p>Оптимизация конверсий</p>',
          icon: 'pe-7s-filter',
          class: 'marketing-three do service-invert',
          top: '25%',
          left: '77%',
          marginTop: '0'
        }
      ]
    },
    {
      title: 'Веб продакшн',
      description: 'Текст про веб-продакшн',
      content: '<p><strong>Лэндинг</strong> или посадочная страница (от англ. landing page), также именуемая как «целевая страница», «страница приземления» или «страница захвата», — это веб-страница, на которую целевой посетитель попадает по рекламе или другой ссылке и которая максимально упрощает совершение им необходимого действия — оформления заказа, регистрации на сайте, подписки на рассылку.</p>',
      icon: 'pe-7s-browser',
      class: 'web-do',
      top: '2%',
      left: '50%',
      marginTop: '0',
      itemsClass: 'web-service sub-services',
      items: [
        {
          title: 'Разработка лендингов',
          icon: 'pe-7s-rocket',
          class: 'web-one do service-invert',
          top: '25%',
          left: '23%',
          marginTop: '0'
        },
        {
          title: 'Создание сайтов',
          icon: 'pe-7s-graph',
          class: 'web-two do service-invert',
          top: '2%',
          left: '50%',
          marginTop: '0'
        },
        {
          title: 'Интернет-магазины',
          icon: 'pe-7s-filter',
          class: 'web-three do service-invert',
          top: '25%',
          left: '77%',
          marginTop: '0'
        }
      ]
    },
    {
      title: 'Графический дизайн',
      description: 'Текст про дизайн',
      content: '<p>Текст про дизайн</p>',
      icon: 'pe-7s-pen',
      class: 'design-do',
      top: '25%',
      left: '77%',
      marginTop: '0',
      itemsClass: 'design-service sub-services',
      items: [
        {
          title: 'Дизайн сайта',
          icon: 'pe-7s-rocket',
          class: 'design-one do service-invert',
          top: '25%',
          left: '23%',
          marginTop: '0'
        },
        {
          title: 'Печатная продукция',
          icon: 'pe-7s-graph',
          class: 'design-two do service-invert',
          top: '2%',
          left: '50%',
          marginTop: '0'
        },
        {
          title: '3D модели',
          icon: 'pe-7s-filter',
          class: 'design-three do service-invert',
          top: '25%',
          left: '77%',
          marginTop: '0'
        }
      ]
    },
    {
      title: 'Новые клиенты',
      description: 'Текст про клиентов',
      content: '<p>Текст про клиентов</p>',
      icon: 'pe-7s-users',
      class: 'client-do service-invert',
      top: '75%',
      left: '23%',
      marginTop: '-' + serviceSize + 'px',
      itemsClass: 'client-service sub-services',
      items: []
    },
    {
      title: 'Рост продаж',
      description: 'Текст про рост продаж',
      content: '<p>Текст про рост продаж</p>',
      icon: 'pe-7s-graph1',
      class: 'sell-do service-invert',
      top: '98%',
      left: '50%',
      marginTop: '-' + serviceSize + 'px',
      itemsClass: 'sell-service sub-services',
      items: []
    },
    {
      title: 'Повышение лояльности',
      description: 'Текст про лояльность',
      content: '<p>Текст про лояльность</p>',
      icon: 'pe-7s-smile',
      class: 'loyal-do service-invert',
      top: '75%',
      left: '77%',
      marginTop: '-' + serviceSize + 'px',
      itemsClass: 'loyal-service sub-services',
      items: []
    }
  ];

  res.send(services);
});

router.get('/login', function (req, res, next) {
  if (!req.user) {
    if (req.xhr) {
      res.render('auth/login_modal');
    } else {
      res.render('auth/login');
    }
  } else {
    res.redirect('/');
  }
});

router.get('/register', function (req, res, next) {
  if (!req.user) {
    if (req.xhr) {
      res.render('auth/login_modal');
    } else {
      res.render('auth/register');
    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
