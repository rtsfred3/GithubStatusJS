import Path from './lib/Path.js';
import ModifyHTML from './lib/ModifyHTML.js';

import UserAgents from './lib/UserAgents.js';

export async function onRequestGet(context) {
    console.log(UserAgents.IsBot(context.request.headers.get('user-agent')));
    return await ModifyHTML(context, Path.Status);
}