import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const COIN_API = process.env.EXPO_PUBLIC_COINGECKO_API;

export const useGetCoinSimplePrice = (ids: string, vsCurrency: string = "usd") => {
  return useQuery({
    queryKey: ["coinSimplePrice", ids, vsCurrency],
    queryFn: async () => {
      if (!COIN_API) {
        throw new Error("API URL is missing in environment variables.");
      }

      const response = await axios.get(
        `${COIN_API}/simple/price?ids=${ids}&vs_currencies=${vsCurrency}`
      );

      return response?.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1,
  });
};