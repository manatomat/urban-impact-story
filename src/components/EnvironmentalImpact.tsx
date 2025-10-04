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
      
      <div className="space-y-6">
        {/* Atmospheric Impact */}
        <div className="bg-muted/20 p-5 rounded-lg border border-border">
          <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-primary text-2xl">☁️</span>
            Atmospheric & Air Quality Effects
          </h4>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <span className="font-bold text-foreground">Short-term (Days to Weeks):</span> Massive ejection of <span className="font-bold text-foreground">{Math.floor(energyMegatons * 50)} million tons</span> of dust, debris, and vaporized material into the atmosphere. Air quality index reaches hazardous levels (AQI 500+) within <span className="font-bold text-foreground">{parseFloat(damageZones.mildDamage) * 100}</span> miles. Thermal radiation from impact creates temperatures exceeding <span className="font-bold text-foreground">3,000°F</span> at ground zero, igniting everything combustible and producing toxic smoke plumes visible from space.
            </p>
            <p>
              <span className="font-bold text-foreground">Medium-term (Weeks to Months):</span> Atmospheric dust cloud blocks <span className="font-bold text-foreground">30-50%</span> of sunlight across a <span className="font-bold text-foreground">{(parseFloat(damageZones.mildDamage) * 500).toFixed(0)}</span>-mile radius for <span className="font-bold text-foreground">2-4 months</span>. Regional temperature drops by <span className="font-bold text-foreground">5-10°C</span>, creating artificial "winter" conditions during any season. Respiratory illnesses spike by <span className="font-bold text-foreground">400%</span>, affecting <span className="font-bold text-foreground">{(affectedPopulation * 3).toLocaleString()}</span> people across multiple states. Particulate matter concentrations remain at dangerous levels, requiring masks for outdoor activity.
            </p>
            <p>
              <span className="font-bold text-foreground">Long-term (Months to Years):</span> Atmospheric composition altered for <span className="font-bold text-foreground">6-18 months</span>, with increased aerosol concentrations affecting weather patterns across North America. Increased rates of asthma, COPD, and cardiovascular disease in populations up to <span className="font-bold text-foreground">500 miles</span> away, resulting in an estimated <span className="font-bold text-foreground">{Math.floor(casualties * 0.15).toLocaleString()}</span> additional premature deaths from air pollution over the following decade.
            </p>
          </div>
        </div>

        {/* Wildfire and Burn Radius */}
        <div className="bg-muted/20 p-5 rounded-lg border border-border">
          <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-primary text-2xl">🔥</span>
            Wildfire Spread & Vegetation Loss
          </h4>
          <div className="space-y-3 text-muted-foreground">
            <p>
              Thermal radiation ignites fires across a <span className="font-bold text-foreground">{burnRadiusMiles.toFixed(1)}-mile</span> radius from impact point, covering approximately <span className="font-bold text-foreground">{forestFireAreaSqMiles.toFixed(0)} square miles</span>. Urban fires merge into massive firestorms generating winds exceeding <span className="font-bold text-foreground">100 mph</span>, spreading flames to areas that initially survived the blast. Total loss of <span className="font-bold text-foreground">{Math.floor(forestFireAreaSqMiles * 0.4)} square miles</span> of urban green spaces, parks, and vegetation.
            </p>
            <p>
              In surrounding regions, wildfires consume an estimated <span className="font-bold text-foreground">{Math.floor(forestFireAreaSqMiles * 0.6)} square miles</span> of forests, grasslands, and agricultural land. Smoke from these fires compounds atmospheric effects, creating a toxic haze affecting air quality across <span className="font-bold text-foreground">{(parseFloat(damageZones.mildDamage) * 150).toFixed(0)} miles</span>. Complete habitat destruction for terrestrial species, with recovery requiring <span className="font-bold text-foreground">50-100 years</span> for forest ecosystems to return to pre-impact conditions.
            </p>
          </div>
        </div>

        {/* Wildlife and Biodiversity */}
        <div className="bg-muted/20 p-5 rounded-lg border border-border">
          <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-primary text-2xl">🦅</span>
            Wildlife Mortality & Species at Risk
          </h4>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <span className="font-bold text-foreground">Immediate Impact Zone:</span> Near-total extinction of all wildlife within <span className="font-bold text-foreground">{damageZones.severeDestruction}</span> miles of impact. Estimated <span className="font-bold text-foreground">{Math.floor(parseFloat(damageZones.severeDestruction) * 50000).toLocaleString()}</span> birds, <span className="font-bold text-foreground">{Math.floor(parseFloat(damageZones.severeDestruction) * 15000).toLocaleString()}</span> mammals, and countless reptiles, amphibians, and insects killed instantly by blast overpressure and thermal radiation.
            </p>
            <p>
              <span className="font-bold text-foreground">Extended Mortality Zone:</span> Within <span className="font-bold text-foreground">{damageZones.mildDamage} miles</span>, an additional <span className="font-bold text-foreground">{Math.floor(parseFloat(damageZones.mildDamage) * 80000).toLocaleString()}</span> animals die from injuries, habitat destruction, and fires. Migratory bird populations passing through region during impact face <span className="font-bold text-foreground">60-80%</span> mortality. Local populations of endangered species may face complete regional extinction, particularly species with limited ranges or low reproduction rates.
            </p>
            <p>
              <span className="font-bold text-foreground">Ecosystem Collapse:</span> Food chain disruption affects predators and scavengers across <span className="font-bold text-foreground">{(parseFloat(damageZones.mildDamage) * 200).toFixed(0)} miles</span>. Pollinator populations devastated, affecting plant reproduction and agricultural productivity for <span className="font-bold text-foreground">3-5 years</span>. Aquatic ecosystems within <span className="font-bold text-foreground">{(parseFloat(damageZones.moderateDamage) * 2).toFixed(1)}</span> miles experience mass fish kills from thermal shock, contamination, and oxygen depletion, with recovery taking <span className="font-bold text-foreground">10-20 years</span>.
            </p>
          </div>
        </div>

        {/* Long-term Environmental Effects */}
        <div className="bg-muted/20 p-5 rounded-lg border border-border">
          <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-primary text-2xl">☢️</span>
            Long-term Environmental Degradation
          </h4>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <span className="font-bold text-foreground">Urban Dead Zone:</span> Impact crater and immediate surroundings (<span className="font-bold text-foreground">{damageZones.totalDestruction} miles</span>) rendered uninhabitable for <span className="font-bold text-foreground">decades</span>. Soil sterilized by extreme heat, contaminated with heavy metals and toxic compounds from vaporized buildings, vehicles, and industrial facilities. Groundwater in region contaminated with <span className="font-bold text-foreground">{Math.floor(parseFloat(damageZones.totalDestruction) * 800)}</span> different pollutants, making it unsafe for human consumption or agricultural use for <span className="font-bold text-foreground">50+ years</span>.
            </p>
            <p>
              <span className="font-bold text-foreground">Carbon Release:</span> Immediate release of approximately <span className="font-bold text-foreground">{Math.floor(energyMegatons * 800)} million tons</span> of CO₂ from vaporization of organic matter, burning vegetation, and destroyed infrastructure. Equivalent to <span className="font-bold text-foreground">{Math.floor(energyMegatons * 2)}</span> years of normal city emissions released in minutes. Secondary fires add another <span className="font-bold text-foreground">{Math.floor(forestFireAreaSqMiles * 150)}</span> thousand tons of greenhouse gases over following weeks.
            </p>
            <p>
              <span className="font-bold text-foreground">Contamination Cascade:</span> Ruptured industrial facilities release <span className="font-bold text-foreground">{Math.floor(parseFloat(damageZones.severeDestruction) * 5000).toLocaleString()}</span> tons of hazardous chemicals into environment. Oil refineries, chemical plants, and waste treatment facilities breached, creating toxic contamination zones covering <span className="font-bold text-foreground">{Math.floor(parseFloat(damageZones.moderateDamage) * 15)}</span> square miles. Heavy metals (lead, mercury, cadmium) from destroyed electronics and infrastructure leach into soil and water systems, creating long-term health hazards affecting <span className="font-bold text-foreground">{(affectedPopulation * 2.5).toLocaleString()}</span> people.
            </p>
            <p>
              <span className="font-bold text-foreground">Atmospheric Shockwaves:</span> Pressure wave detected by seismic stations <span className="font-bold text-foreground">thousands of miles away</span>, traveling through atmosphere at supersonic speeds. Windows shattered and eardrums damaged up to <span className="font-bold text-foreground">{(parseFloat(damageZones.mildDamage) * 5).toFixed(0)} miles</span> from impact. Atmospheric disturbance disrupts weather patterns across continent for <span className="font-bold text-foreground">weeks</span>, potentially triggering severe storms and unusual precipitation events.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnvironmentalImpact;
