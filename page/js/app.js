var dict = {'good':'#339966', 'minor':'#FF9900', 'major':'#990000', 'unavailable':'#4F93BD'}

function Status(arr){
  document.getElementById("mainStatus").innerHTML =  '<span class="center-status">'+arr.status.toUpperCase()+'</span>';
  document.getElementById("mainStatus").setAttribute("style", "color: white; background-color: "+dict[arr.status]+";");
}

function Messages(mess){
  if (mess.length == 0){
    var out = '<i>No new messages</i>';
    return;
  }else{
    var out = '';
    for(var i = 0; i < mess.length; i++){
      var a = '';
      if(i != mess.length-1){ a += ' text-margin-bottom'; }

      out += '<div class="status-box ' + mess[i].status.toLowerCase() + '"><span class="message-status"><div style="float:right;">' + mess[i].status.toLowerCase() + '</div></span></div>';

      var date = new Date(mess[i].created_on).toString();
      date = '<span class="date empty">' + date.substring(4,15) +  ' at ' + date.substring(16,24) + '</span>';
      out += '<div class="text-margin'+a+'">' + mess[i].body + '<br />'+date+'</div>';
    }
    out += '</table>';
  }
  document.getElementById('messages').innerHTML = out;
  document.getElementById("messages").setAttribute("style", "padding-top: 2.5vw;");
}
