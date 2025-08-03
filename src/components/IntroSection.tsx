import { Leaf, Target, Lightbulb, Globe, TrendingDown, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export const IntroSection = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Main Hero Section */}
      <Card className="relative p-8 bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-modern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-modern opacity-5"></div>
        <div className="relative text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Leaf className="w-16 h-16 text-primary animate-float drop-shadow-lg" />
              <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            <span className="bg-gradient-modern bg-clip-text text-transparent">
              Carbon Footprint
            </span>
            <br />
            <span className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              Calcola il tuo impatto ambientale
            </span>
          </h1>
        </div>
      </Card>

      {/* Educational Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-glass">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            Cos'è la Carbon Footprint?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            La carbon footprint misura la quantità totale di gas serra emessi 
            direttamente e indirettamente dalle nostre attività quotidiane. 
            Include tutto: dai trasporti al cibo, dall'energia domestica ai nostri acquisti.
          </p>
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-sm font-medium text-primary">
              💡 Ogni italiano emette in media 7.6 tonnellate di CO₂ all'anno
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-glass">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-primary" />
            Perché è importante ridurla?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Le emissioni di CO₂ sono la causa principale del cambiamento climatico. 
            Ridurre la nostra impronta carbonica è essenziale per limitare il 
            riscaldamento globale e proteggere il nostro pianeta.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-primary" />
              <span>Obiettivo globale: +1.5°C massimo</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span>Serve l'impegno di tutti</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Examples Section */}
      <Card className="p-6 bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-glass">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Esempi di emissioni quotidiane
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-accent/30 rounded-lg backdrop-blur-sm">
            <div className="text-2xl mb-1">🚗</div>
            <p className="text-xs font-medium">1 km in auto</p>
            <p className="text-sm font-bold text-primary">0.21 kg CO₂</p>
          </div>
          <div className="text-center p-3 bg-accent/30 rounded-lg backdrop-blur-sm">
            <div className="text-2xl mb-1">✈️</div>
            <p className="text-xs font-medium">1 km in aereo</p>
            <p className="text-sm font-bold text-primary">0.18 kg CO₂</p>
          </div>
          <div className="text-center p-3 bg-accent/30 rounded-lg backdrop-blur-sm">
            <div className="text-2xl mb-1">🥩</div>
            <p className="text-xs font-medium">1 bistecca</p>
            <p className="text-sm font-bold text-primary">7.7 kg CO₂</p>
          </div>
          <div className="text-center p-3 bg-accent/30 rounded-lg backdrop-blur-sm">
            <div className="text-2xl mb-1">⚡</div>
            <p className="text-xs font-medium">1 kWh elettricità</p>
            <p className="text-sm font-bold text-primary">0.4 kg CO₂</p>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Scopri il tuo impatto con i nostri calcolatori 👇
        </h2>
        <p className="text-muted-foreground">
          Scegli un'area della tua vita quotidiana e calcola quanta CO₂ stai producendo o risparmiando
        </p>
      </div>
    </div>
  );
};