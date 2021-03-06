function svg(c){
    return '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve"><path fill-rule="evenodd" clip-rule="evenodd" fill="' + c + '" d="M18,1.4C9,1.4,1.7,8.7,1.7,17.7c0,7.2,4.7,13.3,11.1,15.5  c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1  c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4  c-0.2-0.4-0.7-2.1,0.2-4.3c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7  c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5  c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C34.3,8.7,27,1.4,18,1.4z"/></svg>';
}

function getTitle(s){
    return '<font size="4">Github </font><font size="4" class="'+s+'">Status</font>';
}

function getStatus(s){
    return '<b><span class="'+s+'">'+s.toUpperCase()+'</span></b>';
}

function miniStatus(arr){
    document.getElementById("mainStatus").innerHTML =  getStatus(arr.status);
}

function Status(arr){
    var image;
    if(arr.status == 'good'){
        image = svg('#339966');
    }else if (arr.status == 'minor'){
        image = svg('#DBAB09');
    }else if (arr.status == 'major'){
        image = svg('#E25D10');
    }else if (arr.status == 'critical'){
        image = svg('#DC3545');
    }
    miniStatus(arr);
    document.getElementById("color").innerHTML =  getTitle(arr.status);
    document.getElementById("image").innerHTML = image;
}

function Messages(mess){
    if (mess.length == 0){
        var out = '<i>No new messages</i>';
    }else{
        var out = '<table width="100%">';
        for(var i = 0; i < mess.length; i++){
            var date = new Date(mess[i].created_on).toString();
            date = '<span class="date">' + date.substring(4,15) +  ' at ' + date.substring(16,24) + '</span>';
            out += '<tr><td class="' + mess[i].status.toLowerCase() + 't size"></td><td><span>' + mess[i].body + '</span><br />'+date+'</tr>';
        }
        out += '</table>';
    }
    document.getElementById('messages').innerHTML = out;
}
