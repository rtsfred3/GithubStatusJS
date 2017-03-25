function svg(color, i, len){
    var main = '<?xml version="1.0" encoding="utf-8"?><svg viewBox="0 0 100 200" display="block" xmlns="http://www.w3.org/2000/svg">';
    if(i == 0){
        main += '<line x1="50" y1="100" x2="50" y2="200" stroke-width="10" stroke="black"/>';
    }else if(i == len-1){
        main += '<line x1="50" y1="0" x2="50" y2="100" stroke-width="10" stroke="black"/>';
    }else{
        main += '<line x1="50" y1="0" x2="50" y2="200" stroke-width="10" stroke="black"/>';
    }
    return main + '<circle cx="50" cy="100" r="35" fill="' + color + '"/></svg>';
}

function Status(arr){
    var out = '<div class="black">UNAVAILABLE</div>';
    if(arr.status == 'good'){
        out = '<div class="green">GOOD</div>';
    }else if (arr.status == 'minor'){
        out = '<div class="orange">MINOR</div>';
    }else if (arr.status == 'major'){
        out = '<div class="red">MAJOR</div>';
    }
    document.write('<center><b>' + out + '</b></center>');
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
            out += '<td id="status"><font size="3">' + mess[i].body + '</font><br /><div class="date">' + date.substring(4,15) +  ' at ' + date.substring(16,24) + '</div></td></tr>';
        }
        out += '</table>';
    }
    document.write(out);
}
