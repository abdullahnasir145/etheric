import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CoinData } from "../../utils/Types";

const COIN_API = process.env.EXPO_PUBLIC_COINGECKO_API;
const COIN_API_BASE = COIN_API?.split("?")[0] || "";
const COINGECKO_BASE_URL = COIN_API_BASE.replace("/markets", "");

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
        `${COIN_API_BASE}?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`,
      );

      return response?.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useGetCoinSimplePrice = (
  ids: string,
  vsCurrency: string = "usd",
) => {
  return useQuery({
    queryKey: ["coinSimplePrice", ids, vsCurrency],
    queryFn: async () => {
      if (!COIN_API_BASE) {
        throw new Error("API URL is missing in environment variables.");
      }

      const response = await axios.get(
        `${COIN_API_BASE.replace("/markets", "")}/simple/price?ids=${ids}&vs_currencies=${vsCurrency}`,
      );

      return response?.data;
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export interface CoinMarketChartPoint {
  timestamp: number;
  price: number;
}

export const useGetCoinMarketChart = (coinId: string, days: number) => {
  return useQuery<CoinMarketChartPoint[]>({
    queryKey: ["coinMarketChart", coinId, days],
    queryFn: async () => {
      if (!COINGECKO_BASE_URL) {
        throw new Error("API URL is missing in environment variables.");
      }

      const interval = days === 1 ? "hourly" : "daily";
      const response = await axios.get(
        `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`,
      );

      const prices = Array.isArray(response?.data?.prices)
        ? (response.data.prices as [number, number][])
        : [];

      return prices.map(([timestamp, price]) => ({ timestamp, price }));
    },
    enabled: Boolean(coinId),
    staleTime: days === 1 ? 1000 * 60 : 1000 * 60 * 10,
    retry: 1,
  });
};

// use Querry Hook for currency exachange

let excahngeRateApiKey = process.env.EXPO_PUBLIC_EXCHANGE_RATE_API;

// function to fetch the currency
const fetchExchangeRate = async (targetCurrency: string): Promise<number> => {
  const { data } = await axios.get(
    `https://v6.exchangerate-api.com/v6/${excahngeRateApiKey}/pair/USD/${targetCurrency}`,
  );

  if (data.result !== "success") throw new Error("Failed to fetch rate");

  return data.conversion_rate;
};

export const useExchangeRate = (targetCurrency: string) => {
  return useQuery({
    queryKey: ["exchangeRate", targetCurrency],
    queryFn: () => fetchExchangeRate(targetCurrency),
    staleTime: 1000 * 60 * 60 * 6,
  });
};
