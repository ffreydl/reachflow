import { useState, useRef, KeyboardEvent } from "react";
import { Sparkles, Loader2, ImagePlus } from "lucide-react";

interface FloatingPromptBarProps {
  onGenerate: (prompt: string) => void;
  isGenerating?: boolean;
}

const FloatingPromptBar = ({ onGenerate, isGenerating = false }: FloatingPromptBarProps) => {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim() && !isGenerating) {
        onGenerate(prompt);
        setPrompt("");
      }
    }
  };

  const handleGenerate = () => {
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt);
      setPrompt("");
    }
  };

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 input-glow transition-shadow duration-200 animate-slide-up">
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Beschreibe dein Ad Creative"
        rows={1}
        disabled={isGenerating}
        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm resize-none focus:outline-none min-h-[24px] max-h-[120px] disabled:opacity-50"
      />

      {/* Bottom bar with actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
        {/* Upload button */}
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 text-sm"
          disabled={isGenerating}
        >
          <ImagePlus className="w-4 h-4" />
          <span>Assets hinzufügen</span>
        </button>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="generate-btn flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all duration-200 ease-out hover:shadow-glow disabled:opacity-40 disabled:cursor-not-allowed btn-press"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generiere...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generieren</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingPromptBar;
