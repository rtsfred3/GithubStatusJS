var metaColors = {'none':'#339966', 'minor':'#F1C40F', 'major':'#FF9900', 'critical':'#990000', 'unavailable':'#4F93BD', 'error':'#646464'};
var language = window.navigator.userLanguage || window.navigator.language;
var languages = {};

function setLang(url){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            languages = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

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
    var metaTags = [2, 18];
    var meta = document.getElementsByTagName('meta');
    for(var i = 0; i<metaTags.length; i++){
        meta[metaTags[i]].setAttribute('content', metaColors[status]);
    }
}

function Status(arr){
    setTheme('unavailable');
    document.getElementById("mainStatus").classList.remove("unavailable-color");
    document.getElementById("mainStatus").innerHTML = '<span class="center-status">'+languages[language].status[arr.status.indicator].toUpperCase()+'</span>';
    document.getElementById("mainStatus").classList.add("status-color");
    document.getElementById("mainStatus").classList.add(arr.status.indicator.toLowerCase()+"-color");
    setTheme(arr.status.indicator);
}

function Messages(mess){
    if(mess["incidents"].length == 0){
        document.getElementById('messages').innerHTML = '<div class="empty padding-none"><div class="font-36 margin-bottom">'+languages[language].messages.none[0]+'</div><div class="font-12">'+languages[language].messages.none[1]+'<br /><br />'+languages[language].messages.none[2]+'</div></div>';
        return;
    }else{
        var out = '';
        for(var i = 0; i < mess["incidents"].length; i++){
            if(mess["incidents"][i]["incident_updates"].length > 0){
                for(var j = 0; j < mess["incidents"][i]["incident_updates"].length; j++){
                    var w = (mess["incidents"][i]["incident_updates"][j]["status"] == "resolved" ? "none" : (mess["incidents"][i]["impact"] == 'none' ? 'none' : mess["incidents"][i]["impact"]));
                    out += '<div class="status-box ' + w + '"><span class="message-status"><div class="right">' + languages[language]["status"][w] + '</div></span></div>';

                    var options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                    var date = new Date(mess["incidents"][i]["incident_updates"][j].created_at).toLocaleDateString("en-US", options);

                    date = '<span class="date empty">'+date+'</span>';
                    out += '<div class="text-margin">' + mess["incidents"][i]["incident_updates"][j].body + '<br />'+date+'</div>';
                }
            }
        }
        document.getElementById('messages').innerHTML = out;
    }
}
