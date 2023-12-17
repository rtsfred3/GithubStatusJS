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
            const emptyIncidents = document.createElement("div");
            emptyIncidents.classList.add("empty", "padding-none");
        
            const emptyIncidentsFirstChild = document.createElement("div");
            const emptyIncidentsSecondChild = document.createElement("div");
            
            emptyIncidentsFirstChild.classList.add('font-36', 'margin-bottom');
            emptyIncidentsSecondChild.classList.add('font-12');
            
            emptyIncidentsFirstChild.appendChild(document.createTextNode("All good."));
        
            emptyIncidentsSecondChild.appendChild(document.createTextNode(`Nothing to see here folks. Looks like ${incidentsJson.page.name} is up and running and has been stable for quite some time.`));
            emptyIncidentsSecondChild.appendChild(document.createElement("br"));
            emptyIncidentsSecondChild.appendChild(document.createElement("br"));
            emptyIncidentsSecondChild.appendChild(document.createTextNode("Now get back to work!"));
        
            emptyIncidents.appendChild(emptyIncidentsFirstChild);
            emptyIncidents.appendChild(emptyIncidentsSecondChild);

            messagesList.appendChild(emptyIncidents);

            // messagesList.appendChild(StatuspageHTMLElements.NoIncidentsHTMLElement(incidentsJson.page.name));
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

/**
 * Static dictionary for default values for Statuspage
 * @class
 */
class StatuspageDictionary {
    static get replaceableStringValue(){
        return '{}';
    }

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
        this.template_title_error = `Error - Invalid Route`;
        this.template_descrisption = `An unofficial website to monitor ${StatuspageDictionary.replaceableStringValue} status updates.`;
        this.template_descrisption_error = `An error has occured.`;
        this.template_incidents_none = `<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like ${StatuspageDictionary.replaceableStringValue} is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>`;

        if (document.getElementById('app') == null) {
            document.body.appendChild(StatuspageHTMLElements.AppHTMLElement);
        }

        this.setTheme('loading').renderElement(StatuspageHTMLElements.LoadingHTMLElement);
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
    setTitle(template) {
        this.site_title = template.replace(StatuspageDictionary.replaceableStringValue, this.getName());
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
        }

        if ('components' in statuspageJson) {
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

        // var elementsList = [];

        if (this.settings_indexHomeSingleRequest) {
            const response = await fetch(this.settings_baseUrl + '/api/v2/summary.json');
            const result = await response.json();

            this.setNameDescriptionTheme(result)
                .renderElements([ StatuspageHTMLElements.StatusHTMLElement(result), StatuspageHTMLElements.IncidentsHTMLElements(result) ]);
        } else {
            const statusResponse = await fetch(this.settings_baseUrl + '/api/v2/status.json');
            const statusResult = await statusResponse.json();

            const messagesResponse = await fetch(this.settings_baseUrl + '/api/v2/incidents.json');
            const messagesResult = await messagesResponse.json();

            var elements = [
                StatuspageHTMLElements.StatusHTMLElement(statusResult),
                StatuspageHTMLElements.IncidentsHTMLElements(messagesResult, this.settings_previousDays)
            ];

            this.setNameDescriptionTheme(statusResult)
                .renderElements(elements);
        }

        this.setTitle(this.template_title_index);
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

        const response = await fetch(this.settings_baseUrl + '/api/v2/components.json');
        const result = await response.json();

        this.setNameDescriptionTheme(result)
            .setTitle(this.template_title_components)
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
        const response = await fetch(this.settings_baseUrl + '/api/v2/status.json');
        const result = await response.json();

        this.setNameDescriptionTheme(result)
            .setTitle(this.template_title_status)
            .renderElement(StatuspageHTMLElements.StatusHTMLElement(result, true));
    }

    /**
     * Generates and renders an error page
     */
    ErrorHome() {
        console.log("ErrorHome");

        this.site_description = this.template_descrisption_error;

        this.setName(this.template_title_error)
            .setTitle(this.template_title_error)
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
                if (element instanceof Element) {
                    document.getElementById("app").appendChild(element);
                }
            }
        }

        console.log("Success: renderElements()");

        return this;
    }

    /**
     * 
     * @param {Element} htmlElement 
     * @returns {StatuspageHTML} 
     */
    renderElement(htmlElement) {
        console.log("renderElement()");

        if (htmlElement instanceof Element) {
            this.clearRender();
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
     * @returns {StatuspageHTML} 
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
        return metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id).getAttribute("content");

        // var metaTag = metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
        // return metaTag.getAttribute("content");
    }

    /**
     * Creates a new meta tag
     * @param {string} id 
     * @param {string} content 
     * @param {string} [attr="name"]
     * @returns {StatuspageHTML} 
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
     * @returns {StatuspageHTML} 
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

        Array.from(document.getElementsByTagName("link"))
            .find((mTag) => (mTag.getAttribute("rel") == "canonical"))
            .setAttribute("href", currUrl);

        return this.setMetaTag("og:url", currUrl).updateRichTest("url", currUrl);
    }

    /**
     * Sets title in HTML
     * 
     * @param {string} title 
     * @returns {StatuspageHTML}
     */
    setTitles() {
        document.getElementsByTagName("title")[0].innerHTML = this.getTitle();

        return this.setMetaTag("twitter:title", this.getTitle())
            .setMetaTag("og:title", this.getTitle())
            .setMetaTag("application-name", this.getTitle())
            .setMetaTag("apple-mobile-web-app-title", this.getTitle())
            .updateRichTest("name", this.getTitle());
    }

    /**
     * Sets description in HTML
     * 
     * @param {string} sitename 
     * @param {string} descript 
     * @returns {StatuspageHTML}
     */
    setDescriptions() {
        return this.setMetaTag("description", this.getDescription())
            .setMetaTag("og:description", this.getDescription())
            .setMetaTag("twitter:description", this.getDescription())
            .updateRichTest("description", this.getDescription());
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

        return this.setMetaTag("theme-color", hexColor).setMetaTag("apple-mobile-web-app-status-bar-style", hexColor);
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
                // r.IndexHome();
                // r.ComponentsHome();
                r.StatusHome();
                // r.ErrorHome();
            }
        }
    } catch(error) {
        console.error(error);
        r.ErrorHome();
    }
}