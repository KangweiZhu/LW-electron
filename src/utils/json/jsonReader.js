function jsonReader(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            // 'data' variable contains the parsed JSON data
            callback(data); // Call the callback function with data[0]
        } else if (xhr.readyState === 4) {
            console.error('Error fetching JSON:', xhr.status);
        }
    };
    xhr.send();
}

export default jsonReader;