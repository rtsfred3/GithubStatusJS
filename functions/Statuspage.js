export async function onRequestGet({ params, env }) {
    return new Response(JSON.stringify({}, null, 2), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}