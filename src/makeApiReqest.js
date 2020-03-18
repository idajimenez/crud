/**
 * Method for making ajax calls to the site's api
 * @param {String} endpoint - the endpoint url
 * @param {String} method = GET | PUT | POST | DELETE
 * @param {Object} data
 * @returns {Promise}
 */
export default async function makeApiRequest(endpoint, method, data) {
    let url = `https://reqres.in/api${endpoint}`;
    const response = await fetch(url, {
        method,
        body: data ? JSON.stringify(data) : null
    });

    if (response.ok) {
        if (response.status === 204) {
            return true;
        }
        
        return await response.json();
    }
    else {
        let error = new Error(response.statusText);

        error.response = response;
        throw error;
    }
}
