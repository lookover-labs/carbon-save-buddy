import { Leaf, Target, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

export const IntroSection = () => {
  return (
    <div className="mb-8 animate-fade-in">
      <Card className="p-6 bg-gradient-earth border-primary/20 shadow-eco">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Leaf className="w-12 h-12 text-primary animate-float" />
              <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full blur-lg"></div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
            <span>🌱</span>
            Cos'è la Carbon Footprint?
          </h1>
          
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
            Le emissioni di CO₂ sono gas responsabili del cambiamento climatico. 
            Anche azioni quotidiane come guidare o mangiare carne le producono. 
            Ridurle fa bene al pianeta.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">1 km in auto = 0.21 kg CO₂</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">Piccoli gesti, grandi risultati</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
              <Leaf className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">Ogni scelta conta</span>
            </div>
          </div>
          
          <h2 className="text-lg font-semibold text-primary mb-2">
            Calcola quanto hai risparmiato oggi 👇
          </h2>
        </div>
      </Card>
    </div>
  );
};