import Path from './lib/Path.js';
import ModifyHTML from './lib/ModifyHTML.js';

export async function onRequestGet({ request, params, env }) {
    // var response = await ModifyHTML(request, env, 'www.githubstatus.com', 'githubstat.us', Path.Component);
    var response = await ModifyHTML(request, env, 'www.cloudflarestatus.com', 'githubstat.us', Path.Component);

    return response;
}