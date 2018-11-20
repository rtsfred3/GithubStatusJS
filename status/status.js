var dict = {'good':'#339966', 'minor':'#FF9900', 'major':'#990000', 'unavailable':'#4F93BD', 'error':'#646464'}

function setTheme(status){
    var metaTags = [2, 15];
    var meta = document.getElementsByTagName('meta');
    for(var i = 0; i<metaTags.length; i++){
        meta[metaTags[i]].setAttribute('content', dict[status]);
    }
}

function Status(arr){
    setTheme('unavailable');
    document.getElementById("mainStatus").classList.remove("unavailable-color");
    document.getElementById("mainStatus").innerHTML =  '<span class="center-status">'+arr.status.toUpperCase()+'</span>';
    document.getElementById("mainStatus").classList.add("status-color");
    document.getElementById("mainStatus").classList.add(arr.status.toLowerCase()+"-color");
    setTheme(arr.status);
}
