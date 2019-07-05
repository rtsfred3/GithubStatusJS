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
    var metaTags = [2, 18];
    var meta = document.getElementsByTagName('meta');
    for(var i = 0; i<metaTags.length; i++){
        meta[metaTags[i]].setAttribute('content', metaColors[status]);
    }
}

function Status(arr){
    setTheme('unavailable');
    document.getElementById("mainStatus").classList.remove("zero-height");
    document.getElementById("mainStatus").classList.remove("unavailable-color");
    document.getElementById("mainStatus").innerHTML = '<span class="center-status">'+indicatorVals[arr.status.indicator].toUpperCase()+'</span>';
    document.getElementById("mainStatus").classList.add("status-height");
    document.getElementById("mainStatus").classList.add("status-color");
    document.getElementById("mainStatus").classList.add(arr.status.indicator.toLowerCase()+"-color");
    setTheme(arr.status.indicator);
}
