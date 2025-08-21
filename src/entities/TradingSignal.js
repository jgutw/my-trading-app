// src/entities/TradingSignal.js
import axios from 'axios';
import { RSI, MACD, EMA, BollingerBands, ATR } from 'technicalindicators';

// Add cache at the top level
const cache = new Map();

export class TradingSignal {
  constructor(data = {}) {
    this.id = data.id || Date.now();
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
  }

  static async list(sortBy = "-created_date", limit = 50) {
    const cacheKey = `${sortBy}-${limit}`;
    if (cache.has(cacheKey) && (Date.now() - cache.get(cacheKey).timestamp < 30000)) {
      console.log('Cache hit for', cacheKey);
      return cache.get(cacheKey).data;
    }
    console.log('Fetching new data for', cacheKey);
    let attempt = 0;
    const maxAttempts = 5;
    let liveSignals = [];
    while (attempt < maxAttempts) {
      try {
        const response = await axios.get('/api/coingecko/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,solana,cardano,tron,polkadot',
            order: 'market_cap_desc',
            per_page: limit,
            page: 1,
            sparkline: false,
          },
        });
        // Sequential requests to avoid burst
        const ohclPromises = response.data.map(async (coin) => {
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay per request
          console.log('Processing', coin.id);
          const history = await axios.get(`/api/coingecko/api/v3/coins/${coin.id}/ohlc`, {
            params: { vs_currency: 'usd', days: 1 },
          });
          const ohlc = history.data;
          console.log('OHLC length for', coin.id, ohlc.length);
          if (!ohlc || ohlc.length < 14) throw new Error(`Insufficient OHLC data for ${coin.id} (length: ${ohlc.length})`);
          const opens = ohlc.map(o => o[1]);
          const highs = ohlc.map(o => o[2]);
          const lows = ohlc.map(o => o[3]);
          const closes = ohlc.map(o => o[4]);
          const lastClose = closes[closes.length - 1] || coin.current_price;
          const signalType = coin.price_change_percentage_24h > 0 ? 'BUY' : 'SELL';
          const bb = BollingerBands.calculate({ period: 20, values: closes, stdDev: 2 });
          const atr = ATR.calculate({ high: highs, low: lows, close: closes, period: 14 });
          const bbLast = bb[closes.length - 1] || { upper: 0, middle: 0, lower: 0 };
          const atrLast = atr[closes.length - 1] || 0;
          return new TradingSignal({
            id: coin.id,
            symbol: coin.symbol.toUpperCase() + 'USDT',
            signal_type: signalType,
            strength: Math.min(Math.abs(coin.price_change_percentage_24h) + 50, 100),
            entry_price: coin.current_price,
            target_price: coin.current_price * (1 + (signalType === 'BUY' ? 0.05 : -0.05)),
            stop_loss: coin.current_price * (1 - (signalType === 'BUY' ? 0.03 : 0.03)),
            timeframe: '1h',
            indicators: [
              { name: 'RSI', value: RSI.calculate({ values: closes, period: 14 })[closes.length - 1] || 0, status: closes[closes.length - 1] > closes[0] ? 'bullish' : 'bearish' },
              { name: 'MACD', value: MACD.calculate({ values: closes, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 })[closes.length - 1]?.MACD || 0, status: macd[closes.length - 1]?.MACD > 0 ? 'bullish' : 'bearish' },
              { name: 'EMA', value: EMA.calculate({ values: closes, period: 9 })[closes.length - 1] || 0, status: closes[closes.length - 1] > ema[closes.length - 1] ? 'bullish' : 'bearish' },
              { name: 'Bollinger Bands', value: `${bbLast.upper.toFixed(2)} / ${bbLast.middle.toFixed(2)} / ${bbLast.lower.toFixed(2)}`, status: lastClose > bbLast.upper ? 'bullish breakout' : lastClose < bbLast.lower ? 'bearish breakout' : 'neutral' },
              { name: 'ATR', value: atrLast.toFixed(2), status: atrLast > 0.5 * lastClose ? 'high volatility' : 'low volatility' },
            ],
            market_cap: coin.market_cap,
            volume_24h: coin.total_volume,
            price_change_24h: coin.price_change_percentage_24h,
            confidence_score: Math.min(Math.abs(coin.price_change_percentage_24h) / 10, 1),
            created_date: new Date(),
          });
        });
        liveSignals = await Promise.all(ohclPromises); // Wait for sequential requests
        cache.set(cacheKey, { data: liveSignals, timestamp: Date.now() });
        console.log('Fetched', liveSignals.length, 'signals');
        return liveSignals.sort((a, b) =>
          sortBy === "-created_date" ? new Date(b.created_date) - new Date(a.created_date) : 0
        ).slice(0, limit);
      } catch (error) {
        console.error('Error fetching live signals from CoinGecko (attempt', attempt + 1, '):', error.message);
        if (error.response?.status === 429 && attempt < maxAttempts - 1) {
          continue;
        }
        throw error;
      }
      attempt++;
    }
    return liveSignals;
  } catch (error) {
    console.error('Error fetching live signals from CoinGecko:', error.message);
    return cache.get(cacheKey)?.data || [];
  }
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
        updated_date: new Date(),
      });
      resolve(newSignal);
    }, 500);
  });
}

async update(updateData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      Object.assign(this, updateData, { updated_date: new Date() });
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

validate() {
  const errors = [];
  if (!this.symbol) errors.push('Symbol is required');
  if (!['BUY', 'SELL', 'HOLD'].includes(this.signal_type)) errors.push('Signal type must be BUY, SELL, or HOLD');
  if (!this.strength || this.strength < 1 || this.strength > 100) errors.push('Strength must be between 1 and 100');
  if (!this.entry_price || this.entry_price <= 0) errors.push('Entry price must be greater than 0');
  if (!['1m', '5m', '15m', '1h', '4h', '1d'].includes(this.timeframe)) errors.push('Invalid timeframe');
  return { isValid: errors.length === 0, errors };
}

getFormattedPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 6 }).format(price);
}

getFormattedPercentage(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

isExpired() {
  const expiryTime = 24 * 60 * 60 * 1000;
  return Date.now() - new Date(this.created_date).getTime() > expiryTime;
}

getSignalColor() {
  switch (this.signal_type) {
    case 'BUY': return 'green';
    case 'SELL': return 'red';
    case 'HOLD': return 'yellow';
    default: return 'gray';
  }
}
