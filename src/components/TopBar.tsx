import { Plus } from "lucide-react";
import logo from "../assets/reachflow.png";

const TopBar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 glass-panel border-b border-border/50">

            <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="ReachFlow Logo"
                    className="h-8 w-auto object-contain"
                />
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all duration-150 ease-out hover:shadow-glow btn-press">
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                <span>Neues Creative</span>
            </button>
        </header>
    );
};

export default TopBar;
