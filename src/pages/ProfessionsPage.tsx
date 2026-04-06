import { useState } from "react";
import Icon from "@/components/ui/icon";
import { professionsData } from "@/data/scenariosData";
import { scenariosData } from "@/data/scenariosData";

const categories = ["Все", "IT", "Медицина", "Бизнес", "Творчество", "Образование", "Наука"];

const difficultyConfig: Record<string, { bg: string; text: string }> = {
  "Средняя": { bg: "bg-amber-100", text: "text-amber-700" },
  "Высокая": { bg: "bg-pink-100", text: "text-pink-700" },
  "Очень высокая": { bg: "bg-red-100", text: "text-red-700" },
};

export default function ProfessionsPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = professionsData.filter(
    (p) => activeCategory === "Все" || p.category === activeCategory
  );

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
          Профессии<span style={{ color: "#8b5cf6" }}>.</span>
        </h1>
        <p className="text-gray-400 font-body text-sm mt-1">
          Подобраны по результатам твоих тестов · {professionsData.length} профессий
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap mb-6 animate-fade-in-up delay-100">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-display font-bold transition-all duration-200 ${
              activeCategory === cat
                ? "text-white shadow-md"
                : "border border-gray-200 text-gray-500 hover:text-violet-600 hover:border-violet-300 bg-white"
            }`}
            style={activeCategory === cat ? {
              background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
              boxShadow: "0 4px 12px rgba(139,92,246,0.3)"
            } : {}}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((prof, i) => {
          const diff = difficultyConfig[prof.difficulty] || { bg: "bg-gray-100", text: "text-gray-600" };
          const relScenarios = scenariosData.filter((s) => s.professionId === prof.id);
          const isExpanded = selectedId === prof.id;

          return (
            <div key={prof.id}
              onClick={() => setSelectedId(isExpanded ? null : prof.id)}
              className={`bg-white rounded-3xl border-2 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in-up ${
                isExpanded ? "border-violet-300 shadow-lg" : "border-gray-100 hover:shadow-md hover:-translate-y-1"
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="h-1.5 w-full" style={{ background: prof.color }} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${prof.bg}`}>
                    {prof.emoji}
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl font-bold" style={{ color: prof.color }}>{prof.match}%</div>
                    <p className="text-[10px] text-gray-400">совпадение</p>
                  </div>
                </div>

                <h3 className="font-display text-sm font-bold text-gray-900 mb-1">{prof.title}</h3>
                <p className="text-xs text-gray-400 font-body mb-3 leading-relaxed">{prof.desc}</p>

                <div className={`h-2 rounded-full overflow-hidden ${prof.bg} mb-3`}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${prof.match}%`, background: prof.color }} />
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {prof.tags.map((tag) => (
                    <span key={tag}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${prof.border} ${prof.bg}`}
                      style={{ color: prof.color }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs font-bold text-gray-900 font-display">{prof.salary}</p>
                    <p className="text-[10px] text-gray-400">в месяц</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {relScenarios.length > 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-600 font-bold">
                        {relScenarios.length} сц.
                      </span>
                    )}
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${diff.bg} ${diff.text}`}>
                      {prof.difficulty}
                    </span>
                  </div>
                </div>

                {/* Expanded: related scenarios */}
                {isExpanded && relScenarios.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in-up">
                    <p className="text-xs font-bold text-gray-500 font-display mb-2 uppercase tracking-wide">
                      Сценарии профессии
                    </p>
                    <div className="space-y-2">
                      {relScenarios.map((sc) => (
                        <div key={sc.id}
                          className={`flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r ${sc.gradient} bg-opacity-10`}
                          style={{ background: `linear-gradient(135deg, ${prof.color}10, ${prof.color}18)` }}>
                          <span className="text-xl">{sc.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">{sc.title}</p>
                            <p className="text-[10px] text-gray-400">{sc.duration} · +{sc.xp} XP</p>
                          </div>
                          <Icon name="ChevronRight" size={14} style={{ color: prof.color }} />
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-center text-gray-400 mt-3 font-body">
                      Открой «Сценарии» чтобы сыграть
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
