<script>
    import { currentUser } from "../store.js"

    async function connectWallet() {

        /*
        console.log(Moralis)
        const user = await Moralis.authenticate({
            signingMessage: "Sign in with Ethereum"
        })
        */
        $currentUser = 'e'
        

        console.log($currentUser)
    }

    // Sign out function
    async function disconnectWallet() {
        
        //await Moralis.User.logOut()
        $currentUser = null
        
        //$currentUser = null
        //console.log($currentUser)
    }


</script>

{#if !$currentUser}

    <button
        on:click={connectWallet}
        type="button"
        class="whitespace-nowrap text-black px-5 py-1 rounded-full text-center mr-3 md:mr-0 bg-green-500 hover:bg-green-300">
            <i class="bi bi-wallet-fill mr-2"></i>Connect wallet
    </button>

{:else}

    <button
        on:click={disconnectWallet}
        type="button"
        class="whitespace-nowrap text-black px-5 py-1 rounded-full text-center mr-3 md:mr-0 bg-green-500 hover:bg-green-300">
            Disconnect wallet
    </button>

{/if}