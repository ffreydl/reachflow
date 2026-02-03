import { Eye, Target, RefreshCw, Users, Megaphone } from "lucide-react";

const objectives = [
  { id: "awareness", label: "Awareness", icon: Eye },
  { id: "conversion", label: "Conversion", icon: Target },
  { id: "retargeting", label: "Retargeting", icon: RefreshCw },
  { id: "reach", label: "Reach", icon: Megaphone },
];

interface ObjectiveSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

const ObjectiveSelector = ({ selected, onSelect }: ObjectiveSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Ziel</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {objectives.map((objective) => {
          const IconComponent = objective.icon;
          return (
            <button
              key={objective.id}
              onClick={() => onSelect(objective.id)}
              className={`preset-card flex items-center gap-2 p-3 btn-press ${
                selected === objective.id ? "selected" : ""
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                selected === objective.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted/50 text-muted-foreground"
              }`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <span className={`text-xs font-medium transition-colors duration-200 ${
                selected === objective.id ? "text-foreground" : "text-muted-foreground"
              }`}>
                {objective.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ObjectiveSelector;
