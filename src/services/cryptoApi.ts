// ✅ NO axios (build safe)
// ✅ named exports (important)

export const getTopGainer = async () => {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_24h_desc'
    );

    const data = await res.json();

    return data[0];
  } catch (err) {
    console.log('Top gainer error:', err);
    return null;
  }
};

export const getCoinById = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    return await res.json();
  } catch (err) {
    console.log('Coin fetch error:', err);
    return null;
  }
};

export const searchCoins = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );

    const data = await res.json();

    return data.coins || [];
  } catch (err) {
    console.log('Search error:', err);
    return [];
  }
};

export const getMarketChart = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
    );

    return await res.json();
  } catch (err) {
    console.log('Chart error:', err);
    return null;
  }
};
