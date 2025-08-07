class Utils {
    static kbString = '0'.repeat(1000);
    static mbString = this.kbString.repeat(1000);

    // static  kbRandomString = Array.from({length: 1000}, (_) => `${Math.floor(Math.random()*9)}`).join('');
    // static  mbRandomString = Array.from({length: 1000 * 1000}, (_) => `${Math.floor(Math.random()*9)}`).join('');

    static get kbRandomString() { return Array.from({length: 1000}, (_) => `${Math.floor(Math.random()*9)}`).join(''); }
    static get mbRandomString() { return Array.from({length: 1000 * 1000}, (_) => `${Math.floor(Math.random()*9)}`).join(''); }

    static get kbRandomAlphanumericString() { return Array.from({length: 1000}, (_) => `${Utils.randomAlphanumeric}`).join(''); }
    static get mbRandomAlphanumericString() { return Array(1000).fill(Utils.kbRandomAlphanumericString).join(''); }

    static URLParameters = Object.fromEntries(new URLSearchParams(document.location.search));

    static get StatusFromURLParameters() {
        const params = new URLSearchParams(document.location.search);
        
        return { 'status': params.size > 0 && params.has('status') ? params.get('status') : 'loading' };
    }

    static StatusEnumsTextFile = this.TextFile(JSON.stringify(StatuspageDictionary.StatusEnums, null, 2), 'StatusEnums.json');

    static get randomNumber() { return `${Math.floor(Math.random()*9)}`; }
    static get randomUppercaseLetter() { return String.fromCharCode(Math.random() * ((65+26) - 65) + 65);}
    static get randomLowercaseLetter() { return String.fromCharCode(Math.random() * ((97+26) - 65) + 65);}

    static get alphanumeric() {
        return Utils.AsciiCodes(48, 10)
            .concat(Utils.AsciiCodes(65, 26))
            .concat(Utils.AsciiCodes(97, 26))
            .map(c => String.fromCharCode(c))
            .join('');
    }

    static get randomAlphanumeric() {
        var index = Math.floor(Math.random() * Utils.alphanumeric.length);
        return Utils.alphanumeric[index];
    }

    /**
     * 
     * @param {Number} asciiCode starting ascii code
     * @param {Number} listLength number of subsequent ascii codes
     * @returns 
     */
    static AsciiCodes(asciiCode, listLength) {
        return Array.from(Array(listLength).keys()).map(i => asciiCode + i);
    }

    /**
     * 
     * @static
     * @param {string} text 
     * @param {string} fileName 
     * @returns {File}
     */
    static TextFile(text, fileName) {
        return new File([text], fileName, { 'type': 'text/plain' });
    }

    static StringOfMbSize(sizeInMB) {
        return Array(sizeInMB).fill(Utils.mbRandomAlphanumericString).join('');
    }

    /**
     * 
     * @static
     * @param {Number} sizeInMB 
     * @param {string|undefined} fileName 
     * @returns {File}
     */
    static SampleTextFile(sizeInMB, fileName = undefined) {
        const bucketSize = 256;

        if (fileName == undefined) {
            fileName = `${sizeInMB}MB.txt`;
        }

        if (sizeInMB > bucketSize) {
            var fullBuckets = Math.floor(sizeInMB / bucketSize);
            var lastBucket = (sizeInMB / bucketSize) - Math.floor(sizeInMB / bucketSize);

            var bulk = Array(fullBuckets).fill(this.StringOfMbSize(bucketSize));
            bulk.push(this.StringOfMbSize(bucketSize * lastBucket));

            var uint8Array = new Uint8Array(0);

            var uint8ArrayBulk = bulk.map(e => (new TextEncoder()).encode(e));

            for(let arr of uint8ArrayBulk) {
                uint8Array = Compression.concatUint8Arrays(uint8Array, arr);
            }

            return this.TextFile(uint8Array, fileName);
        }

        return this.TextFile(this.StringOfMbSize(sizeInMB), fileName);
    }

    /**
     * 
     * @static
     * @param {Number} sizeInMB 
     * @param {string|undefined} fileName 
     * @returns {File}
     */
    static SampleTextFileRepeating(sizeInMB, fileName = undefined) {
        if (fileName == undefined) {
            fileName = `${sizeInMB}MB_Repeat.txt`
        }

        return this.TextFile(this.mbString.repeat(parseInt(sizeInMB)), fileName);
    }

    static ToObject(className) {
        let classProps = Object.getOwnPropertyNames(className).filter(p => !(Object.getOwnPropertyNames(class {})).includes(p));
        return classProps.reduce((acc, curr) => (({ ...acc, [curr]: className[curr] })), {});
    }

    /**
     * 
     * @param {string} str 
     * @param {string} type 
     * @returns 
     */
    static DOMParse(str, type) {
        return ((new DOMParser()).parseFromString(str, type));
    }

    static parseHTMLString(htmlString) {
        return this.DOMParse(htmlString, 'text/html').body.firstChild;
    }

    static TestStatusHTMLs() {
        var statusList = ['good', 'minor', 'major', 'critical', 'error', 'maintenance', 'unavailable', 'loading', 'none'];

        var htmlStr = '';

        for (const status of statusList) {
            if (status in StatuspageDictionary.StatusEnums) {
                htmlStr += `<div><statuspage-status data-status="${status}" fullScreen /></div>\n`;
            }
        }

        return htmlStr;
    }

    /**
     * 
     * @static
     * @param {HTMLCollection} htmlCollection 
     * @returns {HTMLCollection}
     */
    static RemoveCommentsAndFormatFromHTMLCollection(htmlCollection) {
        return Array.from(htmlCollection)
            .filter((node) => node.nodeType != document.COMMENT_NODE)
            .filter((node) => node.nodeType != document.TEXT_NODE)
            .map((node) => [new Text('\n\t\t'), node])
            .flat();
    }

    /**
     * 
     * @param {document} doc 
     * @returns {document}
     */
    static RemoveAllComments(d) {
        const doc = d.cloneNode(true);
        
        const headChildNodesNoComments = this.RemoveCommentsAndFormatFromHTMLCollection(doc.head.childNodes);
        const bodyChildNodesNoComments = this.RemoveCommentsAndFormatFromHTMLCollection(doc.body.childNodes);
        
        doc.head.replaceChildren(...headChildNodesNoComments, new Text('\n'));
        doc.body.replaceChildren(...bodyChildNodesNoComments, new Text('\n'));

        return doc;
    }
}