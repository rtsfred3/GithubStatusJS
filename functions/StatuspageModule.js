import { StatuspageDictionary, StatuspageWebComponents, StatuspageHTMLElements } from '../modules/Statuspage.esm.js';

export async function onRequestGet({ params, env }) {
    const canonicalUrl = "https://githubstat.us/StatuspageModule/";
    const imgUrl = "https://githubstat.us/img/status-min.png";
    const iconUrl = "https://githubstat.us/favicon.ico";
    const statuspageUrl = "https://www.cloudflarestatus.com/";
    const title = "Test Title";
    const description = "Test Description";
    const themeColor = StatuspageDictionary.MetaColors.good;
    const author = "rtsfred3";

    var html = document.createElement('html');
    var head = StatuspageHTMLElements.GetHead(canonicalUrl, statuspageUrl, iconUrl, imgUrl, title, description, themeColor, author);
    var body = document.createElement('body');

    body.appendChild(StatuspageHTMLElements.AppLoadingHTMLElement);

    html.appendChild(head);
    html.appendChild(body);


    return new Response(html, {
        headers: {
            "Content-Type": "text/html",
            "X-Age": age,
            "Cache-Control": `max-age=60, s-maxage=60, public`,
            "Cloudflare-CDN-Cache-Control": `max-age=60`
        },
    });
}