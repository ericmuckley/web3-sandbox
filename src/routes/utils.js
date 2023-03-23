//import LitJsSdk from '@lit-protocol/lit-node-client';
//import * as u8a from "uint8arrays";
//import { ethers } from "ethers";
//import siwe from "siwe";



export const utils = {

    // round a number to an amount of digits
    round(num, digits=2) {
        return Math.round((num + Number.EPSILON) * 10**digits) / 10**digits
    },

    // sort an array of objects by object key
    sortObjectArray(arr, key, ascending=true) {
        if (typeof arr[0][key] === 'number') {
            if (ascending) {
                arr.sort((a, b) => a[key] - b[key])
            } else {
                arr.sort((a, b) => b[key] - a[key])
            }
        } else {
            if (ascending) {
                arr.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
            } else {
                arr.sort((b, a) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
            }
        }
        return arr
    },

}



/*
export const encryptDecryptString = async () => {

    // -- init litNodeClient
    const litNodeClient = new LitJsSdk.LitNodeClient();

    await litNodeClient.connect();

    const messageToEncrypt = "Lit is 🔥";

    const chain = 'ethereum';

    console.log(chain, messageToEncrypt)

    
    const authSig = await signAuthMessage();

    const accessControlConditions = [
        {
            contractAddress: '',
            standardContractType: '',
            chain: 'ethereum',
            method: 'eth_getBalance',
            parameters: [':userAddress', 'latest'],
            returnValueTest: {
            comparator: '>=',
            value: '0',  // 0 ETH, so anyone can open
            },
        },
    ];

    // 1. Encryption
    // <Blob> encryptedString
    // <Uint8Array(32)> symmetricKey 
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(messageToEncrypt);

    // 2. Saving the Encrypted Content to the Lit Nodes
    // <Unit8Array> encryptedSymmetricKey
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain,
    });

    // 3. Decrypt it
    // <String> toDecrypt
    const toDecrypt = LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16');

    // <Uint8Array(32)> _symmetricKey 
    const _symmetricKey = await litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt,
        chain,
        authSig
    })

    // <String> decryptedString
    let decryptedString;

    try{
        decryptedString = await LitJsSdk.decryptString(
            encryptedString,
            _symmetricKey
        );
    }catch(e){
        console.log(e);
    }

    console.warn("decryptedString:", decryptedString);
    
}
*/


/**
 * Get auth signature using siwe
 * @returns 
 */
/*
const signAuthMessage = async () => {

    // Replace this with you private key
    const privKey =
    "3dfb4f70b15b6fccc786347aaea445f439a7f10fd10c55dd50cafc3d5a0abac1";
    const privKeyBuffer = u8a.fromString(privKey, "base16");
    const wallet = new ethers.Wallet(privKeyBuffer);

    const domain = "localhost";
    const origin = "https://localhost/login";
    const statement =
    "This is a test statement.  You can put anything you want here.";

    const siweMessage = new siwe.SiweMessage({
        domain,
        address: wallet.address,
        statement,
        uri: origin,
        version: "1",
        chainId: "1",
    });

    const messageToSign = siweMessage.prepareMessage();

    const signature = await wallet.signMessage(messageToSign);

    console.log("signature", signature);

    const recoveredAddress = ethers.utils.verifyMessage(messageToSign, signature);

    const authSig = {
        sig: signature,
        derivedVia: "web3.eth.personal.sign",
        signedMessage: messageToSign,
        address: recoveredAddress,
    };

    return authSig;
}
*/