import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    // FIX: Use internal system variables natively provided by Supabase Edge Runtime
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch fresh cryptocurrency data from CoinGecko API
    const apiUrl = Deno.env.get("EXPO_PUBLIC_COINGECKO_API") ?? "";
    if (!apiUrl) {
      throw new Error(
        "EXPO_PUBLIC_COINGECKO_API environment variable is not set",
      );
    }

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch from CoinGecko: ${response.statusText}`);
    }

    const data = await response.json();

    const formattedCoins = data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      fully_diluted_valuation: coin.fully_diluted_valuation,
      total_volume: coin.total_volume,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_24h: coin.price_change_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap_change_24h: coin.market_cap_change_24h,
      market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
      circulating_supply: coin.circulating_supply,
      total_supply: coin.total_supply,
      max_supply: coin.max_supply,
      ath: coin.ath,
      ath_change_percentage: coin.ath_change_percentage,
      ath_date: coin.ath_date,
      atl: coin.atl,
      atl_change_percentage: coin.atl_change_percentage,
      atl_date: coin.atl_date,
      roi: coin.roi,
      last_updated_api: coin.last_updated,
    }));

    // Upsert data into your public.coins table
    const { error } = await supabase
      .from("coins")
      .upsert(formattedCoins, { onConflict: "id" });

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, updated: formattedCoins.length }),
      { headers: { "Content-Type": "application/json" }, status: 200 },
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
