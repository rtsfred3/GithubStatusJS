var today = new Date()
var year = today.getFullYear()

var version = "Version 1.1"
var text = "<center>" + version + "<br />\u00A9 <a href='https://github.com/rtsfred3/'>rtsfred3</a>, " + year;

function refresh() {
    location.reload();
}

function info() {
    alert(version + "\n\u00A9 rtsfred3 " + year);
}

function ucFirst(string){
    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
}

/*$(document).on("click", ".GithubHTML", function(e) {
                bootbox.alert({
                                size: 'small',
                                message: text + "<br /><br />Built on <a href='http://status.github.com'>Github API</a></center>",
                                callback: function(result){  }
                                })
                });*/