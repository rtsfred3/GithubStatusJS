import StatuspageDictionary from './StatuspageDictionary.esm.js';
// import StatuspageStaticHTML from './StatuspageStaticHTML.esm.js';

export default class StatuspageDetails {
    imgUrl;
    iconUrl;
    canonicalUrl;
    prefetchStatuspageUrl = null;
    author;
    keywords = [];
    baseUrl;
    isBot = false;
    siteName = 'Statuspage';
    status = StatuspageDictionary.StatusEnums.loading;
    cssStyling;

    get themeColor() { return this.status != null ? StatuspageDictionary.MetaColors[this.status]  : StatuspageDictionary.MetaColors.loading; }
    
    get title() {  return StatuspageDictionary.StatuspageHTMLTemplates.template_title_index.replace(StatuspageDictionary.replaceableStringValue, this.siteName); }
    
    get description() { return StatuspageDictionary.StatuspageHTMLTemplates.template_descrisption.replace(StatuspageDictionary.replaceableStringValue, this.siteName); }

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

    get MetaTagsStr() { return ['<meta charset="utf-8">'].concat(this.MetaTagAttributes.map(e => `<meta ${e}>`)); }

    get LinkTagsDict() {
        return {
            "canonical": this.canonicalUrl,
            "icon": this.iconUrl,
            "apple-touch-icon": this.imgUrl,
            "dns-prefetch": this.prefetchStatuspageUrl ? this.prefetchStatuspageUrl : null,
            "preconnect": this.prefetchStatuspageUrl ? this.prefetchStatuspageUrl : null,
            "stylesheet": "../styling/github.amp.css"
        };
    }

    get LinkTagsStr() {
        return Object.entries(this.LinkTagsDict)
            .filter(([k, v]) => v != null && v != undefined)
            .map(([id, content]) => {
                var a = { rel: id, href: content };

                if (id == "icon") { a.type = "image/x-icon"; }

                return Object.entries(a).map((attr) => attr[1] != null ? `${attr[0]}="${attr[1]}"` : `${attr[0]}`).join(' ');
            })
            .map(e => `<link ${e}>`);
    }

    get headStr() {
        var list = this.MetaTagsStr.concat(this.LinkTagsStr).concat(`<title>${this.title}</title>`);

        if (this.cssStyling) { list = list.concat(`<style>${this.cssStyling}</style>`); }

        return list;
    }

    get headHTML() { return `<head>${this.headStr.join('')}</head>`; }

    get bodyStr() {
        var tag = StatuspageDictionary.HTMLTags.StatuspageStatus;
        return `<${tag} data-status="${this.status}" fullScreen></${tag}>`;
    }

    get bodyHTML() { return `<body id="body">${this.bodyStr}</body>`; }

    get fullHTML() { return `<!DOCTYPE html><html lang="en">${this.headHTML}${this.bodyHTML}</html>` }

    constructor(data) {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                this[key] = data[key];
            }
        }
    }
}