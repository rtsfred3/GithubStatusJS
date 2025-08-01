import StatuspageDictionary from 'StatuspageDictionary.esm.js';
import StatuspageStaticHTML from 'StatuspageStaticHTML.esm.js';

export default class StatuspageHTMLElements {
    /**
     * @static
     * @memberof StatuspageHTMLElements
     * @type {HTMLDivElement}
     */
    static get AllGoodElement() {
        const allGoodElement = document.createElement("div");
        allGoodElement.classList.add('messages-empty-all-good');
        allGoodElement.textContent = "All good.";
        return allGoodElement;
    }
    
    static UpdateStatuspageDateField(dataJson, field) {
        if (field in dataJson && dataJson[field] != null) { dataJson[field] = new Date(dataJson[field]); }
    }

    static UpdateStatuspageUpdateTimes(updates) {
        updates.forEach((u) => {
            this.UpdateStatuspageDateField(u, 'created_at');
            this.UpdateStatuspageDateField(u, 'display_at');
            this.UpdateStatuspageDateField(u, 'updated_at');
        });
    }

    static UpdateStatuspageDefaultTimes(dataJson) {
        this.UpdateStatuspageDateField(dataJson, 'created_at');
        this.UpdateStatuspageDateField(dataJson, 'started_at');
        this.UpdateStatuspageDateField(dataJson, 'updated_at');
        this.UpdateStatuspageDateField(dataJson, 'resolved_at');

        this.UpdateStatuspageDateField(dataJson, 'scheduled_for');
        this.UpdateStatuspageDateField(dataJson, 'scheduled_until');
    }

    static UpdateStatuspageTimes(dataJson) {
        if ('page' in dataJson) { this.UpdateStatuspageDateField(dataJson['page'], 'updated_at'); }

        if ('incidents' in dataJson) {
            dataJson['incidents'].forEach((e) => {
                this.UpdateStatuspageDefaultTimes(e);
                this.UpdateStatuspageUpdateTimes(e["incident_updates"]);
            });
        }

        if ('scheduled_maintenances' in dataJson) {
            dataJson['scheduled_maintenances'].forEach((e) => {
                this.UpdateStatuspageDefaultTimes(e);
                this.UpdateStatuspageUpdateTimes(e["incident_updates"]);
            });
        }

        return dataJson;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} siteName 
     * @returns {HTMLDivElement}
     */
    static NoIncidentsElement(siteName) {
        const emptyIncidents = document.createElement("div");
        emptyIncidents.classList.add("messages-empty");

        const emptyBodyDiv = document.createElement("div");
        emptyBodyDiv.classList.add('messages-empty-body');
        emptyBodyDiv.appendChild(document.createTextNode(`Nothing to see here folks. Looks like ${siteName} is up and running and has been stable for quite some time.`));
        emptyBodyDiv.append(document.createElement("br"), document.createElement("br"));
        emptyBodyDiv.appendChild(document.createTextNode("Now get back to work!"));
    
        emptyIncidents.append(StatuspageHTMLElements.AllGoodElement, emptyBodyDiv);

        return emptyIncidents;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} indicator dummy status
     * @returns {StatuspageStatusResponse} Returns a dummy Statuspage output
     */
    static GetStatusJson(indicator) {
        return {
            status: { indicator: indicator in StatuspageDictionary.StatusEnums ? indicator : StatuspageDictionary.StatusEnums.error },
            page: { id: null, name: null, url: null, updated_at: Date.now() }
        };
    } 

    /**
     * Creates array of Component elements
     * 
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {object} componentsJson
     * @returns {HTMLDivElement[]}
     */
    static ComponentsHTMLElement(componentsJson){
        var componentsArr = [];

        if (!(typeof(componentsJson) == "object" && 'components' in componentsJson)) { return componentsArr; }

        for (var i = 0; i < componentsJson.components.length; i++) {
            if (componentsJson.components[i].name.substring(0, 5) == 'Visit') { continue; }

            var component = document.createElement(StatuspageWebComponents.Component.is, { is: StatuspageWebComponents.Component.is });
            component.id = componentsJson.components[i].id;
            component.dataStatus = StatuspageDictionary.IndicatorVals[componentsJson.components[i].status];
            component.dataMessage = componentsJson.components[i].name;

            componentsArr.push(component);
        }

        return componentsArr;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} body 
     * @param {string} date 
     * @returns {HTMLDivElement}
     */
    static MessageBodyElement(body, date, name = null, status = null, shortlink = null){
        var messageElement = document.createElement('div');
        messageElement.classList.add('message-body');

        var dateElement = document.createElement('span');
        dateElement.classList.add('date');
        dateElement.textContent = date;

        body = body.replaceAll('\u003C', '<').replaceAll('\u003E', '>');
        body = body.replaceAll('\n', '<br />').replaceAll('\u003Cbr /\u003E', '<br />');

        var statusSpanElement = `<span capitalize>${status}</span>`;
        if (status != null) { name = name != null ? `${name} - ${statusSpanElement}` : `${statusSpanElement}`; }

        var messageBodyElement = document.createElement('div');
        if (name != null && shortlink != null) {
            messageBodyElement.innerHTML = `${StatuspageStaticHTML.CreateAnchorTagHTML(shortlink, name, true)}: ${body}`;
        } else {
            messageBodyElement.innerHTML = name != null ? `${name}: ${body}` : body;
        }

        messageElement.appendChild(messageBodyElement);
        messageElement.appendChild(dateElement);

        return messageElement;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} impact 
     * @returns {HTMLDivElement}
     */
    static MessageStatusElement(impact, status = null){
        var htmlElement = document.createElement('div');
        htmlElement.dataset.impact = impact;
        if (status != null) { htmlElement.setAttribute('data-impact-body', status); }
        return htmlElement;
    }

    /**
     * Creates a incident update element
     * 
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} incidentUpdateId 
     * @param {string} name 
     * @param {string} impact 
     * @param {string} status 
     * @param {string} body 
     * @param {Date} createdAt 
     * @param {string} shortlink 
     * @param {boolean} isOldestStatus 
     * @param {boolean} _displayUTCTime 
     * @returns {HTMLSpanElement}
     */
    static MessageHTMLElement(incidentUpdateId, name, impact, status, body, createdAt, shortlink, isOldestStatus, _displayUTCTime) {
        var options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        var currImpact = (status == StatuspageDictionary.StatusEnums.resolved
            ? StatuspageDictionary.StatusEnums.good
            : impact);
        if (currImpact == undefined) { currImpact = StatuspageDictionary.IndicatorMessages[status]; }

        var date = new Date(createdAt).toLocaleDateString("en-US", options);

        if (_displayUTCTime) {
            options = { month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' };
            var t_date = new Date(createdAt);
            t_date = Date.UTC(t_date.getUTCFullYear(), t_date.getUTCMonth(), t_date.getUTCDate(), t_date.getUTCHours() + (t_date.getTimezoneOffset() / 60), t_date.getUTCMinutes(), t_date.getUTCSeconds());
            date = new Date(t_date).toLocaleDateString("en-US", options) + ' UTC';
        }

        const messageElement = document.createElement("span");
        messageElement.id = incidentUpdateId;

        // Adding message elements to message element
        messageElement.appendChild(this.MessageStatusElement(currImpact));
        messageElement.appendChild(this.MessageBodyElement(body, date, name, null));
        // messageElement.appendChild(this.MessageBodyElement(body, date, name, null, shortlink));

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
    static IncidentsHTMLElements(incidentsJson, previousDays = 7, displayUTCTime = false, showMaintenance = false) {
        var previousDate = new Date();
        previousDate.setHours(0, 0, 0);
        var previousDaysDate = previousDate.setDate((new Date).getDate() - previousDays);

        incidentsJson = this.UpdateStatuspageTimes(incidentsJson);
        
        var incidents = [];

        if ('incidents' in incidentsJson) {
            incidents = incidents.concat(previousDays == 0 ? incidentsJson["incidents"] : incidentsJson["incidents"].filter(function (incident) { return incident["created_at"] > previousDaysDate; }));
        }

        if ('scheduled_maintenances' in incidentsJson && showMaintenance) {
            var maintenances = previousDays == 0 ? incidentsJson["scheduled_maintenances"] : incidentsJson["scheduled_maintenances"].filter(function (incident) { return (incident["scheduled_for"] > previousDaysDate && incident['status'] == "in_progress" ); });
            incidents = incidents.concat(maintenances);
        }
        
        incidents = incidents.sort((a, b) => b["created_at"] - a["created_at"]);

        var messagesList = document.createElement("div");
        messagesList.id = "messages";
        messagesList.classList.add('messages');

        if (incidents.length == 0) {
            messagesList.appendChild(StatuspageHTMLElements.NoIncidentsElement(incidentsJson.page.name));
        } else {
            for (var i = 0; i < incidents.length; i++) {
                if (incidents[i]["incident_updates"].length > 0) {
                    const incidentElement = document.createElement("span");
                    incidentElement.id = incidents[i].id
                    
                    for (var j = 0; j < incidents[i]["incident_updates"].length; j++) {
                        var incidentUpdate = incidents[i]["incident_updates"][j];
                        
                        incidentElement.appendChild(StatuspageHTMLElements.MessageHTMLElement(
                            incidentUpdate.id,
                            incidents[i].name,
                            incidents[i].impact,
                            incidentUpdate.status,
                            incidentUpdate.body,
                            incidentUpdate.created_at,
                            incidents[i].shortlink, 
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
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} id 
     * @returns {HTMLLinkElement}
     */
    static GetLinkTag(id) {
        let linkTagsArr = Array.from(document.getElementsByTagName("link"));
        return linkTagsArr.find((mTag) => mTag.getAttribute("rel") == id);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string|Array} id 
     * @param {string} value 
     */
    static SetLinkTag(id, value) {
        if (typeof id == 'string') {
            if (this.GetLinkTag(id) != undefined) {
                this.GetLinkTag(id).setAttribute("href", value);
            } else {
                var head = document.getElementsByTagName("head");
                if (head.length > 0) {
                    head[0].appendChild(StatuspageStaticHTML.LinkTag(id, value));
                }
            }
        } else if(Array.isArray(id)) {
            for(var i = 0; i < id.length; i++){
                this.SetLinkTag(id[i], value);
            }
        }
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} id 
     * @returns {HTMLMetaElement}
     */
    static GetMetaTag(id, attr = "name") {
        attr = id.startsWith('og:') ? 'property' : attr;

        let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
        return metaTagsArr.find((mTag) => mTag.hasAttribute(attr) && mTag.getAttribute(attr) == id);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string|Array} id 
     * @param {string} value 
     */
    static SetMetaTag(id, value, attr = "name") {
        if (typeof id == 'string') {
            if (StatuspageHTMLElements.GetMetaTag(id, attr) != undefined) {
                StatuspageHTMLElements.GetMetaTag(id, attr).setAttribute("content", value);
            } else {
                var head = document.getElementsByTagName("head");
                if (head.length > 0) {
                    head[0].appendChild(StatuspageStaticHTML.MetaTag(id, value));
                }
            }
        } else if(Array.isArray(id)) {
            for(var i = 0; i < id.length; i++){
                StatuspageHTMLElements.SetMetaTag(id[i], value, attr);
            }
        }
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} status 
     */
    static SetThemeColor(status) {
        var hexColor = StatuspageDictionary.MetaColors[status];
        StatuspageHTMLElements.SetMetaTag(["theme-color", "apple-mobile-web-app-status-bar-style"], hexColor);
    }

    static get HasLinkedData() {
        var scripts = Array.from(document.getElementsByTagName('script'));
        scripts = scripts.filter((e) => e.hasAttribute('type') && e.getAttribute('type') == 'application/ld+json');

        if (scripts.length != 0){
            var script = scripts.pop().innerHTML;

            try {
                var json = JSON.parse(script);
                return true;
            } catch(e) {
                return false;
            }
        }

        return false;
    }

    static UpdateLinkedData(key, value) {
        if (StatuspageHTMLElements.HasLinkedData) {
            var scripts = Array.from(document.getElementsByTagName('script'));
            var script = scripts.find((e) => e.hasAttribute('type') && e.getAttribute('type') == 'application/ld+json');
            var ld = JSON.parse(script.innerHTML);

            ld[key] = value;

            script.innerHTML = JSON.stringify(ld, null, 2);
        }
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} siteName 
     * @param {string} pathName 
     */
    static SetTitle(siteName, pathName = StatuspageDictionary.PathNames.Index) {
        var title = StatuspageDictionary.StatuspageHTMLTemplates[pathName].replace(StatuspageDictionary.replaceableStringValue, siteName);

        StatuspageHTMLElements.UpdateLinkedData('name', title);
        StatuspageHTMLElements.UpdateLinkedData('alternateName', `${siteName}Status`);

        StatuspageHTMLElements.SetMetaTag(["application-name", "og:site_name", "og:title", "twitter:title", "apple-mobile-web-app-title"], title);
        document.getElementsByTagName('title')[0].innerText = title;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} siteName 
     */
    static SetDescription(siteName) {
        var description = StatuspageDictionary.StatuspageHTMLTemplates.template_descrisption.replace(StatuspageDictionary.replaceableStringValue, siteName);

        StatuspageHTMLElements.UpdateLinkedData('description', description);
        StatuspageHTMLElements.SetMetaTag(["description", "og:description", "twitter:description"], description);
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} canonicalUrl 
     */
    static UpdateUrlTags(canonicalUrl) {
        this.SetLinkTag("canonical", canonicalUrl);
        this.SetMetaTag("og:url", canonicalUrl);
    }

    static get StaticHTML() {
        return class {
            constructor(iconUrl, imgUrl, siteName, pathName = StatuspageDictionary.PathNames.Index, canonicalUrl = null, statuspageUrl = null, author = null, keywords=[], additionalDescription = null, title = null, description = null){
                this._status = StatuspageDictionary.StatusEnums.loading;

                this.canonicalUrl = canonicalUrl;
                this.statuspageUrl = statuspageUrl;
                this.iconUrl = iconUrl;
                this.imgUrl = imgUrl;
                this.pathName = pathName;
                this.statusPathName = pathName;
                this.author = author;
                this.keywords = keywords;

                this.trimWhitespace = false;

                this._siteName = siteName != null ? siteName : 'Statuspage';
                this._isBot = false;
                this._title = title;
                this._description = description;
                this._additionalDescription = additionalDescription;

                this._bodyTemplate = `<body id="body">${StatuspageDictionary.replaceableStringValue}</body>`;
            }

            get prefetchStatuspageUrl() { return this.statuspageUrl != null ? this.statuspageUrl.replace('https:', '') : null; }

            get title() { return this._title != null ? this._title : StatuspageDictionary.StatuspageHTMLTemplates[this.statusPathName].replace(StatuspageDictionary.replaceableStringValue, this.siteName); }
            
            get description() {
                if (this._description != null) {
                    return this._description;
                }

                var description = StatuspageDictionary.StatuspageHTMLTemplates.template_descrisption.replace(StatuspageDictionary.replaceableStringValue, this.siteName);

                if (this._additionalDescription != null) {
                    description = description == null ? this._additionalDescription : `${description} ${this._additionalDescription}`;
                }

                return description;
            }

            get themeColor() { return StatuspageDictionary.MetaColors[this._status]; }

            set status(val) {
                if (typeof val == 'string' && val in StatuspageDictionary.StatusEnums) {
                    this._status = val;
                }
            }

            get status() { return this._status; }

            set siteName(val) {
                if (typeof val == 'string') {
                    this._siteName = val;
                }
            }

            get siteName() { return this._siteName; }

            set isBot(val) {
                if (typeof val == 'boolean') {
                    this._isBot = val;
                }
            }

            get isBot() { return this._isBot; }
            
            get LinkTagValues() {
                return {
                    "canonical": this.canonicalUrl,
                    "icon": this.iconUrl,
                    "apple-touch-icon": this.imgUrl,
                    "dns-prefetch": this.prefetchStatuspageUrl,
                    "preconnect": this.prefetchStatuspageUrl
                };
            }

            get Stylesheets() {
                return [ 'https://spstat.us/styling/main.min.css' ];
            }

            get Scripts() {
                return [ 'https://spstat.us/js/StatuspageHTML.js' ];
            }

            get MetaTagValues() {
                return {
                    "author": this.author,
                    "application-name": this.title,
                    "theme-color": this.themeColor,
                    "description": this.description,
                    "keywords": this.keywords.length > 0 ? this.keywords.join(', ') : null,
        
                    "og:site_name": this.title,
                    "og:title": this.title,
                    "og:description": this.description,
                    "og:type": "website",
                    "og:url": this.canonicalUrl,
                    "og:image": this.imgUrl,
                    
                    "twitter:card": "summary",
                    "twitter:title": this.title,
                    "twitter:description": this.description,
                    "twitter:image": this.imgUrl,
        
                    "mobile-web-app-capable": "yes",
                    "apple-mobile-web-app-capable": "yes",
                    "apple-mobile-web-app-status-bar-style": this.themeColor,
                    "apple-mobile-web-app-title": this.title,
                    "viewport": "width=device-width, initial-scale=1.0, user-scalable=0.0",
                    "HandheldFriendly": "true",
                };
            }
            
            get LinkTags() {
                var linkTagElements = [];

                for (const [k, v] of Object.entries(this.LinkTagValues)) {
                    if (v != null) {
                        linkTagElements.push(`<link ${StatuspageStaticHTML.GenerateAttributes({ 'rel': k, 'href': v })}>`)
                    }
                }

                if (!this.isBot) {
                    for (let stylesheet of this.Stylesheets) {
                        linkTagElements.push(`<link ${StatuspageStaticHTML.GenerateAttributes({ 'rel': 'stylesheet', 'href': stylesheet })}>`);
                    }
                }

                return linkTagElements;
            }

            get MetaTags() {
                var metaTagElements = [];

                for(const [k, v] of Object.entries(this.MetaTagValues)){
                    if (v != null) {
                        metaTagElements.push(`<meta ${StatuspageStaticHTML.GenerateAttributes({ [k.includes('og:') ? "property" : "name"]: k, 'content': v })}>`);
                    }
                }

                return metaTagElements;
            }

            get ScriptTags() {
                var scriptTagElements = [];

                if (this.isBot) { return scriptTagElements; }

                for (let script of this.Scripts) {
                    scriptTagElements.push(`<script ${StatuspageStaticHTML.GenerateAttributes({ 'src': script })}></script>`);
                }
                return scriptTagElements;
            }

            get TitleTag() { return `<title>${this.title}</title>`; }

            get Head() {
                var metaTags = `\n\t\t${this.MetaTags.join('\n\t\t')}`;
                var linkTags = `\n\t\t${this.LinkTags.join('\n\t\t')}`;
                var scriptTags = this.ScriptTags.length > 0 ? `\n\t\t${this.ScriptTags.join('\n\t\t')}` : '';
                var titleTag = `\n\t\t${this.TitleTag}`;

                return `<head>${metaTags}${linkTags}${scriptTags}${titleTag}\n\t</head>`;
            }

            get Body() {
                var child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageError);

                if (this.isBot) {
                    return this._bodyTemplate.replace(StatuspageDictionary.replaceableStringValue, '');
                }

                if (this.pathName == StatuspageDictionary.PathNames.Status) {
                    var attr = {};
                    
                    if (this.statuspageUrl != null) {
                        attr['data-url'] = this.statuspageUrl;
                    } else if (this.status != null) {
                        attr['data-status'] = this.status;
                    }

                    if (Object.keys(attr).length == 0) {
                        attr['data-status'] = StatuspageDictionary.StatusEnums.error;
                    }

                    attr['fullScreen'] = null;

                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, attr);
                }

                if (this.pathName == StatuspageDictionary.PathNames.Summary) {
                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageSummary, { 'data-url': this.statuspageUrl });
                }

                if (this.pathName == StatuspageDictionary.PathNames.Maintenance) {
                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': StatuspageDictionary.StatusEnums.maintenance, 'fullScreen': null });
                }

                if (this.pathName == StatuspageDictionary.PathNames.Unavailable) {
                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageUnavailable);
                }

                if (this.pathName == StatuspageDictionary.PathNames.Error) {
                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageError);
                }

                return this._bodyTemplate.replace(StatuspageDictionary.replaceableStringValue, child);
            }

            get HTML() { return `<html>\n\t${this.Head}\n\t${this.Body}\n</html>`; }

            get ErrorHTML() {
                this.pathName = StatuspageDictionary.PathNames.Error;
                return this.HTML;
            }

            get UnavailableHTML() {
                this.pathName = StatuspageDictionary.PathNames.Unavailable;
                return this.HTML;
            }

            get StatusBody() {
                var child = '';

                if (this.status in StatuspageDictionary.StatusEnums){
                    child = StatuspageStaticHTML.TagStringAndAttributes(StatuspageDictionary.HTMLTags.StatuspageStatus, { 'data-status': this.status, 'fullScreen': null });
                }

                return this._bodyTemplate.replace(StatuspageDictionary.replaceableStringValue, `\n\t\t${child}\n\t`);
            }

            HTMLFromStatus(status) {
                this.status = status;

                var html = `<html>\n\t${this.Head}\n\t${this.StatusBody}\n</html>`;
                
                if (this.trimWhitespace) { html = html.replaceAll('\n', '').replaceAll('\t', ''); }

                console.log(`HTML Character Length: ${html.length}`);

                return html;
            }
        }
    }
}