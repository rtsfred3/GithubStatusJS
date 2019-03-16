var metaColors = {'none':'#339966', 'minor':'#F1C40F', 'major':'#FF9900', 'critical':'#990000', 'unavailable':'#4F93BD', 'error':'#646464'}
var indicatorVals = {'resolved':'good','none':'good', 'minor':'minor', 'major':'major', 'critical':'critical', 'error':'error'}
var indicatorMessages = {'resolved':'good', 'investigating':'minor'}

function setUp(){
    try{
        document.getElementById("main").classList.remove("size-zero");
        setInfo('https://www.githubstatus.com/api/v2/status.json', Status);
        setInfo('https://www.githubstatus.com/api/v2/incidents.json', Messages);
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
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            funct(JSON.parse(this.responseText));
        }else if(this.readyState == 4 && this.status != 200 && this.status > 0){
            console.log(this.readyState, this.status);
            setError();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function setTheme(status){
    var metaTags = [2, 18];
    var meta = document.getElementsByTagName('meta');
    for(var i = 0; i<metaTags.length; i++){
        meta[metaTags[i]].setAttribute('content', metaColors[status]);
    }
}

function Status(arr){
    setTheme('unavailable');
    document.getElementById("mainStatus").classList.remove("unavailable-color");
    document.getElementById("mainStatus").innerHTML = '<span class="center-status">'+indicatorVals[arr.status.indicator].toUpperCase()+'</span>';
    document.getElementById("mainStatus").classList.add("status-color");
    document.getElementById("mainStatus").classList.add(arr.status.indicator.toLowerCase()+"-color");
    setTheme(arr.status.indicator);
}

function Messages(mess){
    var patt = /(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\/([a-zA-Z0-9-\/_.])*[^.]/i;
    var options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    if(mess["incidents"].length == 0){
        document.getElementById('messages').innerHTML = '<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like GitHub is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>';
        return;
    }else{
        var out = '';
        var weekOld = new Date();
        weekOld.setDate(weekOld.getDate() - 7);
        for(var i = 0; i < mess["incidents"].length; i++){
            if(new Date(mess["incidents"][i]["created_at"]) < weekOld){ break; }
            if(mess["incidents"][i]["incident_updates"].length > 0){
                for(var j = 0; j < mess["incidents"][i]["incident_updates"].length; j++){
                    var w = (mess["incidents"][i]["incident_updates"][j]["status"] == "resolved" ? "good" : (mess["incidents"][i]["impact"] == 'none' ? 'good' : mess["incidents"][i]["impact"]));
                    // w = indicatorMessages[mess["incidents"][i]["incident_updates"][j]["status"]];
                    out += '<div class="status-box ' + w + '"><span class="message-status"><div class="right">' + w + '</div></span></div>';

                    var date = new Date(mess["incidents"][i]["incident_updates"][j].created_at).toLocaleDateString("en-US", options);

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
