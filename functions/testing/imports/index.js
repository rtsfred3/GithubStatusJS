// import { document, StatuspageDictionary, StatuspageHTMLElements, StatuspageWebComponents, HTMLWebComponent } from '../../../modules/Statuspage.esm.js';

import { BotChecker } from '../../lib/BotChecker.js';
import CustomHeaders from '../../lib/CustomHeaders.js';

import CapitalizeFirstLetter from '../../lib/CapitalizeFirstLetter.js';

export async function onRequestGet(context) {
    // var html = document.children[0];

    // var htmlWebComponent =  document.createElement(HTMLWebComponent.is, { is: HTMLWebComponent.is });

    // console.log(htmlWebComponent.toString());

    // console.log(document.children[0].outerHTML.toString())

    return new Response();
}

export async function onRequestHead(context) {
    return new Response();
}