export default function IsStatuspageNameSame(arrInput, statuspageName){
    var arr = [...new Set(arrInput.map((a) => a[1]))];
    return arr.includes(statuspageName);
}