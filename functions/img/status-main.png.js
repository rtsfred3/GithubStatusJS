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
        'good': '2819b6e6-24ce-4bfd-c653-aca072f25000',
        'minor': '64f819df-4441-4b29-70b5-90998ba9a800',
        'major': 'c9d91a25-bfef-4f35-b96b-be0ad2b24200',
        'critical': 'cf212bee-5503-4d01-8b24-961d17cc1f00',
        'unavailable': '7704fc8b-968d-4987-34f2-db3c56a66800'
    };

    const statusRes = await fetch("https://www.githubstatus.com/api/v2/status.json");
    const statusData = await statusRes.json();

    var status = statusData.status.indicator == "none" ? "good" : statusData.status.indicator;

    // var statusImage = await env.status_images.get(`${status}`);
    // statusImage = statusImage.replace("data:image/png;base64,", "");

    var url = `https://imagedelivery.net/${accountHash}/${imageIds[status]}/1200x675`;

    return fetch(url);

    // return new Response(base64Decode(statusImage), {
    //     headers: {
    //         "Cache-Control": "max-age=60, s-maxage=60, public",
    //         "Cloudflare-CDN-Cache-Control": "max-age=60"
    //     },
    // });
}