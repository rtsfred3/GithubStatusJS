function Router(baseURL){
    this.baseURL = baseURL;

    document.getElementById("body").innerHTML = '\
    <div id="loading"> \
        <div class="full-status-height status-width bold status-color unavailable font-36"> \
            <span class="center-status">LOADING</span> \
        </div> \
    </div> \
    \
    <div id="psa" class="psa hide bold status-color"></div> \
    <div id="mainHome" class="hide zed"></div> \
    <div id="mainStatus" class="hide status-height status-width bold status-color unavailable"></div> \
    <div id="mainComponents" class="hide zed size-zero"></div>';
}

Router.prototype.IndexHome = function(){
    console.log("IndexHome");

    var indexHomeMain = '<div id="status" class="status-height status-width status-shadow bold status-color unavailable"></div> \
    <div id="messages" class="messages"></div>'

    document.getElementById("mainHome").innerHTML = indexHomeMain;

    // this.setStatus("unavailable");
    // this.loadingMessages()
    
    // setInfo(baseURL+'/api/v2/summary.json', [Status, Messages]);
    this.setInfo(this.baseURL+'/api/v2/status.json', functEnum.Status, this);
    this.setInfo(this.baseURL+'/api/v2/incidents.json', functEnum.Messages, this);

    document.getElementById("mainHome").classList.remove("hide");
    document.getElementById("loading").classList.add("hide");
}

Router.prototype.setInfo = function(url, funct, routerClass, fullStatus = false){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            switch(funct){
                case functEnum.Status:
                    console.log("Status");
                    routerClass.Status(JSON.parse(this.responseText));
                    break;
                case functEnum.StatusFull:
                    console.log("Status");
                    routerClass.Status(JSON.parse(this.responseText), true);
                    break;
                case functEnum.Messages:
                    console.log("Messages");
                    routerClass.Messages(JSON.parse(this.responseText));
                    break;
                case functEnum.StatusMessages:
                    routerClass.Status(JSON.parse(this.responseText));
                    routerClass.Messages(JSON.parse(this.responseText));
                    break;
                case functEnum.Components:
                    break;
            }
        }else if(this.readyState == 4 && this.status != 200 && this.status > 0){
            console.log(this.readyState, this.status);
            setError();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

Router.prototype.setTitles = function(title){
    document.getElementsByTagName("title")[0].innerHTML = title;

    setMetaTag("twitter:title", title);
    setMetaTag("og:title", title);
    setMetaTag("application-name", title);
    setMetaTag("apple-mobile-web-app-title", title);
}

Router.prototype.setPSA = function(psa){
    document.getElementById("psa").classList.remove("hide");
    document.getElementById("psa").innerHTML = '<div class="center-status">' + psa + '</div>';
}

Router.prototype.setTheme = function(status){
    this.setMetaTag("theme-color", metaColors[status]);
    this.setMetaTag("apple-mobile-web-app-status-bar-style", metaColors[status]);
}

Router.prototype.setError = function(){
    document.getElementsByTagName("title")[0].innerHTML = "Error Invalid Page";

    this.setTheme('error');
    document.getElementsByTagName("body")[0].innerHTML = errorMessage;
}

Router.prototype.loadingMessages = function(){
    document.getElementById('messages').innerHTML = '<div class="empty padding-none"><div class="unavailable-font margin-bottom">Loading Messages</div></div>';
}

Router.prototype.setMetaTag = function(id, value){
    let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
    var metaTag = metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
    metaTag.setAttribute("content", value);
}

Router.prototype.setTitles = function(title){
    document.getElementsByTagName("title")[0].innerHTML = title;

    this.setMetaTag("twitter:title", title);
    this.setMetaTag("og:title", title);
    this.setMetaTag("application-name", title);
    this.setMetaTag("apple-mobile-web-app-title", title);
}

Router.prototype.setStatus = function(status, fullStatus=false){
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

Router.prototype.Status = function(arr, fullStatus=false){
    this.setStatus(arr.status.indicator, fullStatus);
}

Router.prototype.createMessage = function(name, impact, status, body, created_at, shortlink, isOldestStatus){
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

Router.prototype.Messages = function(mess){
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