import { Card } from "@/components/ui/card";
import { AlertTriangle, DollarSign, Users, Flame } from "lucide-react";
import { City } from "./CitySelector";

interface AsteroidData {
  diameter: number;
  velocity: number;
  mass: number;
  composition: string;
}

interface ImpactForecastProps {
  asteroid: AsteroidData;
  city: City;
}

const calculateImpact = (asteroid: AsteroidData, city: City) => {
  // Energy calculation (simplified): E = 0.5 * m * v^2
  const velocityMs = asteroid.velocity * 1000; // convert to m/s
  const energyJoules = 0.5 * asteroid.mass * velocityMs * velocityMs;
  const energyMegatons = energyJoules / (4.184 * Math.pow(10, 15)); // Convert to megatons of TNT

  // Impact radius (simplified model based on energy)
  const impactRadiusKm = Math.pow(energyMegatons, 0.33) * 2.5;
  const impactAreaKm2 = Math.PI * impactRadiusKm * impactRadiusKm;

  // Casualty estimation (very simplified)
  const cityDensity = city.population / 1000; // rough density per km2
  const affectedPopulation = Math.min(
    Math.floor(impactAreaKm2 * cityDensity * 0.7),
    city.population
  );
  const casualties = Math.floor(affectedPopulation * 0.45); // rough 45% casualty rate in impact zone

  // Economic damage (simplified)
  const infrastructureDamage = impactAreaKm2 * 500; // $500M per km2
  const gdpLoss = city.gdp * 0.3; // 30% GDP loss
  const totalDamage = infrastructureDamage + gdpLoss * 1000; // in millions

  // Earthquake magnitude equivalent
  const earthquakeMagnitude = Math.log10(energyJoules) / 1.5 - 4.8;

  return {
    energyMegatons: energyMegatons.toFixed(1),
    impactRadiusKm: impactRadiusKm.toFixed(1),
    affectedPopulation,
    casualties,
    totalDamage: totalDamage.toFixed(0),
    earthquakeMagnitude: earthquakeMagnitude.toFixed(1),
  };
};

const ImpactForecast = ({ asteroid, city }: ImpactForecastProps) => {
  const impact = calculateImpact(asteroid, city);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Impact Assessment</h2>
        <p className="text-muted-foreground">
          Forecasted consequences of impact in {city.name}, {city.state}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-danger/20 to-card border-danger/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-danger/20 rounded-lg">
              <Users className="h-6 w-6 text-danger" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Human Impact</p>
              <p className="text-3xl font-bold text-danger">
                {impact.casualties.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Estimated casualties</p>
              <p className="text-lg font-semibold text-foreground mt-2">
                {impact.affectedPopulation.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">People in impact zone</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-warning/20 to-card border-warning/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-warning/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-warning" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Economic Damage</p>
              <p className="text-3xl font-bold text-warning">
                ${impact.totalDamage}M
              </p>
              <p className="text-sm text-muted-foreground">Total estimated cost</p>
              <p className="text-lg font-semibold text-foreground mt-2">
                {((parseFloat(impact.totalDamage) / (city.gdp * 1000)) * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-muted-foreground">Of city GDP</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/20 to-card border-primary/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Flame className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Impact Energy</p>
              <p className="text-3xl font-bold text-primary">
                {impact.energyMegatons} MT
              </p>
              <p className="text-sm text-muted-foreground">Megatons of TNT equivalent</p>
              <p className="text-lg font-semibold text-foreground mt-2">
                Mag {impact.earthquakeMagnitude}
              </p>
              <p className="text-xs text-muted-foreground">Earthquake equivalent</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-info/20 to-card border-info/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-info/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-info" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Affected Area</p>
              <p className="text-3xl font-bold text-info">
                {impact.impactRadiusKm} km
              </p>
              <p className="text-sm text-muted-foreground">Impact radius</p>
              <p className="text-lg font-semibold text-foreground mt-2">
                {(Math.PI * parseFloat(impact.impactRadiusKm) * parseFloat(impact.impactRadiusKm)).toFixed(0)} km²
              </p>
              <p className="text-xs text-muted-foreground">Total affected area</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-card/50 border-border">
        <h3 className="text-lg font-bold text-foreground mb-3">Ecological Impact</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Massive dust and debris ejected into atmosphere, blocking sunlight</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Temperature drop of 5-10°C in surrounding regions for months</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Wildfires spreading up to {(parseFloat(impact.impactRadiusKm) * 3).toFixed(0)} km from impact</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Severe disruption to local ecosystems and food chains</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Long-term soil contamination and water supply disruption</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ImpactForecast;
