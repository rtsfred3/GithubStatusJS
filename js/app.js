// var baseURL = "https://www.githubstatus.com";
var baseURL = "https://apiv3.githubstat.us";

function Router(){
    try{
        var cloudflareDevRegex = /(spa|master|staging|[1-9A-Za-z-_]+)\.ghstatus\.pages\.dev/g;
        var cloudflareProdRegex = /githubstat.us/g;
        
        var onCloudflareDev = location.host.match(cloudflareDevRegex) != null;
        var onCloudflareProd = location.host.match(cloudflareProdRegex) != null;
        
        // console.log('onCloudflareDev', onCloudflareDev);
        // console.log('onCloudflareProd', onCloudflareProd);
        
        if(onCloudflareProd || onCloudflareDev){
            if(location.pathname == '/'){
                setUrl();
                IndexHome();
            }else if(location.pathname == '/components/'){
                setUrl();
                ComponentsHome();
            }else if(location.pathname == '/status/'){
                setUrl();
                StatusHome();
            }else{
                console.log("Error");
                setError();
            }
        }else{
            IndexHome();
            // ComponentsHome();
            // StatusHome();
            // setError();
        }
    }catch(error){
        // IndexHome();
        setError();
    }
}

function setError(){
    document.getElementsByTagName("title")[0].innerHTML = "Error Invalid Page";

    setTheme('error');
    document.getElementsByTagName("body")[0].innerHTML = errorMessage;
}

function setInfo(url, funct, fullStatus = false){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(Array.isArray(funct)){
                console.log(funct[0].prototype.constructor.name);
                console.log(funct[1].prototype.constructor.name);

                funct[0](JSON.parse(this.responseText));
                funct[1](JSON.parse(this.responseText));
            }else{
                console.log(funct.prototype.constructor.name);

                if(funct.prototype.constructor.name == Status.prototype.constructor.name && fullStatus){
                    funct(JSON.parse(this.responseText), fullStatus);
                }else{
                    funct(JSON.parse(this.responseText));
                }
            }
        }else if(this.readyState == 4 && this.status != 200 && this.status > 0){
            console.log(this.readyState, this.status);

            if(Array.isArray(funct)){
                setError();
            }else if(funct.prototype.constructor.name == Status.prototype.constructor.name){
                setStatus("unavailable");
            }else{
                setError();
            }

            setError();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function PSA_F(psa){
    document.getElementById("psa").classList.remove("hide");
    document.getElementById("psa").innerHTML = '<div class="center-status">' + psa + '</div>';
}

function setTheme(status){
    setMetaTag("theme-color", metaColors[status]);
    setMetaTag("apple-mobile-web-app-status-bar-style", metaColors[status]);

    // var metaTags = [2, 18];
    // var meta = document.getElementsByTagName('meta');
    // for(var i = 0; i<metaTags.length; i++){
    //     meta[metaTags[i]].setAttribute('content', metaColors[status]);
    // }
}

function setMetaTag(id, value){
    let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
    var metaTag = metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
    metaTag.setAttribute("content", value);
}

function getMetaTag(id){
    let metaTagsArr = Array.from(document.getElementsByTagName("meta"));
    var metaTag = metaTagsArr.find((mTag) => (mTag.hasAttribute("property") ? mTag.getAttribute("property") : mTag.getAttribute("name")) == id);
    return metaTag.getAttribute("content");
}

function updateRichTest(id, value){
    var ld = Array.from(document.getElementsByTagName("script")).find((t) => t.hasAttribute("type") && t.getAttribute("type") == "application/ld+json");

    var ldJson = JSON.parse(ld.innerHTML);

    ldJson[id] = value;

    ld.innerHTML = JSON.stringify(ldJson, null, 4);
}

function setTitles(title){
    document.getElementsByTagName("title")[0].innerHTML = title;

    setMetaTag("twitter:title", title);
    setMetaTag("og:title", title);
    setMetaTag("application-name", title);
    setMetaTag("apple-mobile-web-app-title", title);

    // updateRichTest("name", title);
}

function setDescriptions(descript){
    setMetaTag("description", getMetaTag("description") + " | " + descript);
    setMetaTag("og:description", getMetaTag("og:description") + " | " + descript);
    setMetaTag("twitter:description", getMetaTag("twitter:description") + " | " + descript);

    // updateRichTest("description", getMetaTag("twitter:description"));
}

function setUrl(url = null){
    var currUrl = url == null ? window.location.href : url;
    
    setMetaTag("og:url", currUrl);

    let linkTags = Array.from(document.getElementsByTagName("link"));
    var linkTag = linkTags.find((mTag) => (mTag.getAttribute("rel") == "canonical"));
    
    linkTag.setAttribute("href", currUrl);

    // updateRichTest("url", currUrl);
}

function IndexHome(){
    console.log("IndexHome");

    setTitles("(Unofficial) GitHub Status");

    if(document.getElementById("loading").classList.contains("hide")){
        document.getElementById("loading").classList.remove("hide");
        document.getElementById("mainHome").classList.add("hide");
    }
    
    setInfo(baseURL+'/api/v2/summary.json', [Status, Messages]);
    // setInfo(baseURL+'/api/v2/status.json', Status);
    // setInfo(baseURL+'/api/v2/incidents.json', Messages);

    document.getElementById("mainHome").classList.remove("hide");
    document.getElementById("loading").classList.add("hide");
}

function ComponentsHome(){
    console.log("ComponentsHome");

    setTitles("(Unofficial) GitHub Status Components");

    setInfo(baseURL+'/api/v2/components.json', Components);

    document.getElementById("mainComponents").classList.remove("hide");
    document.getElementById("loading").classList.add("hide");
}

function StatusHome(){
    console.log("StatusHome");

    setTitles("(Unofficial) GitHub Status Page");
    
    setInfo(baseURL+'/api/v2/status.json', Status, true);

    document.getElementById("mainStatus").classList.remove("hide");
    document.getElementById("loading").classList.add("hide");
}

function makeComponent(curr){
    return '<div id="mainStatus" class="component-height status-width bold status-color ' + indicatorVals[curr["status"]] + '"><span class="center-status">' + curr["name"] + '</span></div>';
}

function Components(comp){
    var out = '';
    for(var i = 0; i < comp["components"].length; i++){
        if(comp["components"][i]["name"].substring(0, 5) == 'Visit'){ continue; }
        out += makeComponent(comp["components"][i]);
    }
    document.getElementById("mainComponents").innerHTML = out;
}

function setStatus(status, fullStatus=false){
    setTheme('unavailable');
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
    
    setTheme(status);
}

function Status(arr, fullStatus=false){
    setStatus(arr.status.indicator, fullStatus);
    // setDescriptions(arr.status.description);
}

function createMessage(name, impact, status, body, created_at, shortlink, isOldestStatus){
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

function loadingMessages(){
    document.getElementById('messages').innerHTML = '<div class="empty padding-none"><div class="font-36 margin-bottom">Loading Messages</div></div>';
}

function Messages(mess){
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
                    out += createMessage(
                        incidents[i].name, incidents[i].impact,
                        incidents[i]["incident_updates"][j].status,
                        mess["incidents"][i]["incident_updates"][j].body,
                        mess["incidents"][i]["incident_updates"][j].created_at,
                        mess["incidents"][i].shortlink, (j == incidents[i]["incident_updates"].length-1)
                    );
                }

                /*out += '<div class="status-box ' + mess["incidents"][i]["impact"] + '"><span class="message-status"><div class="right">' + indicatorVals[mess["incidents"][i]["impact"]] + '</div></span></div>';

                var date = new Date(mess["incidents"][i].created_at).toLocaleDateString("en-US", options);

                date = '<span class="date empty">'+date+'</span>';
                out += '<div class="text-margin">' + mess["incidents"][i].name + '<br />'+date+'</div>';*/
            }
        }
        
        document.getElementById('messages').innerHTML = out;
    }
}
