<script>
    import { utils } from './utils.js'
    import { defaultEvmStores, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3'

    export let balance = null
    
    $: $selectedAccount, getBalance()

    function getBalance() {
        if ($connected) {
            $web3.eth.getBalance($selectedAccount).then(r => {
                balance = `${utils.round(r / 1e18, 4)} ETH`
            })
        } else {
            balance = ''
        }
    }


</script>

<p class="text-gray-200 text-lg mb-3">
    Use this interface to explore connections with different web3 protocols and wallets.
</p>


{#if $connected}

    <p class="text-gray-200">
        Connected to {$chainData.name}<br>
        with {$selectedAccount.slice(0, 7)}...{$selectedAccount.slice(-5)}
        <br>
        balance: {balance}

    </p>    

{:else}

    <p class="text-gray-200">
        Connect a wallet to get started.
    </p> 

{/if}


