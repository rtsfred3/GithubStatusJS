class StatuspageHTMLElement {
    static get Status() {
        return class extends HTMLElement {
            // static observedAttributes = ['data-url', "data=kspm", "fullStatus"];

            constructor() { super(); }

            connectedCallback() {
                this.statusElement = document.createElement('div');
                this.statusElement.setAttribute('id', 'status');

                this.statusElement.classList.add('min', 'status-width', 'bold', 'status-color', 'center-status');

                if (this.hasAttribute('fullStatus')) {
                    this.statusElement.classList.add('full-status-height');
                } else {
                    this.statusElement.classList.add('status-height', 'status-shadow');
                }

                if (this.hasAttribute('data-url')) {
                    this.fetchStatus(this.getAttribute('data-url'));
                }

                if (this.hasAttribute('data-json')) {
                    this.parseJson(JSON.parse(this.getAttribute('data-json')));
                }

                this.replaceWith(this.statusElement);
            }

            fetchStatus(url) {
                return new Promise((res, rej) => {
                    var baseUrl = url.slice(-1) == '/' ? url.substring(0, url.length - 1) : url;

                    fetch(baseUrl + '/api/v2/status.json')
                        .then(data => data.json())
                        .then((json) => {
                            this.parseJson(json)
                            res();
                        }).catch((error) => rej(error));
                })
            }

            parseJson(json) {
                if ('status' in json && 'indicator' in json.status) {
                    this.parseStatus(json.status.indicator);
                }
            }

            parseStatus(statusString){
                this.statusElement.classList.add(statusString.toLowerCase());
                this.statusElement.setAttribute('status', statusString);
                this.statusElement.setAttribute('data-status', statusString);
            }

            static get is(){
                return 'statuspage-status';
            }
        }
    }

    static get Components() {
        return class extends HTMLElement {
            // static observedAttributes = ['data-url', "data-json"];

            constructor() { super(); }

            connectedCallback() {
                if (this.hasAttribute('data-json')) {
                    this.json = JSON.parse(this.getAttribute('data-json'));

                    if ('components' in this.json) {
                        for (var i = 0; i < this.json.components.length; i++) {
                            if (this.json.components[i].name.substring(0, 5) == 'Visit') { continue; }
                            this.singleComponentElement(this.json.components[i]);
                        }
                    }
                }

                if (this.hasAttribute('data-url')) {
                    this.fetchComponents(this.getAttribute('data-url'));
                }
            }

            fetchComponents(url) {
                return new Promise((res, rej) => {
                    var baseUrl = url.slice(-1) == '/' ? url.substring(0, url.length - 1) : url;

                    fetch(baseUrl + '/api/v2/components.json')
                        .then(data => data.json())
                        .then((json) => {
                            for (var i = 0; i < json.components.length; i++) {
                                if (json.components[i].name.substring(0, 5) == 'Visit') { continue; }
                                this.singleComponentElement(json.components[i]);
                            }
                            res();
                        }).catch((error) => rej(error));
                })
            }

            singleComponentElement(componentJson) {
                const componentDivElement = document.createElement("div");

                componentDivElement.setAttribute('id', componentJson.id);
                componentDivElement.classList.add('component-height', 'status-width', 'bold', 'status-color', StatuspageDictionary.IndicatorVals[componentJson.status]);

                const centerStatusDivElement = document.createElement("span");
                centerStatusDivElement.classList.add('center-status');
                centerStatusDivElement.appendChild(document.createTextNode(componentJson.name));

                componentDivElement.appendChild(centerStatusDivElement);

                this.appendChild(componentDivElement);
            }

            static get is(){
                return 'statuspage-components';
            }
        }
    }

    static get IncidentUpdate() {
        return class extends HTMLElement {
            // static observedAttributes = [
            //     'data-incident-updates', 'data-name', 'data-impact',
            //     'data-status', 'data-body', 'data-created-at',
            //     'data-shortlink', 'data-is-oldest-status', 'data-display-utc-time'
            // ];

            constructor() { super(); }

            connectedCallback() {
                var incident_update_id = this.getAttribute('data-incident-updates');
                var name = this.getAttribute('data-name');
                var impact = this.getAttribute('data-impact');

                var status = this.getAttribute('data-status');
                var body = this.getAttribute('data-body');
                var created_at = this.getAttribute('data-created-at');

                var shortlink = this.getAttribute('data-shortlink');
                var isOldestStatus = this.hasAttribute('data-is-oldest-status');
                var _displayUTCTime = this.hasAttribute('data-display-utc-time');

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

                this.setAttribute("id", incident_update_id);

                // Creating status box
                const statusBoxElement = document.createElement("div");
                statusBoxElement.classList.add("status-box", 'message-status', `${currImpact}-message`);
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
                this.appendChild(statusBoxElement);
                this.appendChild(messageDateElement);
            }

            static get is(){
                return 'statuspage-incident-update';
            }
        }
    }

    static get Incidents() {
        return class extends HTMLElement {
            // static observedAttributes = ['data-url', "data-json", "data-previous-days"];

            constructor() { super(); }

            connectedCallback() {
                this.incidents = document.createElement('div');
                this.incidents.setAttribute('id', 'messages');
                this.incidents.classList.add('messages');

                if (this.hasAttribute('data-previous-days')) {
                    this.previousDays = this.getAttribute('data-previous-days')
                } else {
                    this.previousDays = 7;
                }
                
                if (this.hasAttribute('data-json')) {
                    this.parseJson(JSON.parse(this.getAttribute('data-json')));
                }

                if (this.getAttribute('data-url') != null) {
                    this.fetchIncidents(this.getAttribute('data-url'));
                }
            }

            fetchIncidents(url) {
                return new Promise((res, rej) => {
                    var baseUrl = url.slice(-1) == '/' ? url.substring(0, url.length - 1) : url;

                    fetch(baseUrl + '/api/v2/incidents.json')
                        .then(data => data.json())
                        .then((json) => {
                            this.parseJson(json)

                            res();
                        }).catch((error) => rej(error));
                })
            }

            parseJson(json){
                var previousDate = new Date();
                previousDate.setHours(0, 0, 0);
                var previousDaysDate = previousDate.setDate((new Date).getDate() - this.previousDays);

                var incidentsArr = this.previousDays == 0 ? json["incidents"] : json["incidents"].filter(function (incident) { return new Date(incident["created_at"]) > previousDaysDate; });

                if (incidentsArr.length == 0) {
                    const emptyIncidents = document.createElement("div");
                    emptyIncidents.classList.add("empty", "padding-none");
        
                    const emptyIncidentsFirstChild = document.createElement("div");
                    const emptyIncidentsSecondChild = document.createElement("div");
        
                    emptyIncidentsFirstChild.classList.add('font-36', 'margin-bottom');
                    emptyIncidentsSecondChild.classList.add('font-12');
        
                    emptyIncidentsFirstChild.appendChild(document.createTextNode("All good."));
        
                    emptyIncidentsSecondChild.appendChild(document.createTextNode(`Nothing to see here folks. Looks like ${json.page.name} is up and running and has been stable for quite some time.`));
                    emptyIncidentsSecondChild.appendChild(document.createElement("br"));
                    emptyIncidentsSecondChild.appendChild(document.createElement("br"));
                    emptyIncidentsSecondChild.appendChild(document.createTextNode("Now get back to work!"));
        
                    emptyIncidents.appendChild(emptyIncidentsFirstChild);

                    emptyIncidents.appendChild(emptyIncidentsSecondChild);
        
                    this.incidents.appendChild(emptyIncidents);
                } else {
                    for (var i = 0; i < incidentsArr.length; i++) {
                        const incidentElement = document.createElement("span");
                        incidentElement.setAttribute("id", incidentsArr[i].id);
    
                        for (var j = 0; j < incidentsArr[i]["incident_updates"].length; j++) {
                            const incidentUpdate = document.createElement('statuspage-incident-update');
                            
                            incidentUpdate.setAttribute('data-incident-updates', incidentsArr[i]["incident_updates"][j].id);
                            incidentUpdate.setAttribute('data-name', incidentsArr[i].name);
                            incidentUpdate.setAttribute('data-impact', incidentsArr[i].impact);
                            incidentUpdate.setAttribute('data-status', incidentsArr[i]["incident_updates"][j].status);
                            incidentUpdate.setAttribute('data-body', incidentsArr[i]["incident_updates"][j].body);
                            incidentUpdate.setAttribute('data-created-at', incidentsArr[i]["incident_updates"][j].created_at);
    
                            incidentUpdate.setAttribute('data-shortlink', incidentsArr[i].shortlink);
                            incidentUpdate.setAttribute('data-is-oldest-status', (j == incidentsArr[i]["incident_updates"].length - 1));
                            incidentUpdate.setAttribute('data-display-utc-time', false);
    
                            incidentElement.appendChild(incidentUpdate);
                        }
                    }
                
                    this.incidents.appendChild(incidentElement);
                }

                this.replaceWith(this.incidents);
            }

            static get is(){
                return 'statuspage-incidents';
            }
        }
    }

    static get Summary() {
        return class _Summary extends HTMLElement {
            // static observedAttributes = ['data-url', "data-json", "data-previous-days"];

            constructor() { super(); }

            connectedCallback() {
                this.app = document.createElement('div');
                this.app.setAttribute('id', 'app');

                if (this.hasAttribute('data-previous-days')) {
                    this.previousDays = this.getAttribute('data-previous-days')
                } else {
                    this.previousDays = 7;
                }
                
                if (this.hasAttribute('data-json')) {
                    this.parseJson(JSON.parse(this.getAttribute('data-json')));
                }

                if (this.hasAttribute('data-url')) {
                    this.fetchSummary(this.getAttribute('data-url'));
                }
            }

            fetchSummary(url) {
                return new Promise((res, rej) => {
                    var baseUrl = url.slice(-1) == '/' ? url.substring(0, url.length - 1) : url;

                    fetch(baseUrl + '/api/v2/summary.json')
                        .then(data => data.json())
                        .then((json) => {

                            var status = document.createElement('statuspage-status', { is: 'statuspage-status' });
                            status.setAttribute('data-json', JSON.stringify(json));

                            this.app.appendChild(status);

                            var incidents = document.createElement('statuspage-incidents', { is: 'statuspage-incidents' });
                            incidents.setAttribute('data-json', JSON.stringify(json));

                            this.app.appendChild(incidents);

                            this.replaceWith(this.app);

                            res();
                        }).catch((error) => rej(error));
                })
            }

            parseJson(json) {
                this.app.appendChild(document.createElement('div'));
            }

            static get is(){
                return 'statuspage-summary';
            }
        }
    }
}

/**
 * Static dictionary for default values for Statuspage
 * @class
 */
class StatuspageDictionary {
    static get replaceableStringValue() {
        return '{}';
    }

    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _metaColors() {
        return class MetaColors {
            constructor() {
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
        return class IndicatorVals {
            constructor() {
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
    static get MetaColors() {
        return JSON.parse(JSON.stringify(new StatuspageDictionary._metaColors()));
    }

    /**
     * Converts StatuspageDictionary._indicatorVals class to JSON
     * 
     * @returns {IndicatorVals} Returns JSONified version of StatuspageDictionary._indicatorVals
     */
    static get IndicatorVals() {
        return JSON.parse(JSON.stringify(new StatuspageDictionary._indicatorVals()));
    }

    /**
     * Converts StatuspageDictionary._indicatorMessages class to JSON
     * @returns {IndicatorMessages} Returns JSONified version of StatuspageDictionary._indicatorMessages
     */
    static get IndicatorMessages() {
        return JSON.parse(JSON.stringify(new StatuspageDictionary._indicatorMessages()));
    }
}

customElements.define(StatuspageHTMLElement.Summary.is, StatuspageHTMLElement.Summary);
customElements.define(StatuspageHTMLElement.Status.is, StatuspageHTMLElement.Status);
customElements.define(StatuspageHTMLElement.Components.is, StatuspageHTMLElement.Components);
customElements.define(StatuspageHTMLElement.IncidentUpdate.is, StatuspageHTMLElement.IncidentUpdate);
customElements.define(StatuspageHTMLElement.Incidents.is, StatuspageHTMLElement.Incidents);