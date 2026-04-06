import { useState } from "react";
import Icon from "@/components/ui/icon";

interface NavBarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Главная", icon: "Zap" },
  { id: "professions", label: "Профессии", icon: "Briefcase" },
  { id: "scenarios", label: "Сценарии", icon: "Map" },
  { id: "rating", label: "Рейтинг", icon: "Trophy" },
  { id: "profile", label: "Профиль", icon: "User" },
];

export default function NavBar({ activePage, onNavigate }: NavBarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00ff88, #00cc6a)' }}>
              <Icon name="Compass" size={20} className="text-black" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white leading-none">ПрофКвест</p>
              <p className="text-xs text-muted-foreground mt-0.5">v1.0 BETA</p>
            </div>
          </div>
        </div>

        {/* XP mini */}
        <div className="mx-4 mt-4 p-3 rounded-xl border border-border bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-body">Уровень 7</span>
            <span className="badge-xp">+2450 XP</span>
          </div>
          <div className="xp-bar">
            <div className="xp-bar-fill" style={{ width: '68%' }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">1550 XP до уровня 8</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 mt-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-all duration-200 ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-muted-foreground hover:text-white"
                    }`}
                    style={isActive ? {
                      background: 'var(--neon-green)',
                      boxShadow: '0 0 20px rgba(0,255,136,0.3)'
                    } : hoveredItem === item.id ? {
                      background: 'rgba(0,255,136,0.07)',
                      color: '#fff'
                    } : {}}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                    {isActive && <Icon name="ChevronRight" size={14} className="ml-auto" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom badge */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-game-purple to-game-pink flex items-center justify-center text-white text-sm font-bold font-display">
              АВ
            </div>
            <div>
              <p className="text-sm font-semibold text-white font-body">Александр В.</p>
              <span className="badge-rank">Исследователь</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border"
        style={{ background: 'hsl(220 18% 8%)' }}>
        <ul className="flex">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex flex-col items-center gap-1 py-3 text-xs transition-all duration-200 ${
                    isActive ? "text-neon-green" : "text-muted-foreground"
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-body text-[10px]">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 w-8 h-0.5 rounded-full bg-neon-green"
                      style={{ boxShadow: '0 0 8px var(--neon-green)' }} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
