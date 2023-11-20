function StatuspageHTML(baseURL, indexHomeSingleRequest = true, fetchPsa = false, _name = null, _description = null,){
    this.baseURL = baseURL;
    this._name = _name;
    this._description = _description;

    if(this.baseURL.slice(-1) == '/'){
        this.baseURL = this.baseURL.substring(0, this.baseURL.length - 1);
    }

    this.IndexHomeSingleRequest = indexHomeSingleRequest;
    
    if(fetchPsa && document.getElementById("psa")){
        this.fetchPsaAsync().then();
    }

    this.loading = this.Status(this.getStatusJson('loading'), true);

    this.render(this.loading);
}

StatuspageHTML.prototype.setName = function(_name){
    this._name = _name;

    return this;
}

StatuspageHTML.prototype.getName = function(){
    return this._name;
}

StatuspageHTML.prototype.setDescript = function(sitename, descript = null){
    this._description = "An unofficial website to monitor " + sitename  + " status updates. Currently in development." + (descript != null ? " | " + descript : "");
    return this;
}

StatuspageHTML.prototype.getDescript = function(){
    return this._description;
}

StatuspageHTML.prototype.fetchPsaAsync = async function(){
    console.log("fetchPsaAsync");

    const response = await fetch('/psa.json');
    const result = await response.json();

    this.setPSA(result);
}

StatuspageHTML.prototype.IndexHome = function(){
    console.log("IndexHome");

    this.IndexHomeAsync().then();
}

StatuspageHTML.prototype.IndexHomeAsync = async function(){
    this.setUrl();

    if(this.IndexHomeSingleRequest){
        const response = await fetch(this.baseURL + '/api/v2/summary.json');
        const result = await response.json();
    
        var statusHTML = this.Status(result);
        var messagesHTML = this.Messages(result);

        this.render(statusHTML + messagesHTML);

        this.setName(result.page.name).setDescript(result.page.name, result.status.description);
    }else{
        const statusResponse = await fetch(this.baseURL + '/api/v2/status.json');
        const statusResult = await statusResponse.json();

        const messagesResponse = await fetch(this.baseURL + '/api/v2/incidents.json');
        const messagesResult = await messagesResponse.json();

        var statusHTML = this.Status(statusResult);
        var messagesHTML = this.Messages(messagesResult);

        this.render(statusHTML + messagesHTML);

        this.setName(statusResult.page.name).setDescript(statusResult.page.name, statusResult.status.description);
    }

    this.setDescriptions();
    this.setTitle("Unofficial " + this.getName() + " Status");
}

StatuspageHTML.prototype.ComponentsHome = function(){
    console.log("ComponentsHome");

    this.ComponentsHomeAsync().then();
}

StatuspageHTML.prototype.ComponentsHomeAsync = async function(){
    console.log("ComponentsHomeAsync");

    const response = await fetch(this.baseURL + '/api/v2/components.json');
    const result = await response.json();

    var html = this.Components(result);

    this.render(html);

    this.setTitle("Unofficial " + result.page.name + " Status Components");
    this.setName(result.page.name);
    this.setDescriptions(result.page.name);
}

StatuspageHTML.prototype.StatusHome = function(){
    console.log("StatusHome");

    this.StatusHomeAsync().then();
}

StatuspageHTML.prototype.StatusHomeAsync = async function(){
    const response = await fetch(this.baseURL + '/api/v2/status.json');
    const result = await response.json();

    var statusHTML = this.Status(result, true);
    
    this.render(statusHTML);

    this.setTitle("Unofficial Mini " + result.page.name + " Status");
    this.setName(result.page.name);
    this.setDescriptions(result.page.name, result.status.description);
}

StatuspageHTML.prototype.ErrorHome = function(){
    console.log("ErrorHome");

    this.setTitle("Error - Invalid Route");

    this.createMetaTag("robots", "noindex");
    
    var errorHTML = this.Status(this.getStatusJson('error'), true);

    this.render(errorHTML);
}

StatuspageHTML.prototype.setPSA = function(psaResult){
    if(psaResult["showPSA"]){
        document.getElementById("psa").innerHTML = '<div class="center-status">' + psaResult["PSA"] + '</div>';

        document.getElementById("psa").classList.remove("hide");
    }

    return this;
}

StatuspageHTML.prototype.getStatusJson = function(indicator){
    return { 'status': { 'indicator': indicator } };
}

StatuspageHTML.prototype.render = function(html){
    document.getElementById("app").innerHTML = html;

    return this;
}

StatuspageHTML.prototype.setMetaTag = function(id, value){
    let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
    var metaTag = metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
    
    metaTag.setAttribute("content", value);

    return this;
}

StatuspageHTML.prototype.getMetaTag = function(id){
    let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
    var metaTag = metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
    
    return metaTag.getAttribute("content");
}

StatuspageHTML.prototype.createMetaTag = function(id, content, attr = "name"){
    let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
    var metaTags = metaTagsArr.filter((mTag) => mTag.getAttribute(attr) == id);

    if(metaTags.length > 0){
        console.error("meta tag already exists");
        return this;
    }

    var meta = document.createElement('meta');
    meta.setAttribute(attr, id);
    meta.setAttribute("content", content);

    document.head.append(meta);

    return this;
}

StatuspageHTML.prototype.updateRichTest = function(id, value) {
    var ld = Array.from(document.getElementsByTagName("script")).find((t) => t.hasAttribute("type") && t.getAttribute("type") == "application/ld+json");

    var ldJson = JSON.parse(ld.innerHTML);

    if(Array.isArray(ldJson)){
        ldJson[0][id] = value;
    }else{
        ldJson[id] = value;
    }    

    ld.innerHTML = JSON.stringify(ldJson, null, 4);

    return this;
}

StatuspageHTML.prototype.setUrl = function(url = null){
    var currUrl = url == null ? window.location.href : url;
    
    this.setMetaTag("og:url", currUrl);

    let linkTags = Array.from(document.getElementsByTagName("link"));
    var linkTag = linkTags.find((mTag) => (mTag.getAttribute("rel") == "canonical"));
    
    linkTag.setAttribute("href", currUrl);
    
    this.updateRichTest("url", currUrl);

    return this;
}

StatuspageHTML.prototype.setTitle = function(title){
    document.getElementsByTagName("title")[0].innerHTML = title;

    this.setMetaTag("twitter:title", title);
    this.setMetaTag("og:title", title);
    this.setMetaTag("application-name", title);
    this.setMetaTag("apple-mobile-web-app-title", title);

    this.updateRichTest("name", title);

    return this;
}

StatuspageHTML.prototype.setDescriptions = function(sitename = null, descript = null){
    if(sitename != null){
        this.setDescript(sitename, descript);
    }

    this.setMetaTag("description", this._description);
    this.setMetaTag("og:description", this._description);
    this.setMetaTag("twitter:description", this._description);

    this.updateRichTest("description", this._description);

    return this;
}

StatuspageHTML.prototype.setTheme = function(status){
    this.setMetaTag("theme-color", metaColors[status]);
    this.setMetaTag("apple-mobile-web-app-status-bar-style", metaColors[status]);

    return this;
}

StatuspageHTML.prototype.getStatus = function(status, fullStatus=false){
    var height = fullStatus ? (document.getElementById("psa").classList.contains('hide') ? 'full-status-height' : 'psa-full-status-height') : 'status-height status-shadow';

    return '<div id="status" class="' + height + ' status-width bold status-color ' + status.toLowerCase() + '"><span class="center-status">' + indicatorVals[status].toUpperCase() + '</span></div>';
}

StatuspageHTML.prototype.Status = function(arr, fullStatus=false){
    this.setTheme(arr.status.indicator);

    return this.getStatus(arr.status.indicator, fullStatus);
}

StatuspageHTML.prototype.createMessage = function(name, impact, status, body, created_at, shortlink, isOldestStatus){
    var options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    var out = '';
    
    // var w = (status == "resolved" ? "good" : (impact == 'none' ? 'good' : impact));
    var w = (status == "resolved" ? "good" : impact);
    
    if(w == undefined){ w = indicatorMessages[status]; }
    
    out += '<div class="status-box ' + w + '-message"><span class="message-status"><div class="right">' + w + '</div></span></div>';

    var date = new Date(created_at).toLocaleDateString("en-US", options);

    if(location.hostname == 'do.githubstat.us'){
        options = { month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' };
        var t_date = new Date(mess["incidents"][i]["incident_updates"][j].created_at);
        t_date = Date.UTC(t_date.getUTCFullYear(), t_date.getUTCMonth(), t_date.getUTCDate(), t_date.getUTCHours()+(t_date.getTimezoneOffset()/60), t_date.getUTCMinutes(), t_date.getUTCSeconds());
        date = new Date(t_date).toLocaleDateString("en-US", options) + ' UTC';
    }
    
    body = body.replace(/http(s)?:\/\/[^ ]+/g, (match, p1, offset, string, groups) => {
        return '<a href="' + match + '">here</a>.';
    });

    date = '<span class="date empty">' + date + '</span>';
    
    // body += w == 'good' ? '<br /><span class="date empty">Incident Page: </span><a class="date empty" href="' + shortlink + '">' + shortlink + '</a>' : '';
    
    out += '<div class="text-margin">' + body + '<br />' + date + '</div>';
    
    return "<span>" + out + "</span>";
}

StatuspageHTML.prototype.Messages = function(mess){
    var  out = '';

    var patt = /(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\/([a-zA-Z0-9-\/_.])*[^.]/i;
    
    var previousDays = 7;

    var previousDate = new Date();
    previousDate.setHours(0, 0, 0);
    var previousDaysDate = previousDate.setDate((new Date).getDate() - previousDays);
    
    var incidents = mess["incidents"].filter(function(incident){ return new Date(incident["created_at"]) > previousDaysDate; });

    if(incidents.length == 0){
        out = '<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like GitHub is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>';
    }else{
        for(var i = 0; i < incidents.length; i++){
            if(incidents[i]["incident_updates"].length > 0){
                for(var j = 0; j < incidents[i]["incident_updates"].length; j++){
                    out += this.createMessage(
                        incidents[i].name, incidents[i].impact,
                        incidents[i]["incident_updates"][j].status,
                        mess["incidents"][i]["incident_updates"][j].body,
                        mess["incidents"][i]["incident_updates"][j].created_at,
                        mess["incidents"][i].shortlink, (j == incidents[i]["incident_updates"].length-1)
                    );
                }
            }
        }
    }

    return '<div id="messages" class="messages">' + out + '</div>';
}

StatuspageHTML.prototype.makeComponent = function(curr) {
    return '<div' + (curr["id"] != null ? ' id="' +  curr["id"] + '"' : '') + ' class="component-height status-width bold status-color ' + indicatorVals[curr["status"]] + '"><span class="center-status">' + curr["name"] + '</span></div>';
}

StatuspageHTML.prototype.compareComponents = function(a, b) {
    if (a["position"] < b["position"]) {
        return -1;
    }
    else if (a["position"] > b["position"]) {
        return 1;
    }

    return 0;
}

StatuspageHTML.prototype.groupedComponents = function(compArr, groupId, groupName = null) {
    var groupComp = this.makeComponent(compArr.filter((component) => component["id"] == groupId)[0], null, true);

    var group = compArr.filter((component) => component["group_id"] == groupId).sort(this.compareComponents);

    return groupComp + group.map((comp) => this.makeComponent(comp, groupName)).join('');
}

StatuspageHTML.prototype.Components = function(comp) {
    var out = '';

    var groups = comp["components"].filter((component) => component.group == true).sort(this.compareComponents);

    // for (const group of groups) { out += this.groupedComponents(comp["components"], group["id"]); }

    for (var i = 0; i < comp["components"].length; i++) {
        if (comp["components"][i]["name"].substring(0, 5) == 'Visit') { continue; }
        // if (comp["components"][i]["group_id"] != null || comp["components"][i]["group"]) { continue; }
        
        out += this.makeComponent(comp["components"][i]);
    }

    return out;
}

function Router() {
    // var url = 'https://www.githubstatus.com/';
    var url = 'https://apiv3.githubstat.us/';
    
    var r = new StatuspageHTML(url);

    try {
        var cloudflareDevRegex = /(spa|master|staging|[1-9A-Za-z-_]+)\.ghstatus\.pages\.dev/g;
        var cloudflareProdRegex = /githubstat.us/g;
        
        var onCloudflareDev = location.host.match(cloudflareDevRegex) != null;
        var onCloudflareProd = location.host.match(cloudflareProdRegex) != null;
        
        // console.log('onCloudflareDev', onCloudflareDev);
        // console.log('onCloudflareProd', onCloudflareProd);
        
        var pathPrefix = '/StatuspageHTML';

        if (onCloudflareProd || onCloudflareDev) {
            if (location.pathname == pathPrefix + '/') {
                r.IndexHome();
            } else if (location.pathname == pathPrefix + '/components/') {
                r.ComponentsHome();
            } else if (location.pathname == pathPrefix + '/status/') {
                r.StatusHome();
            } else {
                console.log("Error");
                r.ErrorHome();
            }
        } else {
            r.IndexHome();
            // r.ComponentsHome();
            // r.StatusHome();
            // r.ErrorHome();
        }
    } catch(error) {
        r.ErrorHome();
    }
}