import { Bike, Bus, Home, Salad, Droplets, Zap, Plane, Recycle, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CalculatorMenuProps {
  onCalculatorSelect: (type: string) => void;
}

export const CalculatorMenu = ({ onCalculatorSelect }: CalculatorMenuProps) => {
  const calculators = [
    // Original calculators
    {
      id: "bike",
      icon: Bike,
      emoji: "🚲",
      title: "Bicicletta",
      description: "CO₂ risparmiata pedalando",
      category: "Trasporti",
      color: "hover:bg-primary/10 border-primary/30"
    },
    {
      id: "transport",
      icon: Bus,
      emoji: "🚌",
      title: "Trasporto Pubblico",
      description: "Risparmio con bus, metro, treno",
      category: "Trasporti",
      color: "hover:bg-blue-50 border-blue-200"
    },
    {
      id: "home",
      icon: Home,
      emoji: "🏠",
      title: "Smart Working",
      description: "CO₂ evitata lavorando da casa",
      category: "Lifestyle",
      color: "hover:bg-orange-50 border-orange-200"
    },
    {
      id: "diet",
      icon: Salad,
      emoji: "🥦",
      title: "Giorni Senza Carne",
      description: "Impatto dieta vegetariana",
      category: "Alimentazione",
      color: "hover:bg-green-50 border-green-200"
    },
    {
      id: "sustainable",
      icon: Droplets,
      emoji: "💧",
      title: "Zero Plastica",
      description: "Riduzione plastica monouso",
      category: "Sostenibilità",
      color: "hover:bg-cyan-50 border-cyan-200"
    },
    // New calculators
    {
      id: "energy",
      icon: Zap,
      emoji: "⚡",
      title: "Energia Domestica",
      description: "Consumo elettrico e riscaldamento",
      category: "Casa",
      color: "hover:bg-yellow-50 border-yellow-200"
    },
    {
      id: "flight",
      icon: Plane,
      emoji: "✈️",
      title: "Volo Aereo",
      description: "Emissioni dei tuoi viaggi",
      category: "Trasporti",
      color: "hover:bg-purple-50 border-purple-200"
    },
    {
      id: "recycle",
      icon: Recycle,
      emoji: "♻️",
      title: "Riciclo Rifiuti",
      description: "CO₂ evitata riciclando",
      category: "Sostenibilità",
      color: "hover:bg-emerald-50 border-emerald-200"
    },
    {
      id: "shopping",
      icon: ShoppingBag,
      emoji: "🛍️",
      title: "Acquisti & Spese",
      description: "Impronta degli acquisti",
      category: "Lifestyle",
      color: "hover:bg-pink-50 border-pink-200"
    },
    {
      id: "food",
      icon: UtensilsCrossed,
      emoji: "🍽️",
      title: "Impatto Alimentare",
      description: "CO₂ dei tuoi pasti",
      category: "Alimentazione",
      color: "hover:bg-red-50 border-red-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trasporti */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            🚗 Trasporti & Mobilità
          </h3>
          <div className="grid gap-4">
            {calculators.filter(calc => calc.category === "Trasporti").map((calc, index) => (
              <CalculatorCard key={calc.id} calc={calc} index={index} onSelect={onCalculatorSelect} />
            ))}
          </div>
        </div>

        {/* Casa & Energia */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            🏠 Casa & Energia
          </h3>
          <div className="grid gap-4">
            {calculators.filter(calc => calc.category === "Casa" || calc.category === "Lifestyle").map((calc, index) => (
              <CalculatorCard key={calc.id} calc={calc} index={index + 3} onSelect={onCalculatorSelect} />
            ))}
          </div>
        </div>

        {/* Alimentazione */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            🍽️ Alimentazione
          </h3>
          <div className="grid gap-4">
            {calculators.filter(calc => calc.category === "Alimentazione").map((calc, index) => (
              <CalculatorCard key={calc.id} calc={calc} index={index + 6} onSelect={onCalculatorSelect} />
            ))}
          </div>
        </div>

        {/* Sostenibilità */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            ♻️ Sostenibilità
          </h3>
          <div className="grid gap-4">
            {calculators.filter(calc => calc.category === "Sostenibilità").map((calc, index) => (
              <CalculatorCard key={calc.id} calc={calc} index={index + 8} onSelect={onCalculatorSelect} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CalculatorCardProps {
  calc: any;
  index: number;
  onSelect: (type: string) => void;
}

const CalculatorCard = ({ calc, index, onSelect }: CalculatorCardProps) => {
  const IconComponent = calc.icon;
  
  return (
    <Card
      className={`p-4 cursor-pointer transition-all duration-300 ${calc.color} hover:shadow-modern hover:scale-[1.02] backdrop-blur-sm bg-gradient-glass border-primary/20`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onSelect(calc.id)}
    >
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div 
            className="text-3xl animate-grow" 
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {calc.emoji}
          </div>
          <IconComponent className="w-5 h-5 text-primary absolute -bottom-1 -right-1 bg-background rounded-full p-0.5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1 truncate">
            {calc.title}
          </h4>
          <p className="text-sm text-muted-foreground">
            {calc.description}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-sm">→</span>
          </div>
        </div>
      </div>
    </Card>
  );
};