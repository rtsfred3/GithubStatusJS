class StatuspageStaticHTML {
    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} id 
     * @param {string} content 
     * @param {string} attr 
     * @returns {HTMLMetaElement}
     */
    static MetaTag(id, content, attr = "name") {
        var meta = document.createElement('meta');
        meta.setAttribute(attr, id);
        meta.content = content;
        return meta;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} id 
     * @param {string} content 
     * @param {string} attr 
     * @returns {string}
     */
    static MetaTagStr(id, content, attr = "name") {
        return this.TagStringAndAttributes('meta', { [attr]: id, "content": content });
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} id 
     * @param {string} content 
     * @returns {HTMLLinkElement}
     */
    static LinkTag(id, content) {
        var link = document.createElement('link');
        link.rel = id;
        link.href = content;

        if (id == "icon") { link.type = "image/x-icon"; }

        return link;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} id 
     * @param {string} content 
     * @returns {string}
     */
    static LinkTagStr(id, content) {
        var attr = { 'rel': id, "href": content };

        if (id == "icon") { attr.type = "image/x-icon"; }

        return this.TagStringAndAttributes('link', attr);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} src 
     * @returns {HTMLScriptElement}
     */
    static ScriptTag(src) {
        var script = document.createElement('script');
        script.src = src;
        return script;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} src 
     * @returns {string}
     */
    static ScriptSrcTagStr(src) {
        var attr = { 'src': src };
        return this.TagStringAndAttributes('script', attr);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} jsBody 
     * @returns {string}
     */
    static ScriptBodyTagStr(jsBody) {
        return this.TagStringAndAttributes('script', null, jsBody);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} styling 
     * @returns {string}
     */
    static EmbeddedStylesheet(styling) {
        return this.TagStringAndAttributes('style', null, styling);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {object} attr attributes object
     * @returns {string} string of attributes
     */
    static GenerateAttributes(attr) {
        var attributes = Object.entries(attr).map((attr) => attr[1] != null ? `${attr[0]}="${attr[1]}"` : `${attr[0]}`);
        return attributes.join(' ');
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} tag tag name
     * @param {object} attr attributes object
     * @returns {string} string of tag and attributes
     */
    static TagStringAndAttributes(tag, attr = null, child = null) {
        var attrs = attr != null ? ` ${this.GenerateAttributes(attr)}` : '';
        var childStr = child != null ? child : '';
        return `<${tag}${attrs}>${childStr}</${tag}>`;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} shortlink 
     * @param {string} text 
     * @param {boolean} inNewTab defaults to `false`
     * @returns {string}
     */
    static CreateAnchorTagHTML(shortlink, text, inNewTab = false) {
        var attrs = inNewTab ? { 'href': shortlink } : { 'href': shortlink, 'target': '_blank' };
        return StatuspageStaticHTML.TagStringAndAttributes('a', attrs, text);
    }

    /**
     * 
     * @param {string} imgUrl 
     * @param {string} themeColor 
     * @param {string} canonicalUrl 
     * @param {string} author 
     * @param {string[]} keywords 
     * @param {string} title 
     * @param {string} description 
     * @returns {object}
     */
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

    /**
     * 
     * @param {string} imgUrl 
     * @param {string} themeColor 
     * @param {string} canonicalUrl 
     * @param {string} author 
     * @param {string[]} keywords 
     * @param {string} title 
     * @param {string} description 
     * @returns {string[]}
     */
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


    /**
     * 
     * @param {string?} canonicalUrl 
     * @param {string?} iconUrl 
     * @param {string?} imgUrl 
     * @param {string?} prefetchStatuspageUrl 
     * @returns {object}
     */
    static LinkTagDictionary(canonicalUrl = null, iconUrl = null, imgUrl = null, prefetchStatuspageUrl = null) {
        return {
            "canonical": canonicalUrl,
            "icon": iconUrl,
            "apple-touch-icon": imgUrl,
            "dns-prefetch": prefetchStatuspageUrl,
            "preconnect": prefetchStatuspageUrl
        };
    }

    /**
     * 
     * @param {string?} canonicalUrl 
     * @param {string?} iconUrl 
     * @param {string?} imgUrl 
     * @param {string?} prefetchStatuspageUrl 
     * @returns {string[]}
     */
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

    /**
     * 
     * @param {string|string[]} head 
     * @returns {string}
     */
    static StaticHeadHTMLStr(head) {
        if (Array.isArray(head)) {
            return this.TagStringAndAttributes('head', null, `\n\t\t${head.join("\n\t\t")}\n\t`);
        } else {
            return this.TagStringAndAttributes('body', null, head);
        }
    }

    /**
     * 
     * @param {string} body 
     * @returns {string}
     */
    static StaticBodyHTMLStr(body) {
        return this.TagStringAndAttributes('body', { 'id': 'body' }, `\n\t\t${body}\n\t`);
    }

    /**
     * 
     * @param {string} head 
     * @param {string} body 
     * @returns {string}
     */
    static StaticBaseHTML(head, body) {
        return this.TagStringAndAttributes('html', null, `\n\t${head}\n\t${body}\n`);
    }

    /**
     * 
     * @param {string} status 
     * @param {boolean} fullScreen 
     * @returns 
     */
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

    /**
     * 
     * @param {string} status 
     * @param {string} iconUrl 
     * @param {string} imgUrl 
     * @param {string} siteName 
     * @param {string} pathName 
     * @param {string?} canonicalUrl 
     * @param {string?} author 
     * @param {string[]} keywords 
     * @param {string?} title 
     * @param {string?} description 
     * @param {string?} styling 
     * @returns 
     */
    static StaticHTMLString(status, iconUrl, imgUrl, siteName, canonicalUrl = null, author = null, keywords=[], title = null, description = null, styling = null, isBot = false, useCustomTag = false) {
        if (!(status in StatuspageDictionary.StatusEnums)) {
            status = StatuspageDictionary.StatusEnums.error;
        }

        if (isBot) {
            useCustomTag = false;
        }

        if (title == null) { title = siteName; }

        var themeColor = StatuspageDictionary.MetaColors[status];
        var headTagsList = [];

        var metaTagsList = this.MetaTagsStrList(imgUrl, themeColor, canonicalUrl, author, keywords, title, description);
        var linkTagsList = this.LinkTagStrList(canonicalUrl, iconUrl, imgUrl, null);

        headTagsList.push(...metaTagsList);
        headTagsList.push(...linkTagsList);
        
        headTagsList.push(this.TagStringAndAttributes('title', null, siteName));

        if (styling != null && !isBot) {
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

    /**
     * 
     * @param {string} iconUrl 
     * @param {string} imgUrl 
     * @param {string} siteName 
     * @param {string} pathName 
     * @param {string?} canonicalUrl 
     * @param {string?} author 
     * @param {string[]} keywords 
     * @param {string?} title 
     * @param {string?} description 
     * @param {string?} styling 
     * @returns 
     */
    static ErrorHTML(iconUrl, imgUrl, siteName, canonicalUrl = null, author = null, keywords=[], title = null, description = null, styling = null, isBot = false, useCustomTag = false) {
        if (title == null) { title = `${siteName} | Error`; }

        return this.StaticHTMLString(StatuspageDictionary.StatusEnums.error, iconUrl, imgUrl, siteName, canonicalUrl, author, keywords, title, description, styling, isBot, useCustomTag);
    }

    /**
     * 
     * @param {string} iconUrl 
     * @param {string} imgUrl 
     * @param {string} siteName 
     * @param {string} pathName 
     * @param {string?} canonicalUrl 
     * @param {string?} author 
     * @param {string[]} keywords 
     * @param {string?} title 
     * @param {string?} description 
     * @param {string?} styling 
     * @returns 
     */
    static LoadingHTML(iconUrl, imgUrl, siteName, canonicalUrl = null, author = null, keywords=[], title = null, description = null, styling = null, isBot = false, useCustomTag = false) {
        return this.StaticHTMLString(StatuspageDictionary.StatusEnums.loading, iconUrl, imgUrl, siteName, canonicalUrl, author, keywords, title, description, styling, isBot, useCustomTag);
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

// var styling = ':root{--good:#339966;--none:var(--good);--minor:#DBAB09;--major:#E25D10;--critical:#DC3545;--maintenance:#0366D6;--loading:#4F93BD;--unavailable:var(--loading);--error:#646464;--font:var(--error);--incident-good:var(--good);--incident-none:#000000;--incident-minor:#F1C40F;--incident-major:#FF9900;--incident-critical:#990000;--incident-maintenance:var(--maintenance);--incident-error:var(--error);--good-text:"good";--none-text:var(--good-text);--minor-text:"minor";--major-text:"major";--critical-text:"critical";--maintenance-text:"maintenance";--loading-text:"loading";--unavailable-text:"unavailable";--error-text:"error"}*{margin:0;padding:0}body{font-family:arial}[capitalize]{text-transform:capitalize}.fullScreen,.statuspage-status:has(.fullScreen),:has(.fullScreen),[fullScreen],statuspage-error,statuspage-loading,statuspage-unavailable{height:100vh}.statuspage-status:not(.fullScreen),statuspage-component,statuspage-status{height:240px}.statuspage-status,statuspage-component,statuspage-error,statuspage-loading,statuspage-status,statuspage-unavailable{width:100vw;text-align:center;justify-content:center;align-items:center;display:block;display:flex;font-size:48pt}.statuspage-status[data-status]::before,statuspage-error::before,statuspage-loading::before,statuspage-status[data-status]::before,statuspage-unavailable::before{content:attr(data-status);text-transform:uppercase;font-weight:700;color:#fff}statuspage-component[data-message]::before{content:attr(data-message);font-weight:700;color:#fff}.statuspage-status[data-status=good]::before,.statuspage-status[data-status=none]::before,statuspage-status[data-status=good]::before,statuspage-status[data-status=none]::before{content:var(--good-text)}statuspage-loading::before{content:var(--loading-text)}statuspage-unavailable::before{content:var(--unavailable-text)}statuspage-error::before{content:var(--error-text)}@media only screen and (max-height:400px){.statuspage-status:not(.fullScreen),statuspage-status{height:45vh}}@media only screen and (max-width:320px) and (max-height:320px){.statuspage-status:not(.fullScreen),statuspage-status{height:100vh}}@media only screen and (min-width:2048px) and (min-height:1080px){.statuspage-status:not(.fullScreen),statuspage-status{height:30vh}.statuspage-status,statuspage-error,statuspage-loading,statuspage-status,statuspage-unavailable{font-size:12em}}@media only screen and (((min-width:2100px) and (min-height:1100px)) or ((min-width:3000px) and (min-height:2000px))){.statuspage-status:not(.fullScreen),statuspage-status{height:40vh}.statuspage-status,statuspage-error,statuspage-loading,statuspage-status,statuspage-unavailable{font-size:16em}}[data-status=good],[data-status=none]{background-color:var(--none)}[data-status=minor]{background-color:var(--minor)}[data-status=major]{background-color:var(--major)}[data-status=critical]{background-color:var(--critical)}[data-status=maintenance]{background-color:var(--maintenance);font-weight:500}[data-status=loading],[data-status=unavailable],statuspage-loading,statuspage-unavailable{background-color:var(--loading)}[data-status=error],statuspage-error{background-color:var(--error)}@media only screen and (min-width:351px) and (max-width:450px){[data-status=maintenance]{font-size:36pt}}@media only screen and (min-width:251px) and (max-width:350px){[data-status=maintenance]{font-size:30pt}}@media only screen and (min-width:151px) and (max-width:250px){[data-status=maintenance]{font-size:20pt}}';

// var statusHTMLString = StatuspageStaticHTML.StaticHTMLString(StatuspageDictionary.StatusEnums.good , 'https://spstat.us/favicon.ico', 'https://spstat.us/img/maskable/144px.png', 'Cloudflare Status', 'https://spstat.us/', 'rtsfred3', [], null, 'Status of Cloudflare', styling);
// console.log(statusHTMLString);

// var error = StatuspageStaticHTML.ErrorHTML('https://spstat.us/favicon.ico', 'https://spstat.us/img/maskable/144px.png', 'Cloudflare Status', 'https://spstat.us/', 'rtsfred3', [], null, 'Status of Cloudflare', styling);
// console.log(error);

// var loading = StatuspageStaticHTML.LoadingHTML('https://spstat.us/favicon.ico', 'https://spstat.us/img/maskable/144px.png', 'Cloudflare Status', 'https://spstat.us/', 'rtsfred3', [], null, 'Status of Cloudflare', styling);
// console.log(loading);