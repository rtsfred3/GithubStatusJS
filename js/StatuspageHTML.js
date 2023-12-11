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
     * 
     * @param {object} classObject - class to be converted to JSON
     * @returns {object} Returns JSONified version of class
     */
    static ClassToJson(classObject){
        return JSON.parse(JSON.stringify(classObject))
    }

    /**
     * Converts StatuspageDictionary._metaColors class to JSON
     * @returns {object} Returns JSONified version of StatuspageDictionary._metaColors
     */
    static get MetaColors(){
        return StatuspageDictionary.ClassToJson(new StatuspageDictionary._metaColors());
    }

    /**
     * Converts StatuspageDictionary._indicatorVals class to JSON
     * @returns {object} Returns JSONified version of StatuspageDictionary._indicatorVals
     */
    static get IndicatorVals(){
        return StatuspageDictionary.ClassToJson(new StatuspageDictionary._indicatorVals());
    }

    /**
     * Converts StatuspageDictionary._indicatorMessages class to JSON
     * @returns {object} Returns JSONified version of StatuspageDictionary._indicatorMessages
     */
    static get IndicatorMessages(){
        return StatuspageDictionary.ClassToJson(new StatuspageDictionary._indicatorMessages());
    }
}

class StatuspageHTML {
    /**
     * @param {string} baseURL Atlassian Statuspage URL - Required
     * @param {number} [previousDays=7] Shows previous upto the N days of incidents (if set to 0, all incidents shown)
     * @param {boolean} [fetchPsa=false] PSA will get fetched and displayed if PSA is set to be shown in psa.json.
     * @param {boolean} [indexHomeSingleRequest=true] If true, StatuspageHTML will show IndexHome() using the Statuspage summary. If false, StatuspageHTML will show IndexHome() using the Statuspage status and incidents.
     * @param {boolean} [displayUTCTime=false] If true, incident times will be shown in UTC; if false, incident times will be shown in local time.
     */
    constructor(baseURL, previousDays = 7, fetchPsa = false, indexHomeSingleRequest = true, displayUTCTime = false) {
        this.baseURL = baseURL;
        this._previousDays = previousDays;
        this._fetchPsa = fetchPsa;
        this._indexHomeSingleRequest = indexHomeSingleRequest;
        this._displayUTCTime = displayUTCTime;

        this._name = null;
        this._description = null;
        this._showPsa = false;

        this.psaRoute = '/psa.json';

        this.loading = this.Status(this.getStatusJson('loading'), true);
        this.render(this.loading);

        if (this.baseURL.slice(-1) == '/') {
            this.baseURL = this.baseURL.substring(0, this.baseURL.length - 1);
        }
        
        if (this._fetchPsa && document.getElementById("psa")) {
            this.fetchPsaAsync().then();
        }

        this.noIncidentsTemplate = '<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like {} is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>';

        this.titleIndexTemplate = "(Unofficial) {} Status";
        this.titleStatusTemplate = "(Unofficial) Mini {} Status";
        this.titleComponentsTemplate = "(Unofficial) {} Status Components";

        this.descriptionTemplate = "An unofficial website to monitor {} status updates.";
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
     * Inverts the index page loads the summary or if it loads status and incidents seperately
     * @returns {StatuspageHTML}
     */
    invertIndexHomeSingleRequest(){
        this._indexHomeSingleRequest = !this._indexHomeSingleRequest;

        return this;
    }

    /**
     * Inverts whether or not UTC or local time is shown
     * @returns {StatuspageHTML}
     */
    invertDisplayUTCTime(){
        this._displayUTCTime = !this._displayUTCTime;

        return this;
    }

    /**
     * Sets name in class
     * @param {string} name 
     * @returns {StatuspageHTML}
     */
    setName(name) {
        this._name = name;

        return this;
    }

    /**
     * Gets name in class
     * @returns {string}
     */
    getName() {
        return this._name;
    }

    /**
     * Sets description in class
     * @param {string} sitename The Atlassian Statuspage page name
     * @param {string?} descript A field for attional description details
     * @returns {StatuspageHTML}
     */
    setDescript(sitename, descript = null) {
        this._description = this.descriptionTemplate.replace("{}", sitename) + (descript != null ? " | " + descript : "");
        
        return this;
    }

    /**
     * Gets description in class
     * @returns {string}
     */
    getDescript() {
        return this._description;
    }

    /**
     * Async fetches the PSA
     */
    async fetchPsaAsync() {
        console.log("fetchPsaAsync");

        const response = await fetch(this.psaRoute);
        const result = await response.json();

        this.setPSA(result);
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
     */
    async IndexHomeAsync() {
        this.setUrl();

        if (this._indexHomeSingleRequest) {
            const response = await fetch(this.baseURL + '/api/v2/summary.json');
            const result = await response.json();

            this.setName(result.page.name).setDescript(result.page.name, result.status.description);

            var statusHTML = this.Status(result);
            var messagesHTML = this.Messages(result);

            this.render(statusHTML + messagesHTML);
        } else {
            const statusResponse = await fetch(this.baseURL + '/api/v2/status.json');
            const statusResult = await statusResponse.json();

            const messagesResponse = await fetch(this.baseURL + '/api/v2/incidents.json');
            const messagesResult = await messagesResponse.json();

            this.setName(statusResult.page.name).setDescript(statusResult.page.name, statusResult.status.description);

            var statusHTML = this.Status(statusResult);
            var messagesHTML = this.Messages(messagesResult);

            this.render(statusHTML + messagesHTML);
        }

        this.setTitle(this.titleIndexTemplate.replace("{}", this.getName())).setDescriptions();
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

        const response = await fetch(this.baseURL + '/api/v2/components.json');
        const result = await response.json();

        this.setName(result.page.name)
            .setTitle(this.titleComponentsTemplate.replace("{}", this.getName()))
            .setDescriptions(this.getName());

        var html = this.Components(result);

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
        const response = await fetch(this.baseURL + '/api/v2/status.json');
        const result = await response.json();

        this.setName(result.page.name).setDescript()
            .setTitle(this.titleStatusTemplate.replace("{}", this.getName()))
            .setDescriptions(this.getName(), result.status.description);

        var statusHTML = this.Status(result, true);

        this.render(statusHTML);
    }

    /**
     * Generates and renders an error page
     */
    ErrorHome() {
        console.log("ErrorHome");

        this.setTitle("Error - Invalid Route").createMetaTag("robots", "noindex");

        var errorHTML = this.Status(this.getStatusJson('error'), true);

        this.render(errorHTML);
    }

    /**
     * Sets PSA if PSA should be shown 
     * @param {Array} psaResult 
     * @returns {StatuspageHTML}
     */
    setPSA(psaResult) {
        if (psaResult["showPSA"]) {
            // const newDiv = document.createElement("div");
            // newDiv.classList.add('center-status');
            // newDiv.appendChild(document.createTextNode(psaResult["PSA"]));
            // document.getElementById("psa").appendChild(newDiv);

            document.getElementById("psa").innerHTML = '<div class="center-status">' + psaResult["PSA"] + '</div>';
            
            document.getElementById("psa").classList.remove("hide");

            this.setTheme('psa');

            this._showPsa = true;
        }

        return this;
    }

    /**
     * Create a dummy Status JSON 
     * @param {string} indicator 
     * @returns {object}
     */
    getStatusJson(indicator) {
        return { 'status': { 'indicator': indicator } };
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
    setTitle(title) {
        document.getElementsByTagName("title")[0].innerHTML = title;

        this.setMetaTag("twitter:title", title)
            .setMetaTag("og:title", title)
            .setMetaTag("application-name", title)
            .setMetaTag("apple-mobile-web-app-title", title)
            .updateRichTest("name", title);

        return this;
    }

    /**
     * Sets description in HTML
     * @param {string} sitename 
     * @param {string} descript 
     * @returns {StatuspageHTML}
     */
    setDescriptions(sitename = null, descript = null) {
        if (sitename != null) {
            this.setDescript(sitename, descript);
        }

        this.setMetaTag("description", this.getDescript())
            .setMetaTag("og:description", this.getDescript())
            .setMetaTag("twitter:description", this.getDescript())
            .updateRichTest("description", this.getDescript());

        return this;
    }

    /**
     * Sets meta tag themes
     * @param {string} status 
     * @returns {StatuspageHTML}
     */
    setTheme(status) {
        var hexColor = (this._showPsa || status == 'psa') ? StatuspageDictionary.MetaColors['psa'] : StatuspageDictionary.MetaColors[status];

        this.setMetaTag("theme-color", hexColor).setMetaTag("apple-mobile-web-app-status-bar-style", hexColor);

        return this;
    }

    /**
     * Generates HTML for a status
     * @param {string} status 
     * @param {bool} fullStatus 
     * @returns {string}
     */
    getStatus(status, fullStatus = false) {
        // console.log('getStatus()');
        var height = fullStatus ? (document.getElementById("psa").classList.contains('hide') ? 'full-status-height' : 'psa-full-status-height') : 'status-height status-shadow';

        return '<div id="status" class="' + height + ' status-width bold status-color ' + status.toLowerCase() + '"><span class="center-status">' + StatuspageDictionary.IndicatorVals[status].toUpperCase() + '</span></div>';
    }

    /**
     * Gets HTML for a status
     * @param {object} arr 
     * @param {bool} fullStatus 
     * @returns {string}
     */
    Status(arr, fullStatus = false) {
        // console.log('Status()');
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
    Messages(mess) {
        var out = '';

        // var patt = /(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\/([a-zA-Z0-9-\/_.])*[^.]/i;

        var previousDate = new Date();
        previousDate.setHours(0, 0, 0);
        var previousDaysDate = previousDate.setDate((new Date).getDate() - this._previousDays);

        var incidents = this._previousDays == 0 ? mess["incidents"] : mess["incidents"].filter(function (incident) { return new Date(incident["created_at"]) > previousDaysDate; });

        if (incidents.length == 0) {
            // out = this.emptyIncidentsElement(this.getName());
            out = this.noIncidentsTemplate.replace("{}", this.getName());
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
    Components(comp) {
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
 */
function Router(url, previousDays = 7, showPSA = false, indexHomeSingleRequest = true, displayUTCTime = false) {
    var r = new StatuspageHTML(url, previousDays, showPSA, indexHomeSingleRequest, displayUTCTime);

    try {
        var cloudflareDevRegex = /(spa|master|staging|[1-9A-Za-z-_]+)\.ghstatus\.pages\.dev/g;
        var cloudflareProdRegex = /(githubstat.us|ghstatuspagehtml.b-cdn.net|ghstat.us)/g;
        
        var onCloudflareDev = location.host.match(cloudflareDevRegex) != null;
        var onCloudflareProd = location.host.match(cloudflareProdRegex) != null;
        
        // console.log('onCloudflareDev', onCloudflareDev);
        // console.log('onCloudflareProd', onCloudflareProd);

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
        r.ErrorHome();
    }
}