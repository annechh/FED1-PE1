
const apiUrl = "https://v2.api.noroff.dev/blog/posts/Shira";
// const apiAdmin = `${apiUrl}/`

export async function fetchApi(method, body) {  
    try {
        // const token = '';
        const response = await fetch(apiUrl, {
            method: method,
            header: {
                'Content-Type': 'application/json',
                //Authorization: 'Bearer ${TOKEN HERE}',
            },
            body: JSON.stringify(body),
        });
        
        const data = await response.json();
        // localStorage.setItem('newPost', JSON.stringify(data));
        console.log('RESPONSE',response);
        console.log('DATA',data);
        // window.location.href = '../post/index.html';
    } 
    catch (error) {
        console.error('Could not fetch data' + error);
        throw error ("There was a problem getting the data")
    }
}



