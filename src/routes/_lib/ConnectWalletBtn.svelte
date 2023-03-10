<script>
    import { currentUser, currentProfile } from "../store.js"

    async function connectWallet() {

        console.log(Moralis)
        const user = await Moralis.authenticate({
            signingMessage: "Sign in with Ethereum"
        })
        $currentUser = user

        console.log($currentUser)
    }

    // Sign out function
    async function disconnectWallet() {
        
        await Moralis.User.logOut()
        $currentUser = null
        $currentProfile = null
        
        $currentUser = null
        console.log($currentUser)
    }


</script>

{#if !$currentUser}

    <button
        on:click={connectWallet}
        type="button"
        class="mx-2 text-black px-5 py-2 rounded-full text-center mr-3 md:mr-0 bg-green-400 hover:bg-green-600 border-2 border-green-400 hover:border-green-600">
            <i class="bi bi-wallet-fill mr-2"></i>Connect wallet
    </button>

{:else}

    <button
        on:click={disconnectWallet}
        type="button"
        class="mx-2 px-5 py-2 rounded-full text-center mr-3 md:mr-0 bg-transparent border-2 hover:bg-green-600 text-green-600 hover:text-black border-green-600">
            Disconnect wallet
    </button>

{/if}