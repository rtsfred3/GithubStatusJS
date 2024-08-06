const pattern = /<meta (name|property|itemprop)="([a-zA-Z0-9\-#:\(\) \/\.,_]+)" content="([a-zA-Z0-9\-#:\(\) \/\.,_]+)"( \/)?>/g;

export default async function ParseHTMLTags(str) {
    var obj = {};

    var matches = [...str.matchAll(pattern)];

    for (let match in matches) {
        obj[match[2]] = match[3];
    }

    return obj;
}