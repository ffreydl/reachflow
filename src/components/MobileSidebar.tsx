import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ObjectiveSelector from "./ObjectiveSelector";
import AngleSelector from "./AngleSelector";
import AspectRatioSelector from "./AspectRatioSelector";

interface MobileSidebarProps {
  selectedObjective: string;
  onObjectiveSelect: (id: string) => void;
  selectedAngle: string;
  onAngleSelect: (id: string) => void;
  selectedRatio: string;
  onRatioSelect: (id: string) => void;
}

const MobileSidebar = ({
  selectedObjective,
  onObjectiveSelect,
  selectedAngle,
  onAngleSelect,
  selectedRatio,
  onRatioSelect,
}: MobileSidebarProps) => {
  const [objectiveOpen, setObjectiveOpen] = useState(false);
  const [angleOpen, setAngleOpen] = useState(false);
  const [ratioOpen, setRatioOpen] = useState(false);

  return (
    <div className="lg:hidden space-y-3 animate-fade-in">
      {/* Objective Accordion */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <button
          onClick={() => setObjectiveOpen(!objectiveOpen)}
          className="w-full flex items-center justify-between p-4 text-sm font-medium text-foreground"
        >
          <span>Ziel</span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              objectiveOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            objectiveOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4">
            <ObjectiveSelector selected={selectedObjective} onSelect={onObjectiveSelect} />
          </div>
        </div>
      </div>

      {/* Angle Accordion */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <button
          onClick={() => setAngleOpen(!angleOpen)}
          className="w-full flex items-center justify-between p-4 text-sm font-medium text-foreground"
        >
          <span>Werbewinkel</span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              angleOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            angleOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4">
            <AngleSelector selected={selectedAngle} onSelect={onAngleSelect} />
          </div>
        </div>
      </div>

      {/* Ratio Accordion */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <button
          onClick={() => setRatioOpen(!ratioOpen)}
          className="w-full flex items-center justify-between p-4 text-sm font-medium text-foreground"
        >
          <span>Format</span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              ratioOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            ratioOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4">
            <AspectRatioSelector selected={selectedRatio} onSelect={onRatioSelect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
