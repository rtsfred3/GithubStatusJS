class StatuspageDictionary {
    static get SiteNameValue() { return '{{SiteName}}'; }
    
    static get replaceableStringValue() { return '{}'; }
    
    static get StatuspageHTMLTemplates() {
        var templates = {
            template_title_index: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status`,
            template_title_status: `(Unofficial) Mini ${StatuspageDictionary.replaceableStringValue} Status`,
            template_title_components: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status Components`,
            template_title_amp: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status AMP`,
            template_title_maintenance: `Under Maintenance`,
            template_title_error: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status - Error`,
            template_descrisption: `An unofficial website to monitor ${StatuspageDictionary.replaceableStringValue} status updates.`,
        };

        templates[this.PathNames.Index] = templates.template_title_index.replace(this.replaceableStringValue, this.SiteNameValue);
        templates[this.PathNames.Status] = templates.template_title_status.replace(this.replaceableStringValue, this.SiteNameValue);
        templates[this.PathNames.Components] = templates.template_title_components.replace(this.replaceableStringValue, this.SiteNameValue);
        templates[this.PathNames.Amp] = templates.template_title_amp.replace(this.replaceableStringValue, this.SiteNameValue);
        templates[this.PathNames.Maintenance] = templates.template_title_maintenance.replace(this.replaceableStringValue, this.SiteNameValue);
        templates[this.PathNames.Error] = templates.template_title_error.replace(this.replaceableStringValue, this.SiteNameValue);
        templates[this.PathNames.Description] = templates.template_descrisption.replace(this.replaceableStringValue, this.SiteNameValue);

        return Object.freeze(templates);
    }

    static get StatusEnums() {
        return Object.freeze({
            good: "good",
            minor: "minor",
            major:'major',
            critical: 'critical',
            error: 'error',
            maintenance: 'maintenance',
            unavailable: 'unavailable',
            loading: 'loading',
            none: 'none',
            resolved: 'resolved',
            operational: 'operational',
            degraded_performance: 'degraded_performance',
            partial_outage: 'partial_outage',
            major_outage: 'major_outage',
            under_maintenance: 'under_maintenance'
        });
    }
    
    static get MetaColors() {
        return Object.freeze({
            none: '#339966',
            minor: '#DBAB09',
            major: '#E25D10',
            critical: '#DC3545',
            unavailable: '#4F93BD',
            error: '#646464',
            maintenance: '#0366D6',
            psa: '#D83D42',

            get good() { return this.none; },
            get under_maintenance() { return this.maintenance; },
            get loading() { return this.unavailable; },

            get operational(){ return this.none; },
            get degraded_performance(){ return this.minor; },
            get partial_outage(){ return this.major; }
        });
    }

    static get IndicatorVals() {
        return Object.freeze({
            good: StatuspageDictionary.StatusEnums.good,
            minor: StatuspageDictionary.StatusEnums.minor,
            major: StatuspageDictionary.StatusEnums.major,
            critical: StatuspageDictionary.StatusEnums.critical,
            error: StatuspageDictionary.StatusEnums.error,
            maintenance: StatuspageDictionary.StatusEnums.maintenance,
            unavailable: StatuspageDictionary.StatusEnums.unavailable,
            loading: StatuspageDictionary.StatusEnums.loading,

            get resolved() { return this.good; },
            get none() { return this.good; },
            get operational() { return this.good; },

            get degraded_performance() { return this.minor; },
            get partial_outage() { return this.major; },
            get major_outage() { return this.critical; },
            get under_maintenance() { return this.maintenance; }
        });
    }
    
    static get IndicatorMessages() {
        return Object.freeze({
            resolved: StatuspageDictionary.StatusEnums.good,
            minor: StatuspageDictionary.StatusEnums.minor,
            major: StatuspageDictionary.StatusEnums.major,
            critical: StatuspageDictionary.StatusEnums.critical
        });
    }

    static get Paths() {
        return Object.freeze({
            [this.PathNames.Index]: '/',
            [this.PathNames.Status]: '/status/',
            [this.PathNames.Components]: '/components/',
            [this.PathNames.Amp]: '/amp/'
        });
    }

    static get PathNames() {
        return Object.freeze({
            Index: 'Index',
            Status: 'Status',
            Component: 'Component',
            Components: 'Components',
            Amp: 'Amp',
            Maintenance: 'Maintenance',
            Error: 'Error',
            Description: 'Description'
        });
    }
}

class StatuspageHTMLElements {
    // static get ErrorHTMLElement(){
    //     var status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
    //     status.setAttribute('status', StatuspageDictionary.StatusEnums.error);
    //     status.setAttribute('fullScreen', '');
    //     return status;
    // }
    
    // static get LoadingHTMLElement(){
    //     var status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
    //     status.setAttribute('status', StatuspageDictionary.StatusEnums.loading);
    //     status.setAttribute('fullScreen', '');
    //     return status;
    // }
    
    // static get AppHTMLElement(){
    //     const appElement = document.createElement("div");
    //     appElement.setAttribute('id', 'app');
    //     return appElement;
    // }
    
    // static get AppLoadingHTMLElement() {
    //     var app = StatuspageHTMLElements.AppHTMLElement;
    //     app.appendChild(StatuspageHTMLElements.LoadingHTMLElement);
    //     app.firstElementChild.setAttribute('id', 'status');
    //     return app;
    // }
    
    // static get AppErrorHTMLElement() {
    //     var app = StatuspageHTMLElements.AppHTMLElement;
    //     app.appendChild(StatuspageHTMLElements.ErrorHTMLElement);
    //     return app;
    // }
    
    // static NoIncidentsElement(siteName) {
    //     const emptyIncidents = document.createElement("div");
    //     emptyIncidents.classList.add("messages-empty");
    
    //     const emptyIncidentsFirstChild = document.createElement("div");
    //     const emptyIncidentsSecondChild = document.createElement("div");
        
    //     emptyIncidentsFirstChild.classList.add('messages-empty-all-good');
    //     emptyIncidentsSecondChild.classList.add('messages-empty-body');
        
    //     // emptyIncidentsFirstChild.appendChild(document.createTextNode("All good."));
    
    //     emptyIncidentsSecondChild.appendChild(document.createTextNode(`Nothing to see here folks. Looks like ${siteName} is up and running and has been stable for quite some time.`));
    //     emptyIncidentsSecondChild.appendChild(document.createElement("br"));
    //     emptyIncidentsSecondChild.appendChild(document.createElement("br"));
    //     emptyIncidentsSecondChild.appendChild(document.createTextNode("Now get back to work!"));
    
    //     emptyIncidents.appendChild(emptyIncidentsFirstChild);
    //     emptyIncidents.appendChild(emptyIncidentsSecondChild);

    //     return emptyIncidents;
    // }

    static GetStatusJson(indicator) {
        return { status: { indicator: indicator in StatuspageDictionary.StatusEnums ? indicator : StatuspageDictionary.StatusEnums.error } };
    }

    static StatusHTMLElement(status, fullStatus=false, _id="status", message=null){
        if(typeof(status) != "string" && typeof(status) != "object"){
            console.error(`Invaid parameter - ${typeof(status)}`);
            return document.createElement("div");
        }

        if(typeof(status) == "object" && 'id' in status && 'name' in status){
            return StatuspageHTMLElements.StatusHTMLElement(status.status, false, status.id, status.name);
        }

        if(typeof(status) == "object" && 'status' in status && 'indicator' in status.status){
            return StatuspageHTMLElements.StatusHTMLElement(status.status.indicator, fullStatus);
        }

        if (Object.keys(status).includes('val')) {
            return StatuspageHTMLElements.StatusHTMLElement(status['val'], fullStatus);
        }

        if (typeof status != 'string') {
            console.error(typeof status != 'string');
            return document.createElement("div");
        }

        const statusElement = document.createElement("div");

        statusElement.setAttribute("id", _id);
        statusElement.classList.add('min', 'status-width');
        // statusElement.style.fontWeight = "bold";
        // statusElement.style.color = "white";
        // statusElement.style.backgroundColor = StatuspageDictionary.MetaColors[status];

        if (message == null) {
            var heightArray = fullStatus ? [ 'full-status-height' ] : [ 'status-height', 'status-shadow' ];

            statusElement.setAttribute("data-status", status.toLowerCase());
            statusElement.classList.add(...heightArray);
            statusElement.classList.add('center-status');
        } else {
            statusElement.classList.add('component-height');
            
            const centerStatusDivElement = document.createElement("span");
            centerStatusDivElement.classList.add('center-status');
            centerStatusDivElement.setAttribute('data-message', message);
        
            statusElement.appendChild(centerStatusDivElement);
        }
        
        return statusElement;
    }
    
    /**
     * 
     * @param {string} id 
     * @returns {HTMLLinkElement}
     */
    static GetLinkTag(id) {
        let linkTagsArr = Array.from(document.getElementsByTagName("link"));
        return linkTagsArr.find((mTag) => mTag.getAttribute("rel") == id);
    }

    /**
     * 
     * @param {string|Array} id 
     * @param {string} value 
     */
    static SetLinkTag(id, value) {
        if (typeof id == 'string') {
            if (StatuspageHTMLElements.GetLinkTag(id) != undefined) {
                StatuspageHTMLElements.GetLinkTag(id).setAttribute("href", value);
            } else {
                var head = document.getElementsByTagName("head");
                if (head.length > 0) {
                    head[0].appendChild(this.LinkTag(id, value));
                }
            }
        } else if(Array.isArray(id)) {
            for(var i = 0; i < id.length; i++){
                StatuspageHTMLElements.SetLinkTag(id[i], value);
                // StatuspageHTMLElements.GetLinkTag(id[i]).setAttribute("href", value);
            }
        }
    }

    /**
     * 
     * @param {string} id 
     * @returns {HTMLMetaElement}
     */
    static GetMetaTag(id, attr = "name") {
        attr = id.startsWith('og:') ? 'property' : attr;

        let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
        return metaTagsArr.find((mTag) => mTag.hasAttribute(attr) && mTag.getAttribute(attr) == id);

        // return metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
    }

    /**
     * 
     * @param {string|Array} id 
     * @param {string} value 
     */
    static SetMetaTag(id, value, attr = "name") {
        if (typeof id == 'string') {
            if (StatuspageHTMLElements.GetMetaTag(id, attr) != undefined) {
                StatuspageHTMLElements.GetMetaTag(id, attr).setAttribute("content", value);
            } else {
                var head = document.getElementsByTagName("head");
                if (head.length > 0) {
                    head[0].appendChild(this.MetaTag(id, value));
                }
            }
        } else if(Array.isArray(id)) {
            for(var i = 0; i < id.length; i++){
                StatuspageHTMLElements.SetMetaTag(id[i], value, attr);
                // StatuspageHTMLElements.GetMetaTag(id[i]).setAttribute("content", value);
            }
        }
    }

    /**
     * 
     * @param {string} status 
     */
    static SetThemeColor(status) {
        var hexColor = StatuspageDictionary.MetaColors[status];
        StatuspageHTMLElements.SetMetaTag(["theme-color", "apple-mobile-web-app-status-bar-style"], hexColor);
    }

    static LinkTagValues(canonicalUrl, prefetchUrl, iconUrl, imgUrl){
        return {
            "canonical": canonicalUrl,
            "icon": iconUrl,
            "apple-touch-icon": imgUrl,
            "dns-prefetch": prefetchUrl,
            "preconnect": prefetchUrl
        };
    }
    
    static MetaTagValues(url, imgUrl, siteName, pathName, themeColor, author, keywords=[], additionalDescription = null, title = null, description = null) {
        if (title == null) {
            title = StatuspageDictionary.StatuspageHTMLTemplates[pathName].replace(StatuspageDictionary.SiteNameValue, siteName);
        }

        if (description == null) {
            description = StatuspageDictionary.StatuspageHTMLTemplates.template_descrisption.replace(StatuspageDictionary.replaceableStringValue, siteName);
        }

        if (additionalDescription != null) {
            description = description == null ? additionalDescription : `${description} ${additionalDescription}`;
        }

        return {
            "author": author,
            "application-name": title,
            "theme-color": themeColor,
            "description": description,
            "keywords": keywords.join(', '),

            "og:site_name": title,
            "og:title": title,
            "og:description": description,
            "og:type": "website",
            "og:url": url,
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
    
    static UpdateMetaTagValues(url, imgUrl, siteName, pathName, themeColor, author, keywords=[], additionalDescription = null) {
        var metaTagVals = StatuspageHTMLElements.MetaTagValues(url, imgUrl, siteName, pathName, themeColor, author, keywords, additionalDescription);

        for (const [key, value] of Object.entries(metaTagVals)) {
            StatuspageHTMLElements.SetMetaTag(key, value);

            if (key == 'description') {
                StatuspageHTMLElements.SetMetaTag(key, value, 'itemprop');
            }
        }

        // StatuspageHTMLElements.SetMetaTag('description', metaTagVals['description'], 'itemprop');
        StatuspageHTMLElements.SetMetaTag('image', imgUrl, 'itemprop');
    }
    
    static MetaTag(id, content, attr = "name"){
        var meta = document.createElement('meta');
        meta.setAttribute(attr, id);
        meta.content = content;
        return meta;
    }

    /**
     * 
     * @param {string} id 
     * @param {string} content 
     * @returns {HTMLLinkElement}
     */
    static LinkTag(id, content){
        var link = document.createElement('link');
        link.rel = id;
        link.href = content;

        if (id == "icon") { link.type = "image/x-icon"; }

        return link;
    }

    /**
     * 
     * @param {string} canonicalUrl 
     * @param {string} prefetchUrl 
     * @param {string} iconUrl 
     * @param {string} imgUrl 
     */
    static UpdateLinkTags(canonicalUrl, prefetchUrl, iconUrl, imgUrl){
        var linkTagVals = StatuspageHTMLElements.LinkTagValues(canonicalUrl, prefetchUrl, iconUrl, imgUrl);

        for (const [key, value] of Object.entries(linkTagVals)) {
            StatuspageHTMLElements.SetLinkTag(key, value);
        }

        // StatuspageHTMLElements.SetLinkTag("canonical", canonicalUrl);
        // StatuspageHTMLElements.SetLinkTag("icon", iconUrl);
        // StatuspageHTMLElements.SetLinkTag("apple-touch-icon", imgUrl);
        // StatuspageHTMLElements.SetLinkTag("dns-prefetch", prefetchUrl);
        // StatuspageHTMLElements.SetLinkTag("preconnect", prefetchUrl);
    }

    /**
     * 
     * @param {string} canonicalUrl 
     * @param {string} prefetchUrl 
     * @param {string} iconUrl 
     * @param {string} imgUrl 
     * @returns {HTMLLinkElement[]}
     */
    static LinkTagElements(canonicalUrl, prefetchUrl, iconUrl, imgUrl){
        var linkTagVals = StatuspageHTMLElements.LinkTagValues(canonicalUrl, prefetchUrl, iconUrl, imgUrl);

        var linkTagElements = [];

        for (const [k, v] of Object.entries(linkTagVals)) {
            linkTagElements.push(StatuspageHTMLElements.LinkTag(k, v));
        }

        return linkTagElements;
    }
    
    static MetaTagsHTMLElements(canonicalUrl, imgUrl, siteName, pathName, themeColor, author, keywords=[], additionalDescription = null){
        var metaTagVals = StatuspageHTMLElements.MetaTagValues(canonicalUrl, imgUrl, siteName, pathName, themeColor, author, keywords, additionalDescription);

        var metaTagElements = [];

        for(const [k, v] of Object.entries(metaTagVals)){
            metaTagElements.push(StatuspageHTMLElements.MetaTag(k, v, k.includes('og:') ? "property" : "name"));
        }

        return metaTagElements;
    }


    static UpdateUrlTags(canonicalUrl) {
        StatuspageHTMLElements.SetLinkTag("canonical", canonicalUrl);
        StatuspageHTMLElements.SetMetaTag("og:url", canonicalUrl);
    }

    static HeadElement(canonicalUrl, prefetchUrl, iconUrl, imgUrl, siteName, pathName, themeColor, author, keywords=[], additionalDescription = null) {
        var head = document.createElement('head');

        var linkElements = StatuspageHTMLElements.LinkTagElements(canonicalUrl, prefetchUrl, iconUrl, imgUrl);
        var metaElements = StatuspageHTMLElements.MetaTagsHTMLElements(canonicalUrl, imgUrl, siteName, pathName, themeColor, author, keywords, additionalDescription);

        for(let link of linkElements){
            head.appendChild(link);
        }

        for(let meta of metaElements){
            head.appendChild(meta);
        }

        var titleElement = document.createElement('title');
        titleElement.innerHTML = StatuspageDictionary.StatuspageHTMLTemplates[pathName].replace(StatuspageDictionary.SiteNameValue, siteName);
        head.append(titleElement);

        return head;
    }
}

class StatuspageWebComponents {
    static get Status() {
        return class extends HTMLElement {
            constructor() { super(); }
        
            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Status.is}`);

                StatuspageHTMLElements.UpdateUrlTags(location.href);

                var isFullScreen = this.hasAttribute('fullScreen');
                var autoRefresh = this.hasAttribute('autoRefresh');

                this.refreshTimer = autoRefresh && this.getAttribute('autoRefresh') != ''
                    ? parseInt(this.getAttribute('autoRefresh'))
                    : 5;

                if (autoRefresh) {
                    console.log(`Refresh Interval: ${this.refreshTimer} minutes`);
                }

                this.setAttribute('data-status', StatuspageDictionary.StatusEnums.loading);
                this.setAttribute('fullScreen', '');
                this.setThemeMetaTags(StatuspageDictionary.StatusEnums.loading);

                this.status = this.hasAttribute('status') && this.getAttribute('status') in StatuspageDictionary.StatusEnums
                    ? this.getAttribute('status')
                    : StatuspageDictionary.StatusEnums.error;
        
                this.fullScreen = this.hasAttribute('status') || this.hasAttribute('data-url')
                    ? isFullScreen
                    : true;

                if (this.hasAttribute('data-url')) {
                    if (navigator.onLine) {
                        this.url = this.getAttribute('data-url');
                        this.removeAttribute('data-url');
                        this.fetchStatus(this.url);

                        if (autoRefresh) {
                            setInterval(() => { this.fetchStatus(this.url); }, this.refreshTimer * 60 * 1000);
                        }
                    } else {
                        this.setThemeMetaTags(StatuspageDictionary.StatusEnums.error);
                        this.parseStatus(StatuspageDictionary.StatusEnums.error, this.fullScreen);
                    }
                } else {
                    this.setThemeMetaTags(this.status);
                    this.parseStatus(this.status, this.fullScreen);
                }

                console.log(`Finished ${StatuspageWebComponents.Status.is}`);
            }

            fetchStatus(url) {
                return new Promise((res, rej) => {
                    var baseUrl = url.slice(-1) == '/' ? url.substring(0, url.length - 1) : url;
                    
                    if (navigator.onLine) {
                        fetch(baseUrl + '/api/v2/status.json')
                            .then(data => data.json())
                            .then((json) => {
                                /* if ('page' in json && 'name' in json.page) {
                                    StatuspageHTMLElements.UpdateMetaTagValues(location.href, "https://spstat.us/img/status/lowres/min/status-min-good.png", json.page.name, StatuspageDictionary.PathNames.Index, StatuspageDictionary.MetaColors.loading, "rtsfred3", [`${json.page.name} Status`], `${json.page.name}'s Current Status: ${json.status.indicator}`)
                                } */

                                if ('status' in json) {
                                    this.setThemeMetaTags(json.status.indicator);
                                    this.parseStatus(json.status.indicator, this.fullScreen);
                                } else {
                                    this.setThemeMetaTags(StatuspageDictionary.StatusEnums.error);
                                    this.parseStatus(StatuspageDictionary.StatusEnums.error, true);
                                }
                                
                                res();
                            }).catch((error) => {
                                this.setThemeMetaTags(StatuspageDictionary.StatusEnums.error);
                                this.parseStatus(StatuspageDictionary.StatusEnums.error, true);
                                rej(error);
                            });
                    }
                })
            }

            setThemeMetaTags(status) { StatuspageHTMLElements.SetThemeColor(status); }

            parseStatus(status, fullScreen) {
                console.log(status, fullScreen);

                StatuspageHTMLElements.SetThemeColor(status);
                this.setAttribute('data-status', status);

                if (fullScreen) {
                    this.setAttribute('fullScreen', '');
                } else {
                    this.removeAttribute('fullScreen');
                }
                
                if (this.hasAttribute('status')) {
                    this.removeAttribute('status');
                }
            }
        
            static get is() { return 'statuspage-status'; }
        }
    }
}

customElements.define(StatuspageWebComponents.Status.is, StatuspageWebComponents.Status);