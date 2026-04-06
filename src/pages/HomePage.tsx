import Icon from "@/components/ui/icon";

const stats = [
  { label: "Тестов пройдено", value: "12", icon: "CheckCircle", color: "#00ff88", bg: "rgba(0,255,136,0.1)" },
  { label: "Профессий изучено", value: "8", icon: "Briefcase", color: "#a855f7", bg: "rgba(168,85,247,0.1)" },
  { label: "Очки опыта", value: "2450", icon: "Star", color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
  { label: "Место в рейтинге", value: "#14", icon: "Trophy", color: "#38bdf8", bg: "rgba(56,189,248,0.1)" },
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
  { name: "Аналитика", percent: 78, color: "#00ff88" },
  { name: "Коммуникация", percent: 55, color: "#a855f7" },
  { name: "Технические навыки", percent: 88, color: "#38bdf8" },
  { name: "Творчество", percent: 63, color: "#fbbf24" },
  { name: "Лидерство", percent: 41, color: "#f472b6" },
];

export default function HomePage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Hero welcome */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">👋</span>
          <p className="text-muted-foreground font-body text-sm">Добро пожаловать обратно,</p>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
          Александр
          <span className="text-neon-green">.</span>
        </h1>
        <p className="text-muted-foreground font-body mt-2 text-sm">
          Ты на пути к своей идеальной профессии. Уровень 7 · Исследователь
        </p>
      </div>

      {/* XP progress full */}
      <div className="card-game p-5 mb-6 animate-fade-in-up delay-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-display text-xs text-muted-foreground uppercase tracking-wider">Прогресс уровня</span>
            <p className="font-display text-xl font-bold text-white mt-0.5">
              Уровень <span className="text-neon-green">7</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-bold text-neon-yellow">2450 XP</p>
            <p className="text-xs text-muted-foreground">из 4000 XP</p>
          </div>
        </div>
        <div className="xp-bar" style={{ height: '12px' }}>
          <div className="xp-bar-fill" style={{ width: '61%' }} />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">Уровень 7</span>
          <span className="text-xs text-neon-green font-semibold">1550 XP до уровня 8 →</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="card-game p-4 animate-fade-in-up"
            style={{ animationDelay: `${0.15 + i * 0.08}s` }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
              style={{ background: stat.bg }}>
              <Icon name={stat.icon} size={18} style={{ color: stat.color }} />
            </div>
            <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Skills radar */}
        <div className="card-game p-5 animate-fade-in-up delay-300">
          <h3 className="font-display text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Icon name="BarChart2" size={16} className="text-neon-green" />
            Профиль навыков
          </h3>
          <div className="space-y-3">
            {profSkills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground font-body">{skill.name}</span>
                  <span className="text-xs font-bold font-display" style={{ color: skill.color }}>
                    {skill.percent}%
                  </span>
                </div>
                <div className="xp-bar" style={{ height: '6px' }}>
                  <div
                    className="xp-bar-fill"
                    style={{
                      width: `${skill.percent}%`,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                      animationDelay: `${i * 0.1}s`,
                      transition: `width 1.2s ease ${i * 0.1}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card-game p-5 animate-fade-in-up delay-400">
          <h3 className="font-display text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Icon name="Award" size={16} className="text-neon-yellow" />
            Достижения
            <span className="badge-xp ml-auto">3/6</span>
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.title}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all duration-200 ${
                  ach.unlocked
                    ? "border-neon-green/30 bg-neon-green/5 hover:bg-neon-green/10"
                    : "border-border bg-muted/30 opacity-40"
                }`}
              >
                <span className="text-2xl">{ach.icon}</span>
                <p className="text-xs font-bold text-white font-display leading-tight">{ach.title}</p>
                <p className="text-[10px] text-muted-foreground font-body leading-tight">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent tests */}
      <div className="card-game p-5 animate-fade-in-up delay-500">
        <h3 className="font-display text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-neon-blue" />
          Последние тесты
        </h3>
        <div className="space-y-3">
          {recentTests.map((test, i) => (
            <div
              key={test.name}
              className="flex items-center gap-4 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: test.score >= 85 ? 'rgba(0,255,136,0.15)' : test.score >= 70 ? 'rgba(251,191,36,0.15)' : 'rgba(168,85,247,0.15)'
                }}>
                <span className="font-display text-xs font-bold"
                  style={{
                    color: test.score >= 85 ? '#00ff88' : test.score >= 70 ? '#fbbf24' : '#a855f7'
                  }}>
                  {test.score}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white font-body truncate">{test.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{test.date}</p>
              </div>
              <span className="badge-xp shrink-0">{test.xp}</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-neon-green transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
