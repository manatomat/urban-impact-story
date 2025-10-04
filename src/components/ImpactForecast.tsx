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

export interface ImpactForecastProps {
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
  const totalDestructionRadiusKm = Math.pow(energyMegatons, 0.33) * 1.2;
  // Severe destruction: 20-50 psi
  const severeDestructionRadiusKm = Math.pow(energyMegatons, 0.33) * 2.0;
  // Moderate damage: 5-20 psi
  const moderateDamageRadiusKm = Math.pow(energyMegatons, 0.33) * 4.0;
  // Mild damage: 1-5 psi
  const mildDamageRadiusKm = Math.pow(energyMegatons, 0.33) * 8.0;
  
  // Convert to miles
  const totalDestructionRadius = totalDestructionRadiusKm * 0.621371;
  const severeDestructionRadius = severeDestructionRadiusKm * 0.621371;
  const moderateDamageRadius = moderateDamageRadiusKm * 0.621371;
  const mildDamageRadius = mildDamageRadiusKm * 0.621371;
  
  // Population density per km² (rough estimate based on city area)
  const cityAreaKm2 = 1000; // approximate urban area
  const popDensity = city.population / cityAreaKm2;
  
  // Calculate casualties by zone
  const totalDestructionArea = Math.PI * Math.pow(totalDestructionRadiusKm, 2);
  const severeDestructionArea = Math.PI * (Math.pow(severeDestructionRadiusKm, 2) - Math.pow(totalDestructionRadiusKm, 2));
  const moderateDamageArea = Math.PI * (Math.pow(moderateDamageRadiusKm, 2) - Math.pow(severeDestructionRadiusKm, 2));
  const mildDamageArea = Math.PI * (Math.pow(mildDamageRadiusKm, 2) - Math.pow(moderateDamageRadiusKm, 2));
  
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

  // Environmental impact calculations
  const burnRadiusMiles = mildDamageRadius * 1.5;
  const forestFireAreaSqMiles = Math.PI * Math.pow(burnRadiusMiles, 2);

  // Format energy display
  const energyDisplay = energyMegatons >= 1 
    ? `${energyMegatons.toFixed(1)} MT`
    : `${energyKilotons.toFixed(1)} KT`;
  const energyLabel = energyMegatons >= 1 ? "Megatons" : "Kilotons";

  return {
    kineticEnergyJoules,
    energyDisplay,
    energyLabel,
    energyMegatons,
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
    burnRadiusMiles,
    forestFireAreaSqMiles,
  };
};

const getCityConclusion = (cityName: string): string => {
  const conclusions: { [key: string]: string } = {
    "New York": "A 30-meter asteroid airburst over Manhattan could unleash energy equal to nearly a megaton of TNT, enough to flatten parts of Midtown, ignite fires, and injure hundreds of thousands. In the world's financial capital, that means not just loss of life, but collapse of critical markets, communication networks, and global trade. Protecting New York is protecting the heartbeat of the global economy. Investing in early-warning satellites and planetary-defense missions is cheaper than rebuilding Wall Street.",
    "Los Angeles": "With dense urban sprawl, major ports, and massive daily traffic, Los Angeles would see catastrophic cascading failures if even a small asteroid exploded overhead. Fires could spread through hillsides and industrial zones, and disruptions to the Port of L.A. would ripple through U.S. supply chains. One missed rock could paralyze the nation's logistics and entertainment hub. Asteroid detection tech is national infrastructure protection.",
    "Chicago": "An asteroid airburst over downtown Chicago could devastate the Loop, shatter windows across Lake Michigan, and knock out transport and energy grids that serve the entire Midwest. Chicago sits at the crossroads of U.S. commerce; tracking asteroids is a matter of keeping America's industrial heartland secure.",
    "Houston": "For a city that fuels the country, a mid-sized asteroid could ignite refineries, contaminate waterways, and cripple the energy sector. A few seconds' warning might save thousands, but only if the detection systems exist. Houston's expertise in space makes it a natural leader in asteroid defense. Protecting the \"energy capital\" means investing in the technology to detect threats early.",
    "Phoenix": "Though inland, Phoenix's rapid growth means more lives and infrastructure are exposed. A 0.7-megaton airburst could devastate the urban core and overwhelm emergency systems. Tracking asteroids isn't just a coastal concern. Cities like Phoenix show how urbanization has expanded humanity's vulnerability far inland.",
    "Philadelphia": "With dense historic neighborhoods and critical East-Coast infrastructure, a local impact could erase centuries of culture and history overnight. Asteroid-tracking technology safeguards not only lives but also the heritage and identity of cities like Philadelphia, irreplaceable parts of human civilization.",
    "San Antonio": "A small asteroid could destroy parts of the downtown area and damage nearby military installations that support U.S. defense operations. San Antonio's proximity to key military and aerospace facilities makes asteroid-tracking a matter of national security.",
    "San Diego": "A coastal airburst could devastate naval bases, ports, and biotech hubs, with marine ecosystems and coastal neighborhoods taking heavy damage. For a major military and innovation center, defending against asteroids is defending America's Pacific gateway and its ocean ecology.",
    "Dallas": "The dense downtown and corporate centers could suffer massive losses even from a moderate asteroid explosion. Infrastructure collapse would ripple through Texas's economy. Investment in asteroid-tracking tech is cheaper than losing a city's economic engine overnight, a matter of pragmatic risk management.",
    "Jacksonville": "A riverfront or coastal impact could wipe out port facilities, damage military assets, and contaminate waterways. As a growing logistics and naval city, Jacksonville shows how mid-size impacts can have outsize national consequences, prevention is the only real defense."
  };
  
  return conclusions[cityName] || "";
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
              <span className="text-foreground">Total Destruction: {impact.damageZones.totalDestruction} miles radius</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-danger/20 border-2 border-danger/80" />
              <span className="text-foreground">Severe Destruction: {impact.damageZones.severeDestruction} miles radius</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-warning/15 border-2 border-warning/70" />
              <span className="text-foreground">Moderate Damage: {impact.damageZones.moderateDamage} miles radius</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-info/10 border-2 border-info/60" />
              <span className="text-foreground">Mild Damage: {impact.damageZones.mildDamage} miles radius</span>
            </div>
          </div>
        </div>

        {/* Damage Zone Definitions */}
        <div className="mt-6 space-y-4 bg-muted/30 p-4 rounded-lg">
          <h4 className="font-bold text-foreground text-lg mb-3">Understanding the Damage Zones</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <p className="text-sm font-semibold text-foreground">Total Destruction Zone</p>
              </div>
              <p className="text-sm text-muted-foreground pl-5">
                Complete obliteration of all structures. Extreme overpressure (over 50 psi) causes instant collapse of reinforced buildings. Near-100% fatality rate for anyone in this zone. Ground is cratered and vaporized.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger/60" />
                <p className="text-sm font-semibold text-foreground">Severe Destruction Zone</p>
              </div>
              <p className="text-sm text-muted-foreground pl-5">
                Heavy structural damage to most buildings (20-50 psi overpressure). Multi-story buildings collapse, widespread fires. Very high casualty rate. Survivors face life-threatening injuries.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <p className="text-sm font-semibold text-foreground">Moderate Damage Zone</p>
              </div>
              <p className="text-sm text-muted-foreground pl-5">
                Significant structural damage (5-20 psi overpressure). Residential buildings badly damaged, windows shattered. Many injuries from flying debris and collapsing structures. Infrastructure heavily damaged.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-info" />
                <p className="text-sm font-semibold text-foreground">Mild Damage Zone</p>
              </div>
              <p className="text-sm text-muted-foreground pl-5">
                Light to moderate structural damage (1-5 psi overpressure). Glass breakage, minor structural damage, injuries from flying glass and debris. Fires may start in some areas. Most people survive but many require medical attention.
              </p>
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
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">Total Destruction Zone</p>
            <p className="text-2xl font-bold text-danger">{impact.casualties.totalDestruction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mb-3">Deaths (95% fatality)</p>
            
            <p className="text-lg font-semibold text-warning mt-2">{impact.injuries.totalDestruction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Injured</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">Severe Destruction Zone</p>
            <p className="text-2xl font-bold text-danger/80">{impact.casualties.severeDestruction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mb-3">Deaths (65% fatality)</p>
            
            <p className="text-lg font-semibold text-warning mt-2">{impact.injuries.severeDestruction.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Injured</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">Moderate Damage Zone</p>
            <p className="text-2xl font-bold text-warning">{impact.casualties.moderateDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mb-3">Deaths (25% fatality)</p>
            
            <p className="text-lg font-semibold text-warning mt-2">{impact.injuries.moderateDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Injured</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">Mild Damage Zone</p>
            <p className="text-2xl font-bold text-info">{impact.casualties.mildDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mb-3">Deaths (5% fatality)</p>
            
            <p className="text-lg font-semibold text-warning mt-2">{impact.injuries.mildDamage.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Injured</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-danger/30 text-center">
          <p className="text-4xl font-extrabold text-foreground mb-2">
            {impact.affectedPopulation.toLocaleString()}
          </p>
          <p className="text-base text-muted-foreground font-semibold">Total people living in affected zones</p>
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

        <div className="space-y-5 pt-4 border-t border-warning/30">
          <h4 className="font-bold text-foreground text-2xl mb-4">Critical Infrastructure Losses</h4>
          
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-lg font-bold text-foreground mb-3">Power & Utilities</p>
              <p className="text-base text-muted-foreground">
                <span className="font-bold text-foreground">{(impact.affectedPopulation * 1.5).toLocaleString()}</span> people lose power. Restoration takes <span className="font-bold text-foreground">{Math.floor(parseFloat(impact.damageZones.moderateDamage) * 8)} months</span>. Water systems fail, affecting <span className="font-bold text-foreground">{(impact.affectedPopulation * 2.2).toLocaleString()}</span> people. Economic losses: <span className="font-bold text-foreground">${Math.floor(impact.energyMegatons * 15)} billion</span>.
              </p>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-lg font-bold text-foreground mb-3">Transportation</p>
              <p className="text-base text-muted-foreground">
                <span className="font-bold text-foreground">{Math.floor(parseFloat(impact.damageZones.severeDestruction) * 45)} miles</span> of highways destroyed. All bridges within <span className="font-bold text-foreground">{impact.damageZones.moderateDamage} miles</span> collapsed. Airports inoperable. Ground transportation paralyzed for months.
              </p>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-lg font-bold text-foreground mb-3">Healthcare</p>
              <p className="text-base text-muted-foreground">
                <span className="font-bold text-foreground">{Math.floor(parseFloat(impact.damageZones.severeDestruction) * 25)}</span> hospitals destroyed. <span className="font-bold text-foreground">{Math.floor(impact.casualties.total * 2.5).toLocaleString()}</span> need immediate care but only <span className="font-bold text-foreground">{Math.floor(parseFloat(impact.damageZones.mildDamage) * 1200)}</span> beds available. Critical supply shortages within 48 hours.
              </p>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-lg font-bold text-foreground mb-3">Business & Economy</p>
              <p className="text-base text-muted-foreground">
                <span className="font-bold text-foreground">{Math.floor(impact.casualties.total / 500).toLocaleString()}</span> businesses destroyed. Immediate unemployment for <span className="font-bold text-foreground">{(impact.casualties.total * 8).toLocaleString()}</span> workers. Economic activity reduced by <span className="font-bold text-foreground">80%</span> in first month. Direct GDP loss: <span className="font-bold text-foreground">${impact.gdpLossBillions.toFixed(0)} billion</span>.
              </p>
            </div>
          </div>
        </div>
      </Card>

    </div>
  );
};

export { getCityConclusion };
export default ImpactForecast;
