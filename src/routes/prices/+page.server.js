import { COINGECKO_PRICE_URL, MORALIS_SERVER_URL, MORALIS_APP_ID } from '$env/static/private'

export async function load() {

    // get price feed from CoinGecko
    let priceResponse = await fetch(COINGECKO_PRICE_URL)


    // initialize connection to Moralis
    //let serverUrl = import.meta.env.VITE_PUBLIC_MORALIS_SERVER_URL;
    //let appId = import.meta.env.VITE_PUBLIC_MORALIS_APP_ID;
    // Start Moralis
    Moralis.start({MORALIS_SERVER_URL, MORALIS_APP_ID})
    // Let the app know it's started
    //moralisStarted = true

    return {
        prices: priceResponse.json(),
    }

}