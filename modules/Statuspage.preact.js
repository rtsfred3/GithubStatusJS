import { h, useState, useCallback, Component } from 'preact';
import htm from 'https://esm.sh/htm';

// import { useState } from 'preact/hooks';

class StatuspageDictionary {
    static get replaceableStringValue() { return '{}'; }

    static get StatuspageHTMLTemplates() {
        return {
            template_title_index: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status`,
            template_title_status: `(Unofficial) Mini ${StatuspageDictionary.replaceableStringValue} Status`,
            template_title_components: `(Unofficial) ${StatuspageDictionary.replaceableStringValue} Status Components`,
            template_descrisption: `An unofficial website to monitor ${StatuspageDictionary.replaceableStringValue} status updates.`,
        };
    }

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
    
    static get IndicatorMessages() {
        return Object.freeze({
            resolved: StatuspageDictionary.StatusEnums.good,
            minor: StatuspageDictionary.StatusEnums.minor,
            major: StatuspageDictionary.StatusEnums.major,
            critical: StatuspageDictionary.StatusEnums.critical
        });
    }
}

class StatuspageHTMLElements {
    static get ErrorHTMLElement(){
        return StatuspageHTMLElements.StatusHTMLElement(StatuspageDictionary.StatusEnums.error, true);
    }

    static get LoadingHTMLElement(){
        return StatuspageHTMLElements.StatusHTMLElement(StatuspageDictionary.StatusEnums.loading, true);
    }

    static get AppHTMLElement(){
        return h("div", { id: 'app' });
    }

    static get AppErrorgHTMLElement() {
        return h("div", { id: 'app' }, StatuspageHTMLElements.ErrorHTMLElement);
    }

    static get AppLoadingHTMLElement() {
        return h("div", { id: 'app' }, StatuspageHTMLElements.LoadingHTMLElement);
    }

    static NoIncidentsElement(siteName) {
        return h("div", { class: "empty padding-none"},
            h('h', { class: "font-36 margin-bottom"}, "All good." ),
            h('h', { class: "font-12"}, 
                `Nothing to see here folks. Looks like ${siteName} is up and running and has been stable for quite some time.`,
                h("br"),
                h("br"),
                "Now get back to work!"
            ),
        );
    }

    static GetStatusJson(indicator) {
        return { status: { indicator: indicator in StatuspageDictionary.StatusEnums ? indicator : StatuspageDictionary.StatusEnums.error } };
    }

    static StatusHTMLElement(status, fullStatus=false, _id="status", message=null){
        if(typeof(status) != "string" && typeof(status) != "object"){
            console.error(`Invaid parameter - ${typeof(status)}`);
            return h("div");
        }

        if(typeof(status) == "object" && 'id' in status && 'name' in status){
            return StatuspageHTMLElements.StatusHTMLElement(status.status, false, status.id, status.name);
        }

        if(typeof(status) == "object" && 'status' in status && 'indicator' in status.status){
            return StatuspageHTMLElements.StatusHTMLElement(status.status.indicator, fullStatus);
        }

        if (typeof status != 'string') {
            console.error(typeof status != 'string');
            return StatuspageHTMLElements.ErrorHTMLElement;
        }

        return h("div",
            {
                'data-status': status.toLowerCase(),
                id: _id,
                class: 'min center-status status-width ' + (fullStatus ? [ 'full-status-height' ] : [ 'status-height', 'status-shadow' ].join(' ')),
                style: { fontWeight: 'bold', color: 'white', backgroundColor: StatuspageDictionary.MetaColors[status] }
            }, null
        );
    }

    static ComponentsHTMLElement(componentsJson){
        var componentsArr = [];

        if (!(typeof(componentsJson) == "object" && 'components' in componentsJson)) { return componentsArr; }

        for (var i = 0; i < componentsJson.components.length; i++) {
            if (componentsJson.components[i].name.substring(0, 5) == 'Visit') { continue; }
            componentsArr.push(StatuspageHTMLElements.StatusHTMLElement(componentsJson.components[i]));
        }

        return componentsArr;
    }

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

        const messageElement = h("span");
        messageElement.setAttribute("id", incident_update_id);

        // Creating status box
        const statusBoxElement = h("div");
        statusBoxElement.classList.add("status-box", 'message-status');
        // statusBoxElement.classList.add("status-box", 'message-status', `${currImpact}-message`);
        statusBoxElement.setAttribute('data-impact', currImpact);

        // Creating message & date
        const messageDateElement = h("div");
        messageDateElement.classList.add('text-margin');
        messageDateElement.appendChild(document.createTextNode(body));
        messageDateElement.appendChild(h("br"));

        const innerMessageDateElement = h("span");
        innerMessageDateElement.classList.add("date", "empty");
        innerMessageDateElement.appendChild(document.createTextNode(date));

        messageDateElement.appendChild(innerMessageDateElement);

        // Adding message elements to message element
        messageElement.appendChild(statusBoxElement);
        messageElement.appendChild(messageDateElement);

        return messageElement;
    }

    static IncidentsHTMLElements(incidentsJson, previousDays = 7, displayUTCTime = false) {
        var previousDate = new Date();
        previousDate.setHours(0, 0, 0);
        var previousDaysDate = previousDate.setDate((new Date).getDate() - previousDays);

        var incidents = previousDays == 0 ? incidentsJson["incidents"] : incidentsJson["incidents"].filter(function (incident) { return new Date(incident["created_at"]) > previousDaysDate; });

        var messagesList = h("div");
        messagesList.setAttribute("id", "messages");
        messagesList.classList.add('messages');

        if (incidents.length == 0) {
            messagesList.appendChild(StatuspageHTMLElements.NoIncidentsElement(incidentsJson.page.name));
        } else {
            for (var i = 0; i < incidents.length; i++) {
                if (incidents[i]["incident_updates"].length > 0) {
                    const incidentElement = h("span");
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

    static MetaTag(id, content, attr = "name"){
        var meta = h('meta');
        meta.setAttribute(attr, id);
        meta.setAttribute("content", content);
        return meta;
    }

    static LinkTagElements(canonicalUrl, prefetchUrl, iconUrl, imgUrl){
        var canonical = h('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute("href", canonicalUrl);

        var icon = h('link');
        icon.setAttribute('rel', 'icon');
        icon.setAttribute('type', 'image/x-icon');
        icon.setAttribute("href", iconUrl);

        var appleTouchIcon = h('link');
        appleTouchIcon.setAttribute('apple-touch-icon', 'icon');
        appleTouchIcon.setAttribute('sizes', '144x144');
        appleTouchIcon.setAttribute("href", imgUrl);

        var prefetch = h('link');
        prefetch.setAttribute('rel', 'dns-prefetch');
        prefetch.setAttribute("href", prefetchUrl);

        var preconnect = h('link');
        preconnect.setAttribute('rel', 'preconnect');
        preconnect.setAttribute("href", prefetchUrl);

        return [ canonical, icon, appleTouchIcon, prefetch, preconnect ];
    }

    static MetaTagsHTMLElements(canonicalUrl, imgUrl, title, description, themeColor, author, keywords=[]){
        var metaTagVals = StatuspageHTMLElements.MetaTagValues(canonicalUrl, imgUrl, title, description, themeColor, author, keywords);

        var metaTagElements = [];

        for(const [k, v] of Object.entries(metaTagVals)){
            metaTagElements.push(StatuspageHTMLElements.MetaTag(k, v, k.includes('og:') ? "property" : "name"));
        }

        return metaTagElements;
    }

    static HeadElement(canonicalUrl, prefetchUrl, iconUrl, imgUrl, title, description, themeColor, author, keywords=[]) {
        var head = h('head');

        var linkElements = StatuspageHTMLElements.LinkTagElements(canonicalUrl, prefetchUrl, iconUrl, imgUrl);
        var metaElements = StatuspageHTMLElements.MetaTagsHTMLElements(canonicalUrl, imgUrl, title, description, themeColor, author, keywords);

        for(let link of linkElements){
            head.appendChild(link);
        }

        for(let meta of metaElements){
            head.appendChild(meta);
        }

        var titleElement = h('title');
        titleElement.innerHTML = title;
        head.append(titleElement);

        var cssTag = h('link');
        cssTag.setAttribute('rel', 'stylesheet');
        cssTag.setAttribute("href", '../styling/main.min.css');

        head.append(cssTag);

        return head;
    }
}

class StatuspageWebComponents {
    static get AppLoading() {
        return class extends HTMLElement {
            constructor() { super(); }
    
            connectedCallback() { this.replaceWith(StatuspageHTMLElements.AppLoadingHTMLElement); }
            
            static get is() { return 'statuspage-app'; }
        }
    }

    static get StatusPreact(){
        return class extends Component {

            constructor() {
                super();
                this.state = { status: StatuspageDictionary.StatusEnums.error, fullScreen: true };
            }

            // componentDidMount() {
                // fetch(baseUrl + '/api/v2/status.json')
                //     .then(data => data.json())
                //     .then((json) => {
                //         if ('status' in json) {
                //             this.parseStatus(json.status.indicator, this.fullScreen);
                //         } else {
                //             this.parseStatus(StatuspageDictionary.StatusEnums.error, true);
                //         }
                        
                //         res();
                //     }).catch((error) => {
                //         this.parseStatus(StatuspageDictionary.StatusEnums.error, true);
                //         rej(error);
                //     });
            // }

            shouldComponentUpdate(nextProps, nextState) {
                console.log(nextProps);
                if ('data-url' in nextProps) {
                    var baseUrl = nextProps['data-url'].slice(-1) == '/' ? nextProps['data-url'].substring(0, nextProps['data-url'].length - 1) : nextProps['data-url'];

                    fetch(baseUrl + '/api/v2/status.json')
                    .then(data => data.json())
                    .then((json) => {
                        if ('status' in json) {
                            this.setState({ status: json.status.indicator, fullScreen: false })
                            // this.parseStatus(json.status.indicator, this.fullScreen);
                        } else {
                            // this.parseStatus(StatuspageDictionary.StatusEnums.error, true);
                        }
                        
                        res();
                    }).catch((error) => {
                        this.parseStatus(StatuspageDictionary.StatusEnums.error, true);
                        rej(error);
                    });
                }
            }
            
            render(props, state) {
                console.log(props);
                // const { value, increment } = StatuspageWebComponents.useStatus();

                // const [status, setStatus] = useState(StatuspageDictionary.StatusEnums.loading);

                if ('data-url' in props) {
                    console.log(props['data-url']);
                } 
                
                if ('status' in props) {
                    return htm`${StatuspageHTMLElements.StatusHTMLElement(this.state.status, 'fullScreen' in props)}`;
                } else {
                    return htm`${StatuspageHTMLElements.LoadingHTMLElement}`;
                }
            }
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
                console.log('parseStatus', status, fullScreen);
                var t = StatuspageHTMLElements.StatusHTMLElement(status, fullScreen);
                console.log(t);
                this.replaceWith(t);
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

                var status = h(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
                status.setAttribute('status', json.status.indicator);

                var summary = h(StatuspageWebComponents.Incidents.is, { is: StatuspageWebComponents.Incidents.is });
                summary.setAttribute('data-json', JSON.stringify(json));

                this.app.firstChild.replaceWith(status);
                this.app.appendChild(summary);
            }

            static get is(){ return 'statuspage-summary'; }
        }
    }
}

customElements.define(StatuspageWebComponents.AppLoading.is, StatuspageWebComponents.AppLoading);
customElements.define(StatuspageWebComponents.Status.is, StatuspageWebComponents.Status);
customElements.define(StatuspageWebComponents.Components.is, StatuspageWebComponents.Components);
customElements.define(StatuspageWebComponents.Incidents.is, StatuspageWebComponents.Incidents);
customElements.define(StatuspageWebComponents.Summary.is, StatuspageWebComponents.Summary);

export { StatuspageDictionary, StatuspageHTMLElements, StatuspageWebComponents };