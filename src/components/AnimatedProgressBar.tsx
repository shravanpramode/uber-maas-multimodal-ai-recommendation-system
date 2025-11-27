import { Car, Train, Bus, Footprints } from "lucide-react";

interface AnimatedProgressBarProps {
  progress: number; // 0-100
  mode: 'auto' | 'bike' | 'uber-go' | 'go-sedan' | 'uber-xl' | 'metro' | 'bus' | 'suburban-train' | 'walk';
}

const AnimatedProgressBar = ({ progress, mode }: AnimatedProgressBarProps) => {
  const getIcon = () => {
    switch (mode) {
      case 'metro':
      case 'suburban-train':
        return <Train className="w-4 h-4 text-foreground" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-foreground" />;
      case 'walk':
        return <Footprints className="w-4 h-4 text-foreground" />;
      default:
        return <Car className="w-4 h-4 text-foreground" />;
    }
  };

  return (
    <div className="relative w-full h-6 flex items-center">
      {/* Track line */}
      <div className="absolute left-3 right-3 h-[2px] bg-muted-foreground/30" />
      
      {/* Progress line */}
      <div 
        className="absolute left-3 h-[2px] bg-foreground transition-all duration-1000 ease-linear"
        style={{ width: `calc(${Math.min(progress, 100)}% - 24px)` }}
      />
      
      {/* Start dot */}
      <div className="absolute left-0 w-3 h-3 rounded-full bg-muted-foreground/50 border-2 border-background" />
      
      {/* Moving icon */}
      <div 
        className="absolute transition-all duration-1000 ease-linear z-10"
        style={{ left: `calc(${Math.min(progress, 100)}% - 8px)` }}
      >
        <div className="bg-card rounded-full p-1 shadow-md border border-border">
          {getIcon()}
        </div>
      </div>
      
      {/* End dot */}
      <div className="absolute right-0 w-3 h-3 rounded-full bg-foreground border-2 border-background" />
    </div>
  );
};

export default AnimatedProgressBar;
