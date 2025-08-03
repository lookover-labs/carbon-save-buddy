import { useState } from "react";
import { ArrowLeft, Bus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransportCalculatorProps {
  onBack: () => void;
}

export const TransportCalculator = ({ onBack }: TransportCalculatorProps) => {
  const [distance, setDistance] = useState("");
  const [transportType, setTransportType] = useState("");
  const [result, setResult] = useState<{ savings: number; transport: string } | null>(null);

  const transportFactors = {
    bus: { factor: 0.089, name: "autobus" }, // kg CO₂ per km per persona
    metro: { factor: 0.033, name: "metropolitana" },
    train: { factor: 0.041, name: "treno" }
  };

  const calculateSavings = () => {
    const km = parseFloat(distance);
    if (km > 0 && transportType) {
      // Auto privata: 0.21 kg CO₂/km
      // Trasporto pubblico: vari fattori
      const carEmissions = km * 0.21;
      const publicTransportEmissions = km * transportFactors[transportType as keyof typeof transportFactors].factor;
      const savings = carEmissions - publicTransportEmissions;
      
      setResult({
        savings: Math.max(0, savings),
        transport: transportFactors[transportType as keyof typeof transportFactors].name
      });
    }
  };

  const resetCalculator = () => {
    setDistance("");
    setTransportType("");
    setResult(null);
  };

  if (result !== null) {
    return (
      <Card className="p-6 max-w-md mx-auto bg-gradient-nature border-primary/20 shadow-eco animate-scale-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">🌍</div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto animate-grow" />
          
          <h2 className="text-2xl font-bold text-foreground">
            Scelta sostenibile!
          </h2>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-3xl font-bold text-primary">
              {result.savings.toFixed(2)} kg
            </p>
            <p className="text-sm text-muted-foreground">
              di CO₂ risparmiata
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Hai viaggiato <strong>{distance} km</strong> in {result.transport} invece 
            che in auto privata. Ottima scelta per l'ambiente! 🚌
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
            <Bus className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Trasporto Pubblico
            </h2>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl mb-3 animate-float">🚌</div>
          <p className="text-muted-foreground mb-6">
            Calcola il CO₂ risparmiato usando i trasporti pubblici
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="transport-type" className="text-foreground">
              Tipo di trasporto utilizzato
            </Label>
            <Select value={transportType} onValueChange={setTransportType}>
              <SelectTrigger className="mt-1 border-primary/30 focus:border-primary">
                <SelectValue placeholder="Seleziona il trasporto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bus">🚌 Autobus</SelectItem>
                <SelectItem value="metro">🚇 Metropolitana</SelectItem>
                <SelectItem value="train">🚂 Treno</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="distance" className="text-foreground">
              Chilometri percorsi
            </Label>
            <Input
              id="distance"
              type="number"
              placeholder="es. 15.5"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="mt-1 border-primary/30 focus:border-primary"
            />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
            💡 <strong>Sapevi che:</strong> i trasporti pubblici riducono significativamente 
            le emissioni pro-capite rispetto all'auto privata
          </div>
          
          <Button
            onClick={calculateSavings}
            disabled={!distance || !transportType || parseFloat(distance) <= 0}
            className="w-full bg-primary hover:bg-primary-dark"
          >
            Calcola il risparmio
          </Button>
        </div>
      </div>
    </Card>
  );
};