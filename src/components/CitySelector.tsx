import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface City {
  name: string;
  state: string;
  population: number;
  gdp: number; // in billions
  lat: number;
  lng: number;
}

export const cities: City[] = [
  { name: "New York", state: "NY", population: 8336817, gdp: 1731, lat: 40.7128, lng: -74.0060 },
  { name: "Los Angeles", state: "CA", population: 3979576, gdp: 1048, lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", state: "IL", population: 2693976, gdp: 689, lat: 41.8781, lng: -87.6298 },
  { name: "Houston", state: "TX", population: 2320268, gdp: 490, lat: 29.7604, lng: -95.3698 },
  { name: "Phoenix", state: "AZ", population: 1680992, gdp: 243, lat: 33.4484, lng: -112.0740 },
  { name: "Philadelphia", state: "PA", population: 1584064, gdp: 431, lat: 39.9526, lng: -75.1652 },
  { name: "San Antonio", state: "TX", population: 1547253, gdp: 124, lat: 29.4241, lng: -98.4936 },
  { name: "San Diego", state: "CA", population: 1423851, gdp: 206, lat: 32.7157, lng: -117.1611 },
  { name: "Dallas", state: "TX", population: 1343573, gdp: 478, lat: 32.7767, lng: -96.7970 },
  { name: "Jacksonville", state: "FL", population: 949611, gdp: 89, lat: 30.3322, lng: -81.6557 },
];

interface CitySelectorProps {
  selectedCity: City | null;
  onCitySelect: (city: City) => void;
}

const CitySelector = ({ selectedCity, onCitySelect }: CitySelectorProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-2xl font-bold text-foreground mb-4">Select Impact Zone</h2>
      <div className="space-y-4">
        <Select
          value={selectedCity?.name}
          onValueChange={(cityName) => {
            const city = cities.find(c => c.name === cityName);
            if (city) onCitySelect(city);
          }}
        >
          <SelectTrigger className="w-full bg-secondary text-foreground border-border">
            <SelectValue placeholder="Choose a city..." />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}, {city.state} - {(city.population / 1000000).toFixed(1)}M people
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedCity && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Population</p>
              <p className="text-2xl font-bold text-foreground">
                {(selectedCity.population / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm uppercase tracking-wider">GDP</p>
              <p className="text-2xl font-bold text-foreground">
                ${selectedCity.gdp >= 1000 
                  ? `${(selectedCity.gdp / 1000).toFixed(2)}T` 
                  : `${selectedCity.gdp}B`}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CitySelector;
