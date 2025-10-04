import { Card } from "@/components/ui/card";
import { getCityConclusion } from "./ImpactForecast";
import { City } from "./CitySelector";

interface CityConclusionProps {
  city: City;
}

const CityConclusion = ({ city }: CityConclusionProps) => {
  const conclusion = getCityConclusion(city.name);
  
  if (!conclusion) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/20 to-card border-primary/50">
      <h3 className="text-2xl font-bold text-foreground mb-4">Why This Matters: {city.name}</h3>
      <p className="text-foreground leading-relaxed">
        {conclusion}
      </p>
    </Card>
  );
};

export default CityConclusion;
