import Path from './lib/Path.js';
import ModifyHTML from './lib/ModifyHTML.js';

import Html from "../n_index.html";

import UserAgents from './lib/UserAgents.js';

export async function onRequestGet(context) {
    var isBot = UserAgents.IsBot(context.request.headers.get('user-agent'));

    if (isBot) {
        return await ModifyHTML(context, Path.Status);
    }

    return new Response(Html, {
        headers: CustomHeaders("text/html; charset=utf-8", context.env.CACHE_AGE),
    });
}