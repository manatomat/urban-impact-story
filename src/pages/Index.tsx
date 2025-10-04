import { useState } from "react";
import { Button } from "@/components/ui/button";
import AsteroidGenerator from "@/components/AsteroidGenerator";
import CitySelector, { City } from "@/components/CitySelector";
import ImpactForecast from "@/components/ImpactForecast";
import ImpactComparison from "@/components/ImpactComparison";
import ImpactTimeline from "@/components/ImpactTimeline";
import heroImage from "@/assets/asteroid-hero.jpg";
import { Shield } from "lucide-react";

interface AsteroidData {
  diameter: number; // in km
  velocity: number; // in km/h
  mass: number; // in kg
  density: number; // in g/cm³
  composition: string;
}

const Index = () => {
  const [asteroid, setAsteroid] = useState<AsteroidData | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showForecast, setShowForecast] = useState(false);

  const compositions = ["Stony", "Iron", "Carbonaceous", "Stony-Iron"];

  // Generate asteroid with realistic statistical distribution
  const generateAsteroid = () => {
    // Diameter (km) - using weighted distribution based on quartiles
    const diameterRand = Math.random();
    let diameter: number;
    if (diameterRand < 0.25) {
      // Q1: 0.001 to 0.02
      diameter = 0.001 + Math.random() * 0.019;
    } else if (diameterRand < 0.5) {
      // Q1 to Q2: 0.02 to 0.03
      diameter = 0.02 + Math.random() * 0.01;
    } else if (diameterRand < 0.75) {
      // Q2 to Q3: 0.03 to 0.09
      diameter = 0.03 + Math.random() * 0.06;
    } else {
      // Q3 to max: 0.09 to 0.97
      diameter = 0.09 + Math.random() * 0.88;
    }

    // Velocity (km/h) - using weighted distribution based on quartiles
    const velocityRand = Math.random();
    let velocity: number;
    if (velocityRand < 0.25) {
      // Min to Q1: 7162 to 27000
      velocity = 7162 + Math.random() * 19838;
    } else if (velocityRand < 0.5) {
      // Q1 to Q2: 27000 to 43660
      velocity = 27000 + Math.random() * 16660;
    } else if (velocityRand < 0.75) {
      // Q2 to Q3: 43660 to 62400
      velocity = 43660 + Math.random() * 18740;
    } else {
      // Q3 to max: 62400 to 160285
      velocity = 62400 + Math.random() * 97885;
    }

    // Density (g/cm³) - using weighted distribution
    const densityRand = Math.random();
    let density: number;
    if (densityRand < 0.25) {
      // Min to Q1: 1.5 to 2.0
      density = 1.5 + Math.random() * 0.5;
    } else if (densityRand < 0.5) {
      // Q1 to Median: 2.0 to 2.95
      density = 2.0 + Math.random() * 0.95;
    } else if (densityRand < 0.75) {
      // Median to Q3: 2.95 to 3.4
      density = 2.95 + Math.random() * 0.45;
    } else {
      // Q3 to max: 3.4 to 6.3
      density = 3.4 + Math.random() * 2.9;
    }

    // Calculate mass: volume * density
    // Volume of sphere: (4/3) * π * r³, diameter in km, convert to cm
    const radiusCm = (diameter * 1000 * 100) / 2; // km to cm
    const volumeCm3 = (4 / 3) * Math.PI * Math.pow(radiusCm, 3);
    const massGrams = volumeCm3 * density;
    const massKg = massGrams / 1000; // convert to kg

    const composition = compositions[Math.floor(Math.random() * compositions.length)];

    setAsteroid({ diameter, velocity, mass: massKg, density, composition });
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
          <div className="mt-12 space-y-8 animate-in fade-in duration-1000">
            <ImpactForecast asteroid={asteroid} city={selectedCity} />
            <ImpactComparison asteroid={asteroid} selectedCity={selectedCity} />
            <ImpactTimeline />
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
