class Helper {
    /**
     * 
     * @param {object} classObject - class to be converted to JSON
     * @returns {object} Returns JSONified version of class
     */
    static ClassToJson(classObject){
        return JSON.parse(JSON.stringify(classObject));
    }

    /**
     * 
     * @param {object} classObject - class to be converted to JSON
     * @returns {object} Returns JSONified version of class
     */
    static ClassToFormattedJson(classObject){
        return JSON.parse(JSON.stringify(classObject));
    }

    /**
     * 
     * @param {string} indicator 
     * @returns {object}
     */
    static getStatusJson(indicator) {
        return { 'status': { 'indicator': indicator } };
    }
}

class StatuspageDictionary {
    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _metaColors() {
        return class MetaColors {
            constructor(){
                this.none = '#339966';
                this.minor = '#339966';
                this.major = '#E25D10';
                this.critical = '#DC3545';
                this.unavailable = '#4F93BD';
                this.error = '#646464';
                this.maintenance = '#0366D6';
                this.psa = '#D83D42';

                this.good = this.none;
                this.under_maintenance = this.maintenance;
                this.loading = this.unavailable;
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
     * @returns {object} Returns JSONified version of StatuspageDictionary._metaColors
     */
    static get MetaColors(){
        return Helper.ClassToJson(new StatuspageDictionary._metaColors());
    }

    /**
     * Converts StatuspageDictionary._indicatorVals class to JSON
     * @returns {object} Returns JSONified version of StatuspageDictionary._indicatorVals
     */
    static get IndicatorVals(){
        return Helper.ClassToJson(new StatuspageDictionary._indicatorVals());
    }

    /**
     * Converts StatuspageDictionary._indicatorMessages class to JSON
     * @returns {object} Returns JSONified version of StatuspageDictionary._indicatorMessages
     */
    static get IndicatorMessages(){
        return Helper.ClassToJson(new StatuspageDictionary._indicatorMessages());
    }
}

class StorageObject {
    static get staticLocalStorageKey(){
        return 'storageObject';
    }

    static get replaceableStringValue(){
        return '{}';
    }

    constructor(baseURL, previousDays, fetchPsa, indexHomeSingleRequest, displayUTCTime, psaRouteParam, _name = null, _description = null, _title = null, _status = null, _themeStatus = null){
        this.settings_baseUrl = baseURL;
        this.settings_previousDays = previousDays;
        this.settings_showPsa = fetchPsa;
        this.settings_indexHomeSingleRequest = indexHomeSingleRequest;
        this.settings_displayUTCTime = displayUTCTime;
        this.settings_psaRoute = psaRouteParam;
        
        this.site_name = _name;
        this.site_description = _description;
        this.site_title = _title;
        this.status_main = _status;
        this.status_theme = _themeStatus;

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

        this.api_summary = null;
        this.api_status = null;
        this.api_components = null;
        this.api_incidents_unresolved = null;
        this.api_incidents_all = null;
        this.api_maintenances_upcoming = null;
        this.api_maintenances_active = null;
        this.api_maintenances_all = null;

        this.localStorageKey = StorageObject.staticLocalStorageKey;
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
     * @param {object} summaryJson 
     * @returns {StorageObject}
     */
    setApiSummary(summaryJson){
        this.api_summary = summaryJson;
        this.setStatus(summaryJson.status.indicator);
        this.setName(summaryJson.page.name);
        this.setDescription(summaryJson.status.description);
        return this.toLocalStorage();
    }

    /**
     * 
     * @param {object} statusJson 
     * @returns {StorageObject}
     */
    setApiStatus(statusJson){
        this.api_status = statusJson;
        this.setStatus(statusJson.status.indicator);
        this.setName(statusJson.page.name);
        this.setDescription(statusJson.status.description);
        return this.toLocalStorage();
    }

    /**
     * 
     * @param {object} componentsJson 
     * @returns {StorageObject}
     */
    setApiComponents(componentsJson){
        this.api_components = componentsJson;
        this.setName(componentsJson.page.name);
        this.setDescription();
        return this.toLocalStorage();
    }

    /**
     * 
     * @param {object} incidentsJson 
     * @returns {StorageObject}
     */
    setApiIncidentsAll(incidentsJson){
        this.api_incidents_all = incidentsJson;
        this.setName(incidentsJson.page.name);
        this.setDescription();
        return this.toLocalStorage();
    }

    /**
     * 
     * @param {object} incidentsJson 
     * @returns {StorageObject}
     */
    setApiIncidentsUnresolved(incidentsJson){
        this.api_incidents_unresolved = incidentsJson;
        this.setName(incidentsJson.page.name);
        this.setDescription();
        return this.toLocalStorage();
    }

    /**
     * 
     * @param {object} maintenancesJson 
     * @returns {StorageObject}
     */
    setApiMaintenancesUpcoming(maintenancesJson){
        this.api_maintenances_upcoming = maintenancesJson;
        this.setName(maintenancesJson.page.name);
        this.setDescription();
        return this.toLocalStorage();
    }

    /**
     * 
     * @param {object} maintenancesJson 
     * @returns {StorageObject}
     */
    setApiMaintenancesActive(maintenancesJson){
        this.api_maintenances_active = maintenancesJson;
        this.setName(maintenancesJson.page.name);
        this.setDescription();
        return this.toLocalStorage();
    }

    /**
     * 
     * @param {object} maintenancesJson 
     * @returns {StorageObject}
     */
    setApiMaintenancesAll(maintenancesJson){
        this.api_maintenances_all = maintenancesJson;
        this.setName(maintenancesJson.page.name);
        this.setDescription();
        return this.toLocalStorage();
    }

    /**
     * 
     * @param {boolean} b 
     * @returns {StorageObject}
     */
    setShowPsa(b) {
        this.settings_showPsa = b;

        return this;
    }

    /**
     * 
     * @returns {boolean}
     */
    setShowPsa() {
        return this.settings_showPsa;
    }

    /**
     * 
     * @param {string} status 
     * @returns {StorageObject}
     */
    setStatus(status) {
        this.status_main = status;

        return this;
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
     * @param {string} status 
     * @returns {StorageObject}
     */
    setThemeStatus(status) {
        this.status_theme = status;
        
        return this;
    }

    /**
     * 
     * @returns {string}
     */
    getThemeStatus() {
        return this.status_theme;
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
     * @returns {string}
     */
    getIncidentsNoneHTML(){
        return this.template_incidents_none.replaceAll(StorageObject.replaceableStringValue, this.getName());
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
     * 
     * @param {string} key 
     * @param {*} value 
     */
    update(key, value) {
        var obj = this.toJson();
        obj[key] = value;
        this.fromJson(obj);
    }

    /**
     * 
     * @param {string} key 
     * @param {*} value 
     */
    set(key, value) {
        this.update(key, value);
    }

    /**
     * Returns JSON object of class
     * @returns {object}
     */
    toJson() {
        var newJson = Helper.ClassToJson(this);

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
     * @param {object} jsonObj 
     * @returns {StorageObject}
     */
    fromJson(jsonObj){
        console.log(jsonObj);

        this.settings_baseUrl = jsonObj["settings.baseUrl"];
        this.settings_previousDays = jsonObj["settings.previousDays"];
        this.settings_showPsa = jsonObj["settings.showPsa"];
        this.settings_indexHomeSingleRequest = jsonObj["settings.indexHomeSingleRequest"];
        this.settings_displayUTCTime = jsonObj["settings.displayUTCTime"];
        this.settings_psaRoute = jsonObj["settings.psaRoute"];

        this.site_name = jsonObj["site.name"];
        this.site_description = jsonObj["site.description"];
        this.site_title = jsonObj["site.title"];
        this.status_main = jsonObj["site.main"];
        this.status_theme = jsonObj["site.theme"];

        this.template_title_index = jsonObj["template.title.index"];
        this.template_title_status = jsonObj["template.title.status"];
        this.template_title_components = jsonObj["template.title.components"];
        this.template_descrisption = jsonObj["template.description"];
        this.template_incidents_none = jsonObj["template.incidents.none"];

        this.api_summary = jsonObj["api.summary"];
        this.api_status = jsonObj["api.status"];
        this.api_components = jsonObj["api.components"];
        this.api_incidents_unresolved = jsonObj["api.incidents.unresolved"];
        this.api_incidents_all = jsonObj["api.incidents.all"];
        this.api_maintenances_upcoming = jsonObj["api.maintenances.upcoming"];
        this.api_maintenances_active = jsonObj["api.maintenances.active"];
        this.api_maintenances_all = jsonObj["api.maintenances.all"];

        this.dict_meta_colors = StatuspageDictionary.MetaColors;
        this.dict_indicator_vals = StatuspageDictionary.IndicatorVals;
        this.dict_indicator_messages = StatuspageDictionary.IndicatorMessages;

        this.localStorageKey = StorageObject.staticLocalStorageKey;

        return this;
    }

    /**
     * 
     * @param {string} jsonStr 
     * @returns {StorageObject}
     */
    fromJsonString(jsonStr){
        return this.fromJson(JSON.parse(jsonStr));
    }

    /**
     * 
     * @param {object} jsonObject 
     * @returns {StorageObject}
     */
    static fromJson(jsonObject){
        var newStorageObject = new StorageObject(jsonObject["settings.baseUrl"]);

        return newStorageObject.fromJson(jsonObject);
    }

    /**
     * 
     * @returns {StorageObject}
     */
    toLocalStorage(){
        localStorage.setItem(this.localStorageKey, this.toJsonString());
        return this;
    }

    /**
     * 
     * @returns {StorageObject}
     */
    fromLocalStorage(){
        console.log('fromLocalStorage(): ' + localStorage.getItem(this.localStorageKey));

        return this.fromJsonString(localStorage.getItem(this.localStorageKey));
    }

    /**
     * 
     * @returns {StorageObject}
     */
    static fromLocalStorage(){
        console.log('[static] fromLocalStorage()');

        var storageObject = JSON.parse(localStorage.getItem(StorageObject.staticLocalStorageKey));

        return StorageObject.fromJson(storageObject);
    }
}

class StatuspageHTML {
    /**
     * @param {string} baseURL Atlassian Statuspage URL - Required
     * @param {number} [previousDays=7] Shows previous upto the N days of incidents (if set to 0, all incidents shown)
     * @param {boolean} [fetchPsa=false] PSA will get fetched and displayed if PSA is set to be shown in psa.json.
     * @param {boolean} [indexHomeSingleRequest=true] If true, StatuspageHTML will show IndexHome() using the Statuspage summary. If false, StatuspageHTML will show IndexHome() using the Statuspage status and incidents.
     * @param {boolean} [displayUTCTime=false] If true, incident times will be shown in UTC; if false, incident times will be shown in local time.
     * @param {string} [_psaRouteParam='/psa.json'] PSA route is now passable as a parameter
     */
    constructor(baseURL, previousDays = 7, fetchPsa = false, indexHomeSingleRequest = true, displayUTCTime = false, _psaRouteParam = '/psa.json') {
        this.storageObject = new StorageObject(baseURL, previousDays, fetchPsa, indexHomeSingleRequest, displayUTCTime, _psaRouteParam);
        
        this.loading = this.StatusHTML(Helper.getStatusJson('loading'), true);
        this.render(this.loading);

        this.fetchPsa();
    }

    // emptyIncidentsElement(sitename) {
    //     const emptyIncidents = document.createElement("div");
    //     emptyIncidents.classList.add("empty", "padding-none");

    //     const emptyIncidentsFirstChild = document.createElement("div");
    //     const emptyIncidentsSecondChild = document.createElement("div");

    //     emptyIncidentsFirstChild.classList.add('font-36', 'margin-bottom');
    //     emptyIncidentsSecondChild.classList.add('font-12');

    //     emptyIncidentsFirstChild.appendChild(document.createTextNode("All good."));

    //     emptyIncidentsSecondChild.appendChild(document.createTextNode("Nothing to see here folks. Looks like " + sitename + " is up and running and has been stable for quite some time."));
    //     emptyIncidentsSecondChild.appendChild(document.createElement("br"));
    //     emptyIncidentsSecondChild.appendChild(document.createElement("br"));
    //     emptyIncidentsSecondChild.appendChild(document.createTextNode("Now get back to work!"));

    //     emptyIncidents.appendChild(emptyIncidentsFirstChild);
    //     emptyIncidents.appendChild(emptyIncidentsSecondChild);

    //     return emptyIncidents.outerHTML;
    // } 

    /**
     * Converts IndexHomeAsync to a synchronous method
     */
    IndexHome() {
        console.log("IndexHome");

        this.IndexHomeAsync().then();
    }

    /**
     * Fetches Status & Incidents and renders the HTML
     */
    async IndexHomeAsync() {
        this.setUrl();

        if (this.storageObject.settings_indexHomeSingleRequest) {
            const response = await fetch(this.storageObject.settings_baseUrl + '/api/v2/summary.json');
            const result = await response.json();

            this.storageObject.setApiSummary(result);
            
            // var statusHTML = this.StatusHTML(result);
            // var messagesHTML = this.MessagesHTML(result);
            // this.render(statusHTML + messagesHTML);

            this.render(this.SummaryHTML(result));
        } else {
            const statusResponse = await fetch(this.storageObject.settings_baseUrl + '/api/v2/status.json');
            const statusResult = await statusResponse.json();

            const messagesResponse = await fetch(this.storageObject.settings_baseUrl + '/api/v2/incidents.json');
            const messagesResult = await messagesResponse.json();

            this.storageObject.setApiStatus(statusResult);
            this.storageObject.setApiIncidentsAll(messagesResult);

            // var statusHTML = this.StatusHTML(statusResult);
            // var messagesHTML = this.MessagesHTML(messagesResult);
            // this.render(statusHTML + messagesHTML);

            this.render(this.SummaryHTML(result));
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
     */
    async ComponentsHomeAsync() {
        console.log("ComponentsHomeAsync");

        const response = await fetch(this.storageObject.settings_baseUrl + '/api/v2/components.json');
        const result = await response.json();

        this.storageObject.setApiComponents(result);
        this.storageObject.setTitleComponents();

        this.setTitles().setDescriptions();

        var html = this.ComponentsHTML(result);

        this.render(html);
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
     */
    async StatusHomeAsync() {
        const response = await fetch(this.storageObject.settings_baseUrl + '/api/v2/status.json');
        const result = await response.json();

        this.storageObject.setApiStatus(result);
        this.storageObject.setTitleStatus();

        this.setTitles().setDescriptions();

        var statusHTML = this.StatusHTML(result, true);

        this.render(statusHTML);
    }

    /**
     * Generates and renders an error page
     */
    ErrorHome() {
        console.log("ErrorHome");

        this.storageObject.setError();

        this.setTitles().createMetaTag("robots", "noindex");

        var errorHTML = this.StatusHTML(Helper.getStatusJson('error'), true);

        this.render(errorHTML);
    }

    /**
     * Inverts the index page loads the summary or if it loads status and incidents seperately
     * @returns {StatuspageHTML}
     */
    invertIndexHomeSingleRequest(){
        this.storageObject.settings_indexHomeSingleRequest = !this.storageObject.settings_indexHomeSingleRequest;

        return this;
    }

    /**
     * 
     * @returns {StatuspageHTML}
     */
    fetchPsa(){
        if (this.storageObject.settings_showPsa && document.getElementById("psa")) {
            this.fetchPsaAsync().then();
            this.setTheme();
        } else {
            this.hidePSA();
            this.setTheme(this.storageObject.getStatus());
        }

        return this;
    }

    /**
     * Async fetches the PSA
     */
    async fetchPsaAsync() {
        console.log('fetchPsaAsync');

        const response = await fetch(this.storageObject.settings_psaRoute);
        const result = await response.json();

        this.showPSA(result);
    }

    /**
     * 
     * @returns {boolean}
     */
    hasPSA(){
        return !document.getElementById("psa").classList.contains('hide');
    }

    /**
     * Sets PSA if PSA should be shown 
     * @param {Array} psaResult 
     * @returns {StatuspageHTML}
     */
    showPSA(psaResult) {
        if (psaResult["showPSA"]) {
            document.getElementById("psa").innerHTML = '<div class="center-status">' + psaResult["PSA"] + '</div>';
            
            document.getElementById("psa").classList.remove("hide");

            this.storageObject.setShowPsa(true);
        } else {
            this.storageObject.setShowPsa(false);

            if (document.getElementById("psa").classList.contains('hide')) {
                document.getElementById("psa").classList.add('hide');
            }
        }

        this.setTheme('psa');

        this.storageObject.setShowPsa(this.storageObject.settings_showPsa && psaResult["showPSA"] && this.hasPSA());

        return this;
    }

    /**
     * 
     * @returns {StatuspageHTML}
     */
    hidePSA() {
        if (!this._showPsa && this.hasPSA()) {
            document.getElementById("psa").classList.add("hide");

            this.storageObject.setShowPsa(false);

            this.setTheme(this.storageObject.getStatus());
        }

        return this;
    }

    /**
     * Renders a string of HTML in <div id="app">
     * @param {string} html 
     * @returns {StatuspageHTML}
     */
    render(html) {
        document.getElementById("app").innerHTML = html;

        return this;
    }

    /**
     * Sets a meta tag
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
     * @param {string} attr 
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
     * @returns {StatuspageHTML}
     */
    updateRichTest(id, value) {
        var ld = Array.from(document.getElementsByTagName("script")).find((t) => t.hasAttribute("type") && t.getAttribute("type") == "application/ld+json");

        if (ld == null) {
            return this;
        }

        var ldJson = JSON.parse(ld.innerHTML);

        if (Array.isArray(ldJson)) {
            ldJson[0][id] = value;
        } else {
            ldJson[id] = value;
        }

        ld.innerHTML = JSON.stringify(ldJson, null, 4);

        return this;
    }

    /**
     * Sets urls to current or defined url
     * @param {string} url 
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
     * @param {string} status 
     * @returns {StatuspageHTML}
     */
    setTheme(status = null) {
        this.storageObject.setThemeStatus((this.hasPSA() || status == 'psa' || status == null) ? 'psa' : status);

        var hexColor = StatuspageDictionary.MetaColors[this.storageObject.status_theme];

        this.setMetaTag("theme-color", hexColor).setMetaTag("apple-mobile-web-app-status-bar-style", hexColor);

        return this;
    }

    /**
     * 
     * @param {object} summaryJson 
     * @returns {string}
     */
    SummaryHTML(summaryJson){
        return this.StatusHTML(summaryJson) + this.MessagesHTML(summaryJson);
    }

    /**
     * Generates HTML for a status
     * @param {string} status 
     * @param {bool} fullStatus 
     * @returns {string}
     */
    getStatus(status, fullStatus = false) {
        var height = fullStatus ? (document.getElementById("psa").classList.contains('hide') ? 'full-status-height' : 'psa-full-status-height') : 'status-height status-shadow';

        return '<div id="status" class="' + height + ' status-width bold status-color ' + status.toLowerCase() + '"><span class="center-status">' + StatuspageDictionary.IndicatorVals[status].toUpperCase() + '</span></div>';
    }

    /**
     * Gets HTML for a status
     * @param {object} arr 
     * @param {bool} fullStatus 
     * @returns {string}
     */
    StatusHTML(arr, fullStatus = false) {
        // console.log('Status()');
        this.storageObject.setStatus(arr.status.indicator);
        return this.setTheme(arr.status.indicator).getStatus(arr.status.indicator, fullStatus);
    }

    /**
     * Returns an incident update
     * @param {string} incident_update_id 
     * @param {string} name 
     * @param {string} impact 
     * @param {string} status 
     * @param {string} body 
     * @param {*} created_at 
     * @param {string} shortlink 
     * @param {bool} isOldestStatus 
     * @returns {string}
     */
    createMessage(incident_update_id, name, impact, status, body, created_at, shortlink, isOldestStatus) {
        var options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        var out = '';

        // var w = (status == "resolved" ? "good" : (impact == 'none' ? 'good' : impact));
        var w = (status == "resolved" ? "good" : impact);

        if (w == undefined) { w = StatuspageDictionary.IndicatorMessages[status]; }

        out += '<div class="status-box ' + w + '-message"><span class="message-status"><div class="right">' + w + '</div></span></div>';

        var date = new Date(created_at).toLocaleDateString("en-US", options);

        if (this._displayUTCTime) {
            options = { month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' };
            var t_date = new Date(created_at);
            t_date = Date.UTC(t_date.getUTCFullYear(), t_date.getUTCMonth(), t_date.getUTCDate(), t_date.getUTCHours() + (t_date.getTimezoneOffset() / 60), t_date.getUTCMinutes(), t_date.getUTCSeconds());
            date = new Date(t_date).toLocaleDateString("en-US", options) + ' UTC';
        }

        body = body.replace(/http(s)?:\/\/[^ ]+/g, (match, p1, offset, string, groups) => {
            return '<a href="' + match + '">here</a>.';
        });

        date = '<span class="date empty">' + date + '</span>';

        // body += w == 'good' ? '<br /><span class="date empty">Incident Page: </span><a class="date empty" href="' + shortlink + '">' + shortlink + '</a>' : '';
        out += '<div class="text-margin">' + body + '<br />' + date + '</div>';

        return `<span id="${incident_update_id}">${out}</span>`;// + out + "</span>";
    }

    /**
     * Returns HTML string containing incidents for past seven days
     * @param {object} mess 
     * @returns {string}
     */
    MessagesHTML(mess) {
        var out = '';

        // var patt = /(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\/([a-zA-Z0-9-\/_.])*[^.]/i;

        var previousDate = new Date();
        previousDate.setHours(0, 0, 0);
        var previousDaysDate = previousDate.setDate((new Date).getDate() - this.storageObject.settings_previousDays);

        var incidents = this._previousDays == 0 ? mess["incidents"] : mess["incidents"].filter(function (incident) { return new Date(incident["created_at"]) > previousDaysDate; });

        if (incidents.length == 0) {
            out += this.storageObject.getIncidentsNoneHTML();

            // out = this.emptyIncidentsElement(this.getName());
            // out = this.storageObject.template_incidents_none.replace("{}", this.getName());
            // out = '<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like GitHub is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>';
        } else {
            for (var i = 0; i < incidents.length; i++) {
                if (incidents[i]["incident_updates"].length > 0) {
                    out += `<span id="${incidents[i].id}">`;
                    for (var j = 0; j < incidents[i]["incident_updates"].length; j++) {
                        out += this.createMessage(
                            incidents[i].id,
                            incidents[i].name,
                            incidents[i].impact,
                            incidents[i]["incident_updates"][j].status,
                            mess["incidents"][i]["incident_updates"][j].body,
                            mess["incidents"][i]["incident_updates"][j].created_at,
                            mess["incidents"][i].shortlink, 
                            (j == incidents[i]["incident_updates"].length - 1)
                        );
                    }
                    out += '</span>';
                }
            }
        }

        return '<div id="messages" class="messages">' + out + '</div>';
    }

    /**
     * Gets individual component
     * @param {object} curr 
     * @returns {string}
     */
    makeComponent(curr) {
        return '<div' + (curr["id"] != null ? ' id="' + curr["id"] + '"' : '') + ' class="component-height status-width bold status-color ' + StatuspageDictionary.IndicatorVals[curr["status"]] + '"><span class="center-status">' + curr["name"] + '</span></div>';
    }

    /**
     * 
     * @param {object} a 
     * @param {object} b 
     * @returns {int}
     */
    compareComponents(a, b) {
        if (a["position"] < b["position"]) {
            return -1;
        }
        else if (a["position"] > b["position"]) {
            return 1;
        }

        return 0;
    }

    /**
     * 
     * @param {Array} compArr 
     * @param {string} groupId 
     * @param {string} groupName 
     * @returns {string}
     */
    groupedComponents(compArr, groupId, groupName = null) {
        var groupComp = this.makeComponent(compArr.filter((component) => component["id"] == groupId)[0], null, true);

        var group = compArr.filter((component) => component["group_id"] == groupId).sort(this.compareComponents);

        return groupComp + group.map((comp) => this.makeComponent(comp, groupName)).join('');
    }

    /**
     * Returns HTML string of all components
     * @param {object} comp 
     * @returns {string}
     */
    ComponentsHTML(comp) {
        var out = '';

        // var groups = comp["components"].filter((component) => component.group == true).sort(this.compareComponents);
        // for (const group of groups) { out += this.groupedComponents(comp["components"], group["id"]); }

        this.setTheme(StatuspageDictionary.IndicatorVals[comp["components"][0]["status"]]);

        for (var i = 0; i < comp["components"].length; i++) {
            if (comp["components"][i]["name"].substring(0, 5) == 'Visit') { continue; }
            // if (comp["components"][i]["group_id"] != null || comp["components"][i]["group"]) { continue; }
            out += this.makeComponent(comp["components"][i]);
        }

        return out;
    }
}

/**
 * @param {string} url Atlassian Statuspage URL - Required
 * @param {number} [previousDays=7] Shows previous upto the N days of incidents (if set to 0, all incidents shown)
 * @param {boolean} [showPSA=false] PSA will get fetched and displayed if PSA is set to be shown in psa.json.
 * @param {boolean} [indexHomeSingleRequest=true] If true, StatuspageHTML will show IndexHome() using the Statuspage summary. If false, StatuspageHTML will show IndexHome() using the Statuspage status and incidents.
 * @param {boolean} [displayUTCTime=false] If true, incident times will be shown in UTC; if false, incident times will be shown in local time.
 * @param {string} [_psaRouteParam='/psa.json'] PSA route is now passable as a parameter
 */
function Router(url, previousDays = 7, showPSA = false, indexHomeSingleRequest = true, displayUTCTime = false, _psaRouteParam = '/psa.json') {
    var r = new StatuspageHTML(url, previousDays, showPSA, indexHomeSingleRequest, displayUTCTime, _psaRouteParam);

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
                // r.StatusHome();
                r.ErrorHome();
            }
        }
    } catch(error) {
        console.error(error);
        r.ErrorHome();
    }
}