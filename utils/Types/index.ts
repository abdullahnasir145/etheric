export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: { price: number[] };
  sparkline?: { price?: number[] };
  total_volume?: number;
  market_cap?: number;
  market_cap_rank?: number;
}

export interface CoinItem {
  image: string;
  name: string;
  symbol: string;
  price: string | number;
  change: string | number;
  isPositive: boolean;
  sparklinePrices?: number[];
}

export interface HomeScreenCardProps {
  data: CoinItem;
  id?: string;
}
