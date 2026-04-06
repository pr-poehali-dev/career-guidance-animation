import Icon from "@/components/ui/icon";

const topPlayers = [
  { rank: 1, name: "Мария Ковалёва", xp: 8920, level: 12, badge: "Легенда", avatar: "МК", color: "#fbbf24" },
  { rank: 2, name: "Дмитрий Соколов", xp: 7650, level: 11, badge: "Мастер", avatar: "ДС", color: "#94a3b8" },
  { rank: 3, name: "Анна Петрова", xp: 6800, level: 10, badge: "Чемпион", avatar: "АП", color: "#cd7f32" },
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

const rankColors: Record<string, string> = {
  "Легенда": "#fbbf24",
  "Мастер": "#f472b6",
  "Чемпион": "#a855f7",
  "Эксперт": "#38bdf8",
  "Профи": "#00ff88",
  "Исследователь": "#94a3b8",
};

export default function RatingPage() {
  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
          Рейтинг<span className="text-neon-yellow">.</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm mt-1">
          Глобальная таблица лидеров · Обновляется ежедневно
        </p>
      </div>

      {/* My position banner */}
      <div className="p-4 rounded-xl border mb-6 animate-fade-in-up delay-100 flex items-center gap-4"
        style={{
          borderColor: 'rgba(0,255,136,0.4)',
          background: 'rgba(0,255,136,0.07)',
          boxShadow: '0 0 20px rgba(0,255,136,0.1)'
        }}>
        <Icon name="MapPin" size={20} className="text-neon-green shrink-0" />
        <div>
          <p className="text-xs text-neon-green font-display font-bold uppercase tracking-wider">Твоя позиция</p>
          <p className="text-white font-body text-sm mt-0.5">Место <span className="font-bold text-neon-yellow">#14</span> из 1,247 участников</p>
        </div>
        <div className="ml-auto text-right">
          <p className="font-display text-lg font-bold text-neon-green">2450 XP</p>
          <p className="text-xs text-muted-foreground">До #13: <span className="text-neon-yellow">+10 XP</span></p>
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
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold font-display"
                  style={{
                    background: `linear-gradient(135deg, ${player.color}66, ${player.color}33)`,
                    border: `2px solid ${player.color}`,
                    boxShadow: `0 0 15px ${player.color}44`
                  }}
                >
                  {player.avatar}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-white font-display leading-tight">{player.name.split(" ")[0]}</p>
                  <p className="text-xs font-bold" style={{ color: player.color }}>{player.xp.toLocaleString()} XP</p>
                </div>
              </div>
              <div
                className="w-full rounded-t-xl flex items-center justify-center py-2"
                style={{ background: `${player.color}22`, border: `1px solid ${player.color}44` }}
              >
                <span className="font-display text-lg font-bold" style={{ color: player.color }}>#{actualRank}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full leaderboard */}
      <div className="card-game overflow-hidden animate-fade-in-up delay-300">
        <div className="p-4 border-b border-border">
          <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
            <Icon name="List" size={16} className="text-neon-blue" />
            Полный список
          </h3>
        </div>
        <div className="divide-y divide-border">
          {players.map((player, i) => (
            <div
              key={player.rank}
              className={`flex items-center gap-4 px-4 py-3 transition-all duration-200 ${
                player.isMe
                  ? "bg-neon-green/8"
                  : "hover:bg-muted/40"
              }`}
              style={player.isMe ? {
                borderLeft: '3px solid var(--neon-green)',
                background: 'rgba(0,255,136,0.06)'
              } : {}}
            >
              {/* Rank */}
              <div className="w-8 text-center shrink-0">
                <span className={`font-display text-sm font-bold ${
                  player.isMe ? "text-neon-green" : "text-muted-foreground"
                }`}>
                  #{player.rank}
                </span>
              </div>

              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold font-display shrink-0"
                style={{
                  background: player.isMe
                    ? 'linear-gradient(135deg, #a855f7, #f472b6)'
                    : 'hsl(var(--muted))',
                  color: player.isMe ? '#fff' : 'hsl(var(--muted-foreground))'
                }}
              >
                {player.avatar}
              </div>

              {/* Name + badge */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium font-body truncate ${player.isMe ? "text-white font-bold" : "text-white"}`}>
                  {player.name} {player.isMe && <span className="text-neon-green text-xs">(Это ты!)</span>}
                </p>
                <span
                  className="text-[10px] font-body"
                  style={{ color: rankColors[player.badge] || '#94a3b8' }}
                >
                  {player.badge} · Ур. {player.level}
                </span>
              </div>

              {/* XP */}
              <div className="text-right shrink-0">
                <p className={`font-display text-sm font-bold ${player.isMe ? "text-neon-yellow" : "text-white"}`}>
                  {player.xp.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground">XP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
