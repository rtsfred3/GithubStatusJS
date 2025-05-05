import MainHtml from "../../../index.html";

import MainCss from "../../../styling/github.min.css";

// import { StatuspageDictionary } from '../../../modules/Statuspage.esm.js';
import StatuspageDictionary from '../../../modules/StatuspageDictionary.esm.js';
import StatuspageStaticHTML from '../../../modules/StatuspageStaticHTML.esm.js';

import { BotChecker } from '../../lib/BotChecker.js';
import CustomHeaders from '../../lib/CustomHeaders.js';

import CapitalizeFirstLetter from '../../lib/CapitalizeFirstLetter.js';

class FacebookRewriter {
    constructor(statusJson, canonicalUrl) {
        this.canonicalUrl = canonicalUrl;

        this.siteName = statusJson.page.name;
        this.statusIndicator = StatuspageDictionary.IndicatorVals[statusJson.status.indicator];
        this.statusDescription = statusJson.status.description;

        this.title = StatuspageDictionary.StatuspageHTMLTemplates.template_title_index.replace(StatuspageDictionary.replaceableStringValue, this.siteName);
        this.description = `${StatuspageDictionary.StatuspageHTMLTemplates.template_descrisption.replace(StatuspageDictionary.replaceableStringValue, this.siteName)} | ${this.siteName}'s Current Status: ${CapitalizeFirstLetter(this.statusIndicator)} | ${this.statusDescription}`;
    }

    setLinkTag(element, id, content) {
        if (element.tagName == "link") {
            if (element.getAttribute("rel") && element.getAttribute("rel") == id) {
                element.setAttribute("href", content);
            }
        }
    }

    element(element) {
        if (element.tagName == 'script') {
            element.remove();
        }
        else if (element.tagName == 'meta') {
            var nameTitleAttrList = ["application-name", "name", "og:title", "twitter:title", "apple-mobile-web-app-title"];
            var nameDescriptionAttrList = ["description", "og:description", "twitter:description"];
            var nameUrlAttrList = ["og:url"];

            if (element.getAttribute("property") || element.getAttribute("name") || element.getAttribute("itemprop")) {
                if (nameTitleAttrList.includes(element.getAttribute("property")) || nameTitleAttrList.includes(element.getAttribute("name")) || nameTitleAttrList.includes(element.getAttribute("itemprop"))) {
                    element.setAttribute("content", this.title);
                }

                if (nameDescriptionAttrList.includes(element.getAttribute("property")) || nameDescriptionAttrList.includes(element.getAttribute("name")) || nameDescriptionAttrList.includes(element.getAttribute("itemprop"))) {
                    element.setAttribute("content", this.description);
                }

                if (nameUrlAttrList.includes(element.getAttribute("property")) || nameUrlAttrList.includes(element.getAttribute("name")) || nameUrlAttrList.includes(element.getAttribute("itemprop"))) {
                    element.setAttribute("content", this.canonicalUrl);
                }
            }
        }
        else if (element.tagName == 'link') {
            this.setLinkTag(element, "canonical", this.canonicalUrl);
        }
        else if (element.tagName == 'title') {
            element.setInnerContent(this.title);
        }
        else if (element.tagName == 'body') {
            element.setInnerContent(`<statuspage-status data-status="${this.statusIndicator}" fullScreen></statuspage-status>`, { html: true });
        }
    }

    comments(comment) {
        comment.remove();
    }
}

async function ProcessBotRequest(context, resp) {
    const statusFetch = await fetch("https://www.githubstatus.com/api/v2/status.json");
    const statusJson = await statusFetch.json();

    var rewriteAttr = new FacebookRewriter(statusJson, context.request.url);

    const rewriter = new HTMLRewriter()
        .on("script", rewriteAttr)
        .on("style", rewriteAttr)
        .on("meta", rewriteAttr)
        .on("link", rewriteAttr)
        .on("title", rewriteAttr)
        .on("head", rewriteAttr)
        .on("body", rewriteAttr);

    return rewriter.transform(resp);
}

async function ProcessContext(context) {
    var botChecker = new BotChecker(context);
    var resp = new Response(MainHtml, { headers: CustomHeaders("text/html; charset=utf-8", 30) });

    console.log("-".repeat(50));

    // console.log(new DOMParser());

    // console.log(context);
    // console.log(context.request);
    // console.log(context.request.cf);
    // console.log(context.request.cf.verifiedBotCategory);
    // console.log(context.request.cf.botManagement);

    if (botChecker.IsFacebookBot) {
        return await ProcessBotRequest(context, resp);
    } else {
        return resp;
    }
}

export async function onRequestGet(context) {
    console.log(MainCss);
    var styling = MainCss;
    
    return StatuspageStaticHTML.ErrorHTML('https://githubstat.us/favicon.ico', 'https://githubstat.us/img/status/lowres/min/status-min-good.png', '(Unofficial) GitHub Status', 'https://githubstat.us/testing/fb/', 'rtsfred3', [], '(Unofficial) GitHub Status', 'An unofficial website to monitor GitHub status updates.', styling, true);

    // return ProcessContext(context);
}

export async function onRequestHead(context) {
    return ProcessContext(context);
}