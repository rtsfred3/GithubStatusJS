export default function CustomHeaders(contentType, contentControlAge){
    let headers = new Headers();

    headers.set('Content-Type', contentType);

    return headers;
}