<script>
    import { page } from '$app/stores'
    import { connected, chainData } from 'svelte-web3'
    import ConnectWalletBtn from './_lib/ConnectWalletBtn.svelte'
    export let items = [
        {text: "PRICES", icon: "bi-graph-up-arrow", href: "/prices"},
        {text: "ENCRYPT", icon: "bi-file-earmark-lock2", href: "/encrypt"},
        {text: "STORE", icon: "bi-cloud-arrow-up", href: "/store"},
    ]

    function collapse(collapse) {
        let el = document.querySelector(".navbar-collapse")
        if (collapse) {
            el.classList.add("hidden")
        } else {
            el.classList.remove("hidden")
        }
    }

</script>


<nav class="border-gray-200 sm:px-4 px-4 py-2 rounded bg-gray-900">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
        <div class="mr-2 border-b-2 {$page.url.pathname === '/' ? 'border-white' : 'border-transparent'}">
            <a href="/" class="flex items-center" on:click={() => {collapse(true)}}>
                <div class="self-center text-2xl font-extrabold whitespace-nowrap py-2 px-4 rounded-xl {$page.url.pathname === '/' ? 'text-white' : 'text-green-500 hover:text-white hover:bg-gray-800'}">
                    <span class="mr-2">&#x1F3DD;</span><span>sandbox</span>
                </div>
            </a>
        </div>
        <div class="flex md:order-2">
            {#if $connected}
                <span class="text-gray-400 pt-2 mx-3 font-mono text-sm cursor-default">
                    {$chainData.name}
                </span>
            {/if}

            <ConnectWalletBtn />
            <button 
                on:click={() => {document.querySelector(".navbar-collapse").classList.toggle("hidden")}}
                type="button"
                class="inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    </svg>
            </button>
        </div>
        <div class="items-center justify-between hidden mx-auto w-full md:flex md:w-auto md:order-1 navbar-collapse">
            <ul class="flex flex-col py-2 mt-4 border rounded-lg md:flex-row md:space-x-2 md:mt-0 md:text-s md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                {#each items as item}
                    <li class="mx-0 font-light border-b-2 {$page.url.pathname === item.href ? 'border-white' : 'border-transparent'}">
                        <a on:click={() => {collapse(true)}} href={item.href} class="whitespace-nowrap block md:p-0">
                            <div class="py-2 px-4 rounded-xl {$page.url.pathname === item.href ? 'text-white' : 'text-green-500 hover:text-white hover:bg-gray-800'}">
                                <i class="bi {item.icon} mr-2"></i>{item.text}
                            </div>
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</nav>
  