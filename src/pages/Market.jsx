import React, { useState, useEffect } from "react";
import { MarketData } from "@/entities/MarketData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  RefreshCcw,
  Globe,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";

export default function Market() {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fearGreedIndex, setFearGreedIndex] = useState(42);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/ping');
      console.log('Axios test:', response.data);
      const marketResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc');
      const data = marketResponse.data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase() + 'USDT',
        current_price: coin.current_price,
        price_change_24h: coin.price_change_percentage_24h,
        volume_24h: coin.total_volume,
        market_cap: coin.market_cap,
        funding_rate: 0,
        open_interest: 0,
      }));
      setMarketData(data);
    } catch (error) {
      console.error('Axios error:', error);
      setMarketData(mockMarketData);
    }
    setLastUpdate(new Date());
    setLoading(false);
  };

  const getFearGreedStatus = (index) => {
    if (index <= 25) return { label: "Extreme Fear", color: "text-red-400 bg-red-400/10" };
    if (index <= 45) return { label: "Fear", color: "text-orange-400 bg-orange-400/10" };
    if (index <= 55) return { label: "Neutral", color: "text-slate-400 bg-slate-400/10" };
    if (index <= 75) return { label: "Greed", color: "text-green-400 bg-green-400/10" };
    return { label: "Extreme Greed", color: "text-emerald-400 bg-emerald-400/10" };
  };

  const marketStatus = getFearGreedStatus(fearGreedIndex);
  const totalMarketCap = marketData.reduce((sum, item) => sum + (item.market_cap || 0), 0);
  const totalVolume = marketData.reduce((sum, item) => sum + (item.volume_24h || 0), 0);

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Market Overview</h1>
            <p className="text-slate-400">Real-time crypto perpetual futures market data</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400">
              Last update: {lastUpdate.toLocaleTimeString()}
            </div>
            <Button 
              onClick={loadMarketData}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-900"
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Market Cap</p>
                  <p className="text-xl font-bold text-white">
                    ${(totalMarketCap / 1e12).toFixed(2)}T
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">24h Volume</p>
                  <p className="text-xl font-bold text-white">
                    ${(totalVolume / 1e9).toFixed(2)}B
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Fear & Greed</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-white">{fearGreedIndex}</p>
                    <Badge className={`${marketStatus.color} border-current text-xs`}>
                      {marketStatus.label}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Active Markets</p>
                  <p className="text-xl font-bold text-white">{marketData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Data Table */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Top Perpetual Futures</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left p-4 text-slate-400 font-medium">Asset</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Price</th>
                    <th className="text-right p-4 text-slate-400 font-medium">24h Change</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Volume</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Funding Rate</th>
                    <th className="text-right p-4 text-slate-400 font-medium">Open Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array(10).fill(0).map((_, i) => (
                      <tr key={i} className="border-b border-slate-800/50 animate-pulse">
                        <td className="p-4"><div className="h-4 bg-slate-700 rounded w-20"></div></td>
                        <td className="p-4"><div className="h-4 bg-slate-700 rounded w-16 ml-auto"></div></td>
                        <td className="p-4"><div className="h-4 bg-slate-700 rounded w-12 ml-auto"></div></td>
                        <td className="p-4"><div className="h-4 bg-slate-700 rounded w-20 ml-auto"></div></td>
                        <td className="p-4"><div className="h-4 bg-slate-700 rounded w-12 ml-auto"></div></td>
                        <td className="p-4"><div className="h-4 bg-slate-700 rounded w-16 ml-auto"></div></td>
                      </tr>
                    ))
                  ) : (
                    marketData.map((market, index) => (
                      <motion.tr
                        key={market.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-white">
                                {market.symbol?.substring(0, 2)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-white">{market.symbol}</p>
                              <p className="text-xs text-slate-400">Perpetual</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <p className="font-semibold text-white">
                            ${market.current_price?.toFixed(4)}
                          </p>
                        </td>
                        <td className="p-4 text-right">
                          <div className={`flex items-center justify-end gap-1 ${
                            market.price_change_24h > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {market.price_change_24h > 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span className="font-medium">
                              {Math.abs(market.price_change_24h || 0).toFixed(2)}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-white font-medium">
                            ${(market.volume_24h / 1e6).toFixed(1)}M
                          </p>
                        </td>
                        <td className="p-4 text-right">
                          <div className={`font-medium ${
                            market.funding_rate > 0 ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {(market.funding_rate * 100).toFixed(4)}%
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-white font-medium">
                            ${(market.open_interest / 1e6).toFixed(1)}M
                          </p>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}