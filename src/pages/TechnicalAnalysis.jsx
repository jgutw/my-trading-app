import React, { useState, useEffect } from "react";
import { TechnicalIndicator } from "@/entities/TechnicalIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  BarChart3,
  TrendingUp,
  RefreshCcw,
  Zap,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";

import IndicatorPanel from "../components/dashboard/IndicatorPanel";  // Note: Moved to dashboard folder, but used here

export default function TechnicalAnalysis() {
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");
  const [selectedTimeframe, setSelectedTimeframe] = useState("4h");
  const [searchTerm, setSearchTerm] = useState("");

  // Hyperliquid-inspired perpetual pairs
  const availablePairs = [
    "BTCUSDT", "ETHUSDT", "SOLUSDT", "ADAUSDT", "DOTUSDT", "AVAXUSDT",
    "MATICUSDT", "LINKUSDT", "ATOMUSDT", "NEARUSDT", "FTMUSDT", "MANAUSDT",
    "SANDUSDT", "AXSUSDT", "CHZUSDT", "ENJUSDT", "GALAUSDT", "FLOWUSDT",
    "ICPUSDT", "VETUSDT", "XLMUSDT", "ALGOUSDT", "EGLDUSDT", "THETAUSDT",
    "XTZUSDT", "EOSUSDT", "AAVEUSDT", "MKRUSDT", "COMPUSDT", "SUSHIUSDT",
    "YFIUSDT", "SNXUSDT", "CRVUSDT", "UNIUSDT", "1INCHUSDT", "DYDXUSDT",
    "GMXUSDT", "PERPUSDT", "INJUSDT", "STXUSDT", "APTUSDT", "SUIUSDT",
    "OPUSDT", "ARBUSDT", "LDOUSDT", "FETUSDT", "RENDERUSDT", "TIAUSDT",
    "WLDUSDT", "PEPEUSDT", "SEIUSDT", "BLURUSDT", "TRBUSDT", "ARKMUSDT"
  ];

  const filteredPairs = availablePairs.filter(pair =>
    pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadIndicators();
  }, [selectedSymbol, selectedTimeframe]);

  const loadIndicators = async () => {
    setLoading(true);
    try {
      const data = await TechnicalIndicator.filter({
        symbol: selectedSymbol,
        timeframe: selectedTimeframe
      }, "-created_date", 1);
      setIndicators(data);
    } catch (error) {
      console.error("Error loading indicators:", error);
    }
    setLoading(false);
  };

  const currentIndicators = indicators[0];

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Technical Analysis</h1>
            <p className="text-slate-400">Comprehensive FX indicators for perpetual futures</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={loadIndicators}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-900"
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <label className="text-sm text-slate-400 mb-2 block">Search Pairs</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <Input
                  placeholder="Search pairs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white"
                />
              </div>
              {searchTerm && (
                <div className="mt-2 max-h-40 overflow-y-auto space-y-1">
                  {filteredPairs.slice(0, 8).map(pair => (
                    <button
                      key={pair}
                      onClick={() => {
                        setSelectedSymbol(pair);
                        setSearchTerm("");
                      }}
                      className="block w-full text-left px-2 py-1 text-sm text-slate-300 hover:bg-slate-700 rounded"
                    >
                      {pair}
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <label className="text-sm text-slate-400 mb-2 block">Selected Pair</label>
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availablePairs.slice(0, 20).map(pair => (
                    <SelectItem key={pair} value={pair}>{pair}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <label className="text-sm text-slate-400 mb-2 block">Timeframe</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Minute</SelectItem>
                  <SelectItem value="5m">5 Minutes</SelectItem>
                  <SelectItem value="15m">15 Minutes</SelectItem>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="4h">4 Hours</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <label className="text-sm text-slate-400 mb-2 block">Analysis Status</label>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Live Analysis</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Real-time indicators</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <Card key={i} className="bg-slate-900/50 border-slate-800 animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-slate-700 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-700 rounded"></div>
                      <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : currentIndicators ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IndicatorPanel 
              indicators={currentIndicators} 
              symbol={selectedSymbol}
            />
          </motion.div>
        ) : (
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-12 text-center">
              <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">No Analysis Data</h3>
              <p className="text-slate-500">No technical indicators found for {selectedSymbol} on {selectedTimeframe} timeframe.</p>
              <Button 
                onClick={loadIndicators} 
                className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-slate-900"
              >
                Refresh Analysis
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

