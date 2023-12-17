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

class StatuspageHTMLElements {
    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get ErrorHTMLElement(){
        return StatuspageHTMLElements.StatusHTMLElement(StatuspageHTMLElements.GetStatusJson('error'), true);
    }

    static get LoadingHTMLElement(){
        return StatuspageHTMLElements.StatusHTMLElement(StatuspageHTMLElements.GetStatusJson('loading'), true);
    }

    static get AppHTMLElement(){
        const appElement = document.createElement("div");
        appElement.setAttribute('id', 'app');
        return appElement;
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
    static StatusHTMLElement(status, fullStatus=false){
        if(typeof(status) != "string" && typeof(status) != "object"){
            console.error(`Invaid parameter - ${typeof(status)}`);
            return document.createElement("div");
        }

        if(typeof(status) == "object" && 'status' in status && 'indicator' in status.status){
            return StatuspageHTMLElements.StatusHTMLElement(status.status.indicator, fullStatus);
        }

        var heightArray = fullStatus ? [ 'full-status-height' ] : [ 'status-height', 'status-shadow' ];
        var classArray = heightArray.concat(['min', 'center-status', 'status-width', 'bold', 'status-color', status.toLowerCase()]);
        // var classArray = heightArray.concat(['min', 'center-status', 'status-width', 'bold', 'status-color']);

        const statusElement = document.createElement("div");
        statusElement.setAttribute("data-status", status.toLowerCase());
        statusElement.setAttribute("data-background", StatuspageDictionary.MetaColors[status.toLowerCase()]);
        statusElement.setAttribute("id", "status");
        statusElement.classList.add(...classArray);

        return statusElement;
    }

    /**
     * Creates a single Component element
     * 
     * @param {Object} componentJson 
     * @returns {HTMLDivElement}
     */
    static SingleComponentHTMLElement(componentJson){
        const componentDivElement = document.createElement("div");

        componentDivElement.setAttribute('id', componentJson['id']);
        componentDivElement.classList.add('component-height', 'status-width', 'bold', 'status-color', StatuspageDictionary.IndicatorVals[componentJson["status"]]);

        const centerStatusDivElement = document.createElement("span");
        centerStatusDivElement.classList.add('center-status');
        centerStatusDivElement.appendChild(document.createTextNode(componentJson["name"]));

        componentDivElement.appendChild(centerStatusDivElement);

        return componentDivElement;
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
            componentsArr.push(StatuspageHTMLElements.SingleComponentHTMLElement(componentsJson.components[i]));
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
        var currImpact = (status == "resolved" ? "good" : impact);
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
        statusBoxElement.classList.add("status-box", 'message-status', `${currImpact}-message`);
        // statusBoxElement.classList.add("status-box", 'message-status');//, `${currImpact}-message`);
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
            messagesList.appendChild(StatuspageHTMLElements.NoIncidentsHTMLElement(incidentsJson.page.name));
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
     * Returns an element that is a summary of site status and incidents
     * 
     * @param {object} summaryJson 
     * @returns {HTMLDivElement}
     */
    static SummaryHTMLElement(summaryJson){
        const summeryElement = document.createElement("div");
        
        if (typeof(summaryJson) == "object" && 'status' in summaryJson && 'incidents' in summaryJson){
            summeryElement.appendChild(StatuspageHTMLElements.StatusHTMLElement(summaryJson));
            summeryElement.appendChild(StatuspageHTMLElements.IncidentsHTMLElements(summaryJson));

            return summeryElement;
        } else {
            return StatuspageHTMLElements.StatusHTMLElement('error', true);
        }
    }

    /**
     * Creates an HTML Element for when there are no incidents to report for a statuspage.
     * 
     * @param {string} siteName 
     * @returns {HTMLDivElement}
     */
    static NoIncidentsHTMLElement(siteName) {
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
}

/**
 * Static dictionary for default values for Statuspage
 * @class
 */
class StatuspageDictionary {
    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _metaColors() {
        return class MetaColors {
            constructor(){
                this.none = '#339966';
                this.minor = '#DBAB09';
                this.major = '#E25D10';
                this.critical = '#DC3545';
                this.unavailable = '#4F93BD';
                this.error = '#646464';
                this.maintenance = '#0366D6';
                this.psa = '#D83D42';

                this.good = this.none;
                this.under_maintenance = this.maintenance;
                this.loading = this.unavailable;

                this.operational = this.good;
                this.degraded_performance = this.minor;
                this.partial_outage = this.major;

                this.major = '#e36209';
            }
        }
    }

    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _indicatorVals() {
        return class IndicatorVals{
            constructor(){
                this.good = 'good';
                this.minor = 'minor';
                this.major = 'major';
                this.critical = 'critical';
                this.error = 'error';
                this.maintenance = 'maintenance';
                this.unavailable = 'unavailable';
                this.loading = 'loading';

                this.resolved = this.good;
                this.none = this.good;
                this.operational = this.good;
                this.degraded_performance = this.minor;
                this.partial_outage = this.major;
                this.major_outage = this.critical;
                this.under_maintenance = this.maintenance;
            }
        }
    }

    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _indicatorMessages() {
        return class IndicatorMessages {
            constructor() {
                var __indicatorVals = new StatuspageDictionary._indicatorVals();

                this.resolved = __indicatorVals.good;
                this.investigating = __indicatorVals.minor;
                this.critical = __indicatorVals.critical;
                this.maintenance = __indicatorVals.maintenance;
            }
        }
    }

    /**
     * Converts StatuspageDictionary._metaColors class to JSON
     * 
     * @returns {MetaColors} Returns JSONified version of StatuspageDictionary._metaColors
     */
    static get MetaColors(){
        return JSON.parse(JSON.stringify(new StatuspageDictionary._metaColors()));
    }

    /**
     * Converts StatuspageDictionary._indicatorVals class to JSON
     * 
     * @returns {IndicatorVals} Returns JSONified version of StatuspageDictionary._indicatorVals
     */
    static get IndicatorVals(){
        return JSON.parse(JSON.stringify(new StatuspageDictionary._indicatorVals()));
    }

    /**
     * Converts StatuspageDictionary._indicatorMessages class to JSON
     * @returns {IndicatorMessages} Returns JSONified version of StatuspageDictionary._indicatorMessages
     */
    static get IndicatorMessages(){
        return JSON.parse(JSON.stringify(new StatuspageDictionary._indicatorMessages()));
    }
}

class StorageObject {
    static get staticLocalStorageKey(){
        return 'storageObject';
    }

    static get replaceableStringValue(){
        return '{}';
    }
    
    constructor(baseURL, previousDays, indexHomeSingleRequest, displayUTCTime) {//, _name = null, _description = null, _title = null, _status = null, _themeStatus = null){
        this.settings_baseUrl = baseURL;
        this.settings_previousDays = previousDays;
        this.settings_indexHomeSingleRequest = indexHomeSingleRequest;
        this.settings_displayUTCTime = displayUTCTime;
        
        this.site_name = null;
        this.site_description = null;
        this.site_title = null;
        this.status_main = null;

        if (this.settings_baseUrl.slice(-1) == '/') {
            this.settings_baseUrl = this.settings_baseUrl.substring(0, this.settings_baseUrl.length - 1);
        }

        this.template_title_index = `(Unofficial) ${StorageObject.replaceableStringValue} Status`;
        this.template_title_status = `(Unofficial) Mini ${StorageObject.replaceableStringValue} Status`;
        this.template_title_components = `(Unofficial) ${StorageObject.replaceableStringValue} Status Components`;
        this.template_title_error = `Error - Invalid Route`;
        this.template_descrisption = `An unofficial website to monitor ${StorageObject.replaceableStringValue} status updates.`;
        this.template_descrisption_error = `An error has occured.`;
        this.template_incidents_none = `<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like ${StorageObject.replaceableStringValue} is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>`;

        this.dict_meta_colors = StatuspageDictionary.MetaColors;
        this.dict_indicator_vals = StatuspageDictionary.IndicatorVals;
        this.dict_indicator_messages = StatuspageDictionary.IndicatorMessages;

        this.api_json = null;

        this.localStorageKey = StorageObject.staticLocalStorageKey;

        this.toLocalStorage();
    }

    /**
     * 
     * @returns {StorageObject}
     */
    setError(){
        this.setName(this.template_title_error);
        this.setTitleError();
        this.setDescription(this.template_descrisption_error);
        return this.toLocalStorage();
    }

    /**
     * 
     * @param {object} apiJson 
     * @returns {StorageObject}
     */
    setApiJson(apiJson){
        if (typeof(apiJson) == "object") {
            this.api_json = apiJson;
            
            this.setName(apiJson.page.name);
            if('status' in apiJson) { this.setStatus(apiJson.status.indicator);  }

            this.setDescription('status' in apiJson ? apiJson.status.description : null);
        }

        return this.toLocalStorage();
    }

    /**
     * 
     * @param {string} status 
     * @returns {StorageObject}
     */
    setStatus(status) {
        this.status_main = status;
        return this.toLocalStorage;
    }

    /**
     * 
     * @returns {string}
     */
    getStatus() {
        return this.status_main;
    }

    /**
     * 
     * @param {string} name 
     * @returns {StorageObject}
     */
    setName(name) {
        this.site_name = name;
        return this.toLocalStorage();
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
     * @param {string} template 
     * @returns {StorageObject}
     */
    setTitle(template){
        this.site_title = template.replace(StorageObject.replaceableStringValue, this.site_name);
        return this.toLocalStorage();
    }

    /**
     * 
     * @returns {StorageObject}
     */
    setTitleIndex(){
        return this.setTitle(this.template_title_index);
    }
    
    /**
     * 
     * @returns {StorageObject}
     */
    setTitleStatus(){
        return this.setTitle(this.template_title_status);
    }

    /**
     * 
     * @returns {StorageObject}
     */
    setTitleComponents(){
        return this.setTitle(this.template_title_components);
    }

    /**
     * 
     * @returns {StorageObject}
     */
    setTitleError(){
        return this.setTitle(this.template_title_error);
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
     * @param {string} descript 
     * @returns {StorageObject}
     */
    setDescription(descript = null) {
        if(this.site_description == null){
            this.site_description = this.template_descrisption.replaceAll(StorageObject.replaceableStringValue, this.getName()) + (descript != null ? " | " + descript : "");
        }
        
        return this.toLocalStorage();
    }

    /**
     * 
     * @returns {string}
     */
    getDescription() {
        return this.site_description;
    }

    /**
     * Returns JSON object of class
     * @returns {object}
     */
    toJson() {
        var newJson = JSON.parse(JSON.stringify(this));

        delete newJson['localStorageKey'];

        for (const [key, value] of Object.entries(newJson)) {
            if (key.includes('_')) {
                newJson[`${key.toString().replaceAll('_', '.')}`] = value;
                delete newJson[`${key}`];
            }
        }

        return newJson;
    }

    /**
     * Returns JSON object of class
     * @returns {string}
     */
    toJsonString() {
        return JSON.stringify(this.toJson());
    }

    /**
     * 
     * @returns {StorageObject}
     */
    toLocalStorage(){
        localStorage.setItem(this.localStorageKey, this.toJsonString());
        return this;
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
        this.storageObject = new StorageObject(baseURL, previousDays, indexHomeSingleRequest, displayUTCTime);

        if (document.getElementById('app') == null) {
            document.body.appendChild(StatuspageHTMLElements.AppHTMLElement);
        }

        this.setTheme('loading');
        this.renderElement(StatuspageHTMLElements.LoadingHTMLElement);
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

        if (this.storageObject.settings_indexHomeSingleRequest) {
            const response = await fetch(this.storageObject.settings_baseUrl + '/api/v2/summary.json');
            const result = await response.json();

            // this.storageObject.setApiSummary(result);
            this.storageObject.setApiJson(result);

            // this.storageObject.setThemeStatus(this.storageObject.getStatus());
            this.setTheme(result.status.indicator);

            this.renderElement(StatuspageHTMLElements.SummaryHTMLElement(result));
        } else {
            const statusResponse = await fetch(this.storageObject.settings_baseUrl + '/api/v2/status.json');
            const statusResult = await statusResponse.json();

            const messagesResponse = await fetch(this.storageObject.settings_baseUrl + '/api/v2/incidents.json');
            const messagesResult = await messagesResponse.json();

            this.storageObject.setApiJson(statusResult);

            var elements = [
                StatuspageHTMLElements.StatusHTMLElement(statusResult),
                StatuspageHTMLElements.IncidentsHTMLElements(messagesResult, this.storageObject.settings_previousDays)
            ];

            // this.storageObject.setThemeStatus(this.storageObject.getStatus());
            this.setTheme(statusResult.status.indicator);

            this.renderElements(elements);
        }

        this.storageObject.setTitleIndex();

        this.setTitles().setDescriptions();

        this.storageObject.toLocalStorage();
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

        const response = await fetch(this.storageObject.settings_baseUrl + '/api/v2/components.json');
        const result = await response.json();

        this.storageObject.setApiJson(result);
        this.storageObject.setTitleComponents();

        this.setTitles().setDescriptions();
        this.setTheme(result.components[0].status);

        this.renderElements(StatuspageHTMLElements.ComponentsHTMLElement(result));
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
        const response = await fetch(this.storageObject.settings_baseUrl + '/api/v2/status.json');
        const result = await response.json();

        this.storageObject.setApiJson(result);
        this.storageObject.setTitleStatus();

        this.setTitles().setDescriptions();
        this.setTheme(result.status.indicator);

        this.renderElement(StatuspageHTMLElements.StatusHTMLElement(result, true));
    }

    /**
     * Generates and renders an error page
     */
    ErrorHome() {
        console.log("ErrorHome");

        this.storageObject.setError();

        this.setTitles().createMetaTag("robots", "noindex");

        this.renderElement(StatuspageHTMLElements.ErrorHTMLElement);

        // this.render(StatuspageHTMLElements.ErrorHTMLElement.outerHTML);
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
     * @returns {StatuspageHTML} returns `this`
     */
    renderElements(htmlElements) {
        console.log("renderElements()");

        this.clearRender();

        if (Array.isArray(htmlElements)) {
            for(var element of htmlElements){
                if (element instanceof Element) {
                    this.renderElement(element, true);
                }
            }
        }

        console.log("Success: renderElements()");

        return this;
    }

    /**
     * 
     * @param {Element} htmlElement 
     * @param {@type boolean} [fromArray=false]
     * @returns {StatuspageHTML} returns `this`
     */
    renderElement(htmlElement, fromArray = false) {
        console.log("renderElement()");

        if(!fromArray){ this.clearRender(); }

        if (htmlElement instanceof Element) {
            document.getElementById("app").appendChild(htmlElement);
        }

        console.log("Success: renderElement()");

        return this;
    }

    /**
     * Sets a meta tag
     * 
     * @param {string} id 
     * @param {string} value 
     * @returns {StatuspageHTML} returns `this`
     */
    setMetaTag(id, value) {
        let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
        var metaTag = metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);

        metaTag.setAttribute("content", value);

        return this;
    }

    /**
     * Gets a value from a meta tag
     * 
     * @param {string} id 
     * @returns {string}
     */
    getMetaTag(id) {
        let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
        var metaTag = metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);

        return metaTag.getAttribute("content");
    }

    /**
     * Creates a new meta tag
     * @param {string} id 
     * @param {string} content 
     * @param {string} [attr="name"]
     * @returns {StatuspageHTML} returns `this`
     */
    createMetaTag(id, content, attr = "name") {
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
     * @returns {StatuspageHTML} returns `this`
     */
    updateRichTest(id, value, _type = "WebApplication") {
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

        this.setMetaTag("og:url", currUrl);

        let linkTags = Array.from(document.getElementsByTagName("link"));
        var linkTag = linkTags.find((mTag) => (mTag.getAttribute("rel") == "canonical"));

        linkTag.setAttribute("href", currUrl);

        this.updateRichTest("url", currUrl);

        return this;
    }

    /**
     * Sets title in HTML
     * 
     * @param {string} title 
     * @returns {StatuspageHTML}
     */
    setTitles() {
        document.getElementsByTagName("title")[0].innerHTML = this.storageObject.getTitle();

        this.setMetaTag("twitter:title", this.storageObject.getTitle())
            .setMetaTag("og:title", this.storageObject.getTitle())
            .setMetaTag("application-name", this.storageObject.getTitle())
            .setMetaTag("apple-mobile-web-app-title", this.storageObject.getTitle())
            .updateRichTest("name", this.storageObject.getTitle());

        return this;
    }

    /**
     * Sets description in HTML
     * 
     * @param {string} sitename 
     * @param {string} descript 
     * @returns {StatuspageHTML}
     */
    setDescriptions() {
        this.setMetaTag("description", this.storageObject.getDescription())
            .setMetaTag("og:description", this.storageObject.getDescription())
            .setMetaTag("twitter:description", this.storageObject.getDescription())
            .updateRichTest("description", this.storageObject.getDescription());

        return this;
    }

    /**
     * Sets meta tag themes
     * 
     * @param {string} status 
     * @returns {StatuspageHTML}
     */
    setTheme(status = 'loading') {
        console.log(`setTheme()`);
        var hexColor = StatuspageDictionary.MetaColors[status];

        console.log(`status ${status}`);
        console.log(`hexColor ${hexColor}`);

        this.setMetaTag("theme-color", hexColor).setMetaTag("apple-mobile-web-app-status-bar-style", hexColor);

        return this;
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
        var cloudflareDevRegex = /(spa|master|staging|[1-9A-Za-z-_]+)\.ghstatus\.pages\.dev/g;
        var cloudflareProdRegex = /(githubstat.us|ghstatuspagehtml.b-cdn.net|ghstat.us)/g;
        
        var onCloudflareDev = location.host.match(cloudflareDevRegex) != null;
        var onCloudflareProd = location.host.match(cloudflareProdRegex) != null;

        if (!navigator.onLine) {
            r.ErrorHome();
        } else {
            if (onCloudflareProd || onCloudflareDev) {
                if (location.pathname == '/') {
                    r.IndexHome();
                } else if (location.pathname == '/components/') {
                    r.ComponentsHome();
                } else if (location.pathname == '/status/') {
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