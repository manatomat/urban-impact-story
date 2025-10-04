import { Card } from "@/components/ui/card";

interface EnvironmentalImpactProps {
  energyMegatons: number;
  damageZones: {
    totalDestruction: string;
    severeDestruction: string;
    moderateDamage: string;
    mildDamage: string;
  };
  affectedPopulation: number;
  casualties: number;
  burnRadiusMiles: number;
  forestFireAreaSqMiles: number;
}

const EnvironmentalImpact = ({ 
  energyMegatons, 
  damageZones, 
  affectedPopulation, 
  casualties,
  burnRadiusMiles,
  forestFireAreaSqMiles 
}: EnvironmentalImpactProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Environmental & Ecological Impact</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-3xl mx-auto">
        The asteroid's impact extends far beyond immediate destruction, triggering cascading environmental disasters that persist for decades.
      </p>
      
      <div className="grid md:grid-cols-2 gap-5">
        {/* Atmospheric Impact */}
        <div className="bg-muted/20 p-4 rounded-lg">
          <p className="text-lg font-bold text-foreground mb-3">Atmospheric Impact</p>
          <p className="text-base text-muted-foreground">
            Air quality becomes hazardous across <span className="font-bold text-foreground">{parseFloat(damageZones.mildDamage) * 100} miles</span>, dust blocks <span className="font-bold text-foreground">30-50%</span> of sunlight for <span className="font-bold text-foreground">2-4 months</span>, temperatures drop <span className="font-bold text-foreground">5-10°C</span>, and respiratory illnesses spike by <span className="font-bold text-foreground">400%</span> affecting <span className="font-bold text-foreground">{(affectedPopulation * 3).toLocaleString()}</span> people, causing <span className="font-bold text-foreground">{Math.floor(casualties * 0.15).toLocaleString()}</span> additional deaths over the next decade.
          </p>
        </div>

        {/* Wildfire */}
        <div className="bg-muted/20 p-4 rounded-lg">
          <p className="text-lg font-bold text-foreground mb-3">Wildfires</p>
          <p className="text-base text-muted-foreground">
            Fires ignite across <span className="font-bold text-foreground">{forestFireAreaSqMiles.toFixed(0)} square miles</span>. Urban firestorms create <span className="font-bold text-foreground">100 mph</span> winds. Complete loss of <span className="font-bold text-foreground">{Math.floor(forestFireAreaSqMiles * 0.4)} square miles</span> of urban vegetation. Forest recovery requires <span className="font-bold text-foreground">50-100 years</span>.
          </p>
        </div>

        {/* Wildlife */}
        <div className="bg-muted/20 p-4 rounded-lg">
          <p className="text-lg font-bold text-foreground mb-3">Wildlife Loss</p>
          <p className="text-base text-muted-foreground">
            Near-total extinction within <span className="font-bold text-foreground">{damageZones.severeDestruction} miles</span>. Estimated <span className="font-bold text-foreground">{Math.floor(parseFloat(damageZones.severeDestruction) * 50000).toLocaleString()}</span> birds and <span className="font-bold text-foreground">{Math.floor(parseFloat(damageZones.severeDestruction) * 15000).toLocaleString()}</span> mammals killed instantly. Food chain collapse affects wildlife across <span className="font-bold text-foreground">{(parseFloat(damageZones.mildDamage) * 200).toFixed(0)} miles</span>.
          </p>
        </div>

        {/* Long-term Contamination */}
        <div className="bg-muted/20 p-4 rounded-lg">
          <p className="text-lg font-bold text-foreground mb-3">Long-term Contamination</p>
          <p className="text-base text-muted-foreground">
            Impact crater uninhabitable for <span className="font-bold text-foreground">decades</span>, groundwater contaminated for <span className="font-bold text-foreground">50+ years</span>, <span className="font-bold text-foreground">{Math.floor(energyMegatons * 800)} million tons</span> of CO₂ released instantly, and <span className="font-bold text-foreground">{Math.floor(parseFloat(damageZones.severeDestruction) * 5000).toLocaleString()}</span> tons of hazardous chemicals released affecting <span className="font-bold text-foreground">{(affectedPopulation * 2.5).toLocaleString()}</span> people.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EnvironmentalImpact;
