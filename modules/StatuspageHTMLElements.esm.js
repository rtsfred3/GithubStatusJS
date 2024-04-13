import StatuspageDictionary from '../StatuspageDictionary.esm.js';

export default class StatuspageHTMLElements {
    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get ErrorHTMLElement(){
        return StatuspageHTMLElements.StatusHTMLElement(StatuspageDictionary.StatusEnums.error, true);
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
     * @param {object} componentsJson
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
        appleTouchIcon.setAttribute('apple-touch-icon', 'icon');
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