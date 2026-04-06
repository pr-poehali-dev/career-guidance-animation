export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string; // emoji-based CSS avatar
  color: string;
  side: "left" | "right";
}

export interface SceneStep {
  type: "dialogue" | "choice" | "action" | "result";
  character?: string;
  text: string;
  mood?: "neutral" | "happy" | "worried" | "angry" | "thinking" | "excited";
  choices?: {
    text: string;
    consequence: string;
    xp: number;
    isGood?: boolean;
  }[];
  actionLabel?: string;
  xp?: number;
}

export interface ScenarioData {
  id: number;
  title: string;
  profession: string;
  professionId: number;
  emoji: string;
  difficulty: "Старт" | "Средне" | "Хардкор";
  duration: string;
  xp: number;
  gradient: string;
  bgLight: string;
  textAccent: string;
  borderAccent: string;
  tags: string[];
  desc: string;
  setting: string;
  characters: Character[];
  steps: SceneStep[];
}

export const scenariosData: ScenarioData[] = [
  // ─── РАЗРАБОТЧИК ──────────────────────────────────────────────────
  {
    id: 1,
    title: "День из жизни разработчика",
    profession: "IT-разработка",
    professionId: 1,
    emoji: "💻",
    difficulty: "Старт",
    duration: "10 мин",
    xp: 200,
    gradient: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
    textAccent: "text-violet-600",
    borderAccent: "border-violet-200",
    tags: ["Логика", "Командная работа"],
    desc: "Ты junior-разработчик в стартапе. Первый баг, первый код-ревью и первый дедлайн — всё в один день.",
    setting: "🏢 Офис стартапа «Nova Tech», 9:00 утра",
    characters: [
      { id: "player", name: "Ты", role: "Junior Dev", avatar: "👨‍💻", color: "#8b5cf6", side: "right" },
      { id: "lead", name: "Марина", role: "Tech Lead", avatar: "👩‍💼", color: "#ec4899", side: "left" },
      { id: "pm", name: "Дима", role: "Product Manager", avatar: "🧑‍💼", color: "#f59e0b", side: "left" },
    ],
    steps: [
      { type: "dialogue", character: "lead", text: "Доброе утро! Есть важный баг в продакшене. Пользователи не могут войти в аккаунт. Это критично — нужно исправить до 12:00.", mood: "worried" },
      { type: "dialogue", character: "player", text: "Понял. Смотрю логи прямо сейчас.", mood: "thinking" },
      { type: "dialogue", character: "lead", text: "Хорошо. Я вижу в логах ошибку 401. Что думаешь — где проблема?", mood: "neutral" },
      {
        type: "choice",
        character: "player",
        text: "Нужно решить, с чего начать отладку:",
        choices: [
          { text: "Проверю токены авторизации и сессии", consequence: "Правильное решение! Проблема именно в истёкших JWT-токенах.", xp: 80, isGood: true },
          { text: "Перезапущу весь сервер", consequence: "Это временно помогло, но причина не устранена. Пользователи снова потеряют доступ через час.", xp: 20, isGood: false },
          { text: "Напишу новый API с нуля", consequence: "Марина останавливает тебя — это займёт дни, а баг нужно исправить сейчас.", xp: 10, isGood: false },
        ],
      },
      { type: "dialogue", character: "lead", text: "Отлично! Нашёл? JWT-токены истекали раньше срока из-за неверной timezone на сервере.", mood: "happy" },
      { type: "dialogue", character: "pm", text: "Ребята, извините что врываюсь — клиент звонит каждые 10 минут. Когда можно будет сообщить о починке?", mood: "worried" },
      {
        type: "choice",
        character: "player",
        text: "Как ответишь менеджеру?",
        choices: [
          { text: "Через 30 минут — уже знаю причину и пишу фикс", consequence: "Дима доволен конкретным сроком. Клиент успокоился.", xp: 60, isGood: true },
          { text: "Не знаю, работаем", consequence: "Дима расстроен и сам звонит клиенту с неопределёнными обещаниями.", xp: 10, isGood: false },
          { text: "Иди разберись сам — я занят", consequence: "Конфликт в команде. Марина делает замечание после рабочего дня.", xp: 0, isGood: false },
        ],
      },
      { type: "dialogue", character: "lead", text: "Хороший фикс! Отправляй на ревью.", mood: "happy" },
      { type: "result", text: "🎉 Отличная работа! Ты исправил критический баг, чётко общался с командой и уложился в дедлайн. Именно так работают настоящие разработчики!", xp: 200 },
    ],
  },

  // ─── DATA SCIENTIST ────────────────────────────────────────────────
  {
    id: 2,
    title: "Расследование падения продаж",
    profession: "Data Science",
    professionId: 2,
    emoji: "📊",
    difficulty: "Средне",
    duration: "12 мин",
    xp: 280,
    gradient: "from-sky-400 to-blue-600",
    bgLight: "bg-sky-50",
    textAccent: "text-sky-600",
    borderAccent: "border-sky-200",
    tags: ["Аналитика", "Математика"],
    desc: "Клиент в панике — продажи упали на 40%. Только у тебя есть данные и час, чтобы найти причину.",
    setting: "📊 Аналитический отдел компании «Retail Pro», дедлайн через час",
    characters: [
      { id: "player", name: "Ты", role: "Data Analyst", avatar: "🧑‍💻", color: "#3b82f6", side: "right" },
      { id: "ceo", name: "Виктор", role: "CEO", avatar: "👨‍💼", color: "#f59e0b", side: "left" },
      { id: "marketer", name: "Лена", role: "CMO", avatar: "👩‍🎨", color: "#ec4899", side: "left" },
    ],
    steps: [
      { type: "dialogue", character: "ceo", text: "Продажи рухнули 3 недели назад. Минус 40%. Я не могу объяснить инвесторам что происходит. Мне нужна причина!", mood: "angry" },
      { type: "dialogue", character: "player", text: "Дайте мне доступ к данным. Посмотрю выручку, трафик и конверсию за последние 2 месяца.", mood: "thinking" },
      { type: "dialogue", character: "marketer", text: "Слушай, я подозреваю что дело в сезонности. Или, может, конкуренты демпингуют?", mood: "neutral" },
      {
        type: "choice",
        character: "player",
        text: "С чего начнёшь анализ?",
        choices: [
          { text: "Сначала посмотрю на разбивку по каналам — откуда пришли продажи до и после падения", consequence: "Точно! Ты видишь: органический трафик остался, но платный упал до нуля.", xp: 90, isGood: true },
          { text: "Сравню со средним по рынку — вдруг все упали?", consequence: "Полезно, но займёт время. Конкуренты в плюсе — значит причина внутри компании.", xp: 40, isGood: false },
          { text: "Проверю сезонность за 3 года", consequence: "Сезонность не объясняет такой резкий обрыв. Лена разочарована — нужно искать дальше.", xp: 30, isGood: false },
        ],
      },
      { type: "dialogue", character: "player", text: "Нашёл! Платная реклама в Google остановилась ровно 3 недели назад. Кто-то приостановил кампании.", mood: "excited" },
      { type: "dialogue", character: "marketer", text: "Ой... это я остановила. Думала, что мы меняем подрядчика на следующей неделе, и решила сэкономить. Не предупредила...", mood: "worried" },
      { type: "dialogue", character: "ceo", text: "Лена, это катастрофа. Но хотя бы теперь понятно что делать. Сколько времени нужно чтобы восстановить продажи?", mood: "angry" },
      {
        type: "choice",
        character: "player",
        text: "Что посоветуешь Виктору?",
        choices: [
          { text: "Перезапустить кампании сегодня + поднять бюджет на 20% для ускоренного восстановления", consequence: "Разумный план! Виктор одобряет. Через неделю продажи начнут расти.", xp: 80, isGood: true },
          { text: "Ждать нового подрядчика — не торопиться", consequence: "Виктор теряет ещё 2 недели выручки и злится.", xp: 20, isGood: false },
          { text: "Уволить Лену", consequence: "Это не твоё решение как аналитика. Виктор смотрит на тебя с удивлением.", xp: 0, isGood: false },
        ],
      },
      { type: "result", text: "🔍 Блестящий анализ! Ты нашёл причину за час, дал конкретную рекомендацию и не обвинял людей. Именно так работают топ-аналитики.", xp: 280 },
    ],
  },

  // ─── UX ДИЗАЙНЕР ──────────────────────────────────────────────────
  {
    id: 3,
    title: "Творческий кризис",
    profession: "UX/UI Дизайн",
    professionId: 3,
    emoji: "🎨",
    difficulty: "Старт",
    duration: "10 мин",
    xp: 220,
    gradient: "from-fuchsia-400 to-pink-500",
    bgLight: "bg-fuchsia-50",
    textAccent: "text-fuchsia-600",
    borderAccent: "border-fuchsia-200",
    tags: ["Творчество", "Эмпатия"],
    desc: "Клиент отверг три концепции подряд. Завтра финальная презентация — нужно наконец понять, чего он хочет.",
    setting: "🎨 Дизайн-студия «Pixel Dream», день перед дедлайном",
    characters: [
      { id: "player", name: "Ты", role: "UI/UX Designer", avatar: "🧑‍🎨", color: "#ec4899", side: "right" },
      { id: "client", name: "Борис", role: "Клиент", avatar: "👨‍💼", color: "#f59e0b", side: "left" },
      { id: "colleague", name: "Катя", role: "Art Director", avatar: "👩‍🎨", color: "#8b5cf6", side: "left" },
    ],
    steps: [
      { type: "dialogue", character: "client", text: "Снова не то! Три версии — и всё мимо. Мне нужно что-то... живое. Чтобы клиенты чувствовали доверие с первой секунды.", mood: "angry" },
      { type: "dialogue", character: "player", text: "Борис, можно задать несколько вопросов? Мне важно понять, что именно не так.", mood: "neutral" },
      { type: "dialogue", character: "client", text: "Ну, давай...", mood: "neutral" },
      {
        type: "choice",
        character: "player",
        text: "Какой вопрос поможет понять клиента?",
        choices: [
          { text: "Покажите мне 3 сайта, которые вам нравятся — не обязательно в вашей сфере", consequence: "Борис показывает Apple, Notion и Airbnb. Всё чистое, минималистичное, с большими фото.", xp: 80, isGood: true },
          { text: "Опишите вашего идеального клиента", consequence: "Полезно, но это маркетинг, а не дизайн. Борис говорит общими словами.", xp: 40, isGood: false },
          { text: "Какой у вас любимый цвет?", consequence: "Борис раздражён — он платит за экспертизу, а не за детский вопрос.", xp: 10, isGood: false },
        ],
      },
      { type: "dialogue", character: "colleague", text: "О, я вижу! Он хочет whitespace, крупную типографику и живые фото. Ничего лишнего.", mood: "excited" },
      { type: "dialogue", character: "player", text: "Борис, а ваши предыдущие версии — там было много элементов, цветов и иконок. Это отличается от того, что вы показали.", mood: "thinking" },
      { type: "dialogue", character: "client", text: "Именно! Почему сразу нельзя было так объяснить? Мне нужна простота и воздух. Как на тех примерах.", mood: "happy" },
      {
        type: "choice",
        character: "player",
        text: "Что делаешь дальше?",
        choices: [
          { text: "Делаю быстрый прототип прямо сейчас и показываю через 2 часа", consequence: "Борис в восторге! Простой экран с одним фото и двумя строчками текста — то, что надо.", xp: 70, isGood: true },
          { text: "Ухожу домой, нужен свежий взгляд завтра", consequence: "Завтра не хватает времени внести правки перед презентацией.", xp: 20, isGood: false },
          { text: "Прошу перенести дедлайн", consequence: "Борис отказывает — у него своя встреча с инвесторами.", xp: 10, isGood: false },
        ],
      },
      { type: "result", text: "✨ Ты задал правильные вопросы вместо того, чтобы угадывать! Это главный навык UX-дизайнера — слушать и понимать, а потом создавать.", xp: 220 },
    ],
  },

  // ─── ВРАЧ ─────────────────────────────────────────────────────────
  {
    id: 4,
    title: "Диагноз под давлением",
    profession: "Медицина",
    professionId: 4,
    emoji: "🩺",
    difficulty: "Хардкор",
    duration: "15 мин",
    xp: 500,
    gradient: "from-rose-400 to-red-500",
    bgLight: "bg-rose-50",
    textAccent: "text-rose-500",
    borderAccent: "border-rose-200",
    tags: ["Стрессоустойчивость", "Аналитика"],
    desc: "Скорая привезла пациента с неясными симптомами. У тебя 10 минут — и ты единственный врач в приёмном покое.",
    setting: "🏥 Приёмный покой больницы, 23:40. За окном дождь",
    characters: [
      { id: "player", name: "Ты", role: "Врач-дежурант", avatar: "🧑‍⚕️", color: "#10b981", side: "right" },
      { id: "nurse", name: "Алла", role: "Медсестра", avatar: "👩‍⚕️", color: "#3b82f6", side: "left" },
      { id: "patient", name: "Николай", role: "Пациент, 54 года", avatar: "🤒", color: "#f59e0b", side: "left" },
    ],
    steps: [
      { type: "dialogue", character: "nurse", text: "Доктор, скорая! Мужчина, 54 года. Сильная боль в груди, отдаёт в левую руку. Бледный, потливый. АД 90/60.", mood: "worried" },
      { type: "dialogue", character: "patient", text: "Мне... очень плохо... давит в груди... уже минут 20...", mood: "worried" },
      {
        type: "choice",
        character: "player",
        text: "Первые действия:",
        choices: [
          { text: "ЭКГ немедленно + аспирин 325мг + кислород + вызвать кардиолога", consequence: "Правильный протокол ОИМ! ЭКГ показывает подъём ST в отведениях II, III, aVF.", xp: 150, isGood: true },
          { text: "Отправить на общий анализ крови и ждать результатов", consequence: "Критическое промедление! Медсестра подсказывает — нужна ЭКГ прямо сейчас.", xp: 20, isGood: false },
          { text: "Дать обезболивающее и наблюдать", consequence: "Обезболивание без диагноза опасно. Состояние ухудшается.", xp: 30, isGood: false },
        ],
      },
      { type: "dialogue", character: "nurse", text: "ЭКГ готова! Подъём ST в II, III, aVF. Это задний инфаркт?", mood: "worried" },
      { type: "dialogue", character: "player", text: "Да. Нижний ОИМ. Время — критично. Нужна реперфузия.", mood: "thinking" },
      {
        type: "choice",
        character: "player",
        text: "Дальнейшая тактика:",
        choices: [
          { text: "Тромболизис здесь + срочный перевод в кардиологию для ЧКВ", consequence: "Верно! Время от симптомов — 20 мин, тромболизис показан. Заполняешь направление.", xp: 120, isGood: true },
          { text: "Ждать кардиолога и ничего не делать", consequence: "Каждая минута — гибель клеток миокарда. Кардиолог будет через 40 минут.", xp: 10, isGood: false },
          { text: "Просто наблюдать, может само пройдёт", consequence: "Медсестра Алла в ужасе. Это недопустимо при ОИМ.", xp: 0, isGood: false },
        ],
      },
      { type: "dialogue", character: "patient", text: "Доктор... мне чуть лучше... что со мной?", mood: "neutral" },
      { type: "dialogue", character: "player", text: "Николай, у вас инфаркт. Но вы попали вовремя. Мы вас везём в кардиологию — там снимут блокаду артерии. Держитесь.", mood: "neutral" },
      { type: "dialogue", character: "patient", text: "Спасибо... я так испугался...", mood: "happy" },
      { type: "result", text: "❤️ Ты спас жизнь. Быстрое распознавание ОИМ, правильный протокол и поддержка пациента — всё это признаки отличного врача. Николай выйдет из больницы через неделю.", xp: 500 },
    ],
  },

  // ─── ПРОДАКТ ──────────────────────────────────────────────────────
  {
    id: 5,
    title: "Запуск продукта",
    profession: "Продуктовый менеджмент",
    professionId: 5,
    emoji: "🚀",
    difficulty: "Средне",
    duration: "12 мин",
    xp: 350,
    gradient: "from-orange-400 to-pink-500",
    bgLight: "bg-orange-50",
    textAccent: "text-orange-500",
    borderAccent: "border-orange-200",
    tags: ["Стратегия", "Решения"],
    desc: "До запуска 3 дня. QA нашёл критический баг, маркетинг требует фичу, а инвесторы смотрят.",
    setting: "🚀 Стартап «Zeta App». До запуска — 72 часа",
    characters: [
      { id: "player", name: "Ты", role: "Product Manager", avatar: "🧑‍💼", color: "#f97316", side: "right" },
      { id: "qa", name: "Антон", role: "QA Engineer", avatar: "🧑‍🔬", color: "#10b981", side: "left" },
      { id: "marketing", name: "Света", role: "Head of Marketing", avatar: "👩‍💼", color: "#ec4899", side: "left" },
    ],
    steps: [
      { type: "dialogue", character: "qa", text: "Плохие новости. Нашёл баг — при оплате через Samsung Pay приложение крашится. Это 15% наших потенциальных пользователей.", mood: "worried" },
      { type: "dialogue", character: "marketing", text: "Ой, ещё не вовремя. Я хотела попросить добавить фичу — push-уведомления о скидках. Конкуренты уже запустили!", mood: "excited" },
      {
        type: "choice",
        character: "player",
        text: "Как расставишь приоритеты?",
        choices: [
          { text: "Чиним баг с оплатой — откладываем пуши до следующего релиза", consequence: "Правильный приоритет! Крашинг при оплате = потеря выручки. Команда фокусируется на фиксе.", xp: 100, isGood: true },
          { text: "Делаем пуши — они важнее для роста", consequence: "Антон предупреждает: 15% не смогут заплатить на старте. Отзывы в App Store будут плохими.", xp: 20, isGood: false },
          { text: "Откладываем запуск на неделю — починим всё", consequence: "Инвесторы недовольны. Маркетинговая кампания уже запущена.", xp: 40, isGood: false },
        ],
      },
      { type: "dialogue", character: "qa", text: "Починили! Но потребовалось 36 часов. До запуска остался 1 день. Тестировать полностью не успеем.", mood: "worried" },
      {
        type: "choice",
        character: "player",
        text: "Запускаешься завтра или нет?",
        choices: [
          { text: "Да, запускаемся — критические сценарии протестированы, остальное hotfix'ами", consequence: "Грамотное решение! Запуск прошёл. 2 мелких бага появились, но быстро пофиксили.", xp: 120, isGood: true },
          { text: "Нет, откладываем ещё на 3 дня", consequence: "Журналисты уже написали о запуске. Отмена портит репутацию.", xp: 30, isGood: false },
        ],
      },
      { type: "dialogue", character: "marketing", text: "Мы в App Store! 500 установок за первый час! Это успех!", mood: "excited" },
      { type: "result", text: "🚀 Ты принял верные решения под давлением. Приоритет критических ошибок над новыми фичами — золотое правило Product Management.", xp: 350 },
    ],
  },

  // ─── ЖУРНАЛИСТ ────────────────────────────────────────────────────
  {
    id: 6,
    title: "Репортаж за ночь",
    profession: "Журналистика",
    professionId: 6,
    emoji: "📰",
    difficulty: "Средне",
    duration: "12 мин",
    xp: 300,
    gradient: "from-slate-500 to-gray-700",
    bgLight: "bg-slate-50",
    textAccent: "text-slate-600",
    borderAccent: "border-slate-200",
    tags: ["Коммуникация", "Этика"],
    desc: "Тебе позвонил источник с информацией о коррупции. До выхода номера — 4 часа. Успеешь проверить?",
    setting: "📰 Редакция «Городские новости», 22:00. Завтра в 6 утра — печать",
    characters: [
      { id: "player", name: "Ты", role: "Репортёр", avatar: "🧑‍💻", color: "#475569", side: "right" },
      { id: "editor", name: "Игорь", role: "Главный редактор", avatar: "👨‍💼", color: "#f59e0b", side: "left" },
      { id: "source", name: "Аноним", role: "Источник", avatar: "🕵️", color: "#6b7280", side: "left" },
    ],
    steps: [
      { type: "dialogue", character: "source", text: "Слушай внимательно. У меня есть документы — мэр получал откаты при застройке парка. Суммы огромные. Но я не могу светиться.", mood: "worried" },
      { type: "dialogue", character: "player", text: "Я вас слышу. Можете прислать документы? Мне нужно их проверить перед публикацией.", mood: "thinking" },
      { type: "dialogue", character: "source", text: "Документы пришлю. Но если вы не опубликуете до утра — меня уволят и всё замнут.", mood: "worried" },
      {
        type: "choice",
        character: "player",
        text: "Что делаешь с информацией?",
        choices: [
          { text: "Жду документы, ищу второй независимый источник подтверждения", consequence: "Профессионально! Один источник — не публикация. Находишь второго свидетеля.", xp: 100, isGood: true },
          { text: "Публикую сразу — источник заслуживает доверия", consequence: "Редактор останавливает тебя. Без верификации — это потенциальный иск о клевете.", xp: 10, isGood: false },
          { text: "Отказываюсь — слишком рискованно", consequence: "История уходит в другое издание. Редактор разочарован упущенным эксклюзивом.", xp: 20, isGood: false },
        ],
      },
      { type: "dialogue", character: "editor", text: "Нашёл второй источник?", mood: "neutral" },
      { type: "dialogue", character: "player", text: "Да! Бывший замначальника строительного отдела готов говорить. Документы совпадают.", mood: "excited" },
      { type: "dialogue", character: "editor", text: "Хорошо. Но прежде чем публиковать — нужно дать мэру право на ответ. Это обязательно.", mood: "neutral" },
      {
        type: "choice",
        character: "player",
        text: "Звонишь мэру за 2 часа до печати?",
        choices: [
          { text: "Да, звоню пресс-службе — они должны получить возможность ответить", consequence: "Пресс-служба отвечает «без комментариев». Ты публикуешь с этой пометкой — всё по закону.", xp: 80, isGood: true },
          { text: "Нет — они могут попробовать остановить публикацию через суд", consequence: "Редактор объясняет: это нарушает журналистские стандарты и повышает риск иска.", xp: 20, isGood: false },
        ],
      },
      { type: "result", text: "📰 Настоящий журналист! Ты верифицировал информацию, защитил источник и дал право на ответ. Материал вышел — и стал главной темой дня.", xp: 300 },
    ],
  },

  // ─── УЧИТЕЛЬ ──────────────────────────────────────────────────────
  {
    id: 7,
    title: "Сложный урок",
    profession: "Педагогика",
    professionId: 7,
    emoji: "📚",
    difficulty: "Старт",
    duration: "10 мин",
    xp: 240,
    gradient: "from-teal-400 to-emerald-600",
    bgLight: "bg-teal-50",
    textAccent: "text-teal-600",
    borderAccent: "border-teal-200",
    tags: ["Коммуникация", "Творчество"],
    desc: "9-й класс, последний урок пятницы. Тема — квадратные уравнения. Половина класса не понимает, один ученик мешает всем.",
    setting: "🏫 Школа №47, кабинет математики. Пятница, 5-й урок, 13:40",
    characters: [
      { id: "player", name: "Ты", role: "Учитель математики", avatar: "🧑‍🏫", color: "#0d9488", side: "right" },
      { id: "student_bad", name: "Максим", role: "Ученик, мешает уроку", avatar: "😤", color: "#f59e0b", side: "left" },
      { id: "student_good", name: "Настя", role: "Ученица, не понимает", avatar: "😕", color: "#8b5cf6", side: "left" },
    ],
    steps: [
      { type: "dialogue", character: "student_bad", text: "Эй, ну зачем нам эта математика? Я никогда в жизни не буду решать квадратные уравнения!", mood: "angry" },
      { type: "dialogue", character: "student_good", text: "Я три раза перечитала параграф и всё равно не понимаю, где взять «х»... Мне, наверное, не дано...", mood: "worried" },
      {
        type: "choice",
        character: "player",
        text: "Как реагируешь на Максима?",
        choices: [
          { text: "Привести реальный пример: «Максим, ты знаешь как рассчитать скидку на телефон? Это и есть уравнение»", consequence: "Максим замолкает и даже начинает слушать — теперь он видит смысл.", xp: 80, isGood: true },
          { text: "Строго: «Максим, замолчи и пиши»", consequence: "Максим замолкает, но обидится. Остаток урока будет напряжённым.", xp: 20, isGood: false },
          { text: "Игнорировать вопрос и продолжать урок", consequence: "Максим повторяет вопрос громче. Класс начинает смеяться.", xp: 10, isGood: false },
        ],
      },
      { type: "dialogue", character: "student_good", text: "Я тоже не понимаю... Вы объясняете слишком быстро. Можно ещё раз, но по-другому?", mood: "worried" },
      {
        type: "choice",
        character: "player",
        text: "Как объяснишь Насте квадратное уравнение?",
        choices: [
          { text: "Нарисую на доске: x² — это площадь квадрата со стороной x. Уравнение — это загадка о размере квадрата", consequence: "Настя вскрикивает: «О! Теперь понятно!» Ещё трое тянут руки.", xp: 90, isGood: true },
          { text: "Повторю ту же объяснение с формулой чуть медленнее", consequence: "Настя всё ещё не понимает. Нужен другой подход.", xp: 30, isGood: false },
          { text: "Скажу: «Прочитайте учебник дома»", consequence: "Настя расстраивается. Класс теряет интерес к уроку.", xp: 10, isGood: false },
        ],
      },
      { type: "dialogue", character: "student_bad", text: "Хм... А если скидка 20% с 5990 рублей, как посчитать? Это тоже через x?", mood: "thinking" },
      { type: "dialogue", character: "player", text: "Именно! Давай решим прямо сейчас. Выходи к доске — покажешь классу.", mood: "happy" },
      { type: "dialogue", character: "student_bad", text: "Я?! Ладно... попробую...", mood: "neutral" },
      { type: "result", text: "🍎 Ты превратил скучный урок в живой! Нашёл подход к нарушителю и помог тому, кто не понимал. Именно за это любят учителей.", xp: 240 },
    ],
  },

  // ─── ПРЕДПРИНИМАТЕЛЬ ──────────────────────────────────────────────
  {
    id: 8,
    title: "Питч инвесторам",
    profession: "Предпринимательство",
    professionId: 8,
    emoji: "💼",
    difficulty: "Хардкор",
    duration: "15 мин",
    xp: 450,
    gradient: "from-amber-400 to-yellow-500",
    bgLight: "bg-amber-50",
    textAccent: "text-amber-600",
    borderAccent: "border-amber-200",
    tags: ["Коммуникация", "Бизнес"],
    desc: "5 минут чтобы убедить венчурный фонд вложить 10 миллионов. Они уже отказали 12 стартапам до тебя.",
    setting: "💼 Переговорная комната фонда «Horizon Capital». Всё ставки на кон",
    characters: [
      { id: "player", name: "Ты", role: "Founder & CEO", avatar: "🧑‍💼", color: "#d97706", side: "right" },
      { id: "investor1", name: "Наталья", role: "Партнёр фонда", avatar: "👩‍💼", color: "#6b7280", side: "left" },
      { id: "investor2", name: "Павел", role: "Аналитик фонда", avatar: "👨‍💻", color: "#3b82f6", side: "left" },
    ],
    steps: [
      { type: "dialogue", character: "investor1", text: "У вас 5 минут. Начинайте. Мы видели уже сотни таких презентаций.", mood: "neutral" },
      {
        type: "choice",
        character: "player",
        text: "С чего начинаешь питч?",
        choices: [
          { text: "«Каждый третий человек в России не может найти врача в своём городе. Мы решили это.»", consequence: "Наталья выпрямляется — сильное открытие с конкретной болью. Ты привлёк внимание.", xp: 100, isGood: true },
          { text: "Начинаю с названия компании и нашей миссии", consequence: "Павел зевает. Они слышали тысячи миссий. Нужна конкретная боль.", xp: 20, isGood: false },
          { text: "Сразу показываю финансовые прогнозы", consequence: "Наталья останавливает: «Подождите, мы ещё не поняли что вы делаете».", xp: 30, isGood: false },
        ],
      },
      { type: "dialogue", character: "investor2", text: "Звучит интересно. Но рынок телемедицины переполнен. Чем вы отличаетесь от DocDoc и СберЗдоровья?", mood: "neutral" },
      {
        type: "choice",
        character: "player",
        text: "Как отвечаешь на вопрос о конкурентах?",
        choices: [
          { text: "Мы единственные, кто работает с малыми городами — DocDoc есть только в 15 городах, мы уже в 200", consequence: "Отличный ответ! Конкретная дифференциация с данными.", xp: 90, isGood: true },
          { text: "У нас лучшее качество сервиса", consequence: "Павел спрашивает: «Что значит «лучший»? Дайте метрики».", xp: 20, isGood: false },
          { text: "Конкуренты нам не страшны — рынок большой", consequence: "Наталья скептически смотрит — это не ответ на вопрос.", xp: 10, isGood: false },
        ],
      },
      { type: "dialogue", character: "investor1", text: "Хорошо. Какие у вас цифры? Выручка, рост, удержание?", mood: "neutral" },
      { type: "dialogue", character: "player", text: "2.3 млн выручки за последние 6 месяцев. Рост 40% месяц к месяцу. Удержание 78% — выше, чем у лидеров рынка.", mood: "excited" },
      { type: "dialogue", character: "investor2", text: "Хм... Это сильные цифры для вашей стадии.", mood: "thinking" },
      {
        type: "choice",
        character: "player",
        text: "Как закрываешь питч?",
        choices: [
          { text: "«Мы ищем партнёра, не просто деньги. Вот наш план использования 10 млн — 60% на рост, 40% на продукт»", consequence: "Наталья кивает. Конкретика + уважение к их роли = сильный финал.", xp: 80, isGood: true },
          { text: "«Вложите сейчас или пожалеете»", consequence: "Наталья улыбается, но холодно. Давление инвесторам не нравится.", xp: 10, isGood: false },
          { text: "«Больше добавить нечего — задавайте вопросы»", consequence: "Слабый финал. Упущена возможность закрыть сделку.", xp: 30, isGood: false },
        ],
      },
      { type: "result", text: "💰 Наталья говорит: «Пришлите нам term sheet — мы готовы обсуждать». Ты пробился туда, куда не попали 12 стартапов до тебя!", xp: 450 },
    ],
  },
];

export const professionsData = [
  {
    id: 1, title: "Разработчик ПО", category: "IT",
    match: 94, emoji: "💻", difficulty: "Средняя",
    tags: ["Логика", "Технологии", "Удалёнка"],
    desc: "Создаёт программы, приложения и сайты. Высокий спрос на рынке.",
    salary: "120–250 тыс.", color: "#8b5cf6", bg: "bg-violet-50", border: "border-violet-200",
  },
  {
    id: 2, title: "Data Scientist", category: "IT",
    match: 87, emoji: "📊", difficulty: "Высокая",
    tags: ["Математика", "ИИ", "Аналитика"],
    desc: "Анализирует большие данные и строит модели машинного обучения.",
    salary: "150–350 тыс.", color: "#3b82f6", bg: "bg-blue-50", border: "border-blue-200",
  },
  {
    id: 3, title: "UX/UI Дизайнер", category: "Творчество",
    match: 81, emoji: "🎨", difficulty: "Средняя",
    tags: ["Дизайн", "Психология", "Продукт"],
    desc: "Проектирует удобные интерфейсы и красивые визуальные решения.",
    salary: "90–200 тыс.", color: "#ec4899", bg: "bg-pink-50", border: "border-pink-200",
  },
  {
    id: 4, title: "Врач-терапевт", category: "Медицина",
    match: 62, emoji: "🩺", difficulty: "Очень высокая",
    tags: ["Биология", "Коммуникация", "Стрессоустойчивость"],
    desc: "Диагностирует и лечит заболевания, ведёт пациентов.",
    salary: "60–180 тыс.", color: "#10b981", bg: "bg-emerald-50", border: "border-emerald-200",
  },
  {
    id: 5, title: "Продуктовый менеджер", category: "Бизнес",
    match: 78, emoji: "🚀", difficulty: "Средняя",
    tags: ["Стратегия", "Коммуникация", "Аналитика"],
    desc: "Управляет разработкой продукта, соединяет бизнес и технологии.",
    salary: "130–280 тыс.", color: "#f97316", bg: "bg-orange-50", border: "border-orange-200",
  },
  {
    id: 6, title: "Журналист", category: "Творчество",
    match: 71, emoji: "📰", difficulty: "Средняя",
    tags: ["Коммуникация", "Аналитика", "Этика"],
    desc: "Находит и рассказывает важные истории, формирует общественное мнение.",
    salary: "50–150 тыс.", color: "#475569", bg: "bg-slate-50", border: "border-slate-200",
  },
  {
    id: 7, title: "Учитель", category: "Образование",
    match: 68, emoji: "📚", difficulty: "Средняя",
    tags: ["Коммуникация", "Творчество", "Терпение"],
    desc: "Передаёт знания и вдохновляет учеников. Одна из самых важных профессий.",
    salary: "40–120 тыс.", color: "#0d9488", bg: "bg-teal-50", border: "border-teal-200",
  },
  {
    id: 8, title: "Предприниматель", category: "Бизнес",
    match: 74, emoji: "💼", difficulty: "Высокая",
    tags: ["Лидерство", "Риск", "Коммуникация"],
    desc: "Создаёт компании с нуля, решает проблемы через бизнес.",
    salary: "0–∞", color: "#d97706", bg: "bg-amber-50", border: "border-amber-200",
  },
];
