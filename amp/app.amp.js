var metaColors = {'none':'#339966', 'minor':'#F1C40F', 'major':'#FF9900', 'critical':'#990000', 'unavailable':'#4F93BD', 'error':'#646464'};
var indicatorVals = {'resolved':'good','none':'good', 'minor':'minor', 'major':'major', 'critical':'critical', 'error':'error'};
var indicatorMessages = {'resolved':'good', 'investigating':'minor', 'critical':'critical'};
var baseURL = "https://www.githubstatus.com";
baseURL = "https://do.githubstat.us";

function setUp(){
    console.log("setUp() started");
    try{
        setInfo(baseURL+'/amp/api/status.php', Status);
        // setInfo(baseURL+'/amp/api/incidents.php', Messages);
        document.getElementById("main").classList.remove("size-zero");
        // PSA_F('Status Update');
    }catch(error){
        setError();
    }
}

function setError(){
    setTheme('error');
    // document.getElementById("main").classList.add("size-zero");
    // document.getElementById("main").innerHTML = '';
    document.getElementsByTagName("body")[0].innerHTML = errorMessage;
}

function setInfo(url, funct){
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if(this.readyState == 4 && this.status == 200) {
    //         funct(JSON.parse(this.responseText));
    //     }else if(this.readyState == 4 && this.status != 200 && this.status > 0){
    //         console.log(this.readyState, this.status);
    //         setError();
    //     }
    // };
    // xhttp.open("GET", url, true);
    // xhttp.send();

    var globals = [this, document, this.base];

    fetch(url).then(data => data.json()).then(data => funct(data, globals)).catch(error => console.log('Error:', error));
}

function PSA_F(psa){
    document.getElementById("psa").classList.remove("hidden");
    document.getElementById("psa").innerHTML = '<div class="center-status">' + psa + '</div>';
}

function setTheme(status){
    var metaTags = [2, 18];
    var meta = document.getElementsByTagName('meta');
    for(var i = 0; i<metaTags.length; i++){
        meta[metaTags[i]].setAttribute('content', metaColors[status]);
    }
}

function Status(arr){
    console.log(arr.status.indicator);
    setTheme('unavailable');
    document.getElementById("mainStatus").classList.remove("unavailable");

    var mStatus = document.createElement('span');
    mStatus.setAttribute("class", "center-status");

    document.getElementById("mainStatus").appendChild(mStatus);

    // document.getElementById("mainStatus").innerHTML = '<span class="center-status">'+indicatorVals[arr.status.indicator].toUpperCase()+'</span>';
    document.getElementById("mainStatus").classList.add("status-color");
    document.getElementById("mainStatus").classList.add(arr.status.indicator.toLowerCase());
    setTheme(arr.status.indicator);
}

function Messages(mess){
    var patt = /(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\/([a-zA-Z0-9-\/_.])*[^.]/i;
    var options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    var weekOld = new Date();
    weekOld.setDate(weekOld.getDate() - 7);
    var incidents = mess["incidents"].filter(function(incident){ return new Date(incident["created_at"]) > weekOld; });

    if(incidents.length == 0){
        document.getElementById('messages').innerHTML = '<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like GitHub is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>';
        return;
    }else{
        var out = '';
        for(var i = 0; i < incidents.length; i++){
            if(new Date(incidents[i]["created_at"]) < weekOld){ break; }
            if(incidents[i]["incident_updates"].length > 0){
                for(var j = 0; j < incidents[i]["incident_updates"].length; j++){
                    var w = (incidents[i]["incident_updates"][j]["status"] == "resolved" ? "good" : (incidents[i]["impact"] == 'none' ? 'good' : incidents[i]["impact"]));
                    if(w == undefined){ w = indicatorMessages[incidents[i]["incident_updates"][j]["status"]]; }
                    out += '<div class="status-box ' + w + '-message"><span class="message-status"><div class="right">' + w + '</div></span></div>';

                    var date = new Date(mess["incidents"][i]["incident_updates"][j].created_at).toLocaleDateString("en-US", options);

                    if(location.hostname == 'do.githubstat.us'){
                        options = { month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' };
                        var t_date = new Date(mess["incidents"][i]["incident_updates"][j].created_at);
                        t_date = Date.UTC(t_date.getUTCFullYear(), t_date.getUTCMonth(), t_date.getUTCDate(), t_date.getUTCHours()+(t_date.getTimezoneOffset()/60), t_date.getUTCMinutes(), t_date.getUTCSeconds());
                        date = new Date(t_date).toLocaleDateString("en-US", options) + ' UTC';
                    }

                    date = '<span class="date empty">'+date+'</span>';
                    out += '<div class="text-margin">' + mess["incidents"][i]["incident_updates"][j].body + '<br />'+date+'</div>';
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

// var main = document.createElement('div');
// main.setAttribute("id", "main");
// main.setAttribute("class", "zed size-zero");
//
// var mainStatus = document.createElement('div');
// mainStatus.setAttribute("id", "mainStatus");
// mainStatus.setAttribute("class", "status-height status-width bold status-color unavailable");
//
// var messages = document.createElement('div');
// messages.setAttribute("id", "messages");
// messages.setAttribute("class", "messages");
//
// main.appendChild(mainStatus);
// main.appendChild(messages);
//
// document.body.appendChild(main);

console.log("Started");
setUp();
