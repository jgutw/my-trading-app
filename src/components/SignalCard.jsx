// src/components/signals/SignalCard.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SignalCard = ({ signal, showRSI, showMACD, showEMA }) => {
  // Guard clause to handle invalid signal data
  if (!signal || !signal.indicators) return <div className="text-slate-500">Loading signal...</div>;

  return (
    <Card className={`bg-slate-900/50 border-${signal.getSignalColor()}-800`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-white font-semibold">{signal.symbol}</span>
          <Badge
            variant={signal.signal_type === 'BUY' ? 'success' : 'destructive'}
            className="text-xs"
          >
            {signal.signal_type}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-slate-300">
        <p><span className="font-medium">Entry:</span> {signal.getFormattedPrice(signal.entry_price)}</p>
        <p><span className="font-medium">Target:</span> {signal.getFormattedPrice(signal.target_price)}</p>
        <p><span className="font-medium">Stop:</span> {signal.getFormattedPrice(signal.stop_loss)}</p>
        {signal.indicators
          .filter(indicator => 
            (indicator.name === 'RSI' && showRSI) ||
            (indicator.name === 'MACD' && showMACD) ||
            (indicator.name === 'EMA' && showEMA)
          )
          .map((indicator, index) => (
            <p key={index}>
              <span className="font-medium">{indicator.name}:</span> {indicator.value.toFixed(2)} 
              <span className={`ml-1 ${indicator.status === 'bullish' ? 'text-green-400' : 'text-red-400'}`}>
                ({indicator.status})
              </span>
            </p>
          ))}
        <p><span className="font-medium">Strength:</span> {signal.strength}%</p>
        <p><span className="font-medium">Confidence:</span> {(signal.confidence_score * 100).toFixed(1)}%</p>
      </CardContent>
    </Card>
  );
};

export default SignalCard;


