export default function CustomHeaders(contentType, contentControlAge){
    let headers = new Headers();

    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', `max-age=${contentControlAge}, s-maxage=${contentControlAge}, public`);
    headers.set('Cloudflare-CDN-Cache-Control', `max-age=${contentControlAge}`);

    return headers;
}