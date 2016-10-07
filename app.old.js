//Github Status
//by Ryan Fredrickson
function Status(arr) {
    var title = "";
    var out = "";
    if (navigator.language == 'fr'){
        if(arr.status == 'good'){
            out += '<center><b><font style="font-family: verdana !important;" size="7" id="green">BON</font></b></center>';
            title += '<b><font style="font-family: verdana !important;" size="4">Github </font></b><font style="font-family: verdana !important;" size="4" id="green">&Eacutetat</font>';
        } else if (arr.status == 'minor'){
            out += '<center><b><font style="font-family: verdana !important;" size="7" id="orange">MINOR</font></b></center>';
            title += '<b><font style="font-family: verdana !important;" size="4">Github </font></b><font style="font-family: verdana !important;" size="4" id="orange">&Eacutetat</font>';
        } else if (arr.status == 'major'){
            out += '<center><b><font style="font-family: verdana !important;" size="7" id="red">MAJOR</font></b></center>';
            title += '<b><font style="font-family: verdana !important;" size="4">Github </font></b><font style="font-family: verdana !important;" size="4" id="red">&Eacutetat</font>';
        } else {
            out += '<center><b><font style="font-family: verdana !important;" size="7" id="black">UNAVAILABLE</font></b></center>';
            title += '<b><font style="font-family: verdana !important;" size="4">Github </font></b><font style="font-family: verdana !important;" size="4" id="black">&Eacutetat</font>';
        }
        document.getElementById("status").innerHTML = out;
        document.getElementById("color").innerHTML = title;
        document.getElementById("refresh").innerHTML = 'Rafra&icircchir';
        document.getElementById("title").innerHTML = 'Github &Eacutetat - Lite';
        
    }else{
        if(arr.status == 'good'){
            out += '<center><b><font style="font-family: verdana !important;" size="7" id="green">GOOD</font></b></center>';
            title += '<b><font style="font-family: verdana !important;" size="4">Github </font></b><font style="font-family: verdana !important;" size="4" id="green">Status</font>';
        } else if (arr.status == 'minor'){
            out += '<center><b><font style="font-family: verdana !important;" size="7" id="orange">MINOR</font></b></center>';
            title += '<b><font style="font-family: verdana !important;" size="4">Github </font></b><font style="font-family: verdana !important;" size="4" id="orange">Status</font>';
        } else if (arr.status == 'major'){
            out += '<center><b><font style="font-family: verdana !important;" size="7" id="red">MAJOR</font></b></center>';
            title += '<b><font style="font-family: verdana !important;" size="4">Github </font></b><font style="font-family: verdana !important;" size="4" id="red">Status</font>';
        } else {
            out += '<center><b><font style="font-family: verdana !important;" size="7" id="black">UNAVAILABLE</font></b></center>';
            title += '<b><font style="font-family: verdana !important;" size="4">Github </font></b><font style="font-family: verdana !important;" size="4" id="black">Status</font>';
        }
        document.getElementById("status").innerHTML = out;
        document.getElementById("color").innerHTML = title;
        document.getElementById("refresh").innerHTML = 'Refresh';
        document.getElementById("title").innerHTML = 'Github Status - Lite';
    }
}

function Messages(mess) {
    if (mess.length == 0){
        if(navigator.language == 'fr'){
            var out = '<i>Non nouveaux messages</i>';
        }else{
            var out = '<i>No new messages</i>';
        }
    } else {
        var i;
        var out = '';
        out += '<table>';
        for(i = 0; i<mess.length; i++) {
            var created_on = mess[i].created_on;
            var date = new Date(created_on);
            date = date.toString();
            date = date.substring(4,15) +  ' at ' + date.substring(16,24);
            
            if(mess[i].status == 'good'){
                var str = mess[i].created_on;
                out += '<tr><td id="green"></td><td><font size="3"><u>Status</u>: </font><font size="3" id="green">Good</font><br /><font size="3"><u>Message</u>: ' + mess[i].body + '</font><br /><font size="1" id="date">' + date + '</font></tr>';
            } else if (mess[i].status == 'minor'){
                var str = mess[i].created_on;
                out += '<tr><td id="orange"></td><td><font size="3"><u>Status</u>: </font><font size="3" id="orange">Minor Problem</font><br /><font size="3"><u>Message</u>: ' + mess[i].body + '</font><br /><font size="1" id="date">' + date + '</font></tr>';
            } else {
                var str = mess[i].created_on;
                out += '<tr><td id="red"></td><td><font size="3"><u>Status</u>: </font><font size="3" id="red">Major Problem</font><br /><font size="3"><u>Message</u>: ' + mess[i].body + '</font><br /><font size="1" id="date">' + date + '</font></tr>';
            }
        }
        out += '</table>';
    }
    document.getElementById("messages").innerHTML = out;
}

function uc(string){
    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
};

if(WURFL.is_mobile){
    console.log(WURFL);
}else{
    // Determine the correct object to use
    var notification = window.Notification || window.mozNotification || window.webkitNotification;
    
    // The user needs to allow this
    if ('undefined' === typeof notification){
        alert('Web notification not supported');
    }else{
        notification.requestPermission(function(permission){});
    }
    
    // A function handler
    function Notify(arr){
        if ('undefined' === typeof notification)
            return false;       //Not supported....
        if(navigator.language == 'fr'){
            if(arr.status == 'good'){
                var noty = new notification(
                                        'Bon', {
                                        body: arr.body,
                                        dir: 'auto', // or ltr, rtl
                                        lang: 'FR', //lang used within the notification.
                                        tag: 'notificationPopup', //An element ID to get/set the content
                                        icon: 'images/144x144.png' //The URL of an image to be used as an icon
                                        });
            }
            else if(arr.status == 'minor'){
                var noty = new notification(
                                        'Probl&egraveme Mineur', {
                                        body: arr.body,
                                        dir: 'auto', // or ltr, rtl
                                        lang: 'FR', //lang used within the notification.
                                        tag: 'notificationPopup', //An element ID to get/set the content
                                        icon: 'images/144x144.png' //The URL of an image to be used as an icon
                                        });
            }else{
                var noty = new notification(
                                        'Probl&egraveme Grave', {
                                        body: arr.body,
                                        dir: 'auto', // or ltr, rtl
                                        lang: 'FR', //lang used within the notification.
                                        tag: 'notificationPopup', //An element ID to get/set the content
                                        icon: 'images/144x144.png' //The URL of an image to be used as an icon
                                        });
            }
        }else{
            var noty = new notification(
                                        uc(arr.status), {
                                        body: arr.body,
                                        dir: 'auto', // or ltr, rtl
                                        lang: 'EN', //lang used within the notification.
                                        tag: 'notificationPopup', //An element ID to get/set the content
                                        icon: 'images/144x144.png' //The URL of an image to be used as an icon
                                        });
        }
        noty.onclick = function () {
            console.log('notification.Click');
        };
        noty.onerror = function () {
            console.log('notification.Error');
        };
        noty.onshow = function () {
            console.log('notification.Show');
        };
        noty.onclose = function () {
            console.log('notification.Close');
        };
        return true;
    }
}