import { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = ["Все", "IT", "Медицина", "Бизнес", "Творчество", "Наука"];

const professions = [
  {
    id: 1, title: "Разработчик ПО", category: "IT",
    match: 94, emoji: "💻", difficulty: "Средняя",
    tags: ["Логика", "Технологии", "Удалёнка"],
    desc: "Создаёт программы, приложения и сайты. Высокий спрос на рынке.",
    salary: "120–250 тыс.", color: "#00ff88",
    progress: 94,
  },
  {
    id: 2, title: "Data Scientist", category: "IT",
    match: 87, emoji: "📊", difficulty: "Высокая",
    tags: ["Математика", "ИИ", "Аналитика"],
    desc: "Анализирует большие данные и строит модели машинного обучения.",
    salary: "150–350 тыс.", color: "#38bdf8",
    progress: 87,
  },
  {
    id: 3, title: "UX/UI Дизайнер", category: "Творчество",
    match: 81, emoji: "🎨", difficulty: "Средняя",
    tags: ["Дизайн", "Психология", "Продукт"],
    desc: "Проектирует удобные интерфейсы и красивые визуальные решения.",
    salary: "90–200 тыс.", color: "#a855f7",
    progress: 81,
  },
  {
    id: 4, title: "Врач-терапевт", category: "Медицина",
    match: 62, emoji: "🩺", difficulty: "Очень высокая",
    tags: ["Биология", "Коммуникация", "Стрессоустойчивость"],
    desc: "Диагностирует и лечит заболевания, ведёт пациентов.",
    salary: "60–180 тыс.", color: "#f472b6",
    progress: 62,
  },
  {
    id: 5, title: "Продуктовый менеджер", category: "Бизнес",
    match: 78, emoji: "🚀", difficulty: "Средняя",
    tags: ["Стратегия", "Коммуникация", "Аналитика"],
    desc: "Управляет разработкой продукта, соединяет бизнес и технологии.",
    salary: "130–280 тыс.", color: "#fbbf24",
    progress: 78,
  },
  {
    id: 6, title: "Биоинформатик", category: "Наука",
    match: 55, emoji: "🧬", difficulty: "Высокая",
    tags: ["Биология", "Программирование", "Исследования"],
    desc: "Анализирует биологические данные с помощью вычислительных методов.",
    salary: "100–220 тыс.", color: "#00ff88",
    progress: 55,
  },
];

const difficultyColor: Record<string, string> = {
  "Средняя": "#fbbf24",
  "Высокая": "#f472b6",
  "Очень высокая": "#ef4444",
};

export default function ProfessionsPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = professions.filter(
    (p) => activeCategory === "Все" || p.category === activeCategory
  );

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
          Профессии<span className="text-neon-green">.</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm mt-1">
          Подобраны по результатам твоих тестов · {professions.length} профессий
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap mb-6 animate-fade-in-up delay-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-display font-bold transition-all duration-200 ${
              activeCategory === cat
                ? "text-black"
                : "border border-border text-muted-foreground hover:text-white hover:border-neon-green/50"
            }`}
            style={activeCategory === cat ? {
              background: 'var(--neon-green)',
              boxShadow: '0 0 15px rgba(0,255,136,0.3)'
            } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Professions grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((prof, i) => (
          <div
            key={prof.id}
            onMouseEnter={() => setHoveredId(prof.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="card-game p-5 cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: `${prof.color}18` }}>
                {prof.emoji}
              </div>
              <div className="text-right">
                <div className="font-display text-xl font-bold" style={{ color: prof.color }}>
                  {prof.match}%
                </div>
                <p className="text-[10px] text-muted-foreground">совпадение</p>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display text-sm font-bold text-white mb-1">{prof.title}</h3>
            <p className="text-xs text-muted-foreground font-body mb-3 leading-relaxed">{prof.desc}</p>

            {/* Match bar */}
            <div className="mb-3">
              <div className="xp-bar" style={{ height: '6px' }}>
                <div
                  className="xp-bar-fill"
                  style={{
                    width: `${prof.progress}%`,
                    background: `linear-gradient(90deg, ${prof.color}, ${prof.color}99)`
                  }}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {prof.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] border border-border text-muted-foreground font-body">
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <p className="text-xs font-bold text-white font-display">{prof.salary}</p>
                <p className="text-[10px] text-muted-foreground">в месяц</p>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full border font-body"
                style={{
                  color: difficultyColor[prof.difficulty] || '#fff',
                  borderColor: `${difficultyColor[prof.difficulty]}44`
                }}
              >
                {prof.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
