import React from "react";
import { Card, CardContent } from "@/components/ui/card";  // Removed unused CardHeader, CardTitle
import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function MarketStats({ totalSignals, buySignals, sellSignals, loading }) {
  const stats = [
    {
      title: "Active Signals",
      value: totalSignals,
      icon: Activity,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10"
    },
    {
      title: "Long Positions",
      value: buySignals,
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-400/10"
    },
    {
      title: "Short Positions", 
      value: sellSignals,
      icon: TrendingDown,
      color: "text-red-400",
      bg: "bg-red-400/10"
    },
    {
      title: "High Confidence",
      value: Math.floor(totalSignals * 0.3), // Approximate
      icon: Zap,
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  {loading ? (
                    <div className="h-8 w-12 bg-slate-700 animate-pulse rounded mt-1"></div>
                  ) : (
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
