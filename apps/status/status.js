class StatuspageDictionary {
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
}

class StatuspageHTMLElements {
    static get ErrorHTMLElement(){
        return StatuspageHTMLElements.StatusHTMLElement(StatuspageDictionary.StatusEnums.error, true);
    }

    static get LoadingHTMLElement(){
        return StatuspageHTMLElements.StatusHTMLElement(StatuspageDictionary.StatusEnums.loading, true);
    }

    static get AppHTMLElement(){
        const appElement = document.createElement("div");
        appElement.setAttribute('id', 'app');
        return appElement;
    }

    static get AppLoadingHTMLElement() {
        var app = StatuspageHTMLElements.AppHTMLElement;
        app.appendChild(StatuspageHTMLElements.LoadingHTMLElement);
        return app;
    }

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
}

class StatuspageWebComponents {
    static get Status() {
        return class extends HTMLElement {
            constructor() { super(); }
        
            connectedCallback() {
                this.replaceWith(StatuspageHTMLElements.AppLoadingHTMLElement);
                
                this.app = document.getElementById('status');

                this.replaceWith(this.app);

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
                // console.log(status, fullScreen);
                this.app.replaceWith(StatuspageHTMLElements.StatusHTMLElement(status, fullScreen))
            }
        
            static get is() { return 'statuspage-status'; }
        }
    }
}

customElements.define(StatuspageWebComponents.Status.is, StatuspageWebComponents.Status);