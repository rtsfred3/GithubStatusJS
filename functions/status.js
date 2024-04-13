import Path from './lib/Path.js';
import CacheHTML from './lib/CacheHTML.js';

import Html from '../index.html';

export async function onRequestGet(context) {
    return await CacheHTML(context, Html, Path.Status);
}

export async function onRequestHead(context) {
    return await CacheHTML(context, Html, Path.Status);
}