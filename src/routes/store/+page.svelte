<script>

    import Spinner from '../_lib/Spinner.svelte'
    import { onMount } from 'svelte'

    export let data
    let userInput = {name: "", message: ""}
    let pins = "loading"

    onMount(() => {
        getPins()
    })

    // get all Pinata PI keys
    async function getKeys () {
        const request = await fetch('https://api.pinata.cloud/users/apiKeys', {
            method: "GET",
            headers: { 
                'Authorization': `Bearer ${data.PINATA_JWT}`,
            },          
        })
        let r = await request.json()
        console.log(r)
    }


    async function postData () {

		const request = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
			method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${data.PINATA_JWT}`
            },            
			body: JSON.stringify(userInput),
		})

		const response = await request.json()
        console.log(response)

        getPins()

    }


    async function getPins() {
        pins = "loading"
        const request = await fetch('https://api.pinata.cloud/data/pinList?includeCount=true&status=pinned', {
            method: "GET",
            headers: { 
                'Authorization': `Bearer ${data.PINATA_JWT}`,
            },          
        })
        pins = await request.json()
    }

</script>


<div class="my-3 rounded-md border border-green-800 p-3">
    <input
        type="text"
        bind:value={userInput.name}
        class="!outline-none mb-2 bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-3"
        placeholder="Your name...">

    <input
        type="text"
        bind:value={userInput.message}
        class="!outline-none mb-2 bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-3"
        placeholder="Your message...">

    <button
        class="bg-white text-black rounded-full my-3 px-4 py-2 hover:bg-green-300"
        on:click={postData}
        type="button">
            Post to IPFS
    </button>
</div>



<h3 class="text-lg text-gray-300 mb-3 text-xl">My pinned content</h3>
{#if pins === "loading"}
    <div class="text-center my-3 text-gray-300">
        <Spinner />
        Loading pinned content...
    </div>
{:else}
    {#if pins.rows.length}
        {#each pins.rows as row}
            <div class="p-3 my-3 rounded bg-gray-800 text-gray-300">
                <a
                    class="text-blue-500 hover:text-green-300 underline"
                    href="https://gateway.pinata.cloud/ipfs/{row.ipfs_pin_hash}" 
                    rel="noreferrer"
                    target="_blank">IPFS HASH {row.ipfs_pin_hash}</a>
                <pre class="text-xs">{JSON.stringify(row, null, 4)}</pre>
            </div>
        {/each}
    {:else}
        <p class="text-gray-300">You have no pinned content.</p>
    {/if}
{/if}

