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
        'good': '8c42d2cd-28b7-422f-d1bc-fa29fd949100',
        'minor': '2d1f3cba-2101-4ce4-fa9e-f497e4da9300',
        'major': 'c72f3c60-4751-4be5-84a8-b66e94af3500',
        'critical': 'a32ff186-a4e9-483b-982f-1a1081f2af00',
        'unavailable': '91a72ef5-fa39-4314-511d-fc3fb2481300'
    };

    const statusRes = await fetch("https://www.githubstatus.com/api/v2/status.json");
    const statusData = await statusRes.json();

    var status = statusData.status.indicator == "none" ? "good" : statusData.status.indicator;

    // var statusImage = await env.status_images.get(`${status}`);
    // statusImage = statusImage.replace("data:image/png;base64,", "");

    var url = `https://imagedelivery.net/${accountHash}/${imageIds[status]}/1000px`;

    return fetch(url);

    // return new Response(base64Decode(statusImage), {
    //     headers: {
    //         "Cache-Control": "max-age=60, s-maxage=60, public",
    //         "Cloudflare-CDN-Cache-Control": "max-age=60"
    //     },
    // });
}