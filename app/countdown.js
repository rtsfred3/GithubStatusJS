function loadDoc(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("demo").innerHTML = this.responseText;
      console.log(this.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

//loadDoc("https://status.github.com/api/status.json");
//loadDoc("https://imdb.ryanfredrickson.pw/json/tt1839578.json");

var seconds = 30;
function updateTime() {
  if(seconds < 0){

    location.reload();
    seconds = 30;
  }
  document.getElementById("seconds").innerHTML = "Reload in "+seconds+" seconds";
  //console.log(seconds);
  seconds--;
}

interv = setInterval("updateTime()", 1000);
