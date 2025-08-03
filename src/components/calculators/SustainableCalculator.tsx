import { useState } from "react";
import { ArrowLeft, Droplets, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SustainableCalculatorProps {
  onBack: () => void;
}

export const SustainableCalculator = ({ onBack }: SustainableCalculatorProps) => {
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState<{ savings: number; item: string; co2PerItem: number } | null>(null);

  const sustainableItems = {
    bottle: { name: "bottiglie di plastica", co2: 0.82, unit: "bottiglia" }, // kg CO₂ per bottiglia da 500ml
    bag: { name: "sacchetti di plastica", co2: 0.033, unit: "sacchetto" }, // kg CO₂ per sacchetto
    cup: { name: "bicchieri di plastica", co2: 0.056, unit: "bicchiere" }, // kg CO₂ per bicchiere
    straw: { name: "cannucce di plastica", co2: 0.005, unit: "cannuccia" } // kg CO₂ per cannuccia
  };

  const calculateSavings = () => {
    const qty = parseFloat(quantity);
    if (qty > 0 && itemType) {
      const item = sustainableItems[itemType as keyof typeof sustainableItems];
      const savings = qty * item.co2;
      setResult({
        savings,
        item: item.name,
        co2PerItem: item.co2
      });
    }
  };

  const resetCalculator = () => {
    setItemType("");
    setQuantity("");
    setResult(null);
  };

  if (result !== null) {
    return (
      <Card className="p-6 max-w-md mx-auto bg-gradient-nature border-primary/20 shadow-eco animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">♻️</div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto animate-grow" />
          
          <h2 className="text-2xl font-bold text-foreground">
            Zero waste hero!
          </h2>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-3xl font-bold text-primary">
              {result.savings.toFixed(3)} kg
            </p>
            <p className="text-sm text-muted-foreground">
              di CO₂ evitata
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Evitando <strong>{quantity} {result.item}</strong> hai detto no alla plastica 
            monouso. Ogni piccolo gesto conta per ridurre l'inquinamento! 🌊
          </p>
          
          <div className="bg-accent/50 p-3 rounded-lg text-sm">
            <strong>Impatto:</strong> {result.co2PerItem} kg CO₂ per {sustainableItems[itemType as keyof typeof sustainableItems].unit}
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
            <Droplets className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              No Plastica Monouso
            </h2>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3 animate-float">💧</div>
          <p className="text-muted-foreground mb-6">
            Calcola l'impatto evitando la plastica monouso
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="item-type" className="text-foreground">
              Cosa hai evitato di usare?
            </Label>
            <Select value={itemType} onValueChange={setItemType}>
              <SelectTrigger className="mt-1 border-primary/30 focus:border-primary">
                <SelectValue placeholder="Seleziona l'oggetto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bottle">🍼 Bottiglie di plastica</SelectItem>
                <SelectItem value="bag">🛍️ Sacchetti di plastica</SelectItem>
                <SelectItem value="cup">🥤 Bicchieri di plastica</SelectItem>
                <SelectItem value="straw">🥤 Cannucce di plastica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="quantity" className="text-foreground">
              Quantità evitata
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="es. 5"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary"
            />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
            💡 <strong>Alternativa sostenibile:</strong> Usa borracce riutilizzabili, 
            borse di tela e materiali biodegradabili
          </div>
          
          <Button
            onClick={calculateSavings}
            disabled={!itemType || !quantity || parseFloat(quantity) <= 0}
            className="w-full bg-primary hover:bg-primary-dark"
          >
            Calcola l'impatto evitato
          </Button>
        </div>
      </div>
    </Card>
  );
};