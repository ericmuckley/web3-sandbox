<script>
    import { page } from '$app/stores'
    export let items = [
        {text: "PRICES", icon: "bi-graph-up-arrow", href: "/prices"},
        {text: "ABOUT", icon: "bi-info-circle", href: "/about"},
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


<nav class="border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-gray-900">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
        <div class="border-b-2 {$page.url.pathname === "/" ? 'text-white border-white' : 'border-transparent'}">
            <a href="/" class="flex items-center" on:click={() => {collapse(true)}}>
                <span class="self-center text-xl font-semibold whitespace-nowrap text-white">
                    <span>&#x1F3DD;</span>
                    sandbox
                </span>
            </a>
        </div>
        <div class="flex md:order-2">
            <button type="button" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                <i class="bi bi-wallet-fill mr-2"></i>Connect wallet
            </button>
            <button 
                on:click={() => {document.querySelector(".navbar-collapse").classList.toggle("hidden")}}
                type="button"
                class="inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    </svg>
            </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 navbar-collapse">
            <ul class="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                {#each items as item}
                    <li class="py-2 border-b-2 {$page.url.pathname === item.href ? 'text-white border-white' : 'border-transparent'}">
                        <a
                            on:click={() => {collapse(true)}}
                            href={item.href}
                            class="{$page.url.pathname === item.href ? 'text-white' : 'text-green-500'} block px-3 md:bg-transparent md:p-0">
                                <i class="bi {item.icon} mr-2"></i>{item.text}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
  </nav>
  