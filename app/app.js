function Status(arr){
    var status = arr.status;
    var out = '<div class="' + status + '">' + status.toUpperCase() + '</div>';
    
    if(!status || status === null){
        out = '<div class="black">UNAVAILABLE</div>';
    }
    
    document.write('<center><b>' + out + '</b></center>');
}
