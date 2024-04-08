import Path from './lib/Path.js';
import ModifyHTML from './lib/ModifyHTML.js';

export async function onRequestGet({ request, params, env }) {
    var response = await ModifyHTML(request, env, Path.Component);

    return response;
}