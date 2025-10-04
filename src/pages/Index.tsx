import { useState } from "react";
import { Button } from "@/components/ui/button";
import AsteroidGenerator from "@/components/AsteroidGenerator";
import CitySelector, { City } from "@/components/CitySelector";
import ImpactForecast from "@/components/ImpactForecast";
import heroImage from "@/assets/asteroid-hero.jpg";
import { Shield } from "lucide-react";

interface AsteroidData {
  diameter: number;
  velocity: number;
  mass: number;
  composition: string;
}

const Index = () => {
  const [asteroid, setAsteroid] = useState<AsteroidData | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showForecast, setShowForecast] = useState(false);

  const compositions = ["Stony", "Iron", "Carbonaceous", "Stony-Iron"];

  const generateAsteroid = () => {
    const diameter = Math.floor(Math.random() * 900) + 100; // 100-1000m
    const velocity = Math.random() * 50 + 10; // 10-60 km/s
    const density = 2500; // kg/m³ average
    const volume = (4 / 3) * Math.PI * Math.pow(diameter / 2, 3);
    const mass = volume * density;
    const composition = compositions[Math.floor(Math.random() * compositions.length)];

    setAsteroid({ diameter, velocity, mass, composition });
    setShowForecast(false);
  };

  const handleRunSimulation = () => {
    if (asteroid && selectedCity) {
      setShowForecast(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="inline-flex items-center px-4 py-2 bg-primary/20 border border-primary/50 rounded-full mb-6">
            <Shield className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              NASA Planetary Defense
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
            Asteroid Impact Simulator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Understanding the catastrophic consequences of near-Earth object impacts on major US cities
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">The Threat is Real</h2>
          <p className="text-lg text-muted-foreground">
            Over 25,000 near-Earth asteroids have been discovered. While planetary defense systems
            are improving, the potential for a catastrophic impact remains. This simulator demonstrates
            the devastating effects such an event could have on major population centers.
          </p>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          <AsteroidGenerator asteroid={asteroid} onGenerate={generateAsteroid} />
          <CitySelector selectedCity={selectedCity} onCitySelect={setSelectedCity} />
        </div>

        {/* Run Simulation Button */}
        {asteroid && selectedCity && !showForecast && (
          <div className="text-center py-8">
            <Button
              onClick={handleRunSimulation}
              size="lg"
              className="bg-danger text-white hover:bg-danger/90 shadow-danger text-xl px-12 py-6 animate-pulse-glow"
            >
              Calculate Impact
            </Button>
          </div>
        )}

        {/* Impact Forecast */}
        {showForecast && asteroid && selectedCity && (
          <div className="mt-12 animate-in fade-in duration-1000">
            <ImpactForecast asteroid={asteroid} city={selectedCity} />
          </div>
        )}

        {/* Call to Action */}
        {showForecast && (
          <div className="mt-16 p-8 bg-card border-2 border-primary/50 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Planetary Defense is Critical
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              These scenarios are not science fiction. Investment in detection systems, deflection
              technologies, and emergency response planning is essential to protect our cities and
              our future.
            </p>
            <Button
              onClick={() => {
                setShowForecast(false);
                generateAsteroid();
                setSelectedCity(null);
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Run Another Simulation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
