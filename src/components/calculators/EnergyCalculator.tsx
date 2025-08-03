import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EnergyCalculatorProps {
  onBack: () => void;
}

export const EnergyCalculator = ({ onBack }: EnergyCalculatorProps) => {
  const [kwh, setKwh] = useState("");
  const [energySource, setEnergySource] = useState("");
  const [result, setResult] = useState<{ emissions: number; source: string } | null>(null);

  const energyFactors = {
    mix: { factor: 0.4, name: "mix energetico nazionale" }, // kg CO₂ per kWh
    coal: { factor: 0.9, name: "carbone" },
    gas: { factor: 0.5, name: "gas naturale" },
    renewable: { factor: 0.05, name: "rinnovabili" },
    nuclear: { factor: 0.06, name: "nucleare" }
  };

  const calculateEmissions = () => {
    const consumption = parseFloat(kwh);
    if (consumption > 0 && energySource) {
      const factor = energyFactors[energySource as keyof typeof energyFactors];
      const emissions = consumption * factor.factor;
      setResult({
        emissions,
        source: factor.name
      });
    }
  };

  const resetCalculator = () => {
    setKwh("");
    setEnergySource("");
    setResult(null);
  };

  if (result !== null) {
    return (
      <Card className="p-6 max-w-md mx-auto bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-modern animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">⚡</div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto animate-grow" />
          
          <h2 className="text-2xl font-bold text-foreground">
            Consumo calcolato!
          </h2>
          
          <div className="bg-primary/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-3xl font-bold text-primary">
              {result.emissions.toFixed(2)} kg
            </p>
            <p className="text-sm text-muted-foreground">
              di CO₂ emessa oggi
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Hai consumato <strong>{kwh} kWh</strong> da {result.source}. 
            {result.emissions > 10 ? 
              " Considera il passaggio a fonti rinnovabili! 🌱" :
              " Ottimo consumo energetico! 🌟"
            }
          </p>
          
          <div className="bg-accent/30 p-3 rounded-lg text-sm backdrop-blur-sm">
            <strong>Confronto:</strong> Una famiglia italiana media consuma circa 12 kWh al giorno
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
            <Zap className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Energia Domestica
            </h2>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3 animate-float">⚡</div>
          <p className="text-muted-foreground mb-6">
            Calcola le emissioni del tuo consumo energetico domestico
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="kwh" className="text-foreground">
              Consumo elettrico (kWh)
            </Label>
            <Input
              id="kwh"
              type="number"
              placeholder="es. 8.5"
              value={kwh}
              onChange={(e) => setKwh(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary backdrop-blur-sm"
            />
          </div>
          
          <div>
            <Label htmlFor="energy-source" className="text-foreground">
              Fonte energetica principale
            </Label>
            <Select value={energySource} onValueChange={setEnergySource}>
              <SelectTrigger className="mt-1 border-primary/30 focus:border-primary backdrop-blur-sm">
                <SelectValue placeholder="Seleziona la fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mix">🔌 Mix energetico nazionale</SelectItem>
                <SelectItem value="renewable">🌱 Rinnovabili (solare, eolico)</SelectItem>
                <SelectItem value="gas">🔥 Gas naturale</SelectItem>
                <SelectItem value="coal">⚫ Carbone</SelectItem>
                <SelectItem value="nuclear">⚛️ Nucleare</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground backdrop-blur-sm">
            💡 <strong>Fattori di emissione:</strong><br />
            • Mix nazionale: 0.4 kg CO₂/kWh<br />
            • Rinnovabili: 0.05 kg CO₂/kWh<br />
            • Gas: 0.5 kg CO₂/kWh
          </div>
          
          <Button
            onClick={calculateEmissions}
            disabled={!kwh || !energySource || parseFloat(kwh) <= 0}
            className="w-full bg-gradient-modern border-0 text-white hover:shadow-modern"
          >
            Calcola le emissioni
          </Button>
        </div>
      </div>
    </Card>
  );
};