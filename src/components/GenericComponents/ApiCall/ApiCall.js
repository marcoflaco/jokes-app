function ApiCall(url, url_extension) {
    fetch(url + url_extension).then(response => {
        if (response.ok) {
            return response.json();
        }
    });
}
export default ApiCall;
