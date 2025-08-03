import { useState } from "react";
import { IntroSection } from "@/components/IntroSection";
import { CalculatorMenu } from "@/components/CalculatorMenu";
import { BikeCalculator } from "@/components/calculators/BikeCalculator";
import { TransportCalculator } from "@/components/calculators/TransportCalculator";
import { HomeCalculator } from "@/components/calculators/HomeCalculator";
import { DietCalculator } from "@/components/calculators/DietCalculator";
import { SustainableCalculator } from "@/components/calculators/SustainableCalculator";

const Index = () => {
  const [currentCalculator, setCurrentCalculator] = useState<string | null>(null);

  const handleCalculatorSelect = (type: string) => {
    setCurrentCalculator(type);
  };

  const handleBack = () => {
    setCurrentCalculator(null);
  };

  const renderCalculator = () => {
    switch (currentCalculator) {
      case "bike":
        return <BikeCalculator onBack={handleBack} />;
      case "transport":
        return <TransportCalculator onBack={handleBack} />;
      case "home":
        return <HomeCalculator onBack={handleBack} />;
      case "diet":
        return <DietCalculator onBack={handleBack} />;
      case "sustainable":
        return <SustainableCalculator onBack={handleBack} />;
      default:
        return (
          <>
            <IntroSection />
            <CalculatorMenu onCalculatorSelect={handleCalculatorSelect} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {renderCalculator()}
      </div>
    </div>
  );
};

export default Index;
