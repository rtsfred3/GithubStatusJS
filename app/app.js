function Status(arr){
    var status = arr.status;
    var out = '<div class="' + status + '">' + status.toUpperCase() + '</div>';
    
    if(!status || status === null){
        out = '<div class="black">UNAVAILABLE</div>';
    }
    
    document.write('<center><b>' + out + '</b></center>');
}

function Messages(mess){
    if (mess.length == 0){
        var out = '<i>No new messages</i>';
    }else{
        var i;
        var out = '<table width="100%">';
        for(i = 0; i < mess.length; i++){
            var date = new Date(mess[i].created_on).toString();
            if(mess[i].status == 'good'){
                out += '<tr><td id="green"></td>';
            }else if (mess[i].status == 'minor'){
                out += '<tr><td id="orange"></td>';
            }else{
                out += '<tr><td id="red"></td>';
            }
            out += '<td><font size="3">' + mess[i].body + '</font><br /><font size="1" id="date">' + date.substring(4,15) +  ' at ' + date.substring(16,24) + '</font></tr>';
        }
        out += '</table>';
    }
    document.write(out);
}
