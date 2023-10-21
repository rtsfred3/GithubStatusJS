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
    const accountHash = '_ATpVMTU_ZZdAfVMy78xjw';
    var imageIds = {
        'good': 'c2f3bcfc-2382-47f8-effe-c47fd96e6300',
        'minor': '2b6f1774-e0a4-41af-cefc-00a20d517400',
        'major': 'a5375f1b-1fad-4062-4037-9324e5d13700',
        'critical': '085631ac-6c66-497d-93a1-df895ab3fd00',
        'unavailable': 'ad2c9e70-c7bb-4c19-87e7-0dbebd1fdf00'
    };

    const statusRes = await fetch("https://www.githubstatus.com/api/v2/status.json");
    const statusData = await statusRes.json();

    var status = statusData.status.indicator == "none" ? "good" : statusData.status.indicator;

    var statusImage = await env.status_images.get(`${status}`);
    statusImage = statusImage.replace("data:image/png;base64,", "");

    var url = `https://imagedelivery.net/${accountHash}/2b6f1774-e0a4-41af-cefc-00a20d517400/1200x628`;

    return fetch(url);

    // return new Response(base64Decode(statusImage), {
    //     headers: {
    //         "Cache-Control": "max-age=60, s-maxage=60, public",
    //         "Cloudflare-CDN-Cache-Control": "max-age=60"
    //     },
    // });
}