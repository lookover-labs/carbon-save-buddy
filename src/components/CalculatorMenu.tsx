import { Bike, Bus, Home, Salad, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CalculatorMenuProps {
  onCalculatorSelect: (type: string) => void;
}

export const CalculatorMenu = ({ onCalculatorSelect }: CalculatorMenuProps) => {
  const calculators = [
    {
      id: "bike",
      icon: Bike,
      emoji: "🚲",
      title: "Bicicletta",
      description: "Calcola il CO₂ risparmiato pedalando",
      color: "hover:bg-primary/10 border-primary/30"
    },
    {
      id: "transport",
      icon: Bus,
      emoji: "🚌",
      title: "Trasporto Pubblico",
      description: "Risparmio usando bus, metro o treno",
      color: "hover:bg-blue-50 border-blue-200"
    },
    {
      id: "home",
      icon: Home,
      emoji: "🏠",
      title: "Lavoro da Casa",
      description: "CO₂ risparmiata evitando spostamenti",
      color: "hover:bg-orange-50 border-orange-200"
    },
    {
      id: "diet",
      icon: Salad,
      emoji: "🥦",
      title: "Giorni Senza Carne",
      description: "Impatto della dieta vegetariana",
      color: "hover:bg-green-50 border-green-200"
    },
    {
      id: "sustainable",
      icon: Droplets,
      emoji: "💧",
      title: "Borraccia / No Plastica",
      description: "Riduzione plastica monouso",
      color: "hover:bg-cyan-50 border-cyan-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-scale-in">
      {calculators.map((calc, index) => {
        const IconComponent = calc.icon;
        return (
          <Card
            key={calc.id}
            className={`p-4 cursor-pointer transition-all duration-300 ${calc.color} hover:shadow-eco hover:scale-105`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onCalculatorSelect(calc.id)}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <div className="text-3xl animate-grow" style={{ animationDelay: `${index * 0.2}s` }}>
                  {calc.emoji}
                </div>
                <IconComponent className="w-6 h-6 text-primary absolute -bottom-1 -right-1 bg-background rounded-full p-1" />
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {calc.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {calc.description}
                </p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Calcola
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};