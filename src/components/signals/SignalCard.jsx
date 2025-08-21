// src/components/signals/SignalCard.jsx
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Shield, 
  Clock, 
  Zap,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";

export default function SignalCard({ signal, showRSI, showMACD, showEMA, showBB, showATR }) {
  // Guard clause for invalid signal data
  if (!signal || !signal.indicators) return <div className="text-slate-500">Loading signal...</div>;

  const isLong = signal.signal_type === "BUY";
  const strength = signal.strength || 0;

  const getStrengthColor = (strength) => {
    if (strength >= 80) return "text-green-400 bg-green-400/10";
    if (strength >= 60) return "text-cyan-400 bg-cyan-400/10";
    if (strength >= 40) return "text-amber-400 bg-amber-400/10";
    return "text-red-400 bg-red-400/10";
  };

  const getSignalColor = (type) => {
    return type === "BUY" 
      ? "border-green-400/20 bg-green-400/5" 
      : "border-red-400/20 bg-red-400/5";
  };

  // Filter indicators based on toggle props
  const visibleIndicators = signal.indicators.filter(indicator => 
    (indicator.name === 'RSI' && showRSI) ||
    (indicator.name === 'MACD' && showMACD) ||
    (indicator.name === 'EMA' && showEMA) ||
    (indicator.name === 'Bollinger Bands' && showBB) ||
    (indicator.name === 'ATR' && showATR)
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`bg-slate-900/80 border-slate-800 hover:border-slate-700 transition-all duration-300 ${
        signal.strength >= 80 ? 'signal-glow' : ''
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isLong ? 'bg-green-400/10' : 'bg-red-400/10'
              }`}>
                {isLong ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{signal.symbol}</h3>
                <p className="text-sm text-slate-400">{signal.timeframe} timeframe</p>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={`${getStrengthColor(strength)} border-current font-semibold`}
            >
              {strength}% Strong
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Signal Type */}
          <div className={`p-3 rounded-lg border ${getSignalColor(signal.signal_type)}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Signal</span>
              <span className={`font-bold text-lg ${
                isLong ? 'text-green-400' : 'text-red-400'
              }`}>
                {signal.signal_type}
              </span>
            </div>
          </div>

          {/* Price Levels */}
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-slate-400">Entry</span>
              </div>
              <p className="font-semibold text-white">${signal.entry_price?.toFixed(4)}</p>
            </div>
            {signal.target_price && (
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-3 h-3 text-green-400" />
                  <span className="text-slate-400">Target</span>
                </div>
                <p className="font-semibold text-green-400">${signal.target_price?.toFixed(4)}</p>
              </div>
            )}
            {signal.stop_loss && (
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-3 h-3 text-red-400" />
                  <span className="text-slate-400">Stop</span>
                </div>
                <p className="font-semibold text-red-400">${signal.stop_loss?.toFixed(4)}</p>
              </div>
            )}
          </div>

          {/* Indicators */}
          {visibleIndicators.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Technical Indicators
              </p>
              <div className="flex flex-wrap gap-2">
                {visibleIndicators.map((indicator, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className={`text-xs ${
                      indicator.status.includes('bullish') ? 'text-green-400 border-green-400/30' :
                      indicator.status.includes('bearish') ? 'text-red-400 border-red-400/30' :
                      indicator.status.includes('neutral') || indicator.status.includes('low') ? 'text-yellow-400 border-yellow-400/30' :
                      'text-slate-400 border-slate-600'
                    }`}
                  >
                    {indicator.name}: {indicator.name === 'Bollinger Bands' ? indicator.value : indicator.value.toFixed(2)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Confidence Score */}
          {signal.confidence_score && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-sm text-slate-400 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                AI Confidence
              </span>
              <span className="text-sm font-semibold text-cyan-400">
                {(signal.confidence_score * 100).toFixed(1)}%
              </span>
            </div>
          )}

          {/* Timestamp */}
          <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            Generated {new Date(signal.created_date).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}



