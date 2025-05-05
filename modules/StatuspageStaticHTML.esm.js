import { StatuspageDictionary } from './StatuspageDictionary.esm.js';

export default class StatuspageStaticHTML {
    static MetaTag(id, content, attr = "name") {
        var meta = document.createElement('meta');
        meta.setAttribute(attr, id);
        meta.content = content;
        return meta;
    }

    static MetaTagStr(id, content, attr = "name") {
        return this.TagStringAndAttributes('meta', { [attr]: id, "content": content });
    }

    static LinkTag(id, content) {
        var link = document.createElement('link');
        link.rel = id;
        link.href = content;

        if (id == "icon") { link.type = "image/x-icon"; }

        return link;
    }

    static LinkTagStr(id, content) {
        var attr = { 'rel': id, "href": content };

        if (id == "icon") { attr.type = "image/x-icon"; }

        return this.TagStringAndAttributes('link', attr);
    }

    static ScriptTag(src) {
        var script = document.createElement('script');
        script.src = src;
        return script;
    }

    static ScriptSrcTagStr(src) {
        var attr = { 'src': src };
        return this.TagStringAndAttributes('script', attr);
    }

    static ScriptBodyTagStr(jsBody) {
        return this.TagStringAndAttributes('script', null, jsBody);
    }

    static EmbeddedStylesheet(styling) {
        return this.TagStringAndAttributes('style', null, styling);
    }

    static GenerateAttributes(attr) {
        var attributes = Object.entries(attr).map((attr) => attr[1] != null ? `${attr[0]}="${attr[1]}"` : `${attr[0]}`);
        return attributes.join(' ');
    }

    static TagStringAndAttributes(tag, attr = null, child = null) {
        var attrs = attr != null ? ` ${this.GenerateAttributes(attr)}` : '';
        var childStr = child != null ? child : '';
        return `<${tag}${attrs}>${childStr}</${tag}>`;
    }

    static CreateAnchorTagHTML(shortlink, text, inNewTab = false) {
        var attrs = inNewTab ? { 'href': shortlink } : { 'href': shortlink, 'target': '_blank' };
        return StatuspageStaticHTML.TagStringAndAttributes('a', attrs, text);
    }

    static MetaTagDictionary(imgUrl, themeColor, canonicalUrl = null, author = null, keywords=[], title = null, description = null) {
        return {
            "author": author,
            "application-name": title,
            "theme-color": themeColor,
            "description": description,
            "keywords": keywords != null && keywords.length > 0 ? keywords.join(', ') : null,

            "og:site_name": title,
            "og:title": title,
            "og:description": description,
            "og:type": "website",
            "og:url": canonicalUrl,
            "og:image": imgUrl,
            
            "twitter:card": "summary",
            "twitter:title": title,
            "twitter:description": description,
            "twitter:image": imgUrl,

            "mobile-web-app-capable": "yes",
            "apple-mobile-web-app-capable": "yes",
            "apple-mobile-web-app-status-bar-style": themeColor,
            "apple-mobile-web-app-title": title,
            "viewport": "width=device-width, initial-scale=1.0, user-scalable=0.0",
            "HandheldFriendly": "true",
        };
    }

    static MetaTagsStrList(imgUrl, themeColor, canonicalUrl = null, author = null, keywords=[], title = null, description = null) {
        var metaTagDictionary = this.MetaTagDictionary(imgUrl, themeColor, canonicalUrl, author, keywords, title, description);

        var metaTagElements = [];

        for(const [k, v] of Object.entries(metaTagDictionary)){
            if (v != null) {
                metaTagElements.push(this.MetaTagStr(k, v, k.includes('og:') ? "property" : "name"));
            }
        }

        return metaTagElements;   
    }

    static LinkTagDictionary(canonicalUrl = null, iconUrl = null, imgUrl = null, prefetchStatuspageUrl = null) {
        return {
            "canonical": canonicalUrl,
            "icon": iconUrl,
            "apple-touch-icon": imgUrl,
            "dns-prefetch": prefetchStatuspageUrl,
            "preconnect": prefetchStatuspageUrl
        };
    }

    static LinkTagStrList(canonicalUrl = null, iconUrl = null, imgUrl = null, prefetchStatuspageUrl = null, stylesheets = []) {
        var linkTagDictionary = this.LinkTagDictionary(canonicalUrl, iconUrl, imgUrl, prefetchStatuspageUrl);

        var linkTagElements = [];

        for (const [k, v] of Object.entries(linkTagDictionary)) {
            if (v != null) {
                linkTagElements.push(this.LinkTagStr(k, v));
            }
        }

        if (!this.isBot) {
            for (let stylesheet of stylesheets) {
                linkTagElements.push(this.LinkTagStr('stylesheet', stylesheet));
            }
        }

        return linkTagElements;
    }

    static StaticHeadHTMLStr(head) {
        if (Array.isArray(head)) {
            return this.TagStringAndAttributes('head', null, `\n\t\t${head.join("\n\t\t")}\n\t`);
        } else {
            return this.TagStringAndAttributes('body', null, head);
        }
    }

    static StaticBodyHTMLStr(body) {
        return this.TagStringAndAttributes('body', { 'id': 'body' }, `\n\t\t${body}\n\t`);
    }

    static StaticBaseHTML(head, body) {
        return this.TagStringAndAttributes('html', null, `\n\t${head}\n\t${body}\n`);
    }

    static StatusHTML(status, fullScreen = false) {
        if (!(status in StatuspageDictionary.StatusEnums)) {
            status = StatuspageDictionary.StatusEnums.error;
        }

        var attrs = {
            "id": "status",
            "data-status": status,
            "class": "statuspage-status"
        };

        if (fullScreen) { attrs["class"] += " fullScreen"; }

        return this.TagStringAndAttributes('div', attrs);
    }

    static CustomStatusHTML(status, fullScreen = false) {
        if (!(status in StatuspageDictionary.StatusEnums)) {
            status = StatuspageDictionary.StatusEnums.error;
        }

        var attrs = { "data-status": status };

        if (fullScreen) { attrs["fullScreen"] = null; }

        return this.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, attrs);
    }

    static StaticHTMLString(status, iconUrl, imgUrl, siteName, canonicalUrl = null, author = null, keywords=[], title = null, description = null, styling = null, useCustomTag = false) {
        if (!(status in StatuspageDictionary.StatusEnums)) {
            status = StatuspageDictionary.StatusEnums.error;
        }

        if (title == null) { title = siteName; }

        var themeColor = StatuspageDictionary.MetaColors[status];
        var headTagsList = [];

        var metaTagsList = this.MetaTagsStrList(imgUrl, themeColor, canonicalUrl, author, keywords, title, description);
        var linkTagsList = this.LinkTagStrList(canonicalUrl, iconUrl, imgUrl, null);

        headTagsList.push(...metaTagsList);
        headTagsList.push(...linkTagsList);
        
        headTagsList.push(this.TagStringAndAttributes('title', null, siteName));

        if (styling != null) {
            headTagsList.push(this.EmbeddedStylesheet(styling));
        }

        var bodyTag = useCustomTag ? this.CustomStatusHTML(status, true) : this.StatusHTML(status, true);

        if (status == StatuspageDictionary.StatusEnums.error && useCustomTag) {
            bodyTag = this.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageError);
        }
        if (status == StatuspageDictionary.StatusEnums.loading && useCustomTag) {
            bodyTag = this.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageLoading);
        }

        var head = this.StaticHeadHTMLStr(headTagsList);
        var body = this.StaticBodyHTMLStr(bodyTag);
        
        return this.StaticBaseHTML(head, body);
    }

    static ErrorHTML(iconUrl, imgUrl, siteName, canonicalUrl = null, author = null, keywords=[], title = null, description = null, styling = null, useCustomTag = false) {
        if (title == null) { title = `${siteName} | Error`; }

        return this.StaticHTMLString(StatuspageDictionary.StatusEnums.error, iconUrl, imgUrl, siteName, canonicalUrl, author, keywords, title, description, styling, useCustomTag);
    }

    static LoadingHTML(iconUrl, imgUrl, siteName, canonicalUrl = null, author = null, keywords=[], title = null, description = null, styling = null, useCustomTag = false) {
        return this.StaticHTMLString(StatuspageDictionary.StatusEnums.loading, iconUrl, imgUrl, siteName, canonicalUrl, author, keywords, title, description, styling, useCustomTag);
    }

    static get StaticHTML() {
        return class {
            /**
             * 
             * @param {string} iconUrl 
             * @param {string} imgUrl 
             * @param {string} siteName 
             * @param {string} pathName 
             * @param {string|undefined} canonicalUrl 
             * @param {string|undefined} statuspageUrl 
             * @param {string|undefined} author 
             * @param {string[]} keywords 
             * @param {string|undefined} additionalDescription 
             * @param {string|undefined} title 
             * @param {string|undefined} description 
             * @returns 
             */
            constructor(iconUrl, imgUrl, siteName, pathName = StatuspageDictionary.PathNames.Index, canonicalUrl = null, statuspageUrl = null, author = null, keywords=[], additionalDescription = null, title = null, description = null){
                this._status = StatuspageDictionary.StatusEnums.loading;

                this.canonicalUrl = canonicalUrl;
                this.statuspageUrl = statuspageUrl;
                this.iconUrl = iconUrl;
                this.imgUrl = imgUrl;
                this.pathName = pathName;
                this.statusPathName = pathName;
                this.author = author;
                this.keywords = keywords;

                this.trimWhitespace = false;

                this._siteName = siteName != null ? siteName : 'Statuspage';
                this._isBot = false;
                this._title = title;
                this._description = description;
                this._additionalDescription = additionalDescription;

                this._bodyTemplate = `<body id="body">${StatuspageDictionary.replaceableStringValue}</body>`;
            }

            get prefetchStatuspageUrl() { return this.statuspageUrl != null ? this.statuspageUrl.replace('https:', '') : null; }

            get title() { return this._title != null ? this._title : StatuspageDictionary.StatuspageHTMLTemplates[this.statusPathName].replace(StatuspageDictionary.replaceableStringValue, this.siteName); }
            
            get description() {
                if (this._description != null) {
                    return this._description;
                }

                var description = StatuspageDictionary.StatuspageHTMLTemplates.template_descrisption.replace(StatuspageDictionary.replaceableStringValue, this.siteName);

                if (this._additionalDescription != null) {
                    description = description == null ? this._additionalDescription : `${description} ${this._additionalDescription}`;
                }

                return description;
            }

            get themeColor() { return StatuspageDictionary.MetaColors[this._status]; }

            set status(val) {
                if (typeof val == 'string' && val in StatuspageDictionary.StatusEnums) {
                    this._status = val;
                }
            }

            get status() { return this._status; }

            set siteName(val) {
                if (typeof val == 'string') {
                    this._siteName = val;
                }
            }

            get siteName() { return this._siteName; }

            set isBot(val) {
                if (typeof val == 'boolean') {
                    this._isBot = val;
                }
            }

            get isBot() { return this._isBot; }
            
            get LinkTagValues() {
                return StatuspageStaticHTML.LinkTagDictionary(this.canonicalUrl, this.iconUrl, this.imgUrl, this.prefetchStatuspageUrl);
            }

            get Stylesheets() {
                return [ 'https://spstat.us/styling/main.min.css' ];
            }

            get Scripts() {
                return [ 'https://spstat.us/js/StatuspageHTML.js' ];
            }

            get MetaTagValues() {
                return StatuspageStaticHTML.MetaTagDictionary(this.imgUrl, this.themeColor, this.canonicalUrl, this.author, this.keywords, this.title, this.description)
            }
            
            get LinkTags() {
                var linkTagElements = [];

                for (const [k, v] of Object.entries(this.LinkTagValues)) {
                    if (v != null) {
                        linkTagElements.push(StatuspageStaticHTML.LinkTagStr(k, v));
                    }
                }

                if (!this.isBot) {
                    for (let stylesheet of this.Stylesheets) {
                        linkTagElements.push(StatuspageStaticHTML.LinkTagStr('stylesheet', stylesheet));
                    }
                }

                return linkTagElements;
            }

            get MetaTags() {

                var metaTagElements = [];

                for(const [k, v] of Object.entries(this.MetaTagValues)){
                    if (v != null) {
                        metaTagElements.push(StatuspageStaticHTML.MetaTagStr(v, k, k.includes('og:') ? "property" : "name"));
                    }
                }

                return metaTagElements;
            }

            get ScriptTags() {
                var scriptTagElements = [];

                if (this.isBot) { return scriptTagElements; }

                for (let script of this.Scripts) {
                    scriptTagElements.push(`<script ${StatuspageStaticHTML.GenerateAttributes({ 'src': script })}></script>`);
                }
                return scriptTagElements;
            }

            get TitleTag() { return `<title>${this.title}</title>`; }

            get Head() {
                var metaTags = `\n\t\t${this.MetaTags.join('\n\t\t')}`;
                var linkTags = `\n\t\t${this.LinkTags.join('\n\t\t')}`;
                var scriptTags = this.ScriptTags.length > 0 ? `\n\t\t${this.ScriptTags.join('\n\t\t')}` : '';
                var titleTag = `\n\t\t${this.TitleTag}`;

                return `<head>${metaTags}${linkTags}${scriptTags}${titleTag}\n\t</head>`;
            }

            get Body() {
                var child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageError);

                if (this.isBot) {
                    return this._bodyTemplate.replace(StatuspageDictionary.replaceableStringValue, '');
                }

                if (this.pathName == StatuspageDictionary.PathNames.Status) {
                    var attr = {};
                    
                    if (this.statuspageUrl != null) {
                        attr['data-url'] = this.statuspageUrl;
                    } else if (this.status != null) {
                        attr['data-status'] = this.status;
                    }

                    if (Object.keys(attr).length == 0) {
                        attr['data-status'] = StatuspageDictionary.StatusEnums.error;
                    }

                    attr['fullScreen'] = null;

                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, attr);
                }

                if (this.pathName == StatuspageDictionary.PathNames.Summary) {
                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageSummary, { 'data-url': this.statuspageUrl });
                }

                if (this.pathName == StatuspageDictionary.PathNames.Maintenance) {
                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': StatuspageDictionary.StatusEnums.maintenance, 'fullScreen': null });
                }

                if (this.pathName == StatuspageDictionary.PathNames.Unavailable) {
                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageUnavailable);
                }

                if (this.pathName == StatuspageDictionary.PathNames.Error) {
                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageError);
                }

                return this._bodyTemplate.replace(StatuspageDictionary.replaceableStringValue, child);
            }

            get HTML() { return `<html>\n\t${this.Head}\n\t${this.Body}\n</html>`; }

            get ErrorHTML() {
                this.pathName = StatuspageDictionary.PathNames.Error;
                return this.HTML;
            }

            get UnavailableHTML() {
                this.pathName = StatuspageDictionary.PathNames.Unavailable;
                return this.HTML;
            }

            get StatusBody() {
                var child = '';

                if (this.status in StatuspageDictionary.StatusEnums){
                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': this.status, 'fullScreen': null });
                }

                return this._bodyTemplate.replace(StatuspageDictionary.replaceableStringValue, `\n\t\t${child}\n\t`);
            }

            HTMLFromStatus(status) {
                this.status = status;

                var html = `<html>\n\t${this.Head}\n\t${this.StatusBody}\n</html>`;
                
                if (this.trimWhitespace) { html = html.replaceAll('\n', '').replaceAll('\t', ''); }

                return html;
            }
        }
    }
}