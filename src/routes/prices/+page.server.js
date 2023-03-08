import { COINGECKO_PRICE_URL } from '$env/static/private'

export async function load() {
    let response = await fetch(COINGECKO_PRICE_URL)
    return {prices: response.json()}
  }