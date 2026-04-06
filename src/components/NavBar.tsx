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
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 z-50"
        style={{ boxShadow: '2px 0 12px rgba(0,0,0,0.04)' }}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }}>
              <Icon name="Compass" size={20} className="text-white" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-gray-900 leading-none">ПрофКвест</p>
              <p className="text-xs text-gray-400 mt-0.5">v1.0 BETA</p>
            </div>
          </div>
        </div>

        {/* XP mini */}
        <div className="mx-4 mt-4 p-3 rounded-2xl border border-violet-100 bg-violet-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-body">Уровень 7</span>
            <span className="badge-xp">+2450 XP</span>
          </div>
          <div className="xp-bar">
            <div className="xp-bar-fill" style={{ width: '68%' }} />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">1550 XP до уровня 8</p>
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
                        ? "text-white font-semibold"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    style={isActive ? {
                      background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                      boxShadow: '0 4px 12px rgba(139,92,246,0.3)'
                    } : hoveredItem === item.id ? {
                      background: 'rgba(139,92,246,0.07)',
                      color: '#7c3aed'
                    } : {}}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                    {isActive && <Icon name="ChevronRight" size={14} className="ml-auto opacity-70" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom user */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold font-display"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
              АВ
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 font-body">Александр В.</p>
              <span className="badge-rank">Исследователь</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100"
        style={{ boxShadow: '0 -4px 16px rgba(0,0,0,0.06)' }}>
        <ul className="flex">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex flex-col items-center gap-1 py-3 text-xs transition-all duration-200 relative ${
                    isActive ? "text-violet-600" : "text-gray-400"
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-body text-[10px]">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                      style={{ background: '#8b5cf6' }} />
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
