<script>

    import { onMount } from 'svelte'
    import Spinner from './_lib/Spinner.svelte'

    import { utils } from './utils.js'
    import { moralisIsConnected } from './store.js'
    import { defaultEvmStores, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3'

    export let data
    export let balance = null
    export let loadingTokens = false
    export let tokens = []
    
    $: $selectedAccount, getBalance()

    onMount(() => {
        if (!$moralisIsConnected) {
            Moralis.start({apiKey: data.MORALIS_API_KEY})
            $moralisIsConnected = true
        }
    })


    function getBalance() {
        if ($connected) {
            $web3.eth.getBalance($selectedAccount).then(r => {
                balance = `${utils.round(r / 1e18, 4)} ETH`
                getTokens()
            })
        } else {
            balance = null
            tokens = []

        }
    }


    const getTokens = async () => {


        if ($moralisIsConnected) {
            loadingTokens = true

            Moralis.EvmApi.token.getWalletTokenBalances({
                address: "0x91a42eCF59abB8350A0A64c8D3f5eb3bD08cc6c2",//$selectedAccount, TODO: set to current wallet
                chain: 0,
            }).then(r => r.jsonResponse).then(r => {
                tokens = r
                //console.log(tokens)
                loadingTokens = false
            })

        }
        
    }

</script>


{#if $connected}

    <p class="text-gray-200">

        {#if loadingTokens}

        <div>
            <Spinner />
            Loading tokens...
        </div>

        {:else}

            {#if tokens && tokens.length}

                {#each tokens as token}
                    {#if token.logo}
                        <div on:keypress={() => {}} on:click={window.open(`https://etherscan.io/address/${token.token_address}`)} class="my-3 py-3 px-5 rounded-md bg-slate-700 hover:bg-slate-600 hover:cursor-pointer">
                            <div class="flex flex-row justify-between">
                                <div class="flex flex-row">
                                    {#if token.logo}
                                        <img src={token.logo} alt="{token.name} icon" width="30px" class="mr-4">
                                    {:else}
                                        <div class="bg-gray-700 text-gray-300 px-3 py-1 mr-4 rounded-full">?</div>
                                    {/if}
                                    <div class="me-2 pt-1" style="min-width: 100px;">{token.name}</div>
                                </div>
                                <div class="pt-1">{utils.round(Number(token.balance) / 10**token.decimals, 4)}</div>
                            </div>
                        </div>
                    {/if}

                {/each}
            
            {:else}
                <span>No ERC-20 tokens found</span>

            {/if}

        {/if}


    </p>    

{:else}

    <p class="text-gray-200">
        Connect a wallet to get started.
    </p> 

{/if}


