import { useState } from "react";
import { ArrowLeft, Home, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HomeCalculatorProps {
  onBack: () => void;
}

export const HomeCalculator = ({ onBack }: HomeCalculatorProps) => {
  const [commuteDays, setCommuteDays] = useState("");
  const [commuteDistance, setCommuteDistance] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateSavings = () => {
    const days = parseFloat(commuteDays);
    const km = parseFloat(commuteDistance);
    if (days > 0 && km > 0) {
      // Andata e ritorno + emissioni auto (0.21 kg CO₂/km)
      const totalKm = days * km * 2; // andata e ritorno
      const savings = totalKm * 0.21;
      setResult(savings);
    }
  };

  const resetCalculator = () => {
    setCommuteDays("");
    setCommuteDistance("");
    setResult(null);
  };

  if (result !== null) {
    return (
      <Card className="p-6 max-w-md mx-auto bg-gradient-nature border-primary/20 shadow-eco animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">🏠</div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto animate-grow" />
          
          <h2 className="text-2xl font-bold text-foreground">
            Smart working!
          </h2>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-3xl font-bold text-primary">
              {result.toFixed(2)} kg
            </p>
            <p className="text-sm text-muted-foreground">
              di CO₂ risparmiata
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Lavorando da casa per <strong>{commuteDays} giorni</strong> hai evitato 
            {(parseFloat(commuteDays) * parseFloat(commuteDistance) * 2).toFixed(1)} km 
            di spostamenti. Il futuro del lavoro è sostenibile! 💻
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
            <Home className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Lavoro da Casa
            </h2>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3 animate-float">🏠</div>
          <p className="text-muted-foreground mb-6">
            Calcola il CO₂ risparmiato lavorando da casa
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="days" className="text-foreground">
              Giorni di smart working
            </Label>
            <Input
              id="days"
              type="number"
              placeholder="es. 3"
              value={commuteDays}
              onChange={(e) => setCommuteDays(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="distance" className="text-foreground">
              Distanza casa-ufficio (km, solo andata)
            </Label>
            <Input
              id="distance"
              type="number"
              placeholder="es. 12.5"
              value={commuteDistance}
              onChange={(e) => setCommuteDistance(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary"
            />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
            💡 <strong>Calcolo:</strong> Consideriamo andata e ritorno per ogni giorno 
            di smart working evitato
          </div>
          
          <Button
            onClick={calculateSavings}
            disabled={!commuteDays || !commuteDistance || parseFloat(commuteDays) <= 0 || parseFloat(commuteDistance) <= 0}
            className="w-full bg-primary hover:bg-primary-dark"
          >
            Calcola il risparmio
          </Button>
        </div>
      </div>
    </Card>
  );
};