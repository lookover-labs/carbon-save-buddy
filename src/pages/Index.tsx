import { useState } from "react";
import { IntroSection } from "@/components/IntroSection";
import { CalculatorMenu } from "@/components/CalculatorMenu";
import { BikeCalculator } from "@/components/calculators/BikeCalculator";
import { TransportCalculator } from "@/components/calculators/TransportCalculator";
import { HomeCalculator } from "@/components/calculators/HomeCalculator";
import { DietCalculator } from "@/components/calculators/DietCalculator";
import { SustainableCalculator } from "@/components/calculators/SustainableCalculator";
import { EnergyCalculator } from "@/components/calculators/EnergyCalculator";
import { FlightCalculator } from "@/components/calculators/FlightCalculator";
import { RecycleCalculator } from "@/components/calculators/RecycleCalculator";
import { ShoppingCalculator } from "@/components/calculators/ShoppingCalculator";
import { FoodCalculator } from "@/components/calculators/FoodCalculator";

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
      case "energy":
        return <EnergyCalculator onBack={handleBack} />;
      case "flight":
        return <FlightCalculator onBack={handleBack} />;
      case "recycle":
        return <RecycleCalculator onBack={handleBack} />;
      case "shopping":
        return <ShoppingCalculator onBack={handleBack} />;
      case "food":
        return <FoodCalculator onBack={handleBack} />;
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {renderCalculator()}
      </div>
    </div>
  );
};

export default Index;
