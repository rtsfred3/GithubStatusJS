// import StatuspageDictionary from '../../modules/StatuspageDictionary.esm.js';
import StatuspageStaticHTML from '../../modules/StatuspageStaticHTML.esm.js';
import Compression from '../../modules/Compression.esm.js';

import GetFileFromAssets from './GetFileFromAssets.js';
import CustomHeaders from './CustomHeaders.js';

import { BotChecker } from './BotChecker.js';

async function LoadingHTMLResp(context) {
    const primaryStatusStyling = await GetFileFromAssets(context, "/styling/github.min.css");
    const ampStatusStyling = await GetFileFromAssets(context, "/styling/github.min.css");

    var botChecker = new BotChecker(context);
    var isBot = botChecker.IsBot;

    const styling = isBot ? ampStatusStyling : primaryStatusStyling;
    
    var html =  StatuspageStaticHTML.LoadingHTML('https://githubstat.us/favicon.ico', 'https://githubstat.us/img/status/lowres/min/status-min-good.png', '(Unofficial) GitHub Status', 'https://githubstat.us/testing/fb/', 'rtsfred3', [], '(Unofficial) GitHub Status', 'An unofficial website to monitor GitHub status updates.', styling, isBot);

    const compressedHtml = await Compression.Compress(html);

    console.log(Array.from(compressedHtml));

    return new Response(html, { headers: CustomHeaders("text/html; charset=utf-8", 30) });
}

async function ErrorHTMLResp(context) {
    const primaryStatusStyling = await GetFileFromAssets(context, "/styling/github.min.css");
    const ampStatusStyling = await GetFileFromAssets(context, "/styling/github.min.css");

    var botChecker = new BotChecker(context);
    var isBot = botChecker.IsBot;

    const styling = isBot ? ampStatusStyling : primaryStatusStyling;

    var html =  StatuspageStaticHTML.LoadingHTML('https://githubstat.us/favicon.ico', 'https://githubstat.us/img/status/lowres/min/status-min-good.png', '(Unofficial) GitHub Status', 'https://githubstat.us/testing/fb/', 'rtsfred3', [], '(Unofficial) GitHub Status', 'An unofficial website to monitor GitHub status updates.', styling, isBot);

    return new Response(html, { headers: CustomHeaders("text/html; charset=utf-8", 30) });
}

async function StatusHTMLResp(context, status) {
    const primaryStatusStyling = await GetFileFromAssets(context, "/styling/github.min.css");
    const ampStatusStyling = await GetFileFromAssets(context, "/styling/github.min.css");

    var botChecker = new BotChecker(context);
    var isBot = botChecker.IsBot;

    const styling = isBot ? ampStatusStyling : primaryStatusStyling;

    var html =  StatuspageStaticHTML.StaticHTMLString(status, 'https://githubstat.us/favicon.ico', 'https://githubstat.us/img/status/lowres/min/status-min-good.png', '(Unofficial) GitHub Status', 'https://githubstat.us/testing/fb/', 'rtsfred3', [], '(Unofficial) GitHub Status', 'An unofficial website to monitor GitHub status updates.', styling, isBot);

    return new Response(html, { headers: CustomHeaders("text/html; charset=utf-8", 30) });
}

export { LoadingHTMLResp, ErrorHTMLResp, StatusHTMLResp };