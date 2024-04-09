import Path from './lib/Path.js';
import ModifyHTML from './lib/ModifyHTML.js';

export async function onRequestGet({ request, params, env }) {
    console.log(StatuspageDictionary.IndicatorVals);
    
    var response = await ModifyHTML(request, env, Path.Amp);
    return response;
}