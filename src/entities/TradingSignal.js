// src/entities/TradingSignal.js
export class TradingSignal {
  constructor(data = {}) {
    this.symbol = data.symbol;
    this.signal_type = data.signal_type;
    this.strength = data.strength;
    this.entry_price = data.entry_price;
    this.target_price = data.target_price;
    this.stop_loss = data.stop_loss;
    this.timeframe = data.timeframe;
    this.indicators = data.indicators || [];
    this.market_cap = data.market_cap;
    this.volume_24h = data.volume_24h;
    this.price_change_24h = data.price_change_24h;
    this.status = data.status || 'active';
    this.confidence_score = data.confidence_score;
    this.created_date = data.created_date || new Date();
    this.updated_date = data.updated_date || new Date();
    this.id = data.id || Date.now();
  }

  static async list(sortBy = "-created_date", limit = 50) {
    // Mock data that matches your schema
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockSignals = [
          {
            id: 1,
            symbol: 'BTCUSDT',
            signal_type: 'BUY',
            strength: 85,
            entry_price: 43250.50,
            target_price: 45800.00,
            stop_loss: 41900.00,
            timeframe: '4h',
            indicators: [
              { name: 'RSI', value: 35.5, status: 'bullish' },
              { name: 'MACD', value: 0.025, status: 'bullish' },
              { name: 'EMA', value: 43100.0, status: 'bullish' }
            ],
            market_cap: 850000000000,
            volume_24h: 28500000000,
            price_change_24h: 2.45,
            status: 'active',
            confidence_score: 0.85,
            created_date: new Date(Date.now() - 300000)
          },
          {
            id: 2,
            symbol: 'ETHUSDT',
            signal_type: 'SELL',
            strength: 72,
            entry_price: 2685.30,
            target_price: 2580.00,
            stop_loss: 2750.00,
            timeframe: '1h',
            indicators: [
              { name: 'RSI', value: 78.2, status: 'bearish' },
              { name: 'MACD', value: -0.015, status: 'bearish' },
              { name: 'EMA', value: 2700.0, status: 'bearish' }
            ],
            market_cap: 320000000000,
            volume_24h: 15200000000,
            price_change_24h: -1.25,
            status: 'active',
            confidence_score: 0.72,
            created_date: new Date(Date.now() - 600000)
          },
          {
            id: 3,
            symbol: 'SOLUSDT',
            signal_type: 'BUY',
            strength: 91,
            entry_price: 98.45,
            target_price: 108.50,
            stop_loss: 92.00,
            timeframe: '1d',
            indicators: [
              { name: 'RSI', value: 42.1, status: 'bullish' },
              { name: 'MACD', value: 0.045, status: 'bullish' },
              { name: 'EMA', value: 95.5, status: 'bullish' }
            ],
            market_cap: 45000000000,
            volume_24h: 2800000000,
            price_change_24h: 5.67,
            status: 'active',
            confidence_score: 0.91,
            created_date: new Date(Date.now() - 900000)
          },
          {
            id: 4,
            symbol: 'ADAUSDT',
            signal_type: 'BUY',
            strength: 68,
            entry_price: 0.485,
            target_price: 0.525,
            stop_loss: 0.460,
            timeframe: '15m',
            indicators: [
              { name: 'RSI', value: 38.7, status: 'bullish' },
              { name: 'MACD', value: 0.008, status: 'neutral' },
              { name: 'EMA', value: 0.480, status: 'bullish' }
            ],
            market_cap: 17000000000,
            volume_24h: 850000000,
            price_change_24h: 3.21,
            status: 'active',
            confidence_score: 0.68,
            created_date: new Date(Date.now() - 1200000)
          },
          {
            id: 5,
            symbol: 'MATICUSDT',
            signal_type: 'SELL',
            strength: 76,
            entry_price: 1.125,
            target_price: 1.045,
            stop_loss: 1.180,
            timeframe: '1h',
            indicators: [
              { name: 'RSI', value: 72.3, status: 'bearish' },
              { name: 'MACD', value: -0.012, status: 'bearish' },
              { name: 'EMA', value: 1.135, status: 'bearish' }
            ],
            market_cap: 11000000000,
            volume_24h: 650000000,
            price_change_24h: -2.14,
            status: 'active',
            confidence_score: 0.76,
            created_date: new Date(Date.now() - 1800000)
          },
          {
            id: 6,
            symbol: 'DOTUSDT',
            signal_type: 'BUY',
            strength: 79,
            entry_price: 7.25,
            target_price: 7.85,
            stop_loss: 6.90,
            timeframe: '4h',
            indicators: [
              { name: 'RSI', value: 41.5, status: 'bullish' },
              { name: 'MACD', value: 0.018, status: 'bullish' },
              { name: 'EMA', value: 7.15, status: 'bullish' }
            ],
            market_cap: 9500000000,
            volume_24h: 420000000,
            price_change_24h: 4.32,
            status: 'active',
            confidence_score: 0.79,
            created_date: new Date(Date.now() - 2400000)
          }
        ];
        
        // Apply sorting
        const sorted = mockSignals.sort((a, b) => {
          if (sortBy === "-created_date") {
            return new Date(b.created_date) - new Date(a.created_date);
          }
          return 0;
        });
        
        resolve(sorted.slice(0, limit));
      }, 800); // Simulate API delay
    });
  }

  static async getById(id) {
    const signals = await this.list();
    return signals.find(signal => signal.id === parseInt(id));
  }

  static async create(signalData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSignal = new TradingSignal({
          ...signalData,
          id: Date.now(),
          created_date: new Date(),
          updated_date: new Date()
        });
        resolve(newSignal);
      }, 500);
    });
  }

  async update(updateData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        Object.assign(this, updateData, {
          updated_date: new Date()
        });
        resolve(this);
      }, 300);
    });
  }

  async delete() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.status = 'cancelled';
        resolve(true);
      }, 300);
    });
  }

  // Validation method using your schema rules
  validate() {
    const errors = [];
    
    if (!this.symbol) errors.push('Symbol is required');
    if (!['BUY', 'SELL', 'HOLD'].includes(this.signal_type)) {
      errors.push('Signal type must be BUY, SELL, or HOLD');
    }
    if (!this.strength || this.strength < 1 || this.strength > 100) {
      errors.push('Strength must be between 1 and 100');
    }
    if (!this.entry_price || this.entry_price <= 0) {
      errors.push('Entry price must be greater than 0');
    }
    if (!['1m', '5m', '15m', '1h', '4h', '1d'].includes(this.timeframe)) {
      errors.push('Invalid timeframe');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Utility methods
  getFormattedPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  }

  getFormattedPercentage(value) {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  }

  isExpired() {
    // Consider signal expired after 24 hours
    const expiryTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    return Date.now() - new Date(this.created_date).getTime() > expiryTime;
  }

  getSignalColor() {
    switch (this.signal_type) {
      case 'BUY':
        return 'green';
      case 'SELL':
        return 'red';
      case 'HOLD':
        return 'yellow';
      default:
        return 'gray';
    }
  }
}
