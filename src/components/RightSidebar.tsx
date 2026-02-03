import ObjectiveSelector from "./ObjectiveSelector";
import AngleSelector from "./AngleSelector";
import AspectRatioSelector from "./AspectRatioSelector";

interface RightSidebarProps {
  selectedObjective: string;
  onObjectiveSelect: (id: string) => void;
  selectedAngle: string;
  onAngleSelect: (id: string) => void;
  selectedRatio: string;
  onRatioSelect: (id: string) => void;
}

const RightSidebar = ({
  selectedObjective,
  onObjectiveSelect,
  selectedAngle,
  onAngleSelect,
  selectedRatio,
  onRatioSelect,
}: RightSidebarProps) => {
  return (
    <aside className="w-85 shrink-0 glass-panel rounded-2xl p-5 space-y-6 h-fit animate-fade-in lg:block hidden">
      <ObjectiveSelector selected={selectedObjective} onSelect={onObjectiveSelect} />
      <AngleSelector selected={selectedAngle} onSelect={onAngleSelect} />
      <AspectRatioSelector selected={selectedRatio} onSelect={onRatioSelect} />
    </aside>
  );
};

export default RightSidebar;
