'use strict';

export default class Utils {
    static sanitizeUrl(url) {
        if (!/^[a-zA-Z-_]+:/.test(url)) {
            url = 'https://' + url;
        }
        return url.toLowerCase();
    }
}