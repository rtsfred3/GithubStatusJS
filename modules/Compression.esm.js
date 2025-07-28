export default class Compression {
    /**
     * 
     * @static
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
     * @static
     * @async
     * @param {string} str 
     * @param {string} encoding 
     * @returns {Promise<Uint8Array>}
     */
    static async CompressAsync(str, encoding = 'gzip') {
        const byteArray = (new TextEncoder()).encode(str);
        return this.CompressChunkAsync(byteArray, encoding);
    }

    /**
     * 
     * @param {Object} jsonObject 
     * @param {string} encoding 
     * @returns {Promise<Uint8Array>}
     */
    static async CompressJsonAsync(jsonObject, encoding = 'gzip') {
        return await this.CompressAsync(JSON.stringify(jsonObject), encoding);
    }

    /**
     * 
     * @static
     * @async
     * @param {File} file 
     * @param {string} encoding 
     * @returns {Promise<File>}
     */
    static async CompressFileAsync(file, encoding = 'gzip') {
        var uncompressedArrayBuffer = await file.arrayBuffer();
        var uint8Array = new Uint8Array(uncompressedArrayBuffer);

        var extension = encoding == "gzip" ? '.gz' : '';
        var type = file.type;

        if (encoding == "gzip") {
            type = 'application/gzip';
        }

        const compressedChunk = await this.CompressChunkAsync(uint8Array, encoding);
        
        return new File([compressedChunk], `${file.name}${extension}`, { 'type': type })
    }

    /**
     * 
     * @static
     * @async
     * @param {object} jsonObject 
     * @param {string} fileName 
     * @param {string} encoding 
     */
    static CompressAndDownloadJson(jsonObject, fileName = 'compressed.json') {
        const jsonFile = this.JsonFile(jsonObject, fileName);
        this.CompressFileAsync(jsonFile, 'gzip').then(f => this.DownloadFile(f));
    }

    /**
     * 
     * @static
     * @async
     * @param {object} chunk 
     * @param {string} encoding 
     * @returns {Promise<Uint8Array>}
     */
    static async CompressChunkAsync(chunk, encoding = 'gzip') {
        const cs = new CompressionStream(encoding);
        const writer = cs.writable.getWriter();
        writer.write(chunk);
        writer.close();

        const arrayBuffer = await new Response(cs.readable).arrayBuffer();
        return new Uint8Array(arrayBuffer);
    }

    /**
     * 
     * @static
     * @async
     * @param {Uint8Array|ArrayBuffer} compressedData 
     * @param {string} encoding 
     * @returns {Promise<string>}
     */
    static async DecompressAsync(compressedData, encoding = 'gzip') {
        if (compressedData instanceof Uint8Array) {
            compressedData = compressedData.buffer;
        }

        var arrayBuffer = await this.DecompressChunkAsync(compressedData, encoding);
        
        return new TextDecoder().decode(arrayBuffer);
    }
    
    /**
     * 
     * @param {Uint8Array|ArrayBuffer} compressedData 
     * @param {string} encoding 
     * @returns {Object}
     */
    static async DecompressJsonAsync(compressedData, encoding = 'gzip') {
        const jsonStr = await this.DecompressAsync(compressedData, encoding);
        return JSON.parse(jsonStr);
    }

    /**
     * 
     * @static
     * @async
     * @param {File} file 
     * @param {string} fileName 
     * @param {string} mimeType 
     * @param {string} encoding 
     * @returns {Promise<File>}
     */
    static async DecompressFileAsync(file, mimeType = 'text/plain', fileName = undefined, encoding = 'gzip') {
        const readableStream = await this.ReadCompressedReadableStreamAsync(file.stream());

        const arrayBuffer = await this.DecompressChunkAsync(readableStream, encoding);

        if (fileName == undefined) {
            if (file.name.endsWith('.gz')) {
                fileName = file.name.replace('.gz', '');
            } else {
                fileName = 'output';
            }
        }

        if (fileName.endsWith('.json')) {
            mimeType = 'application/json';
        }

        return new File([arrayBuffer], fileName, { 'type': mimeType });
    }

    /**
     * 
     * @static
     * @async
     * @param {File} file 
     * @param {string} fileName 
     * @param {string} mimeType 
     * @param {string} encoding 
     * @returns {Promise<Object>}
     */
    static async DecompressJsonFileAsync(file, encoding = 'gzip') {
        const jsonFile = await this.DecompressFileAsync(file, 'application/json', 'output.json', encoding);

        return JSON.parse(await jsonFile.text());
    }

    /**
     * 
     * @static
     * @async
     * @param {ReadableStream} readableStream 
     * @returns {Promise<ReadableStream>}
     */
    static async ReadCompressedReadableStreamAsync(readableStream) {
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
     * @static
     * @async
     * @param {ArrayBuffer} chunk 
     * @param {string} encoding 
     * @returns {Promise<ArrayBuffer>}
     */
    static async DecompressChunkAsync(chunk, encoding = 'gzip') {
        const cs = new DecompressionStream(encoding);
        const writer = cs.writable.getWriter();
        writer.write(chunk);
        writer.close();
        
        return await new Response(cs.readable).arrayBuffer();
    }

    /**
     * 
     * @static
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
     * @static
     * @param {File} file 
     */
    static DownloadFile(file) {
        this.DownloadBlob(file, file.name);
    }

    /**
     * 
     * @static
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
     * @static
     * @param {object} data 
     * @param {string} fileName 
     * @returns {File}
     */
    static JsonFile(data, fileName) {
        return new File([JSON.stringify(data, null, 2)], fileName, { 'type': 'application/json' });
    }
}