<script>

    export let data

    let response

    /*
    var config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer PINATA JWT'
        },
        data : data
    };

    */

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

        let data = {"some": "test data"}

		const request = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
			method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${data.PINATA_JWT}`
            },            
			data: data,
		})

		const json = await request.json()
		response = JSON.stringify(json)
    }

    getKeys()

</script>

<button
    class="bg-white text-black rounded-full my-3 px-4 py-2"
    on:click={postData}
    type="button">
        Post to IPFS
</button>