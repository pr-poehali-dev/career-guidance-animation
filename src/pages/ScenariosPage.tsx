import { useState } from "react";
import Icon from "@/components/ui/icon";

const scenarios = [
  {
    id: 1,
    title: "День из жизни разработчика",
    profession: "IT-разработка",
    emoji: "💻",
    difficulty: "Начальный",
    duration: "15 мин",
    xp: 200,
    progress: 100,
    completed: true,
    color: "#00ff88",
    tags: ["Логика", "Командная работа"],
    desc: "Ты ведущий разработчик в стартапе. Надо решить баг, провести код-ревью и успеть на встречу с клиентом."
  },
  {
    id: 2,
    title: "Запуск продукта",
    profession: "Продуктовый менеджмент",
    emoji: "🚀",
    difficulty: "Средний",
    duration: "25 мин",
    xp: 350,
    progress: 60,
    completed: false,
    color: "#a855f7",
    tags: ["Стратегия", "Принятие решений"],
    desc: "Ты PM в крупной компании. До запуска 3 дня, QA нашёл критический баг, а маркетинг требует фичу. Что делать?"
  },
  {
    id: 3,
    title: "Диагноз под давлением",
    profession: "Медицина",
    emoji: "🩺",
    difficulty: "Сложный",
    duration: "30 мин",
    xp: 500,
    progress: 0,
    completed: false,
    color: "#f472b6",
    tags: ["Стрессоустойчивость", "Аналитика"],
    desc: "Скорая привезла пациента с неясными симптомами. У тебя 10 минут чтобы поставить предварительный диагноз."
  },
  {
    id: 4,
    title: "Анализ данных в реальном времени",
    profession: "Data Science",
    emoji: "📊",
    difficulty: "Средний",
    duration: "20 мин",
    xp: 280,
    progress: 0,
    completed: false,
    color: "#38bdf8",
    tags: ["Математика", "Аналитика"],
    desc: "Клиент хочет понять, почему упали продажи. В твоём распоряжении — сырой датасет за 6 месяцев."
  },
  {
    id: 5,
    title: "Презентация инвесторам",
    profession: "Предпринимательство",
    emoji: "💼",
    difficulty: "Сложный",
    duration: "35 мин",
    xp: 450,
    progress: 0,
    completed: false,
    color: "#fbbf24",
    tags: ["Коммуникация", "Бизнес"],
    desc: "Тебе дали 5 минут на питч перед венчурным фондом. Убеди их инвестировать в твой стартап."
  },
  {
    id: 6,
    title: "Творческий кризис",
    profession: "UX/UI Дизайн",
    emoji: "🎨",
    difficulty: "Начальный",
    duration: "20 мин",
    xp: 220,
    progress: 0,
    completed: false,
    color: "#f472b6",
    tags: ["Творчество", "Эмпатия"],
    desc: "Клиент отверг три концепции дизайна. Нужно понять его реальные потребности и создать четвёртую."
  },
];

const difficultyColors: Record<string, string> = {
  "Начальный": "#00ff88",
  "Средний": "#fbbf24",
  "Сложный": "#f472b6",
};

export default function ScenariosPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = scenarios.find((s) => s.id === selectedId);

  const completedCount = scenarios.filter((s) => s.completed).length;
  const inProgressCount = scenarios.filter((s) => s.progress > 0 && !s.completed).length;

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
          Сценарии<span className="text-neon-blue">.</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm mt-1">
          Проживи рабочий день в любой профессии и проверь себя
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6 animate-fade-in-up delay-100">
        <div className="card-game p-4 text-center">
          <p className="font-display text-2xl font-bold text-neon-green">{completedCount}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">Завершено</p>
        </div>
        <div className="card-game p-4 text-center">
          <p className="font-display text-2xl font-bold text-neon-yellow">{inProgressCount}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">В процессе</p>
        </div>
        <div className="card-game p-4 text-center">
          <p className="font-display text-2xl font-bold text-neon-purple">{scenarios.length - completedCount - inProgressCount}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">Доступно</p>
        </div>
      </div>

      {/* Scenarios grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario, i) => (
          <div
            key={scenario.id}
            onClick={() => setSelectedId(scenario.id === selectedId ? null : scenario.id)}
            className="card-game p-5 cursor-pointer animate-fade-in-up"
            style={{
              animationDelay: `${i * 0.07}s`,
              borderColor: selectedId === scenario.id ? scenario.color : undefined,
              boxShadow: selectedId === scenario.id ? `0 0 20px ${scenario.color}30` : undefined
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{scenario.emoji}</div>
              <div className="flex flex-col items-end gap-1.5">
                {scenario.completed && (
                  <span className="badge-xp flex items-center gap-1">
                    <Icon name="CheckCircle" size={10} />
                    Пройден
                  </span>
                )}
                {scenario.progress > 0 && !scenario.completed && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full border font-body"
                    style={{ color: '#fbbf24', borderColor: 'rgba(251,191,36,0.3)' }}>
                    {scenario.progress}%
                  </span>
                )}
                <span className="text-[10px] px-2 py-0.5 rounded-full border font-body"
                  style={{
                    color: difficultyColors[scenario.difficulty],
                    borderColor: `${difficultyColors[scenario.difficulty]}44`
                  }}>
                  {scenario.difficulty}
                </span>
              </div>
            </div>

            <h3 className="font-display text-sm font-bold text-white mb-1 leading-tight">{scenario.title}</h3>
            <p className="text-[11px] text-neon-blue/80 font-body mb-2">{scenario.profession}</p>
            <p className="text-xs text-muted-foreground font-body mb-3 leading-relaxed line-clamp-2">{scenario.desc}</p>

            {/* Progress bar */}
            {scenario.progress > 0 && (
              <div className="mb-3">
                <div className="xp-bar" style={{ height: '5px' }}>
                  <div
                    className="xp-bar-fill"
                    style={{
                      width: `${scenario.progress}%`,
                      background: `linear-gradient(90deg, ${scenario.color}, ${scenario.color}99)`
                    }}
                  />
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex gap-1.5 flex-wrap mb-3">
              {scenario.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] border border-border text-muted-foreground font-body">
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  {scenario.duration}
                </span>
              </div>
              <span className="badge-xp">+{scenario.xp} XP</span>
            </div>

            {/* Expanded content */}
            {selectedId === scenario.id && (
              <div className="mt-4 pt-4 border-t border-border animate-fade-in-up">
                <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3">{scenario.desc}</p>
                <button
                  className="w-full py-2.5 rounded-xl font-display text-xs font-bold transition-all duration-200 text-black"
                  style={{
                    background: scenario.color,
                    boxShadow: `0 0 20px ${scenario.color}40`
                  }}
                >
                  {scenario.completed
                    ? "Пройти заново"
                    : scenario.progress > 0
                    ? "Продолжить"
                    : "Начать сценарий →"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
