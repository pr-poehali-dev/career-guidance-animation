import Icon from "@/components/ui/icon";

const topPlayers = [
  { rank: 1, name: "Мария Ковалёва", xp: 8920, level: 12, badge: "Легенда", avatar: "МК", gradient: "from-amber-400 to-yellow-500", glow: "rgba(251,191,36,0.25)" },
  { rank: 2, name: "Дмитрий Соколов", xp: 7650, level: 11, badge: "Мастер", avatar: "ДС", gradient: "from-slate-400 to-slate-500", glow: "rgba(148,163,184,0.25)" },
  { rank: 3, name: "Анна Петрова", xp: 6800, level: 10, badge: "Чемпион", avatar: "АП", gradient: "from-orange-400 to-amber-600", glow: "rgba(251,146,60,0.25)" },
];

const players = [
  { rank: 4, name: "Сергей Иванов", xp: 5430, level: 9, badge: "Эксперт", avatar: "СИ" },
  { rank: 5, name: "Ольга Смирнова", xp: 4980, level: 9, badge: "Эксперт", avatar: "ОС" },
  { rank: 6, name: "Никита Волков", xp: 4100, level: 8, badge: "Профи", avatar: "НВ" },
  { rank: 7, name: "Екатерина Орлова", xp: 3750, level: 8, badge: "Профи", avatar: "ЕО" },
  { rank: 8, name: "Артём Козлов", xp: 3200, level: 8, badge: "Профи", avatar: "АК" },
  { rank: 9, name: "Полина Зайцева", xp: 2900, level: 7, badge: "Исследователь", avatar: "ПЗ" },
  { rank: 10, name: "Роман Морозов", xp: 2680, level: 7, badge: "Исследователь", avatar: "РМ" },
  { rank: 11, name: "Надежда Белова", xp: 2510, level: 7, badge: "Исследователь", avatar: "НБ" },
  { rank: 12, name: "Кирилл Новиков", xp: 2480, level: 7, badge: "Исследователь", avatar: "КН" },
  { rank: 13, name: "Юлия Макарова", xp: 2460, level: 7, badge: "Исследователь", avatar: "ЮМ" },
  { rank: 14, name: "Александр В.", xp: 2450, level: 7, badge: "Исследователь", avatar: "АВ", isMe: true },
  { rank: 15, name: "Татьяна Лебедева", xp: 2300, level: 7, badge: "Исследователь", avatar: "ТЛ" },
];

const rankColors: Record<string, { text: string; bg: string }> = {
  "Легенда": { text: "text-amber-600", bg: "bg-amber-50" },
  "Мастер": { text: "text-pink-600", bg: "bg-pink-50" },
  "Чемпион": { text: "text-violet-600", bg: "bg-violet-50" },
  "Эксперт": { text: "text-blue-600", bg: "bg-blue-50" },
  "Профи": { text: "text-emerald-600", bg: "bg-emerald-50" },
  "Исследователь": { text: "text-gray-500", bg: "bg-gray-100" },
};

export default function RatingPage() {
  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
          Рейтинг<span style={{ color: '#f59e0b' }}>.</span>
        </h1>
        <p className="text-gray-400 font-body text-sm mt-1">
          Глобальная таблица лидеров · Обновляется ежедневно
        </p>
      </div>

      {/* My position banner */}
      <div className="p-4 rounded-2xl border-2 border-violet-200 bg-violet-50 mb-6 animate-fade-in-up delay-100 flex items-center gap-4">
        <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
          <Icon name="MapPin" size={18} style={{ color: '#8b5cf6' }} />
        </div>
        <div>
          <p className="text-xs font-display font-bold uppercase tracking-wider" style={{ color: '#8b5cf6' }}>Твоя позиция</p>
          <p className="text-gray-700 font-body text-sm mt-0.5">
            Место <span className="font-bold" style={{ color: '#f59e0b' }}>#14</span> из 1,247 участников
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="font-display text-lg font-bold" style={{ color: '#8b5cf6' }}>2450 XP</p>
          <p className="text-xs text-gray-400">До #13: <span className="font-bold" style={{ color: '#f59e0b' }}>+10 XP</span></p>
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in-up delay-200">
        {[topPlayers[1], topPlayers[0], topPlayers[2]].map((player, displayIdx) => {
          const actualRank = displayIdx === 0 ? 2 : displayIdx === 1 ? 1 : 3;
          const heights = ["h-28", "h-36", "h-24"];
          const medals = ["🥈", "🥇", "🥉"];
          return (
            <div key={player.rank} className={`flex flex-col items-center justify-end ${heights[displayIdx]}`}>
              <div className="flex flex-col items-center gap-2 mb-2">
                <span className="text-2xl">{medals[displayIdx]}</span>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold font-display text-white bg-gradient-to-br ${player.gradient}`}
                  style={{ boxShadow: `0 4px 16px ${player.glow}` }}>
                  {player.avatar}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-900 font-display leading-tight">{player.name.split(" ")[0]}</p>
                  <p className="text-xs font-bold text-gray-500">{player.xp.toLocaleString()} XP</p>
                </div>
              </div>
              <div className={`w-full rounded-t-xl flex items-center justify-center py-2 bg-gradient-to-br ${player.gradient}`}>
                <span className="font-display text-lg font-bold text-white">#{actualRank}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full leaderboard */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in-up delay-300">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-display text-sm font-bold text-gray-900 flex items-center gap-2">
            <Icon name="List" size={16} style={{ color: '#3b82f6' }} />
            Полный список
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          {players.map((player) => {
            const rColor = rankColors[player.badge] || rankColors["Исследователь"];
            return (
              <div key={player.rank}
                className={`flex items-center gap-4 px-4 py-3 transition-all duration-200 ${
                  player.isMe ? "bg-violet-50 border-l-4 border-violet-400" : "hover:bg-gray-50"
                }`}>
                <div className="w-8 text-center shrink-0">
                  <span className={`font-display text-sm font-bold ${player.isMe ? "text-violet-600" : "text-gray-400"}`}>
                    #{player.rank}
                  </span>
                </div>

                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold font-display shrink-0 ${
                  player.isMe ? "text-white" : "bg-gray-100 text-gray-500"
                }`}
                  style={player.isMe ? { background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', color: '#fff' } : {}}>
                  {player.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium font-body truncate ${player.isMe ? "text-gray-900 font-bold" : "text-gray-700"}`}>
                    {player.name} {player.isMe && <span className="text-violet-500 text-xs font-normal">(Это ты!)</span>}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rColor.bg} ${rColor.text}`}>
                      {player.badge}
                    </span>
                    <span className="text-[10px] text-gray-400">· Ур. {player.level}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className={`font-display text-sm font-bold ${player.isMe ? "" : "text-gray-800"}`}
                    style={player.isMe ? { color: '#8b5cf6' } : {}}>
                    {player.xp.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-gray-400">XP</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
