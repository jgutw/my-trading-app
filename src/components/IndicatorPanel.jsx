import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3,
  Volume2,
  Zap,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function IndicatorPanel({ indicators, symbol }) {
  const [expandedCategories, setExpandedCategories] = useState({
    momentum: false,
    volume: false,
    trend: false,
    volatility: false
  });

  if (!indicators) return null;

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getSignalColor = (signal) => {
    const colorMap = {
      bullish: "text-green-400 bg-green-400/10 border-green-400/30",
      bearish: "text-red-400 bg-red-400/10 border-red-400/30",
      neutral: "text-slate-400 bg-slate-400/10 border-slate-400/30",
      golden_cross: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
      death_cross: "text-red-400 bg-red-400/10 border-red-400/30",
      overbought: "text-red-400 bg-red-400/10 border-red-400/30",
      oversold: "text-green-400 bg-green-400/10 border-green-400/30",
      strong_trend: "text-purple-400 bg-purple-400/10 border-purple-400/30",
      weak_trend: "text-slate-400 bg-slate-400/10 border-slate-400/30",
      high_volume: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
      low_volume: "text-slate-400 bg-slate-400/10 border-slate-400/30",
      trending: "text-green-400 bg-green-400/10 border-green-400/30",
      choppy: "text-amber-400 bg-amber-400/10 border-amber-400/30"
    };
    return colorMap[signal] || "text-slate-400 bg-slate-400/10 border-slate-400/30";
  };

  const momentumIndicators = [
    { key: 'rsi', name: 'RSI', value: indicators.rsi?.value, signal: indicators.rsi?.signal },
    { key: 'momentum', name: 'Momentum', value: indicators.momentum?.value, signal: indicators.momentum?.signal },
    { key: 'chande_momentum', name: 'Chande Momentum', value: indicators.chande_momentum?.value, signal: indicators.chande_momentum?.signal },
    { key: 'awesome_oscillator', name: 'Awesome Oscillator', value: indicators.awesome_oscillator?.value, signal: indicators.awesome_oscillator?.signal },
    { key: 'know_sure_thing', name: 'Know Sure Thing', value: indicators.know_sure_thing?.value, signal: indicators.know_sure_thing?.signal }
  ];

  const volumeIndicators = [
    { key: 'volume', name: 'Volume', value: indicators.volume?.current, signal: indicators.volume?.signal },
    { key: 'chaikin_money_flow', name: 'Chaikin Money Flow', value: indicators.chaikin_money_flow?.value, signal: indicators.chaikin_money_flow?.signal },
    { key: 'chaikin_oscillator', name: 'Chaikin Oscillator', value: indicators.chaikin_oscillator?.value, signal: indicators.chaikin_oscillator?.signal },
    { key: 'accumulation_distribution', name: 'A/D Line', value: indicators.accumulation_distribution?.value, signal: indicators.accumulation_distribution?.signal },
    { key: 'money_flow_index', name: 'Money Flow Index', value: indicators.money_flow_index?.value, signal: indicators.money_flow_index?.signal },
    { key: 'elders_force_index', name: "Elder's Force", value: indicators.elders_force_index?.value, signal: indicators.elders_force_index?.signal }
  ];

  const trendIndicators = [
    { key: 'ema_cross', name: 'EMA Cross', value: `${indicators.ema_cross?.fast_ema?.toFixed(2)} / ${indicators.ema_cross?.slow_ema?.toFixed(2)}`, signal: indicators.ema_cross?.signal },
    { key: 'adx', name: 'ADX', value: indicators.adx?.value, signal: indicators.adx?.signal },
    { key: 'aroon', name: 'Aroon', value: `↑${indicators.aroon?.aroon_up?.toFixed(1)} ↓${indicators.aroon?.aroon_down?.toFixed(1)}`, signal: indicators.aroon?.signal },
    { key: 'moving_average_triple', name: 'Triple MA', value: indicators.moving_average_triple?.signal, signal: indicators.moving_average_triple?.signal },
    { key: 'vwap', name: 'VWAP', value: indicators.vwap?.value, signal: indicators.vwap?.signal }
  ];

  const volatilityIndicators = [
    { key: 'chaikin_volatility', name: 'Chaikin Volatility', value: indicators.chaikin_volatility?.value, signal: indicators.chaikin_volatility?.signal },
    { key: 'choppiness_index', name: 'Choppiness Index', value: indicators.choppiness_index?.value, signal: indicators.choppiness_index?.signal },
    { key: 'accelerator_oscillator', name: 'Accelerator Oscillator', value: indicators.accelerator_oscillator?.value, signal: indicators.accelerator_oscillator?.signal },
    { key: 'accumulative_swing_index', name: 'Swing Index', value: indicators.accumulative_swing_index?.value, signal: indicators.accumulative_swing_index?.signal }
  ];

  const IndicatorCategory = ({ title, indicators: categoryIndicators, category, icon: Icon }) => (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleCategory(category)}
        >
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
          </CardTitle>
          {expandedCategories[category] ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </CardHeader>
      <AnimatePresence>
        {expandedCategories[category] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryIndicators.map((indicator) => (
                  <div key={indicator.key} className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300 font-medium">{indicator.name}</span>
                      {indicator.signal && (
                        <Badge className={`text-xs ${getSignalColor(indicator.signal)} border`}>
                          {indicator.signal.replace(/_/g, ' ')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-white font-semibold">
                      {typeof indicator.value === 'number' 
                        ? indicator.value.toFixed(2)
                        : indicator.value || 'N/A'
                      }
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Technical Analysis - {symbol}</h3>
        <Badge className={`${getSignalColor(indicators.overall_signal)} border text-sm px-3 py-1`}>
          {indicators.overall_signal?.replace(/_/g, ' ').toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IndicatorCategory 
          title="Momentum Indicators"
          indicators={momentumIndicators}
          category="momentum"
          icon={TrendingUp}
        />
        <IndicatorCategory 
          title="Volume Indicators"
          indicators={volumeIndicators}
          category="volume"
          icon={Volume2}
        />
        <IndicatorCategory 
          title="Trend Indicators"
          indicators={trendIndicators}
          category="trend"
          icon={BarChart3}
        />
        <IndicatorCategory 
          title="Volatility Indicators"
          indicators={volatilityIndicators}
          category="volatility"
          icon={Activity}
        />
      </div>

      {indicators.confidence_score && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                AI Confidence Score
              </span>
              <span className="text-cyan-400 font-bold text-lg">
                {(indicators.confidence_score * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}