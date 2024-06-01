/**
 * @typedef {object} StatuspageStatusResponse
 * @property {object} status
 * @property {string} status.indicator
 * @property {string} status.description
 * @property {object} page
 * @property {string} page.id
 * @property {string} page.name
 * @property {string} page.url
 * @property {string} page.updated_at
 */

class StatuspageDictionary {
    static get SiteNameValue() { return "{{SiteName}}"; }

    /**
     * @static
     * @readonly
     */
    static get replaceableStringValue() { return '{}'; }

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} template_title_index
     * @property {string} template_title_status
     * @property {string} template_title_components
     * @property {string} template_descrisption
     */
    static get StatuspageHTMLTemplates() {
        return {
            template_title_index: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status`,
            template_title_status: `(Unofficial) Mini ${StatuspageDictionary.replaceableStringValue} Status`,
            template_title_components: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status Components`,
            template_descrisption: `An unofficial website to monitor ${StatuspageDictionary.replaceableStringValue} status updates.`,
        };
    }

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} good
     * @property {string} minor
     * @property {string} major
     * @property {string} critical
     * @property {string} error
     * @property {string} maintenance
     * @property {string} unavailable
     * @property {string} loading
     * @property {string} none
     * @property {string} resolved
     * @property {string} operational
     * @property {string} degraded_performance
     * @property {string} partial_outage
     * @property {string} major_outage
     * @property {string} under_maintenance
     */
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

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} none
     * @property {string} minor
     * @property {string} major
     * @property {string} critical
     * @property {string} unavailable
     * @property {string} error
     * @property {string} maintenance
     * @property {string} psa
     * @property {string} good
     * @property {string} under_maintenance
     * @property {string} loading
     * @property {string} operational
     * @property {string} degraded_performance
     * @property {string} partial_outage
     */
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
    
    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} resolved
     * @property {string} minor
     * @property {string} major
     * @property {string} critical
     */
    static get IndicatorMessages() {
        return Object.freeze({
            resolved: StatuspageDictionary.StatusEnums.good,
            minor: StatuspageDictionary.StatusEnums.minor,
            major: StatuspageDictionary.StatusEnums.major,
            critical: StatuspageDictionary.StatusEnums.critical
        });
    }

    static get Paths() {
        var paths = {
            [this.PathNames.Index]: '/',
            [this.PathNames.Status]: '/status/',
            [this.PathNames.Component]: '/components/',
            [this.PathNames.Amp]: '/amp/'
        };

        paths[this.PathNames.Components] = paths[this.PathNames.Component];

        return Object.freeze(paths);
    }

    static get PathNames() {
        return Object.freeze({
            Index: 'Index',
            Status: 'Status',
            Component: 'Component',
            Components: 'Components',
            Amp: 'Amp',
            Maintenance: 'Maintenance',
            Error: 'Error'
        });
    }

    static get Titles() {
        var titles = {
            [this.PathNames.Index]: `(Unofficial) {{SiteName}} Status`,
            [this.PathNames.Status]: `(Unofficial) Mini {{SiteName}} Status`,
            [this.PathNames.Component]: `(Unofficial) {{SiteName}} Status Components`,
            [this.PathNames.Amp]: `(Unofficial) {{SiteName}} Status AMP`,
            [this.PathNames.Maintenance]: `Under Maintenance`,
            [this.PathNames.Error]: `(Unofficial) {{SiteName}} Status - Error`,
        };

        return Object.freeze(titles);
    }
}

class StatuspageHTMLElements {
    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get ErrorHTMLElement(){
        var status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
        status.setAttribute('status', StatuspageDictionary.StatusEnums.error);
        status.setAttribute('fullScreen', '');
        return status;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get LoadingHTMLElement(){
        var status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
        status.setAttribute('status', StatuspageDictionary.StatusEnums.loading);
        status.setAttribute('fullScreen', '');
        return status;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get AppHTMLElement(){
        const appElement = document.createElement("div");
        appElement.setAttribute('id', 'app');
        return appElement;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get AppLoadingHTMLElement() {
        var app = StatuspageHTMLElements.AppHTMLElement;
        app.appendChild(StatuspageHTMLElements.LoadingHTMLElement);
        app.firstElementChild.setAttribute('id', 'status');
        return app;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get AppErrorHTMLElement() {
        var app = StatuspageHTMLElements.AppHTMLElement;
        app.appendChild(StatuspageHTMLElements.ErrorHTMLElement);
        return app;
    }

    /**
     * 
     * @param {string} siteName 
     * @returns {HTMLDivElement}
     */
    static NoIncidentsElement(siteName) {
        const emptyIncidents = document.createElement("div");
        emptyIncidents.classList.add("messages-empty");
    
        const emptyIncidentsFirstChild = document.createElement("div");
        const emptyIncidentsSecondChild = document.createElement("div");
        
        emptyIncidentsFirstChild.classList.add('messages-empty-all-good');
        emptyIncidentsSecondChild.classList.add('messages-empty-body');
        
        // emptyIncidentsFirstChild.appendChild(document.createTextNode("All good."));
    
        emptyIncidentsSecondChild.appendChild(document.createTextNode(`Nothing to see here folks. Looks like ${siteName} is up and running and has been stable for quite some time.`));
        emptyIncidentsSecondChild.appendChild(document.createElement("br"));
        emptyIncidentsSecondChild.appendChild(document.createElement("br"));
        emptyIncidentsSecondChild.appendChild(document.createTextNode("Now get back to work!"));
    
        emptyIncidents.appendChild(emptyIncidentsFirstChild);
        emptyIncidents.appendChild(emptyIncidentsSecondChild);

        return emptyIncidents;
    }

    /**
     * 
     * @param {string} indicator dummy status
     * @returns {StatuspageStatusResponse} Returns a dummy Statuspage output that only contains `status.indicator`
     */
    static GetStatusJson(indicator) {
        return { status: { indicator: indicator in StatuspageDictionary.StatusEnums ? indicator : StatuspageDictionary.StatusEnums.error } };
    }

    /**
     * Creates a Status HTML Elemnent
     * 
     * @param {string|StatuspageStatusResponse} status The status of the page
     * @param {!boolean} [fullStatus=false] this will determine if the status page will fill the current view of the screen
     * @param {string} [_id=status]
     * @param {string} [message=null]
     * @returns {HTMLDivElement}
     */
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
     * Creates array of Component elements
     * 
     * @param {object} componentsJson
     * @returns {HTMLDivElement[]}
     */
    static ComponentsHTMLElement(componentsJson){
        var componentsArr = [];

        if (!(typeof(componentsJson) == "object" && 'components' in componentsJson)) { return componentsArr; }

        for (var i = 0; i < componentsJson.components.length; i++) {
            if (componentsJson.components[i].name.substring(0, 5) == 'Visit') { continue; }

            const component = document.createElement("statuspage-component");
            component.setAttribute('data-message', componentsJson.components[i].name);
            component.setAttribute('data-status', StatuspageDictionary.IndicatorVals[componentsJson.components[i].status]);

            const componentDiv = document.createElement("div");
            componentDiv.setAttribute("id", componentsJson.components[i].id)
            componentDiv.appendChild(component);

            componentsArr.push(componentDiv);

            // componentsArr.push(StatuspageHTMLElements.StatusHTMLElement(componentsJson.components[i]));
        }

        return componentsArr;
    }

    /**
     * Creates a incident update element
     * 
     * @param {string} incident_update_id 
     * @param {string} name 
     * @param {string} impact 
     * @param {string} status 
     * @param {string} body 
     * @param {Date} created_at 
     * @param {string} shortlink 
     * @param {boolean} isOldestStatus 
     * @param {boolean} _displayUTCTime 
     * @returns {HTMLSpanElement}
     */
    static MessageHTMLElement(incident_update_id, name, impact, status, body, created_at, shortlink, isOldestStatus, _displayUTCTime){
        var options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        var currImpact = (status == StatuspageDictionary.StatusEnums.resolved
            ? StatuspageDictionary.StatusEnums.good
            : impact);
        if (currImpact == undefined) { currImpact = StatuspageDictionary.IndicatorMessages[status]; }

        var date = new Date(created_at).toLocaleDateString("en-US", options);

        if (_displayUTCTime) {
            options = { month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' };
            var t_date = new Date(created_at);
            t_date = Date.UTC(t_date.getUTCFullYear(), t_date.getUTCMonth(), t_date.getUTCDate(), t_date.getUTCHours() + (t_date.getTimezoneOffset() / 60), t_date.getUTCMinutes(), t_date.getUTCSeconds());
            date = new Date(t_date).toLocaleDateString("en-US", options) + ' UTC';
        }

        const messageElement = document.createElement("span");
        messageElement.setAttribute("id", incident_update_id);

        // Creating status box
        const statusBoxElement = document.createElement("div");
        statusBoxElement.classList.add("status-box", 'message-status');
        // statusBoxElement.classList.add("status-box", 'message-status', `${currImpact}-message`);
        statusBoxElement.setAttribute('data-impact', currImpact);

        // Creating message & date
        const messageDateElement = document.createElement("div");
        messageDateElement.classList.add('text-margin');
        messageDateElement.appendChild(document.createTextNode(body));
        messageDateElement.appendChild(document.createElement("br"));

        const innerMessageDateElement = document.createElement("span");
        innerMessageDateElement.classList.add("date", "empty");
        innerMessageDateElement.appendChild(document.createTextNode(date));

        messageDateElement.appendChild(innerMessageDateElement);

        // Adding message elements to message element
        messageElement.appendChild(statusBoxElement);
        messageElement.appendChild(messageDateElement);

        return messageElement;
    }

    /**
     * Creates all incidents elements
     * 
     * @param {object} incidentsJson 
     * @param {number} [previousDays=7] 
     * @param {boolean} [displayUTCTime=false] 
     * @returns {HTMLDivElement}
     */
    static IncidentsHTMLElements(incidentsJson, previousDays = 7, displayUTCTime = false) {
        var previousDate = new Date();
        previousDate.setHours(0, 0, 0);
        var previousDaysDate = previousDate.setDate((new Date).getDate() - previousDays);

        var incidents = previousDays == 0 ? incidentsJson["incidents"] : incidentsJson["incidents"].filter(function (incident) { return new Date(incident["created_at"]) > previousDaysDate; });

        var messagesList = document.createElement("div");
        messagesList.setAttribute("id", "messages");
        messagesList.classList.add('messages');

        if (incidents.length == 0) {
            messagesList.appendChild(StatuspageHTMLElements.NoIncidentsElement(incidentsJson.page.name));
        } else {
            for (var i = 0; i < incidents.length; i++) {
                if (incidents[i]["incident_updates"].length > 0) {
                    const incidentElement = document.createElement("span");
                    incidentElement.setAttribute("id", incidents[i].id);
                    
                    for (var j = 0; j < incidents[i]["incident_updates"].length; j++) {
                        incidentElement.appendChild(StatuspageHTMLElements.MessageHTMLElement(
                            incidents[i]["incident_updates"][j].id,
                            incidents[i].name,
                            incidents[i].impact,
                            incidents[i]["incident_updates"][j].status,
                            incidents[i]["incident_updates"][j].body,
                            incidents[i]["incident_updates"][j].created_at,
                            // incidentsJson["incidents"][i]["incident_updates"][j].body,
                            // incidentsJson["incidents"][i]["incident_updates"][j].created_at,
                            incidentsJson["incidents"][i].shortlink, 
                            (j == incidents[i]["incident_updates"].length - 1),
                            displayUTCTime
                        ));
                    }

                    messagesList.appendChild(incidentElement);
                }
            }
        }

        return messagesList;
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
    static GetMetaTag(id) {
        let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
        return metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
    }

    /**
     * 
     * @param {string|Array} id 
     * @param {string} value 
     */
    static SetMetaTag(id, value) {
        if (typeof id == 'string') {
            StatuspageHTMLElements.GetMetaTag(id).setAttribute("content", value);
        } else if(Array.isArray(id)) {
            for(var i = 0; i < id.length; i++){
                StatuspageHTMLElements.GetMetaTag(id[i]).setAttribute("content", value);
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

    /**
     * 
     * @param {string} url 
     * @param {string} imgUrl 
     * @param {string} title 
     * @param {string} description 
     * @param {string} themeColor 
     * @param {string} author 
     * @param {string[]} keywords 
     * @returns {object}
     */
    static MetaTagValues(url, imgUrl, title, description, themeColor, author, keywords=[]) {
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
        }
    }

    /**
     * 
     * @param {string} url 
     * @param {string} imgUrl 
     * @param {string} title 
     * @param {string} description 
     * @param {string} themeColor 
     * @param {string} author 
     * @param {string[]} keywords 
     */
    static UpdateMetaTagValues(url, imgUrl, title, description, themeColor, author, keywords=[]) {
        var metaTagVals = StatuspageHTMLElements.MetaTagValues(url, imgUrl, title, description, themeColor, author, keywords);

        for (const [key, value] of Object.entries(metaTagVals)) {
            StatuspageHTMLElements.SetMetaTag(key, value);
        }
    }

    /**
     * 
     * @param {string} id 
     * @param {string} content 
     * @param {string} attr 
     * @returns {HTMLMetaElement}
     */
    static MetaTag(id, content, attr = "name"){
        var meta = document.createElement('meta');
        meta.setAttribute(attr, id);
        meta.setAttribute("content", content);
        return meta;
    }

    /**
     * 
     * @param {string} canonicalUrl 
     * @param {string} prefetchUrl 
     * @param {string} iconUrl 
     * @param {string} imgUrl 
     */
    static UpdateLinkTags(canonicalUrl, prefetchUrl, iconUrl, imgUrl){
        StatuspageHTMLElements.SetLinkTag("canonical", canonicalUrl);
        StatuspageHTMLElements.SetLinkTag("icon", iconUrl);
        StatuspageHTMLElements.SetLinkTag("apple-touch-icon", imgUrl);
        StatuspageHTMLElements.SetLinkTag("dns-prefetch", prefetchUrl);
        StatuspageHTMLElements.SetLinkTag("preconnect", prefetchUrl);
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
        var canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute("href", canonicalUrl);

        var icon = document.createElement('link');
        icon.setAttribute('rel', 'icon');
        icon.setAttribute('type', 'image/x-icon');
        icon.setAttribute("href", iconUrl);

        var appleTouchIcon = document.createElement('link');
        appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
        appleTouchIcon.setAttribute('sizes', '144x144');
        appleTouchIcon.setAttribute("href", imgUrl);

        var prefetch = document.createElement('link');
        prefetch.setAttribute('rel', 'dns-prefetch');
        prefetch.setAttribute("href", prefetchUrl);

        var preconnect = document.createElement('link');
        preconnect.setAttribute('rel', 'preconnect');
        preconnect.setAttribute("href", prefetchUrl);

        return [ canonical, icon, appleTouchIcon, prefetch, preconnect ];
    }

    /**
     * 
     * @param {string} canonicalUrl 
     * @param {string} imgUrl 
     * @param {string} title 
     * @param {string} description 
     * @param {string} themeColor 
     * @param {string} author 
     * @param {string[]} keywords 
     * @returns {HTMLMetaElement[]}
     */
    static MetaTagsHTMLElements(canonicalUrl, imgUrl, title, description, themeColor, author, keywords=[]){
        var metaTagVals = StatuspageHTMLElements.MetaTagValues(canonicalUrl, imgUrl, title, description, themeColor, author, keywords);

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

    /**
     * 
     * @param {string} canonicalUrl 
     * @param {string} prefetchUrl 
     * @param {string} iconUrl 
     * @param {string} imgUrl 
     * @param {string} title 
     * @param {string} description 
     * @param {string} themeColor 
     * @param {string} author 
     * @param {string[]} keywords 
     * @returns {HTMLHeadElement}
     */
    static HeadElement(canonicalUrl, prefetchUrl, iconUrl, imgUrl, title, description, themeColor, author, keywords=[]) {
        var head = document.createElement('head');

        var linkElements = StatuspageHTMLElements.LinkTagElements(canonicalUrl, prefetchUrl, iconUrl, imgUrl);
        var metaElements = StatuspageHTMLElements.MetaTagsHTMLElements(canonicalUrl, imgUrl, title, description, themeColor, author, keywords);

        for(let link of linkElements){
            head.appendChild(link);
        }

        for(let meta of metaElements){
            head.appendChild(meta);
        }

        var titleElement = document.createElement('title');
        titleElement.innerHTML = title;
        head.append(titleElement);

        var cssTag = document.createElement('link');
        cssTag.setAttribute('rel', 'stylesheet');
        cssTag.setAttribute("href", '../styling/main.min.css');

        head.append(cssTag);

        return head;
    }
}

class StatuspageWebComponents {
    static get App() {
        return class extends HTMLElement {
            constructor() { super(); }
    
            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.App.is}`);

                this.replaceWith(StatuspageHTMLElements.AppLoadingHTMLElement);
                this.app = document.getElementById('app');

                if (this.hasAttribute('data-url')) {
                    this.url = this.getAttribute('data-url');

                    console.log(this.url);

                    if (location.pathname == StatuspageDictionary.Paths.Index) {
                        StatuspageHTMLElements.UpdateUrlTags(location.href);
                        var summary = document.createElement(StatuspageWebComponents.Summary.is, { is: StatuspageWebComponents.Summary.is });
                        summary.setAttribute('data-url', this.url);
    
                        this.app.replaceWith(summary);
                    } else if (location.pathname == StatuspageDictionary.Paths.Components || location.pathname.endsWith(StatuspageDictionary.Paths.Components)) {
                        StatuspageHTMLElements.UpdateUrlTags(location.href);
                        var components = document.createElement(StatuspageWebComponents.Components.is, { is: StatuspageWebComponents.Components.is });
                        components.setAttribute('data-url', this.url);
    
                        this.app.replaceWith(components);
                    } else if (location.pathname == StatuspageDictionary.Paths.Status || location.pathname.endsWith(StatuspageDictionary.Paths.Status)) {
                        var status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
                        status.setAttribute('data-url', this.url);
                        status.setAttribute('fullScreen', '');
    
                        this.app.replaceWith(status);
                    } else {
                        StatuspageHTMLElements.UpdateUrlTags(location.href);
                        var summary = document.createElement(StatuspageWebComponents.Summary.is, { is: StatuspageWebComponents.Summary.is });
                        summary.setAttribute('data-url', this.url);
    
                        this.app.replaceWith(summary);
                        // this.app.firstChild.replaceWith(StatuspageHTMLElements.ErrorHTMLElement);
                    }
                }
                
                console.log(`Finished ${StatuspageWebComponents.App.is}`);
            }
            
            static get is() { return 'statuspage-app'; }
        }
    }
    
    static get Loading() {
        return class extends HTMLElement {
            constructor() { super(); }

            connectedCallback() {
                this.replaceWith(StatuspageHTMLElements.LoadingHTMLElement);
            }
            
            static get is() { return 'statuspage-loading'; }
        }
    }

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
                                if ('page' in json && 'name' in json.page) {
                                    this.title = StatuspageDictionary.Titles[StatuspageDictionary.PathNames.Index].replace(StatuspageDictionary.SiteNameValue, json.page.name);

                                    console.log(this.title);
                                }

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

    static get Components() {
        return class extends HTMLElement {
            constructor() { super(); }
        
            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Components.is}`);

                this.replaceWith(StatuspageHTMLElements.AppLoadingHTMLElement);
                this.app = document.getElementById('app');

                if (this.hasAttribute('data-json')) {
                    this.parseJson(JSON.parse(this.getAttribute('data-json')));
                } else if (this.hasAttribute('data-url')) {
                    this.fetchComponents(this.getAttribute('data-url'));
                } else {
                    this.app.replaceWith(StatuspageHTMLElements.ErrorHTMLElement);
                }

                console.log(`Finished ${StatuspageWebComponents.Components.is}`);
            }
        
            fetchComponents(url) {
                return new Promise((res, rej) => {
                    var baseUrl = url.slice(-1) == '/' ? url.substring(0, url.length - 1) : url;
        
                    fetch(baseUrl + '/api/v2/components.json')
                        .then(data => data.json())
                        .then((json) => {
                            this.parseJson(json);
                            res();
                        }).catch((error) => rej(error));
                })
            }
        
            parseJson(json) {
                var componentsArr = StatuspageHTMLElements.ComponentsHTMLElement(json);

                this.app.removeChild(document.getElementById('status'));
        
                for(var i = 0; i < componentsArr.length; i++){ this.app.append(componentsArr[i]); }
            }
        
            static get is(){ return 'statuspage-components'; }
        }
    }

    static get Incidents() {
        return class extends HTMLElement {
            constructor() { super(); }

            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Incidents.is}`);

                if (this.hasAttribute('data-json')) {
                    this.parseJson(JSON.parse(this.getAttribute('data-json')));
                } else if (this.hasAttribute('data-url')) {
                    this.fetchIncidents(this.getAttribute('data-url'));
                }

                console.log(`Finished ${StatuspageWebComponents.Incidents.is}`);
            }

            fetchIncidents(url) {
                console.log(url);

                return new Promise((res, rej) => {
                    var baseUrl = url.slice(-1) == '/' ? url.substring(0, url.length - 1) : url;
        
                    fetch(baseUrl + '/api/v2/incidents.json')
                        .then(data => data.json())
                        .then((json) => {
                            this.parseJson(json);
                            res();
                        }).catch((error) => rej(error));
                })
            }

            parseJson(json){
                if ('incidents' in json) {
                    this.replaceWith(StatuspageHTMLElements.IncidentsHTMLElements(json));
                }
            }

            static get is(){ return 'statuspage-incidents'; }
        }
    }

    static get Summary() {
        return class extends HTMLElement {
            constructor() { super(); }

            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Summary.is}`);

                this.replaceWith(StatuspageHTMLElements.AppLoadingHTMLElement);

                this.app = document.getElementById('app');

                this.singleRequest = true;

                if (this.hasAttribute('data-single-request')) {
                    if (this.getAttribute('data-single-request') == "true") {
                        this.singleRequest = true;
                    } else if (this.getAttribute('data-single-request') == "false") {
                        this.singleRequest = false;
                    }
                }

                if (this.hasAttribute('data-url')) {
                    this.url = this.getAttribute('data-url');

                    if (navigator.onLine) {
                        if (this.singleRequest) {
                            this.fetchSummary(this.url);
                        } else {
                            var status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
                            status.setAttribute('data-url', this.url);
    
                            var incidents = document.createElement(StatuspageWebComponents.Incidents.is, { is: StatuspageWebComponents.Incidents.is });
                            incidents.setAttribute('data-url', this.url);
    
                            this.app.firstChild.replaceWith(status);
                            this.app.appendChild(incidents);
                        }
                    } else {
                        app.firstChild.replaceWith(StatuspageHTMLElements.ErrorHTMLElement);
                    }
                } else {
                    app.firstChild.replaceWith(StatuspageHTMLElements.ErrorHTMLElement);
                }

                console.log(`Finished ${StatuspageWebComponents.Summary.is}`);
            }

            fetchSummary(url) {
                return new Promise((res, rej) => {
                    var baseUrl = url.slice(-1) == '/' ? url.substring(0, url.length - 1) : url;
        
                    fetch(baseUrl + '/api/v2/summary.json')
                        .then(data => data.json())
                        .then((json) => {
                            this.parseJson(json);
                            res();
                        }).catch((error) => {
                            rej(error)
                        });
                });
            }

            parseJson(json) {
                if (!('status' in json)) {
                    this.app.firstChild.replaceWith(StatuspageHTMLElements.ErrorHTMLElement);
                    return;
                }

                var status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
                status.setAttribute('status', json.status.indicator);

                var summary = document.createElement(StatuspageWebComponents.Incidents.is, { is: StatuspageWebComponents.Incidents.is });
                summary.setAttribute('data-json', JSON.stringify(json));

                this.app.firstChild.replaceWith(status);
                this.app.appendChild(summary);
            }

            static get is(){ return 'statuspage-summary'; }
        }
    }
}

class StatuspageHTML {
    /**
     * @constructor
     * @param {string} baseURL Atlassian Statuspage URL - Required
     * @param {number} [previousDays=7] Shows previous upto the N days of incidents (if set to 0, all incidents shown)
     * @param {boolean} [indexHomeSingleRequest=true] If true, StatuspageHTML will show IndexHome() using the Statuspage summary. If false, StatuspageHTML will show IndexHome() using the Statuspage status and incidents.
     * @param {boolean} [displayUTCTime=false] If true, incident times will be shown in UTC; if false, incident times will be shown in local time.
     */
    constructor(baseURL, previousDays = 7, indexHomeSingleRequest = true, displayUTCTime = false) {
        this.settings_baseUrl = baseURL;
        this.settings_previousDays = previousDays;
        this.settings_indexHomeSingleRequest = indexHomeSingleRequest;
        this.settings_displayUTCTime = displayUTCTime;

        this.site_name = null;
        this.site_description = null;
        this.site_title = null;

        if (this.settings_baseUrl.slice(-1) == '/') {
            this.settings_baseUrl = this.settings_baseUrl.substring(0, this.settings_baseUrl.length - 1);
        }

        // this.template_title_index = `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status`;
        // this.template_title_status = `(Unofficial) Mini ${StatuspageDictionary.replaceableStringValue} Status`;
        // this.template_title_components = `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status Components`;
        // this.template_title_error = `Error - Invalid Route`;
        // this.template_descrisption = `An unofficial website to monitor ${StatuspageDictionary.replaceableStringValue} status updates.`;
        // this.template_descrisption_error = `An error has occured.`;
        // this.template_incidents_none = `<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like ${StatuspageDictionary.replaceableStringValue} is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>`;

        if (document.getElementById('app') == null) {
            document.body.appendChild(StatuspageHTMLElements.AppLoadingHTMLElement);
        } else {
            document.getElementById('app').replaceWith(StatuspageHTMLElements.AppLoadingHTMLElement);
        }

        this.setTheme('loading').renderElement(StatuspageHTMLElements.LoadingHTMLElement);
    }

    getTemplateTitleIndex() {
        return StatuspageDictionary.StatuspageHTMLTemplates.template_title_index.replaceAll(StatuspageDictionary.replaceableStringValue, this.getName());
    }

    getTemplateTitleStatus() {
        return StatuspageDictionary.StatuspageHTMLTemplates.template_title_status.replaceAll(StatuspageDictionary.replaceableStringValue, this.getName());
    }

    getTemplateTitleComponents() {
        return StatuspageDictionary.StatuspageHTMLTemplates.template_title_components.replaceAll(StatuspageDictionary.replaceableStringValue, this.getName());
    }

    getTemplateDescription() {
        return StatuspageDictionary.StatuspageHTMLTemplates.template_descrisption.replaceAll(StatuspageDictionary.replaceableStringValue, this.getName());
    }

    /**
     * 
     * @param {string} name 
     * @returns {StatuspageHTML}
     */
    setName(name) {
        this.site_name = name;
        return this;
    }

    /**
     * 
     * @returns {string}
     */
    getName() {
        return this.site_name;
    }

    /**
     * 
     * @param {string} descript 
     * @returns {StatuspageHTML}
     */
    setDescription(descript = null) {
        this.site_description = this.getTemplateDescription() + (descript != null ? " | " + descript : "");
        return this.setDescriptions();
    }

    /**
     * 
     * @returns {string}
     */
    getDescription() {
        return this.site_description;
    }

    /**
     * 
     * @param {string} title 
     * @returns {StatuspageHTML}
     */
    setTitle(title) {
        this.site_title = title;
        return this.setTitles();
    }

    /**
     * 
     * @returns {string}
     */
    getTitle() {
        return this.site_title;
    }

    /**
     * 
     * @param {object} statuspageJson
     * @param {object} statuspageJson.status
     * @param {object} statuspageJson.components
     * @returns {StatuspageHTML}
     */
    setNameDescriptionTheme(statuspageJson) {
        if ('status' in statuspageJson) {
            this.setTheme(statuspageJson.status.indicator)
        } else if ('components' in statuspageJson) {
            this.setTheme(statuspageJson.components[0].status)
        }

        return this.setName(statuspageJson.page.name)
                    .setDescription('status' in statuspageJson ? statuspageJson.status.description : null);
    }
    
    /**
     * Converts IndexHomeAsync to a synchronous method
     */
    IndexHome() {
        console.log("IndexHome");

        this.IndexHomeAsync().then((t) => console.log(t));
    }

    /**
     * Fetches Status & Incidents and renders the HTML
     * @async
     */
    async IndexHomeAsync() {
        this.setUrl();

        var elements = [];

        if (this.settings_indexHomeSingleRequest) {
            const response = await fetch(this.settings_baseUrl + '/api/v2/summary.json');
            const result = await response.json();

            elements = [
                StatuspageHTMLElements.StatusHTMLElement(result),
                StatuspageHTMLElements.IncidentsHTMLElements(result)
            ];

            this.setNameDescriptionTheme(result)
        } else {
            const statusResponse = await fetch(this.settings_baseUrl + '/api/v2/status.json');
            const statusResult = await statusResponse.json();

            const messagesResponse = await fetch(this.settings_baseUrl + '/api/v2/incidents.json');
            const messagesResult = await messagesResponse.json();

            elements = [
                StatuspageHTMLElements.StatusHTMLElement(statusResult),
                StatuspageHTMLElements.IncidentsHTMLElements(messagesResult, this.settings_previousDays)
            ];

            this.setNameDescriptionTheme(statusResult);
        }

        this.setTitle(this.getTemplateTitleIndex())
            .renderElements(elements);

        return this;
    }

    /**
     * Converts ComponentsHomeAsync to a synchronous method
     */
    ComponentsHome() {
        console.log("ComponentsHome");

        this.ComponentsHomeAsync().then();
    }

    /**
     * Fetches Components and renders the HTML
     * @async
     */
    async ComponentsHomeAsync() {
        console.log("ComponentsHomeAsync");
        this.setUrl();

        const response = await fetch(this.settings_baseUrl + '/api/v2/components.json');
        const result = await response.json();

        this.setNameDescriptionTheme(result)
            .setTitle(this.getTemplateTitleComponents())
            .renderElements(StatuspageHTMLElements.ComponentsHTMLElement(result));
    }

    /**
     * Converts StatusHomeAsync to a synchronous method
     */
    StatusHome() {
        console.log("StatusHome");

        this.StatusHomeAsync().then();
    }

    /**
     * Fetches Status and renders the HTML
     * @async
     */
    async StatusHomeAsync() {
        console.log("StatusHomeAsync");
        this.setUrl();

        const response = await fetch(this.settings_baseUrl + '/api/v2/status.json');
        const result = await response.json();

        this.setNameDescriptionTheme(result)
            .setTitle(this.getTemplateTitleStatus())
            .renderElement(StatuspageHTMLElements.StatusHTMLElement(result, true));
    }

    /**
     * Generates and renders an error page
     */
    ErrorHome() {
        console.log("ErrorHome");
        
        this.site_description = "An error has occured.";

        this.setName("Error")
            .setTitle("Error - Invalid Route")
            .setDescriptions()
            .createMetaTag("robots", "noindex")
            .renderElement(StatuspageHTMLElements.ErrorHTMLElement);
    }

    /**
     * 
     * @returns {StatuspageHTML}
     */
    clearRender() {
        console.log("clearRender()");
        document.getElementById("app").replaceChildren();
        return this;
    }

    /**
     * Renders array of elements
     * 
     * @param {Element[]} htmlElements 
     * @returns {StatuspageHTML} 
     */
    renderElements(htmlElements) {
        console.log("renderElements()");

        this.clearRender();

        if (Array.isArray(htmlElements)) {
            for(var element of htmlElements){
                this.renderElement(element, false);
            }

            console.log("renderElements(): Success");
        } else {
            console.log("renderElements(): htmlElements is an Array.");
        }

        return this;
    }

    /**
     * 
     * @param {Element} htmlElement 
     * @param {boolean} [clearApp=true] 
     * @returns {StatuspageHTML} 
     */
    renderElement(htmlElement, clearApp = true) {
        console.log("renderElement()");

        if (htmlElement instanceof Element) {
            if (clearApp) { this.clearRender(); }
            
            document.getElementById("app").appendChild(htmlElement);
            // this.app.appendChild(htmlElement);

            console.log("renderElement(): Success");
        } else {
            console.log("renderElement(): htmlElement is an Element.");
        }

        return this;
    }

    /**
     * Sets a meta tag
     * 
     * @param {string|string[]} id 
     * @param {string} value 
     * @returns {StatuspageHTML} 
     */
    setMetaTag(id, value) {
        console.log(`setMetaTag(${id}, ${value})`);

        if(typeof id == 'string'){
            this.getMetaTag(id).setAttribute("content", value);
        } else if(Array.isArray(id)) {
            for(var i = 0; i < id.length; i++){
                this.getMetaTag(id[i]).setAttribute("content", value);
            }
        }

        console.log(`setMetaTag(${id}, ${value}) - Success`);

        return this;
    }

    /**
     * Gets a value from a meta tag
     * 
     * @param {string} id 
     * @returns {string}
     */
    getMetaTagValue(id) {
        return this.getMetaTag(id).getAttribute("content");
    }

    /**
     * Gets a value from a meta tag
     * 
     * @param {string} id 
     * @returns {Element}
     */
    getMetaTag(id) {
        let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
        return metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
    }

    /**
     * Creates a new meta tag
     * @param {string} id 
     * @param {string} content 
     * @param {string} [attr="name"]
     * @returns {StatuspageHTML} 
     */
    createMetaTag(id, content, attr = "name") {
        console.log(`createMetaTag(${id}, ${content}, ${attr})`);

        let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
        var metaTags = metaTagsArr.filter((mTag) => mTag.getAttribute(attr) == id);

        if (metaTags.length > 0) {
            console.error("meta tag already exists");
            return this;
        }

        var meta = document.createElement('meta');
        meta.setAttribute(attr, id);
        meta.setAttribute("content", content);

        document.head.append(meta);

        return this;
    }

    /**
     * Updates value in rich results test
     * 
     * @param {string} id 
     * @param {string} value 
     * @param {string} [_type="WebApplication"] if more than one structured data element, can set values in any element
     * @returns {StatuspageHTML} 
     */
    updateRichTest(id, value, _type = "WebApplication") {
        console.log(`updateRichTest(${id}, ${value}, ${_type})`);

        var ld = Array.from(document.getElementsByTagName("script")).find((t) => t.hasAttribute("type") && t.getAttribute("type") == "application/ld+json");

        if (ld == null) {
            return this;
        }

        var ldJson = JSON.parse(ld.innerHTML);

        if (Array.isArray(ldJson)) {
            var richTextElementIndex = ldJson.findIndex((e) => e["@type"] == _type);
            // console.log(ldJson[webAppIndex]);
            // console.log(ldJson[0]);
            ldJson[richTextElementIndex][id] = value;
        } else {
            ldJson[id] = value;
        }

        ld.innerHTML = JSON.stringify(ldJson, null, 4);

        return this;
    }

    /**
     * Sets urls to current or defined url
     * 
     * @param {string} [url=null]
     * @returns {StatuspageHTML}
     */
    setUrl(url = null) {
        var currUrl = url == null ? window.location.href : url;

        Array.from(document.getElementsByTagName("link"))
            .find((mTag) => (mTag.getAttribute("rel") == "canonical"))
            .setAttribute("href", currUrl);

        return this.setMetaTag("og:url", currUrl).updateRichTest("url", currUrl);
    }

    /**
     * Sets title in HTML
     * 
     * @returns {StatuspageHTML}
     */
    setTitles() {
        document.getElementsByTagName("title")[0].innerHTML = this.getTitle();

        return this.setMetaTag(["twitter:title", "og:title", "application-name", "apple-mobile-web-app-title"], this.getTitle())
            .updateRichTest("name", this.getTitle());
    }

    /**
     * Sets description in HTML
     * 
     * @returns {StatuspageHTML}
     */
    setDescriptions() {
        return this.setMetaTag(["description", "og:description", "twitter:description"], this.getDescription())
            .updateRichTest("description", this.getDescription());
    }

    /**
     * Sets meta tag themes
     * 
     * @param {string} [status='loading']
     * @returns {StatuspageHTML}
     */
    setTheme(status = 'loading') {
        console.log(`setTheme(status: ${status})`);

        var hexColor = StatuspageDictionary.MetaColors[status];

        console.log(`setTheme(hexColor: ${hexColor}): Success`);

        return this.setMetaTag(["theme-color", "apple-mobile-web-app-status-bar-style"], hexColor);
    }
}

/**
 * @param {string} url Atlassian Statuspage URL - Required
 * @param {number} [previousDays=7] Shows previous upto the N days of incidents (if set to 0, all incidents shown)
 * @param {boolean} [indexHomeSingleRequest=true] If true, StatuspageHTML will show IndexHome() using the Statuspage summary. If false, StatuspageHTML will show IndexHome() using the Statuspage status and incidents.
 * @param {boolean} [displayUTCTime=false] If true, incident times will be shown in UTC; if false, incident times will be shown in local time.
 */
function Router(url, previousDays = 7, indexHomeSingleRequest = true, displayUTCTime = false) {
    var r = new StatuspageHTML(url, previousDays, indexHomeSingleRequest, displayUTCTime);

    try {
        var cloudflareDevRegex = /(spa|master|staging|[1-9A-Za-z-_]+)\.ghstatus\.pages\.dev(\/StatuspageHTML\/)?/g;
        var cloudflareProdRegex = /(githubstat.us|ghstatuspagehtml.b-cdn.net|ghstat.us|spstat.us)/g;

        var onCloudflareDev = location.host.match(cloudflareDevRegex) != null;
        var onCloudflareProd = location.host.match(cloudflareProdRegex) != null;

        if (!navigator.onLine) {
            r.ErrorHome();
        } else {
            if (onCloudflareProd || onCloudflareDev) {
                if (location.pathname == StatuspageDictionary.Paths.Index) {
                    r.IndexHome();
                } else if (location.pathname == StatuspageDictionary.Paths.Components) {
                    r.ComponentsHome();
                } else if (location.pathname == StatuspageDictionary.Paths.Status) {
                    r.StatusHome();
                } else {
                    r.ErrorHome();
                }
            } else {
                r.IndexHome();
                // r.ComponentsHome();
                // r.StatusHome();
                // r.ErrorHome();
            }
        }
    } catch(error) {
        console.error(error);
        r.ErrorHome();
    }
}

customElements.define(StatuspageWebComponents.App.is, StatuspageWebComponents.App);
customElements.define(StatuspageWebComponents.Loading.is, StatuspageWebComponents.Loading);
customElements.define(StatuspageWebComponents.Status.is, StatuspageWebComponents.Status);
customElements.define(StatuspageWebComponents.Components.is, StatuspageWebComponents.Components);
customElements.define(StatuspageWebComponents.Incidents.is, StatuspageWebComponents.Incidents);
customElements.define(StatuspageWebComponents.Summary.is, StatuspageWebComponents.Summary);