class Utils {
    static kbString = '0'.repeat(1000);
    static mbString = this.kbString.repeat(1000);

    static  kbRandomString = Array.from({length: 1000}, (_) => `${Math.floor(Math.random()*9)}`).join('');
    static  mbRandomString = Array.from({length: 1000 * 1000}, (_) => `${Math.floor(Math.random()*9)}`).join('');

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

    /**
     * 
     * @static
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

    static ToObject(className) {
        let classProps = Object.getOwnPropertyNames(className).filter(p => !(Object.getOwnPropertyNames(class {})).includes(p));
        return classProps.reduce((acc, curr) => (({ ...acc, [curr]: className[curr] })), {});
    }
}