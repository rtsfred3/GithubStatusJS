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
