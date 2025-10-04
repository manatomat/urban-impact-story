import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

interface AsteroidData {
  diameter: number; // in km
  velocity: number; // in km/h
  mass: number; // in kg
  density: number; // in g/cm³
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
            <p className="text-3xl font-bold text-primary">{(asteroid.diameter * 3280.84).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ft</p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Velocity</p>
            <p className="text-3xl font-bold text-primary">{(asteroid.velocity * 0.621371).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} mph</p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Mass</p>
            <p className="text-3xl font-bold text-primary">{(asteroid.mass * 0.00110231).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tons</p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Density</p>
            <p className="text-3xl font-bold text-primary">{(asteroid.density * 62.428).toFixed(1)} lb/ft³</p>
          </div>
          <div className="space-y-2 col-span-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Composition</p>
            <p className="text-2xl font-bold text-primary">{asteroid.composition}</p>
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
