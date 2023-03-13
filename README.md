# web3 sandbox

A web interface for playing with web3 protocols and wallets.

## Tech stack

* [SvelteKit](https://kit.svelte.dev/) for application client, page routing, and server
* [TailwindCSS](https://tailwindcss.com) for client styling
* [CoinGecko API](https://www.coingecko.com/en/api/documentation) for current token price information
* [svelte-web3 / web3.js](https://github.com/clbrge/svelte-web3) for wallet connection
* [Moralis API](https://admin.moralis.io/web3apis) for wallet token holdings

## Developing

Installed dependencies with `npm install`, then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`. To deploy, install an [adapter](https://kit.svelte.dev/docs/adapters) for the target deployment environment.
