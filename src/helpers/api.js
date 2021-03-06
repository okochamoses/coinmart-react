/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = (url, options = {}) => {
    const baseUrl = 'http://localhost:8080/coinmart/api';
    // const baseUrl = 'https://coinmart.com.ng:8443/coinmart/api';
    return fetch(baseUrl + url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => {
            throw error;
        });
};

export { fetchJSON };
