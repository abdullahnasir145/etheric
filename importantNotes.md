<!-- This is the end point so we can use to show chart for current price -->
<!-- here the coin id will be dynamically added -->

// Fetch function for React Query
const fetchCoinChart = async (coinId: string) => {
const { data } = await axios.get(
`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`
);
// data.prices is an array of [timestamp, price] arrays
return data.prices.map(([timestamp, price]: [number, number]) => ({
timestamp,
value: price,
}));
};
