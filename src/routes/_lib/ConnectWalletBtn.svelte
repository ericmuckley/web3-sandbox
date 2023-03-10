<script>
    //import { currentUser } from "../store.js"
    import { browser } from '$app/environment'
    import { defaultEvmStores, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3'

    async function connectWallet() {
        defaultEvmStores.setProvider()
    }

    async function disconnectWallet() {
        defaultEvmStores.disconnect()
    }

</script>

{#if browser}
    {#if $connected}
        <button
            on:click={disconnectWallet}
            type="button"
            class="whitespace-nowrap text-black px-5 py-1 rounded-full text-center mr-3 md:mr-0 bg-green-500 hover:bg-green-300">
                Disconnect {$selectedAccount.slice(0, 6)}...{$selectedAccount.slice(-4)}
        </button>
    {:else}
        <button
            on:click={connectWallet}
            type="button"
            class="whitespace-nowrap text-black px-5 py-1 rounded-full text-center mr-3 md:mr-0 bg-green-500 hover:bg-green-300">
                <i class="bi bi-wallet-fill mr-2"></i>Connect wallet
        </button>
    {/if}
{:else}
    <div class='text-gray-200'>No browser wallet detected</div>
{/if}