<script>


    //import { encryptDecryptString } from '../utils.js'
    //import { LitSDK } from '../store.js'

    //import * as LitJsSdk from '@lit-protocol/lit-node-client';


    /*
    async function connectToLit() {

        const chain = 'ethereum';

        const authSig = await $LitSDK.checkAndSignAuthMessage({chain})

        console.log(authSig)
    }
    */

    //encryptDecryptString()


	import { AES } from 'crypto-es/lib/aes'
	import { Utf8 } from 'crypto-es/lib/core'

	let encryptedData = 'my secret message'
    let secret_key = "z4yH36a6zerhfE5427ZV"


    const encrypted = CryptoES.AES.encrypt("Message", "Secret Passphrase");


	const decryptedData = AES.decrypt(encryptedData, key).toString(Utf8);

    console.log(decryptedData)



</script>



<label for="message" class="block mb-2 text-sm font-medium text-gray-200">Your message</label>
<textarea
    id="message"
    rows="4"
    class="block p-2.5 w-full text-gray-200 bg-gray-600 rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
    placeholder="Write your thoughts here..."></textarea>

