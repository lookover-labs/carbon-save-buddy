import { useState } from "react";
import { ArrowLeft, ShoppingBag, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ShoppingCalculatorProps {
  onBack: () => void;
}

export const ShoppingCalculator = ({ onBack }: ShoppingCalculatorProps) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState<{ emissions: number; category: string; comparison: string } | null>(null);

  const spendingFactors = {
    clothing: { factor: 0.25, name: "abbigliamento e scarpe", comparison: "120 km in auto" },
    electronics: { factor: 0.35, name: "elettronica e tecnologia", comparison: "165 km in auto" },
    furniture: { factor: 0.15, name: "mobili e arredamento", comparison: "70 km in auto" },
    beauty: { factor: 0.20, name: "cosmetici e cura persona", comparison: "95 km in auto" },
    books: { factor: 0.10, name: "libri e media", comparison: "50 km in auto" },
    general: { factor: 0.18, name: "acquisti generali", comparison: "85 km in auto" }
  };

  const calculateEmissions = () => {
    const euros = parseFloat(amount);
    if (euros > 0 && category) {
      const factor = spendingFactors[category as keyof typeof spendingFactors];
      const emissions = euros * factor.factor;
      const comparison = factor.comparison.replace(/\d+/, Math.round(emissions / 0.21).toString());
      setResult({
        emissions,
        category: factor.name,
        comparison
      });
    }
  };

  const resetCalculator = () => {
    setAmount("");
    setCategory("");
    setResult(null);
  };

  if (result !== null) {
    return (
      <Card className="p-6 max-w-md mx-auto bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-modern animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">🛍️</div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto animate-grow" />
          
          <h2 className="text-2xl font-bold text-foreground">
            Spesa calcolata!
          </h2>
          
          <div className="bg-primary/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-3xl font-bold text-primary">
              {result.emissions.toFixed(1)} kg
            </p>
            <p className="text-sm text-muted-foreground">
              di CO₂ dalla tua spesa
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Hai speso <strong>€{amount}</strong> in {result.category}. 
            Ogni acquisto ha un'impronta carbonica legata alla produzione e trasporto! 🛒
          </p>
          
          <div className="bg-accent/30 p-3 rounded-lg text-sm backdrop-blur-sm">
            <strong>Equivale a:</strong> {result.comparison}
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm backdrop-blur-sm">
            💡 <strong>Riduci l'impatto:</strong> Scegli prodotti locali, di seconda mano 
            o da aziende con certificazioni ambientali
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
            <ShoppingBag className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Acquisti & Spese
            </h2>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3 animate-float">🛍️</div>
          <p className="text-muted-foreground mb-6">
            Calcola l'impronta carbonica delle tue spese
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="category" className="text-foreground">
              Categoria di spesa
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1 border-primary/30 focus:border-primary backdrop-blur-sm">
                <SelectValue placeholder="Seleziona la categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clothing">👕 Abbigliamento e scarpe</SelectItem>
                <SelectItem value="electronics">📱 Elettronica e tecnologia</SelectItem>
                <SelectItem value="furniture">🛋️ Mobili e arredamento</SelectItem>
                <SelectItem value="beauty">💄 Cosmetici e cura persona</SelectItem>
                <SelectItem value="books">📚 Libri e media</SelectItem>
                <SelectItem value="general">🛒 Acquisti generali</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="amount" className="text-foreground">
              Importo speso (€)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="es. 85.50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary backdrop-blur-sm"
            />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground backdrop-blur-sm">
            💡 <strong>Fattori di emissione per €:</strong><br />
            • Elettronica: 0.35 kg CO₂/€<br />
            • Abbigliamento: 0.25 kg CO₂/€<br />
            • Cosmetici: 0.20 kg CO₂/€<br />
            • Mobili: 0.15 kg CO₂/€
          </div>
          
          <Button
            onClick={calculateEmissions}
            disabled={!amount || !category || parseFloat(amount) <= 0}
            className="w-full bg-gradient-modern border-0 text-white hover:shadow-modern"
          >
            Calcola l'impronta
          </Button>
        </div>
      </div>
    </Card>
  );
};