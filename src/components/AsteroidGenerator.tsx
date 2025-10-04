import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

interface AsteroidData {
  diameter: number;
  velocity: number;
  mass: number;
  composition: string;
}

interface AsteroidGeneratorProps {
  asteroid: AsteroidData | null;
  onGenerate: () => void;
}

const AsteroidGenerator = ({ asteroid, onGenerate }: AsteroidGeneratorProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Asteroid Parameters</h2>
        <Button 
          onClick={onGenerate}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Asteroid
        </Button>
      </div>
      
      {asteroid ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Diameter</p>
            <p className="text-3xl font-bold text-primary">{asteroid.diameter.toFixed(0)}m</p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Velocity</p>
            <p className="text-3xl font-bold text-primary">{asteroid.velocity.toFixed(1)} km/s</p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Mass</p>
            <p className="text-3xl font-bold text-primary">{(asteroid.mass / 1000000).toFixed(1)}M tons</p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Composition</p>
            <p className="text-3xl font-bold text-primary">{asteroid.composition}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Click "Generate New Asteroid" to begin simulation
        </div>
      )}
    </Card>
  );
};

export default AsteroidGenerator;
