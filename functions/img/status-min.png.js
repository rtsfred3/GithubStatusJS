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

    var url = `https://imagedelivery.net/${accountHash}/${imageIds[status]}/300px`;

    const imgFetch = await fetch(url);

    // imgFetch.headers.forEach((k, v) => console.log(k + " => " + v));

    var init = {
        headers: {}
    };

    imgFetch.headers.forEach((k, v) => {
        console.log(v + ": " + k);
        init.headers[key] = value;
    });

    // for(const [key, value] of Object.entries(imgFetch.headers)){
    //     console.log(key + ": " + value);
    //     init.headers[key] = value;
    // }

    init.headers["Cache-Control"] = "max-age=180, s-maxage=180, public";
    init.headers["Cloudflare-CDN-Cache-Control"] = "max-age=180";

    console.log(init);

    var resp = new Response(imgFetch.body, init);

    // return imgFetch;

    return resp;
}