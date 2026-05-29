export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface CoinItem {
  image: string;
  name: string;
  symbol: string;
  price: string | number;
  change: string | number;
  isPositive: boolean;
  priceChange?: number;
}

export interface HomeScreenCardProps {
  data: CoinItem;
  id?: string;
}
