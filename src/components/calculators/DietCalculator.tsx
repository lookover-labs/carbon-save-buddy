import { useState } from "react";
import { ArrowLeft, Salad, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DietCalculatorProps {
  onBack: () => void;
}

export const DietCalculator = ({ onBack }: DietCalculatorProps) => {
  const [meatFreeDays, setMeatFreeDays] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateSavings = () => {
    const days = parseFloat(meatFreeDays);
    if (days > 0) {
      // Una porzione media di carne produce circa 6.6 kg CO₂
      // Sostituendola con verdure/legumi: circa 0.9 kg CO₂
      // Risparmio per pasto: 5.7 kg CO₂
      // Considerando 1 pasto principale al giorno senza carne
      const savings = days * 5.7;
      setResult(savings);
    }
  };

  const resetCalculator = () => {
    setMeatFreeDays("");
    setResult(null);
  };

  if (result !== null) {
    return (
      <Card className="p-6 max-w-md mx-auto bg-gradient-nature border-primary/20 shadow-eco animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">🌱</div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto animate-grow" />
          
          <h2 className="text-2xl font-bold text-foreground">
            Dieta sostenibile!
          </h2>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-3xl font-bold text-primary">
              {result.toFixed(1)} kg
            </p>
            <p className="text-sm text-muted-foreground">
              di CO₂ risparmiata
            </p>
          </div>
          
          <p className="text-muted-foreground">
            In <strong>{meatFreeDays} giorni</strong> senza carne hai fatto una scelta 
            importante per il pianeta. L'alimentazione vegetale ha un impatto 
            ambientale molto più basso! 🥬
          </p>
          
          <div className="bg-accent/50 p-3 rounded-lg text-sm">
            <strong>Lo sapevi?</strong> L'allevamento è responsabile del 14.5% 
            delle emissioni globali di gas serra.
          </div>
          
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
            <Salad className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Giorni Senza Carne
            </h2>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3 animate-float">🥦</div>
          <p className="text-muted-foreground mb-6">
            Calcola l'impatto positivo della tua dieta vegetariana
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="days" className="text-foreground">
              Giorni senza carne
            </Label>
            <Input
              id="days"
              type="number"
              placeholder="es. 7"
              value={meatFreeDays}
              onChange={(e) => setMeatFreeDays(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary"
            />
          </div>
          
          <div className="space-y-3">
            <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
              🥩 <strong>Carne:</strong> ~6.6 kg CO₂ per porzione
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
              🌱 <strong>Verdure/Legumi:</strong> ~0.9 kg CO₂ per porzione
            </div>
            <div className="bg-primary/10 p-3 rounded-lg text-sm text-foreground font-medium">
              💡 <strong>Risparmio:</strong> ~5.7 kg CO₂ per pasto sostituito
            </div>
          </div>
          
          <Button
            onClick={calculateSavings}
            disabled={!meatFreeDays || parseFloat(meatFreeDays) <= 0}
            className="w-full bg-primary hover:bg-primary-dark"
          >
            Calcola il risparmio
          </Button>
        </div>
      </div>
    </Card>
  );
};