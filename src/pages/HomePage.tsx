import Icon from "@/components/ui/icon";

const stats = [
  { label: "Тестов пройдено", value: "12", icon: "CheckCircle", color: "#10b981", bg: "bg-emerald-50" },
  { label: "Профессий изучено", value: "8", icon: "Briefcase", color: "#8b5cf6", bg: "bg-violet-50" },
  { label: "Очки опыта", value: "2450", icon: "Star", color: "#f59e0b", bg: "bg-amber-50" },
  { label: "Место в рейтинге", value: "#14", icon: "Trophy", color: "#3b82f6", bg: "bg-blue-50" },
];

const achievements = [
  { title: "Первооткрыватель", desc: "Прошёл первый тест", icon: "🚀", unlocked: true },
  { title: "Аналитик", desc: "Изучил 5 профессий", icon: "🔬", unlocked: true },
  { title: "Стратег", desc: "Завершил 3 сценария", icon: "♟️", unlocked: true },
  { title: "Чемпион", desc: "Попал в топ-10", icon: "🏆", unlocked: false },
  { title: "Мастер", desc: "Достиг 10 уровня", icon: "⚡", unlocked: false },
  { title: "Легенда", desc: "5000 XP набрано", icon: "👑", unlocked: false },
];

const recentTests = [
  { name: "Тест на логическое мышление", score: 87, date: "3 дня назад", xp: "+120 XP" },
  { name: "Анализ типа личности", score: 94, date: "5 дней назад", xp: "+200 XP" },
  { name: "Технические способности", score: 72, date: "неделю назад", xp: "+90 XP" },
];

const profSkills = [
  { name: "Аналитика", percent: 78, color: "#8b5cf6", track: "bg-violet-100" },
  { name: "Коммуникация", percent: 55, color: "#ec4899", track: "bg-pink-100" },
  { name: "Технические навыки", percent: 88, color: "#3b82f6", track: "bg-blue-100" },
  { name: "Творчество", percent: 63, color: "#f59e0b", track: "bg-amber-100" },
  { name: "Лидерство", percent: 41, color: "#10b981", track: "bg-emerald-100" },
];

export default function HomePage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">👋</span>
          <p className="text-gray-500 font-body text-sm">Добро пожаловать обратно,</p>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
          Александр<span style={{ color: '#8b5cf6' }}>.</span>
        </h1>
        <p className="text-gray-400 font-body mt-2 text-sm">
          Уровень 7 · Исследователь · Ты на пути к своей идеальной профессии
        </p>
      </div>

      {/* XP progress */}
      <div className="card-game p-5 mb-6 animate-fade-in-up delay-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-display text-xs text-gray-400 uppercase tracking-wider">Прогресс уровня</span>
            <p className="font-display text-xl font-bold text-gray-900 mt-0.5">
              Уровень <span style={{ color: '#8b5cf6' }}>7</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-bold" style={{ color: '#f59e0b' }}>2450 XP</p>
            <p className="text-xs text-gray-400">из 4000 XP</p>
          </div>
        </div>
        <div className="xp-bar" style={{ height: '12px' }}>
          <div className="xp-bar-fill" style={{ width: '61%' }} />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">Уровень 7</span>
          <span className="text-xs font-semibold" style={{ color: '#8b5cf6' }}>1550 XP до уровня 8 →</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={stat.label} className="card-game p-4 animate-fade-in-up" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${stat.bg}`}>
              <Icon name={stat.icon} size={18} style={{ color: stat.color }} />
            </div>
            <p className="font-display text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-400 font-body mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card-game p-5 animate-fade-in-up delay-300">
          <h3 className="font-display text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="BarChart2" size={16} style={{ color: '#8b5cf6' }} />
            Профиль навыков
          </h3>
          <div className="space-y-3">
            {profSkills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500 font-body">{skill.name}</span>
                  <span className="text-xs font-bold font-display" style={{ color: skill.color }}>{skill.percent}%</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${skill.track}`}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${skill.percent}%`, background: skill.color, transitionDelay: `${i * 0.1}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-game p-5 animate-fade-in-up delay-400">
          <h3 className="font-display text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="Award" size={16} style={{ color: '#f59e0b' }} />
            Достижения
            <span className="badge-xp ml-auto">3/6</span>
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((ach) => (
              <div key={ach.title}
                className={`flex flex-col items-center gap-1 p-3 rounded-2xl border text-center transition-all duration-200 ${
                  ach.unlocked ? "border-violet-200 bg-violet-50 hover:bg-violet-100" : "border-gray-100 bg-gray-50 opacity-40"
                }`}>
                <span className="text-2xl">{ach.icon}</span>
                <p className="text-xs font-bold text-gray-900 font-display leading-tight">{ach.title}</p>
                <p className="text-[10px] text-gray-400 font-body leading-tight">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent tests */}
      <div className="card-game p-5 animate-fade-in-up delay-500">
        <h3 className="font-display text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="Clock" size={16} style={{ color: '#3b82f6' }} />
          Последние тесты
        </h3>
        <div className="space-y-2">
          {recentTests.map((test) => {
            const sc = test.score >= 85 ? '#10b981' : test.score >= 70 ? '#f59e0b' : '#8b5cf6';
            const bg = test.score >= 85 ? 'bg-emerald-50' : test.score >= 70 ? 'bg-amber-50' : 'bg-violet-50';
            return (
              <div key={test.name}
                className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 hover:bg-violet-50 transition-all duration-200 cursor-pointer group border border-transparent hover:border-violet-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                  <span className="font-display text-xs font-bold" style={{ color: sc }}>{test.score}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 font-body truncate">{test.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{test.date}</p>
                </div>
                <span className="badge-xp shrink-0">{test.xp}</span>
                <Icon name="ChevronRight" size={16} className="text-gray-300 group-hover:text-violet-400 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
