import { useState, useEffect, useRef } from "react";
import type { ScenarioData, SceneStep, Character } from "@/data/scenariosData";
import Icon from "@/components/ui/icon";

interface Props {
  scenario: ScenarioData;
  onClose: () => void;
  onComplete: (xp: number) => void;
}

const moodFace: Record<string, string> = {
  neutral: "😐",
  happy: "😊",
  worried: "😟",
  angry: "😠",
  thinking: "🤔",
  excited: "🤩",
};

function CharacterAvatar({ char, mood, active, side }: {
  char: Character; mood: string; active: boolean; side: "left" | "right";
}) {
  return (
    <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${active ? "scale-110" : "scale-90 opacity-50"}`}>
      {/* Character bubble */}
      <div
        className="relative flex items-center justify-center rounded-3xl transition-all duration-300"
        style={{
          width: 90, height: 110,
          background: active
            ? `linear-gradient(135deg, ${char.color}22, ${char.color}44)`
            : "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
          border: `3px solid ${active ? char.color : "#e5e7eb"}`,
          boxShadow: active ? `0 8px 32px ${char.color}44` : "none",
        }}
      >
        {/* Body */}
        <div className="flex flex-col items-center gap-1">
          {/* Head */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
            style={{
              background: `linear-gradient(135deg, ${char.color}33, ${char.color}55)`,
              border: `2px solid ${char.color}66`,
              transition: "all 0.3s ease",
            }}
          >
            {char.avatar}
          </div>
          {/* Mood */}
          {active && (
            <div className="text-base animate-bounce">{moodFace[mood] || "😐"}</div>
          )}
        </div>

        {/* Speaking indicator */}
        {active && (
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: char.color }}>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </div>
        )}
      </div>

      {/* Name tag */}
      <div className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
        active ? "text-white" : "text-gray-400 bg-gray-100"
      }`}
        style={active ? { background: char.color } : {}}>
        {char.name}
      </div>
      {active && (
        <p className="text-[10px] text-gray-400 font-body">{char.role}</p>
      )}
    </div>
  );
}

function DialogueBubble({ text, side, color, visible }: {
  text: string; side: "left" | "right"; color: string; visible: boolean;
}) {
  return (
    <div className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div
        className={`relative px-5 py-4 rounded-2xl text-sm font-body leading-relaxed max-w-xs md:max-w-sm text-gray-800 ${
          side === "right" ? "ml-auto rounded-tr-sm" : "mr-auto rounded-tl-sm"
        }`}
        style={{
          background: side === "right" ? `linear-gradient(135deg, ${color}18, ${color}28)` : "#f8f7ff",
          border: `1.5px solid ${side === "right" ? color + "44" : "#e5e7eb"}`,
          boxShadow: side === "right" ? `0 4px 16px ${color}22` : "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <TypewriterText text={text} />
      </div>
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    idx.current = 0;

    const timer = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, 22);

    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayed}{!done && <span className="inline-block w-0.5 h-4 bg-gray-400 animate-pulse ml-0.5 align-middle" />}</span>;
}

export default function ScenarioPlayer({ scenario, onClose, onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const [totalXp, setTotalXp] = useState(0);
  const [xpGained, setXpGained] = useState<number | null>(null);
  const [dialogueVisible, setDialogueVisible] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const step = scenario.steps[stepIndex];
  const progress = ((stepIndex) / scenario.steps.length) * 100;

  const getCharacter = (id?: string): Character | undefined =>
    scenario.characters.find((c) => c.id === id);

  const getActiveChar = (): Character | undefined => {
    if (!step) return undefined;
    return getCharacter(step.character);
  };

  const leftChars = scenario.characters.filter((c) => c.side === "left");
  const rightChars = scenario.characters.filter((c) => c.side === "right");

  const handleNext = () => {
    if (stepIndex < scenario.steps.length - 1) {
      setDialogueVisible(false);
      setSelectedChoice(null);
      setShowConsequence(false);
      setXpGained(null);
      setTimeout(() => {
        setStepIndex((i) => i + 1);
        setDialogueVisible(true);
      }, 300);
    } else {
      setIsCompleted(true);
      onComplete(totalXp);
    }
  };

  const handleChoice = (idx: number) => {
    if (selectedChoice !== null) return;
    const choice = step.choices![idx];
    setSelectedChoice(idx);
    setShowConsequence(true);
    const gained = choice.xp;
    setTotalXp((x) => x + gained);
    setXpGained(gained);
  };

  const canProceed =
    step?.type === "dialogue" ||
    step?.type === "result" ||
    (step?.type === "choice" && selectedChoice !== null);

  // completion screen
  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center animate-scale-in shadow-2xl">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="font-display text-xl font-black text-gray-900 mb-2">Сценарий завершён!</h2>
          <p className="text-gray-500 font-body text-sm mb-6">{scenario.title}</p>

          <div className="bg-violet-50 rounded-2xl p-5 mb-6 border border-violet-100">
            <p className="text-xs text-gray-400 font-body mb-1">Заработано XP</p>
            <p className="font-display text-4xl font-black" style={{ color: "#8b5cf6" }}>+{totalXp}</p>
            <p className="text-xs text-gray-400 mt-1">из {scenario.xp} возможных</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="font-display text-lg font-black text-gray-900">{scenario.steps.filter(s => s.type === "choice").length}</p>
              <p className="text-[11px] text-gray-400">Решений</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-3">
              <p className="font-display text-lg font-black" style={{ color: "#10b981" }}>
                {Math.round((totalXp / scenario.xp) * 100)}%
              </p>
              <p className="text-[11px] text-gray-400">Качество</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-3">
              <p className="font-display text-lg font-black" style={{ color: "#f59e0b" }}>{scenario.emoji}</p>
              <p className="text-[11px] text-gray-400">{scenario.profession}</p>
            </div>
          </div>

          <button onClick={onClose}
            className="w-full py-3.5 rounded-2xl font-display text-sm font-black text-white transition-all duration-200 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #a78bfa)", boxShadow: "0 8px 24px rgba(139,92,246,0.35)" }}>
            Вернуться к сценариям →
          </button>
        </div>
      </div>
    );
  }

  const activeChar = getActiveChar();

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#f8f7ff" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <button onClick={onClose}
          className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <Icon name="X" size={16} className="text-gray-500" />
        </button>
        <div className="flex-1">
          <p className="font-display text-xs font-bold text-gray-900 leading-none">{scenario.title}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{scenario.setting}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-violet-50 rounded-xl px-3 py-1.5 border border-violet-100">
          <span className="text-sm">⚡</span>
          <span className="font-display text-xs font-bold text-violet-600">{totalXp} XP</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100">
        <div className={`h-full bg-gradient-to-r ${scenario.gradient} transition-all duration-500`}
          style={{ width: `${progress}%` }} />
      </div>

      {/* Step counter */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="flex items-center gap-1">
          {scenario.steps.map((_, i) => (
            <div key={i}
              className={`rounded-full transition-all duration-300 ${i === stepIndex ? "w-4 h-2" : "w-2 h-2"}`}
              style={{
                background: i <= stepIndex
                  ? `linear-gradient(90deg, #8b5cf6, #a78bfa)`
                  : "#e5e7eb"
              }} />
          ))}
        </div>
      </div>

      {/* Scene area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4" ref={scrollRef}>
        {/* Characters stage */}
        <div className="flex items-end justify-between px-4 py-4 min-h-[160px]">
          {/* Left characters */}
          <div className="flex gap-4">
            {leftChars.map((char) => (
              <CharacterAvatar
                key={char.id}
                char={char}
                mood={step?.character === char.id ? (step.mood || "neutral") : "neutral"}
                active={step?.character === char.id}
                side="left"
              />
            ))}
          </div>

          {/* VS divider */}
          <div className="flex flex-col items-center gap-1 opacity-20">
            <div className="w-px h-16 bg-gray-300" />
          </div>

          {/* Right characters */}
          <div className="flex gap-4">
            {rightChars.map((char) => (
              <CharacterAvatar
                key={char.id}
                char={char}
                mood={step?.character === char.id ? (step.mood || "neutral") : "neutral"}
                active={step?.character === char.id}
                side="right"
              />
            ))}
          </div>
        </div>

        {/* Dialogue box */}
        {(step?.type === "dialogue") && activeChar && (
          <div className="mb-4">
            <DialogueBubble
              text={step.text}
              side={activeChar.side}
              color={activeChar.color}
              visible={dialogueVisible}
            />
          </div>
        )}

        {/* Choice step */}
        {step?.type === "choice" && (
          <div className="mb-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
                  <Icon name="HelpCircle" size={14} className="text-violet-600" />
                </div>
                <p className="font-display text-xs font-bold text-gray-700">{step.text}</p>
              </div>

              <div className="space-y-2">
                {step.choices!.map((choice, i) => {
                  const isSelected = selectedChoice === i;
                  const isGood = choice.isGood;
                  const revealed = selectedChoice !== null;

                  return (
                    <button
                      key={i}
                      onClick={() => handleChoice(i)}
                      disabled={selectedChoice !== null}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-body transition-all duration-300 border-2 ${
                        !revealed
                          ? "bg-gray-50 border-gray-200 hover:bg-violet-50 hover:border-violet-300 hover:shadow-sm"
                          : isSelected
                          ? isGood
                            ? "bg-emerald-50 border-emerald-300"
                            : "bg-red-50 border-red-300"
                          : "bg-gray-50 border-gray-100 opacity-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-display ${
                          !revealed ? "bg-gray-200 text-gray-500"
                          : isSelected
                          ? isGood ? "bg-emerald-500 text-white" : "bg-red-400 text-white"
                          : "bg-gray-200 text-gray-400"
                        }`}>
                          {revealed && isSelected ? (isGood ? "✓" : "✗") : String.fromCharCode(65 + i)}
                        </div>
                        <span className={revealed && isSelected ? (isGood ? "text-emerald-800" : "text-red-800") : "text-gray-700"}>
                          {choice.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Consequence */}
            {showConsequence && selectedChoice !== null && (
              <div className={`rounded-2xl p-4 border-2 animate-fade-in-up ${
                step.choices![selectedChoice].isGood
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-orange-50 border-orange-200"
              }`}>
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">
                    {step.choices![selectedChoice].isGood ? "✅" : "💡"}
                  </span>
                  <div>
                    <p className={`text-sm font-body leading-relaxed ${
                      step.choices![selectedChoice].isGood ? "text-emerald-800" : "text-orange-800"
                    }`}>
                      {step.choices![selectedChoice].consequence}
                    </p>
                    {xpGained !== null && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs font-bold font-display" style={{ color: "#8b5cf6" }}>+{xpGained} XP</span>
                        <span className="text-xs text-gray-400">получено</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Result step */}
        {step?.type === "result" && (
          <div className="mb-4">
            <div className={`rounded-3xl p-6 border-2 text-center bg-gradient-to-br ${scenario.gradient} border-transparent`}
              style={{ background: `linear-gradient(135deg, ${scenario.gradient.includes('violet') ? '#8b5cf6' : '#8b5cf6'}18, ${scenario.gradient.includes('violet') ? '#a78bfa' : '#a78bfa'}30)`, borderColor: '#8b5cf644' }}>
              <div className="text-4xl mb-3">🎉</div>
              <p className="font-display text-sm font-bold text-gray-900 mb-2 leading-relaxed">{step.text}</p>
              <div className="inline-flex items-center gap-2 bg-white rounded-xl px-4 py-2 mt-3 shadow-sm">
                <span className="text-lg">⚡</span>
                <span className="font-display text-base font-black text-violet-600">+{totalXp} XP</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="px-4 py-4 bg-white border-t border-gray-100">
        {canProceed && (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl font-display text-sm font-black text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
              boxShadow: "0 8px 24px rgba(139,92,246,0.35)"
            }}
          >
            {stepIndex === scenario.steps.length - 1
              ? "Завершить сценарий 🏆"
              : step?.type === "choice" && selectedChoice === null
              ? "Выбери ответ выше ↑"
              : (
                <>
                  Продолжить
                  <Icon name="ChevronRight" size={16} />
                </>
              )
            }
          </button>
        )}
        {step?.type === "choice" && selectedChoice === null && (
          <p className="text-center text-xs text-gray-400 mt-2 font-body">Выбери один из вариантов выше</p>
        )}
      </div>
    </div>
  );
}
