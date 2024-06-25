import { window, document, StatuspageDictionary, StatuspageHTMLElements, StatuspageWebComponents } from './Statuspage.esm.js';

window.customElements.define(StatuspageWebComponents.Status.is, StatuspageWebComponents.Status);

import express from "express";

const app = express();

const port = 8080;

app.get('/', async (req, res) => {
    var statuspage = document.createElement(StatuspageWebComponents.Status.is);
    statuspage.dataStatus = StatuspageDictionary.StatusEnums.good;
    statuspage.fullScreen = true;
    
    var newHead = StatuspageHTMLElements.HeadElement("https://spstat.us/", null, "https://spstat.us/favicon.ico", null, "Cloudflare", StatuspageDictionary.PathNames.Index, null, "rtsfred3");

    if (document.body.children.length == 0) {
        document.body.appendChild(statuspage);
    } else {
        document.body.firstElementChild.replaceWith(statuspage);
    }

    document.head.replaceWith(newHead);

    res.send(document.getElementsByTagName('html')[0].outerHTML.toString());
});

app.get('/error', async (req, res) => {
    res.send(document.getElementsByTagName('html')[0].outerHTML.toString());
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});