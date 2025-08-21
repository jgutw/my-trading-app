// src/lib/utils.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// This is the missing 'cn' function that sidebar.jsx is trying to import
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Utility function to create page URLs
export function createPageUrl(name) {
  return `/${name.toLowerCase()}`;
}

// Other utility functions
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatPercentage(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function getSignalColor(signalType) {
  switch (signalType?.toLowerCase()) {
    case 'buy':
      return 'text-green-400';
    case 'sell':
      return 'text-red-400';
    default:
      return 'text-slate-400';
  }
}