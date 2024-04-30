import { StatuspageDictionary } from '../../modules/Statuspage.esm.js';
import ModifyHTML from '../lib/ModifyHTML.js';

export async function onRequestGet(context) {
    return await ModifyHTML(context, StatuspageDictionary.PathNames.Component);
}

export async function onRequestHead(context) {
    return await ModifyHTML(context, StatuspageDictionary.PathNames.Component);
}