import { StatuspageDictionary, StatuspageHTMLElements } from '../../modules/Statuspage.esm.js';

function StatuspageHTML() {
    var htmlElement = new StatuspageHTMLElements.HTMLStringMetadata('https://spstat.us/', 'https://www.cloudflarestatus.com', 'https://spstat.us/favicon.ico', 'https://spstat.us/img/maskable/144px.png', 'Cloudflare', StatuspageDictionary.PathNames.Status);
    
    var headers = new Headers();
    headers.append("Content-Type", "text/html");

    htmlElement.statuspageUrl = null;
    htmlElement.status = StatuspageDictionary.StatusEnums.good;
    htmlElement.pathName = StatuspageDictionary.PathNames.Status;

    return new Response(htmlElement.HTML, { headers: headers });
}

export async function onRequestGet(context) {
    console.log(context.request.url);
    return StatuspageHTML();
}

export async function onRequestHead(context) {
    return StatuspageHTML();
}