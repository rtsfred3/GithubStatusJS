var dict = {'good':'#339966', 'minor':'#FF9900', 'major':'#990000', 'unavailable':'#4F93BD', 'error':'#646464'}

function setTheme(status){
    var metaTags = [2, 17];
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

function Messages(mess){
    var patt = /(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}\/([a-zA-Z0-9-\/_.])*[^.]/i

    if (mess.length == 0){
        document.getElementById('messages').innerHTML = '<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like GitHub is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>';
        return;
    }else{
        var out = '';
        for(var i = 0; i < mess.length; i++){
            out += '<div class="status-box ' + mess[i].status.toLowerCase() + '"><span class="message-status"><div class="right">' + mess[i].status.toLowerCase() + '</div></span></div>';

            var options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            var date = new Date(mess[i].created_on).toLocaleDateString("en-US", options);

            if(patt.exec(mess[i].body)){
                var link = patt.exec(mess[i].body)[0];
                mess[i].body = mess[i].body.replace(link, '<a href="'+link+'" target="_blank">'+link+'</a>');
            }

            date = '<span class="date empty">'+date+'</span>';
            out += '<div class="text-margin">' + mess[i].body + '<br />'+date+'</div>';
        }
        document.getElementById('messages').innerHTML = out;
    }
}
