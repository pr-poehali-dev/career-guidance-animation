import { useState } from "react";
import Icon from "@/components/ui/icon";
import ScenarioPlayer from "@/components/ScenarioPlayer";
import { scenariosData } from "@/data/scenariosData";
import type { ScenarioData } from "@/data/scenariosData";

const difficultyConfig: Record<string, { label: string; bg: string; text: string }> = {
  "Старт": { label: "Старт 🌱", bg: "bg-emerald-100", text: "text-emerald-700" },
  "Средне": { label: "Средне 🔥", bg: "bg-orange-100", text: "text-orange-700" },
  "Хардкор": { label: "Хардкор 💀", bg: "bg-red-100", text: "text-red-700" },
};

export default function ScenariosPage() {
  const [filter, setFilter] = useState("Все");
  const [activeScenario, setActiveScenario] = useState<ScenarioData | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set([1]));
  const [earnedXp, setEarnedXp] = useState<Record<number, number>>({});

  const filters = ["Все", "Старт", "Средне", "Хардкор"];

  const filtered = scenariosData.filter(
    (s) => filter === "Все" || s.difficulty === filter
  );

  const handleComplete = (xp: number) => {
    if (activeScenario) {
      setCompletedIds((prev) => new Set([...prev, activeScenario.id]));
      setEarnedXp((prev) => ({ ...prev, [activeScenario.id]: xp }));
    }
  };

  const totalXp = Object.values(earnedXp).reduce((a, b) => a + b, 0) + 200;

  return (
    <>
      {activeScenario && (
        <ScenarioPlayer
          scenario={activeScenario}
          onClose={() => setActiveScenario(null)}
          onComplete={(xp) => {
            handleComplete(xp);
            setTimeout(() => setActiveScenario(null), 2000);
          }}
        />
      )}

      <div className="min-h-screen" style={{ background: "#f8f7ff" }}>
        {/* Hero header */}
        <div className="relative overflow-hidden px-6 pt-10 pb-6 md:px-10">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 60% -10%, rgba(139,92,246,0.1) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(251,146,60,0.08) 0%, transparent 70%)" }} />

          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🗺️</span>
                <h1 style={{ fontFamily: "'Unbounded', sans-serif" }}
                  className="text-2xl md:text-3xl font-black text-gray-900 leading-none">
                  Сценарии
                </h1>
              </div>
              <p className="text-gray-500 text-sm mt-1 font-body">
                Проживи рабочий день в профессии своей мечты
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100">
              <span className="text-lg">⚡</span>
              <div>
                <p className="text-xs text-gray-400 leading-none">Твой XP</p>
                <p className="font-black text-violet-600 text-sm font-display">{totalXp}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-3 flex-wrap">
            {[
              { icon: "CheckCircle", val: completedIds.size, label: "Пройдено", bg: "bg-emerald-100", color: "text-emerald-600" },
              { icon: "Play", val: 0, label: "В процессе", bg: "bg-orange-100", color: "text-orange-500" },
              { icon: "Zap", val: scenariosData.length - completedIds.size, label: "Доступно", bg: "bg-violet-100", color: "text-violet-600" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                <div className={`w-8 h-8 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <Icon name={s.icon} size={16} className={s.color} />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-lg leading-none font-display">{s.val}</p>
                  <p className="text-xs text-gray-400 font-body">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 md:px-10 mb-6">
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                  filter === f
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-violet-300 hover:text-violet-600"
                }`}
                style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "11px" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="px-6 md:px-10 pb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((scenario, i) => {
            const isCompleted = completedIds.has(scenario.id);
            const diff = difficultyConfig[scenario.difficulty];
            const xp = earnedXp[scenario.id];

            return (
              <div key={scenario.id}
                className="group bg-white rounded-3xl border-2 border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => setActiveScenario(scenario)}
              >
                {/* Gradient top strip */}
                <div className={`h-2 w-full bg-gradient-to-r ${scenario.gradient}`} />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${scenario.bgLight} transition-transform duration-300 group-hover:scale-110`}>
                      {scenario.emoji}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      {isCompleted && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                          <Icon name="CheckCircle" size={10} /> Пройден
                        </span>
                      )}
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${diff.bg} ${diff.text}`}>
                        {diff.label}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-black text-gray-900 mb-1 leading-tight"
                    style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "14px" }}>
                    {scenario.title}
                  </h3>
                  <p className={`text-xs font-bold mb-2 ${scenario.textAccent}`}>{scenario.profession}</p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 font-body">{scenario.desc}</p>

                  {/* Characters preview */}
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-[11px] text-gray-400 font-body">Персонажи:</p>
                    <div className="flex gap-1">
                      {scenario.characters.map((char) => (
                        <div key={char.id}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-white"
                          style={{ background: char.color + "22", borderColor: char.color + "44" }}
                          title={char.name}>
                          {char.avatar}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {scenario.tags.map((tag) => (
                      <span key={tag}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${scenario.borderAccent} ${scenario.bgLight} ${scenario.textAccent}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-body">
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={12} /> {scenario.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="MessageCircle" size={12} /> {scenario.steps.length} шагов
                      </span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${scenario.bgLight} ${scenario.textAccent}`}>
                      {isCompleted && xp ? `${xp} XP` : `+${scenario.xp} XP`}
                    </span>
                  </div>

                  {/* CTA button */}
                  <button
                    className={`mt-3 w-full py-3 rounded-2xl font-black text-white text-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${scenario.gradient}`}
                    style={{ fontFamily: "'Unbounded', sans-serif", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                    onClick={(e) => { e.stopPropagation(); setActiveScenario(scenario); }}
                  >
                    {isCompleted ? "Пройти заново 🔄" : "Начать сценарий →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
