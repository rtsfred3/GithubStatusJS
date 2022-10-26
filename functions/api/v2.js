export async function onRequestGet(context) {
    const {
        request,
        env,
        params,
        waitUntil,
        next,
        data,
    } = context;
    
    console.log(request);

  return new Response("Hello, world!");
}
