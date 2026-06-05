import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CoinData } from "../../utils/Types";

const COIN_API = process.env.EXPO_PUBLIC_COINGECKO_API;
const COIN_API_BASE = COIN_API?.split('?')[0] || "";

/**
 * A reusable hook to fetch coin data with sparkline.
 */
export const useGetTrendingCoins = () => {
  return useQuery<CoinData[]>({
    queryKey: ["trendingCoins"],
    queryFn: async () => {
      if (!COIN_API_BASE) {
        throw new Error("API URL is missing in environment variables.");
      }

      const response = await axios.get(
        `${COIN_API_BASE}?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`
      );

      return response?.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useGetCoinSimplePrice = (ids: string, vsCurrency: string = "usd") => {
  return useQuery({
    queryKey: ["coinSimplePrice", ids, vsCurrency],
    queryFn: async () => {
      if (!COIN_API_BASE) {
        throw new Error("API URL is missing in environment variables.");
      }

      const response = await axios.get(
        `${COIN_API_BASE.replace('/markets', '')}/simple/price?ids=${ids}&vs_currencies=${vsCurrency}`
      );

      return response?.data;
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};
