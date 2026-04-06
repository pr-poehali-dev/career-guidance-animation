import Icon from "@/components/ui/icon";

const testHistory = [
  { name: "Логическое мышление", score: 87, date: "3 дня назад", xp: 120, icon: "Brain" },
  { name: "Тип личности MBTI", score: 94, date: "5 дней назад", xp: 200, icon: "User" },
  { name: "Технические навыки", score: 72, date: "8 дней назад", xp: 90, icon: "Cpu" },
  { name: "Эмоциональный интеллект", score: 68, date: "2 недели назад", xp: 80, icon: "Heart" },
  { name: "Командная работа", score: 91, date: "3 недели назад", xp: 150, icon: "Users" },
];

const skills = [
  { name: "Аналитика", level: 4, maxLevel: 5, color: "#00ff88" },
  { name: "Коммуникация", level: 3, maxLevel: 5, color: "#a855f7" },
  { name: "Технологии", level: 5, maxLevel: 5, color: "#38bdf8" },
  { name: "Творчество", level: 3, maxLevel: 5, color: "#fbbf24" },
  { name: "Лидерство", level: 2, maxLevel: 5, color: "#f472b6" },
];

const totalXp = 2450;
const level = 7;
const nextLevelXp = 4000;
const xpPercent = Math.round((totalXp / nextLevelXp) * 100);

export default function ProfilePage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
          Профиль<span className="text-neon-purple">.</span>
        </h1>
      </div>

      {/* Profile card */}
      <div className="card-game p-6 mb-6 animate-fade-in-up delay-100">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold font-display text-white"
                style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)' }}>
                АВ
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold font-display"
                style={{ background: 'var(--neon-green)', boxShadow: '0 0 12px rgba(0,255,136,0.5)' }}>
                {level}
              </div>
            </div>
            <span className="badge-rank">Исследователь</span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-white mb-1">Александр Васильев</h2>
            <p className="text-muted-foreground font-body text-sm mb-4">На платформе с января 2025</p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 rounded-xl bg-muted/40">
                <p className="font-display text-xl font-bold text-neon-green">{testHistory.length}</p>
                <p className="text-xs text-muted-foreground font-body">Тестов</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/40">
                <p className="font-display text-xl font-bold text-neon-yellow">{totalXp}</p>
                <p className="text-xs text-muted-foreground font-body">XP всего</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/40">
                <p className="font-display text-xl font-bold text-neon-purple">#14</p>
                <p className="text-xs text-muted-foreground font-body">Рейтинг</p>
              </div>
            </div>

            {/* XP bar */}
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-muted-foreground font-body">Уровень {level}</span>
                <span className="text-xs font-bold font-display text-neon-yellow">{totalXp} / {nextLevelXp} XP</span>
              </div>
              <div className="xp-bar" style={{ height: '10px' }}>
                <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
              </div>
              <p className="text-xs text-neon-green mt-1.5 font-body">{nextLevelXp - totalXp} XP до уровня {level + 1}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Skills */}
        <div className="card-game p-5 animate-fade-in-up delay-200">
          <h3 className="font-display text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Icon name="Zap" size={16} className="text-neon-yellow" />
            Навыки
          </h3>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-white font-body">{skill.name}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: skill.maxLevel }).map((_, j) => (
                      <div
                        key={j}
                        className="w-4 h-4 rounded-sm transition-all duration-300"
                        style={{
                          background: j < skill.level ? skill.color : 'hsl(var(--muted))',
                          boxShadow: j < skill.level ? `0 0 6px ${skill.color}66` : 'none'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div className="card-game p-5 animate-fade-in-up delay-300">
          <h3 className="font-display text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Icon name="Target" size={16} className="text-neon-green" />
            Рекомендации ИИ
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl border border-neon-green/20 bg-neon-green/5">
              <p className="text-xs font-bold text-neon-green font-display mb-1">Лучшее совпадение</p>
              <p className="text-sm text-white font-body">💻 Разработчик ПО — 94% совпадение</p>
              <p className="text-xs text-muted-foreground mt-1">По результатам технических тестов</p>
            </div>
            <div className="p-3 rounded-xl border border-neon-purple/20 bg-neon-purple/5">
              <p className="text-xs font-bold text-neon-purple font-display mb-1">Стоит изучить</p>
              <p className="text-sm text-white font-body">📊 Data Scientist — 87% совпадение</p>
              <p className="text-xs text-muted-foreground mt-1">Усиль аналитические навыки</p>
            </div>
            <div className="p-3 rounded-xl border border-neon-yellow/20 bg-neon-yellow/5">
              <p className="text-xs font-bold text-neon-yellow font-display mb-1">Следующий тест</p>
              <p className="text-sm text-white font-body">🧠 Тест пространственного мышления</p>
              <p className="text-xs text-muted-foreground mt-1">+180 XP после прохождения</p>
            </div>
          </div>
        </div>
      </div>

      {/* Test history */}
      <div className="card-game p-5 animate-fade-in-up delay-400">
        <h3 className="font-display text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Icon name="History" size={16} className="text-neon-blue" />
          История тестов
          <span className="badge-xp ml-auto">+{testHistory.reduce((s, t) => s + t.xp, 0)} XP</span>
        </h3>
        <div className="space-y-2">
          {testHistory.map((test, i) => {
            const scoreColor = test.score >= 85 ? '#00ff88' : test.score >= 70 ? '#fbbf24' : '#f472b6';
            return (
              <div
                key={test.name}
                className="flex items-center gap-4 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-all duration-200 cursor-pointer group"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${scoreColor}18` }}>
                  <Icon name={test.icon} size={16} style={{ color: scoreColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-body font-medium truncate">{test.name}</p>
                  <p className="text-xs text-muted-foreground">{test.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-sm font-bold" style={{ color: scoreColor }}>
                    {test.score}%
                  </p>
                  <p className="text-[10px] text-neon-green">+{test.xp} XP</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
