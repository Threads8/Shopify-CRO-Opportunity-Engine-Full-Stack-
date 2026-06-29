import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

const steps = [
  "Initializing crawler engine...",
  "Scanning homepage layout and hero elements...",
  "Extracting product page conversion signals...",
  "Analyzing collection and filtering UX...",
  "Evaluating cart and checkout flow...",
  "Structuring data for AI analysis...",
  "Running advanced CRO model...",
  "Finalizing recommendations..."
];

export default function LoadingScreen({ url }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simulate progression through steps while waiting for the real API
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 3000); // Progress every 3s as dummy animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1115] p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]" />
      
      <div className="z-10 w-full max-w-md glass-panel p-8 rounded-3xl">
        <div className="flex flex-col items-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="mb-6 text-brand-400"
          >
            <Loader2 size={48} />
          </motion.div>
          <h2 className="text-2xl font-semibold text-white text-center">Analyzing Store</h2>
          <p className="text-gray-400 text-sm mt-2 truncate w-full text-center">{url}</p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div 
                key={index} 
                className={`flex items-center gap-3 transition-opacity duration-300 ${
                  isPending ? 'opacity-30' : 'opacity-100'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="text-green-400 shrink-0" size={20} />
                ) : isCurrent ? (
                  <Loader2 className="text-brand-400 animate-spin shrink-0" size={20} />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600 shrink-0" />
                )}
                <span className={`text-sm ${isCurrent ? 'text-white font-medium' : 'text-gray-400'}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
