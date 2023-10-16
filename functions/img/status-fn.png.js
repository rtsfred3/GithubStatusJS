export async function onRequestGet({ params, env }) {
    const status_images = env.status_images;

    const statusRes = await fetch("https://www.githubstatus.com/api/v2/status.json");
    const statusData = await statusRes.json();

    var status = statusData.status.indicator;

    if(status == "none"){
        status = "good";
    }

    const img = await status_images.get(status, "arrayBuffer");
    
    return new Response(img, {
        headers: {
            "Content-Type": "application/png",
            "Cache-Control": "max-age=60, public"
        },
    });
}