import React, { useState, useEffect } from "react";
import { TradingSignal } from "@/entities/TradingSignal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Target,
  BarChart3,
  PieChart,
  Award,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

export default function Analytics() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("7d");

  useEffect(() => {
    loadSignals();
  }, []);

  const loadSignals = async () => {
    setLoading(true);
    try {
      const data = await TradingSignal.list("-created_date", 100);
      setSignals(data);
    } catch (error) {
      console.error("Error loading signals:", error);
    }
    setLoading(false);
  };

  // Analytics calculations
  const totalSignals = signals.length;
  const buySignals = signals.filter(s => s.signal_type === "BUY").length;
  const sellSignals = signals.filter(s => s.signal_type === "SELL").length;
  const highStrengthSignals = signals.filter(s => s.strength >= 80).length;
  const averageStrength = signals.length > 0 
    ? signals.reduce((sum, s) => sum + s.strength, 0) / signals.length 
    : 0;

  // Symbol performance
  const symbolStats = signals.reduce((acc, signal) => {
    if (!acc[signal.symbol]) {
      acc[signal.symbol] = { count: 0, avgStrength: 0, totalStrength: 0 };
    }
    acc[signal.symbol].count++;
    acc[signal.symbol].totalStrength += signal.strength;
    acc[signal.symbol].avgStrength = acc[signal.symbol].totalStrength / acc[signal.symbol].count;
    return acc;
  }, {});

  const topPerformers = Object.entries(symbolStats)
    .sort(([,a], [,b]) => b.avgStrength - a.avgStrength)
    .slice(0, 8);

  // Timeframe distribution
  const timeframeStats = signals.reduce((acc, signal) => {
    acc[signal.timeframe] = (acc[signal.timeframe] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Signal Analytics</h1>
            <p className="text-slate-400">Performance insights and trading signal analysis</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Total Signals</p>
                    <p className="text-2xl font-bold text-white">{totalSignals}</p>
                    <p className="text-xs text-slate-500">Last 30 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Avg Strength</p>
                    <p className="text-2xl font-bold text-white">{averageStrength.toFixed(1)}%</p>
                    <p className="text-xs text-green-400">+2.3% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">High Confidence</p>
                    <p className="text-2xl font-bold text-white">{highStrengthSignals}</p>
                    <p className="text-xs text-slate-400">{((highStrengthSignals/totalSignals)*100).toFixed(1)}% of total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Success Rate</p>
                    <p className="text-2xl font-bold text-white">73.2%</p>
                    <p className="text-xs text-green-400">Historical average</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Signal Distribution */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Signal Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-400/5 rounded-lg border border-green-400/20">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Buy Signals</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-400">{buySignals}</p>
                  <p className="text-sm text-slate-400">{((buySignals/totalSignals)*100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-400/5 rounded-lg border border-red-400/20">
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  <span className="text-white font-medium">Sell Signals</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-red-400">{sellSignals}</p>
                  <p className="text-sm text-slate-400">{((sellSignals/totalSignals)*100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-l-full"
                  style={{ width: `${(buySignals/totalSignals)*100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          {/* Timeframe Analysis */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeframe Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(timeframeStats)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 6)
                .map(([timeframe, count]) => (
                <div key={timeframe} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400/30">
                      {timeframe}
                    </Badge>
                    <span className="text-white">{timeframe === '1m' ? '1 Minute' : 
                      timeframe === '5m' ? '5 Minutes' :
                      timeframe === '15m' ? '15 Minutes' :
                      timeframe === '1h' ? '1 Hour' :
                      timeframe === '4h' ? '4 Hours' : '1 Day'}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{count}</p>
                    <p className="text-xs text-slate-400">{((count/totalSignals)*100).toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Top Performing Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topPerformers.map(([symbol, stats], index) => (
                <motion.div
                  key={symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-white">{symbol}</h4>
                    <Badge className={`${
                      stats.avgStrength >= 80 ? 'bg-green-400/10 text-green-400' :
                      stats.avgStrength >= 60 ? 'bg-cyan-400/10 text-cyan-400' :
                      'bg-amber-400/10 text-amber-400'
                    }`}>
                      #{index + 1}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Strength</span>
                      <span className="text-white font-semibold">{stats.avgStrength.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Signals</span>
                      <span className="text-white font-semibold">{stats.count}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
