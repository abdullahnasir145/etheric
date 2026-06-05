import z from "zod";

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

// Auth Form zod schema //
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
