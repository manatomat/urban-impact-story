import { Card } from "@/components/ui/card";
import { AlertTriangle, DollarSign, Users, Flame } from "lucide-react";
import { City } from "./CitySelector";

interface AsteroidData {
  diameter: number; // in km
  velocity: number; // in km/h
  mass: number; // in kg
  density: number; // in g/cm³
  composition: string;
}

interface ImpactForecastProps {
  asteroid: AsteroidData;
  city: City;
}

const calculateImpact = (asteroid: AsteroidData, city: City) => {
  // Convert velocity from km/h to m/s
  const velocityMs = (asteroid.velocity * 1000) / 3600;
  
  // Kinetic Energy: E = 0.5 * m * v^2 (in Joules)
  const kineticEnergyJoules = 0.5 * asteroid.mass * Math.pow(velocityMs, 2);
  
  // Convert to megatons of TNT (1 megaton = 4.184 × 10^15 joules)
  const energyMegatons = kineticEnergyJoules / (4.184 * Math.pow(10, 15));
  
  // Earthquake magnitude using Gutenberg-Richter relation
  const earthquakeMagnitude = (2/3) * Math.log10(kineticEnergyJoules) - 10.7;
  
  // Crater diameter (in meters) using scaling laws
  // D = 1.161 * (E^0.263) where E is in megatons
  const craterDiameterM = 1.161 * Math.pow(energyMegatons * 1000, 0.263) * 1000;
  const craterDiameterFt = craterDiameterM * 3.28084;
  
  // Damage zones based on overpressure effects (in km)
  // Total destruction: >50 psi overpressure
  const totalDestructionRadius = Math.pow(energyMegatons, 0.33) * 1.2;
  // Severe destruction: 20-50 psi
  const severeDestructionRadius = Math.pow(energyMegatons, 0.33) * 2.0;
  // Moderate damage: 5-20 psi
  const moderateDamageRadius = Math.pow(energyMegatons, 0.33) * 4.0;
  // Mild damage: 1-5 psi
  const mildDamageRadius = Math.pow(energyMegatons, 0.33) * 8.0;
  
  // Population density per km² (rough estimate based on city area)
  const cityAreaKm2 = 1000; // approximate urban area
  const popDensity = city.population / cityAreaKm2;
  
  // Calculate casualties by zone
  const totalDestructionArea = Math.PI * Math.pow(totalDestructionRadius, 2);
  const severeDestructionArea = Math.PI * (Math.pow(severeDestructionRadius, 2) - Math.pow(totalDestructionRadius, 2));
  const moderateDamageArea = Math.PI * (Math.pow(moderateDamageRadius, 2) - Math.pow(severeDestructionRadius, 2));
  const mildDamageArea = Math.PI * (Math.pow(mildDamageRadius, 2) - Math.pow(moderateDamageRadius, 2));
  
  // Casualty rates by zone
  const totalDestructionDeaths = Math.floor(totalDestructionArea * popDensity * 0.95); // 95% fatality
  const severeDestructionDeaths = Math.floor(severeDestructionArea * popDensity * 0.65); // 65% fatality
  const moderateDamageDeaths = Math.floor(moderateDamageArea * popDensity * 0.25); // 25% fatality
  const mildDamageDeaths = Math.floor(mildDamageArea * popDensity * 0.05); // 5% fatality
  
  const totalCasualties = totalDestructionDeaths + severeDestructionDeaths + moderateDamageDeaths + mildDamageDeaths;
  const totalAffected = Math.floor((totalDestructionArea + severeDestructionArea + moderateDamageArea + mildDamageArea) * popDensity);
  
  // Economic damage (in billions)
  const infrastructureDamage = (
    totalDestructionArea * 2000 + // $2B per km²
    severeDestructionArea * 1000 + // $1B per km²
    moderateDamageArea * 300 + // $300M per km²
    mildDamageArea * 50 // $50M per km²
  );
  const gdpLoss = city.gdp * 0.4; // 40% GDP loss
  const totalDamage = infrastructureDamage + gdpLoss * 1000; // in millions

  return {
    kineticEnergyJoules,
    energyMegatons: energyMegatons.toFixed(1),
    earthquakeMagnitude: earthquakeMagnitude.toFixed(1),
    craterDiameterFt: craterDiameterFt.toFixed(0),
    damageZones: {
      totalDestruction: totalDestructionRadius.toFixed(2),
      severeDestruction: severeDestructionRadius.toFixed(2),
      moderateDamage: moderateDamageRadius.toFixed(2),
      mildDamage: mildDamageRadius.toFixed(2),
    },
    casualties: {
      totalDestruction: totalDestructionDeaths,
      severeDestruction: severeDestructionDeaths,
      moderateDamage: moderateDamageDeaths,
      mildDamage: mildDamageDeaths,
      total: totalCasualties,
    },
    affectedPopulation: totalAffected,
    totalDamage: totalDamage.toFixed(0),
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

      {/* Impact Energy & Physics */}
      <div className="grid md:grid-cols-3 gap-4">
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
              <p className="text-sm text-muted-foreground">Megatons of TNT</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-warning/20 to-card border-warning/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-warning/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Earthquake</p>
              <p className="text-3xl font-bold text-warning">
                {impact.earthquakeMagnitude}
              </p>
              <p className="text-sm text-muted-foreground">Magnitude equivalent</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-info/20 to-card border-info/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-info/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-info" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Crater Size</p>
              <p className="text-3xl font-bold text-info">
                {impact.craterDiameterFt} ft
              </p>
              <p className="text-sm text-muted-foreground">Diameter</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Damage Zones Visualization */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">Damage Zones from Epicenter</h3>
        <div className="relative w-full h-96 bg-gradient-to-br from-background to-muted rounded-lg overflow-hidden flex items-center justify-center">
          {/* Concentric circles - mild damage (outermost) */}
          <div 
            className="absolute rounded-full border-4 border-info/40 bg-info/5"
            style={{
              width: '90%',
              height: '90%',
            }}
          />
          {/* Moderate damage */}
          <div 
            className="absolute rounded-full border-4 border-warning/50 bg-warning/10"
            style={{
              width: '60%',
              height: '60%',
            }}
          />
          {/* Severe destruction */}
          <div 
            className="absolute rounded-full border-4 border-danger/60 bg-danger/15"
            style={{
              width: '35%',
              height: '35%',
            }}
          />
          {/* Total destruction (innermost) */}
          <div 
            className="absolute rounded-full border-4 border-danger bg-danger/30"
            style={{
              width: '15%',
              height: '15%',
            }}
          />
          {/* Epicenter */}
          <div className="absolute w-4 h-4 bg-danger rounded-full animate-pulse" />
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 p-4 rounded-lg border border-border space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-danger border-2 border-danger" />
              <span className="text-foreground">Total Destruction: {impact.damageZones.totalDestruction} km</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-danger/15 border-2 border-danger/60" />
              <span className="text-foreground">Severe Destruction: {impact.damageZones.severeDestruction} km</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-warning/10 border-2 border-warning/50" />
              <span className="text-foreground">Moderate Damage: {impact.damageZones.moderateDamage} km</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-info/5 border-2 border-info/40" />
              <span className="text-foreground">Mild Damage: {impact.damageZones.mildDamage} km</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Human Impact */}
      <Card className="p-6 bg-gradient-to-br from-danger/20 to-card border-danger/50">
        <div className="flex items-start space-x-4 mb-6">
          <div className="p-3 bg-danger/20 rounded-lg">
            <Users className="h-6 w-6 text-danger" />
          </div>
          <div className="space-y-1 flex-1">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Casualties</p>
            <p className="text-4xl font-bold text-danger">
              {impact.casualties.total.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Estimated deaths</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-danger/30">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">Total Destruction Zone</p>
            <p className="text-2xl font-bold text-danger">{impact.casualties.totalDestruction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">95% fatality rate</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">Severe Destruction Zone</p>
            <p className="text-2xl font-bold text-danger/80">{impact.casualties.severeDestruction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">65% fatality rate</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">Moderate Damage Zone</p>
            <p className="text-2xl font-bold text-warning">{impact.casualties.moderateDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">25% fatality rate</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">Mild Damage Zone</p>
            <p className="text-2xl font-bold text-info">{impact.casualties.mildDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">5% fatality rate</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-danger/30">
          <p className="text-lg font-semibold text-foreground">
            {impact.affectedPopulation.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total people in affected zones</p>
        </div>
      </Card>

      {/* Economic Impact */}
      <Card className="p-6 bg-gradient-to-br from-warning/20 to-card border-warning/50">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-warning/20 rounded-lg">
            <DollarSign className="h-6 w-6 text-warning" />
          </div>
          <div className="space-y-1 flex-1">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Economic Damage</p>
            <p className="text-4xl font-bold text-warning">
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

      {/* Ecological Impact */}
      <Card className="p-6 bg-card/50 border-border">
        <h3 className="text-lg font-bold text-foreground mb-3">Ecological & Environmental Impact</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Massive dust and debris ejected into atmosphere, blocking sunlight for weeks</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Temperature drop of 5-10°C in surrounding regions for months</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Wildfires spreading up to {(parseFloat(impact.damageZones.mildDamage) * 2).toFixed(0)} km from impact</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Severe disruption to local ecosystems and food chains</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Long-term soil contamination and water supply disruption affecting millions</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Atmospheric shock waves detectable thousands of kilometers away</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ImpactForecast;
