export const getTopGainer = async () => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_24h_desc'
  );
  const data = await res.json();
  return data[0];
};

export const searchCoins = async (query: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${query}`
  );
  const data = await res.json();
  return data.coins;
};
