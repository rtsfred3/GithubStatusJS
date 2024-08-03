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
    // static SiteNameValue = '{{SiteName}}';
    static get SiteNameValue() { return '{{SiteName}}'; }

    /**
     * @static
     * @readonly
     */
    static get replaceableStringValue() { return '{}' }; 
    // static replaceableStringValue = '{}'; 

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
        var templates = {
            template_title_index: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status`,
            template_title_status: `(Unofficial) Mini ${StatuspageDictionary.replaceableStringValue} Status`,
            template_title_components: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status Components`,
            template_title_amp: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status AMP`,
            template_title_maintenance: `Under Maintenance`,
            template_title_error: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status - Error`,
            template_descrisption: `An unofficial website to monitor ${StatuspageDictionary.replaceableStringValue} status updates.`,

            get [this.PathNames.Index]() { return this.template_title_index.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Status]() { return this.template_title_status.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Components]() { return this.template_title_components.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Amp]() { return this.template_title_amp.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Maintenance]() { return this.template_title_maintenance.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Error]() { return this.template_title_error.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Description]() { return this.template_descrisption.replace(this.replaceableStringValue, this.SiteNameValue); },
        };

        return Object.freeze(templates);
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
            [this.StatusEnums.none]: '#339966',
            [this.StatusEnums.minor]: '#DBAB09',
            [this.StatusEnums.major]: '#E25D10',
            [this.StatusEnums.critical]: '#DC3545',
            [this.StatusEnums.unavailable]: '#4F93BD',
            [this.StatusEnums.error]: '#646464',
            [this.StatusEnums.maintenance]: '#0366D6',
            psa: '#D83D42',

            get [StatuspageDictionary.StatusEnums.good]() { return this.none; },
            get [StatuspageDictionary.StatusEnums.under_maintenance]() { return this.maintenance; },
            get [StatuspageDictionary.StatusEnums.loading]() { return this.unavailable; },

            get [StatuspageDictionary.StatusEnums.operational](){ return this.none; },
            get [StatuspageDictionary.StatusEnums.degraded_performance](){ return this.minor; },
            get [StatuspageDictionary.StatusEnums.partial_outage](){ return this.major; }
        });
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
     * @property {string} resolved
     * @property {string} none
     * @property {string} operational
     */
    static get IndicatorVals() {
        return Object.freeze({
            [this.StatusEnums.good]: this.StatusEnums.good,
            [this.StatusEnums.minor]: this.StatusEnums.minor,
            [this.StatusEnums.major]: this.StatusEnums.major,
            [this.StatusEnums.critical]: this.StatusEnums.critical,
            [this.StatusEnums.error]: this.StatusEnums.error,
            [this.StatusEnums.maintenance]: this.StatusEnums.maintenance,
            [this.StatusEnums.unavailable]: this.StatusEnums.unavailable,
            [this.StatusEnums.loading]: this.StatusEnums.loading,

            get [StatuspageDictionary.StatusEnums.resolved]() { return this.good; },
            get [StatuspageDictionary.StatusEnums.none]() { return this.good; },
            get [StatuspageDictionary.StatusEnums.operational]() { return this.good; },

            get [StatuspageDictionary.StatusEnums.degraded_performance]() { return this.minor; },
            get [StatuspageDictionary.StatusEnums.partial_outage]() { return this.major; },
            get [StatuspageDictionary.StatusEnums.major_outage]() { return this.critical; },
            get [StatuspageDictionary.StatusEnums.under_maintenance]() { return this.maintenance; }
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
            [this.StatusEnums.resolved]: this.StatusEnums.good,
            [this.StatusEnums.minor]: this.StatusEnums.minor,
            [this.StatusEnums.major]: this.StatusEnums.major,
            [this.StatusEnums.critical]: this.StatusEnums.critical
        });
    }

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} Index
     * @property {string} Status
     * @property {string} Components
     * @property {string} Amp
     */
    static get Paths() {
        return Object.freeze({
            [this.PathNames.Index]: '/',
            [this.PathNames.Status]: '/status/',
            [this.PathNames.Components]: '/components/',
            [this.PathNames.Amp]: '/amp/'
        });
    }

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} Index
     * @property {string} Status
     * @property {string} Component
     * @property {string} Components
     * @property {string} Amp
     * @property {string} Maintenance
     * @property {string} Error
     * @property {string} Description
     */
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
    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLElement}
     */
    static get ErrorHTMLElement() { return document.createElement(StatuspageWebComponents.Error.is, { is: StatuspageWebComponents.Error.is }); }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLElement}
     */
    static get LoadingHTMLElement() { return document.createElement(StatuspageWebComponents.Loading.is, { is: StatuspageWebComponents.Loading.is }); }

    /**
     * @static
     * @deprecated since v0.2.57
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get AppHTMLElement(){
        const appElement = document.createElement("div");
        appElement.id = 'app';
        return appElement;
    }

    /**
     * @static
     * @deprecated since v0.2.57
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get AppLoadingHTMLElement() {
        var app = StatuspageHTMLElements.AppHTMLElement;
        app.appendChild(StatuspageHTMLElements.LoadingHTMLElement);
        app.firstElementChild.id = 'status';
        return app;
    }

    /**
     * @static
     * @deprecated since v0.2.57
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get AppErrorHTMLElement() {
        var app = StatuspageHTMLElements.AppHTMLElement;
        app.appendChild(StatuspageHTMLElements.ErrorHTMLElement);
        return app;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get AllGoodElement() {
        const allGoodElement = document.createElement("div");
        allGoodElement.classList.add('messages-empty-all-good');
        allGoodElement.textContent = "All good.";
        return allGoodElement;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} siteName 
     * @returns {HTMLDivElement}
     */
    static NoIncidentsElement(siteName) {
        const emptyIncidents = document.createElement("div");
        emptyIncidents.classList.add("messages-empty");

        const emptyBodyDiv = document.createElement("div");
        emptyBodyDiv.classList.add('messages-empty-body');
        emptyBodyDiv.appendChild(document.createTextNode(`Nothing to see here folks. Looks like ${siteName} is up and running and has been stable for quite some time.`));
        emptyBodyDiv.append(document.createElement("br"), document.createElement("br"));
        emptyBodyDiv.appendChild(document.createTextNode("Now get back to work!"));
    
        emptyIncidents.append(StatuspageHTMLElements.AllGoodElement, emptyBodyDiv);

        return emptyIncidents;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} indicator dummy status
     * @returns {StatuspageStatusResponse} Returns a dummy Statuspage output that only contains `status.indicator`
     */
    static GetStatusJson(indicator) {
        return { status: { indicator: indicator in StatuspageDictionary.StatusEnums ? indicator : StatuspageDictionary.StatusEnums.error } };
    }

    /**
     * @summary[Deprecated] DO NOT USER | Creates a Status HTML Elemnent
     * 
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @deprecated since v0.2.57
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
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {object} componentsJson
     * @returns {HTMLDivElement[]}
     */
    static ComponentsHTMLElement(componentsJson){
        var componentsArr = [];

        if (!(typeof(componentsJson) == "object" && 'components' in componentsJson)) { return componentsArr; }

        for (var i = 0; i < componentsJson.components.length; i++) {
            if (componentsJson.components[i].name.substring(0, 5) == 'Visit') { continue; }

            var component = document.createElement(StatuspageWebComponents.Component.is, { is: StatuspageWebComponents.Component.is });
            component.id = componentsJson.components[i].id;
            component.dataStatus = StatuspageDictionary.IndicatorVals[componentsJson.components[i].status];
            component.dataMessage = componentsJson.components[i].name;

            componentsArr.push(component);
        }

        return componentsArr;
    }

    /**
     * Creates a incident update element
     * 
     * @static
     * @memberof StatuspageHTMLElements
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
    static IncidentsHTMLElements(incidentsJson, previousDays = 7, displayUTCTime = false, showMaintenance = false) {
        var previousDate = new Date();
        previousDate.setHours(0, 0, 0);
        var previousDaysDate = previousDate.setDate((new Date).getDate() - previousDays);
        
        var incidents = [];

        if ('incidents' in incidentsJson) {
            incidents = incidents.concat(previousDays == 0 ? incidentsJson["incidents"] : incidentsJson["incidents"].filter(function (incident) { return new Date(incident["created_at"]) > previousDaysDate; }));
        }

        if ('scheduled_maintenances' in incidentsJson && showMaintenance) {
            incidents = incidents.concat(previousDays == 0 ? incidentsJson["scheduled_maintenances"] : incidentsJson["scheduled_maintenances"].filter(function (incident) { return new Date(incident["created_at"]) > previousDaysDate; }));
        }

        var messagesList = document.createElement("div");
        messagesList.id = "messages";
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
                            incidents[i].shortlink, 
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
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} id 
     * @returns {HTMLLinkElement}
     */
    static GetLinkTag(id) {
        let linkTagsArr = Array.from(document.getElementsByTagName("link"));
        return linkTagsArr.find((mTag) => mTag.getAttribute("rel") == id);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
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
            }
        }
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} id 
     * @returns {HTMLMetaElement}
     */
    static GetMetaTag(id, attr = "name") {
        attr = id.startsWith('og:') ? 'property' : attr;

        let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
        return metaTagsArr.find((mTag) => mTag.hasAttribute(attr) && mTag.getAttribute(attr) == id);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
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
            }
        }
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} status 
     */
    static SetThemeColor(status) {
        var hexColor = StatuspageDictionary.MetaColors[status];
        StatuspageHTMLElements.SetMetaTag(["theme-color", "apple-mobile-web-app-status-bar-style"], hexColor);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} canonicalUrl 
     * @param {string} prefetchUrl 
     * @param {string} iconUrl 
     * @param {string} imgUrl
     * @returns {object} 
     */
    static LinkTagValues(canonicalUrl, prefetchUrl, iconUrl, imgUrl){
        return {
            "canonical": canonicalUrl,
            "icon": iconUrl,
            "apple-touch-icon": imgUrl,
            "dns-prefetch": prefetchUrl,
            "preconnect": prefetchUrl
        };
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} url 
     * @param {string} imgUrl 
     * @param {string} siteName 
     * @param {string} pathName 
     * @param {string} themeColor 
     * @param {string} author 
     * @param {string[]} keywords defaults to `[]`
     * @param {string} additionalDescription defaults to `null`
     * @param {string} title defaults to `null`
     * @param {string} description defaults to `null`
     * @returns {object}
     */
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

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} url 
     * @param {string} imgUrl 
     * @param {string} siteName 
     * @param {string} pathName 
     * @param {string} themeColor 
     * @param {string} author 
     * @param {string[]} keywords 
     */
    static UpdateMetaTags(url, imgUrl, siteName, pathName, themeColor, author, keywords=[], additionalDescription = null) {
        var metaTagVals = StatuspageHTMLElements.MetaTagValues(url, imgUrl, siteName, pathName, themeColor, author, keywords, additionalDescription);

        for (const [key, value] of Object.entries(metaTagVals)) {

            if (value != null) {
                StatuspageHTMLElements.SetMetaTag(key, value);

                if (key == 'description') {
                    StatuspageHTMLElements.SetMetaTag(key, value, 'itemprop');
                }
            }
        }

        StatuspageHTMLElements.SetMetaTag('image', imgUrl, 'itemprop');
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} id 
     * @param {string} content 
     * @param {string} attr 
     * @returns {HTMLMetaElement}
     */
    static MetaTag(id, content, attr = "name"){
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
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} canonicalUrl 
     * @param {string} prefetchUrl 
     * @param {string} iconUrl 
     * @param {string} imgUrl 
     */
    static UpdateLinkTags(canonicalUrl, prefetchUrl, iconUrl, imgUrl){
        var linkTagVals = StatuspageHTMLElements.LinkTagValues(canonicalUrl, prefetchUrl, iconUrl, imgUrl);

        for (const [key, value] of Object.entries(linkTagVals)) {
            if (value != null) {
                StatuspageHTMLElements.SetLinkTag(key, value);
            }
        }
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
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
            if (v != null) {
                linkTagElements.push(StatuspageHTMLElements.LinkTag(k, v));
            }
        }

        return linkTagElements;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} canonicalUrl 
     * @param {string} imgUrl 
     * @param {string} siteName 
     * @param {string} pathName 
     * @param {string} themeColor 
     * @param {string} author 
     * @param {string[]} keywords 
     * @returns {HTMLMetaElement[]}
     */
    static MetaTagsHTMLElements(canonicalUrl, imgUrl, siteName, pathName, themeColor, author, keywords=[], additionalDescription = null){
        var metaTagVals = StatuspageHTMLElements.MetaTagValues(canonicalUrl, imgUrl, siteName, pathName, themeColor, author, keywords, additionalDescription);

        var metaTagElements = [];

        for(const [k, v] of Object.entries(metaTagVals)){
            if (v != null) {
                metaTagElements.push(StatuspageHTMLElements.MetaTag(k, v, k.includes('og:') ? "property" : "name"));
            }
        }

        return metaTagElements;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} canonicalUrl 
     */
    static UpdateUrlTags(canonicalUrl) {
        StatuspageHTMLElements.SetLinkTag("canonical", canonicalUrl);
        StatuspageHTMLElements.SetMetaTag("og:url", canonicalUrl);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} canonicalUrl 
     * @param {string} prefetchUrl 
     * @param {string} iconUrl 
     * @param {string} imgUrl 
     * @param {string} siteName 
     * @param {string} pathName 
     * @param {string} themeColor 
     * @param {string} author 
     * @param {string[]} keywords 
     * @returns {HTMLHeadElement}
     */
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
    static get App() {
        return class extends HTMLElement {
            constructor() { super(); }
    
            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.App.is}`);

                this.id = 'app';
                this.appendChild(StatuspageHTMLElements.LoadingHTMLElement);

                if (this.hasAttribute('data-url')) {
                    this.url = this.getAttribute('data-url');
                    this.removeAttribute('data-url');

                    if (location.pathname == StatuspageDictionary.Paths.Index) {
                        StatuspageHTMLElements.UpdateUrlTags(location.href);
                        var summary = document.createElement(StatuspageWebComponents.Summary.is, { is: StatuspageWebComponents.Summary.is });
                        summary.baseUrl = this.url;
                        summary.isSingleRequest = true;

                        this.firstElementChild.replaceWith(summary);
                    } else if (location.pathname == StatuspageDictionary.Paths.Components || location.pathname.endsWith(StatuspageDictionary.Paths.Components)) {
                        StatuspageHTMLElements.UpdateUrlTags(location.href);
                        var components = document.createElement(StatuspageWebComponents.Components.is, { is: StatuspageWebComponents.Components.is });
                        components.setAttribute('data-url', this.url);
    
                        this.firstElementChild.replaceWith(components);
                    } else if (location.pathname == StatuspageDictionary.Paths.Status || location.pathname.endsWith(StatuspageDictionary.Paths.Status)) {
                        var status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
                        status.baseUrl = this.url;
                        status.fullScreen = true;
    
                        this.firstElementChild.replaceWith(status);
                    } else {
                        StatuspageHTMLElements.UpdateUrlTags(location.href);
                        var summary = document.createElement(StatuspageWebComponents.Summary.is, { is: StatuspageWebComponents.Summary.is });
                        summary.baseUrl = this.url;
                        summary.isSingleRequest = true;
                        
                        this.removeChild(this.firstChild);
                        this.appendChild(summary);
                    }
                }

                console.log(`Finished ${StatuspageWebComponents.App.is}`);
            }

            toString() { return this.outerHTML.toString(); }
            
            // static is = 'statuspage-app';
            static get is() { return 'statuspage-app'; }
        }
    }

    static get Error() {
        return class extends HTMLElement {
            constructor() { super(); }

            connectedCallback() { StatuspageHTMLElements.SetThemeColor(StatuspageDictionary.StatusEnums.error); }

            toString() { return this.outerHTML.toString(); }
            
            // static is = 'statuspage-error';
            static get is() { return 'statuspage-error'; }
        }
    }

    static get Loading() {
        return class extends HTMLElement {
            constructor() { super(); }

            connectedCallback() { StatuspageHTMLElements.SetThemeColor(StatuspageDictionary.StatusEnums.loading); }

            toString() { return this.outerHTML.toString(); }

            // static is = 'statuspage-loading';
            static get is() { return 'statuspage-loading'; }
        }
    }

    static get Status() {
        return class extends HTMLElement {
            static get observedAttributes() { return [ "data-status", "data-url", "status", "fullscreen", "autorefresh" ]; }

            /**
             * @param {boolean} val
             */
            set isLoading(val) {
                if (typeof val == "boolean" && this.data._isLoadingEnabled) {
                    this.data._isLoading = val;

                    if (!this.data._isLoading) {
                        if (this.data._status != null) {
                            this.setAttribute('data-status', this.data._status);
                        } else if (this.data._status == null) {
                            this.removeAttribute('data-status');
                        }

                        if (!this.data._fullScreen && this.hasAttribute('fullScreen')) {
                            this.removeAttribute('fullScreen');
                        }

                        if (this.data._fullScreen && !this.hasAttribute('fullScreen')) {
                            this.setAttribute('fullScreen', '');
                        }
                    }

                    if (this.data._isLoading) {
                        this.setAttribute('data-status', StatuspageDictionary.StatusEnums.loading);

                        if (!this.hasAttribute('fullScreen')) {
                            this.setAttribute('fullScreen', '');
                        }
                    }
                }
            }

            /**
             * @type {boolean}
             */
            get isLoading() { return this.data._isLoading; }

            /**
             * @param {boolean} val
             */
            set fullScreen(val) {
                if (typeof val == 'boolean') {
                    this.data._fullScreen = val;
                    this.data._isFullScreenSet = true;

                    if (this.data._fullScreen) {
                        if (!this.hasAttribute('fullScreen')) {
                            this.setAttribute('fullScreen', '');
                        }
                    } else {
                        this.removeAttribute('fullScreen');
                    }
                }
                else {
                    console.error(`'${val}' is not a boolean.`);
                }
            }

            /**
             * @type {boolean}
             */
            get fullScreen() { return this.data._fullScreen; }

            /**
             * @param {string} val
             */
            set dataStatus(val) {
                if (typeof val == 'string' && val in StatuspageDictionary.StatusEnums) {
                    this.data._status = val;
                    this.dataset.status = val;

                    if (this.hasAttribute('status')) { this.removeAttribute('status'); }

                    StatuspageHTMLElements.SetThemeColor(this.data._status);

                    if (this.data._fullScreen == null) {
                        this.data._fullScreen = false;
                    }
                }
                else {
                    if (typeof val == 'string') {
                        console.error(`'${val}' is not a valid status.`);
                    }
                    else {
                        console.error(`'${val}' is not a string.`);
                    }
                }
            }

            /**
             * @type {string}
             */
            get dataStatus() { return this.data._status; }

            /**
             * @param {string} val
             */
            set baseUrl(val) {
                if (typeof val == 'string') {
                    if (URL.canParse(this.data._urlPath, val)) {
                        var _urlObj = new URL(this.data._urlPath, val);

                        this.data._baseUrl = _urlObj.origin;
                        this.data._url = _urlObj.href;

                        this.data._isLoadingEnabled = true;

                        if (!('url' in this.dataset)) {
                            this.dataset.url = this.data._baseUrl;
                        }
                    }
                }
            }

            /**
             * @type {string}
             */
            get baseUrl() { return this.data._baseUrl; }

            /**
             * @type {string}
             */
            get url() { return this.data._url; }

            /**
             * @param {boolean} val
             */
            set isRefreshEnabled(val) {
                if (typeof val == 'boolean') {
                    this.data._refreshEnabled = val;
                }
            }

            /**
             * @type {boolean}
             */
            get isRefreshEnabled() { return this.data._refreshEnabled; }

            /**
             * @param {number} val
             */
            set refreshTime(val) {
                if (typeof val == 'number') {
                    this.data._refreshTime = val;
                }
            }

            /**
             * @type {number}
             */
            get refreshTime() { return this.data._refreshTime; }

            /**
             * @param {object} val
             */
            set dataJson(val) {
                if (typeof val == 'object') {
                    this.data._dataJson = val;

                    if ('status' in this.data._dataJson && 'indicator' in this.data._dataJson.status) {
                        this.dataStatus = this.data._dataJson.status.indicator;

                        if (this.isRefreshEnabled) { console.log(`this.dataStatus = ${this.dataStatus}`); }
                    }
                }
            }

            constructor() {
                super();

                this.data = {
                    _urlPath: '/api/v2/status.json',
                    _baseUrl: null,
                    _url: null,
                    _fullScreen: null,
                    _isLoading: false,
                    _status: undefined,
                    _dataJson: null,
                    _isFullScreenSet: false,
                    _isLoadingEnabled: false,
                    _refreshEnabled: false,
                    _refreshTime: 5
                };
            }
        
            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Status.is}`);

                console.log(this.dataset);

                this.isLoading = true;

                StatuspageHTMLElements.UpdateUrlTags(location.href);

                if (this.isRefreshEnabled) {
                    console.log(`Refresh Interval: ${this.refreshTime} minutes`);
                }

                if (this.baseUrl != null) {
                    if (navigator.onLine) {
                        this.fetchStatus();

                        if (this.isRefreshEnabled) {
                            console.log("Timer set");
                            setInterval(() => { this.fetchStatus(); }, this.refreshTime * 60 * 1000);
                        }
                    } else {
                        this.setError();
                    }
                }

                this.isLoading = false;

                console.log(this.toString());
                console.log(`Finished ${StatuspageWebComponents.Status.is}`);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                console.log('attributeChangedCallback', name, oldValue, newValue);

                if (name == 'status' && newValue != null && newValue in StatuspageDictionary.StatusEnums) {
                    this.dataStatus = newValue;
                }

                if (name == 'data-status' && newValue != null && newValue in StatuspageDictionary.StatusEnums) {
                    this.data._status = newValue;

                    StatuspageHTMLElements.SetThemeColor(newValue);
                }

                if (name == 'data-url') {
                    this.baseUrl = newValue;
                }

                if (name == 'fullscreen' && !this.data._isFullScreenSet && !this.isLoading) {
                    this.fullScreen = (newValue != null);
                }

                if (name == 'autorefresh') {
                    this.isRefreshEnabled = (newValue != null);
                }
            }

            fetchStatus() {
                return new Promise((res, rej) => {
                    if (navigator.onLine && this.url != null) {
                        fetch(this.url)
                            .then(data => data.json())
                            .then((json) => {
                                this.dataJson = json;
                                res();
                            }).catch((error) => {
                                this.setError();
                                rej(error);
                            });
                    }
                })
            }

            setError() {
                this.dataStatus = StatuspageDictionary.StatusEnums.error;
                this.fullScreen = true;
            }

            /**
             * @returns {string}
             */
            toString() { return this.outerHTML.toString(); }

            // static is = 'statuspage-status';
            static get is() { return 'statuspage-status'; }
        }
    }

    static get Component() {
        return class extends HTMLElement {
            set dataStatus(val) {
                if (typeof val == 'string') { this.dataset.status = val; }
            }

            get dataStatus() { return this.dataset.status; }

            set dataMessage(val) {
                if (typeof val == 'string') { this.dataset.message = val; }
            }

            get dataMessage() { return this.dataset.message; }

            constructor() { super(); }

            toString() { return this.outerHTML.toString(); }
        
            // static is = 'statuspage-component';
            static get is() { return 'statuspage-component'; }
        }
    }

    static get Components() {
        return class extends HTMLElement {
            constructor() { super(); }
        
            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Components.is}`);

                this.appendChild(StatuspageHTMLElements.LoadingHTMLElement);

                if (this.hasAttribute('data-json')) {
                    this.parseJson(JSON.parse(this.getAttribute('data-json')));
                } else if (this.hasAttribute('data-url')) {
                    this.fetchComponents(this.getAttribute('data-url'));
                } else {
                    this.replaceWith(StatuspageHTMLElements.ErrorHTMLElement);
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

                for(var i = 0; i < componentsArr.length; i++){ this.append(componentsArr[i]); }

                this.removeChild(this.firstElementChild);
            }

            toString() { return this.outerHTML.toString(); }
        
            // static is = 'statuspage-components';
            static get is() { return 'statuspage-components'; }
        }
    }

    static get Incidents() {
        return class extends HTMLElement {
            static get observedAttributes() { return [ "data-json", "data-url" ]; }

            /**
             * @param {object} val
             */
            set dataJson(val) {
                if (typeof val == "string") {
                    this._dataJson = JSON.parse(val);
                }

                if (typeof val == "object") {
                    this._dataJson = val;
                }

                if (this._dataJson != null) {
                    this._incidentsElements = StatuspageHTMLElements.IncidentsHTMLElements(this._dataJson);
                }

                if (!this.hasAttribute('data-json')) {
                    this.setAttribute('data-json', JSON.stringify(this._dataJson));
                }
            }

            /**
             * @returns {object}
             */
            get dataJson() {
                return this._dataJson;
            }

            /**
             * @param {string} val
             */
            set baseUrl(val) {
                if (typeof val == 'string') {
                    if (URL.canParse(this._urlPath, val)) {
                        var _urlObj = new URL(this._urlPath, val);

                        this._baseUrl = _urlObj.origin;
                        this._url = _urlObj.href;

                        if (!this.hasAttribute('data-url')) {
                            this.setAttribute('data-url', this._baseUrl);
                        }
                    }
                }
            }

            /**
             * @returns {string}
             */
            get baseUrl() {
                return this._baseUrl;
            }

            /**
             * @returns {string}
             */
            get url() {
                return this._url;
            }

            get incidentElements(){
                return this._incidentsElements;
            }

            constructor() {
                super();

                this._urlPath = '/api/v2/incidents.json';
                this._baseUrl = null;
                this._url = null;

                this._dataJson = null;

                this._incidentsElements = null;
            }

            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Incidents.is}`);

                if (this.url != null) { this.fetchIncidents(); }

                if (this.dataJson != null) { this.parseJson(); }
                
                console.log(`Finished ${StatuspageWebComponents.Incidents.is}`);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                console.log(StatuspageWebComponents.Incidents.is, name, oldValue, newValue);

                if (name == 'data-json' && newValue != null) {
                    this.dataJson = newValue;
                }

                if (name == 'data-url' && newValue != null) {
                    this.baseUrl = newValue;
                }
            }

            fetchIncidents() {
                return new Promise((res, rej) => {
                    if (navigator.onLine && this.url != null) {
                        fetch(this.url)
                            .then(data => data.json())
                            .then((json) => {
                                this.dataJson = json;
                                this.parseJson();
                                res();
                            }).catch((error) => rej(error));
                    }
                })
            }

            parseJson() {
                if ('incidents' in this.dataJson) {
                    this.replaceWith(StatuspageHTMLElements.IncidentsHTMLElements(this.dataJson));
                }

                if ('scheduled_maintenances' in this.dataJson) {
                    this.replaceWith(StatuspageHTMLElements.IncidentsHTMLElements(this.dataJson));
                }
            }

            toString() { return this.outerHTML.toString(); }

            // static is = 'statuspage-incidents';
            static get is() { return 'statuspage-incidents'; }
        }
    }

    static get Summary() {
        return class extends HTMLElement {
            static get observedAttributes() { return [ "data-url", "data-single-request" ]; }

            /**
             * @param {boolean} val
             */
            set isSingleRequest(val) {
                if (typeof val == "boolean") {
                    this._isSingleRequest = val;

                    if (!this.hasAttribute('data-single-request')) {
                        this.setAttribute('data-single-request', this._isSingleRequest);
                    }
                }
            }

            /**
             * @type {boolean}
             */
            get isSingleRequest() { return this._isSingleRequest; }

            /**
             * @param {string} val
             */
            set baseUrl(val) {
                if (typeof val == 'string') {
                    if (URL.canParse(this._urlPath, val)) {
                        var _urlObj = new URL(this._urlPath, val);

                        this._baseUrl = _urlObj.origin;
                        this._url = _urlObj.href;
                    }

                    if (!this.hasAttribute('data-url')) {
                        this.setAttribute('data-url', this.baseUrl);
                    }
                }
            }

            /**
             * @type {string}
             */
            get baseUrl() { return this._baseUrl; }

            /**
             * @returns {string}
             */
            get url() {
                return this._url;
            }

            constructor() {
                super();

                this._urlPath = '/api/v2/summary.json';
                this._baseUrl = null;
                this._url = null;

                this._isLoading = false;
                this._isSingleRequest = true;
                this._dataJson = null;
            }

            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Summary.is}`);

                this.singleRequest = true;

                this.appendChild(StatuspageHTMLElements.LoadingHTMLElement);

                this.status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
                this.incidents = document.createElement(StatuspageWebComponents.Incidents.is, { is: StatuspageWebComponents.Incidents.is });

                // this.appendChild(StatuspageHTMLElements.LoadingHTMLElement);

                if (this.baseUrl != null) {
                    if (navigator.onLine) {
                        if (this.isSingleRequest) {
                            this.fetchSummary();
                        } else {
                            this.status.baseUrl = this.baseUrl;
                            this.incidents.baseUrl = this.baseUrl;
    
                            this.firstElementChild.replaceWith(this.status);
                            this.appendChild(this.incidents);
                        }
                    } else {
                        this.replaceWith(StatuspageHTMLElements.ErrorHTMLElement);
                    }
                } else {
                    this.replaceWith(StatuspageHTMLElements.ErrorHTMLElement);
                }

                console.log(`Finished ${StatuspageWebComponents.Summary.is}`);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                console.log('attributeChangedCallback', name, oldValue, newValue);

                if (name == 'data-url') {
                    this.baseUrl = newValue;
                }

                if (name == 'data-single-request' && newValue != null) {
                    this.isSingleRequest = this.getAttribute('data-single-request').toLowerCase() === "true";
                }
            }

            fetchSummary() {
                return new Promise((res, rej) => {
                    fetch(this.url)
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
                    this.firstElementChild.replaceWith(StatuspageHTMLElements.LoadingHTMLElement)
                    return;
                } else {
                    this.status.dataStatus = json.status.indicator;
                    this.incidents.dataJson = json;

                    this.firstElementChild.replaceWith(this.status);
                    this.appendChild(this.incidents);
                }
            }

            toString() { return this.outerHTML.toString(); }

            // static is = 'statuspage-summary';
            static get is() { return 'statuspage-summary'; }
        }
    }

    static get HTMLWebComponent() {
        return class extends HTMLElement {
            constructor() {
                super();

                this.htmlElement = document.createElement('html');

                this.head = document.createElement('head');
                this.body = document.createElement('body');

                var loading = document.createElement(StatuspageWebComponents.Loading.is, { is: StatuspageWebComponents.Loading.is });

                this.body.appendChild(loading);

                this.appendChild(this.head);
                this.appendChild(this.body);
            }

            connectedCallback() {
                this.replaceWith(this.htmlElement);
            }

            toString() { return this.outerHTML.toString(); }

            // static is = 'statuspage-html';
            static get is() { return 'statuspage-html'; }
        }
    }
}

/**
 *  @deprecated since v0.2.57
 */
class StatuspageHTML {
    /**
     * @deprecated since v0.2.57
     * 
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
 * 
 * @deprecated since v0.2.57
 * 
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
customElements.define(StatuspageWebComponents.Error.is, StatuspageWebComponents.Error);
customElements.define(StatuspageWebComponents.Loading.is, StatuspageWebComponents.Loading);
customElements.define(StatuspageWebComponents.Status.is, StatuspageWebComponents.Status);
customElements.define(StatuspageWebComponents.Component.is, StatuspageWebComponents.Component);
customElements.define(StatuspageWebComponents.Components.is, StatuspageWebComponents.Components);
customElements.define(StatuspageWebComponents.Incidents.is, StatuspageWebComponents.Incidents);
customElements.define(StatuspageWebComponents.Summary.is, StatuspageWebComponents.Summary);
customElements.define(StatuspageWebComponents.HTMLWebComponent.is, StatuspageWebComponents.HTMLWebComponent);

// console.log(StatuspageDictionary.StatuspageHTMLTemplates["Index"]);


// var errorComponent = StatuspageHTMLElements.ErrorHTMLElement;
// var statusComponent = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });

// console.log(StatuspageHTMLElements.ErrorHTMLElement);

/*
var statusComp = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
statusComp.baseUrl = "https://www.cloudflarestatus.com";
statusComp.fullScreen = true;
console.log(statusComp);
console.log(statusComp.toString());
statusComp.dataJson = StatuspageHTMLElements.GetStatusJson(StatuspageDictionary.StatusEnums.critical);
delete statusComp.data;
console.log(statusComp);
console.log(statusComp.toString());
*/

// console.log(StatuspageWebComponents.Error.is);
// console.log(StatuspageWebComponents.Loading.is);
// document.body.append(StatuspageWebComponents.Status.toString(StatuspageDictionary.StatusEnums.critical));
// console.log(StatuspageWebComponents.Status.toString(StatuspageDictionary.StatusEnums.critical));