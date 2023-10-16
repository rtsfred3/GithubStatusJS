function base64Decode (string) {
    string = atob(string);
    const
      length = string.length,
      buf = new ArrayBuffer(length),
      bufView = new Uint8Array(buf);
    for (var i = 0; i < length; i++) { bufView[i] = string.charCodeAt(i) }
    return buf
}

export async function onRequestGet({ params, env }) {
    const status_images = env.status_images;

    const statusRes = await fetch("https://www.githubstatus.com/api/v2/status.json");
    const statusData = await statusRes.json();

    var status = statusData.status.indicator;

    if(status == "none"){
        status = "good";
    }

    var statusImage = await env.status_images.get(`${status}`);
    statusImage = statusImage.replace("data:image/png;base64,", "");

    return new Response(base64Decode(statusImage));
    
    // return new Response(base64Decode(statusImage), {
    //     headers: {
    //         "Content-Type": "application/png",
    //         "Cache-Control": "max-age=60, public"
    //     },
    // });
}