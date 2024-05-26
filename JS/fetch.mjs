

const baseUrl = "https://v2.api.noroff.dev";
export const userUrl = `${baseUrl}/blog/posts/Shira`;
export const loginUrl = `${baseUrl}/auth/login`;
export const registerUrl = `${baseUrl}/auth/register`;



export async function fetchApi(method, url, body) {  
// const token = localStorage.getItem('accessToken');
    
    showLoader();
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`,
                
            },
            body: JSON.stringify(body),
        });
        
        const data = await response.json();
        console.log('DATA',data, 'RESPONSE', response);
        // console.log('RESPONSE',response);
        return data;
    } 
    catch (error) {
        console.error('Could not fetch data' + error);
        throw error ("There was a problem getting the data")
    } finally {
        hideLoader();
    }
}



function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'block';
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}


// Make userUrl usable for whatever registered account that is being made
// `${baseUrl}/blog/posts/${name}`

// GET, POST - /blog/posts/Shira
// PUT, DELETE, GET - /blog/posts/Shira/{id}
// https://v2.api.noroff.dev/blog/posts/Shira
