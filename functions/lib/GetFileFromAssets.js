export default async function GetFileFromAssets(context, filepath) {
    var cssUrl = new URL(context.request.url);
    cssUrl.pathname = filepath;

    const cssResponse = await context.env.ASSETS.fetch(cssUrl);
    return await cssResponse.text();
}