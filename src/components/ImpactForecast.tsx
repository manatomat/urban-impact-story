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
  const energyKilotons = energyMegatons * 1000;
  
  // Earthquake magnitude using corrected Gutenberg-Richter relation
  // M = (2/3) * log10(E) - 4.8, where E is in joules
  const earthquakeMagnitude = Math.max(0, (2/3) * Math.log10(kineticEnergyJoules) - 4.8);
  
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
  
  // Injuries calculation (separate from deaths)
  // Injury rates typically 2-3x higher than death rates in each zone
  const totalDestructionInjured = Math.floor(totalDestructionArea * popDensity * 0.05 * 2.5); // 5% survival rate, most injured
  const severeDestructionInjured = Math.floor(severeDestructionArea * popDensity * 0.35 * 2.0); // 35% survival rate
  const moderateDamageInjured = Math.floor(moderateDamageArea * popDensity * 0.75 * 1.5); // 75% survival rate
  const mildDamageInjured = Math.floor(mildDamageArea * popDensity * 0.95 * 0.8); // 95% survival rate
  const totalInjured = totalDestructionInjured + severeDestructionInjured + moderateDamageInjured + mildDamageInjured;
  
  // Economic damage (in billions)
  const infrastructureDamage = (
    totalDestructionArea * 2000 + // $2B per km²
    severeDestructionArea * 1000 + // $1B per km²
    moderateDamageArea * 300 + // $300M per km²
    mildDamageArea * 50 // $50M per km²
  ) / 1000; // Convert to billions
  const gdpLoss = city.gdp * 0.4; // 40% GDP loss in billions
  const totalDamageBillions = infrastructureDamage + gdpLoss;

  // Format energy display
  const energyDisplay = energyMegatons >= 1 
    ? `${energyMegatons.toFixed(1)} MT`
    : `${energyKilotons.toFixed(1)} KT`;
  const energyLabel = energyMegatons >= 1 ? "Megatons" : "Kilotons";

  return {
    kineticEnergyJoules,
    energyDisplay,
    energyLabel,
    earthquakeMagnitude: earthquakeMagnitude.toFixed(1),
    craterDiameterFt: Math.round(craterDiameterFt).toLocaleString(),
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
    injuries: {
      totalDestruction: totalDestructionInjured,
      severeDestruction: severeDestructionInjured,
      moderateDamage: moderateDamageInjured,
      mildDamage: mildDamageInjured,
      total: totalInjured,
    },
    affectedPopulation: totalAffected,
    totalDamageBillions,
    infrastructureDamageBillions: infrastructureDamage,
    gdpLossBillions: gdpLoss,
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
                {impact.energyDisplay}
              </p>
              <p className="text-sm text-muted-foreground">{impact.energyLabel} of TNT</p>
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
                {impact.craterDiameterFt}
              </p>
              <p className="text-sm text-muted-foreground">Feet diameter</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Damage Zones Visualization with Map */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">Impact Zone Overlay: {city.name}, {city.state}</h3>
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-border">
          {/* Base Map Layer */}
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${city.lat},${city.lng}&zoom=10&maptype=satellite`}
            className="absolute inset-0"
          />
          
          {/* Damage Zone Overlays */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Mild damage (outermost) */}
            <div 
              className="absolute rounded-full border-4 border-info/60 bg-info/10"
              style={{
                width: '85%',
                height: '85%',
              }}
            />
            {/* Moderate damage */}
            <div 
              className="absolute rounded-full border-4 border-warning/70 bg-warning/15"
              style={{
                width: '55%',
                height: '55%',
              }}
            />
            {/* Severe destruction */}
            <div 
              className="absolute rounded-full border-4 border-danger/80 bg-danger/20"
              style={{
                width: '30%',
                height: '30%',
              }}
            />
            {/* Total destruction (innermost) */}
            <div 
              className="absolute rounded-full border-4 border-danger bg-danger/40"
              style={{
                width: '12%',
                height: '12%',
              }}
            />
            {/* Epicenter */}
            <div className="absolute w-6 h-6 bg-danger rounded-full animate-pulse shadow-lg shadow-danger" />
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg border border-border space-y-2 text-sm max-w-xs">
            <p className="font-bold text-foreground mb-2">Damage Zones</p>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-danger border-2 border-danger" />
              <span className="text-foreground">Total Destruction: {impact.damageZones.totalDestruction} km radius</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-danger/20 border-2 border-danger/80" />
              <span className="text-foreground">Severe Destruction: {impact.damageZones.severeDestruction} km radius</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-warning/15 border-2 border-warning/70" />
              <span className="text-foreground">Moderate Damage: {impact.damageZones.moderateDamage} km radius</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-info/10 border-2 border-info/60" />
              <span className="text-foreground">Mild Damage: {impact.damageZones.mildDamage} km radius</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Human Impact */}
      <Card className="p-6 bg-gradient-to-br from-danger/20 to-card border-danger/50">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-start space-x-4">
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
          
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-warning/20 rounded-lg">
              <Users className="h-6 w-6 text-warning" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Injured</p>
              <p className="text-4xl font-bold text-warning">
                {impact.injuries.total.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Estimated injuries</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-danger/30">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">Total Destruction Zone</p>
            <p className="text-2xl font-bold text-danger">{impact.casualties.totalDestruction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Deaths (95% fatality)</p>
            <p className="text-lg font-semibold text-warning mt-1">{impact.injuries.totalDestruction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Injured</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">Severe Destruction Zone</p>
            <p className="text-2xl font-bold text-danger/80">{impact.casualties.severeDestruction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Deaths (65% fatality)</p>
            <p className="text-lg font-semibold text-warning mt-1">{impact.injuries.severeDestruction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Injured</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">Moderate Damage Zone</p>
            <p className="text-2xl font-bold text-warning">{impact.casualties.moderateDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Deaths (25% fatality)</p>
            <p className="text-lg font-semibold text-warning mt-1">{impact.injuries.moderateDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Injured</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">Mild Damage Zone</p>
            <p className="text-2xl font-bold text-info">{impact.casualties.mildDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Deaths (5% fatality)</p>
            <p className="text-lg font-semibold text-warning mt-1">{impact.injuries.mildDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Injured</p>
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
        <div className="flex items-start space-x-4 mb-6">
          <div className="p-3 bg-warning/20 rounded-lg">
            <DollarSign className="h-6 w-6 text-warning" />
          </div>
          <div className="space-y-1 flex-1">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Economic Damage</p>
            <p className="text-4xl font-bold text-warning">
              ${impact.totalDamageBillions >= 1000 
                ? `${(impact.totalDamageBillions / 1000).toFixed(2)} Trillion` 
                : `${impact.totalDamageBillions.toFixed(2)} Billion`}
            </p>
            <p className="text-sm text-muted-foreground">Total estimated cost</p>
            <p className="text-lg font-semibold text-foreground mt-2">
              {((impact.totalDamageBillions / city.gdp) * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-muted-foreground">Of city annual GDP</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-warning/30">
          <h4 className="font-bold text-foreground text-lg mb-3">Critical Infrastructure Damage</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Healthcare Systems</p>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• {Math.floor(impact.casualties.total / 5000)} hospitals destroyed or damaged</li>
                <li>• Emergency services overwhelmed</li>
                <li>• Medical supply shortages</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Education</p>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• {Math.floor(impact.casualties.total / 3000)} schools affected</li>
                <li>• {Math.floor(impact.affectedPopulation * 0.18).toLocaleString()} students displaced</li>
                <li>• Academic year disrupted</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Government & Emergency</p>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• City hall and municipal buildings damaged</li>
                <li>• {Math.floor(impact.casualties.total / 10000)} fire stations destroyed</li>
                <li>• Police infrastructure compromised</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Transportation</p>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• Major airport operations ceased</li>
                <li>• {Math.floor(parseFloat(impact.damageZones.mildDamage) * 100)} miles of roads destroyed</li>
                <li>• Public transit system inoperable</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Utilities</p>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• Power grid failure affecting {(impact.affectedPopulation * 1.5).toLocaleString()} people</li>
                <li>• Water treatment plants damaged</li>
                <li>• Gas lines ruptured, fire risk</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Business & Finance</p>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• {Math.floor(impact.casualties.total / 500).toLocaleString()} businesses destroyed</li>
                <li>• Financial district operations halted</li>
                <li>• ${impact.gdpLossBillions.toFixed(0)}B in GDP loss (40% annual GDP)</li>
              </ul>
            </div>
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
