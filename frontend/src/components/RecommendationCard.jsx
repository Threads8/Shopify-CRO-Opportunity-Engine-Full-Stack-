import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Beaker, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function RecommendationCard({ rec, experiment }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'high': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'low': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="glass-panel overflow-hidden transition-all duration-300 hover:border-white/20">
      <div 
        className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-semibold px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10 uppercase tracking-wider">
              {rec.category}
            </span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${getImpactColor(rec.impact)} uppercase tracking-wider`}>
              {rec.impact} Impact
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{rec.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{rec.explanation}</p>
        </div>

        <div className="flex items-center gap-6 md:w-auto w-full justify-between md:justify-end border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{rec.priority}</div>
            <div className="text-xs text-gray-500 uppercase">Priority</div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors p-2">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-black/20"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Details Section */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-brand-400" /> Evidence Found
                  </h4>
                  <div className="bg-white/5 p-4 rounded-xl text-sm text-gray-400 border border-white/5">
                    {rec.evidence}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Confidence</div>
                    <div className="text-lg font-semibold text-white">{rec.confidence}%</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Effort</div>
                    <div className="text-lg font-semibold text-white capitalize">{rec.effort}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
                    <ArrowUpRight size={16} className="text-green-400" /> Expected Outcome
                  </h4>
                  <p className="text-sm text-gray-400">{rec.expectedOutcome}</p>
                </div>
              </div>

              {/* Experiment Section */}
              {experiment ? (
                <div className="bg-brand-900/10 border border-brand-500/20 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Beaker size={64} className="text-brand-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                    <Beaker size={20} className="text-brand-400" /> Experiment Plan
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-brand-400/80 mb-1 uppercase tracking-wider">Hypothesis</div>
                      <p className="text-sm text-gray-300 font-medium">{experiment.hypothesis}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                        <div className="text-xs text-gray-500 mb-1">Variant A (Control)</div>
                        <div className="text-sm text-gray-300">{experiment.variantA}</div>
                      </div>
                      <div className="bg-brand-500/10 p-3 rounded-lg border border-brand-500/30">
                        <div className="text-xs text-brand-300 mb-1">Variant B</div>
                        <div className="text-sm text-white">{experiment.variantB}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                      <div>
                        <div className="text-xs text-gray-500">Primary Metric</div>
                        <div className="text-sm text-gray-300">{experiment.primaryMetric}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Est. Lift / Duration</div>
                        <div className="text-sm text-green-400">{experiment.estimatedLift} • {experiment.experimentDuration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full border border-dashed border-white/10 rounded-xl">
                  <p className="text-gray-500 text-sm">No specific experiment generated for this recommendation.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
