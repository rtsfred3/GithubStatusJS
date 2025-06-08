class Compression {
    static kbString = '0'.repeat(1000);
    static mbString = this.kbString.repeat(1000);

    static  kbRandomString = Array.from({length: 1000}, (_) => `${Math.floor(Math.random()*9)}`).join('');
    static  mbRandomString = Array.from({length: 1000 * 1000}, (_) => `${Math.floor(Math.random()*9)}`).join('');

    /**
     * 
     * @param {Uint8Array} uint8Array1 
     * @param {Uint8Array} uint8Array2 
     * @returns {Uint8Array}
     */
    static concatUint8Arrays(uint8Array1, uint8Array2) {
        var newUint8Array = new Uint8Array(uint8Array1.byteLength + uint8Array2.byteLength);
        newUint8Array.set(uint8Array1, 0);
        newUint8Array.set(uint8Array2, uint8Array1.length);
        return newUint8Array;
    }

    /**
     * 
     * @param {string} str 
     * @param {string} encoding 
     * @returns {Uint8Array}
     */
    static async Compress(str, encoding = "gzip") {
        const byteArray = (new TextEncoder()).encode(str);
        return this.CompressChunk(byteArray, encoding);
    }

    /**
     * 
     * @param {File} file 
     * @param {string} encoding 
     * @returns {Promise<File>}
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
     * @returns {Promise<Uint8Array>}
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
     * @returns {Promise<string>}
     */
    static async Decompress(uint8Array, encoding = "gzip") {
        var compressedArrayBuffer = uint8Array.buffer;

        var arrayBuffer = await this.DecompressChunk(compressedArrayBuffer, encoding);
        
        return new TextDecoder().decode(arrayBuffer);
    }

    /**
     * 
     * @param {File} file 
     * @param {string} encoding 
     * @returns {Promise<File>}
     */
    static async DecompressFile(file, fileName = undefined, mimeType = 'text/plain', encoding = "gzip") {
        const readableStream = await this.ReadCompressedReadableStream(file.stream());

        const arrayBuffer = await this.DecompressChunk(readableStream, encoding);

        if (fileName == undefined) {
            fileName = file.name.replace('.gz', '');
        }

        return new File([arrayBuffer], fileName, { 'type': mimeType });
    }

    /**
     * 
     * @param {ReadableStream} readableStream 
     * @returns {Promise<ReadableStream>}
     */
    static async ReadCompressedReadableStream(readableStream) {
        let uint8Array = new Uint8Array(0);

        const reader = readableStream.getReader();
        let read = await reader.read();

        while(!read.done) {
            uint8Array = this.concatUint8Arrays(uint8Array, read.value);
            read = await reader.read();            
        }

        return uint8Array.buffer;
    }

    /**
     * 
     * @param {ArrayBuffer} chunk 
     * @param {string} encoding 
     * @returns {Promise<ArrayBuffer>}
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
        this.DownloadBlob(file, file.name);
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

    /**
     * 
     * @param {Number} sizeInMB 
     * @param {string|undefined} fileName 
     * @returns {File}
     */
    static SampleTextFile(sizeInMB, fileName = undefined) {
        if (fileName == undefined) {
            fileName = `${sizeInMB}MB.txt`
        }

        return this.TextFile(this.mbRandomString.repeat(parseInt(sizeInMB)), fileName);
    }
}