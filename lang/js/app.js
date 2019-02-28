var metaColors = {'none':'#339966', 'minor':'#F1C40F', 'major':'#FF9900', 'critical':'#990000', 'unavailable':'#4F93BD', 'error':'#646464'};
var language = (window.navigator.userLanguage || window.navigator.language).substring(0, 2);
// language = "fr";

function setUp(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var languages = JSON.parse(this.responseText);
            if(languages[language] == undefined){ language = 'en'; }
            setHead(languages[language]);
            setInfo('https://www.githubstatus.com/api/v2/status.json', Status, languages);
            setInfo('https://www.githubstatus.com/api/v2/incidents/unresolved.json', Messages, languages);
        }
    };
    xhttp.open("GET", 'languages.json', true);
    xhttp.send();
}

function setInfo(url, funct, langs){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            funct(JSON.parse(this.responseText), langs);
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

function setHead(lang){
    document.getElementsByTagName('html')[0].setAttribute('lang', language);

    var meta = document.getElementsByTagName('meta');

    var metaTags = [3, 7, 13]; //Descriptions
    for(var i = 0; i<metaTags.length; i++){
        meta[metaTags[i]].setAttribute('content', lang.description);
    }

    meta[8].setAttribute('content', lang.images.facebook); //Pictures
    meta[14].setAttribute('content', lang.images.twitter); //Pictures

    var metaTags = [1, 5, 6, 12, 16]; //Titles
    for(var i = 0; i<metaTags.length; i++){
        meta[metaTags[i]].setAttribute('content', lang.title);
    }
    document.getElementsByTagName('title')[0].innerHTML = lang.title;
}

function Status(arr, languages){
    setTheme('unavailable');
    document.getElementById("mainStatus").classList.remove("unavailable-color");
    document.getElementById("mainStatus").innerHTML = '<span class="center-status">'+languages[language].status[arr.status.indicator].toUpperCase()+'</span>';
    document.getElementById("mainStatus").classList.add("status-color");
    document.getElementById("mainStatus").classList.add(arr.status.indicator.toLowerCase()+"-color");
    setTheme(arr.status.indicator);
}

function Messages(mess, languages){
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
