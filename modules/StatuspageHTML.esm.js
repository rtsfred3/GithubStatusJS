/**
 * @typedef {Object} StatuspageComponentObject
 * @prop {string[]} components
 * @prop {string} created_at 
 * @prop {?string} description 
 * @prop {boolean} group 
 * @prop {?string} group_id 
 * @prop {string} id 
 * @prop {string} name
 * @prop {boolean} only_show_if_degraded
 * @prop {string} page_id
 * @prop {number} position
 * @prop {boolean} showcase
 * @prop {?string} start_date
 * @prop {string} status
 * @prop {string} updated_at
 */

/**
 * @typedef {Object} StatuspagePageObject
 * @prop {string} id 
 * @prop {string} name 
 * @prop {string} url 
 * @prop {string} name 
 * @prop {string} updated_at 
 */

/**
 * @typedef {Object} StatuspageStatusObject
 * @prop {object} status 
 * @prop {string} status.indicator 
 * @prop {string} status.description 
 */

/**
 * @typedef {Object} StatuspageStatusResponse
 * @prop {StatuspagePageObject} page 
 * @prop {StatuspageStatusObject} status 
 */

class StatuspageWebComponents {
    static get AppLoading() {
        return class extends HTMLElement {
            constructor() { super(); }
    
            connectedCallback() { this.replaceWith(StatuspageHTMLElements.AppLoadingHTMLElement); }
            
            static get is() { return 'statuspage-app'; }
        }
    }

    static get Status() {
        return class extends HTMLElement {
            constructor() { super(); }
        
            connectedCallback() {
                this.status = this.hasAttribute('status') && this.getAttribute('status') in StatuspageDictionary.StatusEnums
                    ? this.getAttribute('status')
                    : StatuspageDictionary.StatusEnums.error;
        
                this.fullScreen = this.hasAttribute('status') || this.hasAttribute('data-url')
                    ? this.hasAttribute('fullScreen')
                    : true;

                if (this.hasAttribute('data-url')) {
                    this.fetchStatus(this.getAttribute('data-url'));
                } else {
                    this.parseStatus(this.status, this.fullScreen);
                }
            }

            fetchStatus(url) {
                return new Promise((res, rej) => {
                    var baseUrl = url.slice(-1) == '/' ? url.substring(0, url.length - 1) : url;
        
                    fetch(baseUrl + '/api/v2/status.json')
                        .then(data => data.json())
                        .then((json) => {
                            if ('status' in json) {
                                this.parseStatus(json.status.indicator, this.fullScreen);
                            } else {
                                this.parseStatus(StatuspageDictionary.StatusEnums.error, true);
                            }
                            
                            res();
                        }).catch((error) => {
                            this.parseStatus(StatuspageDictionary.StatusEnums.error, true);
                            rej(error);
                        });
                })
            }

            parseStatus(status, fullScreen) {
                console.log(status, fullScreen);
                this.replaceWith(StatuspageHTMLElements.StatusHTMLElement(status, fullScreen));
            }
        
            static get is() { return 'statuspage-status'; }
        }
    }

    static get Components() {
        return class extends HTMLElement {
            constructor() { super(); }
        
            connectedCallback() {
                if (this.hasAttribute('data-json')) {
                    this.parseJson(JSON.parse(this.getAttribute('data-json')));
                } else if (this.hasAttribute('data-url')) {
                    this.fetchComponents(this.getAttribute('data-url'));
                }
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
            }
        
            static get is(){ return 'statuspage-components'; }
        }
    }

    static get Incidents() {
        return class extends HTMLElement {
            constructor() { super(); }

            connectedCallback() {
                if (this.hasAttribute('data-json')) {
                    this.parseJson(JSON.parse(this.getAttribute('data-json')));
                } else if (this.hasAttribute('data-url')) {
                    this.fetchIncidents(this.getAttribute('data-url'));
                }
            }

            fetchIncidents(url) {
                return new Promise((res, rej) => {
                    var baseUrl = url.slice(-1) == '/' ? url.substring(0, url.length - 1) : url;
        
                    fetch(baseUrl + '/api/v2/incidents/unresolved.json')
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
                this.replaceWith(StatuspageHTMLElements.AppLoadingHTMLElement);

                this.app = document.getElementById('app');

                if (this.hasAttribute('data-url')) {
                    this.fetchSummary(this.getAttribute('data-url'));
                } else {
                    app.firstChild.replaceWith(StatuspageHTMLElements.ErrorHTMLElement);
                }
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

class StatuspageHTMLElements {
    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get ErrorHTMLElement(){
        return StatuspageHTMLElements.StatusHTMLElement(StatuspageHTMLElements.GetStatusJson('error'), true);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get LoadingHTMLElement(){
        return StatuspageHTMLElements.StatusHTMLElement(StatuspageDictionary.StatusEnums.loading, true);
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
        return app;
    }

    /**
     * 
     * @param {string} siteName 
     * @returns {HTMLDivElement}
     */
    static NoIncidentsElement(siteName) {
        const emptyIncidents = document.createElement("div");
        emptyIncidents.classList.add("empty", "padding-none");
    
        const emptyIncidentsFirstChild = document.createElement("div");
        const emptyIncidentsSecondChild = document.createElement("div");
        
        emptyIncidentsFirstChild.classList.add('font-36', 'margin-bottom');
        emptyIncidentsSecondChild.classList.add('font-12');
        
        emptyIncidentsFirstChild.appendChild(document.createTextNode("All good."));
    
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
        return { 'status': { 'indicator': indicator } };
    }

    /**
     * Creates a Status HTML Elemnent
     * 
     * @param {string|StatuspageStatusResponse} status The status of the page
     * @param {!boolean} [fullStatus=false] this will determine if the status page will fill the current view of the screen
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
        statusElement.style.fontWeight = "bold";
        statusElement.style.color = "white";
        statusElement.style.backgroundColor = StatuspageDictionary.MetaColors[status];

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
     * @param {Object} componentsJson 
     * @returns {HTMLDivElement[]}
     */
    static ComponentsHTMLElement(componentsJson){
        var componentsArr = [];

        if (!(typeof(componentsJson) == "object" && 'components' in componentsJson)) { return componentsArr; }

        for (var i = 0; i < componentsJson.components.length; i++) {
            if (componentsJson.components[i].name.substring(0, 5) == 'Visit') { continue; }
            componentsArr.push(StatuspageHTMLElements.StatusHTMLElement(componentsJson.components[i]));
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
}

class StatuspageHTML {
    /**
     * @constructs
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

        this.template_title_index = `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status`;
        this.template_title_status = `(Unofficial) Mini ${StatuspageDictionary.replaceableStringValue} Status`;
        this.template_title_components = `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status Components`;
        // this.template_title_error = `Error - Invalid Route`;
        this.template_descrisption = `An unofficial website to monitor ${StatuspageDictionary.replaceableStringValue} status updates.`;
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
        return `(Unofficial) ${this.getName()} Status`;
    }

    getTemplateTitleStatus() {
        return `(Unofficial) Mini ${this.getName()} Status`
    }

    getTemplateTitleComponents() {
        return `(Unofficial) ${this.getName()} Status Components`;
    }

    getTemplateDescription(siteName) {
        return `An unofficial website to monitor ${siteName} status updates.`;
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
        this.site_description = this.template_descrisption.replaceAll(StatuspageDictionary.replaceableStringValue, this.getName()) + (descript != null ? " | " + descript : "");
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
     * @param {string} template 
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
     * @param {StatuspageStatusResponse} statuspageJson 
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

        this.IndexHomeAsync().then();
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

        this.setTitle(this.getTemplateTitleIndex(this.getName()))
            .renderElements(elements);

        return elements;
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
     * @param {string|Array} id 
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
     * @param {string} id 
     * @param {*} value 
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
     * @param {string} status 
     * @returns {StatuspageHTML}
     */
    setTheme(status = 'loading') {
        console.log(`setTheme(status: ${status})`);

        var hexColor = StatuspageDictionary.MetaColors[status];

        console.log(`setTheme(hexColor: ${hexColor}): Success`);

        return this.setMetaTag(["theme-color", "apple-mobile-web-app-status-bar-style"], hexColor);
    }
}

export { StatuspageWebComponents, StatuspageHTMLElements, StatuspageHTML };