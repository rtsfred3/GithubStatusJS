export async function onRequestGet({ params, env }) {
    const previousDays = env.PREVIOUS_DAYS;

    var info = JSON.stringify({
        "previous_days": `${previousDays}`
    }, null, 2);
    
    return new Response(info, {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "Cache-Control": `max-age=${env.AGE}, public`
        },
    });
}