import { COINGECKO_PRICE_URL } from '$env/static/private'

export async function load() {
    // get price feed from CoinGecko
    let priceResponse = await fetch(COINGECKO_PRICE_URL)
    return {prices: priceResponse.json()}
}