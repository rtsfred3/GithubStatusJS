import StatuspageDictionary from './StatuspageDictionary.esm.js';
import StatuspageStaticHTML from './StatuspageStaticHTML.esm.js';
// import sheet from '../styling/github.static.min.css' with { type: 'css' };
import sheet from 'github.amp.css' with { type: 'css' };

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

    get MetaTagAttributes() {
        return Object.entries(this.MetaTagsDict).map(([key, value]) => {
            var attrs = { [key.startsWith('og:') ? 'property' : 'name']: key, content: value };
            var attributes = Object.entries(attrs).map((attr) => attr[1] != null ? `${attr[0]}="${attr[1]}"` : `${attr[0]}`);
            return attributes.join(' ');
        });
    }

    get MetaTagStrings() {
        return ['<meta charset="utf-8">'].concat(this.MetaTagAttributes.map(e => `<meta ${e}>`));
    }

    get description() {
        return StatuspageDictionary.StatuspageHTMLTemplates.template_descrisption.replace(StatuspageDictionary.replaceableStringValue, this.siteName);
    }

    get title() { 
        return StatuspageDictionary.StatuspageHTMLTemplates.template_title_index.replace(StatuspageDictionary.replaceableStringValue, this.siteName);
    }

    get themeColor() { return this.status != null ? StatuspageDictionary.MetaColors[this.status]  : StatuspageDictionary.MetaColors.loading; }

    get cssStr() {
        return [...sheet.cssRules].map(e => e.cssText).join('');
    }

    get headStr() {
        return this.MetaTagStrings.concat(`<title>${this.title}</title>`).concat(`<style>${this.cssStr}</style>`).join('');
    }

    get bodyStr() {
        return StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': this.status, fullScreen: '' });
    }

    get bodyHTML() {
        return `<body id="body">${this.bodyStr}</body>`;
    }

    get statusHTML() {
        return `<!DOCTYPE html><html lang="en"><head>${this.headStr}</head><body>${this.bodyStr}</body></html>`;
    }

    constructor(baseUrl) {
        this.siteName = 'Statuspage';
        this.imgUrl = null; 
        this.canonicalUrl = null;
        this.author = null;
        this.keywords = [];

        this.status = StatuspageDictionary.StatusEnums.loading;

        this.fetchStatuspageData(baseUrl);
    }

    async fetchStatuspageData(baseUrl) {
        const json = await (await fetch(`${baseUrl}api/v2/status.json`)).json();

        this.siteName = json.page.name;
        this.status = 'status' in json && 'indicator' in json.status
            ? json.status.indicator
            : StatuspageDictionary.StatusEnums.error;
    }
}

const baseUrl = 'https://www.cloudflarestatus.com/';
const route = 'api/v2/status.json';

var preact = new StatuspagePreact(baseUrl);

preact.author = 'rtsfred3';
preact.canonicalUrl = 'https://spstat.us/';
preact.imgUrl = 'https://spstat.us/img/maskable/144px.webp';
// preact.fetchStatuspageData(baseUrl);

document.head.innerHTML = preact.headStr;
document.body.outerHTML = preact.bodyHTML;

// console.log(preact);
// console.log(preact.status);
// console.log(preact.cssStr);
// console.log(preact.headStr);
// console.log(preact.bodyStr);
// console.log(preact.statusHTML);
// console.log(preact.statusHTML.length);