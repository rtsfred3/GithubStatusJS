import StatuspageDictionary from 'StatuspageDictionary.esm.js';
import StatuspageStaticHTML from 'StatuspageStaticHTML.esm.js';
import StatuspageWebComponents from 'StatuspageWebComponents.esm.js';
import StatuspageHTMLElements from 'StatuspageHTMLElements.esm.js';

import { createElement, render } from 'preact.mjs';

customElements.define(StatuspageWebComponents.App.is, StatuspageWebComponents.App);

class StatuspagePreact {
    get MetaTagsDict() {
        return {
            "author": this.author,
            "application-name": this.title,
            "theme-color": this.themeColor,
            "description": this.description,
            "keywords": this.keywords != null && this.keywords.length > 0 ? this.keywords.join(', ') : null,

            "og:site_name": this.title,
            "og:title": this.title,
            "og:description": this.description,
            "og:type": "website",
            "og:url": this.canonicalUrl,
            "og:image": this.imgUrl,

            "twitter:card": "summary",
            "twitter:title": this.title,
            "twitter:description": this.description,
            "twitter:image": this.imgUrl,

            "mobile-web-app-capable": "yes",
            "apple-mobile-web-app-capable": "yes",
            "apple-mobile-web-app-status-bar-style": this.themeColor,
            "apple-mobile-web-app-title": this.title,
            "viewport": "width=device-width, initial-scale=1.0, user-scalable=0.0",
            "HandheldFriendly": "true",
        };
    }

    get MetaTags() {
        var arr = [];
        
        for (const [key, value] of Object.entries(this.MetaTagsDict)) {
            var attrs = {};// name: key, content: value };

            if (key.startsWith('og:')) {
                attrs['property'] = key;
            } else {
                attrs['name'] = key;
            }
            
            attrs['content'] = value;

            var tag = createElement('meta', attrs, '');
            arr.push(tag);
        }

        return arr;
    }

    get description() {
        return StatuspageDictionary.StatuspageHTMLTemplates.template_descrisption.replace(StatuspageDictionary.replaceableStringValue, this.siteName);
    }

    get title() { 
        return StatuspageDictionary.StatuspageHTMLTemplates.template_title_index.replace(StatuspageDictionary.replaceableStringValue, this.siteName);
    }

    get themeColor() { return this.status != null ? StatuspageDictionary.MetaColors[this.status]  : StatuspageDictionary.MetaColors.loading; }

    get head() {
        var metaTagsList = this.MetaTags;

        metaTagsList.push(createElement('title', {}, this.title));

        return metaTagsList;

        // return createElement('head', {}, metaTagsList);
    }

    get body() {
        var child = '';

        if (this.status != null) {
            child = createElement(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': this.status,  fullScreen: '' }, '');
        }

        return child;
        
        // return createElement('body', {}, child);
    }

    constructor(baseUrl) {
        this.siteName = 'Statuspage';
        this.imgUrl = null; 
        this.canonicalUrl = null;
        this.author = null;
        this.keywords = [];

        this.status = null;

        this.fetchStatuspageData(baseUrl);
    }

    async fetchStatuspageData(baseUrl) {
        const json = await (await fetch(`${baseUrl}api/v2/status.json`)).json();

        this.siteName = json.page.name;
        this.status = 'status' in json && 'indicator' in json.status
            ? json.status.indicator
            : StatuspageDictionary.StatusEnums.error;
    }

    renderHTML() {
        // while (this.status == null) { }
        render(this.head, document.head);
        render(this.body, document.body);
    }

    static updateTitle(siteName) {
        document.title = `${StatuspageDictionary.StatuspageHTMLTemplates.template_title_index} | Preact`.replace(StatuspageDictionary.replaceableStringValue, siteName);
    }

    static async renderStatus(baseUrl) {
        const json = await (await fetch(`${baseUrl}api/v2/status.json`)).json();

        this.updateTitle(json.page.name);

        var status = 'status' in json && 'indicator' in json.status
            ? json.status.indicator
            : StatuspageDictionary.StatusEnums.error;

        var vdom = createElement(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': status,  fullScreen: '' }, '');
        render(vdom, document.body);
    }
}

// var status = StatuspageWebComponents.Status.toHTML(StatuspageDictionary.StatusEnums.good, true);
// document.body.appendChild(status);
// console.log(status);

const baseUrl = 'https://www.cloudflarestatus.com/';
const route = 'api/v2/status.json';
// StatuspagePreact.renderStatus(baseUrl);

var preact = new StatuspagePreact(baseUrl);

preact.author = 'rtsfred3';
preact.canonicalUrl = 'https://spstat.us/';
preact.imgUrl = 'https://spstat.us/img/maskable/144px.webp';
// preact.fetchStatuspageData(baseUrl);

console.log(preact);
console.log(preact.status);
console.log(preact.MetaTags);

// function RemoveCommentsAndFormatFromHTMLCollection(htmlCollection) {
//     return Array.from(htmlCollection)
//         .filter((node) => node.nodeType != document.COMMENT_NODE)
//         .filter((node) => node.nodeType != document.TEXT_NODE)
//         .map((node) => [new Text('\n\t\t'), node])
//         .flat();
// }

// function RemoveAllComments(doc) {
//     const headChildNodesNoComments = RemoveCommentsAndFormatFromHTMLCollection(doc.head.childNodes);
//     const bodyChildNodesNoComments = RemoveCommentsAndFormatFromHTMLCollection(doc.body.childNodes);
    
//     doc.head.replaceChildren(...headChildNodesNoComments, new Text('\n'));
//     doc.body.replaceChildren(...bodyChildNodesNoComments, new Text('\n'));

//     return doc;
// }

// const json = await (await fetch(`${baseUrl}${route}`)).json();

// var status = 'status' in json && 'indicator' in json.status
//     ? json.status.indicator
//     : StatuspageDictionary.StatusEnums.error;

// var vdomHead = createElement('head',
//     {},
//     ''
// );


// var vdom = createElement(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': status,  fullScreen: '' }, '');
// render(vdom, document.body);
// console.log(vdom);

//////////////////////////

// RemoveAllComments(document);

// var metaTags = StatuspageStaticHTML.MetaTagsList('https://spstat.us/img/maskable/144px.png', StatuspageDictionary.MetaColors[status], 'https://spstat.us/', 'rtsfred3');

// for (let child of metaTags) {
//     document.head.appendChild(child);
// }

// var staticHTMLTag = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': status, 'fullScreen': '' });
// console.log(staticHTMLTag);
// document.body.innerHTML = staticHTMLTag;