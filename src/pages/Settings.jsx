import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Sliders, 
  Bell, 
  Save,
  BarChart3,
  TrendingUp,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  const [indicators, setIndicators] = useState({
    rsi: { enabled: true, period: 14, overbought: 70, oversold: 30 },
    macd: { enabled: true, fast: 12, slow: 26, signal: 9 },
    ema: { enabled: true, short: 20, long: 50 },
    bollinger: { enabled: false, period: 20, deviation: 2 },
    stochastic: { enabled: false, k: 14, d: 3 }
  });

  const [alerts, setAlerts] = useState({
    highStrength: true,
    priceTargets: true,
    email: false,
    minStrength: 70
  });

  const [risk, setRisk] = useState({
    maxPositions: 5,
    stopLossPercent: 5,
    takeProfitPercent: 10
  });

  const handleIndicatorChange = (indicator, field, value) => {
    setIndicators(prev => ({
      ...prev,
      [indicator]: {
        ...prev[indicator],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would save the settings
    console.log("Saving settings:", { indicators, alerts, risk });
  };

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Indicator Configuration</h1>
            <p className="text-slate-400">Customize technical indicators and signal parameters</p>
          </div>
          
          <Button onClick={handleSave} className="bg-cyan-500 hover:bg-cyan-600 text-slate-900">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Technical Indicators */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Technical Indicators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* RSI Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold">Relative Strength Index (RSI)</h3>
                      <p className="text-sm text-slate-400">Momentum oscillator measuring speed and change</p>
                    </div>
                    <Switch
                      checked={indicators.rsi.enabled}
                      onCheckedChange={(checked) => handleIndicatorChange('rsi', 'enabled', checked)}
                    />
                  </div>
                  
                  {indicators.rsi.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-slate-300">Period</Label>
                        <Input
                          type="number"
                          value={indicators.rsi.period}
                          onChange={(e) => handleIndicatorChange('rsi', 'period', parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Overbought Level</Label>
                        <Input
                          type="number"
                          value={indicators.rsi.overbought}
                          onChange={(e) => handleIndicatorChange('rsi', 'overbought', parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Oversold Level</Label>
                        <Input
                          type="number"
                          value={indicators.rsi.oversold}
                          onChange={(e) => handleIndicatorChange('rsi', 'oversold', parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white mt-1"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* MACD Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold">MACD</h3>
                      <p className="text-sm text-slate-400">Moving Average Convergence Divergence</p>
                    </div>
                    <Switch
                      checked={indicators.macd.enabled}
                      onCheckedChange={(checked) => handleIndicatorChange('macd', 'enabled', checked)}
                    />
                  </div>
                  
                  {indicators.macd.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-slate-300">Fast Period</Label>
                        <Input
                          type="number"
                          value={indicators.macd.fast}
                          onChange={(e) => handleIndicatorChange('macd', 'fast', parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Slow Period</Label>
                        <Input
                          type="number"
                          value={indicators.macd.slow}
                          onChange={(e) => handleIndicatorChange('macd', 'slow', parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Signal Period</Label>
                        <Input
                          type="number"
                          value={indicators.macd.signal}
                          onChange={(e) => handleIndicatorChange('macd', 'signal', parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white mt-1"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* EMA Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold">Exponential Moving Average (EMA)</h3>
                      <p className="text-sm text-slate-400">Trend-following indicator</p>
                    </div>
                    <Switch
                      checked={indicators.ema.enabled}
                      onCheckedChange={(checked) => handleIndicatorChange('ema', 'enabled', checked)}
                    />
                  </div>
                  
                  {indicators.ema.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-300">Short EMA Period</Label>
                        <Input
                          type="number"
                          value={indicators.ema.short}
                          onChange={(e) => handleIndicatorChange('ema', 'short', parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Long EMA Period</Label>
                        <Input
                          type="number"
                          value={indicators.ema.long}
                          onChange={(e) => handleIndicatorChange('ema', 'long', parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white mt-1"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Additional Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 bg-slate-800/50 rounded-lg"
                >
                  <h3 className="text-white font-semibold mb-3">Additional Indicators</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-300">Bollinger Bands</span>
                        <p className="text-xs text-slate-500">Volatility indicator</p>
                      </div>
                      <Switch
                        checked={indicators.bollinger.enabled}
                        onCheckedChange={(checked) => handleIndicatorChange('bollinger', 'enabled', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-300">Stochastic Oscillator</span>
                        <p className="text-xs text-slate-500">Momentum indicator</p>
                      </div>
                      <Switch
                        checked={indicators.stochastic.enabled}
                        onCheckedChange={(checked) => handleIndicatorChange('stochastic', 'enabled', checked)}
                      />
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Alert Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Alert Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">High Strength Signals</span>
                    <Switch
                      checked={alerts.highStrength}
                      onCheckedChange={(checked) => setAlerts(prev => ({...prev, highStrength: checked}))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Price Target Alerts</span>
                    <Switch
                      checked={alerts.priceTargets}
                      onCheckedChange={(checked) => setAlerts(prev => ({...prev, priceTargets: checked}))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Email Notifications</span>
                    <Switch
                      checked={alerts.email}
                      onCheckedChange={(checked) => setAlerts(prev => ({...prev, email: checked}))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Minimum Signal Strength</Label>
                    <Slider
                      value={[alerts.minStrength]}
                      onValueChange={([value]) => setAlerts(prev => ({...prev, minStrength: value}))}
                      min={1}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                    <p className="text-sm text-slate-400 text-center">{alerts.minStrength}%</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Risk Management */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5" />
                    Risk Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Max Concurrent Positions</Label>
                    <Input
                      type="number"
                      value={risk.maxPositions}
                      onChange={(e) => setRisk(prev => ({...prev, maxPositions: parseInt(e.target.value)}))}
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Default Stop Loss %</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={risk.stopLossPercent}
                      onChange={(e) => setRisk(prev => ({...prev, stopLossPercent: parseFloat(e.target.value)}))}
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Default Take Profit %</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={risk.takeProfitPercent}
                      onChange={(e) => setRisk(prev => ({...prev, takeProfitPercent: parseFloat(e.target.value)}))}
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Active Indicators Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Active Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(indicators).map(([key, config]) => 
                      config.enabled && (
                        <Badge key={key} className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30">
                          {key.toUpperCase()}
                        </Badge>
                      )
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mt-3">
                    {Object.values(indicators).filter(i => i.enabled).length} indicators active
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

