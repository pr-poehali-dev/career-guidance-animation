import { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = ["Все", "IT", "Медицина", "Бизнес", "Творчество", "Наука"];

const professions = [
  {
    id: 1, title: "Разработчик ПО", category: "IT",
    match: 94, emoji: "💻", difficulty: "Средняя",
    tags: ["Логика", "Технологии", "Удалёнка"],
    desc: "Создаёт программы, приложения и сайты. Высокий спрос на рынке.",
    salary: "120–250 тыс.", color: "#8b5cf6", bg: "bg-violet-50", border: "border-violet-200",
  },
  {
    id: 2, title: "Data Scientist", category: "IT",
    match: 87, emoji: "📊", difficulty: "Высокая",
    tags: ["Математика", "ИИ", "Аналитика"],
    desc: "Анализирует большие данные и строит модели машинного обучения.",
    salary: "150–350 тыс.", color: "#3b82f6", bg: "bg-blue-50", border: "border-blue-200",
  },
  {
    id: 3, title: "UX/UI Дизайнер", category: "Творчество",
    match: 81, emoji: "🎨", difficulty: "Средняя",
    tags: ["Дизайн", "Психология", "Продукт"],
    desc: "Проектирует удобные интерфейсы и красивые визуальные решения.",
    salary: "90–200 тыс.", color: "#ec4899", bg: "bg-pink-50", border: "border-pink-200",
  },
  {
    id: 4, title: "Врач-терапевт", category: "Медицина",
    match: 62, emoji: "🩺", difficulty: "Очень высокая",
    tags: ["Биология", "Коммуникация", "Стрессоустойчивость"],
    desc: "Диагностирует и лечит заболевания, ведёт пациентов.",
    salary: "60–180 тыс.", color: "#10b981", bg: "bg-emerald-50", border: "border-emerald-200",
  },
  {
    id: 5, title: "Продуктовый менеджер", category: "Бизнес",
    match: 78, emoji: "🚀", difficulty: "Средняя",
    tags: ["Стратегия", "Коммуникация", "Аналитика"],
    desc: "Управляет разработкой продукта, соединяет бизнес и технологии.",
    salary: "130–280 тыс.", color: "#f59e0b", bg: "bg-amber-50", border: "border-amber-200",
  },
  {
    id: 6, title: "Биоинформатик", category: "Наука",
    match: 55, emoji: "🧬", difficulty: "Высокая",
    tags: ["Биология", "Программирование", "Исследования"],
    desc: "Анализирует биологические данные с помощью вычислительных методов.",
    salary: "100–220 тыс.", color: "#8b5cf6", bg: "bg-violet-50", border: "border-violet-200",
  },
];

const difficultyConfig: Record<string, { bg: string; text: string }> = {
  "Средняя": { bg: "bg-amber-100", text: "text-amber-700" },
  "Высокая": { bg: "bg-pink-100", text: "text-pink-700" },
  "Очень высокая": { bg: "bg-red-100", text: "text-red-700" },
};

export default function ProfessionsPage() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = professions.filter(
    (p) => activeCategory === "Все" || p.category === activeCategory
  );

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
          Профессии<span style={{ color: '#8b5cf6' }}>.</span>
        </h1>
        <p className="text-gray-400 font-body text-sm mt-1">
          Подобраны по результатам твоих тестов · {professions.length} профессий
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap mb-6 animate-fade-in-up delay-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-display font-bold transition-all duration-200 ${
              activeCategory === cat
                ? "text-white shadow-md"
                : "border border-gray-200 text-gray-500 hover:text-violet-600 hover:border-violet-300 bg-white"
            }`}
            style={activeCategory === cat ? {
              background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
              boxShadow: '0 4px 12px rgba(139,92,246,0.3)'
            } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((prof, i) => {
          const diff = difficultyConfig[prof.difficulty] || { bg: "bg-gray-100", text: "text-gray-600" };
          return (
            <div
              key={prof.id}
              className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="h-1.5 w-full rounded-t-full" style={{ background: prof.color }} />
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

                <div className="mb-3">
                  <div className={`h-2 rounded-full overflow-hidden ${prof.bg}`}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${prof.match}%`, background: prof.color }} />
                  </div>
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
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${diff.bg} ${diff.text}`}>
                    {prof.difficulty}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
