import { useState, useRef, useEffect } from "react";

const aspectRatios = [
  { id: "1:1", label: "1:1", desc: "Feed" },
  { id: "4:5", label: "4:5", desc: "Portrait" },
  { id: "9:16", label: "9:16", desc: "Story/Reel" },
  { id: "16:9", label: "16:9", desc: "YouTube" },
  { id: "1.91:1", label: "1.91:1", desc: "Facebook" },
  { id: "2:3", label: "2:3", desc: "Pinterest" },
];

interface AspectRatioSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

const AspectRatioSelector = ({ selected, onSelect }: AspectRatioSelectorProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const selectedButton = buttonRefs.current.get(selected);
    const container = containerRef.current;
    
    if (selectedButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = selectedButton.getBoundingClientRect();
      
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        top: buttonRect.top - containerRect.top,
        width: buttonRect.width,
        height: buttonRect.height,
      });
    }
  }, [selected]);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Format</h3>
      
      <div ref={containerRef} className="relative grid grid-cols-3 gap-2 p-1 rounded-xl bg-muted/30">
        {/* Animated background indicator */}
        <div
          className="absolute rounded-lg bg-primary transition-all duration-200 ease-out"
          style={indicatorStyle}
        />
        
        {aspectRatios.map((ratio) => (
          <button
            key={ratio.id}
            ref={(el) => {
              if (el) buttonRefs.current.set(ratio.id, el);
            }}
            onClick={() => onSelect(ratio.id)}
            className={`relative z-10 py-2.5 px-1 rounded-lg text-center transition-colors duration-200 btn-press ${
              selected === ratio.id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="text-sm font-medium">{ratio.label}</div>
            <div className={`text-[10px] mt-0.5 transition-colors duration-200 ${
              selected === ratio.id ? "text-primary-foreground/80" : "text-muted-foreground/70"
            }`}>
              {ratio.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
