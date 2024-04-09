import Path from './lib/Path.js';
import ModifyHTML from './lib/ModifyHTML.js';

export async function onRequestGet({ request, params, env }) {
    return await ModifyHTML(request, env, Path.Amp);
}