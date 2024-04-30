
const apiUrl = "https://v2.api.noroff.dev/blog/posts/Shira";
const apiAdmin = `${apiUrl}/`

async function fetchApi(method) {  
    try {
        const response = await fetch(apiUrl, {
            method: method,
            header: {
                'Content-Type': 'application/json',
                //Authorization: 'Bearer ${TOKEN HERE}',
            },
            body: JSON.stringify(),
        });
        
        const data = await response.json();
        console.log('RESPONSE',response);
        console.log('DATA',data);
    } 
    catch (error) {
        console.error('Could not fetch data' + error);
        throw error ("There was a problem getting the data")
    }
}

fetchApi()


