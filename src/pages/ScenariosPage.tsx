import { useState } from "react";
import Icon from "@/components/ui/icon";

const scenarios = [
  {
    id: 1,
    title: "День из жизни разработчика",
    profession: "IT-разработка",
    emoji: "💻",
    difficulty: "Старт",
    duration: "15 мин",
    xp: 200,
    progress: 100,
    completed: true,
    gradient: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
    textAccent: "text-violet-600",
    borderAccent: "border-violet-200",
    tags: ["Логика", "Командная работа"],
    desc: "Ты ведущий разработчик в стартапе. Надо решить баг, провести код-ревью и успеть на встречу с клиентом.",
    steps: 5,
  },
  {
    id: 2,
    title: "Запуск продукта",
    profession: "Продуктовый менеджмент",
    emoji: "🚀",
    difficulty: "Средне",
    duration: "25 мин",
    xp: 350,
    progress: 60,
    completed: false,
    gradient: "from-orange-400 to-pink-500",
    bgLight: "bg-orange-50",
    textAccent: "text-orange-500",
    borderAccent: "border-orange-200",
    tags: ["Стратегия", "Решения"],
    desc: "Ты PM в крупной компании. До запуска 3 дня, QA нашёл критический баг, а маркетинг требует фичу. Что делать?",
    steps: 6,
  },
  {
    id: 3,
    title: "Диагноз под давлением",
    profession: "Медицина",
    emoji: "🩺",
    difficulty: "Хардкор",
    duration: "30 мин",
    xp: 500,
    progress: 0,
    completed: false,
    gradient: "from-rose-400 to-red-500",
    bgLight: "bg-rose-50",
    textAccent: "text-rose-500",
    borderAccent: "border-rose-200",
    tags: ["Стрессоустойчивость", "Аналитика"],
    desc: "Скорая привезла пациента с неясными симптомами. У тебя 10 минут, чтобы поставить предварительный диагноз.",
    steps: 7,
  },
  {
    id: 4,
    title: "Анализ данных",
    profession: "Data Science",
    emoji: "📊",
    difficulty: "Средне",
    duration: "20 мин",
    xp: 280,
    progress: 0,
    completed: false,
    gradient: "from-sky-400 to-blue-600",
    bgLight: "bg-sky-50",
    textAccent: "text-sky-600",
    borderAccent: "border-sky-200",
    tags: ["Математика", "Аналитика"],
    desc: "Клиент хочет понять, почему упали продажи. В твоём распоряжении — сырой датасет за 6 месяцев.",
    steps: 5,
  },
  {
    id: 5,
    title: "Питч инвесторам",
    profession: "Предпринимательство",
    emoji: "💼",
    difficulty: "Хардкор",
    duration: "35 мин",
    xp: 450,
    progress: 0,
    completed: false,
    gradient: "from-amber-400 to-yellow-500",
    bgLight: "bg-amber-50",
    textAccent: "text-amber-600",
    borderAccent: "border-amber-200",
    tags: ["Коммуникация", "Бизнес"],
    desc: "Тебе дали 5 минут на питч перед венчурным фондом. Убеди их инвестировать в твой стартап.",
    steps: 4,
  },
  {
    id: 6,
    title: "Творческий кризис",
    profession: "UX/UI Дизайн",
    emoji: "🎨",
    difficulty: "Старт",
    duration: "20 мин",
    xp: 220,
    progress: 0,
    completed: false,
    gradient: "from-fuchsia-400 to-pink-500",
    bgLight: "bg-fuchsia-50",
    textAccent: "text-fuchsia-600",
    borderAccent: "border-fuchsia-200",
    tags: ["Творчество", "Эмпатия"],
    desc: "Клиент отверг три концепции дизайна. Нужно понять его реальные потребности и создать четвёртую.",
    steps: 4,
  },
];

const difficultyConfig: Record<string, { label: string; bg: string; text: string }> = {
  "Старт": { label: "Старт 🌱", bg: "bg-emerald-100", text: "text-emerald-700" },
  "Средне": { label: "Средне 🔥", bg: "bg-orange-100", text: "text-orange-700" },
  "Хардкор": { label: "Хардкор 💀", bg: "bg-red-100", text: "text-red-700" },
};

export default function ScenariosPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState("Все");

  const filters = ["Все", "Старт", "Средне", "Хардкор"];
  const completedCount = scenarios.filter((s) => s.completed).length;
  const inProgressCount = scenarios.filter((s) => s.progress > 0 && !s.completed).length;

  const filtered = scenarios.filter(
    (s) => filter === "Все" || s.difficulty === filter
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f8f7ff", fontFamily: "'Golos Text', sans-serif" }}
    >
      {/* Hero header */}
      <div className="relative overflow-hidden px-6 pt-10 pb-8 md:px-10">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% -10%, rgba(139,92,246,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(251,146,60,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🗺️</span>
              <h1
                style={{ fontFamily: "'Unbounded', sans-serif" }}
                className="text-2xl md:text-3xl font-black text-gray-900 leading-none"
              >
                Сценарии
              </h1>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Проживи рабочий день в профессии своей мечты
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100">
            <span className="text-lg">⚡</span>
            <div>
              <p className="text-xs text-gray-400 leading-none">Твой XP</p>
              <p className="font-black text-violet-600 text-sm" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                2450
              </p>
            </div>
          </div>
        </div>

        {/* Stats pills */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-emerald-600" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-lg leading-none">{completedCount}</p>
              <p className="text-xs text-gray-400">Пройдено</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
              <Icon name="Play" size={16} className="text-orange-500" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-lg leading-none">{inProgressCount}</p>
              <p className="text-xs text-gray-400">В процессе</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
              <Icon name="Lock" size={16} className="text-violet-500" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-lg leading-none">
                {scenarios.length - completedCount - inProgressCount}
              </p>
              <p className="text-xs text-gray-400">Доступно</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 md:px-10 mb-6">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                filter === f
                  ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-violet-300 hover:text-violet-600"
              }`}
              style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "11px" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="px-6 md:px-10 pb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((scenario, i) => {
          const isSelected = selectedId === scenario.id;
          const diff = difficultyConfig[scenario.difficulty];

          return (
            <div
              key={scenario.id}
              onClick={() => setSelectedId(isSelected ? null : scenario.id)}
              className={`bg-white rounded-3xl border-2 cursor-pointer transition-all duration-300 overflow-hidden animate-fade-in-up ${
                isSelected ? scenario.borderAccent + " shadow-xl" : "border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1"
              }`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Gradient top strip */}
              <div className={`h-2 w-full bg-gradient-to-r ${scenario.gradient}`} />

              <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${scenario.bgLight}`}
                  >
                    {scenario.emoji}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    {scenario.completed && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                        <Icon name="CheckCircle" size={10} />
                        Пройден
                      </span>
                    )}
                    {scenario.progress > 0 && !scenario.completed && (
                      <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-[11px] font-bold">
                        {scenario.progress}% готово
                      </span>
                    )}
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${diff.bg} ${diff.text}`}>
                      {diff.label}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-gray-900 font-black text-base mb-1 leading-tight"
                  style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "14px" }}
                >
                  {scenario.title}
                </h3>
                <p className={`text-xs font-bold mb-2 ${scenario.textAccent}`}>{scenario.profession}</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{scenario.desc}</p>

                {/* Progress bar */}
                {scenario.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
                      <span>Прогресс</span>
                      <span className={`font-bold ${scenario.textAccent}`}>{scenario.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${scenario.gradient} transition-all duration-700`}
                        style={{ width: `${scenario.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {scenario.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${scenario.borderAccent} ${scenario.textAccent} ${scenario.bgLight}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Icon name="Clock" size={12} />
                      {scenario.duration}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Icon name="List" size={12} />
                      {scenario.steps} шагов
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${scenario.bgLight} ${scenario.textAccent}`}
                  >
                    +{scenario.xp} XP
                  </span>
                </div>

                {/* Expanded */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in-up">
                    <p className="text-gray-600 text-xs leading-relaxed mb-4">{scenario.desc}</p>
                    <button
                      className={`w-full py-3 rounded-2xl font-black text-white text-sm transition-all duration-200 bg-gradient-to-r ${scenario.gradient} shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`}
                      style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "12px" }}
                    >
                      {scenario.completed
                        ? "Пройти заново 🔄"
                        : scenario.progress > 0
                        ? "Продолжить →"
                        : "Начать сценарий →"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
