class StatuspageStaticHTML {
    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {object} attr attributes object
     * @returns {string} string of attributes
     */
    static GenerateAttributes(attr) {
        var attributes = Object.entries(attr).map((attr) => attr[1] != null ? `${attr[0]}="${attr[1]}"` : `${attr[0]}`);
        return attributes.join(' ');
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} tag tag name
     * @param {object} attr attributes object
     * @returns {string} string of tag and attributes
     */
    static TagStringAndAttributes(tag, attr = null, child = null) {
        var attrs = attr != null ? ` ${this.GenerateAttributes(attr)}` : '';
        var childStr = child != null ? child : '';
        return `<${tag}${attrs}>${childStr}</${tag}>`;
    }

    /**
     * @static
     * @memberof StatuspageHTMLElements
     * 
     * @param {string} shortlink 
     * @param {string} text 
     * @param {boolean} inNewTab defaults to `false`
     * @returns {string}
     */
    static CreateAnchorTagHTML(shortlink, text, inNewTab = false) {
        var attrs = inNewTab ? { 'href': shortlink } : { 'href': shortlink, 'target': '_blank' };
        return StatuspageStaticHTML.TagStringAndAttributes('a', attrs, text);
    }

    /**
     * 
     * @param {string} status 
     * @param {boolean} fullScreen 
     * @returns 
     */
    static StatusHTML(status, fullScreen = false) {
        if (!(status in StatuspageDictionary.StatusEnums)) {
            status = StatuspageDictionary.StatusEnums.error;
        }

        var attrs = {
            "id": "status",
            "data-status": status,
            "class": "statuspage-status"
        };

        if (fullScreen) { attrs["class"] += " fullScreen"; }

        return this.TagStringAndAttributes('div', attrs);
    }
}