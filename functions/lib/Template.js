export default function Template(html, ){
    var arrOut = [];
    var arrOutString = [];
    for (const element of arrInput) {
        if (!arrOutString.includes(element[0])) {
            arrOut.push(element);
            arrOutString.push(element[0]);
        }
    }
    return arrOut;
}