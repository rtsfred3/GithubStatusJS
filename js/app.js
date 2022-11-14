var baseURL = "https://www.githubstatus.com";
// var baseURL = "https://githubstat.us";
// var baseURL = location.origin;

function Router(){
    try{
        var cloudflareDevRegex = /(spa|master|[1-9A-Za-z-_]+)\.ghstatus\.pages\.dev/g;
        var cloudflareProdRegex = /githubstat.us/g;
        
        var onCloudflareDev = location.host.match(cloudflareDevRegex) != null;
        var onCloudflareProd = location.host.match(cloudflareProdRegex) != null;
        
        // console.log('onCloudflareDev', onCloudflareDev);
        // console.log('onCloudflareProd', onCloudflareProd);
        
        if(onCloudflareProd || onCloudflareDev){
            if(location.pathname == '/'){
                IndexHome();
            }else if(location.pathname == '/components/'){
                ComponentsHome();
            }else if(location.pathname == '/status/'){
                StatusHome();
            }else{
                setError();
            }
        }else{
            setError();
        }
    }catch(error){
        setError();
    }
}

function setError(){
    setTheme('error');
    document.getElementsByTagName("body")[0].innerHTML = errorMessage;
}

function setInfo(url, funct, fullStatus = false){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(Array.isArray(funct)){
                funct[0](JSON.parse(this.responseText));
                funct[1](JSON.parse(this.responseText));
            }else{
                if(Status.prototype.constructor.name == 'Status' && fullStatus){
                    funct(JSON.parse(this.responseText), fullStatus);
                }else{
                    funct(JSON.parse(this.responseText));
                }
            }
        }else if(this.readyState == 4 && this.status != 200 && this.status > 0){
            console.log(this.readyState, this.status);
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
    var metaTags = [2, 18];
    var meta = document.getElementsByTagName('meta');
    for(var i = 0; i<metaTags.length; i++){
        meta[metaTags[i]].setAttribute('content', metaColors[status]);
    }
}

function IndexHome(){
    document.getElementById("mainHome").classList.remove("hide");
    // setInfo(baseURL+'/api/v2/summary.json', [Status, Messages]);
    setInfo(baseURL+'/api/v2/status.json', Status);
    setInfo(baseURL+'/api/v2/incidents.json', Messages);
    document.getElementById("mainHome").classList.remove("size-zero");
}

function ComponentsHome(){
    document.getElementById("mainComponents").classList.remove("hide");
    setInfo(baseURL+'/api/v2/components.json', Components);
    document.getElementById("mainComponents").classList.remove("size-zero");
}

function StatusHome(){
    document.getElementById("mainStatus").classList.remove("hide");
    setInfo(baseURL+'/api/v2/status.json', Status, true);
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

function Status(arr, fullStatus=false){
    setTheme('unavailable');
    var id = fullStatus ? "mainStatus" : "status";
    
    document.getElementById(id).classList.remove("unavailable");
    document.getElementById(id).innerHTML = '<span class="center-status">'+indicatorVals[arr.status.indicator].toUpperCase()+'</span>';
    document.getElementById(id).classList.add("status-color");
    document.getElementById(id).classList.add(arr.status.indicator.toLowerCase());
    
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
    
    setTheme(arr.status.indicator);
}

function createMessage(impact, status, body, created_at, shortlink){
    var options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    var out = '';
    
    var w = (status == "resolved" ? "good" : (impact == 'none' ? 'good' : impact));
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
    var lnk = w == 'good' ? '<br /><span class="date empty">Incident Page: </span><a class="date empty" href="' + shortlink + '">' + shortlink + '</a>' : '';
    out += '<div class="text-margin">' + body + lnk + '<br />' + date + '</div>';
    
    return out;
}

function Messages(mess){
    var patt = /(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\/([a-zA-Z0-9-\/_.])*[^.]/i;
    
    var previousDays = 7;
    
    var previousDaysDate = new Date().setDate((new Date).getDate() - previousDays);
    
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
                        incidents[i].impact, incidents[i]["incident_updates"][j].status,
                        mess["incidents"][i]["incident_updates"][j].body,
                        mess["incidents"][i]["incident_updates"][j].created_at,
                        mess["incidents"][i].shortlink
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
