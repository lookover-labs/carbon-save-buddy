import { useState } from "react";
import { ArrowLeft, UtensilsCrossed, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FoodCalculatorProps {
  onBack: () => void;
}

export const FoodCalculator = ({ onBack }: FoodCalculatorProps) => {
  const [portions, setPortions] = useState("");
  const [mealType, setMealType] = useState("");
  const [result, setResult] = useState<{ emissions: number; meal: string; comparison: string } | null>(null);

  const mealFactors = {
    beef: { factor: 7.7, name: "bistecca di manzo", comparison: "37 km in auto" },
    pork: { factor: 3.5, name: "carne di maiale", comparison: "17 km in auto" },
    chicken: { factor: 1.36, name: "pollo", comparison: "6.5 km in auto" },
    fish: { factor: 2.1, name: "pesce", comparison: "10 km in auto" },
    vegetarian: { factor: 0.9, name: "pasto vegetariano", comparison: "4.3 km in auto" },
    vegan: { factor: 0.3, name: "pasto vegano", comparison: "1.4 km in auto" }
  };

  const calculateEmissions = () => {
    const numPortions = parseFloat(portions);
    if (numPortions > 0 && mealType) {
      const meal = mealFactors[mealType as keyof typeof mealFactors];
      const emissions = numPortions * meal.factor;
      const comparison = meal.comparison.replace(/[\d.]+/, (emissions / 0.21).toFixed(0));
      setResult({
        emissions,
        meal: meal.name,
        comparison
      });
    }
  };

  const resetCalculator = () => {
    setPortions("");
    setMealType("");
    setResult(null);
  };

  if (result !== null) {
    return (
      <Card className="p-6 max-w-md mx-auto bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-modern animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">🍽️</div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto animate-grow" />
          
          <h2 className="text-2xl font-bold text-foreground">
            Pasto calcolato!
          </h2>
          
          <div className="bg-primary/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-3xl font-bold text-primary">
              {result.emissions.toFixed(1)} kg
            </p>
            <p className="text-sm text-muted-foreground">
              di CO₂ dal tuo pasto
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Hai consumato <strong>{portions} porzioni</strong> di {result.meal}. 
            Le scelte alimentari hanno un grande impatto ambientale! 🌱
          </p>
          
          <div className="bg-accent/30 p-3 rounded-lg text-sm backdrop-blur-sm">
            <strong>Equivale a:</strong> {result.comparison}
          </div>
          
          {result.emissions > 5 && (
            <div className="bg-muted/50 p-3 rounded-lg text-sm backdrop-blur-sm">
              💡 <strong>Consiglio:</strong> Prova a ridurre il consumo di carne rossa 
              e aumenta verdure, legumi e cereali integrali
            </div>
          )}
          
          {result.emissions <= 1 && (
            <div className="bg-primary/10 p-3 rounded-lg text-sm backdrop-blur-sm">
              🌟 <strong>Ottima scelta!</strong> I pasti a base vegetale hanno 
              un impatto ambientale molto minore
            </div>
          )}
          
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
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Impatto Alimentare
            </h2>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3 animate-float">🍽️</div>
          <p className="text-muted-foreground mb-6">
            Calcola l'impronta carbonica dei tuoi pasti
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="meal-type" className="text-foreground">
              Tipo di pasto principale
            </Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger className="mt-1 border-primary/30 focus:border-primary backdrop-blur-sm">
                <SelectValue placeholder="Seleziona il pasto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beef">🥩 Bistecca di manzo</SelectItem>
                <SelectItem value="pork">🐷 Carne di maiale</SelectItem>
                <SelectItem value="chicken">🐔 Pollo</SelectItem>
                <SelectItem value="fish">🐟 Pesce</SelectItem>
                <SelectItem value="vegetarian">🥗 Pasto vegetariano (con latticini)</SelectItem>
                <SelectItem value="vegan">🌱 Pasto vegano</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="portions" className="text-foreground">
              Numero di porzioni
            </Label>
            <Input
              id="portions"
              type="number"
              placeholder="es. 1"
              value={portions}
              onChange={(e) => setPortions(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary backdrop-blur-sm"
            />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground backdrop-blur-sm">
            💡 <strong>CO₂ per porzione:</strong><br />
            • Bistecca manzo: 7.7 kg<br />
            • Maiale: 3.5 kg<br />
            • Pollo: 1.36 kg<br />
            • Vegetariano: 0.9 kg<br />
            • Vegano: 0.3 kg
          </div>
          
          <Button
            onClick={calculateEmissions}
            disabled={!portions || !mealType || parseFloat(portions) <= 0}
            className="w-full bg-gradient-modern border-0 text-white hover:shadow-modern"
          >
            Calcola l'impatto
          </Button>
        </div>
      </div>
    </Card>
  );
};