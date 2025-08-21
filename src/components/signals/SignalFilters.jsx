import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter, TrendingUp, Zap, Clock } from "lucide-react";

export default function SignalFilters({ filters, onFiltersChange }) {
  return (
    <Card className="bg-slate-900/50 border-slate-800 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filter Signals</span>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-500" />
              <Select 
                value={filters.signal_type} 
                onValueChange={(value) => onFiltersChange({...filters, signal_type: value})}
              >
                <SelectTrigger className="w-32 bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="BUY">Buy Only</SelectItem>
                  <SelectItem value="SELL">Sell Only</SelectItem>
                  <SelectItem value="HOLD">Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-slate-500" />
              <Select 
                value={filters.strength} 
                onValueChange={(value) => onFiltersChange({...filters, strength: value})}
              >
                <SelectTrigger className="w-32 bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Strength" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Strength</SelectItem>
                  <SelectItem value="high">High (80%+)</SelectItem>
                  <SelectItem value="medium">Medium (50-79%)</SelectItem>
                  <SelectItem value="low">Low (&lt;50%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <Select 
                value={filters.timeframe} 
                onValueChange={(value) => onFiltersChange({...filters, timeframe: value})}
              >
                <SelectTrigger className="w-32 bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Timeframes</SelectItem>
                  <SelectItem value="1m">1 Minute</SelectItem>
                  <SelectItem value="5m">5 Minutes</SelectItem>
                  <SelectItem value="15m">15 Minutes</SelectItem>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="4h">4 Hours</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

