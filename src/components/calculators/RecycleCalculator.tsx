import { useState } from "react";
import { ArrowLeft, Recycle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RecycleCalculatorProps {
  onBack: () => void;
}

export const RecycleCalculator = ({ onBack }: RecycleCalculatorProps) => {
  const [weight, setWeight] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [result, setResult] = useState<{ savings: number; material: string; trees: number } | null>(null);

  const materialFactors = {
    paper: { factor: 3.3, name: "carta e cartone", treeFactor: 0.015 }, // kg CO₂ evitati per kg riciclato
    plastic: { factor: 2.0, name: "plastica", treeFactor: 0.01 },
    glass: { factor: 0.5, name: "vetro", treeFactor: 0.003 },
    metal: { factor: 6.0, name: "metalli", treeFactor: 0.025 },
    organic: { factor: 0.8, name: "organico (compost)", treeFactor: 0.004 }
  };

  const calculateSavings = () => {
    const kg = parseFloat(weight);
    if (kg > 0 && materialType) {
      const material = materialFactors[materialType as keyof typeof materialFactors];
      const savings = kg * material.factor;
      const trees = kg * material.treeFactor;
      setResult({
        savings,
        material: material.name,
        trees
      });
    }
  };

  const resetCalculator = () => {
    setWeight("");
    setMaterialType("");
    setResult(null);
  };

  if (result !== null) {
    return (
      <Card className="p-6 max-w-md mx-auto bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-modern animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">♻️</div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto animate-grow" />
          
          <h2 className="text-2xl font-bold text-foreground">
            Ottimo riciclo!
          </h2>
          
          <div className="bg-primary/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-3xl font-bold text-primary">
              {result.savings.toFixed(1)} kg
            </p>
            <p className="text-sm text-muted-foreground">
              di CO₂ evitata riciclando
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Riciclando <strong>{weight} kg</strong> di {result.material} hai evitato 
            che finissero in discarica. Fantastico! ♻️
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-accent/30 p-3 rounded-lg text-sm backdrop-blur-sm">
              <div className="text-lg">🌳</div>
              <p className="font-medium">{result.trees.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">alberi equivalenti</p>
            </div>
            <div className="bg-accent/30 p-3 rounded-lg text-sm backdrop-blur-sm">
              <div className="text-lg">🚗</div>
              <p className="font-medium">{(result.savings / 0.21).toFixed(0)} km</p>
              <p className="text-xs text-muted-foreground">auto evitati</p>
            </div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm backdrop-blur-sm">
            💡 <strong>Lo sapevi?</strong> Il riciclo riduce drasticamente la necessità 
            di estrarre nuove materie prime
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
            <Recycle className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Riciclo Rifiuti
            </h2>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3 animate-float">♻️</div>
          <p className="text-muted-foreground mb-6">
            Calcola la CO₂ evitata grazie al riciclo
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="material-type" className="text-foreground">
              Tipo di materiale riciclato
            </Label>
            <Select value={materialType} onValueChange={setMaterialType}>
              <SelectTrigger className="mt-1 border-primary/30 focus:border-primary backdrop-blur-sm">
                <SelectValue placeholder="Seleziona il materiale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paper">📄 Carta e cartone</SelectItem>
                <SelectItem value="plastic">🥤 Plastica</SelectItem>
                <SelectItem value="glass">🍾 Vetro</SelectItem>
                <SelectItem value="metal">🥫 Metalli (alluminio, acciaio)</SelectItem>
                <SelectItem value="organic">🍃 Organico (compost)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="weight" className="text-foreground">
              Peso riciclato (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="es. 2.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary backdrop-blur-sm"
            />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground backdrop-blur-sm">
            💡 <strong>CO₂ evitata per kg:</strong><br />
            • Carta: 3.3 kg CO₂<br />
            • Metalli: 6.0 kg CO₂<br />
            • Plastica: 2.0 kg CO₂<br />
            • Vetro: 0.5 kg CO₂
          </div>
          
          <Button
            onClick={calculateSavings}
            disabled={!weight || !materialType || parseFloat(weight) <= 0}
            className="w-full bg-gradient-modern border-0 text-white hover:shadow-modern"
          >
            Calcola il risparmio
          </Button>
        </div>
      </div>
    </Card>
  );
};