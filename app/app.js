function svg(color, i, len){
    var main = '<?xml version="1.0" encoding="utf-8"?><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">';
    if(i == 0){
        main += '<line x1="50" y1="50" x2="50" y2="100" stroke-width="10" stroke="black"/>';
    }else if(i == len-1){
        main += '<line x1="50" y1="0" x2="50" y2="50" stroke-width="10" stroke="black"/>';
    }else{
        main += '<line x1="50" y1="0" x2="50" y2="200" stroke-width="10" stroke="black"/>';
    }
    return main + '<circle cx="50" cy="50" r="25" fill="' + color + '"/></svg>';
}

function Status(arr){
    var out = '<center><b><font size="7" id="black">UNAVAILABLE</font></b></center>';
    if(arr.status == 'good'){
        out = '<center><b><font size="7" id="green">GOOD</font></b></center>';
    }else if (arr.status == 'minor'){
        out = '<center><b><font size="7" id="orange">MINOR</font></b></center>';
    }else if (arr.status == 'major'){
        out = '<center><b><font size="7" id="red">MAJOR</font></b></center>';
    }
    document.write(out);
}

function Messages(mess){
    var out;
    if (mess.length == 0){
        out = '<i>No new messages</i>';
    }else{
        var i;
        out = '<table width="100%">';
        for(i = 0; i<mess.length; i++){
            var date = new Date(mess[i].created_on).toString();
            if(mess[i].status == 'good'){
                out += '<tr><td id="border">' + svg('#2D8A54', i, mess.length) + '</td>';
            }else if (mess[i].status == 'minor'){
                out += '<tr><td id="border">' + svg('#FFA500', i, mess.length) + '</td>';
            }else{
                out += '<tr><td id="border">' + svg('#FF0000', i, mess.length) + '</td>';
            }
            out += '<td><font size="3">' + mess[i].body + '</font><br /><font size="1" id="date">' + date.substring(4,15) +  ' at ' + date.substring(16,24) + '</font></tr>';
        }
        out += '</table>';
    }
    document.write(out);
}
