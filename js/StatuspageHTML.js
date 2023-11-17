function StatuspageHTML(baseURL, page = null, indexHomeSingleRequest = pageEnum.Error, fetchPsa = false, _name = null, _description = null,){
    this.baseURL = baseURL;
    this._name = _name;
    this._description = _description;

    if(this.baseURL.slice(-1) == '/'){
        this.baseURL = this.baseURL.substring(0, this.baseURL.length - 1);
    }

    this.IndexHomeSingleRequest = indexHomeSingleRequest;
    this.errorMessage = '<div class="size-max status-width bold error status-color"><span class="center-status">ERROR</span></div>';

    if(fetchPsa){
        this.setInfo("/psa.json", functEnum.PSA, this);
    }

    this.body = '\
    <div id="loading"> \
        <div class="full-status-height status-width bold status-color unavailable font-36"> \
            <span class="center-status">LOADING</span> \
        </div> \
    </div> \
    \
    <div id="psa" class="psa hide bold status-color"></div> \
    <div id="mainHome" class="hide zed"> \
        <div id="status" class="status-height status-width status-shadow bold status-color unavailable"></div> \
        <div id="messages" class="messages"></div> \
    </div> \
    <div id="mainStatus" class="hide status-height status-width bold status-color unavailable"></div> \
    <div id="mainComponents" class="hide zed"></div>';

    document.body.innerHTML = this.body;

    switch(page){
        case pageEnum.Index:
            this.IndexHome();
            break;
        case pageEnum.Status:
            this.StatusHome();
            break;
        case pageEnum.Components:
            this.ComponentsHome();
            break;
        default:
            this.ErrorHome();
            break;
    }

    // document.getElementById("mainHome").innerHTML = '<div id="status" class="status-height status-width status-shadow bold status-color unavailable"></div><div id="messages" class="messages"></div>';
}

StatuspageHTML.prototype.setName = function(_name){
    console.log("setName(): " + _name);
    this._name = _name;
    return this;
}

StatuspageHTML.prototype.getName = function(){
    console.log("getName(): " + this._name);
    return this._name;
}

StatuspageHTML.prototype.setDescript = function(_description){
    console.log("setDescription(): " + _description);
    this._description = _description;
    return this;
}

StatuspageHTML.prototype.getDescript = function(){
    console.log("getDescription(): " + this._description);
    return this._description;
}

StatuspageHTML.prototype.IndexHome = function(){
    console.log("IndexHome");

    this.setUrl();

    this.hideAllPages();
    
    if(this.IndexHomeSingleRequest){
        this.setInfo(this.baseURL+'/api/v2/summary.json', functEnum.StatusMessages, this);
    }else{
        this.setInfo(this.baseURL+'/api/v2/status.json', functEnum.Status, this);
        this.setInfo(this.baseURL+'/api/v2/incidents.json', functEnum.Messages, this);
    }

    this.showPage("mainHome");
}

StatuspageHTML.prototype.ComponentsHome = function(){
    console.log("ComponentsHome");

    this.hideAllPages();

    this.setInfo(this.baseURL+'/api/v2/components.json', functEnum.Components, this);

    this.showPage("mainComponents");
}

StatuspageHTML.prototype.StatusHome = function(){
    console.log("StatusHome");

    this.hideAllPages();
    
    this.setInfo(this.baseURL + '/api/v2/status.json', functEnum.StatusFull, this);

    this.showPage("mainStatus");
}

StatuspageHTML.prototype.ErrorHome = function(){
    console.log("ErrorHome");

    this.setTitle("Error Invalid Page");

    this.setTheme('error');

    this.createMetaTag("robots", "noindex");
    
    document.body.innerHTML = this.errorMessage;
}

StatuspageHTML.prototype.setInfo = function(url, funct, routerClass){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);

            switch(funct){
                case functEnum.Status:
                    console.log("Status");
                    routerClass.Status(result);
                    routerClass.setTitle("Unofficial " + result.page.name + " Status");
                    routerClass.setName(result.page.name);
                    routerClass.setDescriptions(arr.page.name, arr.status.description);
                    break;
                case functEnum.StatusFull:
                    console.log("Status");
                    routerClass.Status(result, true);
                    routerClass.setTitle("Unofficial " + result.page.name + " Status | Status");
                    routerClass.setName(result.page.name);
                    routerClass.setDescriptions(arr.page.name, arr.status.description);
                    break;
                case functEnum.Messages:
                    console.log("Messages");
                    routerClass.Messages(result);
                    routerClass.setName(result.page.name);
                    routerClass.setDescriptions(arr.page.name);
                    break;
                case functEnum.StatusMessages:
                    console.log("Status + Messages");
                    routerClass.Status(result);
                    routerClass.Messages(result);
                    routerClass.setTitle("Unofficial " + result.page.name + " Status");
                    routerClass.setName(result.page.name);
                    routerClass.setDescriptions(arr.page.name, arr.status.description);
                    break;
                case functEnum.Components:
                    console.log("Components");
                    routerClass.Components(result);
                    routerClass.setTitle("Unofficial " + result.page.name + " Status | Components");
                    routerClass.setName(result.page.name);
                    routerClass.setDescriptions(arr.page.name);
                    break;
                case functEnum.PSA:
                    console.log("PSA");
                    routerClass.setPSA(result);
                    break;
                default:
                    routerClass.ErrorHome();
                    break;
            }
        }else if(this.readyState == 4 && this.status != 200 && this.status > 0){
            console.log(this.readyState, this.status);
            // this.ErrorHome();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

StatuspageHTML.prototype.setPSA = function(psaResult){
    if(psaResult["showPSA"]){
        document.getElementById("psa").innerHTML = '<div class="center-status">' + psaResult["PSA"] + '</div>';

        document.getElementById("psa").classList.remove("hide");
    }
}

StatuspageHTML.prototype.showPage = function(page){
    document.getElementById(page).classList.remove("hide");
    document.getElementById("loading").classList.add("hide");
}

StatuspageHTML.prototype.hidePage = function(page){
    document.getElementById(page).classList.add("hide");
    document.getElementById("loading").classList.remove("hide");
}

StatuspageHTML.prototype.hideAllPages = function(){
   this.hidePage("mainHome");
   this.hidePage("mainStatus");
   this.hidePage("mainComponents");
}

StatuspageHTML.prototype.setMetaTag = function(id, value){
    let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
    var metaTag = metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
    metaTag.setAttribute("content", value);
}

StatuspageHTML.prototype.getMetaTag = function(id){
    let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
    var metaTag = metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
    return metaTag.getAttribute("content");
}

StatuspageHTML.prototype.createMetaTag = function(id, content, attr = "name"){
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
    // var currUrl = window.location.href;
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

StatuspageHTML.prototype.setDescriptions = function(sitename, descript = null){
    var description = "An unofficial website to monitor " + sitename  + " status updates. Currently being tested." + (descript != null ? " | " + descript : "");

    this.setMetaTag("description", description);
    this.setMetaTag("og:description", description);
    this.setMetaTag("twitter:description", description);

    this.updateRichTest("description", description);

    this.setDescript(description);

    return this;
}

StatuspageHTML.prototype.setTheme = function(status){
    this.setMetaTag("theme-color", metaColors[status]);
    this.setMetaTag("apple-mobile-web-app-status-bar-style", metaColors[status]);
}

StatuspageHTML.prototype.loadingMessages = function(){
    document.getElementById('messages').innerHTML = '<div class="empty padding-none"><div class="font-36 margin-bottom">Loading</div></div>';
}

StatuspageHTML.prototype.setStatus = function(status, fullStatus=false){
    this.setTheme('unavailable');
    var id = fullStatus ? "mainStatus" : "status";
    
    document.getElementById(id).classList.remove("unavailable");
    document.getElementById(id).innerHTML = '<span class="center-status">'+indicatorVals[status].toUpperCase()+'</span>';
    document.getElementById(id).classList.add("status-color");
    document.getElementById(id).classList.add(status.toLowerCase());

    if(status.toLowerCase() == "unavailable"){
        document.getElementById(id).classList.add("unavailable-font");
    }
    else if(status.toLowerCase() != "unavailable" && document.getElementById(id).classList.contains('unavailable-font')){
        document.getElementById(id).classList.remove("unavailable-font");
    }
    
    if(fullStatus){
        document.getElementById('mainHome').innerHTML = '';
        
        document.getElementById(id).classList.remove("status-shadow");
        document.getElementById(id).classList.remove("status-height");
        
        if(document.getElementById("psa").classList.contains('hide')){
            document.getElementById(id).classList.add("full-status-height");
        }else{
            document.getElementById(id).classList.add("psa-full-status-height");
        }
    }
    
    this.setTheme(status);
}

StatuspageHTML.prototype.Status = function(arr, fullStatus=false){
    this.setStatus(arr.status.indicator, fullStatus);

    // this.setDescriptions(arr.page.name, arr.status.description);
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
    var patt = /(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\/([a-zA-Z0-9-\/_.])*[^.]/i;
    
    var previousDays = 7;

    var previousDate = new Date();
    previousDate.setHours(0, 0, 0);
    var previousDaysDate = previousDate.setDate((new Date).getDate() - previousDays);
    
    var incidents = mess["incidents"].filter(function(incident){ return new Date(incident["created_at"]) > previousDaysDate; });

    if(incidents.length == 0){
        document.getElementById('messages').innerHTML = '<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like GitHub is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>';
        return;
    }else{
        var out = '';
        
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
        
        document.getElementById('messages').innerHTML = out;
    }
}

StatuspageHTML.prototype.makeComponent = function(curr, parentName = null, isGroup=false) {
    return '<div id="mainStatus" class="component-height status-width bold ' + (isGroup ? "black" : "status-color") + ' ' + indicatorVals[curr["status"]] + '"><span class="center-status">' + (parentName != null ? parentName + ": " : "") + curr["name"] + '</span></div>';
    // return '<div id="mainStatus" class="component-height status-width bold status-color ' + indicatorVals[curr["status"]] + '"><span title="' + curr["description"] + '" class="center-status">' + curr["name"] + '</span></div>';
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
    
    document.getElementById("mainComponents").innerHTML = out;
}