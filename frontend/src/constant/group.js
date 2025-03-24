import {
  caseCatalogPic1,
  caseCatalogPic2,
  caseCatalogPic3,
  caseCatalogPic4,
  caseCatalogPic5,
  caseCatalogPic6,
  caseCatalogPic7,
  caseCatalogPic8,
  caseImg2,
  caseImg3,
  caseImg4,
  caseImg5,
  circleHeroImg,
  creationIcon,
  event1,
  event2,
  event3,
  event4,
  event5,
  event6,
  heroBgImg,
  heroLampImg,
  light1,
  light2,
  light3,
  lightHeroImg,
  miniClock,
  miniMail,
  miniPhone,
  miniTelegram,
  pending1,
  pending2,
  portfolio1,
  portfolio2,
  portfolio3,
  portfolio4,
  portfolio5,
  portfolio6,
  portfolio7,
  portfolio8,
  portfolio9,
  publication1,
  publication2,
  publication3,
  publication4,
  publication5,
  publication6,
  Savatar1,
  secondHeroBg,
  smallCardVideo,
  smallDownload,
  sound1,
  sound2,
  sound3,
  soundHeroImg,
  stageHeroImg,
  Svideo1,
  Svideo10,
  Svideo2,
  Svideo9,
  SwiperImg1,
  SwiperImg2,
  textBlog,
  userAvatar1,
  userAvatar2,
  userAvatar3,
  video1,
  video2,
  video3,
  videoHeroImg,
} from "../assets";

const adminDirectoryInfo = [
  {
    firstName: "Иван",
    lastName: "Иванов",
    email: "ivanov@zavodshow.ru",
    papssword: "",
    permission: ["суперадминистратор"],
  },
  {
    firstName: "Петр",
    lastName: "Петров",
    email: "petrov@zavodshow.ru",
    papssword: "",
    permission: ["редактировать", "добавлять", "удалять"],
  },
  {
    firstName: "Федор",
    lastName: "Федоров",
    email: "fedorov@zavodshow.ru",
    papssword: "",
    permission: ["редактировать", "добавлять"],
  },
  {
    firstName: "Николай",
    lastName: "Николаев",
    email: "nikolayev@zavodshow.ru",
    papssword: "",
    permission: ["добавлять"],
  },
  {
    firstName: "Максим",
    lastName: "Максимов",
    email: "maksimov@zavodshow.ru",
    papssword: "",
    permission: ["добавлять"],
  },
  {
    firstName: "Репетиционная",
    lastName: "база",
    email: "pепетиционная@zavodshow.ru",
    papssword: "",
    permission: ["добавлять"],
  },
];

const menuItemsData = [
  {
    title: "КОМАНДА",
    url: "/team",
  },
  {
    title: "УСЛУГИ",
    submenu: [
      {
        title: "ТЕХНИЧЕСКИЕ УСЛУГИ",
        submenu: [
          { title: "Свет", url: "/technical/light" },
          { title: "Звук", url: "/technical/sound" },
          { title: "Видео", url: "/technical/videopage" },
          { title: "Одежда сцены и линолеум", url: "/technical/stageclothes" },
        ],
      },
      {
        title: "ФИРМЕННЫЕ УСЛУГИ",
        submenu: [
          { title: "Разработка шоу", url: "/services/showdevelopment" },
          { title: "3D-визуализация", url: "/services/visualization" },
          { title: "База для репетиций", url: "/services/rehearsal" },
        ],
      },
      {
        title: "ПРОДАКШН",
        submenu: [
          { title: "События", url: "/production/event" },
          { title: "Концерты и туры", url: "/production/tourconcert" },
        ],
      },
    ],
  },
  { title: "КЕЙСЫ", url: "/cases" },
  { title: "ПЛОЩАДКИ", url: "/sites" },
  // { title: "ОБОРУДОВАНИЕ", url: "/equipments" },
  { title: "КОНТАКТЫ", url: "/contact" },
];

const footerTopLink = [
  { title: "КОМАНДА", url: "/team" },
  { title: "КЕЙСЫ", url: "/cases" },
  { title: "ПЛОЩАДКИ", url: "/sites" },
  // { title: "ОБОРУДОВАНИЕ", url: "/equipments" },
  { title: "КОНТАКТЫ", url: "/contact" },
];

const swiperData = [
  {
    type: "video",
    name: "Имя Фамилия",
    image: Svideo1,
    content: "video",
  },
  {
    type: "video",
    name: "Имя Фамилия",
    image: Svideo2,
    content: "video",
  },
  {
    type: "text",
    name: "Имя Фамилия",
    image: Savatar1,
    content:
      "Lörem ipsum kaliga iskapet makrod gigaktiga olåss. Dinyns bins megasam hundvissla fast reavis. Stenohydat stupstockspolitik inte dirade men koscheria. Restdejting desk med div även om pong, viras. Ten ultraren sadons möbelhund ningen.  Lörem ipsum kaliga iskapet makrod gigaktiga olåss. Dinyns bins megasam  Lörem ipsum kaliga iskapet makrod gigaktiga olåss. Dinyns bins megasam hundvissla fast reavis. Stenohydat stupstockspolitik inte dirade men koscheria. Restdejting desk med div även om pong, viras. Ten ultraren sadons möbelhund ningen.  Lörem ipsum kaliga iskapet makrod gigaktiga olåss. Dinyns bins megasam Lörem ipsum kaliga iskapet makrod gigaktiga olåss. Dinyns bins megasam hundvissla fast reavis. Stenohydat  ",
  },
  {
    type: "video",
    name: "Имя Фамилия",
    image: Svideo1,
    content: "video",
  },
  {
    type: "video",
    name: "Имя Фамилия",
    image: Svideo1,
    content: "video",
  },
  {
    type: "text",
    name: "Имя Фамилия",
    image: Savatar1,
    content:
      "Lörem ipsum kaliga iskapet makrod gigaktiga olåss. Dinyns bins megasam hundvissla fast reavis. Stenohydat stupstockspolitik inte dirade men koscheria. Restdejting desk med div även om pong, viras. Ten ultraren sadons möbelhund ningen.  Lörem ipsum kaliga iskapet makrod gigaktiga olåss. Dinyns bins megasam  Lörem ipsum kaliga iskapet makrod gigaktiga olåss. Dinyns bins megasam hundvissla fast reavis. Stenohydat stupstockspolitik inte dirade men koscheria. Restdejting desk med div även om pong, viras. Ten ultraren sadons möbelhund ningen.  Lörem ipsum kaliga iskapet makrod gigaktiga olåss. Dinyns bins megasam Lörem ipsum kaliga iskapet makrod gigaktiga olåss. Dinyns bins megasam hundvissla fast reavis. Stenohydat  ",
  },
];

const gallery = [
  { img: portfolio1, top: 0, width: 463 },
  { img: portfolio2, top: 212, width: 360 },
  { img: portfolio3, width: 259, top: 38 },
  { img: portfolio4, width: 359, top: 27 },
  { img: portfolio5, width: 360, top: 136 },
  { img: portfolio6, width: 400, top: 0 },
  { img: portfolio7, width: 260, top: 212 },
  { img: portfolio8, width: 260, top: 145 },
  { img: portfolio9, width: 660, top: 249 },
];

const gallery1 = [
  {
    img: portfolio1,
    top: 0,
    width: "clamp(158px, 40vw, 463px)",
    height: "100%",
  },
  {
    img: portfolio2,
    top: "clamp(27px,10vw,115px)",
    width: "clamp(125px, 30vw, 360px)",
    height: "100%",
  },
  { img: portfolio3, top: 38, width: "", height: "" },
  { img: portfolio4, top: 27, width: "", height: "" },
  { img: portfolio5, top: 136, width: "", height: "" },
  { img: portfolio6, top: 0, width: "", height: "" },
  { img: portfolio7, top: 212, width: "", height: "" },
  { img: portfolio8, top: 145, width: "", height: "" },
  { img: portfolio9, top: 249, width: "", height: "" },
];

const pendingCardInfo = [
  {
    img: pending2,
    title: "3D-визуализация",
    description:
      "Смоделируем несколько вариантов оформления сцены и выберем наиболее подходящий под требования",
    url: "/services/visualization",
  },
  {
    img: pending1,
    title: "Репетиционная база",
    description:
      "Возможность проверки идеи мероприятия в реалистичных условиях вместе с репетициями артистов",
    url: "/services/rehearsal",
  },
];

const publicationCardInfo = [
  {
    img: publication1,
    viewNumber: 2300,
    title: "1930 Moscow",
    description: "Россия, Москва",
  },
  {
    img: publication2,
    viewNumber: 2300,
    title: "1930 Moscow",
    description: "Россия, Москва",
  },
  {
    img: publication3,
    viewNumber: 2300,
    title: "1930 Moscow",
    description: "Россия, Москва",
  },
  {
    img: publication4,
    viewNumber: 2300,
    title: "1930 Moscow",
    description: "Россия, Москва",
  },
  {
    img: publication5,
    viewNumber: 2300,
    title: "1930 Moscow",
    description: "Россия, Москва",
  },
  {
    img: publication6,
    viewNumber: 2300,
    title: "1930 Moscow",
    description: "Россия, Москва",
  },
];

const blogTextCard = {
  type: "text",
  url: textBlog,
  content:
    "Площадки ЗАВОД ШОУ - Площадки | Ивент | Концерт | Мероприятия | Решения и концепции",
  viewNumber: "481",
};

const blogCardInfo = [
  {
    type: "text",
    url: textBlog,
    content:
      "Площадки ЗАВОД ШОУ - Площадки | Ивент | Концерт | Мероприятия | Решения и концепции",
    viewNumber: "481",
  },
  {
    type: "video",
    url: smallCardVideo,
    content:
      "Площадки ЗАВОД ШОУ - Площадки | Ивент | Концерт | Мероприятия | Решения и концепции",
    description:
      "Всем привет! Делимся прошедшим туром с Ириной Круг. Ребята снимают целые влоги, делимся частичкой 🤝",
  },
  {
    type: "video",
    url: smallCardVideo,
    content:
      "Площадки ЗАВОД ШОУ - Площадки | Ивент | Концерт | Мероприятия | Решения и концепции",
    description:
      "Всем привет! Делимся прошедшим туром с Ириной Круг. Ребята снимают целые влоги, делимся частичкой 🤝",
  },
];

const heroSectionInfo = [
  {
    flag: 1,
    bgUrl: heroBgImg,
    title: "3D-визуализация для проверки идей и концепций",
    heroTopButton: "ФИРМЕННЫЕ УСЛУГИ",
    defaultBtn: {
      title: "заказать расчёт",
      urlLink: "",
    },
    defaultDarkBtn: {
      title: "",
      urlLink: "",
    },
    heroLinkTitle: [
      {
        title: "Раскрытие концепции",
        url: "",
      },
      {
        title: "Сокращение рисков и реализации",
        url: "",
      },
      {
        title: "Выбор из нескольких вариантов",
        url: "",
      },
      {
        title: "Мягкий переход к реализации",
        url: "",
      },
    ],
    mobileHeroLinkTitle: [
      {
        title: "Выбор из нескольких вариантов",
        url: "",
      },
      {
        title: "Сокращение рисков и реализации",
        url: "",
      },
      {
        title: "Раскрытие концепции",
        url: "",
      },
      {
        title: "Мягкий переход к реализации",
        url: "",
      },
    ],
  },
  {
    flag: 2,
    bgUrl: secondHeroBg,
    title: "Репетиционная база для подготовки мероприятий",
    heroTopButton: "ФИРМЕННЫЕ УСЛУГИ",
    defaultBtn: {
      title: "рассчитать аренду базы",
      urlLink: "",
    },
    defaultDarkBtn: {
      title: "узнать цены",
      urlLink: "",
    },
    heroLinkTitle: [
      {
        title: "Базовая одежда сцены и покрытие",
        url: "",
      },
      {
        title: "Полное электрооснащение",
        url: "",
      },
      {
        title: "Просторный зрительный зал",
        url: "",
      },
      {
        title: "Хорошая акустика",
        url: "",
      },
    ],
    mobileHeroLinkTitle: [
      {
        title: "Базовая одежда сцены и покрытие",
        url: "",
      },
      {
        title: "Хорошая акустика",
        url: "",
      },
      {
        title: "Полное электрооснащение",
        url: "",
      },
      {
        title: "Просторный зрительный зал",
        url: "",
      },
    ],
  },
  {
    flag: 1,
    bgUrl: heroLampImg,
    title: "Стейдж дизайн: &&от идеи до реализации",
    heroTopButton: "ФИРМЕННЫЕ УСЛУГИ",
    defaultBtn: {
      title: "заказать расчёт",
      urlLink: "",
    },
    defaultDarkBtn: {
      title: "",
      urlLink: "",
    },
    heroLinkTitle: [
      {
        title: "Интервью и концепция",
        url: "",
      },
      {
        title: "Создание 3D-визуализации",
        url: "",
      },
      {
        title: "Проектирование и подготовка",
        url: "",
      },
      {
        title: "Реализация проекта",
        url: "",
      },
    ],
    mobileHeroLinkTitle: [
      {
        title: "Интервью и концепция",
        url: "",
      },
      {
        title: "Создание 3D-визуализации",
        url: "",
      },
      {
        title: "Проектирование и подготовка",
        url: "",
      },
      {
        title: "Реализация проекта",
        url: "",
      },
    ],
  },
  {
    flag: 2,
    bgUrl: circleHeroImg,
    title: "Технический продакшн для любых событий",
    text: ["+ 3D-визуализация", "сокращение рисков неуспеха события"],
    heroTopButton: "ПРОДАКШН",
    defaultBtn: {
      title: "Рассчитать продакшн",
      urlLink: "",
    },
    defaultDarkBtn: {
      title: "Заполнить бриф",
      urlLink: "https://forms.yandex.com/admin/",
    },
    heroLinkTitle: [
      {
        title: "Частные мероприятия",
        url: "",
      },
      {
        title: "Корпоративные встречи",
        url: "",
      },
      {
        title: "Благотворительные проекты",
        url: "",
      },
      {
        title: "Выставки и форумы",
        url: "",
      },
      {
        title: "Спорт",
        url: "",
      },
      {
        title: "Городские события и праздники",
        url: "",
      },
      {
        title: "ТВ-проекты",
        url: "",
      },
    ],
    mobileHeroLinkTitle: [
      {
        title: "Частные мероприятия",
        url: "",
      },
      {
        title: "Корпоративные встречи",
        url: "",
      },
      {
        title: "Спорт",
        url: "",
      },
      {
        title: "Благотворительные проекты",
        url: "",
      },
      {
        title: "ТВ-проекты",
        url: "",
      },
      {
        title: "Выставки и форумы",
        url: "",
      },
      {
        title: "Городские праздники и события",
        url: "",
      },
    ],
  },
  {
    flag: 2,
    bgUrl: circleHeroImg,
    title: "Технический продакшн для концертов и туров",
    text: ["+ База для репетиций", "сокращение рисков неуспеха события"],
    heroTopButton: "ПРОДАКШН",
    defaultBtn: {
      title: "Рассчитать концерт/Тур",
      urlLink: "",
    },
    defaultDarkBtn: {
      title: "Заполнить бриф",
      urlLink: "",
    },
    heroLinkTitle: [
      {
        title: "Экспертиза площадок на соответствие райдеру",
        url: "",
      },
      {
        title: "Подбор и закупка оборудования и декораций",
        url: "",
      },
      {
        title: "Предварительный расчет экономики и логистики маршрута",
        url: "",
      },
    ],
    mobileHeroLinkTitle: [
      {
        title: "Экспертиза площадок на соответствие райдеру",
        url: "",
      },
      {
        title: "Подбор и закупка оборудования и декораций",
        url: "",
      },
      {
        title: "Предварительный расчет экономики и логистики маршрута",
        url: "",
      },
    ],
  },
  {
    flag: 1,
    bgUrl: lightHeroImg,
    title: "Световое оформление для концертов и событий",
    heroTopButton: "ТЕХНИЧЕСКИЕ УСЛУГИ",
    defaultBtn: {
      title: "заказать cвет",
      urlLink: "",
    },
    defaultDarkBtn: {
      title: "",
      urlLink: "",
    },
    heroLinkTitle: [
      {
        title: "Инспекция светового оборудования на площадке",
        url: "",
      },
      {
        title: "Предложение вариантов светового оформления ",
        url: "",
      },
      {
        title: "Подбор и установка требуемого оборудования ",
        url: "",
      },
    ],
    mobileHeroLinkTitle: [
      {
        title: "Инспекция светового оборудования на площадке",
        url: "",
      },
      {
        title: "Предложение вариантов светового оформления ",
        url: "",
      },
      {
        title: "Подбор и установка требуемого оборудования ",
        url: "",
      },
    ],
  },
  {
    flag: 1,
    bgUrl: soundHeroImg,
    title: "Звуковая поддержка для концертов и событий",
    heroTopButton: "ТЕХНИЧЕСКИЕ УСЛУГИ",
    defaultBtn: {
      title: "заказать звук",
      urlLink: "",
    },
    defaultDarkBtn: {
      title: "",
      urlLink: "",
    },
    heroLinkTitle: [
      {
        title: "Инспекция звукового оборудования на площадке",
        url: "",
      },
      {
        title: "Предложение вариантов звукового оформления ",
        url: "",
      },
      {
        title: "Подбор и установка требуемого оборудования ",
        url: "",
      },
    ],
    mobileHeroLinkTitle: [
      {
        title: "Инспекция звукового оборудования на площадке",
        url: "",
      },
      {
        title: "Предложение вариантов звукового оформления ",
        url: "",
      },
      {
        title: "Подбор и установка требуемого оборудования ",
        url: "",
      },
    ],
  },
  {
    flag: 1,
    bgUrl: videoHeroImg,
    title: "Видео-декорации для концертов и событий",
    heroTopButton: "ТЕХНИЧЕСКИЕ УСЛУГИ",
    defaultBtn: {
      title: "заказать видео",
      urlLink: "",
    },
    defaultDarkBtn: {
      title: "",
      urlLink: "",
    },
    heroLinkTitle: [
      {
        title: "Инспекция видео-оборудования на площадке",
        url: "",
      },
      {
        title: "Предложение вариантов видео-декораций",
        url: "",
      },
      {
        title: "Подбор и установка видео-оборудования ",
        url: "",
      },
    ],
    mobileHeroLinkTitle: [
      {
        title: "Инспекция звукового оборудования на площадке",
        url: "",
      },
      {
        title: "Предложение вариантов звукового оформления ",
        url: "",
      },
      {
        title: "Подбор и установка требуемого оборудования ",
        url: "",
      },
    ],
  },
  {
    flag: 1,
    bgUrl: stageHeroImg,
    title: "Одежда и покрытие сцены для концертов и событий",
    heroTopButton: "ТЕХНИЧЕСКИЕ УСЛУГИ",
    heroTopWhiteBtn: [
      "КАБУКИ →",
      "РАЗДВИЖНОЙ ЗАНАВЕС →",
      "РАЗДВИЖНОЙ ЗАНАВЕС →",
    ],
    defaultBtn: {
      title: "рассчитать одежду и покрытие сцены",
      urlLink: "",
    },
    defaultDarkBtn: {
      title: "",
      urlLink: "",
    },
    heroLinkTitle: [
      {
        title: "Инспекция кулис и покрытия на площадке",
        url: "",
      },
      {
        title: "Замер, выбор типа и доставка линолеума",
        url: "",
      },
      {
        title: "Установка одежды сцены и черного кабинета",
        url: "",
      },
    ],
    mobileHeroLinkTitle: [
      {
        title: "Инспекция кулис и покрытия на площадке",
        url: "",
      },
      {
        title: "Замер, выбор типа и доставка линолеума",
        url: "",
      },
      {
        title: "Установка одежды сцены и черного кабинета ",
        url: "",
      },
    ],
  },
];

const caseExampleInfo = [
  {
    url: caseImg2,
    title: "Название мероприятия",
    text: "Место его проведения",
  },
  {
    url: caseImg3,
    title: "Название мероприятия",
    text: "Место его проведения",
  },
  {
    url: caseImg4,
    title: "Название мероприятия",
    text: "Место его проведения",
  },
  {
    url: caseImg5,
    title: "Название мероприятия",
    text: "Место его проведения",
  },
];

const workProcessInfo = [
  {
    title: "Этап 1: Подготовка",
    content: [
      "1) Обсуждаем все пожелания и требования от заказчика",
      "2) Подбираем площадки под запрос",
      "3) Готовим предложения по форматам проведения мероприятия",
    ],
    arrow: "210px",
    arrowMargin: "0",
  },
  {
    title: "Этап 2: Моделирование",
    content: [
      "1) Создаем и визуализируем идеи для реализации",
      "2) Согласовываем предложенные варианты с заказчиком",
      "3) Подбираем оборудование, подходящее для выбранной концепции",
    ],
    arrow: "250px",
    arrowMargin: "-40px",
  },
  {
    title: "Этап 3: Документация",
    content: [
      "1) Подготавливаем полный пакет документов для реализации проекта",
      "2) Предлагаем услуги по реализации выбранной концепции",
      "button",
    ],
    arrow: "210px",
    arrowMargin: "-40px",
  },
];
const workProcessInfo2 = [
  {
    title: "Этап 1: Подготовка",
    content: [
      "1) Подбираем оборудование, соответствующее согласованному проекту",
      "2) Бронируем позиции в своем парке оборудования",
      "3) Проверяем, какие услуги подрядчиков понадобятся",
      "4) Резервируем оборудование в нашем парке и готовим его к перевозке",
    ],
    arrow: "290px",
    arrowMargin: "0",
  },
  {
    title: "Этап 2: Реализация",
    content: [
      "1) Рассчитываем логистику и тайминг шоу",
      "2) Перевозим оборудование на площадку и монтируем конструкции",
      "3) Проверяем все технические услуги и оборудование на сцене",
    ],
    arrow: "255px",
    arrowMargin: "-45px",
  },
  {
    title: "Этап 3: Проведение",
    content: [
      "1) Контролируем работу оборудования на площадке",
      "2) Соблюдаем дресс-код ПО РАЙДЕРУ для профессионального взаимодействия с гостями",
      "3) Постоянная связь с тех. директором на мероприятии",
      "button",
    ],
    arrow: "270px",
    arrowMargin: "-45px",
  },
];

const workProcessInfo3 = [
  {
    title: "Подготовка",
    content: [
      "1) Подбираем и согласовываем идеи реализации с заказчиком",
      "2) Инструктируем команду и распределяем задачи",
      "3) Подбираем оборудование, соответствующее райдеру артистов",
      "4) Участвуем в составлении плана и согласовываем его с заказчиком",
    ],
    arrow: "290px",
    arrowMargin: "0",
  },
  {
    title: "Реализация",
    content: [
      "1) Набираем и инструктируем технических подрядчиков",
      "2) Подбираем оборудование по райдерам артистов",
      "3) Участвуем в составлении тайминга мероприятия",
    ],
    arrow: "235px",
    arrowMargin: "-45px",
  },
  {
    title: "Проведение события",
    content: [
      "1) Контролируем работу оборудования на площадк",
      "2) Обеспечиваем соблюдение дресс-кода команды",
      "3) Оперативно решаем любые технические вопросы и проблемы",
      "button",
    ],
    arrow: "235px",
    arrowMargin: "-45px",
  },
];

const workProcessInfo4 = [
  {
    title: "Подготовка",
    content: [
      "1) Проводим экспертизу площадок в соответствии с райдерами артистов (база площадок ежемесячно обновляется отчетами в нашем тг-канале)",
      "2) Рассчитываем экономику и логистику маршрута",
      "3) Связываемся с организаторами",
    ],
    arrow: "270px",
    arrowMargin: "0",
  },
  {
    title: "Сборка тура",
    content: [
      "1) Подбираем оборудование, соответствующее требованиям проекта",
      "2) Формируем технические бригады для работы на площадке",
      "3) Заранее продумываем каждый шаг: от коммуникации до проведения",
    ],
    arrow: "300px",
    arrowMargin: "-45px",
  },
  {
    title: "Проведение тура",
    content: [
      "1) Контролируем работу оборудования на каждом этапе",
      "2) Соблюдаем дресс-код ПО РАЙДЕРУ и поддерживаем профессиональный внешний вид команды",
      "3) Всегда на площадке – всегда на связи",
      "button",
    ],
    arrow: "275px",
    arrowMargin: "-45px",
  },
];

const policyAccordion = [
  {
    title: "1. Общие положения",
    txt1: "1.1 ООО «ЗАВОД ШОУ» (далее по тексту — Оператор) ставит соблюдение прав и свобод граждан одним из важнейших условий осуществления своей деятельности.",
    txt2: "1.2 Политика Оператора в отношении обработки персональных данных (далее по тексту — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://zavodshow.ru/. Персональные данные обрабатывается в соответствии с ФЗ «О персональных данных» № 152-ФЗ.",
  },
  {
    title: "2. Основные понятия, используемые в Политике",
    txt1: "2.1 ООО «ЗАВОД ШОУ» (далее по тексту — Оператор) ставит соблюдение прав и свобод граждан одним из важнейших условий осуществления своей деятельности.",
    txt2: "2.2 Политика Оператора в отношении обработки персональных данных (далее по тексту — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://zavodshow.ru/. Персональные данные обрабатывается в соответствии с ФЗ «О персональных данных» № 152-ФЗ.",
  },
  {
    title:
      "3. Оператор может обрабатывать следующие персональные данные Пользователя",
    txt1: "3.1 ООО «ЗАВОД ШОУ» (далее по тексту — Оператор) ставит соблюдение прав и свобод граждан одним из важнейших условий осуществления своей деятельности.",
    txt2: "3.2 Политика Оператора в отношении обработки персональных данных (далее по тексту — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://zavodshow.ru/. Персональные данные обрабатывается в соответствии с ФЗ «О персональных данных» № 152-ФЗ.",
  },
  {
    title: "4. Цели обработки персональных данных",
    txt1: "4.1 ООО «ЗАВОД ШОУ» (далее по тексту — Оператор) ставит соблюдение прав и свобод граждан одним из важнейших условий осуществления своей деятельности.",
    txt2: "4.2 Политика Оператора в отношении обработки персональных данных (далее по тексту — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://zavodshow.ru/. Персональные данные обрабатывается в соответствии с ФЗ «О персональных данных» № 152-ФЗ.",
  },
  {
    title: "5. Правовые основания обработки персональных данных",
    txt1: "5.1 ООО «ЗАВОД ШОУ» (далее по тексту — Оператор) ставит соблюдение прав и свобод граждан одним из важнейших условий осуществления своей деятельности.",
    txt2: "5.2 Политика Оператора в отношении обработки персональных данных (далее по тексту — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://zavodshow.ru/. Персональные данные обрабатывается в соответствии с ФЗ «О персональных данных» № 152-ФЗ.",
  },
  {
    title:
      "6. Порядок сбора, хранения, передачи и других видов обработки персональных данных",
    txt1: "6.1 ООО «ЗАВОД ШОУ» (далее по тексту — Оператор) ставит соблюдение прав и свобод граждан одним из важнейших условий осуществления своей деятельности.",
    txt2: "6.2 Политика Оператора в отношении обработки персональных данных (далее по тексту — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://zavodshow.ru/. Персональные данные обрабатывается в соответствии с ФЗ «О персональных данных» № 152-ФЗ.",
  },
  {
    title: "7. Заключительные положения",
    txt1: "7.1 ООО «ЗАВОД ШОУ» (далее по тексту — Оператор) ставит соблюдение прав и свобод граждан одним из важнейших условий осуществления своей деятельности.",
    txt2: "7.2 Политика Оператора в отношении обработки персональных данных (далее по тексту — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://zavodshow.ru/. Персональные данные обрабатывается в соответствии с ФЗ «О персональных данных» № 152-ФЗ.",
  },
];

const userListInfo = [
  [
    {
      avatar: userAvatar1,
      title: "Имя Фамилия",
    },
    {
      avatar: userAvatar2,
      title: "Имя Фамилия",
    },
    {
      avatar: userAvatar3,
      title: "Имя Фамилия",
    },
    {
      avatar: userAvatar1,
      title: "Имя Фамилия",
    },
    {
      avatar: userAvatar3,
      title: "Имя Фамилия",
    },
    {
      avatar: userAvatar1,
      title: "Имя Фамилия",
    },
    {
      avatar: userAvatar2,
      title: "Имя Фамилия",
    },
    {
      avatar: userAvatar3,
      title: "Имя Фамилия",
    },
  ],
  [
    {
      avatar: userAvatar1,
      title: "Имя Фамилия",
    },
    {
      avatar: userAvatar2,
      title: "Имя Фамилия",
    },
    {
      avatar: userAvatar3,
      title: "Имя Фамилия",
    },
    {
      avatar: userAvatar1,
      title: "Имя Фамилия",
    },
  ],
];

const creationInfo = [
  {
    title: "Этап 1: Интервью и разработка концепции",
    smallText: [
      "1) Проводим интервью с заказчиком, чтобы глубже понять его потребности",
      "2) Анализируем запросы и требования",
      "3) Разрабатываем концепцию шоу",
    ],
    contentTitle: "Что входит в концепцию:",
    contentText: [
      "— Стейдждизайн с нуля",
      "— Световая концепция",
      "— Звуковое обеспечение",
      "— Доп. услуги: спецэффекты, трансляция по запросу",
    ],
    bgColor: "#EFEFEF",
  },
  {
    title: "Этап 2: Создание 3D-визуализаций",
    smallText: [
      "Разрабатываем и визуализируем несколько вариантов шоу для согласования",
    ],
    buttonIcon: creationIcon,
    buttonTitle: "Как делают 3D-визуализацию",
    url: "/documents/Работа с 3D-визуализацией.docx",
    download: "Работа с 3D-визуализацией.docx",
    sizeText: "DOC 35 Кб",
    bgColor: "#E5E5E5",
  },
  {
    title: "Этап 3: Проектирование и подготовка",
    smallText: [
      "1) Подбираем необходимое оборудование из нашего парка",
      "2) Составляем смету для реализации и тайминг шоу",
    ],
    contentTitle: "Какие есть статьи расходов:",
    contentText: [
      "— Аренда оборудования",
      "— Услуги подрядчиков",
      "— Транспорт",
    ],
    bgColor: "#DCDBDB",
  },
  {
    title: "Этап 4: Реализация и проведение шоу",
    smallText: [
      "1) Формируем команду для подготовки и проведения шоу",
      "2) Доставляем и устанавливаем оборудование на площадке",
      "3) Контролируем технические аспекты на всех этапах",
    ],
    buttonIcon: smallDownload,
    buttonTitle: "Скачать пример документации",
    url: "/documents/Этапы работы над туром.docx",
    download: "Этапы работы над туром.docx",
    sizeText: "DOC 1.9 Мб",
    bgColor: "#CECDCD",
  },
];

const eventCardInfo = [
  {
    img: event1,
    title: "Частные мероприятия",
    tags: ["Дни рождения", "Свадьбы"],
  },
  {
    img: event2,
    title: "Корпоративные и деловые",
    tags: ["Корпоративы", "Конференции"],
  },
  {
    img: event3,
    title: "Городские праздники",
    tags: ["Государства", "Муниципалитеты"],
  },
  {
    img: event4,
    title: "ТВ-проекты",
    tags: ["Студия", "Открытые площадки"],
  },
  {
    img: event5,
    title: "Благотворительные мероприятия",
    tags: ["Мемориальные концерты"],
  },
  {
    img: event6,
    title: "Cпортивные события",
    tags: ["Стадионы", "Спорткомлексы"],
  },
];

const questionSqareInfo = [
  {
    title: "Интервью с клиентом",
    button: [
      "Какая цель события?",
      "Каких специалистов хотите задействовать?",
      "Какие эмоции хотите вызвать?",
    ],
  },
  {
    title: "Анализ потребностей",
    button: [
      "Какие этапы войдут в сценарий шоу?",
      "Какой тайминг предполагается?",
      "Какая глобальная цель?",
    ],
  },
];

const gradiantBgInfo = ["#EFEFEF", "#E5E5E5", "#DCDBDB", "#CECDCD"];

const equipmentsCardInfo = {
  light: [
    {
      title: "Подготовка",
      content: [
        "1) Изучим и учтем особенности площадки",
        "2) Соберем все пожелания и требования от заказчика",
      ],
    },
    {
      title: "Анализ",
      content: [
        "1) Проведем инспекцию площадки",
        "2) Учтем требования райдеров артистов и специфику мероприятия",
      ],
    },
    {
      title: "Реализация",
      content: [
        "1) Создадим и визуализируем в 3Д варианты освещения для согласования",
        "2) Привезем, установим и настроим световое оборудование на площадке",
      ],
    },
    {
      title: "Поддержка",
      content: [
        "1) Проконтролируем работу оборудования во время мероприятия",
        "2) Оперативно решим все возникшие технические вопросы",
      ],
    },
  ],
  sound: [
    {
      title: "Подготовка",
      content: [
        "1) Проверим качество звука на площадке и учтем её особенности",
        "2) Соберем все пожелания и требования заказчика",
      ],
    },
    {
      title: "Анализ",
      content: [
        "1) Проведем инспекцию площадки",
        "2) Учтем требования райдеров участвующих артистов",
      ],
    },
    {
      title: "Реализация",
      content: [
        "1) Спланируем технический продакшн, оформим документацию",
        "2) Привезем, установим и настроим звуковое оборудование",
      ],
    },
    {
      title: "Поддержка",
      content: [
        "1) Проконтролируем работу звуковой системы на площадке",
        "2) Оперативно решим все технические вопросы",
      ],
    },
  ],
  video: [
    {
      title: "Подготовка",
      content: [
        "1) Проверим видеооборудование на площадке и учтем её особенности",
        "2) Соберем все пожелания и требования от заказчика",
      ],
    },
    {
      title: "Анализ",
      content: [
        "1) Проведем инспекцию площадки",
        "2) Учтем требования райдеров участвующих артистов",
      ],
    },
    {
      title: "Реализация",
      content: [
        "1) Создадим и визуализируем варианты настройки видеооборудования",
        "2) Привезем,  установим и настроим видеооборудование на площадке",
      ],
    },
    {
      title: "Поддержка",
      content: [
        "1) Проконтролируем работу видеосистемы во время мероприятия",
        "2) Оперативно решим все технические вопросы",
      ],
    },
  ],
  stage: [
    {
      title: "Проверим одежду сцены площадки",
      content: [
        "1) Изучим и учтем особенности вашей площадки",
        "2) Найдем и опишем недостатки одежды сцены",
        "3) Предложим как оптимально улучшить комплекс",
      ],
    },
    {
      title: "Проконсультируем перед событием",
      content: [
        "1) Соберем все пожелания и требования от заказчика",
        "2) Учтем требования райдеров участвующих артистов",
        "3) Создадим и визуализируем варианты идей реализации",
      ],
    },
    {
      title: "Установим оборудование",
      content: [
        "1) Оперативно решим критические проблемы",
        "2) Проконтролируем работу оборудования на площадке",
        "3) Профессионально установим декорации и линолеум",
      ],
    },
    {
      title: "Подготовим событие или концерт-тур",
      content: [
        "1) Спланируем технический продакшн с документацией",
        "2) Реализуем согласованное с заказчиком решение",
        "3) Подготовим мобильное решение для тура",
      ],
    },
  ],
};

const equipmentsCategoryInfo = {
  light: [
    {
      src: light1,
      badge: "Spot / Beam",
      title: "Clay paky AXCOR spot 300",
      description: "Светодиодный прожектор",
    },
    {
      src: light2,
      badge: "Wash / Wash-Beam",
      title: "EK R3 Beam Wash",
      description: "Светодиодный прожектор",
    },
    {
      src: light3,
      badge: "Линейные прожекторы",
      title: "EK LED Bar 15 4-in-1",
      description: "LED-панель",
    },
  ],
  sound: [
    {
      src: sound1,
      badge: "Сценические мониторы",
      title: "ELARCON VRX915M",
      description: "Сценический монитор активный",
    },
    {
      src: sound2,
      badge: "Вокальные микрофоны",
      title: "AKG C636 BLK",
      description: "Конденсаторный микрофон",
    },
    {
      src: sound3,
      badge: "Микшерные пульты",
      title: "Allen & Heath CQ12T",
      description: "Цифровой микшерный пульт",
    },
  ],
  video: [
    {
      src: video1,
      badge: "Проекторы",
      title: "Panasonic PT-EX16KE",
      description: "Проектор",
    },
    {
      src: video2,
      badge: "Экраны проекции",
      title: "Сетка – экран Tüchler",
      description: "Проекционный экран: 3 мм, 8х6 м",
    },
    {
      src: video3,
      badge: "Линейные прожекторы",
      title: "EK LED Bar 15 4-in-1",
      description: "LED-панель",
    },
  ],
};

const kabukiInfo = {
  topText: [
    {
      text: "Шелк",
      number: "До 4 кг",
    },
    {
      text: "Стандартная ткань",
      number: "До 8 кг",
    },
    {
      text: "Бархат",
      number: "До 10 кг",
    },
  ],
  bottomText: [
    {
      text: "Ширина",
      number: "7,6 см",
    },
    {
      text: "Длина",
      number: "13,5 м",
    },
    {
      text: "Высота",
      number: "7,4 см",
    },
    {
      text: "Напряжение",
      number: "230 Вт ",
    },
    {
      text: "Мощность",
      number: "30 Вт",
    },
  ],
};

const plantShowInfo = [
  {
    topic: "#Надежность",
    content: "",
  },
  {
    topic: "#Внимательность",
    content: "",
  },
  {
    topic: "#Вежливость",
    content: "",
  },
  {
    topic: "#Патриотизм",
    content: "",
  },
  {
    topic: "#Аккуратность",
    content: "",
  },
  {
    topic: "#Инициатива",
    content: "",
  },
  {
    topic: "#Своевременность",
    content: "",
  },
  {
    topic: "#Эмоции",
    content: "",
  },
];

const plantShowMobileInfo = [
  {
    topic: "#Надежность",
    content: "Держим свое слово и выполняем обещания",
  },
  {
    topic: "#Аккуратность",
    content:
      "Поддерживаем чистоту и порядок. Уважаем правила поведения в общих пространствах",
  },
  {
    topic: "#Внимательность",
    content: "Проявляем заботу о команде и артистах",
  },
  {
    topic: "#Инициатива",
    content:
      "Мы не перекладываем ответственность, а стараемся помогать коллегам в начинаниях",
  },
  {
    topic: "#Вежливость",
    content: "Отказываемся от ненор-мативной лексики",
  },
  {
    topic: "#Своевременность",
    content:
      "Соблюдаем сроки как в отношении заказчиков, так и в работе с нашими коллегами",
  },
  {
    topic: "#Патриотизм",
    content: "Мы любим свою страну и помогаем её защитникам",
  },
  {
    topic: "#Эмоции",
    content:
      "Мы воплощаем шоу и позитив, создаем бодрую атмосферу как на сцене, так и в офисе",
  },
];

const teamOfficeInfo = [
  {
    title: "ОФИС КОМАНДЫ",
    description: "г. Москва, Реутов пл.Академика Челомея, оф. 102",
    content: [
      { icon: miniPhone, value: "+7 (495)-720-12-82" },
      { icon: miniClock, value: "10-19 МСК" },
    ],
  },
  {
    description: "МЕНЕДЖЕРЫ ПРОЕКТОВ, АРЕНДА ОБОРУДОВАНИЯ",
    content: [
      { icon: miniPhone, value: "доб. 203" },
      { icon: miniTelegram, value: "@afonnikova_irina_zavodshow" },
      { icon: miniTelegram, value: "@sedov_alexey_zavodshow" },
    ],
  },
  {
    description: `ФИНАНСЫ, \u00A0 \u00A0 \u00A0 ДОКУМЕНТЫ, ОПЛАТЫ`,
    content: [
      { icon: miniPhone, value: "доб. 300" },
      { icon: miniMail, value: "fin@zavodshow.ru" },
      { icon: miniTelegram, value: "@Timofeev_ZS" },
    ],
  },
  {
    description: "ЛОГИСТИКА, СРОКИ ДОСТАВКИ, СОТР-ВО",
    content: [
      { icon: miniPhone, value: "доб. 800" },
      { icon: miniMail, value: "delivery@zavodshow.ru" },
      { icon: miniTelegram, value: "@afonnikova_irina_zavodshow" },
    ],
  },
  {
    title: "СКЛАД (24 ЧАСА)",
    description: "г. Москва, Реутов пл.Академика Челомея, оф. 105",
    content: [
      { icon: miniPhone, value: "+7 (495)-720-12-82" },
      { icon: miniClock, value: "10-19 МСК" },
    ],
  },
  {
    description: "ОТГРУЗКИ, ПРОЕЗД НА СКЛАД",
    content: [
      { icon: miniPhone, value: "доб. 400" },
      { icon: miniMail, value: "cargo@zavodshow.ru" },
      { icon: miniTelegram, value: "@office_zavodshow" },
    ],
  },
  {
    flag: 1,
    description: ["АРЕНДА ЗАЛА"],
    content: [
      { icon: miniPhone, value: "+7 (906)-052-28-80" },
      { icon: miniTelegram, value: "@office_zavodshow" },
    ],
  },
  {
    flag: 1,
    description: ["ИНФОРМАЦИОННОЕ ОБЕСПЕЧЕНИЕ, РЕКЛАМА"],
    content: [
      { icon: miniPhone, value: "+7 (906)-051-78-79" },
      { icon: miniTelegram, value: "@pr_zavodshow" },
    ],
  },
];

const SwiperVideoImgInfo = [
  {
    title: "Частный День Рождения",
    number: "80",
    smallBtnTitle: "Частное мероприятие",
    video: Svideo9,
    img: SwiperImg1,
  },
  {
    title: "Корпоративный банкет",
    number: "150",
    smallBtnTitle: "Корпоративное мероприятие",
    video: Svideo10,
    img: SwiperImg2,
  },
  {
    title: "Частный День Рождения",
    number: "80",
    smallBtnTitle: "Частное мероприятие",
    video: Svideo9,
    img: SwiperImg1,
  },
  {
    title: "Корпоративный банкет",
    number: "150",
    smallBtnTitle: "Корпоративное мероприятие",
    video: Svideo10,
    img: SwiperImg2,
  },
  {
    title: "Частный День Рождения",
    number: "80",
    smallBtnTitle: "Частное мероприятие",
    video: Svideo9,
    img: SwiperImg1,
  },
  {
    title: "Корпоративный банкет",
    number: "150",
    smallBtnTitle: "Корпоративное мероприятие",
    video: Svideo10,
    img: SwiperImg2,
  },
];

const CatalogInfo = {
  caseCatalog: {
    placeholder: "Название кейса, формат, город",
    checkText: [
      {
        name: "visualization",
        label: "С 3D-визуализацией",
      },
      {
        name: "generator",
        label: "С генератором",
      },
    ],
    selectBoxInfo: [
      {
        name: "blog_types",
        label: "Вид мероприятия",
        label2: "Все виды мероприятий",
        option: [
          "Частное",
          "Корпоративное",
          "Конференция",
          "Государственное",
          "Спортивное",
          "Концерт",
          "Тур",
        ],
      },
      {
        name: "startDate",
        label: "Год проведения",
        label2: "Все года проведения",
        option: [],
      },
      {
        name: "site_type",
        label: "Площадка",
        label2: "Все площадки",
        option: [],
      },
      {
        name: "cities",
        label: "Город",
        label2: "Все города",
        option: [],
      },
      {
        name: "equipment",
        label: "Оборудование",
        label2: "Все типы",
        option: [],
      },
      {
        name: "eventTitle",
        label: "Хедлайнер",
        label2: "Все хедлайнеры",
        option: [],
      },
    ],
  },
  platformCatalog: {
    placeholder: "Название площадки, город",
    buttonTitle: [
      {
        title: "Все типы площадок",
        type: "",
      },
      {
        title: "Рестораны",
        type: "Рестораны",
      },
      {
        title: "Загородные площадки",
        type: "Загородные площадки",
      },
      {
        title: "Конференц-залы",
        type: "Конференц-залы",
      },
      {
        title: "Концертные залы",
        type: "Концертные залы",
      },
    ],
    checkText: [
      {
        name: "visualization",
        label: "С 3D-визуализацией",
      },
    ],
    selectBoxInfo: [
      {
        name: "blog_types",
        label: "Вид мероприятия",
        label2: "Все виды мероприятия",
        option: [
          "Частное",
          "Корпоративное",
          "Конференция",
          "Государственное",
          "Спортивное",
          "Концерт",
          "Тур",
        ],
      },
      {
        name: "cities",
        label: "Город",
        label2: "Все города",
        option: [],
      },
      {
        name: "default_site",
        label: "Тип площадки",
        label2: "Все типы площадок",
        option: [
          "Все типы площадок",
          "Рестораны",
          "Конференц-залы",
          "Загородные площадки",
          "Концертные залы",
          "Дом культуры",
          "Клуб",
          "Лофт",
        ],
      },
      {
        name: "default_equipment",
        label: "Виды оснащения",
        label2: "Все виды оснащения",
        option: ["Парковка", "Гримёрные комнаты", "Проекторы и экраны"],
      },
    ],
  },
  equipmentCatalog: {
    placeholder: "Наименование, модель, серия",
    buttonTitle: [
      "Все виды оборудования",
      "Свет",
      "Беспроводное",
      "Звук",
      "Видео",
      "Сцена",
      "Силовое",
      "Аксессуары",
      "Расходники",
    ],
    selectBoxInfo: [
      {
        name: "type",
        label: "Вид оборудования",
        option: [],
      },
      {
        name: "categoryType",
        label: "Категория вида оборудования",
        option: [],
      },
      {
        name: "series",
        label: "Бренд",
        option: [],
      },
    ],
    catalogCardInfo: [
      {
        img: caseCatalogPic1,
        info: "Spot / Beam",
        city: "Clay paky AXCOR spot 300",
        type: "свет",
        address: "Светодиодный прожектор",
      },
      {
        img: caseCatalogPic2,
        info: "Wash / Wash-Beam",
        city: "EK R3 Beam Wash",
        type: "свет",
        address: "Светодиодный прожектор",
      },
      {
        img: caseCatalogPic3,
        info: "Линейные прожекторы",
        city: "EK LED Bar 15 4-in-1",
        type: "свет",
        address: "LED-панель",
      },
      {
        img: caseCatalogPic4,
        info: "Басовые комбо",
        city: "Ampeg BA600/210",
        type: "звук",
        address: "Басовый кабинет 2х10",
      },
      {
        img: caseCatalogPic5,
        info: "135",
        city: "Soho Show",
        type: "конц.зал",
        address: "Москва, Саввинская наб. 12/8",
      },
      {
        img: caseCatalogPic6,
        info: "Spot / Beam",
        city: "Clay paky AXCOR spot 300",
        type: "свет",
        address: "Светодиодный прожектор",
      },
      {
        img: caseCatalogPic7,
        info: "Wash / Wash-Beam",
        city: "EK R3 Beam Wash",
        type: "свет",
        address: "Светодиодный прожектор",
      },
      {
        img: caseCatalogPic8,
        info: "Линейные прожекторы",
        city: "EK LED Bar 15 4-in-1",
        type: "свет",
        address: "LED-панель",
      },
    ],
  },
};

const teamPageInfo = [
  {
    competencies: [
      "20 лет в индустрии",
      "4016 мероприятий с 2015 года",
      "85 городов в РФ и мире",
      "350 частных мероприятий",
      "Постоянное обучение и развитие",
      "50 специалистов",
    ],
    links:
      "https://docs.google.com/forms/d/e/1FAIpQLSfKs1AfpUNM591y2wKODacMoENNU2QHJFu16zMQs6IDmCp-jQ/alreadyresponded",
    tag1: "Держим свое слово и выполняем обещания.",
    tag2: "Проявляем заботу о команде и артистах.",
    tag3: "Отказываемся от ненормативной лексики.",
    tag4: "Мы любим свою страну и помогаем её защитникам.",
    tag5: "Поддерживаем чистоту и порядок. Уважаем правила поведения в общих пространствах.",
    tag6: "Мы не перекладываем ответственность, а стараемся помогать коллегам в начинаниях.",
    tag7: "Соблюдаем сроки как в отношении заказчиков, так и в работе с нашими коллегами.",
    tag8: "Мы воплощаем шоу и позитив, создаем бодрую атмосферу как на сцене, так и в офисе.",
  },
];

export {
  adminDirectoryInfo,
  menuItemsData,
  footerTopLink,
  swiperData,
  gallery,
  gallery1,
  pendingCardInfo,
  publicationCardInfo,
  blogCardInfo,
  blogTextCard,
  heroSectionInfo,
  caseExampleInfo,
  questionSqareInfo,
  workProcessInfo,
  workProcessInfo2,
  workProcessInfo3,
  workProcessInfo4,
  policyAccordion,
  userListInfo,
  creationInfo,
  eventCardInfo,
  gradiantBgInfo,
  equipmentsCardInfo,
  equipmentsCategoryInfo,
  kabukiInfo,
  plantShowInfo,
  plantShowMobileInfo,
  teamOfficeInfo,
  SwiperVideoImgInfo,
  CatalogInfo,
  teamPageInfo,
};
