import React, { useState, useEffect } from "react";
import { TradingSignal } from "@/entities/TradingSignal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Clock,
  Target,
  Shield,
  Zap,
  RefreshCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SignalCard from "../components/signals/SignalCard";
import MarketStats from "../components/dashboard/MarketStats";
import SignalFilters from "../components/signals/SignalFilters";

export default function Dashboard() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    signal_type: "all",
    strength: "all",
    timeframe: "all"
  });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    loadSignals();
    const interval = setInterval(loadSignals, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadSignals = async () => {
    setLoading(true);
    try {
      const data = await TradingSignal.list("-created_date", 50);
      setSignals(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error loading signals:", error);
    }
    setLoading(false);
  };

  const filteredSignals = signals.filter(signal => {
    const typeMatch = filters.signal_type === "all" || signal.signal_type === filters.signal_type;
    const strengthMatch = filters.strength === "all" || 
      (filters.strength === "high" && signal.strength >= 80) ||
      (filters.strength === "medium" && signal.strength >= 50 && signal.strength < 80) ||
      (filters.strength === "low" && signal.strength < 50);
    const timeframeMatch = filters.timeframe === "all" || signal.timeframe === filters.timeframe;
    return typeMatch && strengthMatch && timeframeMatch;
  });

  const activeSignals = signals.filter(s => s.status === "active");
  const buySignals = activeSignals.filter(s => s.signal_type === "BUY").length;
  const sellSignals = activeSignals.filter(s => s.signal_type === "SELL").length;

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Live Trading Signals</h1>
            <p className="text-slate-400">Real-time perpetual futures signals powered by advanced algorithms</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400">
              Last update: {lastUpdate.toLocaleTimeString()}
            </div>
            <Button 
              onClick={loadSignals}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-900"
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Market Stats */}
        <MarketStats 
          totalSignals={activeSignals.length}
          buySignals={buySignals}
          sellSignals={sellSignals}
          loading={loading}
        />

        {/* Filters */}
        <SignalFilters filters={filters} onFiltersChange={setFilters} />

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Buy Signals</p>
                  <p className="text-2xl font-bold text-white">{buySignals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Sell Signals</p>
                  <p className="text-2xl font-bold text-white">{sellSignals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">High Strength</p>
                  <p className="text-2xl font-bold text-white">
                    {activeSignals.filter(s => s.strength >= 80).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-white">73.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Signals Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Active Signals ({filteredSignals.length})</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="bg-slate-900/50 border-slate-800 animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-32 bg-slate-800 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSignals.map((signal, index) => (
                  <motion.div
                    key={signal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <SignalCard signal={signal} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}

          {!loading && filteredSignals.length === 0 && (
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-12 text-center">
                <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-300 mb-2">No Signals Found</h3>
                <p className="text-slate-500">Try adjusting your filters or check back later for new signals.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
