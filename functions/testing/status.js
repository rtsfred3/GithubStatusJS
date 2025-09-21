import GetFileFromAssets from '../lib/GetFileFromAssets.js';

import CustomHeaders from '../lib/CustomHeaders.js';

import Compression from '../../modules/Compression.esm.js';

import StatuspageDetails from '../../modules/StatuspageDetails.esm.js';
import StatuspageDictionary from '../../modules/StatuspageDictionary.esm.js';
import StatuspageStaticHTML from '../../modules/StatuspageStaticHTML.esm.js';

export async function onRequestGet(context) {
    // console.log(context);
    // console.log(context.data);

    var headers = CustomHeaders("text/html; charset=utf-8", 300);

    var data = {
        baseUrl: context.env.StatuspageBaseUrl,
        imgUrl: 'https://githubstat.us/img/status/lowres/min/status-min-good.png',
        iconUrl: 'https://githubstat.us/favicon.ico',
        canonicalUrl: context.request.url,
        author: 'rtsfred3',
        isMinified: true,
        cssStyling: await GetFileFromAssets(context, "/styling/github.static.min.css")
    };

    var statuspageDetails = new StatuspageDetails(data);
    await statuspageDetails.fetchStatus();

    console.log(StatuspageStaticHTML.TagStringAndAttributes('div', { 'data-status': statuspageDetails.status, 'fullScreen': null }));

    // var compressedFile = await Compression.CompressFileAsync(statuspageDetails.statusFile);

    // console.log(statuspageDetails.statusFile);
    // console.log(compressedFile);
    // console.log(new Date(compressedFile.lastModified));

    return new Response(statuspageDetails.fullHTML, { headers: headers });

    // return await ModifyHTML(context, Path.Amp);
}