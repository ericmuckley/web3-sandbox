// https://github.com/PinataCloud/Pinata-SDK
import pinataSDK from '@pinata/sdk'
import { PINATA_API_KEY, PINATA_API_SECRET, PINATA_JWT } from '$env/static/private'


/*
const pinata = new pinataSDK({
    pinataApiKey: PINATA_API_KEY,
    pinataSecretApiKey: PINATA_API_SECRET,
})

*/
export async function load() {
    return {PINATA_JWT, PINATA_API_KEY, PINATA_API_SECRET}
}