import HeaderTypes from './HeaderTypes.js';

Headers.prototype.updateCacheControl = function(contentControlAge) {
    this.set(HeaderTypes.CacheControl, `max-age=${contentControlAge}, s-maxage=${contentControlAge}, public`);
    this.set(HeaderTypes.CloudflareCDNCacheControl, `max-age=${contentControlAge}`);
}

export default function CustomHeaders(contentType, contentControlAge){
    let headers = new Headers();

    headers.set(HeaderTypes.ContentType, contentType);
    headers.set(HeaderTypes.CacheControl, `max-age=${contentControlAge}, s-maxage=${contentControlAge}, public`);
    headers.set(HeaderTypes.CloudflareCDNCacheControl, `max-age=${contentControlAge}`);

    return headers;
}