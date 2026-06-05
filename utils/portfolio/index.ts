export interface CryptoTip {
  id: string;
  title: string;
  content: string;
  category: "security" | "defi" | "nft" | "blockchain" | "trading";
  icon: string;
}

export const CRYPTO_TIPS: CryptoTip[] = [
  {
    id: "1",
    title: "What is Blockchain?",
    content: "A blockchain is a digital ledger that records transactions across many computers.",
    category: "blockchain",
    icon: "link-outline",
  },
  {
    id: "2",
    title: "Cold vs Hot Wallet",
    content: "Cold wallets are offline storage, while hot wallets are connected to the internet.",
    category: "security",
    icon: "wallet-outline",
  },
  {
    id: "3",
    title: "Dollar-Cost Averaging",
    content: "Investing fixed amounts regularly reduces volatility risk.",
    category: "trading",
    icon: "trending-up-outline",
  },
];

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const getCategoryColor = (category: CryptoTip["category"]): string => {
  const colors: Record<string, string> = {
    security: "#10B981",
    defi: "#8B5CF6",
    nft: "#EC4899",
    blockchain: "#3B82F6",
    trading: "#F59E0B",
  };
  return colors[category] || "#6B7280";
};