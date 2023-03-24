<script>

    /*
    Encryption / decryption functions are here:
    https://github.com/MetaMask/eth-sig-util/blob/main/src/encryption.ts

    great example
    https://codesandbox.io/s/metamask-encrpt-decrypt-example-uzssd?file=/src/App.tsx:865-869
    */


    import { onMount } from "svelte";
    import { defaultEvmStores, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3'

    import * as ethers from "ethers";
    import * as sigUtil from "@metamask/eth-sig-util";
    import * as ethUtil from "ethereumjs-util";


    let chainIdMap = {
        '0x1': 'Ethereum Mainnet',
        '0x3': 'Ropsten Test Network',
        '0x4': 'Rinkeby Test Network',
        '0x5': 'Goerli Test Network',
        '0x2a': 'Kovan Test Network',
    }

    let address

    /*
    onMount(() => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(r => {
                address = r[0]
            })
            window.ethereum.request({ method: 'eth_chainId' }).then(r => {
                chainId = r
            })
        }
    })
    */

    //$: console.log($web3.send("eth_getEncryptionPublicKey", [$selectedAccount]))

    //if ($connected) {
    //    console.log($web3.send("eth_getEncryptionPublicKey", [$selectedAccount]))
    //}

    const requestPublicKey = ($web3, account) => {
        return web3.send("eth_getEncryptionPublicKey", [account]);
    };

    const encrypt = (publicKey, text) => {
    const result = sigUtil.encrypt({
        publicKey,
        data: text,
        // https://github.com/MetaMask/eth-sig-util/blob/v4.0.0/src/encryption.ts#L40
        version: "x25519-xsalsa20-poly1305"
    });

    // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
    return ethUtil.bufferToHex(Buffer.from(JSON.stringify(result), "utf8"));
    };

    const decrypt = async (web3, account, text) => {
        const result = await web3.send("eth_decrypt", [text, account]);
        return result;
    };


    function handleEncrypt() {

        window.ethereum
        .request({
            method: 'eth_getEncryptionPublicKey',
            params: [$selectedAccount],
        })
        .then((result) => {
            let encryptionPublicKey = result;
            console.log(encryptionPublicKey)
        })



    }



    function handleDecrypt() {


    }


</script>

<!--
<p class="text-gray-300 my-5">
    Address: {address}<br>
    Chain: {chainIdMap[chainId]}
</p>
-->

<label for="message" class="block mb-2 text-sm font-medium text-gray-200">Your message</label>
<textarea
    id="message"
    rows="4"
    class="block p-2.5 w-full text-gray-200 bg-gray-600 rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
    placeholder="Write your thoughts here..."></textarea>



<button
    on:click={handleEncrypt}
    class="m-5 bg-green-500 hover:bg-green-300 px-3 py-1 rounded-full"
    type="button">
        ENCRYPT
</button>

<button
    on:click={handleDecrypt}
    class="m-5 bg-green-500 hover:bg-green-300 px-3 py-1 rounded-full"
    type="button">
        DECRYPT
</button>
