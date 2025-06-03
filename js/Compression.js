class Compression {
    /**
     * 
     * @param {string} str 
     * @param {string} encoding 
     * @returns 
     */
    static async Compress(str, encoding = "gzip") {
        const byteArray = (new TextEncoder()).encode(str);
        return this.CompressChunk(byteArray, encoding);
    }

    /**
     * 
     * @param {File} file 
     * @param {string} encoding 
     * @returns {File}
     */
    static async CompressFile(file, encoding = "gzip") {
        var uncompressedArrayBuffer = await file.arrayBuffer();
        var uint8Array = new Uint8Array(uncompressedArrayBuffer);

        var extension = encoding == "gzip" ? '.gz' : '';
        var type = file.type;

        if (encoding == "gzip") {
            type = 'application/gzip';
        }

        const compressedChunk = await this.CompressChunk(uint8Array, encoding);
        
        return new File([compressedChunk], `${file.name}${extension}`, { 'type': type })
    }

    /**
     * 
     * @param {object} chunk 
     * @param {string} encoding 
     * @returns 
     */
    static async CompressChunk(chunk, encoding = "gzip") {
        const cs = new CompressionStream(encoding);
        const writer = cs.writable.getWriter();
        writer.write(chunk);
        writer.close();

        const arrayBuffer = await new Response(cs.readable).arrayBuffer();
        return new Uint8Array(arrayBuffer);
    }

    /**
     * 
     * @param {Uint8Array} uint8Array 
     * @param {string} encoding 
     * @returns 
     */
    static async Decompress(uint8Array, encoding = "gzip") {
        var byteArray = uint8Array.buffer;

        const cs = new DecompressionStream(encoding);
        const writer = cs.writable.getWriter();
        writer.write(byteArray);
        writer.close();
        const arrayBuffer = await new Response(cs.readable).arrayBuffer();

        return new TextDecoder().decode(arrayBuffer);
    }

    /**
     * 
     * @param {File} file 
     * @param {string} encoding 
     * @returns {File}
     */
    static async DecompressFile(file, fileName, mimeType, encoding = "gzip") {
        const readable = await file.stream().getReader().read();
        const byteArray = readable.value.buffer;

        const cs = new DecompressionStream(encoding);
        const writer = cs.writable.getWriter();
        writer.write(byteArray);
        writer.close();

        const arrayBuffer = await new Response(cs.readable).arrayBuffer();

        return new File([arrayBuffer], fileName, { 'type': mimeType });
    }

    /**
     * 
     * @param {Array|ArrayBuffer|TypedArray|DataView|Blob} arrayBuffer 
     * @param {string} fileName 
     * @param {string} mimeType 
     */
    static DownloadArrayBuffer(arrayBuffer, fileName, mimeType = 'application/gzip') {
        const blob = new Blob([arrayBuffer], { 'type': mimeType });

        this.DownloadBlob(blob, fileName);
    }

    /**
     * 
     * @param {File} file 
     */
    static async DownloadFile(file) {
        var link = document.createElement("a");
        link.download = file.name;
        link.href = window.URL.createObjectURL(file);
        link.click();
        link.remove();
    }

    /**
     * 
     * @param {Blob} blob 
     * @param {string} fileName 
     */
    static DownloadBlob(blob, fileName) {
        var link = document.createElement("a");
        link.download = fileName;
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    /**
     * 
     * @param {object} data 
     * @param {string} fileName 
     */
    static JsonFile(data, fileName) {
        return new File([JSON.stringify(data, null, 2)], fileName, { 'type': 'application/json' });
    }

    static get mbString() {
        var mbString = '';
        for (var i = 0; i < 1000 * 1000; i++) {
            mbString += `${Math.floor(Math.random()*9)}`;
        }
        return mbString;// + mbString.split('').reverse().join('');
    }

    static SampleTextFile(sizeInMB, fileName) {
        var string = '';
        for (var i = 0; i < sizeInMB; i++) {
            string += Compression.mbString;
        }
        return new File([string], fileName, { 'type': 'text/plain' });
    }
}

// var styling = ':root{--good:#339966;--none:var(--good);--minor:#DBAB09;--major:#E25D10;--critical:#DC3545;--maintenance:#0366D6;--loading:#4F93BD;--unavailable:var(--loading);--error:#646464;--font:var(--error);--incident-good:var(--good);--incident-none:#000000;--incident-minor:#F1C40F;--incident-major:#FF9900;--incident-critical:#990000;--incident-maintenance:var(--maintenance);--incident-error:var(--error);--good-text:"good";--none-text:var(--good-text);--minor-text:"minor";--major-text:"major";--critical-text:"critical";--maintenance-text:"maintenance";--loading-text:"loading";--unavailable-text:"unavailable";--error-text:"error"}*{margin:0;padding:0}body{font-family:arial}[capitalize]{text-transform:capitalize}.fullScreen,.statuspage-status:has(.fullScreen),:has(.fullScreen),[fullScreen],statuspage-error,statuspage-loading,statuspage-unavailable{height:100vh}.statuspage-status:not(.fullScreen),statuspage-component,statuspage-status{height:240px}.statuspage-status,statuspage-component,statuspage-error,statuspage-loading,statuspage-status,statuspage-unavailable{width:100vw;text-align:center;justify-content:center;align-items:center;display:block;display:flex;font-size:48pt}.statuspage-status[data-status]::before,statuspage-error::before,statuspage-loading::before,statuspage-status[data-status]::before,statuspage-unavailable::before{content:attr(data-status);text-transform:uppercase;font-weight:700;color:#fff}statuspage-component[data-message]::before{content:attr(data-message);font-weight:700;color:#fff}.statuspage-status[data-status=good]::before,.statuspage-status[data-status=none]::before,statuspage-status[data-status=good]::before,statuspage-status[data-status=none]::before{content:var(--good-text)}statuspage-loading::before{content:var(--loading-text)}statuspage-unavailable::before{content:var(--unavailable-text)}statuspage-error::before{content:var(--error-text)}@media only screen and (max-height:400px){.statuspage-status:not(.fullScreen),statuspage-status{height:45vh}}@media only screen and (max-width:320px) and (max-height:320px){.statuspage-status:not(.fullScreen),statuspage-status{height:100vh}}@media only screen and (min-width:2048px) and (min-height:1080px){.statuspage-status:not(.fullScreen),statuspage-status{height:30vh}.statuspage-status,statuspage-error,statuspage-loading,statuspage-status,statuspage-unavailable{font-size:12em}}@media only screen and (((min-width:2100px) and (min-height:1100px)) or ((min-width:3000px) and (min-height:2000px))){.statuspage-status:not(.fullScreen),statuspage-status{height:40vh}.statuspage-status,statuspage-error,statuspage-loading,statuspage-status,statuspage-unavailable{font-size:16em}}[data-status=good],[data-status=none]{background-color:var(--none)}[data-status=minor]{background-color:var(--minor)}[data-status=major]{background-color:var(--major)}[data-status=critical]{background-color:var(--critical)}[data-status=maintenance]{background-color:var(--maintenance);font-weight:500}[data-status=loading],[data-status=unavailable],statuspage-loading,statuspage-unavailable{background-color:var(--loading)}[data-status=error],statuspage-error{background-color:var(--error)}@media only screen and (min-width:351px) and (max-width:450px){[data-status=maintenance]{font-size:36pt}}@media only screen and (min-width:251px) and (max-width:350px){[data-status=maintenance]{font-size:30pt}}@media only screen and (min-width:151px) and (max-width:250px){[data-status=maintenance]{font-size:20pt}}';

async function compDecompTest() {
    // let statusJson = StatuspageHTMLElements.GetStatusJson(StatuspageDictionary.IndicatorVals.good);
    // var statusJsonFile = Compression.JsonFile(statusJson, 'status.json');
    
    // Compression.CompressFile(statusJsonFile, 'gzip').then(f => Compression.DownloadFile(f));
    // var compressedFile = await Compression.CompressFile(statusJsonFile, 'gzip');
    // Compression.DownloadFile(compressedFile);

    // var str = StatuspageStaticHTML.ErrorHTML('https://spstat.us/favicon.ico', 'http://spstat.us/img/status/lowres/min/status-min-good.png', '(Unofficial) Cloudflare Status', 'https://spstat.us/', 'rtsfred3', ['Statuspage', 'Cloudflare Status'], 'Cloudflare Status', 'A website to monitor a website monitored by Cloudflare Status.', styling);
    
    // var compressedStrGzip = await Compression.Compress(str, 'gzip');
    // var compressedStrDeflate = await Compression.Compress(str, 'deflate');
    // var compressedStrDeflateRaw = await Compression.Compress(str, 'deflate-raw');
    // var decompressedStrGzip = await Compression.Decompress(compressedStrGzip, 'gzip');
    // var decompressedStrDeflate = await Compression.Decompress(compressedStrDeflate, 'deflate');
    // var decompressedStrDeflateRaw = await Compression.Decompress(compressedStrDeflateRaw, 'deflate-raw');

    // var compressedJsFile = new File([compressedStrGzip], 'index.html.gz', { 'type': 'application/gzip' })
    // Compression.DownloadFile(compressedJsFile);

    // Compression.DownloadCompressedBlobParts(compressedStrGzip, 'index.html.gz');
    // Compression.DownloadCompressedBlobParts(compressedStrDeflate, 'index.html.zip', 'application/zip');

    // console.log(str.length);
    // console.log(compressedStrGzip);
    // console.log(compressedStrDeflate);
    // console.log(compressedStrDeflateRaw);
    // console.log(decompressedStrGzip);
    // console.log(decompressedStrDeflate);

    var mb = 250;

    var sampleFile = Compression.SampleTextFile(mb, `${mb}MB.txt`);
    const txt = await sampleFile.text();
    console.log(txt.length);

    // await Compression.DownloadFile(sampleFile);

    // const compressedFile = await Compression.CompressFile(sampleFile, 'gzip');
    
    Compression.CompressFile(sampleFile, 'gzip').then((compressedFile) => {
        console.log(sampleFile);
        console.log(compressedFile);
        Compression.DownloadFile(sampleFile);
        Compression.DownloadFile(compressedFile);
        // Compression.DecompressFile(compressedFile, sampleFile.name, sampleFile.type, 'gzip').then(t => Compression.DownloadFile(t));
    });
    

    // await Compression.DownloadFile(compressedFile);
    // await Compression.DownloadFile(decompressedFile);

    // const sampleText = await sampleFile.text();
    // const decompressedText = await decompressedFile.text();

    // console.log(sampleText.length, decompressedText.length);
    // console.log(sampleText == decompressedText);
}

compDecompTest();