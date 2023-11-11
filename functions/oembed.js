function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function onRequestGet({ request, params, env }) {
    const db = env.CACHE_DB;
    const table = env.TABLE;

    var host = "githubstat.us";
    var title = "GitHub Status";

    const { searchParams } = new URL(request.url);
    let url = searchParams.get('url');
    let format = searchParams.get('format');

    const newUrl = new URL(url);

    var cloudflareDevRegex = /(spa|master|staging|[1-9A-Za-z-_]+)\.ghstatus\.pages\.dev/g;
    var cloudflareProdRegex = /githubstat.us/g;
    
    var onCloudflareDev = newUrl.host.match(cloudflareDevRegex) != null;
    var onCloudflareProd = newUrl.host.match(cloudflareProdRegex) != null;

    console.log("URL: " + url);
    console.log("Format: " + format);

    console.log("Pathname: " + newUrl.pathname);
    console.log("onCloudflareDev: " + onCloudflareDev);
    console.log("onCloudflareProd: " + onCloudflareProd);

    if (newUrl.pathname == "/") {
        title = "GitHub Status";
    }
    else if (newUrl.pathname == "/status/") {
        title = "GitHub Status Page";
    }
    else if (newUrl.pathname == "/components/") {
        title = "GitHub Status Components";
    }
    else if (newUrl.pathname == "/amp/") {
        title = "GitHub Status AMP";
    }
    else if (newUrl.pathname == "/testing/") {
        title = "Test";
    }
    else {
        title = "Error";
    }

    if (!(onCloudflareDev || onCloudflareProd) || title == "Error" || format == null || format == "xml") {
        return new Response(JSON.stringify({}), {
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",
                "Cache-Control": "max-age=0, no-cache"
            },
            status: 404
        });
    }

    const { results } = await db.prepare(`SELECT * FROM ${table} WHERE route = ?`).bind(`/api/v2/status.json`).all();

    var statusResult = JSON.parse(results[0].data);

    var status = statusResult["status"]["indicator"] == "none" ? "Good" : capitalizeFirstLetter(statusResult["status"]["indicator"]);

    console.log(statusResult);

    var result = {
        "version": "1.0",
        "type": "photo",
        "title": `${title}: ${status} - ${statusResult["status"]["description"]}`,
        "width": 300,
        "height": 300,
        "url": "https://githubstat.us/img/status-min.png",
        "thumbnail_url": "https://githubstat.us/img/status-min.png",
        "provider_name": "(Unofficial) GitHub Status",
        "provider_url": url,
        "cache_age": 20,
    };
    
    return new Response(JSON.stringify(result, null, 2), {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=60, public"
        },
    });
}