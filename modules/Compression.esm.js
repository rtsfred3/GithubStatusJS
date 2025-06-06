export default class Compression {
    static kbString = '0'.repeat(1000);
    static mbString = this.kbString.repeat(1000);

    static  kbRandomString = Array.from({length: 1000}, (_) => `${Math.floor(Math.random()*9)}`).join('');
    static  mbRandomString = Array.from({length: 1000 * 1000}, (_) => `${Math.floor(Math.random()*9)}`).join('');

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

        var arrayBuffer = await this.DecompressChunk(byteArray, encoding);
        
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

        var arrayBuffer = await this.DecompressChunk(byteArray, encoding);

        return new File([arrayBuffer], fileName, { 'type': mimeType });
    }

    /**
     * 
     * @param {ArrayBuffer} chunk 
     * @param {string} encoding 
     * @returns {ArrayBuffer}
     */
    static async DecompressChunk(chunk, encoding = "gzip") {
        const cs = new DecompressionStream(encoding);
        const writer = cs.writable.getWriter();
        writer.write(chunk);
        writer.close();
        
        return await new Response(cs.readable).arrayBuffer();
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
    static DownloadFile(file) {
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
     * @returns {File}
     */
    static JsonFile(data, fileName) {
        return new File([JSON.stringify(data, null, 2)], fileName, { 'type': 'application/json' });
    }

    /**
     * 
     * @param {string} text 
     * @param {string} fileName 
     * @returns {File}
     */
    static TextFile(text, fileName) {
        return new File([text], fileName, { 'type': 'text/plain' });
    }

    static SampleTextFile(sizeInMB, fileName) {
        return this.TextFile(this.mbRandomString.repeat(sizeInMB), fileName);
    }
}