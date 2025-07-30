import StatuspageDictionary from './StatuspageDictionary.esm.js';

export default class StatuspageWebComponents {
    static get CustomHTMLElement() {
        return class extends HTMLElement {
            constructor() { super(); }

            get parentElementTag() { return this.parentElement != null ? this.parentElement.tagName.toLowerCase() : null; }

            get isInSummary() { return this.parentElementTag == StatuspageWebComponents.Summary.is.toLowerCase(); }

            get summaryJson() { return this.isInSummary ? this.parentElement.dataJson : null; }
        }
    }

    static get App() {
        return class extends HTMLElement {
            constructor() { super(); }
    
            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.App.is}`);

                this.id = 'app';
                this.appendChild(StatuspageWebComponents.Loading.toHTML());

                if (this.hasAttribute('data-url')) {
                    this.url = this.getAttribute('data-url');
                    this.removeAttribute('data-url');

                    if (location.pathname == StatuspageDictionary.Paths.Index) {
                        StatuspageHTMLElements.UpdateUrlTags(location.href);
                        var summary = document.createElement(StatuspageWebComponents.Summary.is, { is: StatuspageWebComponents.Summary.is });
                        summary.baseUrl = this.url;
                        summary.isSingleRequest = true;

                        this.firstElementChild.replaceWith(summary);
                    } else if (location.pathname == StatuspageDictionary.Paths.Components || location.pathname.endsWith(StatuspageDictionary.Paths.Components)) {
                        StatuspageHTMLElements.UpdateUrlTags(location.href);
                        var components = document.createElement(StatuspageWebComponents.Components.is, { is: StatuspageWebComponents.Components.is });
                        components.setAttribute('data-url', this.url);
    
                        this.firstElementChild.replaceWith(components);
                    } else if (location.pathname == StatuspageDictionary.Paths.Status || location.pathname.endsWith(StatuspageDictionary.Paths.Status)) {
                        var status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
                        status.baseUrl = this.url;
                        status.fullScreen = true;
    
                        this.firstElementChild.replaceWith(status);
                    } else {
                        StatuspageHTMLElements.UpdateUrlTags(location.href);
                        var summary = document.createElement(StatuspageWebComponents.Summary.is, { is: StatuspageWebComponents.Summary.is });
                        summary.baseUrl = this.url;
                        summary.isSingleRequest = true;
                        
                        this.removeChild(this.firstChild);
                        this.appendChild(summary);
                    }
                }

                console.log(`Finished ${StatuspageWebComponents.App.is}`);
            }

            toString() { return this.outerHTML.toString(); }
            
            static get is() { return StatuspageDictionary.HTMLTags.StatuspageApp; }
        }
    }

    static get StatusElement() {
        return class extends HTMLElement {
            constructor(status) { super(); this.status = status; }

            connectedCallback() { StatuspageHTMLElements.SetThemeColor(this.status); }

            toString() { return this.outerHTML.toString(); }
            
            static get is() { return StatuspageDictionary.HTMLTags.StatusElement; }
            static toHTML() { return document.createElement(this.is, { is: this.is }); }
            static toString() { return `<${this.is}></${this.is}>`; }
        }
    }

    static get Error() {
        return class extends StatuspageWebComponents.StatusElement {
            constructor() { super(StatuspageDictionary.StatusEnums.error); }

            static get is() { return StatuspageDictionary.HTMLTags.StatuspageError; }
        }
    }

    static get Loading() {
        return class extends StatuspageWebComponents.StatusElement {
            constructor() { super(StatuspageDictionary.StatusEnums.loading); }
            
            static get is() { return StatuspageDictionary.HTMLTags.StatuspageLoading; }
        }
    }

    static get Unavailable() {
        return class extends StatuspageWebComponents.StatusElement {
            constructor() { super(StatuspageDictionary.StatusEnums.unavailable); }
            
            static get is() { return StatuspageDictionary.HTMLTags.StatuspageUnavailable; }
        }
    }

    static get Status() {
        return class extends StatuspageWebComponents.CustomHTMLElement {
            static get observedAttributes() { return [ "data-status", "data-url", "status", "fullscreen" ]; }

            /**
             * @param {boolean} val
             */
            set isLoading(val) {
                if (typeof val == "boolean" && this.data._isLoadingEnabled) {
                    this.data._isLoading = val;

                    if (!this.data._isLoading) {
                        if (this.data._status != null) {
                            this.setAttribute('data-status', this.data._status);
                        } else if (this.data._status == null) {
                            this.removeAttribute('data-status');
                        }

                        if (!this.data._fullScreen && this.hasAttribute('fullScreen')) {
                            this.removeAttribute('fullScreen');
                        }

                        if (this.data._fullScreen && !this.hasAttribute('fullScreen')) {
                            this.setAttribute('fullScreen', '');
                        }
                    }

                    if (this.data._isLoading) {
                        this.setAttribute('data-status', StatuspageDictionary.StatusEnums.loading);

                        if (!this.hasAttribute('fullScreen')) {
                            this.setAttribute('fullScreen', '');
                        }
                    }
                }
            }

            /**
             * @type {boolean}
             */
            get isLoading() { return this.data._isLoading; }

            /**
             * @param {boolean} val
             */
            set fullScreen(val) {
                if (typeof val == 'boolean') {
                    this.data._fullScreen = val;
                    this.data._isFullScreenSet = true;

                    if (this.data._fullScreen) {
                        if (!this.hasAttribute('fullScreen')) {
                            this.setAttribute('fullScreen', '');
                        }
                    } else {
                        this.removeAttribute('fullScreen');
                    }
                } else {
                    console.error(`'${val}' is not a boolean.`);
                }
            }

            /**
             * @type {boolean}
             */
            get fullScreen() { return this.data._fullScreen; }

            /**
             * @param {string} val
             */
            set dataStatus(val) {
                if (typeof val == 'string' && val in StatuspageDictionary.StatusEnums) {
                    this.data._status = val;
                    this.dataset.status = val;

                    if (this.hasAttribute('status')) { this.removeAttribute('status'); }

                    if (!this.hasAttribute('data-status')) { this.setAttribute('data-status', this.dataset.status); }

                    StatuspageHTMLElements.SetThemeColor(this.data._status);

                    if (this.data._fullScreen == null) {
                        this.data._fullScreen = false;
                    }
                } else {
                    if (typeof val == 'string') {
                        console.error(`'${val}' is not a valid status.`);
                    } else {
                        console.error(`'${val}' is not a string.`);
                    }
                }
            }

            /**
             * @type {string}
             */
            get dataStatus() { return this.data._status; }

            /**
             * @param {string} val
             */
            set baseUrl(val) {
                if (typeof val == 'string') {
                    if (URL.canParse(this.data._urlPath, val)) {
                        var _urlObj = new URL(this.data._urlPath, val);

                        this.data._baseUrl = _urlObj.origin;
                        this.data._url = _urlObj.href;

                        this.data._isLoadingEnabled = true;

                        if (!('url' in this.dataset)) {
                            this.dataset.url = this.data._baseUrl;
                        }
                    } else {
                        console.error(`${val} is an invalid URL`);
                    }
                } else if (val == null || val == undefined) {
                    this.data._baseUrl = null;
                    this.data._url = null;
                }
            }

            /**
             * @type {string}
             */
            get baseUrl() { return this.data._baseUrl; }

            /**
             * @type {string}
             */
            get url() { return this.data._url; }

            constructor() {
                super();

                this.data = {
                    _urlPath: '/api/v2/status.json',
                    _baseUrl: null,
                    _url: null,
                    _fullScreen: null,
                    _isLoading: false,
                    _status: undefined,
                    _isFullScreenSet: false,
                    _isLoadingEnabled: false,
                };
            }
        
            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Status.is}`);

                if (this.isInSummary && this.summaryJson != null && ('status' in this.summaryJson && 'indicator' in this.summaryJson.status)) {
                    this.dataStatus = this.summaryJson.status.indicator;
                }

                StatuspageHTMLElements.UpdateUrlTags(location.href);

                if (this.baseUrl != null) {
                    if (navigator.onLine) {
                        this.isLoading = true;
                        this.fetchStatus();
                        delete this.dataset.url;
                        this.isLoading = false;
                    } else {
                        this.setError();
                    }
                }

                console.log(this.toString());
                console.log(`Finished ${StatuspageWebComponents.Status.is}`);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (name == 'status' && newValue != null && newValue in StatuspageDictionary.StatusEnums) {
                    this.dataStatus = newValue;
                }

                if (name == 'data-status' && newValue != null && newValue in StatuspageDictionary.StatusEnums) {
                    this.data._status = newValue;

                    StatuspageHTMLElements.SetThemeColor(newValue);
                }

                if (name == 'data-url' && newValue != 'null') {
                    this.baseUrl = newValue;
                }

                if (name == 'fullscreen' && !this.data._isFullScreenSet && !this.isLoading) {
                    this.fullScreen = (newValue != null);
                }
            }

            fetchStatus() {
                return new Promise((res, rej) => {
                    console.log(this.url);
                    if (navigator.onLine && this.url != null) {
                        fetch(this.url)
                            .then(data => data.json())
                            .then((json) => {
                                if ('status' in json && 'indicator' in json.status) {
                                    this.dataStatus = json.status.indicator;
                                }

                                if ('page' in json && 'name' in json.page) {
                                    StatuspageHTMLElements.SetTitle(json.page.name, StatuspageDictionary.PathNames.Status);
                                }
                                res();
                            }).catch((error) => {
                                this.setError();
                                rej(error);
                            });
                    } else if (!navigator.onLine) {
                        console.log(`Browser is offline`);
                    } else if (this.url == null) {
                        console.error(`this.url is ${this.url}`);
                    }
                })
            }

            setError() {
                this.dataStatus = StatuspageDictionary.StatusEnums.error;
                this.fullScreen = true;
            }

            /**
             * @returns {string}
             */
            toString() { return this.outerHTML.toString(); }
            
            static get is() { return StatuspageDictionary.HTMLTags.StatuspageStatus; }

            static toHTML(status, isFullScreen = false) {
                var htmlElement = document.createElement(this.is, { is: this.is });

                htmlElement.setAttribute('data-status', status);

                if (isFullScreen) {
                    htmlElement.setAttribute('fullScreen', '');
                }

                return htmlElement;
            }

            static staticHTML(status = null, url = null, isFullScreen = false) {
                var attr = { };

                if (status != null) { attr['data-status'] = status; }
                if (url != null) { attr['data-url'] = url; }

                if (isFullScreen) { attr['fullScreen'] = null; }

                return `<${this.is} ${StatuspageStaticHTML.GenerateAttributes(attr)}></${this.is}>`;
            }
        }
    }

    static get Component() {
        return class extends HTMLElement {
            set dataStatus(val) { if (typeof val == 'string') { this.dataset.status = val; } }

            get dataStatus() { return this.dataset.status; }

            set dataMessage(val) { if (typeof val == 'string') { this.dataset.message = val; } }

            get dataMessage() { return this.dataset.message; }

            constructor() { super(); }

            toString() { return this.outerHTML.toString(); }
            
            static get is() { return StatuspageDictionary.HTMLTags.StatuspageComponent; }

            static staticHTML(status, message) {
                var attr = { 'data-status': status, 'data-message': message };

                return `<${this.is} ${StatuspageStaticHTML.GenerateAttributes(attr)}></${this.is}>`;
            }
        }
    }

    static get Components() {
        return class extends HTMLElement {
            constructor() { super(); }
        
            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Components.is}`);

                this.appendChild(StatuspageWebComponents.Loading.toHTML());

                if (this.hasAttribute('data-json')) {
                    this.parseJson(JSON.parse(this.getAttribute('data-json')));
                } else if (this.hasAttribute('data-url')) {
                    this.fetchComponents(this.getAttribute('data-url'));
                } else {
                    this.replaceWith(StatuspageWebComponents.Error.toHTML());
                }

                console.log(`Finished ${StatuspageWebComponents.Components.is}`);
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

                this.removeChild(this.firstElementChild);
            }

            toString() { return this.outerHTML.toString(); }
            
            static get is() { return StatuspageDictionary.HTMLTags.StatuspageComponents; }
        }
    }

    static get Incidents() {
        return class extends StatuspageWebComponents.CustomHTMLElement {
            static get observedAttributes() { return [ "data-json", "data-url" ]; }

            /**
             * @param {object} val
             */
            set dataJson(val) {
                if (typeof val == "string") {
                    this._dataJson = JSON.parse(val);
                }

                if (typeof val == "object") {
                    this._dataJson = val;
                }

                if (this._dataJson != null) {
                    this._incidentsElements = StatuspageHTMLElements.IncidentsHTMLElements(this._dataJson, this.previousDays, false, this.showMaintenance);
                    this.replaceWith(this._incidentsElements);
                }
            }

            /**
             * @returns {object}
             */
            get dataJson() { return this._dataJson; }

            /**
             * @param {string} val
             */
            set baseUrl(val) {
                if (typeof val == 'string') {
                    if (URL.canParse(this._urlPath, val)) {
                        var _urlObj = new URL(this._urlPath, val);

                        this._baseUrl = _urlObj.origin;
                        this._url = _urlObj.href;

                        if (!this.dataset.url) {
                            this.dataset.url = this._baseUrl;
                        }
                    }
                }
            }

            /**
             * @returns {string}
             */
            get baseUrl() { return this._baseUrl; }

            /**
             * @returns {string}
             */
            get url() { return this._url; }

            /**
             * @returns {string}
             */
            get incidentElements() { return this._incidentsElements; }

            /**
             * @param {boolean} val
             */
            set showMaintenance(val) {
                if (typeof val == 'boolean') {
                    this._showMaintenance = val;
                }
            }

            /**
             * @returns {boolean}
             */
            get showMaintenance() { return this._showMaintenance; }

            /**
             * @param {number} val
             */
            set previousDays(val) {
                if (typeof val == 'number') {
                    this._previousDays = val;
                }
            }

            /**
             * @returns {number}
             */
            get previousDays() { return this._previousDays; }

            constructor() {
                super();

                this._urlPath = '/api/v2/incidents.json';
                this._baseUrl = null;
                this._url = null;

                this._previousDays = 7;
                this._showMaintenance = false;

                this._dataJson = null;

                this._incidentsElements = null;
            }

            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Incidents.is}`);

                if (this.isInSummary && this.summaryJson != null) {
                    this.dataJson = this.summaryJson;
                }

                if (this.url != null) { this.fetchIncidents(); }

                if (this.incidentElements != null) { this.replaceWith(this.incidentElements); }
                
                console.log(`Finished ${StatuspageWebComponents.Incidents.is}`);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (name == 'data-json' && newValue != null) {
                    this.dataJson = newValue;
                }

                if (name == 'data-url' && newValue != null) {
                    this.baseUrl = newValue;
                }
            }

            fetchIncidents() {
                return new Promise((res, rej) => {
                    if (navigator.onLine && this.url != null) {
                        fetch(this.url)
                            .then(data => data.json())
                            .then((json) => {
                                this.dataJson = json;
                                res();
                            }).catch((error) => rej(error));
                    }
                })
            }

            toString() { return this.outerHTML.toString(); }
            
            static get is() { return StatuspageDictionary.HTMLTags.StatuspageIncidents; }
        }
    }

    static get Summary() {
        return class extends HTMLElement {
            static get observedAttributes() { return [ "data-url", "data-single-request" ]; }

            /**
             * @param {boolean} val
             */
            set isSingleRequest(val) {
                if (typeof val == "boolean") {
                    this._isSingleRequest = val;

                    if (!this.dataset.singleRequest) {
                        this.dataset.singleRequest = val;
                    }
                }
            }

            /**
             * @type {boolean}
             */
            get isSingleRequest() { return this._isSingleRequest; }

            /**
             * @param {string} val
             */
            set baseUrl(val) {
                if (typeof val == 'string') {
                    if (URL.canParse(this._urlPath, val)) {
                        var _urlObj = new URL(this._urlPath, val);

                        this._baseUrl = _urlObj.origin;
                        this._url = _urlObj.href;
                    }

                    if (!this.dataset.url) {
                        this.dataset.url = this.baseUrl;
                    }
                }
            }

            /**
             * @type {string}
             */
            get baseUrl() { return this._baseUrl; }

            /**
             * @returns {string}
             */
            get url() { return this._url; }

            // set dataJson(val) {
            //     if (typeof val == "string") {
            //         this._dataJson = JSON.parse(val);
            //     }

            //     if (typeof val == "object") {
            //         this._dataJson = val;
            //     }
            // }

            // get dataJson() { return this._dataJson; }

            constructor() {
                super();

                this._urlPath = '/api/v2/summary.json';
                this._baseUrl = null;
                this._url = null;

                this._isLoading = false;
                this._isSingleRequest = true;
                this._dataJson = null;
            }

            connectedCallback() {
                console.log(`Starting ${StatuspageWebComponents.Summary.is}`);

                this.singleRequest = true;

                this.appendChild(StatuspageWebComponents.Loading.toHTML())

                this.status = document.createElement(StatuspageWebComponents.Status.is, { is: StatuspageWebComponents.Status.is });
                this.incidents = document.createElement(StatuspageWebComponents.Incidents.is, { is: StatuspageWebComponents.Incidents.is });

                this.incidents.previousDays = this.isSingleRequest ? 365 : 7;
                this.incidents.showMaintenance = false;

                if (this.baseUrl != null) {
                    if (navigator.onLine) {
                        if (this.isSingleRequest) {
                            this.fetchSummary();
                        } else {
                            this.status.baseUrl = this.baseUrl;
                            this.incidents.baseUrl = this.baseUrl;
    
                            this.firstElementChild.replaceWith(this.status);
                            this.appendChild(this.incidents);
                        }
                    } else {
                        this.replaceWith(StatuspageWebComponents.Error.toHTML());
                    }
                } else {
                    this.replaceWith(StatuspageWebComponents.Error.toHTML());
                }

                console.log(`Finished ${StatuspageWebComponents.Summary.is}`);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (name == 'data-url') {
                    this.baseUrl = newValue;
                }

                if (name == 'data-single-request' && newValue != null) {
                    this.isSingleRequest = this.dataset.singleRequest.toLowerCase() === "true";
                }
            }

            fetchSummary() {
                return new Promise((res, rej) => {
                    fetch(this.url)
                        .then(data => data.json())
                        .then((json) => {
                            this.parseJson(json);
                            res();
                        }).catch((error) => {
                            rej(error)
                        });
                });
            }

            async parseJson(json) {
                // Compression.CompressAndDownloadJson(json, 'summary.json');

                // this.dataJson = json;

                if (!('status' in json)) {
                    this.firstElementChild.replaceWith(StatuspageWebComponents.Loading.toHTML())
                    return;
                } else {
                    this.status.dataStatus = json.status.indicator;
                    this.incidents.dataJson = json;

                    this.firstElementChild.replaceWith(this.status);
                    this.appendChild(this.incidents);
                }

                if ('page' in json && 'name' in json.page) {
                    StatuspageHTMLElements.SetTitle(json.page.name, StatuspageDictionary.PathNames.Index);
                    StatuspageHTMLElements.SetDescription(json.page.name);
                }
            }

            toString() { return this.outerHTML.toString(); }
            
            static get is() { return StatuspageDictionary.HTMLTags.StatuspageSummary; }
        }
    }
}