<script>
    import { utils } from '../utils.js'
    export let data
    export let sort_by = "market_cap"
    export let sort_descending = true
    export const KEYS = [
        {raw: "", clean: ""},
        {raw: "name", clean: "Name"},
        {raw: "current_price", clean: "Price ($)"},
        {raw: "market_cap", clean: "Market cap ($B)"},
        {raw: "price_change_percentage_24h", clean: "24 hr change (%)"},
    ]

    function handleSort(key) {
       sort_by = key
       sort_descending = !sort_descending
       let testVal = data.prices[0][sort_by]
       if (typeof testVal === 'string' || testVal instanceof String) {
            if (sort_descending) {
                data.prices = data.prices.sort((a, b) => a[sort_by].localeCompare(b[sort_by]))
            } else {
                data.prices = data.prices.sort((a, b) => b[sort_by].localeCompare(a[sort_by]))
            }
       } else {
            if (sort_descending) {
                data.prices = data.prices.sort((a, b) => b[sort_by] - a[sort_by])
            } else {
                data.prices = data.prices.sort((a, b) => a[sort_by] - b[sort_by])
            }
       }
    }

</script>


{#if data.prices && data.prices.length}

    <div class="w-100" style="overflow-x: auto;">
        <table>
            <thead>
                <tr class="border-b-2 border-gray-300">
                    {#each KEYS as key}
                        <th class="py-2 px-2">
                            {#if [""].includes(key.raw)}  
                                {key.clean}
                            {:else}
                                <button
                                    on:click={() => handleSort(key.raw)}
                                    type="button"
                                    class="px-5 py-2 rounded-full whitespace-nowrap {sort_by === key.raw ? 'bg-gray-400 text-black' : 'bg-gray-800 text-gray-200'}">
                                        <i class="bi bi-{sort_by !== key.raw ? 'arrow-down-up' : sort_descending ? 'sort-down' : 'sort-up-alt'} mr-3"></i>{key.clean}
                                </button>
                            {/if}
                        </th>
                    {/each} 
                </tr>
            </thead>
            <tbody>
                {#each data.prices as row}
                    <tr class="border-b-2 border-gray-800">
                        {#each KEYS as key}
                            <td class="py-3 px-3 text-gray-300">
                                {#if key.raw === ""}
                                    <img src={row.image} width="30px" alt={`${row.id} image`}>
                                {:else if key.raw === "market_cap"}
                                    {utils.round(row[key.raw] / 1000000000, 1)}
                                {:else if key.raw === "current_price"}
                                    {utils.round(row[key.raw], 2)}
                                {:else if key.raw === "price_change_percentage_24h"}
                                    <span class="fw-bold" style="color: {row[key.raw] < 0 ? 'red' : 'limegreen'}">
                                        {utils.round(row[key.raw], 2)}
                                    </span>
                                {:else}
                                    <a class="text-green-300 hover:text-green-700" href="https://www.coingecko.com/en/coins/{row.id}" target="_blank" rel="noreferrer">
                                        {row.symbol.toUpperCase()}
                                    </a>
                                    <!--<span class="text-muted">{row[key.raw]}</span>-->
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

{:else}

    <p class="text-gray-200 text-lg">
        No price information is avilable.
    </p>

{/if}
