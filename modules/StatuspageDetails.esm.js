import StatuspageDictionary from './StatuspageDictionary.esm.js';

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
    _status = StatuspageDictionary.StatusEnums.loading;
    cssStyling;
    isMinified = true;

    get noIndent() { return this.isMinified ? '' : '\n'; }
    get singleIndent() { return this.isMinified ? '' : '\n\t'; }
    get doubleIndent() { return this.isMinified ? '' : '\n\t\t'; }

    set status(val) {
        if (val in StatuspageDictionary.StatusEnums) {
            if (val == StatuspageDictionary.StatusEnums.none) {
                this._status = StatuspageDictionary.StatusEnums.good;
            } else {
                this._status = val;
            }
        } else {
            this._status = StatuspageDictionary.StatusEnums.error;
        }
    }

    get status() { return this._status }

    get themeColor() { return this._status != null ? StatuspageDictionary.MetaColors[this._status] : StatuspageDictionary.MetaColors.loading; }
    
    get title() {  return StatuspageDictionary.StatuspageHTMLTemplates.template_title_index.replace(StatuspageDictionary.replaceableStringValue, this.siteName); }
    
    get description() { return StatuspageDictionary.StatuspageHTMLTemplates.template_descrisption.replace(StatuspageDictionary.replaceableStringValue, this.siteName); }

    get statusUrl() { return this.baseUrl ? new URL('/api/v2/status.json', this.baseUrl) : null; }

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
            "preconnect": this.prefetchStatuspageUrl ? this.prefetchStatuspageUrl : null
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

    get headHTML() { return this.singleIndent + `<head>${this.doubleIndent}${this.headStr.join(this.doubleIndent)}${this.singleIndent}</head>`; }

    get bodyStr() {
        var tag = StatuspageDictionary.HTMLTags.StatuspageStatus;
        return `<${tag} data-status="${this._status}" fullScreen></${tag}>`;
    }

    get bodyHTML() { return `${this.singleIndent}<body id="body">${this.doubleIndent}${this.bodyStr}${this.singleIndent}</body>`; }

    get fullHTML() { return `<!DOCTYPE html>${this.noIndent}<html lang="en">${this.headHTML}${this.bodyHTML}${this.noIndent}</html>` }

    get toJSON() {
        const tmp = Object.getOwnPropertyNames(this).filter(e => !['constructor', 'toJSON'].includes(e));
        const dict = tmp.map(e => [e, this[e]]);
        return Object.fromEntries(dict);
    }

    get statusFile() { return new File([this.fullHTML], 'index.html', { type: 'text/html' }); }

    constructor(data) {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                this[key] = data[key];
            }
        }
    }

    async fetchStatus(){
        if (!this.statusUrl) { return; }

        const resp = await fetch(this.statusUrl);
        const json = await resp.json();

        if (json.status && json.status.indicator) {
            this.status = json.status.indicator;
        }

        if (json.page && json.page.name) {
            this.siteName = json.page.name;
        }
    }
}