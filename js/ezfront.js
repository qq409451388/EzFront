var $ = {
    sel : function (selector) {
        document.getElementById(selector);
    },
    httpGet:function (options) {
        const {url, params, header, onSuccess, onFail} = options;
        this.get(url, params, header, onSuccess, onFail);
    },
    httpPost(options) {
        const {url, params, header, onSuccess, onFail} = options;
        this.post(url, params, header, onSuccess, onFail);
    },
    get: function (url, params, header, onSuccess, onFail) {
        var xhr = new XMLHttpRequest();

        // Append params to URL
        var queryString = params ? Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&') : "";
        var fullUrl = queryString ? url + '?' + queryString : url;

        xhr.open("GET", fullUrl, true);

        // Set headers
        for (var key in header) {
            if (header.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, header[key]);
            }
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // Request is done
                if (xhr.status >= 200 && xhr.status < 300) {
                    onSuccess(xhr.responseText);
                } else {
                    onFail(xhr.status, xhr.statusText);
                }
            }
        };

        xhr.onerror = function () {
            onFail(xhr.status, xhr.statusText);
        };

        xhr.send();
    },
    post: function (url, body, header, onSuccess, onFail) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);

        // Set headers
        for (var key in header) {
            if (header.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, header[key]);
            }
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // Request is done
                if (xhr.status >= 200 && xhr.status < 300) {
                    onSuccess(xhr.responseText);
                } else {
                    onFail(xhr.status, xhr.statusText);
                }
            }
        };

        xhr.onerror = function () {
            onFail(xhr.status, xhr.statusText);
        };

        xhr.send(JSON.stringify(body));
    }
};
