import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CoinData } from "../../utils/Types";

const COIN_API = process.env.EXPO_PUBLIC_COINGECKO_API;

/**
 * A reusable hook to fetch coin data.
 * @param queryKey - Unique key for caching (e.g., 'trendingCoins')
 */
export const useGetTrendingCoins = () => {
  return useQuery<CoinData[]>({
    queryKey: ["trendingCoins"],
    queryFn: async () => {
      if (!COIN_API) {
        throw new Error("API URL is missing in environment variables.");
      }

      const response = await axios.get(COIN_API);

      return response?.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    // gcTime: 1000 * 60 * 5,
    retry: 1,
  });
};
