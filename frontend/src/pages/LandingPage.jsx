import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, ShieldCheck, Zap, BarChart } from 'lucide-react';
import { analyzeStore } from '../services/api';
import LoadingScreen from '../components/LoadingScreen';

export default function LandingPage({ onComplete, isLoading, setIsLoading, error, setError }) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await analyzeStore(url);
      onComplete(data);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen url={url} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0f1115]">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

      <main className="z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Shopify <span className="text-gradient">CRO</span><br />
            Opportunity Engine
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            AI-powered, evidence-based Conversion Rate Optimization audits. 
            Stop guessing, start converting.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          className="w-full max-w-2xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-panel p-2 flex items-center">
            <div className="pl-4 text-gray-500">
              <Search size={24} />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-shopify-store.com"
              className="w-full bg-transparent border-none outline-none text-white px-4 py-3 text-lg placeholder-gray-600"
              required
            />
            <button 
              type="submit"
              className="bg-brand-500 hover:bg-brand-400 transition-colors text-white font-medium py-3 px-8 rounded-xl flex items-center gap-2"
            >
              Analyze <ArrowRight size={20} />
            </button>
          </div>
          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-red-400 mt-4 text-sm"
            >
              {error}
            </motion.p>
          )}
        </motion.form>

        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FeatureCard 
            icon={<Zap className="text-yellow-400" size={32} />}
            title="Instant Analysis"
            desc="Deep-dive crawler evaluates homepage, PDP, and cart flows in seconds."
          />
          <FeatureCard 
            icon={<BarChart className="text-brand-400" size={32} />}
            title="Evidence Based"
            desc="Recommendations linked directly to elements on your actual store."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-green-400" size={32} />}
            title="Actionable Tests"
            desc="Pre-written A/B testing hypotheses ready to implement."
          />
        </motion.div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-panel p-6 flex flex-col items-center text-center">
      <div className="mb-4 p-3 bg-white/5 rounded-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
