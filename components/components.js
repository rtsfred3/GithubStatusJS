var metaColors = {'none':'#339966', 'minor':'#F1C40F', 'major':'#FF9900', 'critical':'#990000', 'unavailable':'#4F93BD', 'error':'#646464'}
var indicatorVals = {'operational':'good', 'degraded_performance':'minor', 'partial_outage':'major', 'major_outage':'critical', 'error':'error'}

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

function Status(arr){
    var out = "";
    for(var i = 0; i < arr["components"].length; i++){
        var curr = arr["components"][i];
        if(curr["id"] == "0l2p9nhqnxpd"){ continue; }
        if(curr["name"][curr["name"].length-1] == ')'){ continue; }

        out += '<div class="status-height bold status-color '+indicatorVals[curr["status"]]+'-color"><span class="center-status">'+curr["name"]+'</span></div>';
    }

    document.getElementsByTagName("body")[0].innerHTML = out + document.getElementsByTagName("body")[0].innerHTML;
}
