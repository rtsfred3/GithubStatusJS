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
    // static replaceableStringValue = '{}'; 

    static get SiteNameValue() { return '{{SiteName}}'; }
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
        return Object.freeze({
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
            get [this.PathNames.Description]() { return this.template_descrisption.replace(this.replaceableStringValue, this.SiteNameValue); }
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
     * @returns {object} Returns a dummy Statuspage output that only contains `status.indicator`
     */
    static GetStatusJson(indicator) {
        return { status: { indicator: indicator in StatuspageDictionary.StatusEnums ? indicator : StatuspageDictionary.StatusEnums.error } };
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
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} body 
     * @param {string} date 
     * @returns {HTMLDivElement}
     */
    static MessageBodyElement(body, date){
        var messageElement = document.createElement('div');
        messageElement.classList.add('message-body');

        var dateElement = document.createElement('span');
        dateElement.classList.add('date');
        dateElement.textContent = date;

        var messageBodyElement = document.createElement('div');
        messageBodyElement.textContent = body;

        messageElement.appendChild(messageBodyElement);
        messageElement.appendChild(dateElement);

        return messageElement;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} impact 
     * @returns {HTMLDivElement}
     */
    static MessageStatusElement(impact){
        var htmlElement = document.createElement('div');
        htmlElement.dataset.impact = impact;
        return htmlElement;
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
        messageElement.id = incident_update_id;

        // Adding message elements to message element
        messageElement.appendChild(this.MessageStatusElement(currImpact));
        messageElement.appendChild(this.MessageBodyElement(body, date));

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
            incidents = incidents.concat(previousDays == 0 ? incidentsJson["scheduled_maintenances"] : incidentsJson["scheduled_maintenances"].filter(function (incident) { return (new Date(incident["created_at"]) > previousDaysDate && incident['status'] == "in_progress" ); }));
        }

        incidents.forEach((e) => {
            e["created_at"] = new Date(e["created_at"]);
            e["started_at"] = new Date(e["started_at"]);
            e["updated_at"] = new Date(e["updated_at"]);

            e["incident_updates"].forEach((u) => {
                u["created_at"] = new Date(u["created_at"]);
                u["display_at"] = new Date(u["display_at"]);
                u["updated_at"] = new Date(u["updated_at"]);
            });
        });

        incidents = incidents.sort((a, b) => b["created_at"] - a["created_at"]);

        var messagesList = document.createElement("div");
        messagesList.id = "messages";
        messagesList.classList.add('messages');

        if (incidents.length == 0) {
            messagesList.appendChild(StatuspageHTMLElements.NoIncidentsElement(incidentsJson.page.name));
        } else {
            for (var i = 0; i < incidents.length; i++) {
                if (incidents[i]["incident_updates"].length > 0) {
                    const incidentElement = document.createElement("span");
                    incidentElement.id = incidents[i].id
                    
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
                this.appendChild(StatuspageWebComponents.Loading.toHTML());

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
            
            static get is() { return 'statuspage-app'; }
        }
    }

    static get StatusElement() {
        return class extends HTMLElement {
            constructor(status) { super(); this.status = status; }

            connectedCallback() { StatuspageHTMLElements.SetThemeColor(this.status); }

            toString() { return this.outerHTML.toString(); }
            
            static get is() { return 'status-element'; }
            static toHTML() { return document.createElement(this.is, { is: this.is }); }
            static toString() { return `<${this.is}></${this.is}>`; }
        }
    }

    static get Error() {
        return class extends StatuspageWebComponents.StatusElement {
            constructor() { super(StatuspageDictionary.StatusEnums.error); }

            static get is() { return 'statuspage-error'; }
        }
    }

    static get Loading() {
        return class extends StatuspageWebComponents.StatusElement {
            constructor() { super(StatuspageDictionary.StatusEnums.loading); }
            
            static get is() { return 'statuspage-loading'; }
        }
    }

    static get Unavailable() {
        return class extends StatuspageWebComponents.StatusElement {
            constructor() { super(StatuspageDictionary.StatusEnums.unavailable); }
            
            static get is() { return 'statuspage-unavailable'; }
        }
    }

    static get Status() {
        return class extends HTMLElement {
            static get observedAttributes() { return [ "data-status", "data-url", "status", "fullscreen" ]; }

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
             * @deprecated after v0.2.62
             * @param {boolean} val
             */
            set isRefreshEnabled(val) {
                if (typeof val == 'boolean') { this.data._refreshEnabled = val; }
            }

            /**
             * @deprecated after v0.2.62
             * @type {boolean}
             */
            get isRefreshEnabled() { return this.data._refreshEnabled; }

            /**
             * @deprecated after v0.2.62
             * @param {number} val
             */
            set refreshTime(val) {
                if (typeof val == 'number') { this.data._refreshTime = val; }
            }

            /**
             * @deprecated after v0.2.62
             * @type {number}
             */
            get refreshTime() { return this.data._refreshTime; }

            /**
             * @deprecated after v0.2.62
             * @param {StatuspageStatusResponse} val
             */
            set dataJson(val) {
                if (typeof val == 'object') {
                    this.data._dataJson = val;

                    if ('status' in this.data._dataJson && 'indicator' in this.data._dataJson.status) {
                        this.dataStatus = this.data._dataJson.status.indicator;
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

                this.isLoading = true;

                StatuspageHTMLElements.UpdateUrlTags(location.href);

                if (this.baseUrl != null) {
                    if (navigator.onLine) {
                        this.fetchStatus();
                    } else {
                        this.setError();
                    }
                }

                this.isLoading = false;

                console.log(this.toString());
                console.log(`Finished ${StatuspageWebComponents.Status.is}`);
            }

            attributeChangedCallback(name, oldValue, newValue) {
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
            }

            fetchStatus() {
                return new Promise((res, rej) => {
                    if (navigator.onLine && this.url != null) {
                        fetch(this.url)
                            .then(data => data.json())
                            .then((json) => {
                                if ('status' in json && 'indicator' in json.status) {
                                    this.dataStatus = json.status.status;
                                }
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
            
            static get is() { return 'statuspage-status'; }

            static toHTML(status, isFullScreen = false) {
                var htmlElement = document.createElement(this.is, { is: this.is });
                htmlElement.dataStatus = status;
                htmlElement.fullScreen = isFullScreen;
                return htmlElement;
            }

            static staticHTML(status, isFullScreen = false) {
                var attr = { 'data-status': status };

                if (isFullScreen) { attr['fullScreen'] = null; }

                return `<${this.is} ${StatuspageHTMLElements.GenerateAttributes(attr)}></${this.is}>`;
            }
        }
    }

    static get Component() {
        return class extends HTMLElement {
            set dataStatus(val) { if (typeof val == 'string') { this.dataset.status = val; } }

            get dataStatus() { return this.dataset.status; }

            set dataMessage(val) { if (typeof val == 'string') { this.dataset.message = val; } }

            get dataMessage() { return this.dataset.message; }

            constructor() { super(); }

            toString() { return this.outerHTML.toString(); }
            
            static get is() { return 'statuspage-component'; }

            static staticHTML(status, message) {
                var attr = { 'data-status': status, 'data-message': message };

                return `<${this.is} ${StatuspageHTMLElements.GenerateAttributes(attr)}></${this.is}>`;
            }
        }
    }

    static get Components() {
        return class extends HTMLElement {
            constructor() { super(); }
        
            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Components.is}`);

                this.appendChild(StatuspageWebComponents.Loading.toHTML());

                if (this.hasAttribute('data-json')) {
                    this.parseJson(JSON.parse(this.getAttribute('data-json')));
                } else if (this.hasAttribute('data-url')) {
                    this.fetchComponents(this.getAttribute('data-url'));
                } else {
                    this.replaceWith(StatuspageWebComponents.Error.toHTML());
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

                // if (!this.hasAttribute('data-json')) { this.setAttribute('data-json', JSON.stringify(this._dataJson)); }
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

                        if (!this.dataset.url) {
                            this.dataset.url = this._baseUrl;
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

                if (this.incidentElements != null) { this.replaceWith(this.incidentElements); }
                
                console.log(`Finished ${StatuspageWebComponents.Incidents.is}`);
            }

            attributeChangedCallback(name, oldValue, newValue) {
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
                                res();
                            }).catch((error) => rej(error));
                    }
                })
            }

            toString() { return this.outerHTML.toString(); }
            
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

                    if (!this.dataset.singleRequest) {
                        this.dataset.singleRequest = val;
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

                    if (!this.dataset.url) {
                        this.dataset.url = this.baseUrl;
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

                this.appendChild(StatuspageWebComponents.Loading.toHTML())

                this.status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
                this.incidents = document.createElement(StatuspageWebComponents.Incidents.is, { is: StatuspageWebComponents.Incidents.is });

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
                        this.replaceWith(StatuspageWebComponents.Error.toHTML());
                    }
                } else {
                    this.replaceWith(StatuspageWebComponents.Error.toHTML());
                }

                console.log(`Finished ${StatuspageWebComponents.Summary.is}`);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (name == 'data-url') {
                    this.baseUrl = newValue;
                }

                if (name == 'data-single-request' && newValue != null) {
                    this.isSingleRequest = this.dataset.singleRequest.toLowerCase() === "true";
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
                    this.firstElementChild.replaceWith(StatuspageWebComponents.Loading.toHTML())
                    return;
                } else {
                    this.status.dataStatus = json.status.indicator;
                    this.incidents.dataJson = json;

                    this.firstElementChild.replaceWith(this.status);
                    this.appendChild(this.incidents);
                }
            }

            toString() { return this.outerHTML.toString(); }
            
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
            
            static get is() { return 'statuspage-html'; }
        }
    }
}

customElements.define(StatuspageWebComponents.App.is, StatuspageWebComponents.App);
customElements.define(StatuspageWebComponents.Error.is, StatuspageWebComponents.Error);
customElements.define(StatuspageWebComponents.Loading.is, StatuspageWebComponents.Loading);
customElements.define(StatuspageWebComponents.Unavailable.is, StatuspageWebComponents.Unavailable);
customElements.define(StatuspageWebComponents.Status.is, StatuspageWebComponents.Status);
customElements.define(StatuspageWebComponents.Component.is, StatuspageWebComponents.Component);
customElements.define(StatuspageWebComponents.Components.is, StatuspageWebComponents.Components);
customElements.define(StatuspageWebComponents.Incidents.is, StatuspageWebComponents.Incidents);
customElements.define(StatuspageWebComponents.Summary.is, StatuspageWebComponents.Summary);
customElements.define(StatuspageWebComponents.HTMLWebComponent.is, StatuspageWebComponents.HTMLWebComponent);