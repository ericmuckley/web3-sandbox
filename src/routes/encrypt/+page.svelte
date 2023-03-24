<script>

    /*
    Encryption / decryption functions are here:
    https://github.com/MetaMask/eth-sig-util/blob/main/src/encryption.ts

    great example
    https://codesandbox.io/s/metamask-encrpt-decrypt-example-uzssd?file=/src/App.tsx:865-869
    */

    import { defaultEvmStores, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3'

    import { Buffer } from 'buffer';
    import * as sigUtil from "@metamask/eth-sig-util";
    import * as ethUtil from "ethereumjs-util";

    let textToEncrypt = ""
    let encryptedText = ""
    let decryptedText = ""


    const getEncryptionPublicKey = async (account) => {
        const result = await window.ethereum.request({
            method: 'eth_getEncryptionPublicKey',
            params: [account],
        })
        return result
    }

    const handleEncrypt = async (account, text) => {
        let encryptionPublicKey = await getEncryptionPublicKey(account)
        encryptedText = encrypt(encryptionPublicKey, text)
        
    }

    const encrypt = (publicKey, text) => {
        const result = sigUtil.encrypt({
            publicKey,
            data: text,
            // https://github.com/MetaMask/eth-sig-util/blob/v4.0.0/src/encryption.ts#L40
            version: "x25519-xsalsa20-poly1305"
        })
        // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
        return ethUtil.bufferToHex(Buffer.from(JSON.stringify(result), "utf8"))
    }

    const handleDecrypt = async (account, text) => {
        decryptedText = await decrypt(account, text)
    }

    const decrypt = async (account, text) => {
        let result = await window.ethereum.request({
            method: 'eth_decrypt',
            params: [text, account],
        })
        return result
    }

</script>



<textarea
    rows="4"
    bind:value={textToEncrypt}
    class="block p-3 w-full text-gray-200 bg-gray-600 rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
    placeholder="Enter text here..."></textarea>


{#if $connected}
    {#if textToEncrypt.length}
        <button
            on:click={handleEncrypt($selectedAccount, textToEncrypt)}
            class="m-5 bg-green-500 hover:bg-green-300 px-3 py-1 rounded-full"
            type="button">
                ENCRYPT
        </button>
    {:else}
        <p class="text-gray-300">Enter text to be encrypted.</p>
    {/if}
    {#if encryptedText.length}
        <button
            on:click={handleDecrypt($selectedAccount, encryptedText)}
            class="m-5 bg-green-500 hover:bg-green-300 px-3 py-1 rounded-full"
            type="button">
                DECRYPT
        </button>
    {/if}
{:else}
    <p class="text-gray-300">Please connect a wallet to access your encryption keys.</p>
{/if}


<div class="my-3 w-fill overflow-x-auto">
    <table class="text-gray-300">
        <tbody>
            <tr><th>Original text</th><td>{textToEncrypt.length ? textToEncrypt : '--'}</td></tr>
            <tr><th>Encrypted text</th><td>{encryptedText.length ? encryptedText : '--'}</td></tr>
            <tr><th>Decrypted text</th><td>{decryptedText.length ? decryptedText : '--'}</td></tr>        
        </tbody>
    </table>
</div>

<style lang="postcss">

    tr {
        @apply border-b border-gray-700
    }

    th {
        @apply pl-3 pr-10 py-3 text-left whitespace-nowrap
    }

    td {
        @apply text-left
    }

</style>