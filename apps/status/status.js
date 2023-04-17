var metaColors = {'none':'#339966', 'minor':'#DBAB09', 'major':'#E25D10', 'critical':'#DC3545', 'unavailable':'#4F93BD', 'error':'#646464', 'maintenance':'#0366d6'};
var indicatorVals = {'none':'good', 'minor':'minor', 'major':'major', 'critical':'critical', 'error':'error','unavailable':'unavailable', 'maintenance':'maintenance'}
var indicatorValsFR = {'none':'bon', 'minor':'mineur', 'major':'majeur', 'critical':'crucial', 'error':'erreur', 'unavailable':'indisponible', 'maintenance':'entretien'}

function setInfo(url, funct){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            funct(JSON.parse(this.responseText));
        }else{
            Status({"page":{"id":"kctbh9vrtdwd","name":"GitHub","url":"https://www.githubstatus.com","time_zone":"Etc/UTC","updated_at":"2020-01-24T08:12:08.344Z"},"status":{"indicator":"unavailable","description":"All Systems Operational"}});
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function setTheme(status){
    var metaTags = [2, 19];
    var meta = document.getElementsByTagName('meta');
    for(var i = 0; i<metaTags.length; i++){
        meta[metaTags[i]].setAttribute('content', metaColors[status]);
    }
}

function Status(arr){
    var language = window.navigator.userLanguage || window.navigator.language;

    if(language.substring(0,2).toLowerCase() == "fr" || language.toLowerCase().includes("fr")){ indicatorVals = indicatorValsFR; }

    setTheme('unavailable');
    document.getElementById("mainStatus").classList.remove("zero-height");
    document.getElementById("mainStatus").classList.remove("unavailable");
    document.getElementById("mainStatus").classList.remove("error");
    document.getElementById("mainStatus").innerHTML = '<span class="center-status">'+indicatorVals[arr.status.indicator].toUpperCase()+'</span>';
    document.getElementById("mainStatus").classList.add("status-height");
    document.getElementById("mainStatus").classList.add("status-color");
    document.getElementById("mainStatus").classList.add(arr.status.indicator.toLowerCase());
    setTheme(arr.status.indicator);
}
