import { useState } from "react";
import { ArrowLeft, Bike, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BikeCalculatorProps {
  onBack: () => void;
}

export const BikeCalculator = ({ onBack }: BikeCalculatorProps) => {
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateSavings = () => {
    const km = parseFloat(distance);
    if (km > 0) {
      // 1 km in auto = 0.21 kg CO₂, in bici = 0 kg CO₂
      const savings = km * 0.21;
      setResult(savings);
    }
  };

  const resetCalculator = () => {
    setDistance("");
    setResult(null);
  };

  if (result !== null) {
    return (
      <Card className="p-6 max-w-md mx-auto bg-gradient-nature border-primary/20 shadow-eco animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">🎉</div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto animate-grow" />
          
          <h2 className="text-2xl font-bold text-foreground">
            Ottimo lavoro!
          </h2>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-3xl font-bold text-primary">
              {result.toFixed(2)} kg
            </p>
            <p className="text-sm text-muted-foreground">
              di CO₂ risparmiata oggi
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Hai pedalato per <strong>{distance} km</strong> invece di usare l'auto. 
            Il pianeta ti ringrazia! 🌍
          </p>
          
          <div className="flex gap-2">
            <Button onClick={resetCalculator} variant="outline" className="flex-1">
              Calcola di nuovo
            </Button>
            <Button onClick={onBack} className="flex-1 bg-primary hover:bg-primary-dark">
              Torna alla home
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-md mx-auto animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Bike className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Calcolatore Bicicletta
            </h2>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3 animate-float">🚲</div>
          <p className="text-muted-foreground mb-6">
            Inserisci i chilometri percorsi in bicicletta oggi invece di usare l'auto
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="distance" className="text-foreground">
              Chilometri percorsi in bici
            </Label>
            <Input
              id="distance"
              type="number"
              placeholder="es. 5.2"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary"
            />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
            💡 <strong>Sapevi che:</strong> ogni km in auto produce circa 0.21 kg di CO₂
          </div>
          
          <Button
            onClick={calculateSavings}
            disabled={!distance || parseFloat(distance) <= 0}
            className="w-full bg-primary hover:bg-primary-dark"
          >
            Calcola il risparmio
          </Button>
        </div>
      </div>
    </Card>
  );
};