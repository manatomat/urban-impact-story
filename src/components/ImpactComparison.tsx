import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { City, cities } from "./CitySelector";

interface AsteroidData {
  diameter: number;
  velocity: number;
  mass: number;
  density: number;
  composition: string;
}

interface ImpactComparisonProps {
  asteroid: AsteroidData;
  selectedCity: City;
}

const calculateQuickImpact = (asteroid: AsteroidData, city: City) => {
  const velocityMs = (asteroid.velocity * 1000) / 3600;
  const kineticEnergyJoules = 0.5 * asteroid.mass * Math.pow(velocityMs, 2);
  const energyMegatons = kineticEnergyJoules / (4.184 * Math.pow(10, 15));
  
  const totalDestructionRadius = Math.pow(energyMegatons, 0.33) * 1.2;
  const severeDestructionRadius = Math.pow(energyMegatons, 0.33) * 2.0;
  const moderateDamageRadius = Math.pow(energyMegatons, 0.33) * 4.0;
  const mildDamageRadius = Math.pow(energyMegatons, 0.33) * 8.0;
  
  const cityAreaKm2 = 1000;
  const popDensity = city.population / cityAreaKm2;
  
  const totalDestructionArea = Math.PI * Math.pow(totalDestructionRadius, 2);
  const severeDestructionArea = Math.PI * (Math.pow(severeDestructionRadius, 2) - Math.pow(totalDestructionRadius, 2));
  const moderateDamageArea = Math.PI * (Math.pow(moderateDamageRadius, 2) - Math.pow(severeDestructionRadius, 2));
  const mildDamageArea = Math.PI * (Math.pow(mildDamageRadius, 2) - Math.pow(moderateDamageRadius, 2));
  
  const totalDestructionDeaths = Math.floor(totalDestructionArea * popDensity * 0.95);
  const severeDestructionDeaths = Math.floor(severeDestructionArea * popDensity * 0.65);
  const moderateDamageDeaths = Math.floor(moderateDamageArea * popDensity * 0.25);
  const mildDamageDeaths = Math.floor(mildDamageArea * popDensity * 0.05);
  
  const totalCasualties = totalDestructionDeaths + severeDestructionDeaths + moderateDamageDeaths + mildDamageDeaths;
  
  const infrastructureDamage = (
    totalDestructionArea * 2000 +
    severeDestructionArea * 1000 +
    moderateDamageArea * 300 +
    mildDamageArea * 50
  );
  const gdpLoss = city.gdp * 0.4;
  const totalDamage = infrastructureDamage + gdpLoss * 1000;
  
  return {
    casualties: totalCasualties,
    damage: totalDamage / 1000, // in billions
  };
};

const ImpactComparison = ({ asteroid, selectedCity }: ImpactComparisonProps) => {
  const comparisonData = cities
    .filter(city => city.name !== selectedCity.name)
    .map(city => {
      const impact = calculateQuickImpact(asteroid, city);
      return {
        city: city.name,
        casualties: impact.casualties,
        damage: impact.damage,
      };
    });

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Comparative Impact Analysis Across Major US Cities
      </h3>
      <p className="text-muted-foreground mb-6">
        If this same asteroid impacted other major cities instead of {selectedCity.name}
      </p>
      
      <div className="space-y-8">
        {/* Casualties Comparison */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4">Estimated Casualties</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="city" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [value.toLocaleString(), 'Casualties']}
              />
              <Bar dataKey="casualties" fill="hsl(var(--danger))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Economic Damage Comparison */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4">Economic Damage (Billions USD)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="city" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value.toFixed(0)}B`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}B`, 'Economic Damage']}
              />
              <Bar dataKey="damage" fill="hsl(var(--warning))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default ImpactComparison;
