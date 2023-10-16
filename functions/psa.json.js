export async function onRequestGet({ params, env }) {
    const showPSA = env.SHOW_PSA.toLowerCase() == "true";
    const PSA = env.PSA;

    var info = JSON.stringify({
        "showPSA": showPSA,
        "PSA": PSA
    }, null, 2);
    
    return new Response(info, {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=60, public"
        },
    });
}