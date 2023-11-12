export async function onRequestGet({ params, env }) {
    const db = env.CACHE_DB;
    const table = env.TABLE;

    const { results } = await db.prepare(`SELECT * FROM ${table} WHERE route = ? OR route = ?`).bind(`/api/amp/body.json`, `/api/v2/status.json`).all();
    
    var statusJson = JSON.parse(results.find((t) => t["route"] == `/api/v2/status.json`).data);
    var status = statusJson["status"]["indicator"] == 'none' ? "good" : statusJson["status"]["indicator"];
    var statusDescription = statusJson["status"]["description"];

    const url = "https://githubstat.us/Statuspage/";
    
    const body = JSON.parse(results.find((t) => t["route"] == `/api/amp/body.json`).data.replace("\n", ""))["items"][0]["body"];

    // const body = JSON.parse(results[0].data.replace("\n", ""))["items"][0]["body"];

    var title = `GitHub Status | ${statusDescription}`;
    var description = `A website to monitor GitHub status updates. | ${statusDescription}`;

    var updated_on = new Date(results[0].updated_on);
    var age = parseInt(((new Date()) - updated_on) / 1000);

    var html = '<!DOCTYPE html> \
    <html lang="en"> \
        <head> \
            <meta name="author" content="rtsfred3"> \
            <meta name="application-name" content="' + title + '"> \
            <meta name="theme-color" content="#53C68C"> \
            <meta name="description" content="' + description + '"> \
            <meta name="keywords" content="GitHubStatus, GitHub Status, GitHub, Status"> \
            \
            <meta property="og:site_name" content="' + title + '"> \
            <meta property="og:title" content="' + title + '"> \
            <meta property="og:description" content="' + description + '"> \
            <meta property="og:type" content="website"> \
            <meta property="og:url" content="' + url + '"> \
            <meta property="og:image" content="https://githubstat.us/img/status-min.png"> \
            <meta property="og:image:type" content="image/jpeg" /> \
            <meta property="og:image:width" content="300" /> \
            <meta property="og:image:height" content="300" /> \
            \
            <meta name="twitter:card" content="summary"> \
            <meta name="twitter:title" content="' + title + '"> \
            <meta name="twitter:description" content="' + description + '"> \
            <meta name="twitter:image" content="https://githubstat.us/img/status-min.png"> \
            \
            <meta name="mobile-web-app-capable" content="yes"> \
            <meta name="apple-mobile-web-app-title" content="' + title + '"> \
            <meta name="apple-mobile-web-app-capable" content="yes"> \
            <meta name="apple-mobile-web-app-status-bar-style" content="#53C68C"> \
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0.0" /> \
            <meta name="HandheldFriendly" content="true" /> \
            \
            <link rel="canonical" href="' + url + '" /> \
            \
            <script type="application/ld+json"> \
                { \
                    "@context": "http://schema.org/", \
                    "@type": "WebApplication", \
                    "name": "' + title + '", \
                    "alternateName": "GH Status", \
                    "applicationCategory": "DeveloperApplication", \
                    "operatingSystem": "Android, iOS, MacOS, Windows", \
                    "softwareRequirements": "Modern Web Browser", \
                    "url": "' + url + '", \
                    "description": "' + description + '", \
                    "screenshot": "https://githubstat.us/img/screenshots/screenshot1.webp", \
                    "image": "https://githubstat.us/img/status-min.png", \
                    "thumbnailUrl": "https://githubstat.us/img/status-min.png", \
                    "author": [{ \
                        "@type": "Person", \
                        "name": "Ryan Fredrickson", \
                        "jobTitle": "Software Developer", \
                        "url": "https://github.com/rtsfred3" \
                    }], \
                    "maintainer": { \
                        "@type": "Person", \
                        "name": "Ryan Fredrickson", \
                        "jobTitle": "Software Developer", \
                        "url": "https://github.com/rtsfred3" \
                    }, \
                    "offers": { \
                        "@type": "Offer", \
                        "price": "0.00", \
                        "priceCurrency": "USD" \
                    } \
                } \
            </script> \
             \
            <script> \
                var errorMessage = \'<div class="size-max status-width bold error status-color"><span class="center-status">ERROR</span></div>\'; \
            </script> \
            \
            <link rel="icon" type="image/x-icon" href="https://images.githubstat.us/img/lite/144px.png"> \
            <link rel="apple-touch-icon" sizes="144x144" href="https://images.githubstat.us/img/lite/144px.png"> \
            \
            <style> \
                .psa,.status-width{width:100vw;text-align:center;display:table}*{margin:0;padding:0}body{font-family:arial}hr{height:7.5px;color:grey;background-color:grey;margin:1px 0 2px;border:0}.psa{height:1.25em;padding-top:.25em;padding-bottom:.25em;font-size:24pt;background-color:#d83d42}.status{overflow:hidden;position:fixed;top:0;left:0;transition:height .1s}.messages-scroll{padding-top:240px;scroll-behavior:auto;overflow-y:scroll}.status-width{font-size:48pt}.status-shadow{-moz-box-shadow:0 1px 5px 0 gray;-webkit-box-shadow:0 1px 5px 0 gray;box-shadow:0 1px 5px 0 gray}.component-height{height:20vh}.full-status-height{height:100vh}.psa-full-status-height{height:calc(100vh - 1.15em + .275em)}.status-height{height:240px}@media only screen and (max-height:400px){.status-height{height:45vh}.messages-scroll{padding-top:45vh}}@media only screen and (max-width:320px) and (max-height:320px){.status-height{height:100vh}}@media only screen and (min-width:2048px) and (min-height:1080px){.status-height{height:30vh}.status-width{font-size:12em}}@media only screen and (min-width:2100px) and (min-height:1100px){.status-height{height:40vh}.status-width{font-size:16em}}@media only screen and (min-width:3000px) and (min-height:2000px){.status-height{height:40vh}.status-width{font-size:16em}}@media only screen and (max-width:450px){.unavailable-font{font-size:28pt!important}}.hidden,.size-zero{height:0;width:0;margin:0!important;padding:0!important}.hidden,.hide{display:none}.size-max{height:100vh;width:100vw}.bold{font-weight:700}.padding-none{padding:3vh 7.5vw 0}.center{width:auto;text-align:center!important}.center-status{vertical-align:middle;display:table-cell}.empty{color:#646464!important}.font-36{font-size:36pt;font-weight:600}.font-12{font-size:9pt;font-weight:500}svg{height:27px;margin-top:0;margin-bottom:-5px}@media (max-width:300px){.right{float:none}}.right{float:right}.margin{margin:5px}.margin-bottom{margin-bottom:2.5vh}.good,.none{background-color:#396}.minor{background-color:#dbab09}.major{background-color:#e25d10}.critical{background-color:#dc3545}.maintenance{background-color:#0366d6}@media only screen and (min-width:351px) and (max-width:450px){.maintenance{font-size:36pt;font-weight:500}}@media only screen and (min-width:251px) and (max-width:350px){.maintenance{font-size:30pt;font-weight:500}}@media only screen and (min-width:151px) and (max-width:250px){.maintenance{font-size:20pt;font-weight:500}}.unavailable{background-color:#4f93bd}.error{background-color:#646464}.status-color{color:#fff}.black{color:#000!important} \
                \
                .messages{margin:1.5em 0;padding:0}@media only screen and (min-width:2100px) and (min-height:1100px){.messages{margin:3em 0}}.date{font-size:9pt!important}.status-box{height:45px;font-size:14pt;color:#f8f8f8;display:table!important}.text-margin{font-size:11pt;margin:1em 2.5vw}.good-message{width:120px;background-color:#396}.none-message{width:200px;background-color:#000}.minor-message{width:200px;background-color:#f1c40f}.major-message{width:280px;background-color:#f90}.critical-message{width:360px;background-color:#900}.error-message{width:120px;background-color:#646464}@media only screen and (max-width:850px){.good-message{width:20vw}.minor-message,.none-message{width:40vw}.major-message{width:60vw}.critical-message{width:80vw}.error-message{width:50vw}.text-margin{margin:3vh 4vw}}@media only screen and (max-width:400px){.text-margin{margin:3vh 7vw}}@media only screen and (max-width:320px) and (max-height:320px){.messages{display:none;height:0}}@media (min-width:2048px) and (min-height:1080px){.status-box,.text-margin{font-size:2.5em}.good-message{width:20vw}.minor-message,.none-message{width:40vw}.major-message{width:60vw}.critical-message{width:80vw}.error-message{width:50vw}.status-box{height:2em}.date{font-size:.75em!important}}@media (min-width:2100px) and (min-height:1100px){.status-box{height:1.75em;font-size:3.5em}.text-margin{font-size:3em}}@media (min-width:3000px) and (min-height:2000px){.status-box{height:1.75em;font-size:5em}.text-margin{font-size:4em}}.message-status{width:100%;padding-right:.5em;vertical-align:middle;display:table-cell!important}.message-error{padding:3vh 7.5vw 0!important;color:#646464} \
            </style> \
            <title>' + title + '</title> \
        </head> \
        <body> \
        ' + body + '\
        </body> \
        </html>';

    return new Response(html, {
        headers: {
            "Content-Type": "text/html",
            "X-Age": age,
            "Cache-Control": `max-age=60, s-maxage=60, public`,
            "Cloudflare-CDN-Cache-Control": `max-age=60`
        },
    });
}