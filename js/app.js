var metaColors = {'none':'#339966', 'minor':'#F1C40F', 'major':'#FF9900', 'critical':'#990000', 'unavailable':'#4F93BD', 'error':'#646464'}
var indicatorVals = {'none':'good', 'minor':'minor', 'major':'major', 'critical':'critical', 'error':'error'}

function setInfo(url, funct){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            funct(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function setTheme(status){
    var metaTags = [2, 17];
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
    var patt = /(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\/([a-zA-Z0-9-\/_.])*[^.]/i

    if(mess["incidents"].length == 0){
        document.getElementById('messages').innerHTML = '<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like GitHub is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>';
        return;
    }else{
        var out = '';
        for(var i = 0; i < mess["incidents"].length; i++){
            if(mess["incidents"][i]["incident_updates"].length > 0){
                for(var j = 0; j < mess["incidents"][i]["incident_updates"].length; j++){
                    var w = (mess["incidents"][i]["incident_updates"][j]["status"] == "resolved" ? "good" : mess["incidents"][i]["impact"]);
                    out += '<div class="status-box ' + w + '"><span class="message-status"><div class="right">' + w + '</div></span></div>';

                    var options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                    var date = new Date(mess["incidents"][i]["incident_updates"][j].created_at).toLocaleDateString("en-US", options);

                    date = '<span class="date empty">'+date+'</span>';
                    out += '<div class="text-margin">' + mess["incidents"][i]["incident_updates"][j].body + '<br />'+date+'</div>';
                }
            }
            
            out += '<div class="status-box ' + indicatorVals[mess["incidents"][i]["impact"]] + '"><span class="message-status"><div class="right">' + indicatorVals[mess["incidents"][i]["impact"]] + '</div></span></div>';

            var options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            var date = new Date(mess["incidents"][i].created_at).toLocaleDateString("en-US", options);

            date = '<span class="date empty">'+date+'</span>';
            out += '<div class="text-margin">' + mess["incidents"][i].name + '<br />'+date+'</div>';
        }
        document.getElementById('messages').innerHTML = out;
    }
}
