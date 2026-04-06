import Icon from "@/components/ui/icon";

const testHistory = [
  { name: "Логическое мышление", score: 87, date: "3 дня назад", xp: 120, icon: "Brain" },
  { name: "Тип личности MBTI", score: 94, date: "5 дней назад", xp: 200, icon: "User" },
  { name: "Технические навыки", score: 72, date: "8 дней назад", xp: 90, icon: "Cpu" },
  { name: "Эмоциональный интеллект", score: 68, date: "2 недели назад", xp: 80, icon: "Heart" },
  { name: "Командная работа", score: 91, date: "3 недели назад", xp: 150, icon: "Users" },
];

const skills = [
  { name: "Аналитика", level: 4, maxLevel: 5, color: "#8b5cf6" },
  { name: "Коммуникация", level: 3, maxLevel: 5, color: "#ec4899" },
  { name: "Технологии", level: 5, maxLevel: 5, color: "#3b82f6" },
  { name: "Творчество", level: 3, maxLevel: 5, color: "#f59e0b" },
  { name: "Лидерство", level: 2, maxLevel: 5, color: "#10b981" },
];

const totalXp = 2450;
const level = 7;
const nextLevelXp = 4000;
const xpPercent = Math.round((totalXp / nextLevelXp) * 100);

export default function ProfilePage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
          Профиль<span style={{ color: '#8b5cf6' }}>.</span>
        </h1>
      </div>

      {/* Profile card */}
      <div className="card-game p-6 mb-6 animate-fade-in-up delay-100">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold font-display text-white"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
                АВ
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-display"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', boxShadow: '0 4px 12px rgba(139,92,246,0.4)' }}>
                {level}
              </div>
            </div>
            <span className="badge-rank">Исследователь</span>
          </div>

          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-1">Александр Васильев</h2>
            <p className="text-gray-400 font-body text-sm mb-4">На платформе с января 2025</p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <p className="font-display text-xl font-bold" style={{ color: '#10b981' }}>{testHistory.length}</p>
                <p className="text-xs text-gray-400 font-body">Тестов</p>
              </div>
              <div className="text-center p-3 rounded-2xl bg-amber-50 border border-amber-100">
                <p className="font-display text-xl font-bold" style={{ color: '#f59e0b' }}>{totalXp}</p>
                <p className="text-xs text-gray-400 font-body">XP всего</p>
              </div>
              <div className="text-center p-3 rounded-2xl bg-violet-50 border border-violet-100">
                <p className="font-display text-xl font-bold" style={{ color: '#8b5cf6' }}>#14</p>
                <p className="text-xs text-gray-400 font-body">Рейтинг</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-gray-400 font-body">Уровень {level}</span>
                <span className="text-xs font-bold font-display" style={{ color: '#f59e0b' }}>{totalXp} / {nextLevelXp} XP</span>
              </div>
              <div className="xp-bar" style={{ height: '10px' }}>
                <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
              </div>
              <p className="text-xs mt-1.5 font-body" style={{ color: '#8b5cf6' }}>{nextLevelXp - totalXp} XP до уровня {level + 1}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card-game p-5 animate-fade-in-up delay-200">
          <h3 className="font-display text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="Zap" size={16} style={{ color: '#f59e0b' }} />
            Навыки
          </h3>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-body">{skill.name}</span>
                <div className="flex gap-1.5">
                  {Array.from({ length: skill.maxLevel }).map((_, j) => (
                    <div key={j} className="w-5 h-5 rounded-md transition-all duration-300"
                      style={{
                        background: j < skill.level ? skill.color : '#f3f4f6',
                        boxShadow: j < skill.level ? `0 2px 6px ${skill.color}44` : 'none'
                      }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-game p-5 animate-fade-in-up delay-300">
          <h3 className="font-display text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="Target" size={16} style={{ color: '#10b981' }} />
            Рекомендации ИИ
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50">
              <p className="text-xs font-bold font-display mb-1" style={{ color: '#10b981' }}>Лучшее совпадение</p>
              <p className="text-sm text-gray-900 font-body">💻 Разработчик ПО — 94% совпадение</p>
              <p className="text-xs text-gray-400 mt-1">По результатам технических тестов</p>
            </div>
            <div className="p-3 rounded-2xl border border-violet-200 bg-violet-50">
              <p className="text-xs font-bold font-display mb-1" style={{ color: '#8b5cf6' }}>Стоит изучить</p>
              <p className="text-sm text-gray-900 font-body">📊 Data Scientist — 87% совпадение</p>
              <p className="text-xs text-gray-400 mt-1">Усиль аналитические навыки</p>
            </div>
            <div className="p-3 rounded-2xl border border-amber-200 bg-amber-50">
              <p className="text-xs font-bold font-display mb-1" style={{ color: '#f59e0b' }}>Следующий тест</p>
              <p className="text-sm text-gray-900 font-body">🧠 Тест пространственного мышления</p>
              <p className="text-xs text-gray-400 mt-1">+180 XP после прохождения</p>
            </div>
          </div>
        </div>
      </div>

      {/* Test history */}
      <div className="card-game p-5 animate-fade-in-up delay-400">
        <h3 className="font-display text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="History" size={16} style={{ color: '#3b82f6' }} />
          История тестов
          <span className="badge-xp ml-auto">+{testHistory.reduce((s, t) => s + t.xp, 0)} XP</span>
        </h3>
        <div className="space-y-2">
          {testHistory.map((test) => {
            const sc = test.score >= 85 ? '#10b981' : test.score >= 70 ? '#f59e0b' : '#8b5cf6';
            const bg = test.score >= 85 ? 'bg-emerald-50' : test.score >= 70 ? 'bg-amber-50' : 'bg-violet-50';
            return (
              <div key={test.name}
                className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 hover:bg-violet-50 transition-all duration-200 cursor-pointer group border border-transparent hover:border-violet-100">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                  <Icon name={test.icon} size={16} style={{ color: sc }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-body font-medium truncate">{test.name}</p>
                  <p className="text-xs text-gray-400">{test.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-sm font-bold" style={{ color: sc }}>{test.score}%</p>
                  <p className="text-[10px]" style={{ color: '#10b981' }}>+{test.xp} XP</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
