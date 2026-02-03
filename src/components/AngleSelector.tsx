import { MessageSquareQuote, Lightbulb, Tag, Clock, Award, Zap } from "lucide-react";

export const angles = [
  { id: "social-proof", label: "Social Proof", icon: MessageSquareQuote },
  { id: "offer", label: "Angebot", icon: Tag },
  { id: "authority", label: "Autorität", icon: Award },
  { id: "benefit", label: "Nutzen", icon: Zap },
];

interface AngleSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

const AngleSelector = ({ selected, onSelect }: AngleSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Werbewinkel</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {angles.map((angle) => {
          const IconComponent = angle.icon;
          return (
            <button
              key={angle.id}
              onClick={() => onSelect(angle.id)}
              className={`preset-card flex items-center gap-2 p-3 btn-press ${
                selected === angle.id ? "selected" : ""
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                selected === angle.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted/50 text-muted-foreground"
              }`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <span className={`text-xs font-medium transition-colors duration-200 ${
                selected === angle.id ? "text-foreground" : "text-muted-foreground"
              }`}>
                {angle.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AngleSelector;
