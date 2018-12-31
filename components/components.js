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
    for(var i = 0; i < arr["components"].length; i++){
        var curr = arr["components"][i];
        if(curr["id"] == "0l2p9nhqnxpd"){ continue; }

        document.getElementById("mainStatus"+i).classList.remove("unavailable-color");
        document.getElementById("mainStatus"+i).innerHTML = '<span class="center-status">'+curr["name"]+'</span>';
        document.getElementById("mainStatus"+i).classList.add("status-color");
        document.getElementById("mainStatus"+i).classList.add(indicatorVals[curr["status"]].toLowerCase()+"-color");
    }
}
