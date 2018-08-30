var dict = {'good':'#339966', 'minor':'#FF9900', 'major':'#990000', 'unavailable':'#4F93BD', 'error':'#646464'}

function setTheme(status){
  var meta = document.getElementsByTagName('meta');
  meta[2].setAttribute('content', dict[status]);
  meta[7].setAttribute('content', dict[status]);
}

function Status(arr){
  document.getElementById("mainStatus").classList.remove("unavailable-color");
  document.getElementById("mainStatus").innerHTML =  '<span class="center-status">'+arr.status.toUpperCase()+'</span>';
  document.getElementById("mainStatus").classList.add("status-color");
  document.getElementById("mainStatus").classList.add(arr.status.toLowerCase()+"-color");

  setTheme(arr.status);
}

function Messages(mess){
  if (mess.length == 0){
    document.getElementById('messages').innerHTML = '<div class="empty padding-none"><div class="font-36 margin-bottom">All good.</div><div class="font-12">Nothing to see here folks. Looks like GitHub is up and running and has been stable for quite some time.<br /><br />Now get back to work!</div></div>'
    return;
  }else{
    var out = '';
    for(var i = 0; i < mess.length; i++){
      out += '<div class="status-box ' + mess[i].status.toLowerCase() + '"><span class="message-status"><div class="right">' + mess[i].status.toLowerCase() + '</div></span></div>';

      var date = new Date(mess[i].created_on).toString();
      date = '<span class="date empty">' + date.substring(4,15) +  ' at ' + date.substring(16,24) + '</span>';
      out += '<div class="text-margin">' + mess[i].body + '<br />'+date+'</div>';
    }
    out += '</table>';
  }
  document.getElementById('messages').innerHTML = out;
}
