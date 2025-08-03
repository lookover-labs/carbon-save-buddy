import { useState } from "react";
import { ArrowLeft, Plane, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FlightCalculatorProps {
  onBack: () => void;
}

export const FlightCalculator = ({ onBack }: FlightCalculatorProps) => {
  const [distance, setDistance] = useState("");
  const [flightType, setFlightType] = useState("");
  const [result, setResult] = useState<{ emissions: number; type: string; equivalent: string } | null>(null);

  const flightFactors = {
    short: { factor: 0.18, name: "corto raggio (<1500 km)", equivalent: "autobus per 850 km" },
    medium: { factor: 0.15, name: "medio raggio (1500-4000 km)", equivalent: "auto per 650 km" },
    long: { factor: 0.12, name: "lungo raggio (>4000 km)", equivalent: "auto per 520 km" }
  };

  const calculateEmissions = () => {
    const km = parseFloat(distance);
    if (km > 0 && flightType) {
      const factor = flightFactors[flightType as keyof typeof flightFactors];
      const emissions = km * factor.factor;
      setResult({
        emissions,
        type: factor.name,
        equivalent: factor.equivalent
      });
    }
  };

  const resetCalculator = () => {
    setDistance("");
    setFlightType("");
    setResult(null);
  };

  if (result !== null) {
    return (
      <Card className="p-6 max-w-md mx-auto bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-modern animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">✈️</div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto animate-grow" />
          
          <h2 className="text-2xl font-bold text-foreground">
            Volo calcolato!
          </h2>
          
          <div className="bg-primary/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-3xl font-bold text-primary">
              {result.emissions.toFixed(1)} kg
            </p>
            <p className="text-sm text-muted-foreground">
              di CO₂ emessa per questo volo
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Il tuo volo {result.type} di <strong>{distance} km</strong> ha 
            un'impronta carbonica significativa. ✈️
          </p>
          
          <div className="bg-accent/30 p-3 rounded-lg text-sm backdrop-blur-sm">
            <strong>Equivale a:</strong> {result.equivalent}
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm backdrop-blur-sm">
            💡 <strong>Consiglio:</strong> Considera di compensare le emissioni 
            piantando alberi o investendo in progetti di energia rinnovabile
          </div>
          
          <div className="flex gap-2">
            <Button onClick={resetCalculator} variant="outline" className="flex-1">
              Calcola di nuovo
            </Button>
            <Button onClick={onBack} className="flex-1 bg-gradient-modern border-0 text-white hover:shadow-modern">
              Torna alla home
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-md mx-auto bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-modern animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Volo Aereo
            </h2>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3 animate-float">✈️</div>
          <p className="text-muted-foreground mb-6">
            Calcola le emissioni CO₂ dei tuoi viaggi in aereo
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="distance" className="text-foreground">
              Distanza del volo (km)
            </Label>
            <Input
              id="distance"
              type="number"
              placeholder="es. 1200"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary backdrop-blur-sm"
            />
          </div>
          
          <div>
            <Label htmlFor="flight-type" className="text-foreground">
              Tipo di volo
            </Label>
            <Select value={flightType} onValueChange={setFlightType}>
              <SelectTrigger className="mt-1 border-primary/30 focus:border-primary backdrop-blur-sm">
                <SelectValue placeholder="Seleziona il tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">🛫 Corto raggio (&lt;1500 km)</SelectItem>
                <SelectItem value="medium">🛫 Medio raggio (1500-4000 km)</SelectItem>
                <SelectItem value="long">🛫 Lungo raggio (&gt;4000 km)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground backdrop-blur-sm">
            💡 <strong>Emissioni per km:</strong><br />
            • Corto raggio: 0.18 kg CO₂/km<br />
            • Medio raggio: 0.15 kg CO₂/km<br />
            • Lungo raggio: 0.12 kg CO₂/km
          </div>
          
          <Button
            onClick={calculateEmissions}
            disabled={!distance || !flightType || parseFloat(distance) <= 0}
            className="w-full bg-gradient-modern border-0 text-white hover:shadow-modern"
          >
            Calcola le emissioni
          </Button>
        </div>
      </div>
    </Card>
  );
};