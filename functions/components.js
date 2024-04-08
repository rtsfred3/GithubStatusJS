import Path from './lib/Path.js';
import ModifyHTML from './lib/ModifyHTML.js';

export async function onRequestGet({ request, params, env }) {
    var response = await ModifyHTML(env, 'www.githubstatus.com', 'githubstat.us', Path.Component);

    return response;
}