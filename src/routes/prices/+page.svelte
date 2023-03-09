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
        <table class="table">
            <thead class="border-bottom border-dark">
                {#each KEYS as key}
                    <th class="py-3 text-nowrap">
                        {#if [""].includes(key.raw)}  
                            {key.clean}
                        {:else}
                            <button
                                on:click={() => handleSort(key.raw)}
                                type="button"
                                class="sort-btn{sort_by === key.raw ? ' active' : ''}">
                                    <i class="bi bi-{sort_by !== key.raw ? 'arrow-down-up' : sort_descending ? 'sort-down' : 'sort-up-alt'} me-2"></i>{key.clean}
                            </button>
                        {/if}
                    </th>
                {/each} 
            </thead>
            <tbody>
                {#each data.prices as row}
                    <tr>
                        {#each KEYS as key}
                            <td>
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
                                    <a class="dark-link" href="https://www.coingecko.com/en/coins/{row.id}" target="_blank" rel="noreferrer">
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

    <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

{/if}
