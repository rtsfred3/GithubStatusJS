class StatuspageDictionary {
    static SiteNameValue = '{{SiteName}}';
    static replaceableStringValue = '{}';

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} StatuspageApp
     * @property {string} StatuspageError
     * @property {string} StatuspageLoading
     * @property {string} StatuspageUnavailable
     * @property {string} StatuspageStatus
     * @property {string} StatuspageComponent
     * @property {string} StatuspageComponents
     * @property {string} StatuspageIncidents
     * @property {string} StatuspageSummary
     */
    static get HTMLTags() {
        return Object.freeze({
            StatuspageApp: 'statuspage-app',
            StatuspageError: 'statuspage-error',
            StatuspageLoading: 'statuspage-loading',
            StatuspageUnavailable: 'statuspage-unavailable',
            StatuspageStatus: 'statuspage-status',
            StatuspageComponent: 'statuspage-component',
            StatuspageComponents: 'statuspage-components',
            StatuspageIncidents: 'statuspage-incidents',
            StatuspageSummary: 'statuspage-summary',
            StatusElement: 'status-element'
        });
    }

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
            template_title_index: `(Unofficial) ${this.replaceableStringValue} Status`,
            template_title_status: `(Unofficial) Mini ${this.replaceableStringValue} Status`,
            template_title_components: `(Unofficial) ${this.replaceableStringValue} Status Components`,
            template_title_amp: `(Unofficial) ${this.replaceableStringValue} Status AMP`,
            template_title_maintenance: `Under Maintenance`,
            template_title_error: `(Unofficial) ${this.replaceableStringValue} Status - Error`,
            template_title_unavailable: `(Unofficial) ${this.replaceableStringValue} Status - Unavailable`,
            template_descrisption: `An unofficial website to monitor ${this.replaceableStringValue} status updates.`,

            get [this.PathNames.Index]() { return this.template_title_index.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Summary]() { return this.template_title_index.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Status]() { return this.template_title_status.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Components]() { return this.template_title_components.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Amp]() { return this.template_title_amp.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Maintenance]() { return this.template_title_maintenance.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Error]() { return this.template_title_error.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Unavailable]() { return this.template_title_unavailable.replace(this.replaceableStringValue, this.SiteNameValue); },
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

            get [this.StatusEnums.good]() { return this.none; },
            get [this.StatusEnums.under_maintenance]() { return this.maintenance; },
            get [this.StatusEnums.loading]() { return this.unavailable; },

            get [this.StatusEnums.operational](){ return this.none; },
            get [this.StatusEnums.degraded_performance](){ return this.minor; },
            get [this.StatusEnums.partial_outage](){ return this.major; }
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

            get [this.StatusEnums.resolved]() { return this.good; },
            get [this.StatusEnums.none]() { return this.good; },
            get [this.StatusEnums.operational]() { return this.good; },

            get [this.StatusEnums.degraded_performance]() { return this.minor; },
            get [this.StatusEnums.partial_outage]() { return this.major; },
            get [this.StatusEnums.major_outage]() { return this.critical; },
            get [this.StatusEnums.under_maintenance]() { return this.maintenance; }
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
            Summary: 'Summary',
            Status: 'Status',
            Component: 'Component',
            Components: 'Components',
            Amp: 'Amp',
            Maintenance: 'Maintenance',
            Unavailable: 'Unavailable',
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
     * @returns {StatuspageStatusResponse} Returns a dummy Statuspage output
     */
    static GetStatusJson(indicator) {
        return {
            status: { indicator: indicator in StatuspageDictionary.StatusEnums ? indicator : StatuspageDictionary.StatusEnums.error },
            page: { id: null, name: null, url: null, updated_at: Date.now() }
        };
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
    static TagStringAndAttributes(tag, attr = null) {
        var attrs = attr != null ? ` ${this.GenerateAttributes(attr)}` : '';
        return `<${tag}${attrs}></${tag}>`;
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
            var maintenances = previousDays == 0 ? incidentsJson["scheduled_maintenances"] : incidentsJson["scheduled_maintenances"].filter(function (incident) { return (new Date(incident["started_at"]) > previousDaysDate && incident['status'] == "in_progress" ); });
            incidents = incidents.concat(maintenances);
        }

        console.log(incidents);

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
            if (this.GetLinkTag(id) != undefined) {
                this.GetLinkTag(id).setAttribute("href", value);
            } else {
                var head = document.getElementsByTagName("head");
                if (head.length > 0) {
                    head[0].appendChild(this.LinkTag(id, value));
                }
            }
        } else if(Array.isArray(id)) {
            for(var i = 0; i < id.length; i++){
                this.SetLinkTag(id[i], value);
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
     * @param {string} siteName 
     * @param {string} pathName 
     */
    static SetTitle(siteName, pathName = StatuspageDictionary.PathNames.Index) {
        var title = StatuspageDictionary.StatuspageHTMLTemplates[pathName].replace(StatuspageDictionary.replaceableStringValue, siteName);

        StatuspageHTMLElements.SetMetaTag(["application-name", "og:site_name", "og:title", "twitter:title", "apple-mobile-web-app-title"], title);
        document.getElementsByTagName('title')[0].innerText = title;
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
     * @param {string} canonicalUrl 
     */
    static UpdateUrlTags(canonicalUrl) {
        this.SetLinkTag("canonical", canonicalUrl);
        this.SetMetaTag("og:url", canonicalUrl);
    }

    static get HTMLMetadataBase() {
        return class {
            constructor(canonicalUrl, statuspageUrl, iconUrl, imgUrl, siteName, pathName, author = null, keywords=[], additionalDescription = null, title = null, description = null){
                this._status = StatuspageDictionary.StatusEnums.loading;

                this.canonicalUrl = canonicalUrl;
                this.statuspageUrl = statuspageUrl;
                this.iconUrl = iconUrl;
                this.imgUrl = imgUrl;
                this.siteName = siteName != null ? siteName : 'Statuspage';
                this.pathName = pathName;
                this.author = author;
                this.keywords = keywords;

                this._title = title;
                this._description = description;
                this._additionalDescription = additionalDescription;
            }

            get title() { return this._title != null ? this._title : StatuspageDictionary.StatuspageHTMLTemplates[this.pathName].replace(StatuspageDictionary.replaceableStringValue, this.siteName); }
            
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
            
            get LinkTagValues() {
                return {
                    "canonical": this.canonicalUrl,
                    "icon": this.iconUrl,
                    "apple-touch-icon": this.imgUrl,
                    "dns-prefetch": this.statuspageUrl != null ? this.statuspageUrl.replace('https:', '') : null,
                    "preconnect": this.statuspageUrl != null ? this.statuspageUrl.replace('https:', '') : null
                };
            }

            get Stylesheets() {
                return [ 'https://spstat.us/styling/main.min.css' ];
            }

            get Scripts() {
                return ['https://spstat.us/js/StatuspageHTML.js'];
            }

            get MetaTagValues() {
                return {
                    "author": this.author,
                    "application-name": this.title,
                    "theme-color": this.themeColor,
                    "description": this.description,
                    "keywords": this.keywords.length > 0 ? this.keywords.join(', ') : null,
        
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
        }
    }

    static get HTMLElementMetadata() {
        return class extends StatuspageHTMLElements.HTMLMetadataBase {
            constructor(canonicalUrl, statuspageUrl, iconUrl, imgUrl, siteName, pathName, author = null, keywords=[], additionalDescription = null, title = null, description = null) {
                super(canonicalUrl, statuspageUrl, iconUrl, imgUrl, siteName, pathName, author, keywords, additionalDescription, title, description);
            }

            get LinkTags() {
                var linkTagElements = [];

                for (const [k, v] of Object.entries(this.LinkTagValues)) {
                    if (v != null) {
                        linkTagElements.push(StatuspageHTMLElements.LinkTag(k, v));
                    }
                }

                for (let stylesheet of this.Stylesheets) {
                    linkTagElements.push(StatuspageHTMLElements.LinkTag('stylesheet', stylesheet));
                }

                return linkTagElements;
            }
            
            get MetaTags() {
                var metaTagElements = [];

                for(const [k, v] of Object.entries(this.MetaTagValues)){
                    if (v != null) {
                        metaTagElements.push(StatuspageHTMLElements.MetaTag(k, v, k.includes('og:') ? "property" : "name"));
                    }
                }

                return metaTagElements;
            }
            
            get ScriptTags() {
                var scriptTagElements = [];

                for (let script of this.Scripts) {
                    scriptTagElements.push(StatuspageHTMLElements.ScriptTag(script));
                }

                return scriptTagElements;
            }

            get TitleTag() {
                var titleElement = document.createElement('title');
                titleElement.innerHTML = this.title;
                return titleElement;
            }
            
            get Head() {
                var head = document.createElement('head');

                for (let meta of this.MetaTags) { head.appendChild(meta); }

                for (let link of this.LinkTags) { head.appendChild(link); }

                for (let script of this.ScriptTags) { head.appendChild(script); }

                head.appendChild(this.TitleTag);

                return head;
            }
            
            get Body() {
                var body = document.createElement('body');
                body.id = 'body';

                if (this.pathName == StatuspageDictionary.PathNames.Status) {
                    var statusElement = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
                    statusElement.baseUrl = this.statuspageUrl;
                    statusElement.fullScreen = true;

                    body.appendChild(statusElement);
                } else {
                    var error = document.createElement(StatuspageWebComponents.Error.is, { is: StatuspageWebComponents.Error.is });
                    body.appendChild(error);
                }

                return body;
            }
            
            get HTML() {
                var htmlElement = document.createElement('html');

                htmlElement.appendChild(this.Head);
                htmlElement.appendChild(this.Body);

                return htmlElement;
            }
        };
    }

    static get HTMLStringMetadata() {
        return class extends StatuspageHTMLElements.HTMLMetadataBase {
            constructor(canonicalUrl, statuspageUrl, iconUrl, imgUrl, siteName, pathName, author = null, keywords=[], additionalDescription = null, title = null, description = null) {
                super(canonicalUrl, statuspageUrl, iconUrl, imgUrl, siteName, pathName, author, keywords, additionalDescription, title, description);
            }

            get LinkTags() {
                var linkTagElements = [];

                for (const [k, v] of Object.entries(this.LinkTagValues)) {
                    if (v != null) {
                        linkTagElements.push(`<link ${StatuspageHTMLElements.GenerateAttributes({ 'rel': k, 'href': v })}>`)
                    }
                }

                for (let stylesheet of this.Stylesheets) {
                    linkTagElements.push(`<link ${StatuspageHTMLElements.GenerateAttributes({ 'rel': 'stylesheet', 'href': stylesheet })}>`);
                }

                return linkTagElements;
            }

            get MetaTags() {
                var metaTagElements = [];

                for(const [k, v] of Object.entries(this.MetaTagValues)){
                    if (v != null) {
                        metaTagElements.push(`<meta ${StatuspageHTMLElements.GenerateAttributes({ [k.includes('og:') ? "property" : "name"]: k, 'content': v })}>`);
                    }
                }

                return metaTagElements;
            }

            get ScriptTags() {
                var scriptTagElements = [];

                for (let script of this.Scripts) {
                    scriptTagElements.push(`<script ${StatuspageHTMLElements.GenerateAttributes({ 'src': script })}></script>`);
                }

                return scriptTagElements;
            }

            get TitleTag() {
                return `<title>${this.title}</title>`;
            }

            get Head() {
                var metaTags = this.MetaTags.join('');
                var linkTags = this.LinkTags.join('');
                var scriptTags = this.ScriptTags.join('');
                return `<head>${metaTags}${linkTags}${scriptTags}${this.TitleTag}</head>`;
            }

            get Body() {
                var child = StatuspageHTMLElements.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageError);

                if (this.pathName == StatuspageDictionary.PathNames.Status) {
                    var attr = {};
                    
                    if (this.statuspageUrl != null) {
                        attr['data-url'] = this.statuspageUrl;
                    } else {
                        attr['data-status'] = this.status;
                    }
                    
                    attr['fullScreen'] = null;

                    child = StatuspageHTMLElements.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, attr);
                }

                if (this.pathName == StatuspageDictionary.PathNames.Summary) {
                    child = StatuspageHTMLElements.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageSummary, { 'data-url': this.statuspageUrl });
                }

                if (this.pathName == StatuspageDictionary.PathNames.Maintenance) {
                    child = StatuspageHTMLElements.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': StatuspageDictionary.StatusEnums.maintenance, 'fullScreen': null });
                }

                if (this.pathName == StatuspageDictionary.PathNames.Unavailable) {
                    child = StatuspageHTMLElements.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageUnavailable);
                }

                if (this.pathName == StatuspageDictionary.PathNames.Error) {
                    child = StatuspageHTMLElements.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageError);
                }

                return `<body id="body">${child}</body>`;
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

            BodyFromStatus(status) {
                var child = '';

                if (status in StatuspageDictionary.StatusEnums){
                    child = StatuspageHTMLElements.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': status, 'fullScreen': null });
                }

                return `<body id="body">${child}</body>`;
            }

            HTMLFromStatus(status) { return `<html>\n\t${this.Head}\n\t${this.BodyFromStatus(status)}\n</html>`; }
        }
    }
}

export { StatuspageDictionary, StatuspageHTMLElements };