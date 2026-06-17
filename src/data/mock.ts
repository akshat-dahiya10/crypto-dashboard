export const btcSeries = [
  { d: 'Mon', btc: 320, eth: 210 },
  { d: 'Tue', btc: 410, eth: 180 },
  { d: 'Wed', btc: 560, eth: 260 },
  { d: 'Thu', btc: 380, eth: 350 },
  { d: 'Fri', btc: 240, eth: 420 },
  { d: 'Sat', btc: 470, eth: 360 },
  { d: 'Sun', btc: 520, eth: 480 },
];

export const timeframes = ['1H', '1D', '1W', '1M', '1Y'] as const;
export type Timeframe = typeof timeframes[number];

export const deposits = [
  {
    coin: 'Bitcoin',
    symbol: 'BTC',
    amount: '+ $244.00',
    time: 'Today 13:15 PM',
    type: 'Received',
    color: 'from-yellow-400 to-amber-600',
    icon: '₿',
  },
  {
    coin: 'Ethereum',
    symbol: 'ETH',
    amount: '+ 0.4213 ETH',
    time: 'Today',
    type: 'Received',
    color: 'from-indigo-400 to-blue-600',
    icon: 'Ξ',
  },
  {
    coin: 'Polygon',
    symbol: 'MATIC',
    amount: '+ $1,245',
    time: 'Yesterday',
    type: 'Buy',
    color: 'from-violet-400 to-purple-600',
    icon: '◆',
  },
  {
    coin: 'XRP Ledger',
    symbol: 'XRP',
    amount: '+ 0.5686 XRP',
    time: 'Yesterday',
    type: 'Received',
    color: 'from-slate-300 to-slate-500',
    icon: '✕',
  },
  {
    coin: 'Solana',
    symbol: 'SOL',
    amount: '+ $244.00',
    time: 'Yesterday',
    type: 'Received',
    color: 'from-fuchsia-400 to-pink-500',
    icon: '◎',
  },
];

export const topCoins = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 39486.21, change: 0.96, cap: 71812.05, weight: 39.01 },
  { rank: 2, name: 'Polygon', symbol: 'MATIC', price: 437569.19, change: -0.91, cap: 12553.9, weight: 74.36 },
  { rank: 3, name: 'XRP Ledger', symbol: 'XRP', price: 718254.03, change: 0.72, cap: 60193.15, weight: 49.36 },
  { rank: 4, name: 'Avalanche', symbol: 'AVAX', price: 301236.98, change: -0.42, cap: 3368.82, weight: 39.01 },
  { rank: 5, name: 'Solana', symbol: 'SOL', price: 172.44, change: 2.31, cap: 7821.1, weight: 22.18 },
  { rank: 6, name: 'Cardano', symbol: 'ADA', price: 0.58, change: -1.12, cap: 20531.4, weight: 18.44 },
];

export const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'invoices', label: 'Invoices', icon: 'invoice', badge: 3 },
  { key: 'products', label: 'Products', icon: 'products' },
  { key: 'messages', label: 'Messages', icon: 'messages' },
  { key: 'settings', label: 'Settings', icon: 'settings' },
  { key: 'help', label: 'Help', icon: 'help' },
];
