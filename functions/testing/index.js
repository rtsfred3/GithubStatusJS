import Path from '../lib/Path.js';
import ModifyHTML from '../lib/ModifyHTML.js';

export async function onRequestGet(context) {
    return await ModifyHTML(context, Path.Index);
}

export async function onRequestHead(context) {
    return await ModifyHTML(context, Path.Index);
}